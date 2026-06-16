import { requireRole } from "@/lib/session"

export const metadata = { title: "Administración — DoctorLife" }

export default async function AdminHome() {
  await requireRole("admin")

  return (
    <div>
      <h1 className="text-[30px] font-light leading-tight tracking-[-.02em] text-ink text-balance">
        Administración
      </h1>
      <p className="mt-1.5 max-w-[60ch] text-[15.5px] leading-relaxed text-ink-soft">
        Supervisa médicos, pacientes, citas y pagos de la plataforma.
      </p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <PlaceholderCard title="Médicos" body="Aprueba médicos y revisa su estado de cobros." />
        <PlaceholderCard title="Pacientes" body="Consulta la base de pacientes registrados." />
        <PlaceholderCard title="Leads" body="Revisa los leads captados desde el formulario de la web." />
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
