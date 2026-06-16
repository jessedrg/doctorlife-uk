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
        { href: "/portal/cita", label: "Mi cita" },
        { href: "/portal/chat", label: "Chat" },
        { href: "/portal/recetas", label: "Recetas" },
      ]}
    >
      {children}
    </PortalShell>
  )
}
