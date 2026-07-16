import Image from "next/image"
import Link from "next/link"
import { BadgeCheck, BookOpenCheck, Stethoscope } from "lucide-react"

export function MedicalTeamSection({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "bg-cream" : "bg-paper"} aria-labelledby="medical-team-heading">
      <div className="mx-auto max-w-[1100px] px-5 py-16 sm:py-20">
        <div className="grid items-center gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-12">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[430px] overflow-hidden rounded-[28px] bg-cream-2">
            <Image
              src="/images/miguel-guirola.jpeg"
              alt="Dr. Miguel A. Guirola, médico especialista en obesidad de DoctorLife"
              fill
              sizes="(max-width: 768px) 90vw, 430px"
              className="object-cover object-[50%_35%]"
              priority={false}
            />
          </div>

          <div>
            <span className="text-[13px] font-semibold uppercase tracking-[.16em] text-olive">
              Nuestro equipo médico
            </span>
            <h2
              id="medical-team-heading"
              className="mt-3 text-balance text-[clamp(28px,4vw,44px)] font-light leading-[1.08] tracking-[-0.03em] text-ink"
            >
              Un médico real detrás de cada decisión clínica
            </h2>
            <p className="mt-5 text-[20px] font-medium text-ink">Dr. Miguel A. Guirola</p>
            <p className="mt-1 text-[15px] text-ink-soft">
              Médico especialista en obesidad · Médico de DoctorLife
            </p>
            <p className="mt-5 max-w-[58ch] text-pretty text-[16.5px] leading-relaxed text-ink-soft">
              Miguel acompaña a pacientes que quieren abordar el peso desde la medicina, con una
              valoración individual y un seguimiento cercano. También escribe y revisa el contenido
              médico de DoctorLife para que la información sea clara, prudente y útil.
            </p>

            <ul className="mt-6 flex flex-col gap-3" aria-label="Funciones del Dr. Miguel A. Guirola">
              <li className="flex items-start gap-3 text-[15px] leading-relaxed text-ink-soft">
                <Stethoscope aria-hidden className="mt-0.5 size-5 shrink-0 text-olive" />
                Valoración y seguimiento médico del paciente.
              </li>
              <li className="flex items-start gap-3 text-[15px] leading-relaxed text-ink-soft">
                <BookOpenCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-olive" />
                Autor y revisor del contenido clínico de DoctorLife.
              </li>
              <li className="flex items-start gap-3 text-[15px] leading-relaxed text-ink-soft">
                <BadgeCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-olive" />
                Enfoque especializado en el tratamiento médico de la obesidad.
              </li>
            </ul>

            <Link
              href="/autores/miguel-a-guirola"
              className="mt-7 inline-flex min-h-11 items-center rounded-full bg-ink px-6 py-3 text-[14px] font-semibold text-paper no-underline transition-opacity hover:opacity-90"
            >
              Conocer a Miguel
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
