"use server"

import { db } from "@/lib/db"
import { appointments, doctorProfiles, subscriptions, user } from "@/lib/db/schema"
import { getSessionUser, requireRole } from "@/lib/session"
import { stripe } from "@/lib/stripe"
import { getBaseUrl } from "@/lib/base-url"
import { getPooledSlots, isSlotFree } from "@/lib/scheduling/pool"
import { maybeCreateMeeting } from "@/lib/google/calendar"
import { and, asc, desc, eq, gte, inArray, lte, ne } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import type { PooledSlot } from "@/lib/scheduling/types"

const SUB_ACTIVE_STATES = ["active", "trialing", "past_due"]

const CONSULT_PRICE_CENTS = 2500

/** Huecos combinados de todos los médicos para los próximos `days` días. */
export async function getPooledAvailability(days = 14): Promise<PooledSlot[]> {
  const from = new Date()
  const to = new Date(from.getTime() + days * 24 * 60 * 60_000)
  return getPooledSlots({ from, to })
}

/**
 * Reserva un hueco y crea la sesión de pago de Stripe (cargo a la plataforma).
 * El médico se asigna automáticamente entre los disponibles para esa hora.
 */
export async function createBookingCheckout(
  startUtcISO: string,
): Promise<{ url: string } | { error: string }> {
  const patient = await requireRole("patient")

  const start = new Date(startUtcISO)
  if (Number.isNaN(start.getTime()) || start.getTime() < Date.now()) {
    return { error: "Ese horario ya no es válido." }
  }

  // Recalculamos la agenda combinada y localizamos el hueco elegido.
  const slots = await getPooledSlots({
    from: new Date(),
    to: new Date(Date.now() + 30 * 24 * 60 * 60_000),
  })
  const slot = slots.find((s) => s.startUtc === start.toISOString())
  if (!slot) return { error: "Ese horario ya no está disponible. Elige otro." }

  // Doble comprobación de que sigue libre para el médico asignado.
  if (!(await isSlotFree(slot.doctorId, start))) {
    return { error: "Ese horario acaba de ocuparse. Elige otro." }
  }

  // Creamos la cita en estado pending_payment (reserva el hueco).
  let appointmentId: number
  try {
    const [row] = await db
      .insert(appointments)
      .values({
        patientId: patient.id,
        doctorId: slot.doctorId,
        startsAt: start,
        endsAt: new Date(slot.endUtc),
        status: "pending_payment",
        amountCents: CONSULT_PRICE_CENTS,
        // La primera consulta va íntegra al médico (sin comisión de plataforma).
        applicationFeeCents: 0,
      })
      .returning({ id: appointments.id })
    appointmentId = row.id
  } catch {
    return { error: "Ese horario acaba de ocuparse. Elige otro." }
  }

  // Cargo a la plataforma. El reparto al médico se hace por transferencia
  // separada al confirmar el pago (separate charges and transfers).
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: patient.email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: CONSULT_PRICE_CENTS,
            product_data: {
              name: "Primera consulta médica · DoctorLife",
              description: `Cita con ${slot.doctorName} el ${slot.date} a las ${slot.label}`,
            },
          },
        },
      ],
      metadata: { appointmentId: String(appointmentId) },
      payment_intent_data: { metadata: { appointmentId: String(appointmentId) } },
      success_url: `${getBaseUrl()}/portal/citas?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${getBaseUrl()}/portal/reservar?cancelled=1`,
    })

    await db
      .update(appointments)
      .set({ stripeSessionId: session.id, updatedAt: new Date() })
      .where(eq(appointments.id, appointmentId))

    if (!session.url) return { error: "No se pudo iniciar el pago." }
    return { url: session.url }
  } catch (e) {
    // Liberamos la reserva si falla la creación del pago.
    await db.delete(appointments).where(eq(appointments.id, appointmentId))
    return { error: e instanceof Error ? e.message : "No se pudo iniciar el pago." }
  }
}

/**
 * Reserva una cita de seguimiento incluida en la suscripción activa (sin pago).
 * Se usa desde el portal del paciente para las videollamadas mensuales.
 */
