"use client"

import { useState, useTransition } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Check, Loader2 } from "lucide-react"
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
      const result = await startStripeOnboarding()
      if (result.url) {
        window.location.href = result.url
        return
      }
      setError(result.error ?? "No se pudo iniciar el proceso.")
      setLoading(false)
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
    <div className="overflow-hidden rounded-[22px] border border-ink/10 bg-cream">
      <div className="flex items-start justify-between gap-4 p-6">
        <div className="flex items-start gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-ink/10 bg-paper shadow-sm">
            <Image src="/brand/stripe.svg" alt="Stripe" width={26} height={26} />
          </span>
          <div>
            <h2 className="text-[18px] font-medium text-ink">Cuenta de cobros · Stripe</h2>
            <p className="mt-1 max-w-[52ch] text-[14.5px] leading-relaxed text-ink-soft">
              Conecta tu cuenta de Stripe para recibir los pagos de tus pacientes. DoctorLife retiene una
              comisión de servicio y te transfiere el resto automáticamente.
            </p>
          </div>
        </div>
        <StatusBadge onboarded={onboarded} />
      </div>

      <div className="grid gap-2.5 px-6 sm:grid-cols-2">
        <Flag label="Cobros habilitados" ok={chargesEnabled} />
        <Flag label="Transferencias habilitadas" ok={payoutsEnabled} />
      </div>

      {error && <p className="px-6 pt-4 text-[13.5px] text-clay">{error}</p>}

      <div className="mt-5 flex flex-wrap gap-3 border-t border-ink/10 bg-paper/40 px-6 py-4">
        <button
          type="button"
          onClick={handleStart}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[14px] font-semibold text-paper transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {loading && <Loader2 className="size-4 animate-spin" aria-hidden />}
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
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold ${
        onboarded ? "bg-olive/12 text-olive" : "bg-amber/20 text-clay"
      }`}
    >
      {onboarded && <Check className="size-3.5" aria-hidden />}
      {onboarded ? "Activa" : "Pendiente"}
    </span>
  )
}

function Flag({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-ink/10 bg-paper px-3.5 py-2.5">
      <span
        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
          ok ? "bg-olive text-paper" : "border border-ink/20 text-ink-mute"
        }`}
      >
        {ok ? <Check className="size-3" aria-hidden /> : <span className="text-[11px]">—</span>}
      </span>
      <span className="text-[13.5px] text-ink-soft">{label}</span>
    </div>
  )
}
