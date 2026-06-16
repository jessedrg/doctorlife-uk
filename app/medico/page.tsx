import { requireRole } from "@/lib/session"
import { getMyDoctorProfile } from "@/app/actions/doctor"
import { getDoctorReadiness } from "@/lib/doctor/readiness"
import { DoctorOnboardingChecklist } from "@/components/doctor-onboarding-checklist"

export const metadata = { title: "Panel del médico — DoctorLife" }

export default async function MedicoHome() {
  const user = await requireRole("doctor")
  // Asegura que exista el perfil antes de calcular el estado de preparación.
  await getMyDoctorProfile()
  const readiness = await getDoctorReadiness(user.id)
  const firstName = user.name.split(" ")[0]

  return (
    <div>
      <h1 className="text-[30px] font-light leading-tight tracking-[-.02em] text-ink text-balance">
        Dr. {firstName}
      </h1>
      <p className="mt-1.5 max-w-[60ch] text-[15.5px] leading-relaxed text-ink-soft">
        Gestiona tu disponibilidad, tus pacientes, recetas y pagos desde aquí.
      </p>

      <div className="mt-7">
        <DoctorOnboardingChecklist readiness={readiness} />
      </div>
    </div>
  )
}
