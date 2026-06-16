"use server"

import { db } from "@/lib/db"
import { appointments, subscriptions, user, doctorProfiles } from "@/lib/db/schema"
import { auth } from "@/lib/auth"
import { stripe, PLATFORM_FEE_PERCENT } from "@/lib/stripe"
import { getBaseUrl } from "@/lib/base-url"
import { MAIN_PLAN } from "@/lib/plans"
import { getPooledSlots } from "@/lib/scheduling/pool"
import { generateTempPassword } from "@/lib/credentials"
import { sendCredentialsEmail, sendBookingConfirmationEmail } from "@/lib/email"
import { maybeCreateMeeting } from "@/lib/google/calendar"
import { eq } from "drizzle-orm"
import type Stripe from "stripe"
import type { PooledSlot } from "@/lib/scheduling/types"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Huecos combinados de todos los médicos (público, sin sesión). */
export async function getPublicSlots(days = 14): Promise<PooledSlot[]> {
  const from = new Date()
  const to = new Date(from.getTime() + days * 864e5)
  return getPooledSlots({ from, to })
}

/**
 * Flujo público (sin cuenta): el visitante elige hora y paga la suscripción
 * mensual. La cuenta del paciente se crea DESPUÉS del pago (ver provisionFromSession),
 * y se le envían las credenciales por email.
 */
export async function startPublicCheckout(input: {
  name: string
  email: string
  startUtcISO: string
}): Promise<{ url: string } | { error: string }> {
  const name = input.name?.trim() || "Paciente"
  const email = input.email?.trim().toLowerCase()
  if (!email || !EMAIL_RE.test(email)) return { error: "Introduce un correo electrónico válido." }

  // Si ya existe una cuenta con ese correo, debe iniciar sesión (no recreamos cuenta).
  const [existing] = await db.select({ id: user.id }).from(user).where(eq(user.email, email)).limit(1)
  if (existing) {
    return {
      error: "Ya existe una cuenta con este correo. Inicia sesión para gestionar tu suscripción.",
    }
  }

  const start = new Date(input.startUtcISO)
  if (Number.isNaN(start.getTime()) || start.getTime() < Date.now()) {
    return { error: "Ese horario ya no es válido. Elige otro." }
  }

  // Localizamos el hueco elegido en la agenda combinada y su médico.
  const slots = await getPooledSlots({ from: new Date(), to: new Date(Date.now() + 30 * 864e5) })
  const slot = slots.find((s) => s.startUtc === start.toISOString())
  if (!slot) return { error: "Ese horario ya no está disponible. Elige otro." }

  // Comisión + transferencia al médico solo si su cuenta Connect está lista.
  const [doc] = await db
    .select({ stripeAccountId: doctorProfiles.stripeAccountId, chargesEnabled: doctorProfiles.chargesEnabled })
    .from(doctorProfiles)
    .where(eq(doctorProfiles.userId, slot.doctorId))
    .limit(1)
  const subscriptionData: Record<string, unknown> = {
    metadata: { kind: "public_signup", doctorId: slot.doctorId },
  }
  if (doc?.stripeAccountId && doc.chargesEnabled) {
    subscriptionData.application_fee_percent = PLATFORM_FEE_PERCENT
    subscriptionData.transfer_data = { destination: doc.stripeAccountId }
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: MAIN_PLAN.priceCents,
            recurring: { interval: "month" },
            product_data: {
              name: `${MAIN_PLAN.name} · DoctorLife`,
              description: "Endocrino asignado, videollamada mensual y chat en vivo (IVA incluido).",
            },
          },
        },
      ],
      subscription_data: subscriptionData,
      metadata: {
        kind: "public_signup",
        name,
        email,
        doctorId: slot.doctorId,
        startUtcISO: slot.startUtc,
        endUtcISO: slot.endUtc,
      },
      success_url: `${getBaseUrl()}/bienvenido?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${getBaseUrl()}/?checkout=cancelled`,
    })
    if (!session.url) return { error: "No se pudo iniciar el pago." }
    return { url: session.url }
  } catch (e) {
    return { error: e instanceof Error ? e.message : "No se pudo iniciar el pago." }
  }
}

/** current_period_end puede vivir en la sub o en su primer item según la versión de API. */
function periodEnd(sub: Stripe.Subscription): number | undefined {
  const top = (sub as unknown as { current_period_end?: number }).current_period_end
  if (typeof top === "number") return top
  const item = sub.items?.data?.[0] as unknown as { current_period_end?: number } | undefined
  return item?.current_period_end
}

/**
 * Crea la cuenta del paciente, su cita y su suscripción a partir de una sesión
 * de Checkout pagada del flujo público. Idempotente: se llama desde la página
 * de éxito y desde el webhook; solo envía emails la primera vez.
 */
