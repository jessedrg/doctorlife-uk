import { redirect } from "next/navigation"
import { AuthForm } from "@/components/auth-form"
import { getSessionUser, homePathForRole } from "@/lib/session"

export const metadata = { title: "Crear cuenta — DoctorLife" }

export default async function SignUpPage() {
  const user = await getSessionUser()
  if (user) redirect(homePathForRole(user.role))
  return <AuthForm mode="sign-up" />
}
