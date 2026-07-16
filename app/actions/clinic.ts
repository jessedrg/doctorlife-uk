"use server"

import { db } from "@/lib/db"
import { clinics, appointments, subscriptions } from "@/lib/db/schema"
import { getSessionUser } from "@/lib/session"
import { stripe, PLATFORM_FEE_PERCENT, isStripeConfigured } from "@/lib/stripe"
import { getClinic, setClinicStatus } from "@/lib/clinic"
import { getRequestBaseUrl } from "@/lib/base-url"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

async function requireAdmin() {
  const user = await getSessionUser()
  if (!user || user.role !== "admin") throw new Error("Unauthorized")
  return user
}

export type ClinicStatus = {
  id: number
  name: string
  taxId: string | null
  stripeAccountId: string | null
  stripeOnboarded: boolean
  chargesEnabled: boolean
  payoutsEnabled: boolean
  /** Puede cobrar actos médicos ahora mismo. */
  ready: boolean
}

/** Estado actual de la clínica para el panel de admin. */
export async function getClinicStatus(): Promise<ClinicStatus> {
  await requireAdmin()
  const c = await getClinic()
  return {
    id: c.id,
    name: c.name,
    taxId: c.taxId,
    stripeAccountId: c.stripeAccountId,
    stripeOnboarded: c.stripeOnboarded,
    chargesEnabled: c.chargesEnabled,
    payoutsEnabled: c.payoutsEnabled,
    ready: Boolean(c.stripeAccountId && c.chargesEnabled),
  }
}

/** Actualiza los datos fiscales de la clínica (nombre y CIF/NIF). */
export async function updateClinicDetails(input: {
  name?: string
  taxId?: string
}): Promise<{ ok: true } | { error: string }> {
  await requireAdmin()
  const c = await getClinic()
  await db
    .update(clinics)
    .set({
      name: input.name?.trim() || c.name,
      taxId: input.taxId?.trim() || null,
      updatedAt: new Date(),
    })
    .where(eq(clinics.id, c.id))
  revalidatePath("/admin/clinica")
  return { ok: true }
}

/**
 * Crea (si hace falta) la cuenta Stripe Connect de la clínica y devuelve un
 * enlace de onboarding alojado por Stripe. La clínica es el comerciante de
 * liquidación: cobra el acto médico y DoctorLife retiene su comisión.
 */
export async function startClinicStripeOnboarding(): Promise<
  { url: string } | { error: string }
