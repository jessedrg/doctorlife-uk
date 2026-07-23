import type { Metadata } from "next";
import { QuizProvider } from "@/components/quiz-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SITE_URL } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Política de privacidad — DoctorLife",
  description:
    "Cómo trata DoctorLife (HI DOCTOR AI SL) tus datos personales y de salud conforme al RGPD y la LOPDGDD.",
  alternates: { canonical: `${SITE_URL}/privacy` },
};

type Section = {
  title: string;
  body?: string;
  bullets?: string[];
};

const sections: Section[] = [
  {
    title: "Responsable del tratamiento",
    body: "HI DOCTOR AI SL — hello@hi-doctor.ai. Tratamos tus datos conforme al Reglamento (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).",
  },
  {
    title: "Delegado de Protección de Datos",
    body: "Puedes contactar con nuestro Delegado de Protección de Datos (DPO) en dpo@hi-doctor.ai para cualquier cuestión relativa al tratamiento de tus datos personales o de salud.",
  },
  {
    title: "Qué datos tratamos",
    bullets: [
      "Datos identificativos: nombre, correo, teléfono.",
      "Datos de salud facilitados en el cuestionario.",
      "Datos de pago (procesados por nuestro proveedor de pago certificado).",
    ],
  },
  {
    title: "Finalidad",
    bullets: [
      "Prestar la consulta médica y emitir, si procede, una prescripción.",
      "Comunicaciones operativas (email, chat privado de la plataforma).",
      "Cumplir obligaciones legales.",
    ],
  },
  {
    title: "Legitimación",
    body: "Consentimiento expreso (art. 6.1.a RGPD), ejecución del contrato (6.1.b) y cumplimiento de obligación legal (6.1.c). Para los datos de salud, art. 9.2.h RGPD — tratamiento por profesionales sanitarios.",
  },
  {
    title: "Conservación",
    body: "Conservamos los datos mientras mantengas tu cuenta, y hasta cinco años tras la última consulta por obligaciones médico-legales (AEMPS).",
  },
  {
    title: "Destinatarios",
    body: "Tus datos no se comunican a terceros con fines comerciales. Los encargados del tratamiento (hosting en la UE, envío de correo, proveedor de pago certificado PCI DSS) firman contratos de encargo conforme al art. 28 RGPD.",
  },
  {
    title: "Transferencias internacionales",
    body: "Por defecto, tus datos se alojan en servidores ubicados en la Unión Europea. Cuando puntualmente se recurre a un proveedor fuera del EEE, se aplican las garantías adecuadas previstas en el capítulo V RGPD (Cláusulas Contractuales Tipo aprobadas por la Comisión Europea).",
  },
  {
    title: "Medidas de seguridad",
    body: "Aplicamos las medidas técnicas y organizativas previstas en el art. 32 RGPD: cifrado en tránsito y en reposo, control de acceso basado en roles, registro de auditoría, copias de seguridad cifradas, formación continua del personal y procedimientos de respuesta ante incidentes.",
  },
  {
    title: "Derechos",
    bullets: [
      "Acceso, rectificación, supresión, oposición, limitación, portabilidad.",
      "Retirar el consentimiento en cualquier momento.",
      "Reclamar ante la Agencia Española de Protección de Datos (aepd.es).",
    ],
  },
];

export default function PrivacidadPage() {
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
              Política de <span className="font-serif italic text-olive">privacidad</span>
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

            <section>
              <h2 className="text-[20px] font-medium tracking-[-.01em] text-ink sm:text-[22px]">
                Ejercicio de derechos
              </h2>
              <p className="mt-3 text-pretty text-[16px] leading-relaxed text-ink-soft">
                Ejercita tus derechos escribiendo a{" "}
                <a href="mailto:hello@hi-doctor.ai" className="text-olive underline">
                  hello@hi-doctor.ai
                </a>
                . Respondemos en un plazo máximo de 30 días.
              </p>
            </section>
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
