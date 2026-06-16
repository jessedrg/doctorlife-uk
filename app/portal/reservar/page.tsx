import { getPooledAvailability } from "@/app/actions/booking"
import { BookingCalendar } from "@/components/booking-calendar"

export default async function ReservarPage() {
  const slots = await getPooledAvailability(14)

  return (
    <div className="mx-auto w-full max-w-3xl">
      <header className="mb-6">
        <h1 className="text-balance text-2xl font-semibold text-ink">Reserva tu primera cita</h1>
        <p className="mt-1 text-pretty text-ink/70">
          Elige el horario que mejor te venga. Te asignaremos un médico disponible y recibirás el
          enlace de la videollamada.
        </p>
      </header>
      <BookingCalendar slots={slots} />
    </div>
  )
}
