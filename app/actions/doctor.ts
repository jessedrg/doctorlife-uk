"use server"

import { db } from "@/lib/db"
import {
  doctorProfiles,
  user as userTable,
  appointments,
  subscriptions,
} from "@/lib/db/schema"
import { stripe } from "@/lib/stripe"
import { getRequestBaseUrl } from "@/lib/base-url"
import { getSessionUser } from "@/lib/session"
import { and, desc, eq, sql } from "drizzle-orm"
import { put } from "@vercel/blob"
import { revalidatePath } from "next/cache"

async function requireDoctor() {
  const user = await getSessionUser()
  if (!user || user.role !== "doctor") throw new Error("Unauthorized")
  return user
}

/** Returns the current doctor's profile, creating a blank one on first access. */
export async function getMyDoctorProfile() {
  const user = await requireDoctor()
  const [existing] = await db
    .select()
    .from(doctorProfiles)
    .where(eq(doctorProfiles.userId, user.id))
    .limit(1)

  if (existing) return existing

  const [created] = await db
    .insert(doctorProfiles)
    .values({ userId: user.id, fullName: user.name })
    .returning()
  return created
}

/** Perfil del médico + su foto (user.image), para la página "Mi cuenta". */
export async function getMyDoctorProfileWithImage() {
  const me = await requireDoctor()
  const profile = await getMyDoctorProfile()
  const [u] = await db
    .select({ image: userTable.image, email: userTable.email })
    .from(userTable)
    .where(eq(userTable.id, me.id))
    .limit(1)
  return { ...profile, image: u?.image ?? null, email: u?.email ?? me.email }
}

export async function updateDoctorProfile(input: {
  fullName: string
  specialty?: string
  licenseNumber?: string
  bio?: string
  acceptingPatients?: boolean
}) {
  const user = await requireDoctor()
  const fullName = input.fullName.trim()
  if (!fullName) return { ok: false as const, error: "El nombre es obligatorio." }

  await db
    .update(doctorProfiles)
    .set({
      fullName,
      specialty: input.specialty?.trim() || null,
      licenseNumber: input.licenseNumber?.trim() || null,
      bio: input.bio?.trim() || null,
      acceptingPatients: input.acceptingPatients ?? true,
      updatedAt: new Date(),
    })
    .where(eq(doctorProfiles.userId, user.id))

  // Sincroniza el nombre visible en la cuenta para que coincida en el chat.
  await db
    .update(userTable)
    .set({ name: fullName, updatedAt: new Date() })
    .where(eq(userTable.id, user.id))

  revalidatePath("/medico")
  revalidatePath("/medico/cuenta")
  return { ok: true as const }
}

/** Sube la foto de perfil del médico a Blob (público) y la guarda en user.image. */
export async function uploadDoctorAvatar(formData: FormData) {
  const me = await requireDoctor()
  const file = formData.get("file")
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false as const, error: "Selecciona una imagen." }
  }
  if (!file.type.startsWith("image/")) {
    return { ok: false as const, error: "El archivo debe ser una imagen." }
  }
  if (file.size > 5 * 1024 * 1024) {
    return { ok: false as const, error: "La imagen no puede superar 5 MB." }
  }

  const ext = file.type.split("/")[1]?.replace("jpeg", "jpg") || "png"
  const blob = await put(`avatars/${me.id}.${ext}`, file, {
    access: "public",
    contentType: file.type,
    addRandomSuffix: true,
  })

  await db
    .update(userTable)
    .set({ image: blob.url, updatedAt: new Date() })
    .where(eq(userTable.id, me.id))

  revalidatePath("/medico/cuenta")
  revalidatePath("/medico/chat")
  return { ok: true as const, url: blob.url }
}

export type DoctorPatient = {
  id: string
  name: string
  email: string
  image: string | null
  subscriptionStatus: string | null
  totalAppointments: number
  lastVisit: Date | null
  nextVisit: Date | null
}

