import Link from "next/link"
import { Check, ArrowRight } from "lucide-react"

export type AccountStep = {
  /** Etiqueta corta del paso. */
  label: string
  /** Explicación / estado del paso. */
  detail: string
  /** ¿Completado? */
  done: boolean
  /** Ruta para completarlo (opcional). */
  href?: string
  /** ¿Es opcional (no bloquea la activación)? */
  optional?: boolean
  /** Lista de datos que faltan (opcional). */
  missing?: string[]
}

/**
 * Checklist del estado de la cuenta de la clínica: muestra qué falta para que
 * la cuenta esté activa (perfil, datos fiscales, cobros, disponibilidad…) con
 * una barra de progreso sobre los pasos obligatorios.
 */
export function AccountStatus({ steps }: { steps: AccountStep[] }) {
  const required = steps.filter((s) => !s.optional)
  const doneRequired = required.filter((s) => s.done).length
  const total = required.length
  const pct = total === 0 ? 100 : Math.round((doneRequired / total) * 100)
  const active = doneRequired === total

  return (
    <section className="rounded-[22px] border border-ink/10 bg-cream p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-[18px] font-medium text-ink">Estado de tu cuenta</h2>
          <p className="mt-1 max-w-[60ch] text-[14px] leading-relaxed text-ink-soft">
            {active
              ? "Tu cuenta está activa: puedes recibir pacientes y cobrar."
              : "Completa estos pasos para activar tu cuenta y poder cobrar."}
          </p>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12.5px] font-medium ${
            active ? "bg-[#128a3f]/10 text-[#0f7a37]" : "bg-ink/10 text-ink-soft"
          }`}
        >
          <span className={`h-2 w-2 rounded-full ${active ? "bg-[#128a3f]" : "bg-amber-500"}`} />
          {active ? "Activa" : "Pendiente"}
        </span>
      </div>

      {/* Barra de progreso */}
      <div className="mt-5">
        <div className="flex items-center justify-between text-[12.5px] text-ink-soft">
          <span>
            {doneRequired} de {total} pasos obligatorios
          </span>
          <span>{pct}%</span>
        </div>
        <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-ink/10">
          <div
            className="h-full rounded-full bg-[#128a3f] transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Lista de pasos */}
      <ul className="mt-5 flex flex-col gap-2.5">
        {steps.map((step) => (
          <li
            key={step.label}
            className="flex items-start gap-3 rounded-[14px] border border-ink/10 bg-paper p-3.5"
          >
            <span
              className={`mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full ${
                step.done ? "bg-[#128a3f] text-white" : "border border-ink/20 bg-cream text-transparent"
              }`}
              aria-hidden="true"
            >
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                <p className="text-[14.5px] font-medium text-ink">{step.label}</p>
                {step.optional && (
                  <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[11px] font-medium text-ink-soft">
                    Opcional
                  </span>
                )}
                {step.done && (
                  <span className="text-[12px] font-medium text-[#0f7a37]">Completado</span>
                )}
              </div>
              <p className="mt-0.5 text-[13px] leading-relaxed text-ink-soft">{step.detail}</p>

              {!step.done && step.missing && step.missing.length > 0 && (
                <p className="mt-1 text-[12.5px] leading-relaxed text-ink-mute">
                  Falta: {step.missing.join(", ")}
                </p>
              )}

              {!step.done && step.href && (
                <Link
                  href={step.href}
                  className="mt-2 inline-flex items-center gap-1 text-[13px] font-medium text-ink underline-offset-4 hover:underline"
                >
                  Completar ahora
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

const DAY_NAMES = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]

function minutesToTime(min: number) {
  const h = Math.floor(min / 60)
  const m = min % 60
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
}

export type AvailabilitySummaryRule = {
  dayOfWeek: number
  startMinute: number
  endMinute: number
}

/**
 * Resumen semanal de la disponibilidad marcada: agrupa las franjas por día
 * (lunes → domingo) para que la clínica vea de un vistazo qué horario tiene.
 */
export function AvailabilitySummary({
  rules,
  slotMinutes,
  timezone,
}: {
  rules: AvailabilitySummaryRule[]
  slotMinutes: number
  timezone: string
}) {
  // Orden lunes(1) … domingo(0)
  const order = [1, 2, 3, 4, 5, 6, 0]
  const byDay = new Map<number, AvailabilitySummaryRule[]>()
  for (const r of rules) {
    const list = byDay.get(r.dayOfWeek) ?? []
    list.push(r)
    byDay.set(r.dayOfWeek, list)
  }

  return (
    <section className="rounded-[22px] border border-ink/10 bg-cream p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-[18px] font-medium text-ink">Tu disponibilidad</h2>
          <p className="mt-1 max-w-[60ch] text-[14px] leading-relaxed text-ink-soft">
            Horario semanal que ven tus pacientes al reservar. Citas de {slotMinutes} min ·{" "}
            {timezone}.
          </p>
        </div>
        <Link
          href="/clinica/disponibilidad"
          className="inline-flex items-center gap-1 rounded-full border border-ink/15 px-3.5 py-1.5 text-[13px] font-medium text-ink transition-colors hover:bg-ink/5"
        >
          Editar
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {rules.length === 0 ? (
        <p className="mt-5 rounded-[14px] border border-dashed border-ink/20 bg-paper p-4 text-[13.5px] text-ink-soft">
          Aún no has marcado ninguna franja. Define tu horario para que tus pacientes puedan
          reservar.
        </p>
      ) : (
        <ul className="mt-5 divide-y divide-ink/10 overflow-hidden rounded-[14px] border border-ink/10 bg-paper">
          {order.map((dow) => {
            const franjas = (byDay.get(dow) ?? []).sort((a, b) => a.startMinute - b.startMinute)
            return (
              <li key={dow} className="flex items-center justify-between gap-4 px-4 py-2.5">
                <span className="text-[14px] font-medium text-ink">{DAY_NAMES[dow]}</span>
                {franjas.length === 0 ? (
                  <span className="text-[13px] text-ink-mute">Cerrado</span>
                ) : (
                  <span className="flex flex-wrap justify-end gap-1.5">
                    {franjas.map((f, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-ink/5 px-2.5 py-0.5 text-[12.5px] font-medium text-ink"
                      >
                        {minutesToTime(f.startMinute)}–{minutesToTime(f.endMinute)}
                      </span>
                    ))}
                  </span>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
