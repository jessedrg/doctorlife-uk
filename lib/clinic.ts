import "server-only"

import { db } from "@/lib/db"
import { clinics, type Clinic } from "@/lib/db/schema"
import { asc, eq } from "drizzle-orm"

/**
 * La clínica es el comerciante de liquidación de todo acto médico. Modelo de
 * una sola fila: siempre operamos sobre la primera (y única) fila de `clinics`.
 * Si aún no existe, la creamos con valores por defecto (opcionalmente sembrando
 * la cuenta Connect desde `CLINIC_STRIPE_ACCOUNT_ID`).
 */
export async function getClinic(): Promise<Clinic> {
  const [row] = await db.select().from(clinics).orderBy(asc(clinics.id)).limit(1)
  if (row) return row

  const seededAccount = process.env.CLINIC_STRIPE_ACCOUNT_ID || null
  const [created] = await db
    .insert(clinics)
    .values({
      name: "DoctorLife Clínica",
      stripeAccountId: seededAccount,
    })
    .returning()
  return created
}

export type ClinicChargeContext = {
  /** Cuenta Connect de la clínica. */
  accountId: string
  /** Puede aceptar cargos (onboarding completo). */
  ready: boolean
}

/**
 * Contexto para enrutar un cargo a la clínica. Devuelve `null` si la clínica no
 * tiene cuenta Connect o no puede cobrar todavía: en ese caso NO se debe cobrar
 * (evita que el dinero caiga en la plataforma como merchant of record).
 */
export async function getClinicChargeContext(): Promise<ClinicChargeContext | null> {
  const clinic = await getClinic()
  if (!clinic.stripeAccountId || !clinic.chargesEnabled) return null
  return { accountId: clinic.stripeAccountId, ready: true }
}

/** Actualiza la cuenta Connect de la clínica (id de cuenta). */
export async function setClinicStripeAccount(clinicId: number, accountId: string): Promise<void> {
  await db
    .update(clinics)
    .set({ stripeAccountId: accountId, updatedAt: new Date() })
    .where(eq(clinics.id, clinicId))
}

/** Sincroniza los flags de onboarding de la clínica. */
export async function setClinicStatus(
  clinicId: number,
  status: { chargesEnabled: boolean; payoutsEnabled: boolean; stripeOnboarded: boolean },
): Promise<void> {
  await db
    .update(clinics)
    .set({ ...status, updatedAt: new Date() })
    .where(eq(clinics.id, clinicId))
}
