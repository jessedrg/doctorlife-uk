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
}: {
  prescriptions: PrescriptionRow[]
  showPatient?: boolean
}) {
  if (prescriptions.length === 0) {
    return (
      <p className="text-sm text-muted">
        {showPatient ? "Aún no has emitido recetas." : "Todavía no tienes recetas."}
      </p>
    )
  }

  return (
    <ul className="flex flex-col gap-3">
      {prescriptions.map((p) => (
        <li key={p.id} className="rounded-xl border border-line bg-paper p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-medium text-ink">{p.medication}</p>
              <p className="mt-0.5 text-sm text-ink">{p.dosage}</p>
              {p.instructions && <p className="mt-1 text-sm text-muted">{p.instructions}</p>}
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
            <a
              href={`/api/prescriptions/${p.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-lg border border-sage px-3 py-1.5 text-sm font-medium text-sage transition hover:bg-sage hover:text-paper"
            >
              Descargar PDF
            </a>
          </div>
        </li>
      ))}
    </ul>
  )
}