/** Todos los pacientes del médico (con cita previa) + su estado. */
export async function getMyPatients(): Promise<DoctorPatient[]> {
  const me = await requireDoctor()
  const now = new Date()

  // Pacientes distintos con los que el médico ha tenido alguna cita (no pendiente de pago).
  const base = await db
    .select({
      id: userTable.id,
      name: userTable.name,
      email: userTable.email,
      image: userTable.image,
      total: sql<number>`count(${appointments.id})`,
      lastVisit: sql<Date | null>`max(case when ${appointments.startsAt} <= ${now} then ${appointments.startsAt} end)`,
      nextVisit: sql<Date | null>`min(case when ${appointments.startsAt} > ${now} and ${appointments.status} <> 'cancelled' then ${appointments.startsAt} end)`,
    })
    .from(appointments)
    .innerJoin(userTable, eq(userTable.id, appointments.patientId))
    .where(and(eq(appointments.doctorId, me.id), sql`${appointments.status} <> 'pending_payment'`))
    .groupBy(userTable.id, userTable.name, userTable.email, userTable.image)

  // Estado de suscripción por paciente con este médico.
  const subs = await db
    .select({ patientId: subscriptions.patientId, status: subscriptions.status })
    .from(subscriptions)
    .where(eq(subscriptions.doctorId, me.id))
    .orderBy(desc(subscriptions.id))

  const subByPatient = new Map<string, string>()
  for (const s of subs) {
    if (!subByPatient.has(s.patientId)) subByPatient.set(s.patientId, s.status)
  }

  return base
    .map((p) => ({
      id: p.id,
      name: p.name,
      email: p.email,
      image: p.image ?? null,
      subscriptionStatus: subByPatient.get(p.id) ?? null,
      totalAppointments: Number(p.total),
      lastVisit: p.lastVisit ? new Date(p.lastVisit) : null,
      nextVisit: p.nextVisit ? new Date(p.nextVisit) : null,
    }))
    .sort((a, b) => {
      // Próxima visita primero; si no, por última visita reciente.
      const an = a.nextVisit?.getTime() ?? Infinity
      const bn = b.nextVisit?.getTime() ?? Infinity
      if (an !== bn) return an - bn
      return (b.lastVisit?.getTime() ?? 0) - (a.lastVisit?.getTime() ?? 0)
    })
}

/**
 * Creates (if needed) a Stripe Connect Express account for a destination-charge
 * marketplace (the platform stays liable and collects an application fee), then
 * returns a hosted onboarding link.
 */
export async function startStripeOnboarding(): Promise<
  { url: string; error?: never } | { url?: never; error: string }
