import { requireRole } from "@/lib/session"
import {
  getMyDoctorProfile,
  refreshStripeStatus,
  getDoctorTransactions,
  getDoctorBilling,
} from "@/app/actions/doctor"
import { DoctorStripeOnboarding } from "@/components/doctor-stripe-onboarding"
import { DoctorTransactions } from "@/components/doctor-transactions"
import { DoctorBillingOverview } from "@/components/doctor-billing-overview"

export const metadata = { title: "Pagos — DoctorLife" }

export default async function MedicoPagosPage({
  searchParams,
}: {
  searchParams: Promise<{ done?: string; refresh?: string }>
}) {
  await requireRole("doctor")
  const params = await searchParams

  // Al volver de Stripe (return_url), sincronizamos el estado real.
  let profile = await getMyDoctorProfile()
  if (params.done && profile.stripeAccountId) {
    try {
      profile = await refreshStripeStatus()
    } catch {
      // Si Stripe falla al sincronizar, seguimos mostrando la página con el estado que tenemos.
    }
  }

  // Solo cargamos transacciones si la cuenta ya puede cobrar.
  const earnings = profile.chargesEnabled
    ? await getDoctorTransactions().catch(() => null)
    : null

  // Registro propio de suscripciones y comisiones (independiente de Stripe).
  const billing = await getDoctorBilling().catch(() => ({
    subscriptions: [],
    commissions: [],
    totalCommissionCents: 0,
    activeCount: 0,
    upcomingPayouts: [],
    upcomingTotalCents: 0,
  }))

  return (
    <div>
      <h1 className="text-[28px] font-light leading-tight tracking-[-.02em] text-ink">Pagos</h1>
      <p className="mt-1.5 max-w-[60ch] text-[15.5px] leading-relaxed text-ink-soft">
        Configura cómo recibes los ingresos de tus consultas y revisa tus transacciones.
      </p>

      <div className="mt-7 max-w-[640px]">
        <DoctorStripeOnboarding
          hasAccount={Boolean(profile.stripeAccountId)}
          chargesEnabled={profile.chargesEnabled}
          payoutsEnabled={profile.payoutsEnabled}
          onboarded={profile.stripeOnboarded}
        />
      </div>

      <section className="mt-10">
        <h2 className="text-[20px] font-medium text-ink">Suscripciones y comisiones</h2>
        <p className="mt-1 text-[14px] text-ink-soft">
          Estado de las suscripciones de tus pacientes, próximo cobro y tus comisiones.
        </p>
        <div className="mt-5">
          <DoctorBillingOverview billing={billing} />
        </div>
      </section>

      {earnings ? (
        <section className="mt-10">
          <h2 className="text-[20px] font-medium text-ink">Transacciones</h2>
          <p className="mt-1 text-[14px] text-ink-soft">
            Repartos de suscripción, primeras consultas y retiradas a tu banco.
          </p>
          <div className="mt-5">
            <DoctorTransactions earnings={earnings} />
          </div>
        </section>
      ) : null}
    </div>
  )
}
