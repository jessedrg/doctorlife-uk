import Link from "next/link"
import { requireRole } from "@/lib/session"
import { getMyConversations } from "@/app/actions/chat"
import { ChatThread } from "@/components/chat-thread"

export const metadata = { title: "Chat — DoctorLife" }

export default async function DoctorChatPage({
  searchParams,
}: {
  searchParams: Promise<{ c?: string }>
}) {
  await requireRole("doctor")
  const { c } = await searchParams
  const conversations = await getMyConversations()
  const selectedId = c ? Number(c) : conversations[0]?.id
  const selected = conversations.find((conv) => conv.id === selectedId)

  return (
    <div>
      <h1 className="text-[26px] font-light tracking-[-.02em] text-ink">Mensajes</h1>
      <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">
        Conversaciones con tus pacientes.
      </p>

      {conversations.length === 0 ? (
        <div className="mt-6 rounded-[20px] border border-ink/10 bg-cream p-6">
          <p className="text-[15px] text-ink">Aún no tienes conversaciones.</p>
          <p className="mt-1.5 text-[14px] leading-relaxed text-ink-soft">
            Cuando un paciente con cita te escriba, su conversación aparecerá aquí.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-[260px_1fr]">
          <ul className="space-y-1.5">
            {conversations.map((conv) => (
              <li key={conv.id}>
                <Link
                  href={`/medico/chat?c=${conv.id}`}
                  className={`block rounded-xl border px-4 py-3 transition-colors ${
                    conv.id === selectedId
                      ? "border-ink/20 bg-cream"
                      : "border-ink/10 hover:bg-ink/5"
                  }`}
                >
                  <p className="text-[14.5px] font-medium text-ink">{conv.counterpartName}</p>
                  <p className="text-[12.5px] text-ink-soft">
                    {conv.lastMessageAt
                      ? new Date(conv.lastMessageAt).toLocaleDateString("es-ES")
                      : "Sin mensajes"}
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          {selected ? (
            <ChatThread
              key={selected.id}
              conversationId={selected.id}
              counterpartName={selected.counterpartName}
            />
          ) : null}
        </div>
      )}
    </div>
  )
}
