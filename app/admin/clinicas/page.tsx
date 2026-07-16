import { requireRole } from "@/lib/session"
import { listClinicsWithStatus } from "@/app/actions/admin"
import { AdminDoctorToggle } from "@/components/admin-doctor-toggle"
import { AdminDoctorDevToggle } from "@/components/admin-doctor-dev-toggle"
import { AdminCreateDoctor } from "@/components/admin-create-doctor"
import { AdminClinicStatus } from "@/components/admin-clinic-status"
import { AdminDeleteClinic } from "@/components/admin-delete-clinic"

export const metadata = { title: "Clínicas — DoctorLife" }

export default async function AdminClinicsPage() {
  await requireRole("admin")
  const clinics = await listClinicsWithStatus()
  const activeCount = clinics.filter((c) => c.fullyActive).length

  return (
    <div>
      <h1 className="text-[30px] font-light leading-tight tracking-[-.02em] text-ink text-balance">
        Clínicas ({clinics.length})
      </h1>
      <p className="mt-1.5 max-w-[60ch] text-[15.5px] leading-relaxed text-ink-soft">
        Invita a las clínicas de la plataforma y sigue su progreso de activación y la
        disponibilidad que han marcado. {activeCount} de {clinics.length} activas.
      </p>

      <div className="mt-6 max-w-[680px]">
        <AdminCreateDoctor />
      </div>

      {clinics.length === 0 ? (
        <div className="mt-6 rounded-[18px] border border-ink/10 bg-warm px-4 py-6 text-center text-ink-mute">
          Aún no hay clínicas. Invita la primera con el formulario de arriba.
        </div>
      ) : (
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {clinics.map((c) => (
            <div key={c.id} className="rounded-[18px] border border-ink/10 bg-warm p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[15.5px] font-medium text-ink">{c.name}</div>
                  <div className="text-[13px] text-ink-soft">{c.email}</div>
                  <div className="mt-0.5 text-[13px] text-ink-soft">{c.specialty ?? "Sin especialidad"}</div>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[12px] font-semibold ${
                    c.chargesEnabled ? "bg-sage/30 text-ink" : "bg-ink/10 text-ink-soft"
                  }`}
                >
                  {c.chargesEnabled ? "Cobros activos" : c.stripeOnboarded ? "En revisión" : "Sin conectar"}
                </span>
              </div>

              <div className="mt-4 border-t border-ink/10 pt-4">
                <AdminClinicStatus clinic={c} />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ink/10 pt-4">
                <label className="flex items-center gap-2 text-[13px] text-ink-soft">
                  <span>Acepta pacientes</span>
                  <AdminDoctorToggle doctorId={c.id} initial={c.acceptingPatients} />
                </label>
                <label className="flex items-center gap-2 text-[13px] text-ink-soft">
                  <span>Entorno de pruebas</span>
                  <AdminDoctorDevToggle doctorId={c.id} initial={c.isDevOnly} />
                </label>
                <div className="ml-auto">
                  <AdminDeleteClinic doctorId={c.id} clinicName={c.name} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
