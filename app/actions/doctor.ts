"use server"

import { db } from "@/lib/db"
import { doctorProfiles } from "@/lib/db/schema"
import { stripe } from "@/lib/stripe"
import { getBaseUrl } from "@/lib/base-url"
import { getSessionUser } from "@/lib/session"
import { eq } from "drizzle-orm"
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

export async function updateDoctorProfile(input: {
  fullName: string
  specialty?: string
  licenseNumber?: string
  bio?: string
  acceptingPatients?: boolean
}) {
  const user = await requireDoctor()
  await db
    .update(doctorProfiles)
    .set({
      fullName: input.fullName,
      specialty: input.specialty || null,
      licenseNumber: input.licenseNumber || null,
      bio: input.bio || null,
      acceptingPatients: input.acceptingPatients ?? true,
      updatedAt: new Date(),
    })
    .where(eq(doctorProfiles.userId, user.id))
  revalidatePath("/medico")
  return { ok: true }
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

    const link = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${getBaseUrl()}/medico/pagos?refresh=1`,
      return_url: `${getBaseUrl()}/medico/pagos?done=1`,
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
