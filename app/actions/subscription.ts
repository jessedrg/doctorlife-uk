"use server"

import { db } from "@/lib/db"
import { subscriptions, appointments, doctorProfiles, leads } from "@/lib/db/schema"
import { getSessionUser, requireRole } from "@/lib/session"
import { stripe, DOCTOR_SHARE_CENTS } from "@/lib/stripe"
import { getBaseUrl } from "@/lib/base-url"
import { getPlan, defaultPlan, FIRST_VISIT_CENTS, type PlanInfo } from "@/lib/plans"
import { and, desc, eq, inArray } from "drizzle-orm"
import { revalidatePath } from "next/cache"

const ACTIVE_STATES = ["active", "trialing", "past_due", "incomplete"] as const

/** Suscripción vigente del paciente autenticado (o null). */
export async function getMySubscription() {
  const me = await getSessionUser()
  if (!me) return null
  const [row] = await db
    .select({
      id: subscriptions.id,
      plan: subscriptions.plan,
      priceCents: subscriptions.priceCents,
      status: subscriptions.status,
      currentPeriodEnd: subscriptions.currentPeriodEnd,
      cancelAtPeriodEnd: subscriptions.cancelAtPeriodEnd,
      doctorName: doctorProfiles.fullName,
    })
    .from(subscriptions)
    .leftJoin(doctorProfiles, eq(doctorProfiles.userId, subscriptions.doctorId))
    .where(eq(subscriptions.patientId, me.id))
    .orderBy(desc(subscriptions.id))
    .limit(1)
  return row ?? null
}

/** ¿El paciente tiene una suscripción que da acceso al tratamiento/recetas? */
export async function hasActiveSubscription(patientId: string): Promise<boolean> {
  const [row] = await db
    .select({ id: subscriptions.id })
    .from(subscriptions)
    .where(
      and(
        eq(subscriptions.patientId, patientId),
        inArray(subscriptions.status, ["active", "trialing", "past_due"]),
      ),
    )
    .limit(1)
  return Boolean(row)
}

/** Médico asignado al paciente: el de su cita más reciente. */
async function getAssignedDoctorId(patientId: string): Promise<string | null> {
  const [appt] = await db
    .select({ doctorId: appointments.doctorId })
    .from(appointments)
    .where(eq(appointments.patientId, patientId))
    .orderBy(desc(appointments.id))
    .limit(1)
  return appt?.doctorId ?? null
}

/** Plan elegido por el paciente en el quiz (por email), con fallback al recomendado. */
async function getPatientPlan(email: string): Promise<PlanInfo> {
  const [lead] = await db
    .select({ plan: leads.plan })
    .from(leads)
    .where(eq(leads.email, email.toLowerCase()))
    .orderBy(desc(leads.id))
    .limit(1)
  return getPlan(lead?.plan) ?? defaultPlan()
}

/**
 * Inicia el checkout de la suscripción mensual del tratamiento.
 * Cobro recurrente a la plataforma con comisión + transferencia al médico
 * (destination charge) cuando su cuenta Connect está lista.
 */
export async function startSubscriptionCheckout(): Promise<{ url: string } | { error: string }> {
  const patient = await requireRole("patient")

  // ¿Ya tiene una suscripción activa?
  const [existing] = await db
    .select({ id: subscriptions.id, status: subscriptions.status })
    .from(subscriptions)
    .where(
      and(
        eq(subscriptions.patientId, patient.id),
        inArray(subscriptions.status, ["active", "trialing", "past_due"]),
      ),
    )
    .limit(1)
  if (existing) return { error: "Ya tienes una suscripción activa." }

  const doctorId = await getAssignedDoctorId(patient.id)
  if (!doctorId) {
    return { error: "Primero reserva tu primera visita para activar el tratamiento." }
  }

  const plan = await getPatientPlan(patient.email)

  // Guardamos (o reutilizamos) una fila de suscripción en estado incompleto.
  const [pending] = await db
    .insert(subscriptions)
    .values({
      patientId: patient.id,
      doctorId,
      plan: plan.name,
      priceCents: plan.priceCents,
      status: "incomplete",
    })
    .returning({ id: subscriptions.id })

  // El cobro de la suscripción se hace ÍNTEGRO a la plataforma (la empresa).
  // El reparto al médico (25 € fijos por pago) se realiza con una transferencia
  // separada al confirmarse cada factura (ver payoutDoctorForInvoice en el
  // webhook invoice.paid). Así "el resto" se queda en la cuenta de la empresa.
  const subscriptionData: Record<string, unknown> = {
    metadata: { subscriptionRowId: String(pending.id), patientId: patient.id, doctorId },
  }

  try {
    // El primer mes se descuentan los 25 € ya abonados en la primera visita:
    // 65 € − 25 € = 40 €. Los meses siguientes se cobran al precio normal.
    const firstMonthCoupon = await stripe.coupons.create({
      amount_off: FIRST_VISIT_CENTS,
      currency: "eur",
      duration: "once",
      name: "Primera visita ya abonada",
    })

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: patient.email,
      discounts: [{ coupon: firstMonthCoupon.id }],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: plan.priceCents,
            recurring: { interval: "month" },
            product_data: {
              name: `${plan.name} · DoctorLife`,
              description: "Tratamiento mensual con seguimiento médico (primer mes: 25 € de descuento)",
            },
          },
        },
      ],
      subscription_data: subscriptionData,
      metadata: { subscriptionRowId: String(pending.id) },
      success_url: `${getBaseUrl()}/portal/recetas?subscription=ok&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${getBaseUrl()}/portal/recetas?subscription=cancelled`,
    })

    if (!session.url) {
      await db.delete(subscriptions).where(eq(subscriptions.id, pending.id))
      return { error: "No se pudo iniciar la suscripción." }
    }
    return { url: session.url }
  } catch (e) {
    await db.delete(subscriptions).where(eq(subscriptions.id, pending.id))
    return { error: e instanceof Error ? e.message : "No se pudo iniciar la suscripción." }
  }
}

