import { requireRole } from "@/lib/session"
import { PortalShell } from "@/components/portal-shell"

export default async function MedicoLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole("doctor")
  return (
    <PortalShell
      user={user}
      badge="Médico"
      nav={[
        { href: "/medico", label: "Inicio" },
        { href: "/medico/agenda", label: "Agenda" },
        { href: "/medico/pacientes", label: "Pacientes" },
        { href: "/medico/disponibilidad", label: "Disponibilidad" },
        { href: "/medico/chat", label: "Mensajes" },
        { href: "/medico/recetas", label: "Recetas" },
        { href: "/medico/pagos", label: "Pagos" },
        { href: "/medico/cuenta", label: "Mi cuenta" },
      ]}
    >
      {children}
    </PortalShell>
  )
}