export async function createIncludedBooking(
  startUtcISO: string,
): Promise<{ ok: true } | { error: string }> {
  const patient = await requireRole("patient")

  // Debe tener una suscripción activa para reservar gratis.
  const [sub] = await db
    .select({ doctorId: subscriptions.doctorId, status: subscriptions.status })
    .from(subscriptions)
    .where(
      and(
        eq(subscriptions.patientId, patient.id),
        inArray(subscriptions.status, SUB_ACTIVE_STATES),
      ),
    )
    .orderBy(desc(subscriptions.id))
    .limit(1)
  if (!sub) {
    return { error: "Necesitas una suscripción activa para reservar tu videollamada." }
  }

  const start = new Date(startUtcISO)
  if (Number.isNaN(start.getTime()) || start.getTime() < Date.now()) {
    return { error: "Ese horario ya no es válido." }
  }

  const slots = await getPooledSlots({
    from: new Date(),
    to: new Date(Date.now() + 30 * 24 * 60 * 60_000),
  })
  const slot = slots.find((s) => s.startUtc === start.toISOString())
  if (!slot) return { error: "Ese horario ya no está disponible. Elige otro." }

  // Preferimos mantener al endocrino asignado en la suscripción si está libre.
  let doctorId = slot.doctorId
  if (sub.doctorId && (await isSlotFree(sub.doctorId, start))) {
    doctorId = sub.doctorId
  } else if (!(await isSlotFree(slot.doctorId, start))) {
    return { error: "Ese horario acaba de ocuparse. Elige otro." }
  }

  let appointmentId: number
  try {
    const [row] = await db
      .insert(appointments)
      .values({
        patientId: patient.id,
        doctorId,
        startsAt: start,
        endsAt: new Date(slot.endUtc),
        status: "confirmed",
        amountCents: 0,
        applicationFeeCents: 0,
      })
      .returning({ id: appointments.id })
    appointmentId = row.id
  } catch {
    return { error: "Ese horario acaba de ocuparse. Elige otro." }
  }

  // Crea el enlace de la videollamada (si Google está configurado).
  const [doc] = await db
    .select({ email: user.email })
    .from(doctorProfiles)
    .innerJoin(user, eq(user.id, doctorProfiles.userId))
    .where(eq(doctorProfiles.userId, doctorId))
  const [pat] = await db.select({ email: user.email }).from(user).where(eq(user.id, patient.id))
  const meeting = await maybeCreateMeeting({
    doctorId,
    doctorEmail: doc?.email ?? "",
    patientEmail: pat?.email ?? "",
    summary: "Seguimiento mensual · DoctorLife",
    startUtc: start,
    endUtc: new Date(slot.endUtc),
  })
  if (meeting.meetingUrl || meeting.googleEventId) {
    await db
      .update(appointments)
      .set({ meetingUrl: meeting.meetingUrl, googleEventId: meeting.googleEventId, updatedAt: new Date() })
      .where(eq(appointments.id, appointmentId))
  }

  // El seguimiento de este ciclo queda agendado: limpiamos el aviso pendiente.
  await db
    .update(subscriptions)
    .set({ followupDueAt: null, updatedAt: new Date() })
    .where(
      and(
        eq(subscriptions.patientId, patient.id),
        inArray(subscriptions.status, SUB_ACTIVE_STATES),
      ),
    )

  revalidatePath("/portal/citas")
  revalidatePath("/portal")
  revalidatePath("/medico/citas")
  return { ok: true }
}

/**
 * Confirma una cita a partir de la sesión de Stripe (idempotente).
 * Se llama desde la página de éxito y desde el webhook.
 */
export async function confirmAppointmentBySession(sessionId: string): Promise<void> {
  const session = await stripe.checkout.sessions.retrieve(sessionId)
  if (session.payment_status !== "paid") return
  const appointmentId = Number(session.metadata?.appointmentId)
  if (!appointmentId) return
  await finalizeAppointment(appointmentId, session.payment_intent as string | null)
}

