export function Hero() {
  return (
    <section
      id="top"
      className="mx-auto mt-5 max-w-none scroll-mt-[100px] px-3 sm:px-4 lg:px-5"
    >
      <div
        className="relative overflow-hidden rounded-[36px]"
        style={{ height: "calc(100svh - 38px - 100px - 20px)" }}
      >
        {/* base brand color block */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(155deg,#6b774a 0%,#5f6a3e 45%,#454d2e 100%)" }}
        />

        {/* foto principal */}
        <div className="absolute inset-y-0 right-0 w-full md:w-[62%] lg:w-[58%] xl:w-[55%] 2xl:w-[52%]">
          <img
            src="/hero/woman.png"
            alt="Paciente de DoctorLife sonriendo"
            className="h-full w-full object-cover"
            style={{ objectPosition: "65% top" }}
          />
          {/* color overlay para fundir la foto con el bloque */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(95deg,#5f6a3e 0%,rgba(95,106,62,.45) 20%,rgba(95,106,62,.06) 45%,transparent 70%)" }}
          />
        </div>

        {/* contenido */}
        <div className="relative z-[2] flex h-full items-center px-5 py-16 sm:px-10 lg:px-14 2xl:px-20">
          <div className="max-w-[600px] 2xl:max-w-[720px]">
            <div className="text-[13px] font-semibold uppercase tracking-[.18em] text-sage 2xl:text-[15px]">
              Tu plataforma médica 100% online
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
