import { requireRole } from "@/lib/session"
import { PortalShell } from "@/components/portal-shell"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole("admin")
  return (
    <PortalShell
      user={user}
      badge="Admin"
      nav={[
        { href: "/admin", label: "Inicio" },
        { href: "/admin/medicos", label: "Médicos" },
        { href: "/admin/pacientes", label: "Pacientes" },
        { href: "/admin/leads", label: "Leads" },
      ]}
    >
      {children}
    </PortalShell>
  )
}
