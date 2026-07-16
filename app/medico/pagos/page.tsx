import { requireRole } from "@/lib/session"
import { getDoctorBilling } from "@/app/actions/doctor"
import { DoctorBillingOverview } from "@/components/doctor-billing-overview"
import { Building2, Info } from "lucide-react"

export const metadata = { title: "Actividad — DoctorLife" }

export default async function MedicoPagosPage() {
  await requireRole("doctor")

  // Registro de suscripciones y actividad de los pacientes del médico.
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
      <h1 className="text-[28px] font-light leading-tight tracking-[-.02em] text-ink">
        Actividad y honorarios
      </h1>
      <p className="mt-1.5 max-w-[62ch] text-[15.5px] leading-relaxed text-ink-soft">
        Consulta la actividad de tus pacientes y sus suscripciones. Los honorarios los
        gestiona directamente la clínica.
      </p>

      <div className="mt-6 flex max-w-[640px] items-start gap-3 rounded-[18px] border border-ink/10 bg-sage/20 p-5">
        <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-ink" aria-hidden />
        <div>
          <h2 className="text-[16px] font-medium text-ink">Cobros gestionados por la clínica</h2>
          <p className="mt-1 text-[14px] leading-relaxed text-ink-soft">
            Los pagos de los pacientes los cobra y factura la clínica como entidad
            sanitaria. Tus honorarios como profesional se liquidan a través de la clínica,
            fuera de esta plataforma. No necesitas conectar ninguna cuenta de cobro aquí.
          </p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-[20px] font-medium text-ink">Suscripciones de tus pacientes</h2>
        <p className="mt-1 flex items-center gap-1.5 text-[14px] text-ink-soft">
          <Info className="h-3.5 w-3.5" aria-hidden />
          Estado de las suscripciones activas y su actividad.
        </p>
        <div className="mt-5">
          <DoctorBillingOverview billing={billing} />
        </div>
      </section>
    </div>
  )
}
