import { getMyPrescriptions } from "@/app/actions/prescriptions"
import { hasActiveSubscription, syncSubscriptionBySession } from "@/app/actions/subscription"
import { getSessionUser } from "@/lib/session"
import { PrescriptionList } from "@/components/prescription-list"

export default async function RecetasPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; subscription?: string }>
}) {
  const { session_id } = await searchParams

  // Al volver del checkout, sincronizamos por si el webhook aún no llegó.
  if (session_id) {
    try {
      await syncSubscriptionBySession(session_id)
    } catch {
      /* el webhook lo resolverá */
    }
  }

  const me = await getSessionUser()
  const [prescriptions, unlocked] = await Promise.all([
    getMyPrescriptions(),
    me ? hasActiveSubscription(me.id) : Promise.resolve(false),
  ])

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-semibold text-ink">Mis recetas</h1>
        <p className="mt-1 text-sm text-muted">
          {unlocked
            ? "Descarga las recetas emitidas por tu médico en formato PDF."
            : "Tu médico te envía aquí las recetas. Desbloquéalas activando tu tratamiento."}
        </p>
      </header>
      <PrescriptionList prescriptions={prescriptions} locked={!unlocked} />
    </div>
  )
}
