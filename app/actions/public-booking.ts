"use server"

import { db } from "@/lib/db"
import { appointments, user, doctorProfiles } from "@/lib/db/schema"
import { auth } from "@/lib/auth"
import { stripe } from "@/lib/stripe"
import { getBaseUrl } from "@/lib/base-url"
import { FIRST_VISIT_CENTS, FIRST_VISIT_LABEL } from "@/lib/plans"
import { getPooledSlots } from "@/lib/scheduling/pool"
import { generateTempPassword } from "@/lib/credentials"
import { sendCredentialsEmail, sendBookingConfirmationEmail } from "@/lib/email"
import { maybeCreateMeeting } from "@/lib/google/calendar"
import { eq } from "drizzle-orm"
import type { PooledSlot } from "@/lib/scheduling/types"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Huecos combinados de todos los médicos (público, sin sesión). */
export async function getPublicSlots(days = 14): Promise<PooledSlot[]> {
  const from = new Date()
  const to = new Date(from.getTime() + days * 864e5)
  return getPooledSlots({ from, to })
}

/**
 * Flujo público (sin cuenta): el visitante elige hora y paga la PRIMERA VISITA
 * (pago único de 25 €). La cuenta del paciente se crea DESPUÉS del pago (ver
 * provisionFromSession) y se le envían las credenciales por email. La suscripción
 * mensual se activa más tarde, cuando el paciente desbloquea su receta.
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
      error: "Ya existe una cuenta con este correo. Inicia sesión para reservar desde tu panel.",
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

  // La primera consulta (25 €) va ÍNTEGRA al médico asignado a la llamada: es un
  // cargo con destino (destination charge) sin comisión de plataforma, siempre
  // que su cuenta Connect esté lista para cobrar.
  const [doc] = await db
    .select({ stripeAccountId: doctorProfiles.stripeAccountId, chargesEnabled: doctorProfiles.chargesEnabled })
    .from(doctorProfiles)
    .where(eq(doctorProfiles.userId, slot.doctorId))
    .limit(1)
  const paymentIntentData: Record<string, unknown> = {}
  if (doc?.stripeAccountId && doc.chargesEnabled) {
    // Sin application_fee_amount => el médico recibe el importe completo.
    paymentIntentData.transfer_data = { destination: doc.stripeAccountId }
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: FIRST_VISIT_CENTS,
            product_data: {
              name: "Primera visita · DoctorLife",
              description: "Evaluación con tu endocrino. Incluye acceso a tu panel privado.",
            },
          },
        },
      ],
      ...(Object.keys(paymentIntentData).length ? { payment_intent_data: paymentIntentData } : {}),
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

/**
 * Crea la cuenta del paciente y su primera cita a partir de una sesión de
 * Checkout pagada (pago único de 25 €). NO crea suscripción: esa se activa
 * después, cuando el paciente desbloquea su receta. Idempotente: se llama desde
 * la página de éxito y desde el webhook; solo envía emails la primera vez.
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

  // 2) Cita confirmada de la primera visita (pago único 25 €). Idempotente por sesión.
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
        amountCents: FIRST_VISIT_CENTS,
        applicationFeeCents: 0,
        stripePaymentIntentId: (session.payment_intent as string | null) ?? null,
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

  // 3) Emails — solo la primera vez (cuenta recién creada).
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
        amountLabel: FIRST_VISIT_LABEL,
      })
    } catch (e) {
      console.log("[v0] provision email error:", e instanceof Error ? e.message : e)
    }
  }

  return { email }
}
