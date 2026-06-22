import Link from "next/link"
import { requireRole } from "@/lib/session"
import { getNextAppointment } from "@/app/actions/booking"
import { getMyPlan } from "@/app/actions/patient"
import { getMySubscription, syncSubscriptionBySession } from "@/app/actions/subscription"
import { hasPendingVerification } from "@/app/actions/verification"
import { AppointmentSummary } from "@/components/appointment-summary"
import { SubscriptionCard } from "@/components/subscription-card"
import { FollowupReminder } from "@/components/followup-reminder"

export const metadata = { title: "Mi portal — DoctorLife" }

export default async function PortalHome({
  searchParams,
}: {
  searchParams: Promise<{ subscription?: string; session_id?: string }>
}) {
  const user = await requireRole("patient")
  const firstName = user.name.split(" ")[0]

  // Al volver de Stripe, sincronizamos la suscripción antes de leer su estado.
  const sp = await searchParams
  if (sp.subscription === "ok" && sp.session_id) {
    await syncSubscriptionBySession(sp.session_id)
  }

  const [next, plan, subscription, verificationPending] = await Promise.all([
    getNextAppointment(),
    getMyPlan(),
    getMySubscription(),
    hasPendingVerification(user.id),
  ])

  const subActive =
    subscription && ["active", "trialing", "past_due"].includes(subscription.status)
  const followupPending = Boolean(subActive && subscription?.followupDueAt)

  return (
    <div>
      <h1 className="text-[30px] font-light leading-tight tracking-[-.02em] text-ink text-balance">
        Hola, {firstName}
      </h1>
      <p className="mt-1.5 max-w-[60ch] text-[15.5px] leading-relaxed text-ink-soft">
        Este es tu portal de paciente. Aquí verás tu próxima cita, tu plan de tratamiento y podrás
        hablar con tu equipo médico.
      </p>

      {followupPending ? (
        <div className="mt-7">
          <FollowupReminder />
        </div>
      ) : null}

      <div className="mt-7 grid gap-4 lg:grid-cols-3">
        {next ? (
          <div className="lg:col-span-2">
            <AppointmentSummary appt={next} />
          </div>
        ) : (
          <div className="lg:col-span-2 rounded-[20px] border border-ink/10 bg-cream p-5">
            <h2 className="text-[16px] font-medium text-ink">Tu próxima cita</h2>
            <p className="mt-1.5 text-[14px] leading-relaxed text-ink-soft">
              Aún no tienes ninguna cita reservada. Elige el primer hueco disponible con nuestro
              equipo médico.
            </p>
            <Link
              href="/portal/reservar"
              className="mt-4 inline-flex rounded-full bg-ink px-4 py-2 text-[13.5px] font-medium text-paper transition-opacity hover:opacity-90"
            >
              Reservar primera cita
            </Link>
          </div>
        )}

        <PlanCard plan={plan} />
      </div>

      <div className="mt-4">
        <SubscriptionCard subscription={subscription} verificationPending={verificationPending} />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <QuickLink
          href="/portal/progreso"
          title="Mi progreso"
          body="Registra tu peso y dosis, y sigue tu evolución."
        />
        <QuickLink
          href="/portal/chat"
          title="Chat médico"
          body="Habla con tu equipo médico de forma segura entre citas."
        />
        <QuickLink
          href="/portal/recetas"
          title="Recetas"
          body="Consulta y descarga las recetas emitidas por tu médico."
        />
      </div>
    </div>
  )
}

function PlanCard({ plan }: { plan: Awaited<ReturnType<typeof getMyPlan>> }) {
  return (
    <div className="rounded-[20px] border border-ink/10 bg-cream p-5">
      <h2 className="text-[16px] font-medium text-ink">Tu plan</h2>
      {plan ? (
        <dl className="mt-3 space-y-2 text-[14px]">
          {plan.plan ? (
            <Row label="Plan" value={plan.plan} />
          ) : null}
          {plan.goal ? <Row label="Objetivo" value={plan.goal} /> : null}
          {plan.formatPreference ? (
            <Row label="Formato" value={plan.formatPreference} />
          ) : null}
          {plan.bmi ? <Row label="IMC" value={String(plan.bmi)} /> : null}
        </dl>
      ) : (
        <p className="mt-1.5 text-[14px] leading-relaxed text-ink-soft">
          Tu plan de tratamiento aparecerá aquí cuando tu médico lo configure.
        </p>
      )}
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-ink-soft">{label}</dt>
      <dd className="font-medium capitalize text-ink">{value}</dd>
    </div>
  )
}

function QuickLink({ href, title, body }: { href: string; title: string; body: string }) {
  return (
    <Link
      href={href}
      className="rounded-[20px] border border-ink/10 bg-cream p-5 transition-colors hover:bg-ink/5"
    >
      <h2 className="text-[16px] font-medium text-ink">{title}</h2>
      <p className="mt-1.5 text-[14px] leading-relaxed text-ink-soft">{body}</p>
    </Link>
  )
}
