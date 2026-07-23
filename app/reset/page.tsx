import { ResetPasswordForm } from "@/components/reset-password-form"

export const metadata = { title: "Set new password — DoctorLife" }

export default async function RestablecerPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; error?: string }>
}) {
  const sp = await searchParams
  return <ResetPasswordForm token={sp.token ?? null} tokenError={sp.error ?? null} />
}
