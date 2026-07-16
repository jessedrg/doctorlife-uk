import type { Metadata } from "next";
import { QuizProvider } from "@/components/quiz-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SITE_URL } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Términos y condiciones — DoctorLife",
  description:
    "Condiciones de uso del servicio de consulta médica online de DoctorLife (HI DOCTOR AI SL): elegibilidad, precio, responsabilidad y ley aplicable.",
  alternates: { canonical: `${SITE_URL}/terminos` },
};

type Section = {
  title: string;
  body?: string;
  bullets?: string[];
};

const sections: Section[] = [
  {
    title: "1. Objeto",
    body: "DoctorLife es un servicio de consulta médica online. Un médico colegiado revisa tu cuestionario y decide si el tratamiento es adecuado para ti. En ningún caso prescribimos sin evaluación médica.",
  },
  {
    title: "2. Elegibilidad",
    body: "Debes ser mayor de 18 años y residir en la Unión Europea. En este momento, el cuestionario está optimizado para pacientes en España.",
  },
  {
    title: "3. Precio y pago",
    body: "La primera valoración es gratis, sin compromiso. Si el médico aprueba el tratamiento y decides continuar, eliges tu plan: suscripción mensual de 139 €/mes (sin permanencia y cancelable cuando quieras), pack de 5 meses por 449 € o nutricionista + GLP1 por 649 € (ambos pago único, 5 meses de acceso). Los servicios médicos están exentos de IVA.",
  },
  {
    title: "4. Limitaciones del servicio",
    body: "Este servicio no sustituye a la medicina de urgencias. Si tienes un problema de salud que requiere atención inmediata, contacta con el 112 o acude a urgencias.",
  },
  {
    title: "5. Responsabilidad",
    body: "DoctorLife es una plataforma tecnológica de intermediación que conecta pacientes con médicos colegiados independientes. DoctorLife no presta servicios médicos ni emite diagnósticos. El médico que atiende tu caso actúa exclusivamente bajo su propio criterio profesional y es el único responsable del acto médico. La relación contractual del acto médico se establece directamente entre el paciente y el médico, no con DoctorLife.",
  },
  {
    title: "6. Propiedad intelectual",
    body: "Los contenidos de doctorlife.io (textos, imágenes, código) son propiedad de HI DOCTOR AI SL salvo que se indique otra cosa.",
  },
  {
    title: "7. Derecho de desistimiento",
    body: "Como servicio de consulta médica, la prestación comienza inmediatamente con tu consentimiento expreso al iniciar el cuestionario clínico. Por ello, y conforme al art. 103.a) del RDL 1/2007 (TRLGDCU), una vez iniciada la revisión médica decae el derecho de desistimiento. Si el médico declina el tratamiento, te devolvemos el importe íntegro en un plazo de 48 horas.",
  },
  {
    title: "8. Ley aplicable",
    body: "Estas condiciones se rigen por la legislación española. Los conflictos se resolverán en los juzgados de Madrid, salvo que la ley designe un fuero diferente.",
  },
  {
    title: "9. Resolución de disputas en línea",
    body: "Conforme al Reglamento (UE) 524/2013, si eres consumidor tienes acceso a la plataforma europea de resolución de litigios en línea disponible en ec.europa.eu/consumers/odr. Antes de acudir a ella, te pedimos que nos contactes en hello@hi-doctor.ai para intentar resolver el asunto directamente.",
  },
];

export default function TerminosPage() {
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
              Términos y <span className="font-serif italic text-olive">condiciones</span>
            </h1>
            <p className="mt-5 max-w-[58ch] text-pretty text-[16px] leading-relaxed text-ink-soft">
              La versión en español de este documento es el texto legal de referencia.
              La traducción al inglés se facilita únicamente por comodidad.
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
