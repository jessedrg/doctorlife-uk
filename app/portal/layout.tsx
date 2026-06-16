import { requireRole } from "@/lib/session"
import { PortalShell } from "@/components/portal-shell"

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole("patient")
  return (
    <PortalShell
      user={user}
      badge="Paciente"
      nav={[
        { href: "/portal", label: "Inicio" },
        { href: "/portal/reservar", label: "Reservar cita" },
        { href: "/portal/citas", label: "Mis citas" },
        { href: "/portal/chat", label: "Chat" },
        { href: "/portal/recetas", label: "Recetas" },
      ]}
    >
      {children}
    </PortalShell>
  )
}
