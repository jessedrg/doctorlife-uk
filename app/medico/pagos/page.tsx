import { requireRole } from "@/lib/session"
import { getMyDoctorProfile, refreshStripeStatus } from "@/app/actions/doctor"
import { DoctorStripeOnboarding } from "@/components/doctor-stripe-onboarding"

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
    profile = await refreshStripeStatus()
  }

  return (
    <div>
      <h1 className="text-[28px] font-light leading-tight tracking-[-.02em] text-ink">Pagos</h1>
      <p className="mt-1.5 max-w-[60ch] text-[15.5px] leading-relaxed text-ink-soft">
        Configura cómo recibes los ingresos de tus consultas.
      </p>

      <div className="mt-7 max-w-[640px]">
        <DoctorStripeOnboarding
          hasAccount={Boolean(profile.stripeAccountId)}
          chargesEnabled={profile.chargesEnabled}
          payoutsEnabled={profile.payoutsEnabled}
          onboarded={profile.stripeOnboarded}
        />
      </div>
    </div>
  )
}
