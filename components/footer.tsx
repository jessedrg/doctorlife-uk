import { footerColumns } from "@/lib/data";

export function Footer() {
  return (
    <footer className="mt-[100px] bg-cream pb-10 pt-[72px]">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-10 px-[30px] md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <a href="/#top" className="font-serif text-[30px] leading-none tracking-[-.01em] text-ink no-underline">
            maren
          </a>
          <p className="mt-4 max-w-[260px] text-[15px] leading-relaxed text-ink-soft">
            Cuidado del peso dirigido por médicos colegiados, con seguimiento real y tratamiento GLP‑1 supervisado.
          </p>
          <div className="mt-6 flex gap-3">
            {["f", "in", "ig"].map((s) => (
              <a
                key={s}
                href="/#top"
                aria-label={`Maren en ${s}`}
                className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-ink text-[15px] text-paper no-underline"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {footerColumns.map((col) => (
          <div key={col.title}>
            <div className="mb-4 text-xs uppercase tracking-[.14em] text-clay">{col.title}</div>
            <div className="flex flex-col gap-[11px] text-[15px] text-ink-soft">
              {col.links.map((l) => (
                <a key={l.label} href={l.href} className="text-inherit no-underline hover:text-ink">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 flex max-w-[1280px] flex-wrap justify-between gap-3 border-t border-ink/10 px-[30px] pt-6 text-[12.5px] text-ink-mute">
        <span>© 2026 Maren Health, Inc. Todos los derechos reservados. Marca ficticia creada con fines de diseño.</span>
        <span>Términos · Privacidad · Datos de salud · Consentimiento de telemedicina</span>
      </div>
    </footer>
  );
}
