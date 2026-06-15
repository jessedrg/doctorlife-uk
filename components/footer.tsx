import { footerColumns } from "@/lib/data";

export function Footer() {
  return (
    <footer className="mt-[100px] bg-cream pb-10 pt-[72px]">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-10 px-[30px] md:grid-cols-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
        <div className="col-span-2 md:col-span-3 lg:col-span-1">
          <div className="max-w-[280px] rounded-[26px] bg-paper p-7">
            <div className="text-[22px] font-light leading-[1.1]">
              Cuidado integral.
              <br />
              En tu bolsillo.
            </div>
            <div className="mt-5 flex items-center gap-4">
              <div
                className="h-[62px] w-[62px] rounded-[12px] border-4 border-paper"
                style={{
                  background:
                    "repeating-conic-gradient(#221d17 0% 25%,#f6f0e6 0% 50%) 0 0/14px 14px",
                  boxShadow: "0 0 0 1px #ddd0bb",
                }}
              />
              <div className="text-[13px] leading-[1.4] text-ink-mute">
                Escanea para descargar
                <br />
                en iOS y Android
              </div>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            {["f", "in", "ig"].map((s) => (
              <span key={s} className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-ink text-[15px] text-paper">
                {s}
              </span>
            ))}
          </div>
        </div>

        {footerColumns.map((col) => (
          <div key={col.title}>
            <div className="mb-4 text-xs uppercase tracking-[.14em] text-clay">{col.title}</div>
            <div className="flex flex-col gap-[11px] text-[15px] text-ink-soft">
              {col.links.map((l) => (
                <a key={l} href="#top" className="text-inherit no-underline hover:text-ink">
                  {l}
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