/** Marca la cita como confirmada, transfiere al médico y crea el Meet. */
export async function finalizeAppointment(
  appointmentId: number,
  paymentIntentId: string | null,
): Promise<void> {
  const [appt] = await db
    .select()
    .from(appointments)
    .where(eq(appointments.id, appointmentId))
  if (!appt || appt.status === "confirmed") return

  await db
    .update(appointments)
    .set({
      status: "confirmed",
      stripePaymentIntentId: paymentIntentId ?? appt.stripePaymentIntentId,
      updatedAt: new Date(),
    })
    .where(eq(appointments.id, appointmentId))

  // Datos del médico y paciente para transferencia y reunión.
  const [doc] = await db
    .select({
      stripeAccountId: doctorProfiles.stripeAccountId,
      chargesEnabled: doctorProfiles.chargesEnabled,
      email: user.email,
    })
    .from(doctorProfiles)
    .innerJoin(user, eq(user.id, doctorProfiles.userId))
    .where(eq(doctorProfiles.userId, appt.doctorId))

  // Transferencia al médico (payout) — solo si su cuenta Connect está lista.
  if (doc?.stripeAccountId && doc.chargesEnabled && paymentIntentId) {
    try {
      const pi = await stripe.paymentIntents.retrieve(paymentIntentId)
      const amount = appt.amountCents - appt.applicationFeeCents
      await stripe.transfers.create({
        amount,
        currency: appt.currency,
        destination: doc.stripeAccountId,
        source_transaction: pi.latest_charge as string,
        metadata: { appointmentId: String(appointmentId) },
      })
    } catch (e) {
      console.log("[v0] transfer to doctor failed:", e instanceof Error ? e.message : e)
    }
  }

  // Enlace de Google Meet (si Google está configurado y el médico conectado).
  const [pat] = await db.select({ email: user.email }).from(user).where(eq(user.id, appt.patientId))
  const meeting = await maybeCreateMeeting({
    doctorId: appt.doctorId,
    doctorEmail: doc?.email ?? "",
    patientEmail: pat?.email ?? "",
    summary: "Primera consulta · DoctorLife",
    startUtc: new Date(appt.startsAt),
    endUtc: new Date(appt.endsAt),
  })
  if (meeting.meetingUrl || meeting.googleEventId) {
    await db
      .update(appointments)
      .set({
        meetingUrl: meeting.meetingUrl,
        googleEventId: meeting.googleEventId,
        updatedAt: new Date(),
      })
      .where(eq(appointments.id, appointmentId))
  }

  revalidatePath("/portal/citas")
  revalidatePath("/medico/citas")
}

/** Citas del paciente autenticado, con el nombre del médico asignado. */
export async function getMyAppointments() {
  const me = await getSessionUser()
  if (!me) return []
  return db
    .select({
      id: appointments.id,
      startsAt: appointments.startsAt,
      endsAt: appointments.endsAt,
      status: appointments.status,
      amountCents: appointments.amountCents,
      meetingUrl: appointments.meetingUrl,
      doctorName: doctorProfiles.fullName,
    })
    .from(appointments)
    .leftJoin(doctorProfiles, eq(doctorProfiles.userId, appointments.doctorId))
    .where(and(eq(appointments.patientId, me.id)))
    .orderBy(appointments.startsAt)
}

/** Citas del médico autenticado dentro de un rango (para la agenda/calendario). */
export async function getDoctorAppointments(fromISO?: string, toISO?: string) {
  const me = await getSessionUser()
  if (!me) return []

  const from = fromISO ? new Date(fromISO) : new Date(Date.now() - 60 * 24 * 60 * 60_000)
  const to = toISO ? new Date(toISO) : new Date(Date.now() + 120 * 24 * 60 * 60_000)

  const rows = await db
    .select({
      id: appointments.id,
      startsAt: appointments.startsAt,
      endsAt: appointments.endsAt,
      status: appointments.status,
      amountCents: appointments.amountCents,
      meetingUrl: appointments.meetingUrl,
      patientName: user.name,
      patientEmail: user.email,
    })
    .from(appointments)
    .leftJoin(user, eq(user.id, appointments.patientId))
    .where(
      and(
        eq(appointments.doctorId, me.id),
        ne(appointments.status, "pending_payment"),
        gte(appointments.startsAt, from),
        lte(appointments.startsAt, to),
      ),
    )
    .orderBy(asc(appointments.startsAt))

  return rows.map((r) => ({
    id: r.id,
    startsAt: r.startsAt,
    endsAt: r.endsAt,
    status: r.status,
    amountCents: r.amountCents,
    meetingUrl: r.meetingUrl,
    patientName: r.patientName ?? r.patientEmail ?? "Paciente",
  }))
}

/** Próxima cita futura no cancelada del paciente (o null). */
export async function getNextAppointment() {
  const me = await getSessionUser()
  if (!me) return null
  const [next] = await db
    .select({
      id: appointments.id,
      startsAt: appointments.startsAt,
      endsAt: appointments.endsAt,
      status: appointments.status,
      meetingUrl: appointments.meetingUrl,
      doctorName: doctorProfiles.fullName,
    })
    .from(appointments)
    .leftJoin(doctorProfiles, eq(doctorProfiles.userId, appointments.doctorId))
    .where(
      and(
        eq(appointments.patientId, me.id),
        ne(appointments.status, "cancelled"),
        gte(appointments.startsAt, new Date()),
      ),
    )
    .orderBy(asc(appointments.startsAt))
    .limit(1)
  return next ?? null
}
