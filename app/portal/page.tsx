import { requireRole } from "@/lib/session"

export const metadata = { title: "Mi portal — DoctorLife" }

export default async function PortalHome() {
  const user = await requireRole("patient")
  const firstName = user.name.split(" ")[0]

  return (
    <div>
      <h1 className="text-[30px] font-light leading-tight tracking-[-.02em] text-ink text-balance">
        Hola, {firstName}
      </h1>
      <p className="mt-1.5 max-w-[60ch] text-[15.5px] leading-relaxed text-ink-soft">
        Este es tu portal de paciente. Aquí verás tu próxima cita, podrás hablar con tu médico y
        consultar tus recetas.
      </p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <PlaceholderCard title="Tu próxima cita" body="Aún no has reservado tu primera cita. La verás aquí tras completar el pago." />
        <PlaceholderCard title="Tu plan" body="Tu plan de tratamiento aparecerá aquí cuando tu médico lo configure." />
        <PlaceholderCard title="Chat médico" body="Habla con tu equipo médico de forma segura. Disponible próximamente." />
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
