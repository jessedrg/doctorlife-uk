import Link from "next/link"
import { BrandLogo } from "./brand-logo"
import { SignOutButton } from "./sign-out-button"

type NavItem = { href: string; label: string }

export function PortalShell({
  user,
  nav,
  badge,
  children,
}: {
  user: { name: string; email: string }
  nav: NavItem[]
  badge: string
  children: React.ReactNode
}) {
  return (
    <div className="min-h-svh bg-paper">
      <header className="sticky top-0 z-20 border-b border-ink/10 bg-paper/85 backdrop-blur">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
          <div className="flex items-center gap-3">
            <Link href="/">
              <BrandLogo markSize={26} textSize={18} />
            </Link>
            <span className="hidden rounded-full bg-sage/30 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[.08em] text-ink sm:inline">
              {badge}
            </span>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3.5 py-2 text-[14px] font-medium text-ink-soft transition-colors hover:bg-warm hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden text-right text-[12.5px] leading-tight text-ink-soft sm:block">
              {user.name}
              <br />
              <span className="text-ink-mute">{user.email}</span>
            </span>
            <SignOutButton />
          </div>
        </div>

        {/* Mobile nav */}
        <nav className="flex items-center gap-1 overflow-x-auto border-t border-ink/10 px-3 py-2 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-full px-3 py-1.5 text-[13.5px] font-medium text-ink-soft transition-colors hover:bg-warm hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-[1180px] px-5 py-7 sm:px-8 sm:py-10">{children}</main>
    </div>
  )
}
