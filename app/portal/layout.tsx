import { requireRole } from "@/lib/session"
import { PortalShell } from "@/components/portal-shell"

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole("patient")
  return (
    <PortalShell
      user={user}
      badge="Paciente"
      homeHref="/portal"
      nav={[
        { href: "/portal", label: "Inicio", icon: "home" },
        { href: "/portal/reservar", label: "Reservar cita", icon: "reservar" },
        { href: "/portal/citas", label: "Mis citas", icon: "citas" },
        { href: "/portal/progreso", label: "Mi progreso", icon: "progreso" },
        { href: "/portal/chat", label: "Chat", icon: "mensajes" },
        { href: "/portal/recetas", label: "Recetas", icon: "recetas" },
        { href: "/portal/cuenta", label: "Mi cuenta", icon: "cuenta" },
      ]}
    >
      {children}
    </PortalShell>
  )
}
