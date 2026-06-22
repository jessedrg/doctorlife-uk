import { requireRole } from "@/lib/session"
import { getMyProgress, getSharedNotes } from "@/app/actions/progress"
import { ProgressTracker } from "@/components/progress-tracker"

export const metadata = { title: "Mi progreso — DoctorLife" }

export default async function ProgresoPage() {
  await requireRole("patient")
  const [entries, sharedNotes] = await Promise.all([getMyProgress(), getSharedNotes()])

  return (
    <div>
      <h1 className="text-[30px] font-light leading-tight tracking-[-.02em] text-ink text-balance">
        Mi progreso
      </h1>
      <p className="mt-1.5 max-w-[60ch] text-[15.5px] leading-relaxed text-ink-soft">
        Registra tu peso, tu dosis y cómo te sientes a lo largo del tratamiento. Tu equipo médico
        verá esta información para ajustar tu plan, y aquí leerás las notas que compartan contigo.
      </p>

      <div className="mt-7">
        <ProgressTracker initialEntries={entries} sharedNotes={sharedNotes} />
      </div>
    </div>
  )
}
