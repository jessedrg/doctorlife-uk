"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { promoteToDoctor } from "@/app/actions/admin"

export function AdminPromoteDoctor() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const [pending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMsg(null)
    startTransition(async () => {
      const res = await promoteToDoctor(email)
      if (res.ok) {
        setMsg({ ok: true, text: `${email} ahora es médico.` })
        setEmail("")
        router.refresh()
      } else {
        setMsg({ ok: false, text: res.error ?? "No se pudo completar." })
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[20px] border border-ink/10 bg-cream p-5">
      <h2 className="text-[16px] font-medium text-ink">Dar acceso de médico</h2>
      <p className="mt-1 text-[13.5px] leading-relaxed text-ink-soft">
        Introduce el email de un usuario registrado para convertirlo en médico.
      </p>
      <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="medico@ejemplo.com"
          className="flex-1 rounded-full border border-ink/15 bg-paper px-4 py-2.5 text-[14px] text-ink outline-none placeholder:text-ink-mute focus:border-ink/35"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-ink px-5 py-2.5 text-[14px] font-semibold text-paper transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Asignando…" : "Convertir en médico"}
        </button>
      </div>
      {msg && (
        <p className={`mt-3 text-[13.5px] ${msg.ok ? "text-olive" : "text-clay"}`}>{msg.text}</p>
      )}
    </form>
  )
}