> {
  const user = await requireDoctor()
  const profile = await getMyDoctorProfile()

  try {
    let accountId = profile.stripeAccountId

    if (!accountId) {
      const account = await stripe.accounts.create({
        type: "express",
        country: "ES",
        email: user.email,
        business_type: "individual",
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
        business_profile: {
          mcc: "8011", // doctors / physicians
          name: profile.fullName,
        },
        metadata: { userId: user.id },
      })
      accountId = account.id
      await db
        .update(doctorProfiles)
        .set({ stripeAccountId: accountId, updatedAt: new Date() })
        .where(eq(doctorProfiles.userId, user.id))
    }

    const baseUrl = await getRequestBaseUrl()
    const link = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${baseUrl}/medico/pagos?refresh=1`,
      return_url: `${baseUrl}/medico/pagos?done=1`,
      type: "account_onboarding",
    })

    return { url: link.url }
  } catch (e) {
    const raw = e instanceof Error ? e.message : String(e)
    // Connect must be enabled on the platform Stripe account before any
    // connected account can be created.
    if (raw.includes("signed up for Connect") || raw.includes("Connect")) {
      return {
        error:
          "Stripe Connect aún no está activado en la cuenta de la plataforma. Actívalo en el panel de Stripe (Connect → Empezar) y vuelve a intentarlo.",
      }
    }
    return { error: raw }
  }
}

export type DoctorTxnCategory = "subscription" | "consultation" | "payout" | "other"

export type DoctorTransaction = {
  id: string
  category: DoctorTxnCategory
  description: string
  amountCents: number
  netCents: number
  feeCents: number
  currency: string
  status: string
  created: number
}

export type DoctorEarnings = {
  available: boolean
  transactions: DoctorTransaction[]
  totalNetCents: number
  subscriptionCount: number
  consultationCount: number
}

/** Clasifica un balance transaction de Stripe en una categoría de DoctorLife. */
function categorizeTxn(type: string): DoctorTxnCategory {
  // Las suscripciones llegan al médico como "transfer" (reparto de 25 € mensuales).
  if (type === "transfer" || type === "payment_transfer") return "subscription"
  // La primera consulta es un destination charge → "payment"/"charge".
  if (type === "payment" || type === "charge") return "consultation"
  // Retiradas al banco del médico.
  if (type === "payout" || type === "payout_cancel") return "payout"
  return "other"
}

const TXN_LABELS: Record<DoctorTxnCategory, string> = {
  subscription: "Reparto de suscripción",
  consultation: "Primera consulta",
  payout: "Retirada a tu banco",
  other: "Movimiento",
}

/**
 * Lee los últimos movimientos del saldo de la cuenta Connect del médico.
 * Incluye los repartos de suscripción (transfers), las primeras consultas
 * (destination charges) y las retiradas a su banco (payouts).
 */
export async function getDoctorTransactions(limit = 50): Promise<DoctorEarnings> {
  const profile = await getMyDoctorProfile()
  const empty: DoctorEarnings = {
    available: false,
    transactions: [],
    totalNetCents: 0,
    subscriptionCount: 0,
    consultationCount: 0,
  }
  if (!profile.stripeAccountId) return empty

  try {
    const list = await stripe.balanceTransactions.list(
      { limit },
      { stripeAccount: profile.stripeAccountId },
    )

    const transactions: DoctorTransaction[] = list.data.map((t) => {
      const category = categorizeTxn(t.type)
      return {
        id: t.id,
        category,
        description: t.description || TXN_LABELS[category],
        amountCents: t.amount,
        netCents: t.net,
        feeCents: t.fee,
        currency: t.currency,
        status: t.status,
        created: t.created,
      }
    })

    return {
      available: true,
      transactions,
      // Suma neta de entradas (excluye retiradas, que son salidas a banco).
      totalNetCents: transactions
        .filter((t) => t.category !== "payout")
        .reduce((sum, t) => sum + t.netCents, 0),
      subscriptionCount: transactions.filter((t) => t.category === "subscription").length,
      consultationCount: transactions.filter((t) => t.category === "consultation").length,
    }
  } catch {
    // Cuenta aún sin actividad o sin permisos de lectura: tratamos como vacío.
    return { ...empty, available: true }
  }
}

/** Re-reads the Stripe account and syncs the onboarding flags into our DB. */
export async function refreshStripeStatus() {
  const user = await requireDoctor()
  const profile = await getMyDoctorProfile()
  if (!profile.stripeAccountId) return profile

  const account = await stripe.accounts.retrieve(profile.stripeAccountId)

  const chargesEnabled = account.charges_enabled ?? false
  const payoutsEnabled = account.payouts_enabled ?? false
  const onboarded = account.details_submitted ?? false

  const [updated] = await db
    .update(doctorProfiles)
    .set({
      chargesEnabled,
      payoutsEnabled,
      stripeOnboarded: onboarded,
      updatedAt: new Date(),
    })
    .where(eq(doctorProfiles.userId, user.id))
    .returning()

  revalidatePath("/medico")
  revalidatePath("/medico/pagos")
  return updated
}
