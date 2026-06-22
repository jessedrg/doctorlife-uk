import type { DoctorBilling } from "@/app/actions/doctor"
import { CreditCard, RefreshCw, CheckCircle2, AlertCircle, CalendarClock } from "lucide-react"

function fmtMoney(cents: number, currency = "eur") {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100)
}

const dateFmt = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric" })

const STATUS_META: Record<string, { label: string; cls: string }> = {
  active: { label: "Activa", cls: "bg-olive/15 text-olive" },
  trialing: { label: "En prueba", cls: "bg-olive/15 text-olive" },
  past_due: { label: "Pago pendiente", cls: "bg-amber/15 text-amber" },
  incomplete: { label: "Incompleta", cls: "bg-amber/15 text-amber" },
  canceled: { label: "Cancelada", cls: "bg-ink/[.08] text-ink-soft" },
}

export function DoctorBillingOverview({ billing }: { billing: DoctorBilling }) {
  const { subscriptions, commissions, totalCommissionCents, activeCount } = billing

  return (
    <div className="flex flex-col gap-8">
      {/* Resumen */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-[16px] border border-ink/10 bg-cream p-5">
          <div className="flex items-center gap-2 text-ink-soft">
            <CheckCircle2 className="size-4" aria-hidden />
            <span className="text-[13px] font-medium uppercase tracking-[.05em]">Suscripciones activas</span>
          </div>
          <p className="mt-2 text-[28px] font-light text-ink">{activeCount}</p>
        </div>
        <div className="rounded-[16px] border border-ink/10 bg-cream p-5">
          <div className="flex items-center gap-2 text-ink-soft">
            <CreditCard className="size-4" aria-hidden />
            <span className="text-[13px] font-medium uppercase tracking-[.05em]">Comisiones acumuladas</span>
          </div>
          <p className="mt-2 text-[28px] font-light text-ink">{fmtMoney(totalCommissionCents)}</p>
        </div>
      </div>

      {/* Suscripciones de pacientes */}
      <section>
        <h3 className="text-[16px] font-medium text-ink">Suscripciones de tus pacientes</h3>
        <p className="mt-1 text-[13.5px] text-ink-soft">
          Estado de cada tratamiento y fecha del próximo cobro.
        </p>
        {subscriptions.length === 0 ? (
          <p className="mt-4 rounded-[14px] border border-dashed border-ink/15 bg-warm px-4 py-6 text-center text-[14px] text-ink-soft">
            Aún no tienes pacientes con suscripción activa.
          </p>
        ) : (
          <ul className="mt-4 flex flex-col gap-2.5">
            {subscriptions.map((s, i) => {
              const meta = STATUS_META[s.status] ?? STATUS_META.incomplete
              return (
                <li
                  key={`${s.patientName}-${i}`}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-[14px] border border-ink/10 bg-cream px-4 py-3.5"
                >
                  <div className="min-w-0">
                    <p className="text-[15px] font-medium text-ink">{s.patientName}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-[12.5px] text-ink-soft">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 font-medium ${meta.cls}`}>
                        {meta.label}
                      </span>
                      {s.currentPeriodEnd && (
                        <span className="inline-flex items-center gap-1">
                          <CalendarClock className="size-3.5" aria-hidden />
                          {s.cancelAtPeriodEnd ? "Finaliza el " : "Próximo cobro: "}
                          {dateFmt.format(s.currentPeriodEnd)}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-[14px] font-medium text-ink">
                    {fmtMoney(s.priceCents, s.currency)}
                    <span className="text-[12px] font-normal text-ink-mute">/mes</span>
                  </p>
                </li>
              )
            })}
          </ul>
        )}
      </section>

      {/* Comisiones */}
      <section>
        <h3 className="text-[16px] font-medium text-ink">Tus comisiones</h3>
        <p className="mt-1 text-[13.5px] text-ink-soft">
          Primer pago íntegro en la activación y 25 € en cada renovación mensual.
        </p>
        {commissions.length === 0 ? (
          <p className="mt-4 rounded-[14px] border border-dashed border-ink/15 bg-warm px-4 py-6 text-center text-[14px] text-ink-soft">
            Todavía no se ha registrado ninguna comisión.
          </p>
        ) : (
          <ul className="mt-4 flex flex-col gap-2">
            {commissions.map((c) => (
              <li
                key={c.id}
                className="flex items-center justify-between gap-3 rounded-[12px] border border-ink/10 bg-cream px-4 py-3"
              >
                <div className="flex items-center gap-2.5">
                  {c.kind === "activation" ? (
                    <CheckCircle2 className="size-4 text-olive" aria-hidden />
                  ) : (
                    <RefreshCw className="size-4 text-ink-soft" aria-hidden />
                  )}
                  <div>
                    <p className="text-[14px] text-ink">
                      {c.patientName}
                      <span className="text-ink-mute">
                        {" · "}
                        {c.kind === "activation" ? "Activación" : "Renovación"}
                      </span>
                    </p>
                    <p className="text-[11.5px] text-ink-mute">{dateFmt.format(c.createdAt)}</p>
                  </div>
                </div>
                <p className="text-[14px] font-medium text-olive">+{fmtMoney(c.amountCents, c.currency)}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
