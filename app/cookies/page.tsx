import type { Metadata } from "next";
import { QuizProvider } from "@/components/quiz-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SITE_URL } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Política de cookies — DoctorLife",
  description:
    "Qué cookies usa DoctorLife (técnicas, analíticas y de marketing), su duración y cómo gestionar tu consentimiento.",
  alternates: { canonical: `${SITE_URL}/cookies` },
};

type Section = {
  title: string;
  body?: string;
  bullets?: string[];
};

const sections: Section[] = [
  {
    title: "Qué son las cookies",
    body: "Pequeños archivos que se almacenan en tu navegador para recordar tus preferencias y medir el uso del sitio.",
  },
  {
    title: "Qué cookies usamos",
    bullets: [
      "Técnicas — imprescindibles para el funcionamiento del sitio (por ejemplo, recordar tu idioma). No requieren consentimiento.",
      "Analíticas — nos ayudan a entender qué funciona y qué no. Solo con tu consentimiento.",
      "Marketing — exclusivamente si aceptas. Nunca compartimos datos médicos con redes publicitarias.",
    ],
  },
  {
    title: "Duración",
    body: "Las cookies técnicas caducan al cerrar la sesión o, en su caso, al cabo de 12 meses. Las analíticas se retienen un máximo de 14 meses. Las de marketing, si aceptas, se retienen un máximo de 13 meses y se eliminan si revocas tu consentimiento.",
  },
  {
    title: "Gestión",
    body: "Puedes cambiar tu elección en cualquier momento desde el banner de cookies o desde la configuración del navegador.",
  },
];

export default function CookiesPage() {
  return (
    <QuizProvider>
      <div className="overflow-x-clip bg-paper">
        <Navbar />
        <main className="mx-auto max-w-[820px] px-5 pb-10 pt-10 sm:px-8">
          <header className="py-12 sm:py-16">
            <span className="text-[13px] font-semibold uppercase tracking-[.18em] text-clay">
              Legal
            </span>
            <h1 className="mt-4 text-balance text-[clamp(32px,5vw,54px)] font-light leading-[1.05] tracking-[-.02em] text-ink">
              Política de <span className="font-serif italic text-olive">cookies</span>
            </h1>
            <p className="mt-5 max-w-[58ch] text-pretty text-[16px] leading-relaxed text-ink-soft">
              Te explicamos qué cookies utilizamos, para qué sirven y cómo puedes
              gestionar tu consentimiento en cualquier momento.
            </p>
          </header>

          <div className="flex flex-col gap-10">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="text-[20px] font-medium tracking-[-.01em] text-ink sm:text-[22px]">
                  {s.title}
                </h2>
                {s.body ? (
                  <p className="mt-3 text-pretty text-[16px] leading-relaxed text-ink-soft">
                    {s.body}
                  </p>
                ) : null}
                {s.bullets ? (
                  <ul className="mt-4 flex flex-col gap-3">
                    {s.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-3 text-[16px] leading-relaxed text-ink-soft"
                      >
                        <span className="mt-[9px] h-[6px] w-[6px] flex-shrink-0 rounded-full bg-olive" />
                        {b}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <aside className="mt-14 rounded-[24px] border border-ink/10 bg-sage/15 p-8">
            <span className="text-[12px] font-semibold uppercase tracking-[.16em] text-clay">
              ¿Necesitas más información?
            </span>
            <h2 className="mt-3 text-[clamp(22px,3vw,30px)] font-light leading-[1.1] tracking-[-.02em] text-ink">
              Hablamos contigo.
            </h2>
            <p className="mt-3 max-w-[52ch] text-pretty text-[16px] leading-relaxed text-ink-soft">
              Si un apartado de este documento no queda claro, o quieres ejercer algún
              derecho, nuestro equipo de privacidad y legal responde directamente.
            </p>
            <a
              href="mailto:hello@hi-doctor.ai"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-[12px] text-[15px] font-semibold text-paper no-underline"
            >
              Contactar con el equipo
              <span className="text-[13px]">↗</span>
            </a>
          </aside>
        </main>
        <Footer />
      </div>
    </QuizProvider>
  );
}
