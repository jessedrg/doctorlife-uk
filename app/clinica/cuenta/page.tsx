import { requireRole } from "@/lib/session"
import { ChangePasswordForm } from "@/components/change-password-form"
import { DoctorProfileForm } from "@/components/doctor-profile-form"
import { GoogleCalendarConnect } from "@/components/google-calendar-connect"
import { AccountStatus, AvailabilitySummary, type AccountStep } from "@/components/account-status"
import { getGoogleConnectionStatus } from "@/app/actions/google-connection"
import { getMyDoctorProfileWithImage } from "@/app/actions/doctor"
import { getMyAvailability } from "@/app/actions/availability"
import { missingClinicFields } from "@/lib/clinic"

const CLINIC_FIELD_LABELS: Record<string, string> = {
  clinicName: "Nombre de la clínica",
  taxId: "CIF/NIF",
  addressLine: "Dirección",
  city: "Ciudad",
  postalCode: "Código postal",
  province: "Provincia",
  healthRegistryNumber: "Nº registro sanitario",
  medicalDirectorName: "Director médico",
  medicalDirectorLicense: "Nº colegiado del director",
  billingEmail: "Email de facturación",
  dataProtectionContact: "Contacto de protección de datos",
}

export const metadata = { title: "Mi cuenta — DoctorLife" }

function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-[22px] border border-ink/10 bg-cream p-6 sm:p-7">
      <h2 className="text-[18px] font-medium text-ink">{title}</h2>
      {description && (
        <p className="mt-1 max-w-[60ch] text-[14px] leading-relaxed text-ink-soft">{description}</p>
      )}
      <div className="mt-5">{children}</div>
    </section>
  )
}

export default async function MedicoAccountPage() {
  await requireRole("doctor")
  const [profile, googleStatus, availability] = await Promise.all([
    getMyDoctorProfileWithImage(),
    getGoogleConnectionStatus(),
    getMyAvailability(),
  ])

  // --- Cálculo del estado de la cuenta ---
  const profileComplete = Boolean(
    profile.fullName?.trim() && profile.specialty?.trim() && profile.licenseNumber?.trim(),
  )
  const missingFiscal = missingClinicFields(profile)
  const fiscalComplete = missingFiscal.length === 0
  const stripeReady = Boolean(profile.stripeAccountId && profile.chargesEnabled)
  const availabilitySet = availability.rules.length > 0

  const steps: AccountStep[] = [
    {
      label: "Perfil profesional",
      detail: "Nombre, especialidad y número de colegiado visibles para tus pacientes.",
      done: profileComplete,
      missing: profileComplete
        ? undefined
        : [
            !profile.fullName?.trim() ? "Nombre" : null,
            !profile.specialty?.trim() ? "Especialidad" : null,
            !profile.licenseNumber?.trim() ? "Nº de colegiado" : null,
          ].filter(Boolean) as string[],
    },
    {
      label: "Datos fiscales y sanitarios",
      detail: "Datos de facturación y de centro sanitario, obligatorios para emitir facturas.",
      done: fiscalComplete,
      href: "/clinica/pagos",
      missing: missingFiscal.map((f) => CLINIC_FIELD_LABELS[f] ?? f),
    },
    {
      label: "Cobros con Stripe",
      detail: stripeReady
        ? "Stripe conectado y verificado: ya puedes recibir cobros."
        : "Conecta y verifica tu cuenta de Stripe para poder cobrar a tus pacientes.",
      done: stripeReady,
      href: "/clinica/pagos",
    },
    {
      label: "Disponibilidad",
      detail: "Marca tu horario semanal para que los pacientes puedan reservar cita.",
      done: availabilitySet,
      href: "/clinica/disponibilidad",
    },
    {
      label: "Videollamadas",
      detail: googleStatus.connected
        ? "Calendario conectado: los enlaces de videollamada se generan automáticamente."
        : "Conecta tu calendario de Google para generar enlaces de videollamada.",
      done: googleStatus.connected,
      optional: true,
    },
  ]

  return (
    <div>
      <h1 className="text-[30px] font-light leading-tight tracking-[-.02em] text-ink text-balance">
        Mi cuenta
      </h1>
      <p className="mt-1.5 max-w-[60ch] text-[15.5px] leading-relaxed text-ink-soft">
        Tu usuario es <span className="font-medium text-ink">{profile.email}</span>. Gestiona tu
        perfil público, calendario y contraseña.
      </p>

      <div className="mt-7 flex flex-col gap-5">
        <AccountStatus steps={steps} />

        <AvailabilitySummary
          rules={availability.rules}
          slotMinutes={availability.slotMinutes}
          timezone={availability.timezone}
        />

        <Section
          title="Perfil"
          description="Esta información y tu foto se muestran a tus pacientes, incluido el chat."
        >
          <DoctorProfileForm
            profile={{
              fullName: profile.fullName,
              specialty: profile.specialty,
              licenseNumber: profile.licenseNumber,
              bio: profile.bio,
              acceptingPatients: profile.acceptingPatients,
              maxPatients: profile.maxPatients,
              image: profile.image,
            }}
          />
        </Section>

        <Section title="Videollamadas" description="Conecta tu calendario para generar enlaces de videollamada.">
          <GoogleCalendarConnect status={googleStatus} />
        </Section>

        <Section title="Cambiar contraseña">
          <ChangePasswordForm />
        </Section>
      </div>
    </div>
  )
}
