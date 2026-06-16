"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { startSubscriptionCheckout, cancelMySubscription } from "@/app/actions/subscription"

interface SubscriptionView {
  plan: string
  priceCents: number
  status: string
  currentPeriodEnd: Date | string | null
  cancelAtPeriodEnd: boolean
  doctorName: string | null
}

const STATUS_LABELS: Record<string, string> = {
  active: "Activa",
  trialing: "En prueba",
  past_due: "Pago pendiente",
  incomplete: "Sin completar",
  canceled: "Cancelada",
}

function eur(cents: number) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(cents / 100)
}

export function SubscriptionCard({ subscription }: { subscription: SubscriptionView | null }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isActive =
    subscription && ["active", "trialing", "past_due"].includes(subscription.status)

  async function onSubscribe() {
    setLoading(true)
    setError(null)
    const res = await startSubscriptionCheckout()
    if ("url" in res) {
      window.location.href = res.url
      return
    }
    setError(res.error)
    setLoading(false)
  }

  async function onCancel() {
    setLoading(true)
    setError(null)
    const res = await cancelMySubscription()
    setLoading(false)
    if (!res.ok) {
      setError(res.error ?? "No se pudo cancelar.")
      return
    }
    router.refresh()
  }

  return (
    <div className="rounded-[20px] border border-ink/10 bg-cream p-5">
      <h2 className="text-[16px] font-medium text-ink">Suscripción de tratamiento</h2>

      {isActive ? (
        <div className="mt-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[15px] font-medium text-ink">{subscription!.plan}</p>
            <span className="rounded-full bg-sage/30 px-2.5 py-1 text-[12px] font-semibold text-ink">
              {STATUS_LABELS[subscription!.status] ?? subscription!.status}
            </span>
          </div>
          <p className="mt-1 text-[14px] text-ink-soft">
            {eur(subscription!.priceCents)} al mes
            {subscription!.doctorName ? ` · ${subscription!.doctorName}` : ""}
          </p>
          {subscription!.currentPeriodEnd ? (
            <p className="mt-1 text-[13px] text-ink-mute">
              {subscription!.cancelAtPeriodEnd ? "Finaliza el " : "Próxima renovación el "}
              {new Intl.DateTimeFormat("es-ES", { dateStyle: "long" }).format(
                new Date(subscription!.currentPeriodEnd),
              )}
            </p>
          ) : null}

          {!subscription!.cancelAtPeriodEnd ? (
            <button
              onClick={onCancel}
              disabled={loading}
              className="mt-4 inline-flex rounded-full border border-ink/20 px-4 py-2 text-[13.5px] font-medium text-ink transition-colors hover:bg-ink/5 disabled:opacity-60"
            >
              {loading ? "Procesando…" : "Cancelar al final del periodo"}
            </button>
          ) : (
            <p className="mt-4 text-[13.5px] text-ink-soft">
              Tu suscripción se cancelará al final del periodo actual.
            </p>
          )}
        </div>
      ) : (
        <div className="mt-1.5">
          <p className="text-[14px] leading-relaxed text-ink-soft">
            Activa tu tratamiento mensual con seguimiento médico, ajustes de dosis y mensajería con
            tu equipo. Puedes cancelar cuando quieras.
          </p>
          <button
            onClick={onSubscribe}
            disabled={loading}
            className="mt-4 inline-flex rounded-full bg-ink px-4 py-2 text-[13.5px] font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Redirigiendo…" : "Activar suscripción"}
          </button>
        </div>
      )}

      {error ? <p className="mt-3 text-[13.5px] text-clay">{error}</p> : null}
    </div>
  )
}
