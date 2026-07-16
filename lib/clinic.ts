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

/**
 * Campos obligatorios que la clínica debe rellenar para poder OPERAR y facturar
 * como centro sanitario. Se usan tanto para el bloqueo de cobros como para
 * indicar en el panel qué falta.
 */
export const REQUIRED_CLINIC_FIELDS = [
  "name",
  "taxId",
  "addressLine",
  "city",
  "postalCode",
  "province",
  "healthRegistryNumber",
  "medicalDirectorName",
  "medicalDirectorLicense",
  "billingEmail",
  "dataProtectionContact",
] as const satisfies readonly (keyof Clinic)[]

/** Devuelve la lista de campos obligatorios que faltan por rellenar. */
export function missingClinicFields(clinic: Clinic): (keyof Clinic)[] {
  return REQUIRED_CLINIC_FIELDS.filter((f) => {
    const v = clinic[f]
    return v == null || String(v).trim() === ""
  })
}

/** ¿Están completos todos los datos obligatorios para operar/facturar? */
export function clinicDataComplete(clinic: Clinic): boolean {
  return missingClinicFields(clinic).length === 0
}

export type ClinicChargeContext = {
  /** Cuenta Connect de la clínica. */
  accountId: string
  /** Puede aceptar cargos (onboarding completo). */
  ready: boolean
}

/**
 * Contexto para enrutar un cargo a la clínica. Devuelve `null` si NO se puede
 * cobrar todavía, y en ese caso NO se debe cobrar (evita que el dinero caiga en
 * la plataforma como merchant of record). Requiere las tres condiciones:
 *  1. Cuenta Connect creada.
 *  2. Stripe habilitado para cargos (`chargesEnabled`).
 *  3. Datos obligatorios de centro sanitario completos.
 */
export async function getClinicChargeContext(): Promise<ClinicChargeContext | null> {
  const clinic = await getClinic()
  if (!clinic.stripeAccountId || !clinic.chargesEnabled) return null
  if (!clinicDataComplete(clinic)) return null
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
