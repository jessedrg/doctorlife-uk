"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createIncludedBooking } from "@/app/actions/booking"
import { SchedulerCalendar } from "@/components/scheduler-calendar"
import type { PooledSlot } from "@/lib/scheduling/types"

export function BookingCalendar({ slots }: { slots: PooledSlot[] }) {
  const router = useRouter()
  const [pendingStart, setPendingStart] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function book(slot: PooledSlot) {
    setError(null)
    setPendingStart(slot.startUtc)
    try {
      const result = await createIncludedBooking(slot.startUtc)
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

  return (
    <SchedulerCalendar
      slots={slots}
      onSelect={book}
      pendingStart={pendingStart}
      error={error}
      footnote="Tu videollamada de seguimiento está incluida en tu suscripción. Se te asignará tu endocrino o, si no tiene hueco, otro médico disponible para la hora elegida. Recibirás un enlace de Google Meet por correo."
    />
  )
}
