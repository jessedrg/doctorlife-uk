export function Hero() {
  return (
    <section id="top" className="mx-auto mt-5 max-w-[1180px] scroll-mt-[100px] px-[18px]">
      <div className="relative min-h-[760px] overflow-hidden rounded-[36px]">
        {/* base brand color block */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(155deg,#6b774a 0%,#5f6a3e 45%,#454d2e 100%)" }}
        />

        {/* PLACEHOLDER — foto de personas (sustituir luego) */}
        <div className="absolute inset-y-0 right-0 w-full md:w-[64%]">
          <div className="flex h-full w-full items-center justify-center bg-olive/30">
            <div className="flex flex-col items-center gap-3 text-paper/70">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-paper/50 text-3xl font-light">
                +
              </div>
              <span className="text-sm font-medium tracking-wide">Foto de personas</span>
            </div>
          </div>
          {/* color overlay para fundir la foto con el bloque */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(95deg,#5f6a3e 0%,rgba(95,106,62,.65) 30%,rgba(95,106,62,.15) 60%,transparent 100%)" }}
          />
        </div>

        {/* contenido */}
        <div className="relative z-[2] flex min-h-[760px] items-center px-5 py-16 sm:px-10">
          <div className="max-w-[600px]">
            <div className="text-[13px] font-semibold uppercase tracking-[.18em] text-sage">
              Tu clínica 100% digital
            </div>
            <h1 className="mt-6 text-balance text-[clamp(38px,5.6vw,72px)] font-light leading-[1.02] tracking-[-.03em] text-paper">
              El tratamiento médico para la{" "}
              <span className="font-serif italic text-sage">pérdida de peso</span>, adaptado a tu realidad
            </h1>
            <p className="mt-7 max-w-[36ch] text-balance text-[clamp(17px,1.6vw,21px)] font-light leading-[1.5] text-paper/80">
              Cuidado dirigido por médicos, diseñado en torno a tu cuerpo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
