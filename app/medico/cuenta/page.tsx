import { requireRole } from "@/lib/session"
import { ChangePasswordForm } from "@/components/change-password-form"
import { GoogleCalendarConnect } from "@/components/google-calendar-connect"
import { getGoogleConnectionStatus } from "@/app/actions/google-connection"

export const metadata = { title: "Mi cuenta — DoctorLife" }

export default async function MedicoAccountPage() {
  const user = await requireRole("doctor")
  const googleStatus = await getGoogleConnectionStatus()

  return (
    <div>
      <h1 className="text-[30px] font-light leading-tight tracking-[-.02em] text-ink text-balance">
        Mi cuenta
      </h1>
      <p className="mt-1.5 max-w-[60ch] text-[15.5px] leading-relaxed text-ink-soft">
        Tu usuario es <span className="font-medium text-ink">{user.email}</span>. Aquí puedes
        conectar tu calendario y cambiar tu contraseña.
      </p>

      <div className="mt-7">
        <h2 className="text-[18px] font-medium text-ink">Videollamadas</h2>
        <div className="mt-4">
          <GoogleCalendarConnect status={googleStatus} />
        </div>
      </div>

      <div className="mt-9">
        <h2 className="text-[18px] font-medium text-ink">Cambiar contraseña</h2>
        <div className="mt-4">
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  )
}
