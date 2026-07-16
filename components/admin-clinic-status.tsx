import type { listClinicsWithStatus } from "@/app/actions/admin"

type Clinic = Awaited<ReturnType<typeof listClinicsWithStatus>>[number]

const DAY_LABELS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

function fmtMinutes(m: number) {
  const h = Math.floor(m / 60)
  const min = m % 60
  return `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`
}

const STEP_LABELS: { key: keyof Clinic; label: string }[] = [
  { key: "profileComplete", label: "Perfil" },
  { key: "fiscalComplete", label: "Datos fiscales" },
  { key: "stripeReady", label: "Stripe" },
  { key: "availabilitySet", label: "Disponibilidad" },
]

function StepPill({ label, done }: { label: string; done: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-medium ${
        done ? "bg-sage/30 text-ink" : "bg-ink/10 text-ink-soft"
      }`}
    >
      <span aria-hidden="true">{done ? "✓" : "○"}</span>
      {label}
    </span>
  )
}

export function AdminClinicStatus({ clinic }: { clinic: Clinic }) {
  const pct = Math.round((clinic.completedSteps / clinic.totalSteps) * 100)

  // Agrupa franjas por día para el resumen.
  const byDay = new Map<number, { startMinute: number; endMinute: number }[]>()
  for (const r of clinic.availabilityRules) {
    const list = byDay.get(r.dayOfWeek) ?? []
    list.push({ startMinute: r.startMinute, endMinute: r.endMinute })
    byDay.set(r.dayOfWeek, list)
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Progreso de activación */}
      <div>
        <div className="mb-1.5 flex items-center justify-between text-[12.5px]">
          <span className="font-medium text-ink">
            Activación {clinic.completedSteps}/{clinic.totalSteps}
          </span>
          <span
            className={`rounded-full px-2 py-0.5 text-[11.5px] font-semibold ${
              clinic.fullyActive ? "bg-sage/40 text-ink" : "bg-ink/10 text-ink-soft"
            }`}
          >
            {clinic.fullyActive ? "Activa" : "Pendiente"}
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink/10">
          <div
            className={`h-full rounded-full transition-all ${clinic.fullyActive ? "bg-sage" : "bg-ink/40"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {STEP_LABELS.map((s) => (
            <StepPill key={s.key} label={s.label} done={Boolean(clinic[s.key])} />
          ))}
        </div>
      </div>

      {/* Resumen de disponibilidad */}
      <div>
        <div className="mb-1 text-[12.5px] font-medium text-ink">Disponibilidad semanal</div>
        {clinic.availabilityRules.length === 0 ? (
          <p className="text-[13px] text-ink-soft">Sin franjas marcadas.</p>
        ) : (
          <ul className="flex flex-col gap-0.5 text-[13px] text-ink-soft">
            {[1, 2, 3, 4, 5, 6, 0].map((day) => {
              const slots = byDay.get(day)
              if (!slots || slots.length === 0) return null
              return (
                <li key={day} className="flex gap-2">
                  <span className="w-9 shrink-0 font-medium text-ink">{DAY_LABELS[day]}</span>
                  <span>
                    {slots
                      .sort((a, b) => a.startMinute - b.startMinute)
                      .map((s) => `${fmtMinutes(s.startMinute)}–${fmtMinutes(s.endMinute)}`)
                      .join(", ")}
                  </span>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
