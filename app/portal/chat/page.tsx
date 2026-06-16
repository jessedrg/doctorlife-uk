import Link from "next/link"
import { requireRole } from "@/lib/session"
import { getOrCreatePatientConversation } from "@/app/actions/chat"
import { ChatThread } from "@/components/chat-thread"

export const metadata = { title: "Chat — DoctorLife" }

export default async function PatientChatPage() {
  await requireRole("patient")
  const conversationId = await getOrCreatePatientConversation()

  return (
    <div>
      <h1 className="text-[26px] font-light tracking-[-.02em] text-ink">Chat con tu médico</h1>
      <p className="mt-1.5 max-w-[60ch] text-[15px] leading-relaxed text-ink-soft">
        Consulta dudas con tu equipo médico de forma segura entre citas.
      </p>

      <div className="mt-6 max-w-2xl">
        {conversationId ? (
          <ChatThread conversationId={conversationId} counterpartName="Tu equipo médico" />
        ) : (
          <div className="rounded-[20px] border border-ink/10 bg-cream p-6">
            <p className="text-[15px] text-ink">Todavía no tienes un médico asignado.</p>
            <p className="mt-1.5 text-[14px] leading-relaxed text-ink-soft">
              Reserva tu primera cita para empezar a hablar con tu equipo médico.
            </p>
            <Link
              href="/portal/reservar"
              className="mt-4 inline-flex rounded-full bg-ink px-4 py-2 text-[13.5px] font-medium text-paper transition-opacity hover:opacity-90"
            >
              Reservar primera cita
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
