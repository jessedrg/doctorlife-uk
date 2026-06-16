"use server"

import { db } from "@/lib/db"
import { user as userTable, doctorProfiles, appointments, leads, subscriptions } from "@/lib/db/schema"
import { getSessionUser } from "@/lib/session"
import { count, desc, eq, inArray, sum } from "drizzle-orm"

const ACTIVE_SUB_STATES = ["active", "trialing", "past_due"]
import { revalidatePath } from "next/cache"

async function requireAdmin() {
  const u = await getSessionUser()
  if (!u || u.role !== "admin") throw new Error("Unauthorized")
  return u
}

/** Promotes a user (by email) to the doctor role and seeds a doctor profile. */
export async function promoteToDoctor(email: string) {
  await requireAdmin()
  const [target] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email.trim().toLowerCase()))
    .limit(1)

  if (!target) return { ok: false, error: "No existe ningún usuario con ese email." }

  await db
    .update(userTable)
    .set({ role: "doctor", updatedAt: new Date() })
    .where(eq(userTable.id, target.id))

  const [existing] = await db
    .select()
    .from(doctorProfiles)
    .where(eq(doctorProfiles.userId, target.id))
    .limit(1)

  if (!existing) {
    await db.insert(doctorProfiles).values({ userId: target.id, fullName: target.name })
  }

  revalidatePath("/admin")
  return { ok: true }
}

export async function listUsers() {
  await requireAdmin()
  return db
    .select({
      id: userTable.id,
      name: userTable.name,
      email: userTable.email,
      role: userTable.role,
      createdAt: userTable.createdAt,
    })
    .from(userTable)
    .orderBy(userTable.createdAt)
}

/** Métricas de cabecera para el panel de admin. */
export async function getAdminMetrics() {
  await requireAdmin()

  const [[doctors], [patients], [leadCount], [confirmed], [revenue], [fees], [activeSubs], [mrr]] =
    await Promise.all([
      db.select({ n: count() }).from(userTable).where(eq(userTable.role, "doctor")),
      db.select({ n: count() }).from(userTable).where(eq(userTable.role, "patient")),
      db.select({ n: count() }).from(leads),
      db.select({ n: count() }).from(appointments).where(eq(appointments.status, "confirmed")),
      db
        .select({ s: sum(appointments.amountCents) })
        .from(appointments)
        .where(eq(appointments.status, "confirmed")),
      db
        .select({ s: sum(appointments.applicationFeeCents) })
        .from(appointments)
        .where(eq(appointments.status, "confirmed")),
      db
        .select({ n: count() })
        .from(subscriptions)
        .where(inArray(subscriptions.status, ACTIVE_SUB_STATES)),
      db
        .select({ s: sum(subscriptions.priceCents) })
        .from(subscriptions)
        .where(inArray(subscriptions.status, ACTIVE_SUB_STATES)),
    ])

  return {
    doctors: doctors?.n ?? 0,
    patients: patients?.n ?? 0,
    leads: leadCount?.n ?? 0,
    confirmedAppointments: confirmed?.n ?? 0,
    grossRevenueCents: Number(revenue?.s ?? 0),
    platformFeesCents: Number(fees?.s ?? 0),
    activeSubscriptions: activeSubs?.n ?? 0,
    mrrCents: Number(mrr?.s ?? 0),
  }
}

/** Suscripciones para el panel de admin. */
export async function listSubscriptions() {
  await requireAdmin()
  return db
    .select({
      id: subscriptions.id,
      plan: subscriptions.plan,
      priceCents: subscriptions.priceCents,
      status: subscriptions.status,
      cancelAtPeriodEnd: subscriptions.cancelAtPeriodEnd,
      currentPeriodEnd: subscriptions.currentPeriodEnd,
      patientName: userTable.name,
      doctorName: doctorProfiles.fullName,
    })
    .from(subscriptions)
    .leftJoin(userTable, eq(userTable.id, subscriptions.patientId))
    .leftJoin(doctorProfiles, eq(doctorProfiles.userId, subscriptions.doctorId))
    .orderBy(desc(subscriptions.id))
    .limit(200)
}

/** Médicos con su perfil y estado de Stripe. */
export async function listDoctors() {
  await requireAdmin()
  return db
    .select({
      id: userTable.id,
      name: userTable.name,
      email: userTable.email,
      specialty: doctorProfiles.specialty,
      acceptingPatients: doctorProfiles.acceptingPatients,
      chargesEnabled: doctorProfiles.chargesEnabled,
      stripeOnboarded: doctorProfiles.stripeOnboarded,
      createdAt: userTable.createdAt,
    })
    .from(userTable)
    .leftJoin(doctorProfiles, eq(doctorProfiles.userId, userTable.id))
    .where(eq(userTable.role, "doctor"))
    .orderBy(userTable.createdAt)
}

/** Pacientes con su número de citas. */
export async function listPatients() {
  await requireAdmin()
  return db
    .select({
      id: userTable.id,
      name: userTable.name,
      email: userTable.email,
      createdAt: userTable.createdAt,
    })
    .from(userTable)
    .where(eq(userTable.role, "patient"))
    .orderBy(desc(userTable.createdAt))
}

/** Leads capturados desde el quiz. */
export async function listLeads() {
  await requireAdmin()
  return db
    .select({
      id: leads.id,
      name: leads.name,
      email: leads.email,
      goal: leads.goal,
      plan: leads.plan,
      bmi: leads.bmi,
      createdAt: leads.createdAt,
    })
    .from(leads)
    .orderBy(desc(leads.createdAt))
    .limit(200)
}

/** Activa/pausa que un médico acepte nuevos pacientes. */
export async function setDoctorAccepting(doctorId: string, accepting: boolean) {
  await requireAdmin()
  await db
    .update(doctorProfiles)
    .set({ acceptingPatients: accepting, updatedAt: new Date() })
    .where(eq(doctorProfiles.userId, doctorId))
  revalidatePath("/admin/medicos")
  return { ok: true }
}
