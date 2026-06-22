"use client"

import { useMemo, useState } from "react"
import { Search, MessageCircle } from "lucide-react"
import { ChatThread } from "@/components/chat-thread"
import { UserAvatar } from "@/components/user-avatar"
import type { ConversationSummary } from "@/app/actions/chat"

const dateFmt = new Intl.DateTimeFormat("es-ES", { day: "2-digit", month: "short" })

export function ChatWorkspace({
  conversations,
  canRequestAnalysis = false,
  isDoctor = false,
}: {
  conversations: ConversationSummary[]
  canRequestAnalysis?: boolean
  /** Lado médico: habilita "Ver ficha" del paciente en el hilo. */
  isDoctor?: boolean
}) {
  const [selectedId, setSelectedId] = useState<number | null>(conversations[0]?.id ?? null)
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return conversations
    return conversations.filter((c) => c.counterpartName.toLowerCase().includes(q))
  }, [conversations, query])

  const selected = conversations.find((c) => c.id === selectedId) ?? null

  return (
    <div className="mt-6 flex h-[min(74vh,720px)] overflow-hidden rounded-[22px] border border-ink/10 bg-paper">
      {/* Barra lateral */}
      <aside
        className={`flex w-full flex-col border-ink/10 md:w-[320px] md:border-r ${
          selected ? "hidden md:flex" : "flex"
        }`}
      >
        <div className="border-b border-ink/10 p-3">
          <div className="flex items-center gap-2 rounded-full border border-ink/15 bg-warm px-3.5 py-2.5">
            <Search className="size-4 shrink-0 text-ink-soft" aria-hidden />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar paciente…"
              className="w-full bg-transparent text-[14px] text-ink outline-none placeholder:text-ink-soft"
            />
          </div>
        </div>

        <ul className="flex-1 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <li className="px-3 py-6 text-center text-[13.5px] text-ink-soft">
              {conversations.length === 0
                ? "Aún no tienes conversaciones."
                : "Sin resultados para tu búsqueda."}
            </li>
          ) : (
            filtered.map((c) => {
              const active = c.id === selectedId
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(c.id)}
                    className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors ${
                      active ? "bg-cream" : "hover:bg-ink/5"
                    }`}
                  >
                    <UserAvatar name={c.counterpartName} image={c.counterpartImage} size={44} />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="truncate text-[14.5px] font-medium text-ink">
                          {c.counterpartName}
                        </span>
                        {c.lastMessageAt && (
                          <span className="shrink-0 text-[11.5px] text-ink-mute">
                            {dateFmt.format(new Date(c.lastMessageAt))}
                          </span>
                        )}
                      </span>
                      <span className="block truncate text-[12.5px] text-ink-soft">
                        {c.lastMessagePreview ?? "Sin mensajes"}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })
          )}
        </ul>
      </aside>

      {/* Hilo */}
      <section className={`min-w-0 flex-1 ${selected ? "flex" : "hidden md:flex"}`}>
        {selected ? (
          <ChatThread
            key={selected.id}
            conversationId={selected.id}
            counterpartName={selected.counterpartName}
            counterpartImage={selected.counterpartImage}
            canRequestAnalysis={canRequestAnalysis}
            patientId={isDoctor ? selected.counterpartId : null}
            onBack={() => setSelectedId(null)}
            className="h-full w-full"
          />
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center">
            <MessageCircle className="size-7 text-ink-mute" aria-hidden />
            <p className="text-[14.5px] text-ink-soft">
              Selecciona una conversación para empezar.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
