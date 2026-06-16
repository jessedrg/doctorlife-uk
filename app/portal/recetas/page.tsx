import { getMyPrescriptions } from "@/app/actions/prescriptions"
import { PrescriptionList } from "@/components/prescription-list"

export default async function RecetasPage() {
  const prescriptions = await getMyPrescriptions()

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-semibold text-ink">Mis recetas</h1>
        <p className="mt-1 text-sm text-muted">
          Descarga las recetas emitidas por tu médico en formato PDF.
        </p>
      </header>
      <PrescriptionList prescriptions={prescriptions} />
    </div>
  )
}
