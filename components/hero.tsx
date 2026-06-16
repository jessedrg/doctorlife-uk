export function Hero() {
  return (
    <section id="top" className="mx-auto mt-5 max-w-none scroll-mt-[100px] px-3 sm:px-4 lg:px-5">
      <div className="relative min-h-[640px] overflow-hidden rounded-[36px] lg:min-h-[720px] 2xl:min-h-[820px]">
        {/* base brand color block */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(155deg,#6b774a 0%,#5f6a3e 45%,#454d2e 100%)" }}
        />

        {/* foto principal */}
        <div className="absolute inset-y-0 right-0 w-full md:w-[64%]">
          <img
            src="/hero/woman.png"
            alt="Paciente de Maren sonriendo"
            className="h-full w-full object-cover object-top"
          />
          {/* color overlay para fundir la foto con el bloque */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(95deg,#5f6a3e 0%,rgba(95,106,62,.65) 30%,rgba(95,106,62,.15) 60%,transparent 100%)" }}
          />
        </div>

        {/* contenido */}
        <div className="relative z-[2] flex min-h-[640px] items-center px-5 py-16 sm:px-10 lg:min-h-[720px] lg:px-14 2xl:min-h-[820px] 2xl:px-20">
          <div className="max-w-[600px] 2xl:max-w-[720px]">
            <div className="text-[13px] font-semibold uppercase tracking-[.18em] text-sage 2xl:text-[15px]">
              Tu clínica 100% online
            </div>
            <h1 className="mt-6 text-balance text-[clamp(38px,5vw,84px)] font-light leading-[1.02] tracking-[-.03em] text-paper">
              El tratamiento médico para la{" "}
              <span className="font-serif italic text-sage">pérdida de peso</span>, adaptado a tu realidad
            </h1>
            <p className="mt-7 max-w-[40ch] text-balance text-[clamp(17px,1.4vw,24px)] font-light leading-[1.5] text-paper/80">
              Cuidado dirigido por médicos, diseñado en torno a tu cuerpo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