/** Sincroniza la suscripción a partir de la sesión de Checkout (idempotente). */
export async function syncSubscriptionBySession(sessionId: string): Promise<void> {
  const session = await stripe.checkout.sessions.retrieve(sessionId)
  const rowId = Number(session.metadata?.subscriptionRowId)
  if (!rowId || !session.subscription) return
  const sub = await stripe.subscriptions.retrieve(session.subscription as string)
  await applySubscriptionState(rowId, sub, session.customer as string | null)
}

/** Aplica el estado de una suscripción de Stripe a nuestra fila. */
export async function applySubscriptionState(
  rowId: number,
  sub: { id: string; status: string; cancel_at_period_end?: boolean; current_period_end?: number },
  customerId: string | null,
): Promise<void> {
  await db
    .update(subscriptions)
    .set({
      stripeSubscriptionId: sub.id,
      stripeCustomerId: customerId ?? undefined,
      status: sub.status,
      cancelAtPeriodEnd: Boolean(sub.cancel_at_period_end),
      currentPeriodEnd: sub.current_period_end ? new Date(sub.current_period_end * 1000) : null,
      updatedAt: new Date(),
    })
    .where(eq(subscriptions.id, rowId))
  revalidatePath("/portal")
}

/** Cancela la suscripción al final del periodo (la programa, no corta el acceso). */
export async function cancelMySubscription(): Promise<{ ok: boolean; error?: string }> {
  const me = await requireRole("patient")
  const [row] = await db
    .select()
    .from(subscriptions)
    .where(
      and(eq(subscriptions.patientId, me.id), inArray(subscriptions.status, ["active", "trialing", "past_due"])),
    )
    .limit(1)
  if (!row || !row.stripeSubscriptionId) return { ok: false, error: "No tienes una suscripción activa." }

  try {
    await stripe.subscriptions.update(row.stripeSubscriptionId, { cancel_at_period_end: true })
    await db
      .update(subscriptions)
      .set({ cancelAtPeriodEnd: true, updatedAt: new Date() })
      .where(eq(subscriptions.id, row.id))
    revalidatePath("/portal")
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "No se pudo cancelar." }
  }
}

/**
 * Transfiere al médico asignado su parte fija (25 €) de un pago de suscripción.
 * El cobro entró íntegro en la cuenta de la empresa; aquí movemos 25 € al médico
 * mediante una transferencia separada usando el cargo de la factura como origen.
 * Idempotente: la idempotency key por factura evita pagos duplicados si el
 * webhook se reintenta.
 */
export async function payoutDoctorForInvoice(invoice: {
  id?: string
  subscription?: string | null
  charge?: string | null
  amount_paid?: number | null
}): Promise<void> {
  const subId = invoice.subscription
  const chargeId = invoice.charge
  if (!subId || !chargeId || !invoice.id) return

  // Localizamos la suscripción y su médico asignado.
  const [row] = await db
    .select({ doctorId: subscriptions.doctorId })
    .from(subscriptions)
    .where(eq(subscriptions.stripeSubscriptionId, subId))
    .limit(1)
  if (!row?.doctorId) return

  const [doc] = await db
    .select({
      stripeAccountId: doctorProfiles.stripeAccountId,
      chargesEnabled: doctorProfiles.chargesEnabled,
    })
    .from(doctorProfiles)
    .where(eq(doctorProfiles.userId, row.doctorId))
    .limit(1)
  if (!doc?.stripeAccountId || !doc.chargesEnabled) return

  // Nunca transferimos más de lo cobrado en la factura.
  const amount = Math.min(DOCTOR_SHARE_CENTS, invoice.amount_paid ?? DOCTOR_SHARE_CENTS)
  if (amount <= 0) return

  try {
    await stripe.transfers.create(
      {
        amount,
        currency: "eur",
        destination: doc.stripeAccountId,
        source_transaction: chargeId,
        metadata: { kind: "subscription_doctor_share", invoiceId: invoice.id, doctorId: row.doctorId },
      },
      { idempotencyKey: `sub-payout-${invoice.id}` },
    )
  } catch (e) {
    console.log("[v0] subscription payout to doctor failed:", e instanceof Error ? e.message : e)
  }
}

/** Localiza la fila por id de suscripción de Stripe (para webhooks). */
export async function findSubscriptionRowByStripeId(stripeSubscriptionId: string) {
  const [row] = await db
    .select({ id: subscriptions.id })
    .from(subscriptions)
    .where(eq(subscriptions.stripeSubscriptionId, stripeSubscriptionId))
    .limit(1)
  return row ?? null
}
