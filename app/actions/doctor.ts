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
 * Creates (if needed) a Stripe Connect account using the Accounts v2 API,
 * configured as an express-equivalent merchant for a destination-charge
 * marketplace, then returns a hosted onboarding link.
 */
export async function startStripeOnboarding() {
  const user = await requireDoctor()
  const profile = await getMyDoctorProfile()

  let accountId = profile.stripeAccountId

  if (!accountId) {
    const account = await stripe.v2.core.accounts.create({
      contact_email: user.email,
      display_name: profile.fullName,
      dashboard: "express",
      identity: { country: "ES", entity_type: "individual" },
      defaults: {
        currency: "eur",
        responsibilities: { fees_collector: "stripe", losses_collector: "stripe" },
      },
      configuration: {
        merchant: { capabilities: { card_payments: { requested: true } } },
      },
      include: ["configuration.merchant", "identity", "requirements"],
      metadata: { userId: user.id },
    })
    accountId = account.id
    await db
      .update(doctorProfiles)
      .set({ stripeAccountId: accountId, updatedAt: new Date() })
      .where(eq(doctorProfiles.userId, user.id))
  }

  const link = await stripe.v2.core.accountLinks.create({
    account: accountId,
    use_case: {
      type: "account_onboarding",
      account_onboarding: {
        configurations: ["merchant"],
        refresh_url: `${getBaseUrl()}/medico/pagos?refresh=1`,
        return_url: `${getBaseUrl()}/medico/pagos?done=1`,
      },
    },
  })

  return { url: link.url }
}

/** Re-reads the Stripe account and syncs the onboarding flags into our DB. */
export async function refreshStripeStatus() {
  const user = await requireDoctor()
  const profile = await getMyDoctorProfile()
  if (!profile.stripeAccountId) return profile

  const account = await stripe.v2.core.accounts.retrieve(profile.stripeAccountId, {
    include: ["configuration.merchant", "requirements"],
  })

  const cardStatus = account.configuration?.merchant?.capabilities?.card_payments?.status
  const chargesEnabled = cardStatus === "active"

  const [updated] = await db
    .update(doctorProfiles)
    .set({
      chargesEnabled,
      payoutsEnabled: chargesEnabled,
      stripeOnboarded: chargesEnabled,
      updatedAt: new Date(),
    })
    .where(eq(doctorProfiles.userId, user.id))
    .returning()

  revalidatePath("/medico")
  revalidatePath("/medico/pagos")
  return updated
}
