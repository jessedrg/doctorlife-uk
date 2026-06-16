import { requireRole } from "@/lib/session"

export const metadata = { title: "Panel del médico — DoctorLife" }

export default async function MedicoHome() {
  const user = await requireRole("doctor")
  const firstName = user.name.split(" ")[0]

  return (
    <div>
      <h1 className="text-[30px] font-light leading-tight tracking-[-.02em] text-ink text-balance">
        Dr. {firstName}
      </h1>
      <p className="mt-1.5 max-w-[60ch] text-[15.5px] leading-relaxed text-ink-soft">
        Gestiona tu disponibilidad, tus pacientes, recetas y pagos desde aquí.
      </p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <PlaceholderCard title="Cobros (Stripe)" body="Conecta tu cuenta de Stripe para recibir pagos de tus pacientes." />
        <PlaceholderCard title="Disponibilidad" body="Marca tus horas disponibles para que los pacientes reserven cita." />
        <PlaceholderCard title="Tus pacientes" body="Verás aquí a los pacientes que reserven contigo." />
      </div>
    </div>
  )
}

function PlaceholderCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[20px] border border-ink/10 bg-cream p-5">
      <h2 className="text-[16px] font-medium text-ink">{title}</h2>
      <p className="mt-1.5 text-[14px] leading-relaxed text-ink-soft">{body}</p>
    </div>
  )
}
