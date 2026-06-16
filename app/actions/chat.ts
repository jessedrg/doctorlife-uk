"use server"

import { db } from "@/lib/db"
import { appointments, conversations, messages, user } from "@/lib/db/schema"
import { getSessionUser } from "@/lib/session"
import { hasActiveSubscription } from "@/app/actions/subscription"
import { and, asc, desc, eq, gt, ne, or } from "drizzle-orm"
import { revalidatePath } from "next/cache"

async function requireUser() {
  const me = await getSessionUser()
  if (!me) throw new Error("Unauthorized")
  return me
}

/** Verifica que el usuario es participante de la conversación y la devuelve. */
async function requireParticipant(conversationId: number, userId: string) {
  const [conv] = await db
    .select()
    .from(conversations)
    .where(eq(conversations.id, conversationId))
    .limit(1)
  if (!conv || (conv.patientId !== userId && conv.doctorId !== userId)) {
    throw new Error("Unauthorized")
  }
  return conv
}

/**
 * Para un paciente: encuentra (o crea) la conversación con el médico de su
 * cita más reciente no cancelada. Devuelve null si aún no tiene médico.
 */
export async function getOrCreatePatientConversation() {
  const me = await requireUser()

  const [appt] = await db
    .select({ doctorId: appointments.doctorId })
    .from(appointments)
    .where(and(eq(appointments.patientId, me.id), ne(appointments.status, "cancelled")))
    .orderBy(desc(appointments.startsAt))
    .limit(1)

  if (!appt) return null

  const [existing] = await db
    .select()
    .from(conversations)
    .where(and(eq(conversations.patientId, me.id), eq(conversations.doctorId, appt.doctorId)))
    .limit(1)

  if (existing) return existing.id

  const [created] = await db
    .insert(conversations)
    .values({ patientId: me.id, doctorId: appt.doctorId })
    .returning()

  return created.id
}

/** Lista las conversaciones del usuario (médico o paciente) con datos del otro. */
export async function getMyConversations() {
  const me = await requireUser()

  const rows = await db
    .select({
      id: conversations.id,
      patientId: conversations.patientId,
      doctorId: conversations.doctorId,
      lastMessageAt: conversations.lastMessageAt,
      patientName: user.name,
    })
    .from(conversations)
    .leftJoin(user, eq(user.id, conversations.patientId))
    .where(or(eq(conversations.patientId, me.id), eq(conversations.doctorId, me.id)))
    .orderBy(desc(conversations.lastMessageAt))

  // El "otro" participante: para el médico es el paciente; necesitamos su nombre.
  return rows.map((r) => ({
    id: r.id,
    counterpartName: r.patientName ?? "Paciente",
    lastMessageAt: r.lastMessageAt,
  }))
}

/** Mensajes de una conversación (solo participantes). `after` para polling incremental. */
export async function getMessages(conversationId: number, after = 0) {
  const me = await requireUser()
  await requireParticipant(conversationId, me.id)

  const rows = await db
    .select()
    .from(messages)
    .where(and(eq(messages.conversationId, conversationId), gt(messages.id, after)))
    .orderBy(asc(messages.id))

  return rows.map((m) => ({
    id: m.id,
    body: m.body,
    mine: m.senderId === me.id,
    createdAt: m.createdAt,
  }))
}

/** Envía un mensaje a la conversación (solo participantes). */
export async function sendMessage(conversationId: number, body: string) {
  const me = await requireUser()
  const conv = await requireParticipant(conversationId, me.id)

  // El chat en vivo con la doctora asignada requiere suscripción activa.
  // (El médico siempre puede responder; solo se bloquea al paciente.)
  if (conv.patientId === me.id && !(await hasActiveSubscription(me.id))) {
    return { ok: false as const, error: "Activa tu tratamiento para chatear con tu médico." }
  }

  const text = body.trim()
  if (!text) return { ok: false as const, error: "Mensaje vacío" }
  if (text.length > 4000) return { ok: false as const, error: "Mensaje demasiado largo" }

  const [created] = await db
    .insert(messages)
    .values({ conversationId, senderId: me.id, body: text })
    .returning()

  await db
    .update(conversations)
    .set({ lastMessageAt: created.createdAt })
    .where(eq(conversations.id, conversationId))

  revalidatePath("/portal/chat")
  revalidatePath("/medico/chat")

  return {
    ok: true as const,
    message: { id: created.id, body: created.body, mine: true, createdAt: created.createdAt },
  }
}
