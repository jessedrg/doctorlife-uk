import { Reveal } from "./reveal";
import { Parallax } from "./parallax";

export function Labs() {
  return (
    <section id="labs" className="mx-auto max-w-[1280px] scroll-mt-[90px] px-[30px] pt-6">
      <Reveal className="relative overflow-hidden rounded-[40px] px-[54px] py-16 text-[#e9ecf2]" >
        <div className="absolute inset-0" style={{ background: "radial-gradient(110% 90% at 20% 0%,#243042 0%,#171f2c 55%,#0e131c 100%)" }} />
        <div className="absolute -right-[5%] -top-[20%] h-[90%] w-1/2" style={{ background: "radial-gradient(closest-side,rgba(95,179,163,.22),transparent)", filter: "blur(10px)" }} />

        <div className="relative z-[2] mb-2 text-center">
          <div className="text-[13px] uppercase tracking-[.16em] text-teal">analíticas maren</div>
          <h2 className="mt-[10px] text-[clamp(34px,4.8vw,62px)] font-light leading-none tracking-[-.02em]">
            Mide lo que tu cuerpo
            <br />
            te lleva <span className="font-serif italic text-teal-light">tiempo diciendo</span>
          </h2>
        </div>

        {/* floating dashboard */}
        <Parallax speed={30} className="relative mx-auto mt-[30px] h-[460px] max-w-[880px]">
          {/* phone mockup placeholder — sustituir por imagen de la app en una mano */}
          <div className="anim-floatA absolute left-1/2 top-1/2 z-[3] flex h-[420px] w-[210px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[38px] border-2 border-dashed border-teal/40 text-center" style={{ background: "rgba(20,28,40,.55)" }}>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-teal/40 text-teal text-2xl font-light">＋</div>
            <div className="px-6 text-[13px] font-medium leading-snug text-[#cdd6e2]">
              Mockup de la app
            </div>
            <div className="mt-1 px-6 text-[11.5px] leading-snug text-[#9aa6b6]">
              Móvil en una mano
            </div>
          </div>

          <div className="anim-floatA absolute left-0 top-[30px] w-[240px] rounded-[18px] border border-[#e9ecf2]/[.12] p-[18px] backdrop-blur-md" style={{ background: "rgba(20,28,40,.7)" }}>
            <div className="text-xs text-[#9aa6b6]">Índice de salud</div>
            <div className="mt-3 flex items-center gap-4">
              <div className="flex h-[84px] w-[84px] items-center justify-center rounded-full" style={{ background: "conic-gradient(#5fb3a3 0% 72%,rgba(233,236,242,.12) 72% 100%)" }}>
                <div className="flex h-[62px] w-[62px] items-center justify-center rounded-full text-2xl font-light" style={{ background: "#141c28" }}>66</div>
              </div>
              <div className="text-[12.5px] leading-[1.7]">
                <div><span className="text-teal">●</span> Óptimo · 66</div>
                <div><span className="text-amber-light">●</span> En rango · 3</div>
                <div><span style={{ color: "#d98a8a" }}>●</span> Fuera · 6</div>
              </div>
            </div>
          </div>

          <div className="anim-floatC absolute right-0 top-0 w-[280px] rounded-[18px] border border-[#e9ecf2]/[.12] p-5 backdrop-blur-md" style={{ background: "rgba(20,28,40,.7)" }}>
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#9aa6b6]">Edad biológica</span>
              <span className="text-[11px] text-teal">−3 años</span>
            </div>
            <div className="my-[6px] text-[54px] font-light">41</div>
            <div className="mt-[6px] flex h-[46px] items-end gap-[5px]">
              {[40, 62, 48, 80, 58, 70, 90].map((h, i) => (
                <span key={i} className="flex-1 rounded-[3px]" style={{ height: `${h}%`, background: i === 3 ? "#7fcebe" : i === 4 ? "#e3b582" : "#5fb3a3" }} />
              ))}
            </div>
          </div>

          <div className="anim-floatA absolute bottom-0 left-1/2 w-[160px] -translate-x-1/2 rounded-[16px] border border-[#e9ecf2]/[.12] p-4 backdrop-blur-md" style={{ background: "rgba(20,28,40,.78)", animationDelay: ".5s" }}>
            <div className="text-[11.5px] text-[#9aa6b6]">Salud cardiovascular</div>
            <div className="mt-2 flex justify-between text-[13px]"><span>LDL</span><span className="text-teal">Óptimo</span></div>
            <div className="mt-[5px] flex justify-between text-[13px]"><span>ApoB</span><span className="text-amber-light">En rango</span></div>
          </div>
        </Parallax>

        <div className="relative z-[2] mt-[30px] grid grid-cols-1 gap-[18px] md:grid-cols-2">
          <div className="rounded-[26px] border border-[#e9ecf2]/10 p-9" style={{ background: "rgba(20,28,40,.5)" }}>
            <div className="text-[26px] font-light leading-[1.1]">
              Descubre tu <span className="font-serif italic text-teal-light">punto de partida</span>
            </div>
            <p className="mt-3 max-w-[34ch] text-[15px] leading-relaxed text-[#9aa6b6]">
              Una imagen clara de tu salud con una sola analítica en casa —
              más de 130 biomarcadores, revisados por médicos.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Hormonas", "Metabolismo", "Tiroides", "Corazón", "Inmunidad"].map((c) => (
                <span key={c} className="rounded-full border border-[#e9ecf2]/20 px-[14px] py-[7px] text-[13px]">{c}</span>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-[26px] border border-[#e9ecf2]/10 p-9" style={{ background: "linear-gradient(150deg,rgba(95,179,163,.18),rgba(20,28,40,.5))" }}>
            <div>
              <div className="text-[26px] font-light leading-[1.1]">
                Planifica tu <span className="font-serif italic text-teal-light">avance</span>
              </div>
              <p className="mt-3 max-w-[32ch] text-[15px] leading-relaxed text-[#9aa6b6]">
                Convierte tus resultados en un plan de acción desarrollado por
                médicos — con seguimiento en la app de Maren.
              </p>
            </div>
            <button type="button" className="mt-6 self-start rounded-full bg-teal px-7 py-[13px] text-[15px] font-semibold text-slate-deep">
              Ver el plan
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
