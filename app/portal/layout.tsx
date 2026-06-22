import { requireRole } from "@/lib/session"
import { PortalShell, type NavIcon } from "@/components/portal-shell"
import { hasPendingVerification } from "@/app/actions/verification"

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole("patient")
  const verificationPending = await hasPendingVerification(user.id)

  const nav: { href: string; label: string; icon: NavIcon }[] = [
    { href: "/portal", label: "Inicio", icon: "home" },
    { href: "/portal/reservar", label: "Reservar cita", icon: "reservar" },
    { href: "/portal/citas", label: "Mis citas", icon: "citas" },
    { href: "/portal/progreso", label: "Mi progreso", icon: "progreso" },
    { href: "/portal/chat", label: "Chat", icon: "mensajes" },
    { href: "/portal/recetas", label: "Recetas", icon: "recetas" },
    { href: "/portal/cuenta", label: "Mi cuenta", icon: "cuenta" },
  ]
  if (verificationPending) {
    nav.splice(1, 0, { href: "/portal/verificacion", label: "Verificación", icon: "verificacion" })
  }

  return (
    <PortalShell
      user={user}
      badge="Paciente"
      homeHref="/portal"
      nav={nav}
    >
      {children}
    </PortalShell>
  )
}