> {
  const admin = await requireAdmin()
  const clinic = await getClinic()

  try {
    let accountId = clinic.stripeAccountId

    if (!accountId) {
      const account = await stripe.accounts.create({
        type: "express",
        country: "ES",
        email: admin.email,
        business_type: "company",
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
        business_profile: {
          mcc: "8062", // hospitals / clínicas
          name: clinic.name,
        },
        metadata: { clinicId: String(clinic.id) },
      })
      accountId = account.id
      await db
        .update(clinics)
        .set({ stripeAccountId: accountId, updatedAt: new Date() })
        .where(eq(clinics.id, clinic.id))
    }

    const baseUrl = await getRequestBaseUrl()
    const link = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${baseUrl}/admin/clinica?refresh=1`,
      return_url: `${baseUrl}/admin/clinica?done=1`,
      type: "account_onboarding",
    })
    return { url: link.url }
  } catch (e) {
    const raw = e instanceof Error ? e.message : String(e)
    if (raw.includes("signed up for Connect") || raw.includes("Connect")) {
      return {
        error:
          "Stripe Connect aún no está activado en la cuenta de la plataforma. Actívalo en el panel de Stripe (Connect → Empezar) y vuelve a intentarlo.",
      }
    }
    return { error: raw }
  }
}

/** Relee el estado de la cuenta Connect en Stripe y lo sincroniza en la BD. */
export async function refreshClinicStripeStatus(): Promise<
  { ok: true } | { error: string }
> {
  await requireAdmin()
  const clinic = await getClinic()
  if (!clinic.stripeAccountId) return { error: "La clínica no tiene cuenta de Stripe." }

  try {
    const acct = await stripe.accounts.retrieve(clinic.stripeAccountId)
    await setClinicStatus(clinic.id, {
      chargesEnabled: Boolean(acct.charges_enabled),
      payoutsEnabled: Boolean(acct.payouts_enabled),
      stripeOnboarded: Boolean(acct.details_submitted),
    })
    revalidatePath("/admin/clinica")
    return { ok: true }
  } catch (e) {
    return { error: e instanceof Error ? e.message : "No se pudo comprobar el estado." }
  }
}

export type FeePeriod = {
  label: string
  feeCents: number
  count: number
}

export type PlatformFeeTracking = {
  available: boolean
  /** Comisión tecnológica total cobrada por DoctorLife (céntimos). */
  totalFeeCents: number
  /** Importe bruto liquidado en la clínica (céntimos). */
  grossToClinicCents: number
  /** Nº de cobros con comisión. */
  count: number
  feePercent: number
  currency: string
  /** Últimas comisiones agrupadas por mes. */
  months: FeePeriod[]
  /** Contexto de negocio desde la BD. */
  activeSubscriptions: number
  paidAppointments: number
}

/**
 * Tracking de la comisión tecnológica de DoctorLife.
 *
 * Cada cobro de la clínica lleva un `application_fee` que Stripe abona
 * automáticamente a la plataforma. Aquí sumamos esas comisiones (lo que la
 * clínica nos paga por el servicio tecnológico) y mostramos el bruto liquidado
 * en la clínica, para tener la foto completa de cuánto nos corresponde.
 */
export async function getPlatformFeeTracking(limit = 100): Promise<PlatformFeeTracking> {
  await requireAdmin()

  const [subsCountRow] = await db
    .select({ n: subscriptions.id })
    .from(subscriptions)
    .where(eq(subscriptions.status, "active"))
    .limit(1)
    .catch(() => [{ n: 0 }] as unknown as { n: number }[])

  // Conteos de negocio (best-effort).
  let activeSubscriptions = 0
  let paidAppointments = 0
  try {
    const subs = await db
      .select({ id: subscriptions.id })
      .from(subscriptions)
      .where(eq(subscriptions.status, "active"))
    activeSubscriptions = subs.length
    const appts = await db
      .select({ id: appointments.id })
      .from(appointments)
      .where(eq(appointments.status, "confirmed"))
    paidAppointments = appts.length
  } catch {
    // ignore
  }
  void subsCountRow

  const empty: PlatformFeeTracking = {
    available: false,
    totalFeeCents: 0,
    grossToClinicCents: 0,
    count: 0,
    feePercent: PLATFORM_FEE_PERCENT,
    currency: "eur",
    months: [],
    activeSubscriptions,
    paidAppointments,
  }

  if (!isStripeConfigured) return empty

  try {
    const fees = await stripe.applicationFees.list({ limit })
    if (!fees.data.length) return { ...empty, available: true }

    let totalFeeCents = 0
    let grossCents = 0
    const byMonth = new Map<string, { fee: number; count: number }>()

    for (const f of fees.data) {
      totalFeeCents += f.amount
      // El bruto del cargo asociado (importe que fue a la clínica antes de fee).
      const chargeAmount =
        typeof f.charge === "object" && f.charge ? (f.charge.amount ?? 0) : 0
      grossCents += chargeAmount
      const d = new Date(f.created * 1000)
      const key = d.toLocaleDateString("es-ES", { month: "long", year: "numeric" })
      const cur = byMonth.get(key) ?? { fee: 0, count: 0 }
      cur.fee += f.amount
      cur.count += 1
      byMonth.set(key, cur)
    }

    const months: FeePeriod[] = [...byMonth.entries()].map(([label, v]) => ({
      label,
      feeCents: v.fee,
      count: v.count,
    }))

    return {
      available: true,
      totalFeeCents,
      grossToClinicCents: grossCents,
      count: fees.data.length,
      feePercent: PLATFORM_FEE_PERCENT,
      currency: fees.data[0]?.currency ?? "eur",
      months,
      activeSubscriptions,
      paidAppointments,
    }
  } catch (e) {
    console.log("[v0] application fees fetch failed:", e instanceof Error ? e.message : e)
    return empty
  }
}
