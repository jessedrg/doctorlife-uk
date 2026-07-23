"use client";

import { QuizTrigger } from "./quiz-trigger";

export function MobileFollowup() {
  return (
    <section className="relative mx-auto max-w-none px-3 py-10 sm:px-4 lg:px-5">
      <div
        className="relative overflow-hidden rounded-[28px] p-6 sm:p-8 lg:min-h-[440px] lg:flex lg:items-center xl:min-h-[500px]"
        style={{
          background:
            "radial-gradient(120% 80% at 60% 110%, #33291c 0%, #1d160f 52%, #120c07 100%)",
          boxShadow: "0 0 80px 60px #f6f0e6",
        }}
      >
        {/* image stuck to the left/bottom edge of the card, no frame */}
        <img
          src="/doctor-mobile.webp"
          alt="DoctorLife doctor on a mobile video call"
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-full w-auto max-w-[45%] object-contain object-bottom sm:max-w-[38%]"
        />
        {/* fades to blend the image into the background */}
        <div aria-hidden className="absolute inset-y-0 left-0 w-[46%] pointer-events-none sm:w-[39%]"
          style={{ background: "linear-gradient(to right, transparent 55%, #1d160f 95%)" }} />
        <div aria-hidden className="absolute bottom-0 left-0 w-[46%] h-1/4 pointer-events-none sm:w-[39%]"
          style={{ background: "linear-gradient(to bottom, transparent, #120c07)" }} />
        <div aria-hidden className="absolute top-0 left-0 w-[46%] h-1/4 pointer-events-none sm:w-[39%]"
          style={{ background: "linear-gradient(to top, transparent, #1d160f)" }} />

        {/* copy shifted to the right */}
        <div className="relative flex w-full flex-col gap-3 pl-[42%] text-paper sm:pl-[36%]">
          <span className="inline-block w-fit rounded-full border border-amber/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-amber">
            100% digital
          </span>
          <h2 className="m-0 text-[clamp(20px,2.6vw,36px)] font-light leading-[1.05] tracking-[-0.03em]">
            Medical follow-up{" "}
            <span className="font-serif italic text-sage">from your phone</span>
          </h2>
          <p className="max-w-[36ch] text-sm leading-relaxed text-paper/60">
            Your doctor is with you at every stage — no waiting rooms.
          </p>
          <QuizTrigger className="mt-2 w-fit rounded-full bg-paper px-6 py-2.5 text-sm font-medium text-[#1d160f] transition-opacity hover:opacity-85">
            Start now
          </QuizTrigger>
        </div>
      </div>
    </section>
  );
}
