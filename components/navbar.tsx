import { QuizTrigger } from "./quiz-trigger";

const links = [
  { label: "Cómo funciona", href: "#product" },
  { label: "Equipo clínico", href: "#transform" },
  { label: "Precios", href: "#cta" },
  { label: "Sobre nosotros", href: "#cta" },
];

export function Navbar() {
  return (
    <nav className="sticky top-4 z-[90] mx-auto w-full max-w-[1180px] px-[18px]">
      <div
        className="flex h-[68px] items-center justify-between gap-4 rounded-full border border-ink/10 pl-7 pr-[10px] shadow-[0_12px_40px_-12px_rgba(34,29,23,.28)] backdrop-blur-xl"
        style={{ background: "rgba(246,240,230,.82)" }}
      >
        <a href="#top" className="font-serif text-[26px] leading-none tracking-[-.01em] text-ink no-underline">
          maren
        </a>
        <div className="hidden items-center gap-[28px] whitespace-nowrap text-[15px] font-medium md:flex">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="text-ink no-underline opacity-80 transition-opacity hover:opacity-100">
              {l.label}
            </a>
          ))}
        </div>
        <QuizTrigger className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-ink px-[22px] py-[13px] text-[15px] font-medium text-paper">
          Comenzar
          <span className="text-[13px]">↗</span>
        </QuizTrigger>
      </div>
    </nav>
  );
}
