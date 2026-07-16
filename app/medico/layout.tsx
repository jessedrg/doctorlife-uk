import { requireRole } from "@/lib/session"
import { PortalShell } from "@/components/portal-shell"

export default async function MedicoLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole("doctor")
  return (
    <PortalShell
      user={user}
      badge="Médico"
      homeHref="/medico"
      showNotifications
      nav={[
        { href: "/medico", label: "Inicio", icon: "home" },
        { href: "/medico/agenda", label: "Agenda", icon: "agenda" },
        { href: "/medico/pacientes", label: "Pacientes", icon: "pacientes" },
        { href: "/medico/disponibilidad", label: "Disponibilidad", icon: "disponibilidad" },
        { href: "/medico/chat", label: "Mensajes", icon: "mensajes" },
        { href: "/medico/recetas", label: "Recetas", icon: "recetas" },
        { href: "/medico/pagos", label: "Actividad", icon: "pagos" },
        { href: "/medico/cuenta", label: "Mi cuenta", icon: "cuenta" },
      ]}
    >
      {children}
    </PortalShell>
  )
}
