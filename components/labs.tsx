import { Reveal } from "./reveal";

export function Labs() {
  return (
    <section id="labs" className="mx-auto max-w-none scroll-mt-[90px] px-3 pt-6 sm:px-4 lg:px-5">
      <Reveal className="relative overflow-hidden rounded-[40px] px-[54px] py-16 text-[#e9ecf2]" >
        <div className="absolute inset-0" style={{ background: "radial-gradient(110% 90% at 20% 0%,#243042 0%,#171f2c 55%,#0e131c 100%)" }} />
        <div className="absolute -right-[5%] -top-[20%] h-[90%] w-1/2" style={{ background: "radial-gradient(closest-side,rgba(95,179,163,.22),transparent)", filter: "blur(10px)" }} />

        <div className="relative z-[2] mb-2 text-center">
          <div className="text-[13px] uppercase tracking-[.16em] text-teal">doctorlife blood tests</div>
          <h2 className="mt-[10px] text-[clamp(34px,4.8vw,62px)] font-light leading-none tracking-[-.02em]">
            Measure what your body
            <br />
            has been <span className="font-serif italic text-teal-light">trying to tell you</span>
          </h2>
        </div>

        {/* phone mockup placeholder — replace with app image held in a hand */}
        <div className="relative z-[2] mx-auto mt-[30px] flex justify-center">
          <div className="flex h-[460px] w-[230px] flex-col items-center justify-center rounded-[38px] border-2 border-dashed border-teal/40 text-center" style={{ background: "rgba(20,28,40,.55)" }}>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-teal/40 text-teal text-2xl font-light">＋</div>
            <div className="px-6 text-[13px] font-medium leading-snug text-[#cdd6e2]">
              App mockup
            </div>
            <div className="mt-1 px-6 text-[11.5px] leading-snug text-[#9aa6b6]">
              Phone in hand
            </div>
          </div>
        </div>

        <div className="relative z-[2] mt-[30px] grid grid-cols-1 gap-[18px] md:grid-cols-2">
          <div className="rounded-[26px] border border-[#e9ecf2]/10 p-9" style={{ background: "rgba(20,28,40,.5)" }}>
            <div className="text-[26px] font-light leading-[1.1]">
              Discover your <span className="font-serif italic text-teal-light">starting point</span>
            </div>
            <p className="mt-3 max-w-[34ch] text-[15px] leading-relaxed text-[#9aa6b6]">
              A clear picture of your health from a single at-home blood test —
              over 130 biomarkers, reviewed by doctors.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Hormones", "Metabolism", "Thyroid", "Heart", "Immunity"].map((c) => (
                <span key={c} className="rounded-full border border-[#e9ecf2]/20 px-[14px] py-[7px] text-[13px]">{c}</span>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-[26px] border border-[#e9ecf2]/10 p-9" style={{ background: "linear-gradient(150deg,rgba(95,179,163,.18),rgba(20,28,40,.5))" }}>
            <div>
              <div className="text-[26px] font-light leading-[1.1]">
                Plan your <span className="font-serif italic text-teal-light">progress</span>
              </div>
              <p className="mt-3 max-w-[32ch] text-[15px] leading-relaxed text-[#9aa6b6]">
                Turn your results into an action plan developed by doctors —
                with tracking in the DoctorLife app.
              </p>
            </div>
            <button type="button" className="mt-6 self-start rounded-full bg-teal px-7 py-[13px] text-[15px] font-semibold text-slate-deep">
              View the plan
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
