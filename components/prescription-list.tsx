import { MAIN_PLAN } from "@/lib/plans"
import { UnlockPrescriptionsButton } from "@/components/unlock-prescriptions-button"

interface PrescriptionRow {
  id: number
  medication: string
  dosage: string
  instructions: string | null
  issuedAt: Date
  doctorName: string | null
  patientName: string | null
}

export function PrescriptionList({
  prescriptions,
  showPatient = false,
  locked = false,
}: {
  prescriptions: PrescriptionRow[]
  showPatient?: boolean
  /** Paciente sin tratamiento activo: las recetas se muestran bloqueadas. */
  locked?: boolean
}) {
  if (prescriptions.length === 0) {
    return (
      <p className="text-sm text-muted">
        {showPatient ? "Aún no has emitido recetas." : "Todavía no tienes recetas."}
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {locked && (
        <div className="rounded-2xl border border-amber/40 bg-amber/10 p-5">
          <div className="flex items-start gap-3">
            <span
              aria-hidden
              className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-amber/20 text-amber"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            <div className="min-w-0">
              <p className="font-semibold text-ink">Tu receta está lista</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                Tu médico ha preparado tu tratamiento. Para verlo y descargar el PDF, activa tu
                suscripción mensual. Incluye endocrino asignado, videollamada mensual y chat en vivo.
                El primer mes pagas {MAIN_PLAN.firstMonthLabel} (te descontamos los 25&nbsp;€ de tu
                primera visita); después, {MAIN_PLAN.totalLabel}. Cancela cuando quieras.
              </p>
              <div className="mt-3">
                <UnlockPrescriptionsButton priceLabel={MAIN_PLAN.firstMonthLabel} />
              </div>
            </div>
          </div>
        </div>
      )}

      <ul className="flex flex-col gap-3">
        {prescriptions.map((p) => (
          <li key={p.id} className="rounded-xl border border-line bg-paper p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className={`font-medium text-ink ${locked ? "select-none blur-sm" : ""}`}>
                  {locked ? "Tratamiento recetado" : p.medication}
                </p>
                <p className={`mt-0.5 text-sm text-ink ${locked ? "select-none blur-sm" : ""}`}>
                  {locked ? "Posología disponible al activar" : p.dosage}
                </p>
                {!locked && p.instructions && (
                  <p className="mt-1 text-sm text-muted">{p.instructions}</p>
                )}
                <p className="mt-2 text-xs text-muted">
                  {showPatient ? `Paciente: ${p.patientName ?? "—"}` : `Dr. ${p.doctorName ?? "—"}`}
                  {" · "}
                  {new Intl.DateTimeFormat("es-ES", {
                    dateStyle: "long",
                    timeStyle: "short",
                    timeZone: "Europe/Madrid",
                  }).format(new Date(p.issuedAt))}
                </p>
              </div>
              {locked ? (
                <span className="shrink-0 rounded-lg border border-line px-3 py-1.5 text-sm font-medium text-muted">
                  Bloqueada
                </span>
              ) : (
                <a
                  href={`/api/prescriptions/${p.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-lg border border-sage px-3 py-1.5 text-sm font-medium text-sage transition hover:bg-sage hover:text-paper"
                >
                  Descargar PDF
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
