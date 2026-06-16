"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { issuePrescription } from "@/app/actions/prescriptions"

interface PatientOption {
  id: string
  name: string
  email: string
}

export function PrescriptionForm({ patients }: { patients: PatientOption[] }) {
  const router = useRouter()
  const [patientId, setPatientId] = useState(patients[0]?.id ?? "")
  const [medication, setMedication] = useState("")
  const [dosage, setDosage] = useState("")
  const [instructions, setInstructions] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setDone(false)
    const result = await issuePrescription({ patientId, medication, dosage, instructions })
    setLoading(false)
    if (result?.error) {
      setError(result.error)
      return
    }
    setDone(true)
    setMedication("")
    setDosage("")
    setInstructions("")
    router.refresh()
  }

  if (patients.length === 0) {
    return (
      <p className="text-sm text-muted">
        Aún no tienes pacientes con cita. Podrás emitir recetas cuando un paciente reserve contigo.
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="patient" className="text-sm font-medium text-ink">
          Paciente
        </label>
        <select
          id="patient"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          className="rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink"
        >
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.email})
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="medication" className="text-sm font-medium text-ink">
          Medicamento
        </label>
        <input
          id="medication"
          value={medication}
          onChange={(e) => setMedication(e.target.value)}
          required
          placeholder="Ej. Semaglutida 0,25 mg"
          className="rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="dosage" className="text-sm font-medium text-ink">
          Posología
        </label>
        <input
          id="dosage"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
          required
          placeholder="Ej. 1 inyección subcutánea semanal"
          className="rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="instructions" className="text-sm font-medium text-ink">
          Instrucciones (opcional)
        </label>
        <textarea
          id="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          rows={3}
          placeholder="Indicaciones adicionales para el paciente"
          className="rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink"
        />
      </div>

      {error && <p className="text-sm text-clay">{error}</p>}
      {done && <p className="text-sm text-sage">Receta emitida correctamente.</p>}

      <button
        type="submit"
        disabled={loading}
        className="self-start rounded-lg bg-sage px-4 py-2 text-sm font-medium text-paper transition hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Emitiendo…" : "Emitir receta"}
      </button>
    </form>
  )
}
