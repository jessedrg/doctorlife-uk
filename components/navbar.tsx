import { QuizTrigger } from "./quiz-trigger";

const links = [
  { label: "Weight", href: "#product" },
  { label: "Hormones", href: "#transform" },
  { label: "Labs", href: "#labs" },
  { label: "Care team", href: "#experts" },
  { label: "How it works", href: "#cta" },
];

export function Navbar() {
  return (
    <nav className="sticky top-0 z-[90] border-b border-ink/[.07] backdrop-blur-md" style={{ background: "rgba(246,240,230,.74)" }}>
      <div className="mx-auto flex h-[74px] max-w-[1280px] items-center justify-between px-[30px]">
        <a href="#top" className="font-serif text-[34px] leading-none tracking-[-.01em] text-ink no-underline">
          maren
        </a>
        <div className="hidden items-center gap-[26px] whitespace-nowrap text-[15.5px] md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-ink no-underline opacity-[.78] transition-opacity hover:opacity-100">
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button type="button" className="whitespace-nowrap rounded-full border border-ink/15 bg-warm px-[22px] py-[10px] text-[15px] font-medium text-ink">
            Log in
          </button>
          <QuizTrigger className="whitespace-nowrap rounded-full bg-ink px-[22px] py-[11px] text-[15px] font-medium text-paper">
            Get started
          </QuizTrigger>
        </div>
      </div>
    </nav>
  );
}
