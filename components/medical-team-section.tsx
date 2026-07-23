import Image from "next/image"

export function MedicalTeamSection({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "bg-cream" : "bg-paper"} aria-labelledby="medical-team-heading">
      <div className="mx-auto max-w-[1000px] px-5 py-16 sm:py-20">
        <div className="grid items-center gap-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-12">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[380px] overflow-hidden rounded-[28px] bg-cream-2">
            <Image
              src="/images/miguel-guirola.jpeg"
              alt="Dr Miguel A. Guirola, obesity specialist at DoctorLife"
              fill
              sizes="(max-width: 768px) 90vw, 380px"
              className="object-cover object-[50%_35%]"
            />
          </div>

          <div>
            <span className="text-[13px] font-semibold uppercase tracking-[.16em] text-olive">
              Our medical team
            </span>
            <h2
              id="medical-team-heading"
              className="mt-3 text-balance text-[clamp(26px,3.6vw,40px)] font-light leading-[1.1] tracking-[-0.03em] text-ink"
            >
              Our obesity specialist doctor
            </h2>
            <p className="mt-5 text-[20px] font-medium text-ink">Dr Miguel A. Guirola</p>
            <p className="mt-1 text-[15px] text-ink-soft">
              Obesity specialist doctor · DoctorLife doctor
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
