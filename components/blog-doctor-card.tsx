import Image from "next/image"

/**
 * Editorial "Meet our doctor" card for the pSEO blog articles.
 * Briefly introduces Dr Miguel A. Guirola, reinforcing E-E-A-T and reader
 * trust. Designed for the article width (~760px).
 */
export function BlogDoctorCard() {
  return (
    <aside className="mt-14 overflow-hidden rounded-[24px] border border-ink/10 bg-warm">
      <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
        <div className="relative mx-auto h-[150px] w-[150px] flex-shrink-0 overflow-hidden rounded-[20px] bg-cream-2 sm:mx-0">
          <Image
            src="/images/miguel-guirola.jpeg"
            alt="Dr Miguel A. Guirola, obesity specialist at DoctorLife"
            fill
            sizes="150px"
            className="object-cover object-[50%_30%]"
          />
        </div>
        <div className="text-center sm:text-left">
          <span className="text-[12.5px] font-semibold uppercase tracking-[.14em] text-olive">
            Meet our doctor
          </span>
          <p className="mt-2 text-[20px] font-medium leading-tight text-ink">
            Dr Miguel A. Guirola
          </p>
          <p className="mt-1 text-[14.5px] text-ink-soft">
            Obesity specialist doctor · DoctorLife doctor
          </p>
          <p className="mt-3 text-[15px] leading-[1.6] text-ink-soft">
            At DoctorLife your treatment is assessed and supervised by our obesity specialist
            doctor, who supports you throughout your follow-up.
          </p>
        </div>
      </div>
    </aside>
  )
}
