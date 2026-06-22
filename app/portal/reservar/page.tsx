import { getPooledAvailability } from "@/app/actions/booking"
import { getMySubscription } from "@/app/actions/subscription"
import { BookingCalendar } from "@/components/booking-calendar"

export default async function ReservarPage() {
  const [slots, subscription] = await Promise.all([
    getPooledAvailability(14),
    getMySubscription(),
  ])

  // Si ya tiene tratamiento activo, esta reserva es su videollamada de seguimiento incluida.
  const isFollowup =
    subscription && ["active", "trialing", "past_due"].includes(subscription.status)

  return (
    <div className="mx-auto w-full max-w-3xl">
      <header className="mb-6">
        <h1 className="text-balance text-2xl font-semibold text-ink">
          {isFollowup ? "Reserva tu videollamada de seguimiento" : "Reserva tu primera cita"}
        </h1>
        <p className="mt-1 text-pretty text-ink/70">
          {isFollowup
            ? "Está incluida en tu suscripción. Elige el horario que mejor te venga y te asignaremos a tu médico (o, si no tiene hueco, a otro disponible)."
            : "Elige el horario que mejor te venga. Te asignaremos un médico disponible y recibirás el enlace de la videollamada."}
        </p>
      </header>
      <BookingCalendar slots={slots} />
    </div>
  )
}
