"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { createIncludedBooking } from "@/app/actions/booking"
import type { PooledSlot } from "@/lib/scheduling/types"

function formatDateLabel(iso: string) {
  // iso = "YYYY-MM-DD"
  const [y, m, d] = iso.split("-").map(Number)
  const date = new Date(Date.UTC(y, m - 1, d))
  const weekday = new Intl.DateTimeFormat("es-ES", { weekday: "short", timeZone: "UTC" }).format(date)
  const day = new Intl.DateTimeFormat("es-ES", { day: "numeric", timeZone: "UTC" }).format(date)
  const month = new Intl.DateTimeFormat("es-ES", { month: "short", timeZone: "UTC" }).format(date)
  return { weekday, day, month }
}

export function BookingCalendar({ slots }: { slots: PooledSlot[] }) {
  const dates = useMemo(() => {
    const map = new Map<string, PooledSlot[]>()
    for (const s of slots) {
      const list = map.get(s.date) ?? []
      list.push(s)
      map.set(s.date, list)
    }
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]))
  }, [slots])

  const router = useRouter()
  const [activeDate, setActiveDate] = useState<string | null>(dates[0]?.[0] ?? null)
  const [pendingStart, setPendingStart] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const activeSlots = dates.find(([d]) => d === activeDate)?.[1] ?? []

  async function book(startUtc: string) {
    setError(null)
    setPendingStart(startUtc)
    try {
      const result = await createIncludedBooking(startUtc)
      if ("ok" in result) {
        router.push("/portal/citas?reservada=1")
        return
      }
      setError(result.error)
    } catch {
      setError("No se pudo completar la reserva. Inténtalo de nuevo.")
    }
    setPendingStart(null)
  }

  if (dates.length === 0) {
    return (
      <div className="rounded-2xl border border-ink/10 bg-paper p-8 text-center">
        <p className="text-pretty text-ink/70">
          Ahora mismo no hay huecos disponibles. Vuelve a intentarlo más tarde.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Selector de día */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {dates.map(([d]) => {
          const { weekday, day, month } = formatDateLabel(d)
          const active = d === activeDate
          return (
            <button
              key={d}
              type="button"
              onClick={() => setActiveDate(d)}
              className={`flex min-w-16 flex-col items-center gap-0.5 rounded-xl border px-3 py-2 transition-colors ${
                active
                  ? "border-sage bg-sage text-paper"
                  : "border-ink/10 bg-paper text-ink hover:border-sage/50"
              }`}
            >
              <span className="text-xs capitalize opacity-80">{weekday}</span>
              <span className="text-lg font-semibold leading-none">{day}</span>
              <span className="text-xs capitalize opacity-80">{month}</span>
            </button>
          )
        })}
      </div>

      {/* Huecos del día */}
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
        {activeSlots.map((s) => (
          <button
            key={s.startUtc}
            type="button"
            disabled={pendingStart !== null}
            onClick={() => book(s.startUtc)}
            className="rounded-xl border border-ink/10 bg-paper px-3 py-2.5 text-sm font-medium text-ink transition-colors hover:border-sage hover:bg-sage/10 disabled:opacity-50"
            title={`Con ${s.doctorName}`}
          >
            {pendingStart === s.startUtc ? "..." : s.label}
          </button>
        ))}
      </div>

      {error ? (
        <p role="alert" className="text-sm text-clay">
          {error}
        </p>
      ) : null}

      <p className="text-xs text-ink/50">
        Tu videollamada de seguimiento está incluida en tu suscripción. Se te asignará tu endocrino o,
        si no tiene hueco, otro médico disponible para la hora elegida.
      </p>
    </div>
  )
}
