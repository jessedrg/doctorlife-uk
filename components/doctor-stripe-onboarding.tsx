"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { startStripeOnboarding, refreshStripeStatus } from "@/app/actions/doctor"

type Props = {
  hasAccount: boolean
  chargesEnabled: boolean
  payoutsEnabled: boolean
  onboarded: boolean
}

export function DoctorStripeOnboarding({ hasAccount, chargesEnabled, payoutsEnabled, onboarded }: Props) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [pending, startTransition] = useTransition()

  async function handleStart() {
    setError(null)
    setLoading(true)
    try {
      const { url } = await startStripeOnboarding()
      window.location.href = url
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo iniciar el proceso.")
      setLoading(false)
    }
  }

  function handleRefresh() {
    setError(null)
    startTransition(async () => {
      try {
        await refreshStripeStatus()
        router.refresh()
      } catch (e) {
        setError(e instanceof Error ? e.message : "No se pudo actualizar el estado.")
      }
    })
  }

  return (
    <div className="rounded-[22px] border border-ink/10 bg-cream p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-[18px] font-medium text-ink">Cuenta de cobros</h2>
          <p className="mt-1 max-w-[52ch] text-[14.5px] leading-relaxed text-ink-soft">
            Conecta tu cuenta de Stripe para recibir los pagos de tus pacientes. DoctorLife retiene una comisión
            de servicio y te transfiere el resto automáticamente.
          </p>
        </div>
        <StatusBadge onboarded={onboarded} />
      </div>

      <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
        <Flag label="Cobros habilitados" ok={chargesEnabled} />
        <Flag label="Transferencias habilitadas" ok={payoutsEnabled} />
      </div>

      {error && <p className="mt-4 text-[13.5px] text-clay">{error}</p>}

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleStart}
          disabled={loading}
          className="rounded-full bg-ink px-5 py-2.5 text-[14px] font-semibold text-paper transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {loading
            ? "Redirigiendo…"
            : hasAccount && !onboarded
              ? "Continuar configuración"
              : onboarded
                ? "Gestionar en Stripe"
                : "Conectar con Stripe"}
        </button>
        {hasAccount && (
          <button
            type="button"
            onClick={handleRefresh}
            disabled={pending}
            className="rounded-full border border-ink/15 bg-paper px-5 py-2.5 text-[14px] font-medium text-ink transition-colors hover:bg-warm disabled:opacity-60"
          >
            {pending ? "Comprobando…" : "Actualizar estado"}
          </button>
        )}
      </div>
    </div>
  )
}

function StatusBadge({ onboarded }: { onboarded: boolean }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-[12px] font-semibold ${
        onboarded ? "bg-sage/40 text-ink" : "bg-amber/20 text-ink"
      }`}
    >
      {onboarded ? "Activa" : "Pendiente"}
    </span>
  )
}

function Flag({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-ink/10 bg-paper px-3.5 py-2.5">
      <span
        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[11px] ${
          ok ? "bg-sage text-ink" : "border border-ink/20 text-ink-mute"
        }`}
      >
        {ok ? "✓" : "—"}
      </span>
      <span className="text-[13.5px] text-ink-soft">{label}</span>
    </div>
  )
}