export async function provisionFromSession(sessionId: string): Promise<{ email: string } | null> {
  const session = await stripe.checkout.sessions.retrieve(sessionId)
  if (session.metadata?.kind !== "public_signup") return null
  if (session.payment_status !== "paid" && session.status !== "complete") return null

  const email = (session.metadata.email || session.customer_email || "").toLowerCase()
  const name = session.metadata.name || "Paciente"
  const doctorId = session.metadata.doctorId
  const startUtcISO = session.metadata.startUtcISO
  const endUtcISO = session.metadata.endUtcISO
  if (!email || !doctorId || !startUtcISO) return null

  // 1) Cuenta del paciente (con contraseña temporal) — idempotente.
  let userId: string
  let tempPassword: string | null = null
  let freshlyCreated = false
  const [already] = await db.select({ id: user.id }).from(user).where(eq(user.email, email)).limit(1)
  if (already) {
    userId = already.id
  } else {
    const pwd = generateTempPassword()
    try {
      const created = await auth.api.signUpEmail({ body: { name, email, password: pwd } })
      userId = created.user.id
      tempPassword = pwd
      freshlyCreated = true
    } catch {
      // Perdió la carrera con otra ejecución: reusar la cuenta existente.
      const [u] = await db.select({ id: user.id }).from(user).where(eq(user.email, email)).limit(1)
      if (!u) return null
      userId = u.id
    }
  }

  // 2) Cita confirmada (incluida en la suscripción → importe 0). Idempotente por sesión.
  const [existingAppt] = await db
    .select({ id: appointments.id })
    .from(appointments)
    .where(eq(appointments.stripeSessionId, session.id))
    .limit(1)
  if (!existingAppt) {
    const start = new Date(startUtcISO)
    const end = endUtcISO ? new Date(endUtcISO) : new Date(start.getTime() + 30 * 60_000)
    const [appt] = await db
      .insert(appointments)
      .values({
        patientId: userId,
        doctorId,
        startsAt: start,
        endsAt: end,
        status: "confirmed",
        amountCents: 0,
        applicationFeeCents: 0,
        stripeSessionId: session.id,
      })
      .returning({ id: appointments.id })

    // Enlace de Google Meet (si está configurado).
    try {
      const [doc] = await db
        .select({ email: user.email })
        .from(user)
        .where(eq(user.id, doctorId))
        .limit(1)
      const meeting = await maybeCreateMeeting({
        doctorId,
        doctorEmail: doc?.email ?? "",
        patientEmail: email,
        summary: "Primera consulta · DoctorLife",
        startUtc: start,
        endUtc: end,
      })
      if (meeting.meetingUrl || meeting.googleEventId) {
        await db
          .update(appointments)
          .set({ meetingUrl: meeting.meetingUrl, googleEventId: meeting.googleEventId, updatedAt: new Date() })
          .where(eq(appointments.id, appt.id))
      }
    } catch (e) {
      console.log("[v0] provision meeting error:", e instanceof Error ? e.message : e)
    }
  }

  // 3) Suscripción — idempotente por paciente.
  const stripeSubId = (session.subscription as string | null) ?? null
  const [existingSub] = await db
    .select({ id: subscriptions.id })
    .from(subscriptions)
    .where(eq(subscriptions.patientId, userId))
    .limit(1)
  if (!existingSub) {
    let status = "active"
    let currentPeriodEnd: Date | null = null
    let cancelAtPeriodEnd = false
    if (stripeSubId) {
      const sub = await stripe.subscriptions.retrieve(stripeSubId)
      status = sub.status
      cancelAtPeriodEnd = Boolean(sub.cancel_at_period_end)
      const pe = periodEnd(sub)
      currentPeriodEnd = pe ? new Date(pe * 1000) : null
    }
    await db.insert(subscriptions).values({
      patientId: userId,
      doctorId,
      plan: MAIN_PLAN.name,
      priceCents: MAIN_PLAN.priceCents,
      status,
      stripeCustomerId: (session.customer as string | null) ?? undefined,
      stripeSubscriptionId: stripeSubId ?? undefined,
      currentPeriodEnd,
      cancelAtPeriodEnd,
    })
  }

  // 4) Emails — solo la primera vez (cuenta recién creada).
  if (freshlyCreated && tempPassword) {
    try {
      await sendCredentialsEmail({ to: email, name, tempPassword })
      const [doc] = await db
        .select({ fullName: doctorProfiles.fullName })
        .from(doctorProfiles)
        .where(eq(doctorProfiles.userId, doctorId))
        .limit(1)
      await sendBookingConfirmationEmail({
        to: email,
        name,
        doctorName: doc?.fullName ?? null,
        startsAt: new Date(startUtcISO),
        amountLabel: MAIN_PLAN.totalLabel,
      })
    } catch (e) {
      console.log("[v0] provision email error:", e instanceof Error ? e.message : e)
    }
  }

  return { email }
}
