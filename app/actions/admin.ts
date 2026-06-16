"use server"

import { db } from "@/lib/db"
import { user as userTable, doctorProfiles, appointments, leads, subscriptions } from "@/lib/db/schema"
import { getSessionUser } from "@/lib/session"
import { count, desc, eq, inArray, sum } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth"
import { generateTempPassword } from "@/lib/credentials"
import { sendDoctorWelcomeEmail } from "@/lib/email"

const ACTIVE_SUB_STATES = ["active", "trialing", "past_due"]

async function requireAdmin() {
  const u = await getSessionUser()
  if (!u || u.role !== "admin") throw new Error("Unauthorized")
  return u
}

/**
 * Crea una cuenta de médico con contraseña temporal y le envía sus credenciales.
 * Los médicos no se registran solos: solo el admin puede crearlos.
 */
export async function createDoctor(input: {
  name: string
  email: string
  specialty?: string
}) {
  await requireAdmin()
  const name = input.name.trim()
  const email = input.email.trim().toLowerCase()
  const specialty = input.specialty?.trim() || null

  if (!name) return { ok: false, error: "Introduce el nombre del médico." }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Introduce un email válido." }
  }

  const [existing] = await db
    .select({ id: userTable.id })
    .from(userTable)
    .where(eq(userTable.email, email))
    .limit(1)
  if (existing) return { ok: false, error: "Ya existe una cuenta con ese email." }

  const tempPassword = generateTempPassword()

  // Better Auth crea el usuario y hashea la contraseña.
  const created = await auth.api.signUpEmail({ body: { name, email, password: tempPassword } })
  const userId = created?.user?.id
  if (!userId) return { ok: false, error: "No se pudo crear la cuenta del médico." }

  await db
    .update(userTable)
    .set({ role: "doctor", updatedAt: new Date() })
    .where(eq(userTable.id, userId))

  await db
    .insert(doctorProfiles)
    .values({ userId, fullName: name, specialty })
    .onConflictDoNothing({ target: doctorProfiles.userId })

  await sendDoctorWelcomeEmail({ to: email, name, tempPassword })

  revalidatePath("/admin/medicos")
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
