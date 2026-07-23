import Link from "next/link"
import { provisionFromSession } from "@/app/actions/public-booking"
import { BrandLogo } from "@/components/brand-logo"
import { TrustpilotInvitation } from "@/components/trustpilot-invitation"

export const metadata = {
  title: "Welcome to DoctorLife",
  robots: { index: false },
}

export default async function BienvenidoPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; ref?: string; email?: string; name?: string }>
}) {
  const { session_id, ref, email: emailParam, name: nameParam } = await searchParams

  let email: string | null = null
  let name: string | null = null
  let referenceId: string | null = null
  let ok = false
  if (session_id) {
    // Paid flow (Stripe): we provision from the session.
    try {
      const res = await provisionFromSession(session_id)
      if (res) {
        email = res.email
        name = res.name
        referenceId = res.referenceId
        ok = true
      }
    } catch {
      ok = false
    }
  } else if (ref && emailParam) {
    // Free flow: the account and appointment were already created in startPublicCheckout.
    email = emailParam
    name = nameParam ?? null
    referenceId = ref
    ok = true
  }

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-warm px-5 py-16 text-ink">
      {ok && email && referenceId && (
        <TrustpilotInvitation email={email} name={name ?? undefined} referenceId={referenceId} />
      )}
      <div className="w-full max-w-[520px] rounded-[28px] border border-ink/10 bg-paper p-8 text-center shadow-[0_30px_70px_rgba(0,0,0,.12)] sm:p-10">
        <div className="mb-6 flex justify-center">
          <BrandLogo markSize={30} textSize={20} textClassName="text-ink" />
        </div>

        <div
          className="mx-auto flex h-[80px] w-[80px] items-center justify-center rounded-full text-[36px] text-white"
          style={{ background: "radial-gradient(60% 60% at 38% 32%,#cdd9a0,#9aa472 60%,#5f6a3e)" }}
          aria-hidden
        >
          ✓
        </div>

        <h1 className="mt-6 text-balance text-[28px] font-light leading-tight tracking-[-.02em]">
          {ok ? "Booking confirmed!" : "We're processing your booking"}
        </h1>

        <p className="mx-auto mt-3 max-w-[42ch] text-pretty text-[15.5px] leading-relaxed text-ink-soft">
          {ok ? (
            <>
              Your free first visit is booked. We&apos;ve sent your login details
              {email ? <> to <span className="font-medium text-ink">{email}</span></> : ""}. Check
              your email (including the spam folder) to access your dashboard.
            </>
          ) : (
            <>
              As soon as your booking is confirmed we&apos;ll email you your login details for the
              dashboard. If you&apos;ve already received them, you can sign in directly.
            </>
          )}
        </p>

        <div className="mt-8 flex flex-col items-center gap-3">
          <Link
            href="/sign-in"
            className="w-full rounded-full bg-ink py-3.5 text-[15px] font-semibold text-paper transition-opacity hover:opacity-90"
          >
            Go to sign in
          </Link>
          <Link href="/" className="text-sm text-ink-mute transition-colors hover:text-ink">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  )
}
