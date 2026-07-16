import { requireRole } from "@/lib/session"
import { getClinicStatus, getPlatformFeeTracking } from "@/app/actions/clinic"
import { ClinicStripePanel } from "@/components/clinic-stripe-panel"
import { PLATFORM_FEE_PERCENT } from "@/lib/stripe"

export const metadata = { title: "Clínica y cobros — DoctorLife" }

function eur(cents: number) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(cents / 100)
}

export default async function AdminClinicPage() {
  await requireRole("admin")
  const [status, fees] = await Promise.all([getClinicStatus(), getPlatformFeeTracking()])

  return (
    <div>
      <h1 className="text-[30px] font-light leading-tight tracking-[-.02em] text-ink text-balance">
        Clínica y cobros
      </h1>
      <p className="mt-1.5 max-w-[62ch] text-[15.5px] leading-relaxed text-ink-soft">
        La clínica factura el acto médico y DoctorLife cobra una comisión de servicio
        tecnológico del {PLATFORM_FEE_PERCENT}% sobre cada pago. Aquí gestionas la cuenta
        de cobros y controlas cuánto nos corresponde.
      </p>

      <div className="mt-6">
        <ClinicStripePanel status={status} />
      </div>

      <h2 className="mt-9 text-[20px] font-light tracking-[-.01em] text-ink">
        Comisión tecnológica de DoctorLife
      </h2>
      <p className="mt-1 max-w-[62ch] text-[14.5px] leading-relaxed text-ink-soft">
        Lo que la clínica nos abona automáticamente (application fee) por cada cobro
        liquidado en su cuenta.
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Comisión acumulada"
          value={eur(fees.totalFeeCents)}
          hint={`${fees.count} cobros con comisión`}
          highlight
        />
        <StatCard
          label="Bruto liquidado en la clínica"
          value={eur(fees.grossToClinicCents)}
          hint={`Comisión del ${fees.feePercent}%`}
        />
        <StatCard
          label="Actividad"
          value={`${fees.activeSubscriptions} subs · ${fees.paidAppointments} citas`}
          hint="Suscripciones activas y citas confirmadas"
        />
      </div>

      {!status.ready && (
        <p className="mt-5 rounded-xl bg-amber-50 px-4 py-3 text-[14px] leading-relaxed text-amber-900">
          Mientras la cuenta de la clínica no esté activa, no se pueden procesar cobros de
          pacientes. Completa el onboarding de Stripe arriba para empezar a facturar.
        </p>
      )}

      <div className="mt-8 overflow-x-auto rounded-[18px] border border-ink/10">
        <table className="w-full text-left text-[14px]">
          <thead className="bg-cream text-[12.5px] uppercase tracking-[.05em] text-ink-mute">
            <tr>
              <th className="px-4 py-3 font-semibold">Periodo</th>
              <th className="px-4 py-3 font-semibold">Cobros</th>
              <th className="px-4 py-3 font-semibold">Comisión DoctorLife</th>
            </tr>
          </thead>
          <tbody>
            {fees.months.map((m) => (
              <tr key={m.label} className="border-t border-ink/10 bg-warm">
                <td className="px-4 py-3 capitalize text-ink">{m.label}</td>
                <td className="px-4 py-3 text-ink-soft">{m.count}</td>
                <td className="px-4 py-3 font-medium text-ink">{eur(m.feeCents)}</td>
              </tr>
            ))}
            {fees.months.length === 0 && (
              <tr className="bg-warm">
                <td colSpan={3} className="px-4 py-6 text-center text-ink-mute">
                  {fees.available
                    ? "Aún no hay comisiones registradas."
                    : "No se pudo cargar la información de Stripe."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  hint,
  highlight,
}: {
  label: string
  value: string
  hint?: string
  highlight?: boolean
}) {
  return (
    <div
      className={
        "rounded-[18px] border p-5 " +
        (highlight ? "border-ink/15 bg-sage/25" : "border-ink/10 bg-warm")
      }
    >
      <p className="text-[12.5px] uppercase tracking-[.05em] text-ink-mute">{label}</p>
      <p className="mt-1.5 text-[24px] font-light tracking-[-.01em] text-ink">{value}</p>
      {hint && <p className="mt-1 text-[13px] text-ink-soft">{hint}</p>}
    </div>
  )
}
