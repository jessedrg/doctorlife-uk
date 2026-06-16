"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { disconnectGoogle, type GoogleConnectionStatus } from "@/app/actions/google-connection"
import { Calendar, Check, Loader2 } from "lucide-react"

export function GoogleCalendarConnect({ status }: { status: GoogleConnectionStatus }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!status.configured) {
    return (
      <div className="max-w-[560px] rounded-[16px] border border-ink/12 bg-warm p-5">
        <div className="flex items-center gap-2.5 text-ink">
          <Calendar className="size-5 text-ink-mute" aria-hidden />
          <span className="text-[15.5px] font-medium">Google Calendar</span>
        </div>
        <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">
          La sincronización con Google aún no está disponible en la plataforma. El equipo la activará
          en breve; no necesitas hacer nada.
        </p>
      </div>
    )
  }

  const connect = async () => {
    setError(null)
    setLoading(true)
    try {
      await authClient.linkSocial({
        provider: "google",
        callbackURL: "/medico/cuenta?google=conectado",
      })
      // linkSocial redirige al consentimiento de Google; si vuelve sin redirigir
      // refrescamos el estado por si ya quedó enlazado.
      router.refresh()
    } catch {
      setError("No se pudo iniciar la conexión con Google. Inténtalo de nuevo.")
      setLoading(false)
    }
  }

  const disconnect = async () => {
    setError(null)
    setLoading(true)
    try {
      await disconnectGoogle()
      router.refresh()
    } catch {
      setError("No se pudo desconectar Google. Inténtalo de nuevo.")
    }
    setLoading(false)
  }

  return (
    <div className="max-w-[560px] rounded-[16px] border border-ink/12 bg-warm p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 text-ink">
          <Calendar className="size-5 text-amber" aria-hidden />
          <span className="text-[15.5px] font-medium">Google Calendar y Meet</span>
        </div>
        {status.connected ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-olive/12 px-3 py-1 text-[12.5px] font-medium text-olive">
            <Check className="size-3.5" aria-hidden />
            Conectado
          </span>
        ) : null}
      </div>

      <p className="mt-2.5 text-[14px] leading-relaxed text-ink-soft">
        {status.connected
          ? "Tu calendario está sincronizado. Tus huecos ocupados se descartan automáticamente y cada cita pagada genera un evento con enlace de Google Meet para ti y el paciente."
          : "Conecta tu cuenta de Google para que tus huecos respeten tus eventos existentes y cada cita genere automáticamente una videollamada de Google Meet con invitación al paciente."}
      </p>

      {error ? (
        <p role="alert" className="mt-3 text-[13.5px] text-clay">
          {error}
        </p>
      ) : null}

      <div className="mt-4">
        {status.connected ? (
          <button
            type="button"
            onClick={disconnect}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-[12px] border border-ink/15 px-4 py-2.5 text-[14.5px] font-medium text-ink transition-colors hover:bg-ink/[.04] disabled:opacity-60"
          >
            {loading ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
            Desconectar
          </button>
        ) : (
          <button
            type="button"
            onClick={connect}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-[12px] bg-ink px-4 py-2.5 text-[14.5px] font-semibold text-paper transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {loading ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Calendar className="size-4" aria-hidden />}
            Conectar Google Calendar
          </button>
        )}
      </div>
    </div>
  )
}
