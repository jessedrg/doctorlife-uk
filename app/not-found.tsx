import Link from "next/link";
import { QuizProvider } from "@/components/quiz-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowRight } from "lucide-react";

const suggestions = [
  { label: "Cómo funciona el tratamiento", href: "/#product" },
  { label: "Planes y precios", href: "/#planes" },
  { label: "Blog médico", href: "/blog" },
  { label: "Nuestros médicos", href: "/autores" },
  { label: "Calculadora de IMC", href: "/herramientas/calculadora-imc" },
];

export default function NotFound() {
  return (
    <QuizProvider>
      <div className="overflow-x-clip bg-paper">
        <Navbar />
        <main className="mx-auto flex min-h-[70vh] max-w-[820px] flex-col items-center justify-center px-5 py-20 text-center">
          <span className="font-mono text-[13px] font-semibold uppercase tracking-[.18em] text-olive">
            Error 404
          </span>
          <h1 className="mt-4 text-balance text-[clamp(30px,5vw,52px)] font-light leading-[1.05] tracking-[-.03em] text-ink">
            No hemos encontrado esta página
          </h1>
          <p className="mt-4 max-w-[46ch] text-pretty text-[16px] leading-relaxed text-ink-soft">
            Puede que el enlace haya cambiado o que la página ya no exista. Te
            dejamos algunos accesos útiles para seguir.
          </p>

          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[15px] font-semibold text-paper no-underline transition-colors hover:bg-olive"
            >
              Volver al inicio
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {suggestions.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="inline-flex items-center gap-1.5 rounded-full border border-ink/12 bg-paper px-4 py-2 text-[14px] font-medium text-ink-soft no-underline transition-colors hover:border-olive hover:text-ink"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </main>
        <Footer />
      </div>
    </QuizProvider>
  );
}
