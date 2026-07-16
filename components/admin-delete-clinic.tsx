"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { deleteClinic } from "@/app/actions/admin"

export function AdminDeleteClinic({
  doctorId,
  clinicName,
}: {
  doctorId: string
  clinicName: string
}) {
  const router = useRouter()
  const [confirming, setConfirming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  function remove() {
    setError(null)
    startTransition(async () => {
      const res = await deleteClinic(doctorId)
      if (res?.ok) {
        setConfirming(false)
        router.refresh()
      } else {
        setError(res?.error ?? "No se pudo eliminar la clínica.")
      }
    })
  }

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="rounded-full border border-red-300 px-3 py-1 text-[12px] font-semibold text-red-600 transition hover:bg-red-50"
      >
        Eliminar
      </button>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-[12.5px] leading-relaxed text-ink-soft">
        ¿Eliminar <span className="font-medium text-ink">{clinicName}</span> y todos sus datos
        (citas, chats, recetas, disponibilidad)? Esta acción no se puede deshacer.
      </p>
      {error ? <p className="text-[12.5px] font-medium text-red-600">{error}</p> : null}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={remove}
          disabled={pending}
          className="rounded-full bg-red-600 px-3 py-1 text-[12px] font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
        >
          {pending ? "Eliminando…" : "Sí, eliminar"}
        </button>
        <button
          type="button"
          onClick={() => {
            setConfirming(false)
            setError(null)
          }}
          disabled={pending}
          className="rounded-full bg-ink/10 px-3 py-1 text-[12px] font-semibold text-ink-soft transition hover:bg-ink/15 disabled:opacity-60"
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}
