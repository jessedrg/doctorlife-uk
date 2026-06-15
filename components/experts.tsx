import { Reveal } from "./reveal";
import { experts } from "@/lib/data";

export function Experts() {
  return (
    <section id="experts" className="mx-auto max-w-[1280px] scroll-mt-[90px] px-[30px] pb-10 pt-[104px] text-center">
      <Reveal>
        <h2 className="m-0 text-[clamp(34px,5vw,68px)] font-light leading-[.98] tracking-[-.025em]">
          The best care, by the
          <br />
          best in <span className="font-serif italic text-clay">medicine</span>
        </h2>
        <p className="mx-auto mt-[18px] max-w-[48ch] text-[17px] font-light text-ink-soft">
          A team of leading specialists with decades of combined experience
          across the things that move your health.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-[54px] grid grid-cols-2 gap-[18px] text-left sm:grid-cols-3 lg:grid-cols-5">
        {experts.map((e) => (
          <div key={e.name} className="overflow-hidden rounded-[24px] bg-cream">
            <div className="relative flex h-[150px] items-end justify-center" style={{ background: e.av }}>
              <div className="absolute left-4 top-4 font-serif text-[30px] text-white/55">{e.initials}</div>
              <div className="h-[74px] w-[74px] rounded-t-[50%]" style={{ background: "rgba(255,255,255,.22)" }} />
            </div>
            <div className="p-[18px]">
              <div className="text-base font-medium">{e.name}</div>
              <div className="mt-[3px] text-[13px] text-clay">{e.role}</div>
              <div className="mt-2 text-[13px] leading-[1.4] text-ink-mute">{e.spec}</div>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
