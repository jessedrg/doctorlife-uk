import { Reveal } from "./reveal";
import { QuizTrigger } from "./quiz-trigger";
import { WegovyPenCard } from "./wegovy-pen-card";

export function Transformation() {
  return (
    <section id="transform" className="mx-auto max-w-none scroll-mt-[90px] px-3 pt-24 sm:px-4 lg:px-5">

      {/* Mobile: no grey background — just the heading and cards */}
      {/* Desktop: full grey background with grain and gradient */}
      <div className="lg:hidden">
        {/* Heading */}
        <Reveal className="text-center">
          <div className="text-[13px] uppercase tracking-[.16em] text-ink-mute">Real change</div>
          <h2 className="mt-[10px] text-[clamp(34px,4.8vw,62px)] font-light leading-none tracking-[-.02em] text-ink text-balance">
            A change that lasts,
            <br />
            on <span className="font-serif italic">your</span> terms
          </h2>
          <div className="mt-[26px] flex flex-wrap justify-center gap-3">
            <QuizTrigger className="rounded-full bg-ink px-[30px] py-[13px] text-[15px] font-medium text-paper">
              Get started
            </QuizTrigger>
            <QuizTrigger className="rounded-full border border-ink/30 bg-transparent px-[30px] py-[13px] text-[15px] font-medium text-ink">
              Check if I'm eligible
            </QuizTrigger>
          </div>
        </Reveal>

        {/* Cards en mobile — solo WegovyPenCard y Daniel, sin las verdes */}
        <div className="mt-8 flex flex-col gap-4">
          <WegovyPenCard />

          {/* Card Daniel */}
          <Reveal>
            <div
              className="flex flex-col justify-between rounded-[26px] border border-paper/15 p-7 text-paper"
              style={{ background: "linear-gradient(165deg,#7d8a9a 0%,#4f5b63 40%,#2c3439 100%)" }}
            >
              <div className="mb-6 overflow-hidden rounded-[20px]">
                <img
                  src="/testimonials/daniel.png"
                  alt="Daniel, DoctorLife patient"
                  className="h-[240px] w-full object-cover object-[center_20%]"
                />
              </div>
              <div className="font-serif text-[clamp(20px,5vw,28px)] font-normal italic leading-[1.3]">
                &ldquo;For the first time the weight came off and{" "}
                <span className="text-sage">stayed off</span>. DoctorLife felt like
                real care, not a transaction.&rdquo;
              </div>
              <div className="mt-6 flex items-center gap-4">
                <img
                  src="/testimonials/daniel.png"
                  alt="Daniel"
                  className="h-[52px] w-[52px] rounded-full object-cover object-[center_20%]"
                />
                <div>
                  <div className="text-base font-medium">Daniel, 38</div>
                  <div className="text-[13px] text-paper/60">9 months · Semaglutide + blood tests</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <p className="mt-6 text-center text-[11.5px] text-ink-mute">
          This testimonial reflects one patient's experience. Individual results
          vary. Always consult your doctor.
        </p>
      </div>

      {/* Desktop: fondo gris con grain — solo WegovyPenCard y Daniel */}
      <Reveal className="grain relative hidden min-h-[680px] overflow-hidden rounded-[40px] p-[54px] text-paper lg:block">
        <div className="absolute inset-0" style={{ background: "linear-gradient(165deg,#7d8a9a 0%,#4f5b63 40%,#2c3439 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(70% 60% at 30% 12%,rgba(246,240,230,.42),transparent 55%),radial-gradient(80% 70% at 90% 95%,rgba(40,48,52,.6),transparent 60%)" }} />

        <div className="relative z-[2] text-center">
          <div className="text-[13px] uppercase tracking-[.16em] text-paper/70">Real change</div>
          <h2 className="mt-[10px] text-[clamp(34px,4.8vw,62px)] font-light leading-none tracking-[-.02em] text-balance">
            A change that lasts,
            <br />
            on <span className="font-serif italic">your</span> terms
          </h2>
          <div className="mt-[26px] flex justify-center gap-3">
            <QuizTrigger className="rounded-full bg-warm px-[30px] py-[13px] text-[15px] font-medium text-ink">
              Get started
            </QuizTrigger>
            <QuizTrigger className="rounded-full border border-paper/40 px-[30px] py-[13px] text-[15px] font-medium text-paper" style={{ background: "rgba(246,240,230,.12)" }}>
              Check if I'm eligible
            </QuizTrigger>
          </div>
        </div>

        {/* Solo WegovyPenCard y Daniel — sin las dos cards verdes */}
        <div className="relative z-[2] mt-[46px] grid grid-cols-[1.2fr_1fr] gap-[18px]">
          <WegovyPenCard />

          <div className="flex flex-col justify-between rounded-[26px] border border-paper/15 p-[34px] backdrop-blur-md" style={{ background: "rgba(30,36,40,.42)" }}>
            <div className="mb-7 overflow-hidden rounded-[20px]" style={{ background: "linear-gradient(160deg,#5f6a3e,#2c3439)" }}>
              <img
                src="/testimonials/daniel.png"
                alt="Daniel, DoctorLife patient"
                className="h-[260px] w-full object-cover object-[center_20%] lg:h-[340px] 2xl:h-[400px]"
              />
            </div>
            <div className="font-serif text-[clamp(22px,2.4vw,30px)] font-normal italic leading-[1.3]">
              &ldquo;For the first time the weight came off and{" "}
              <span className="text-sage">stayed off</span>. DoctorLife felt like
              real care, not a transaction.&rdquo;
            </div>
            <div className="mt-[26px] flex items-center gap-4">
              <img
                src="/testimonials/daniel.png"
                alt="Daniel"
                className="h-[60px] w-[60px] rounded-full object-cover object-[center_20%]"
              />
              <div>
                  <div className="text-base font-medium">Daniel, 38</div>
                  <div className="text-[13.5px] text-paper/60">9 months · Semaglutide + blood tests</div>
                </div>
              </div>
              <div className="mt-[22px] flex gap-[7px]">
              <span className="h-[5px] w-6 rounded-[9px] bg-sage" />
              <span className="h-[5px] w-2 rounded-[9px] bg-paper/30" />
              <span className="h-[5px] w-2 rounded-[9px] bg-paper/30" />
            </div>
          </div>
        </div>

        <p className="relative z-[2] mt-[26px] text-center text-[11.5px] text-paper/50">
          This testimonial reflects one patient's experience. Individual results
          vary. Always consult your doctor.
        </p>
      </Reveal>
    </section>
  );
}
