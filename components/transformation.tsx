import { Reveal } from "./reveal";
import { QuizTrigger } from "./quiz-trigger";

export function Transformation() {
  return (
    <section id="transform" className="mx-auto max-w-[1280px] scroll-mt-[90px] px-[30px] pt-24">
      <Reveal className="grain relative min-h-[680px] overflow-hidden rounded-[40px] p-[54px] text-paper" >
        <div className="absolute inset-0" style={{ background: "linear-gradient(165deg,#7d8a9a 0%,#4f5b63 40%,#2c3439 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(70% 60% at 30% 12%,rgba(246,240,230,.42),transparent 55%),radial-gradient(80% 70% at 90% 95%,rgba(40,48,52,.6),transparent 60%)" }} />

        <div className="relative z-[2] text-center">
          <div className="text-[13px] uppercase tracking-[.16em] text-paper/70">Real change</div>
          <h2 className="mt-[10px] text-[clamp(34px,4.8vw,62px)] font-light leading-none tracking-[-.02em]">
            Change that lasts,
            <br />
            on <span className="font-serif italic">your</span> terms
          </h2>
          <div className="mt-[26px] flex justify-center gap-3">
            <QuizTrigger className="rounded-full bg-warm px-[30px] py-[13px] text-[15px] font-medium text-ink">
              Get started
            </QuizTrigger>
            <QuizTrigger className="rounded-full border border-paper/40 px-[30px] py-[13px] text-[15px] font-medium text-paper" style={{ background: "rgba(246,240,230,.12)" }}>
              See if I&apos;m eligible
            </QuizTrigger>
          </div>
        </div>

        {/* overlay cards */}
        <div className="relative z-[2] mt-[46px] grid grid-cols-1 gap-[18px] lg:grid-cols-[1fr_1.2fr]">
          <div className="flex flex-col gap-[18px]">
            <div className="relative min-h-[200px] overflow-hidden rounded-[26px] border border-paper/15 p-7 backdrop-blur-md" style={{ background: "rgba(30,36,40,.42)" }}>
              <div className="max-w-[16ch] text-[23px] font-light leading-[1.16]">
                See results in 3–6 months with a plan built for you
              </div>
              <QuizTrigger className="absolute bottom-6 right-6 rounded-full border border-paper/30 px-[18px] py-[9px] text-[13.5px]" style={{ background: "rgba(246,240,230,.16)" }}>
                Get started
              </QuizTrigger>
              <div className="absolute bottom-6 left-6 h-16 w-16 rounded-full" style={{ background: "radial-gradient(60% 60% at 38% 32%,#cdd9a0,#9aa472 60%,#5f6a3e)", boxShadow: "0 14px 26px rgba(0,0,0,.35)" }} />
            </div>
            <div className="rounded-[26px] border border-paper/15 p-7 backdrop-blur-md" style={{ background: "rgba(30,36,40,.42)" }}>
              <div className="text-[13px] uppercase tracking-[.14em] text-paper/60">What&apos;s your goal?</div>
              <div className="mt-4 flex flex-col gap-[10px]">
                {["Lose weight steadily", "Balance my hormones", "All of the above"].map((g) => (
                  <QuizTrigger key={g} className="rounded-full border border-paper/20 px-[18px] py-3 text-left text-[14.5px] text-paper" style={{ background: "rgba(246,240,230,.1)" }}>
                    {g}
                  </QuizTrigger>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-[26px] border border-paper/15 p-[34px] backdrop-blur-md" style={{ background: "rgba(30,36,40,.42)" }}>
            <div className="font-serif text-[clamp(22px,2.4vw,30px)] font-normal italic leading-[1.3]">
              &ldquo;For the first time the weight came off and{" "}
              <span className="text-sage">stayed off</span>. Maren felt like care,
              not a transaction.&rdquo;
            </div>
            <div className="mt-[26px] flex items-center gap-4">
              <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full font-serif text-2xl" style={{ background: "linear-gradient(140deg,#c98a4f,#7a4a2b)" }}>
                H
              </div>
              <div>
                <div className="text-base font-medium">Hannah, 41</div>
                <div className="text-[13.5px] text-paper/60">9 months · Semaglutide + labs</div>
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
          Testimonial reflects one member&apos;s experience. Individual results
          vary. Compounded products are not FDA‑approved.
        </p>
      </Reveal>
    </section>
  );
}
