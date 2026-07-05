import Image from "next/image";
import {
  ShieldCheck,
  Stethoscope,
  ClipboardList,
  MessageSquareText,
  Clock,
  Lock,
  BadgeCheck,
  FileCheck2,
  Check,
  Star,
} from "lucide-react";
import { QuizProvider } from "@/components/quiz-context";
import { QuizTrigger } from "@/components/quiz-trigger";
import { BrandLogo } from "@/components/brand-logo";
import { Navbar } from "@/components/navbar";
import { TrustBox } from "@/components/trustbox";
import { SITE_URL, BRAND } from "@/lib/articles";

export type ClinicConfig = {
  /** Ruta canónica, p. ej. "/consulta-medica-online" */
  path: string;
  /** Prefijo para los eventos de analítica, p. ej. "ads-clinica" */
  planPrefix: string;
};

const heroPoints = [
  { icon: Stethoscope, label: "Valoración con un médico colegiado en España" },
  { icon: ClipboardList, label: "Tratamiento GLP-1 personalizado, si el médico lo considera adecuado" },
  { icon: MessageSquareText, label: "Seguimiento médico de tu evolución por mensajes" },
];

const packIncludes = [
  "Valoración médica con un médico colegiado en España",
  "Estudio integral personalizado: IMC, edad metabólica y estilo de vida",
  "Tratamiento GLP-1 adaptado a tu caso, si el médico lo considera adecuado",
  "Plan nutricional y seguimiento médico de tu evolución",
];

const steps = [
  {
    icon: ClipboardList,
    title: "Rellena el cuestionario médico",
    text: "Completas un cuestionario clínico sencillo sobre tu historia, hábitos y objetivos. Solo unos minutos.",
  },
  {
    icon: FileCheck2,
    title: "Un médico colegiado te valora",
    text: "Un médico colegiado revisa tu solicitud, emite un diagnóstico y, si procede, prescribe un tratamiento GLP-1 adecuado para tu caso.",
  },
  {
    icon: MessageSquareText,
    title: "Seguimiento por mensajes",
    text: "Escribes a tu médico como parte de la consulta ante cualquier duda, efecto o ajuste que necesites.",
  },
];

const trustBar = [
  { icon: Stethoscope, label: "Médicos colegiados (REPS)" },
  { icon: Clock, label: "Respuesta en menos de 3 h" },
  { icon: ShieldCheck, label: "Sin permanencia" },
  { icon: Lock, label: "Datos protegidos (RGPD)" },
];

const payments = [
  { src: "/payments/visa.svg", alt: "Visa" },
  { src: "/payments/mastercard.svg", alt: "Mastercard" },
  { src: "/payments/paypal.svg", alt: "PayPal" },
  { src: "/payments/apple-pay.svg", alt: "Apple Pay" },
  { src: "/payments/google-pay.svg", alt: "Google Pay" },
];

const FIRST_VISIT = "25 €";
const MONTHLY = "100 €/mes";

export function ClinicLanding({ config }: { config: ClinicConfig }) {
  const { path, planPrefix } = config;

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: BRAND,
    url: `${SITE_URL}${path}`,
    medicalSpecialty: "Endocrinology",
    description:
      "Servicio de telemedicina con médicos colegiados en España. Valoración médica online del control de peso basada en cuestionario, con diagnóstico y plan si procede.",
    areaServed: "ES",
    priceRange: "€€",
  };

  return (
    <QuizProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <div className="overflow-x-clip bg-paper">
        {/* ── Navegación del sitio ── */}
        <Navbar />

        <main>
          {/* ── Hero con oferta ── */}
          <section className="mx-auto mt-2 max-w-none px-3 sm:px-4 lg:px-5">
            <div className="relative w-full overflow-hidden rounded-[36px]">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(155deg,#6b774a 0%,#5f6a3e 45%,#454d2e 100%)",
                }}
              />

              <div className="relative z-[2] grid grid-cols-1 items-center gap-10 px-5 py-12 sm:px-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-12 lg:px-14 lg:py-14">
                <div className="max-w-[620px]">
                  <span className="inline-flex items-center gap-2 rounded-full bg-paper/12 px-3 py-1.5 text-[12.5px] font-semibold uppercase tracking-[.16em] text-sage backdrop-blur-sm">
                    <BadgeCheck aria-hidden className="h-4 w-4" />
                    Tratamiento GLP-1 con seguimiento médico
                  </span>
                  <h1 className="mt-5 text-balance text-[clamp(30px,4.8vw,56px)] font-light leading-[1.04] tracking-[-.03em] text-paper">
                    Adelgaza con tratamiento GLP-1 supervisado por médicos
                  </h1>
                  <p className="mt-4 max-w-[46ch] text-[16px] font-medium leading-relaxed text-paper/80">
                    Valoración con médicos colegiados en España y, si procede, un
                    tratamiento GLP-1 personalizado para tu control de peso. Sin
                    desplazamientos, sin esperas y sin permanencia.
                  </p>

                  <ul className="mt-7 flex flex-col gap-3">
                    {heroPoints.map(({ icon: Icon, label }) => (
                      <li
                        key={label}
                        className="flex items-start gap-3 text-[14.5px] leading-snug text-paper/85"
                      >
                        <Icon
                          aria-hidden
                          className="mt-0.5 h-[18px] w-[18px] flex-shrink-0 text-sage"
                        />
                        {label}
                      </li>
                    ))}
                  </ul>

                  {/* Precio */}
                  <div className="mt-8">
                    <span className="text-[13px] font-medium uppercase tracking-[.14em] text-sage">
                      Primera valoración médica
                    </span>
                    <div className="mt-1 flex flex-wrap items-end gap-x-3 gap-y-1">
                      <span className="text-[clamp(40px,6vw,58px)] font-semibold leading-none text-paper">
                        {FIRST_VISIT}
                      </span>
                      <span className="mb-1 text-[15px] font-medium text-paper/75">
                        y luego {MONTHLY} · sin permanencia
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <QuizTrigger
                      plan={planPrefix}
                      className="rounded-full bg-clay px-9 py-[16px] text-[16.5px] font-bold text-paper shadow-lg"
                    >
                      Solicitar mi valoración
                    </QuizTrigger>
                    <span className="text-[13.5px] text-paper/70">
                      Sin compromiso · en unos minutos
                    </span>
                  </div>

                  <div className="mt-7 max-w-[280px]">
                    <TrustBox theme="dark" alignment="left" />
                  </div>
                </div>

                <div className="relative mx-auto aspect-[4/3] w-full max-w-[440px] overflow-hidden rounded-[24px] shadow-2xl ring-1 ring-paper/15 lg:max-w-none">
                  <Image
                    src="/landing/consulta-online.png"
                    alt="Médica colegiada durante una consulta médica online"
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 45vw"
                    className="object-cover"
                    style={{ objectPosition: "60% center" }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ── Barra de confianza ── */}
          <section className="mx-auto max-w-[1100px] px-5 pt-10">
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {trustBar.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 rounded-[16px] border border-ink/10 bg-warm px-4 py-3.5"
                >
                  <Icon aria-hidden className="h-5 w-5 flex-shrink-0 text-olive" />
                  <span className="text-[13.5px] font-medium leading-tight text-ink">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Precio + ¿Qué incluye tu programa? ── */}
          <section
            aria-labelledby="programa"
            className="mx-auto max-w-[1100px] px-5 pt-20"
          >
            <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[1.1fr_.9fr]">
              {/* Qué incluye */}
              <div className="rounded-[28px] border border-ink/10 bg-warm p-8 sm:p-10">
                <span className="text-[13px] font-semibold uppercase tracking-[.16em] text-clay">
                  Tu programa
                </span>
                <h2
                  id="programa"
                  className="mt-3 text-balance text-[clamp(24px,3.2vw,36px)] font-light leading-[1.1] text-ink"
                >
                  ¿Qué incluye tu programa?
                </h2>
                <ul className="mt-7 flex flex-col gap-4">
                  {packIncludes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-sage/60">
                        <Check aria-hidden className="h-4 w-4 text-olive" />
                      </span>
                      <span className="text-[15.5px] leading-relaxed text-ink-soft">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tarjeta de precio */}
              <div className="flex flex-col justify-center rounded-[28px] bg-espresso p-8 text-center text-paper sm:p-10">
                <span className="text-[13px] font-semibold uppercase tracking-[.16em] text-sage">
                  Primera valoración médica
                </span>
                <div className="mt-4 flex items-end justify-center gap-2">
                  <span className="text-[clamp(48px,8vw,68px)] font-semibold leading-none text-paper">
                    {FIRST_VISIT}
                  </span>
                </div>
                <p className="mt-3 text-[14px] text-paper/70">
                  Después{" "}
                  <span className="font-semibold text-paper">{MONTHLY}</span> de
                  seguimiento médico · sin permanencia
                </p>

                <QuizTrigger
                  plan={`${planPrefix}-precio`}
                  className="mt-7 w-full rounded-full bg-clay px-8 py-[16px] text-[16.5px] font-bold text-paper shadow-lg"
                >
                  Solicitar mi valoración
                </QuizTrigger>

                <p className="mt-5 text-[13.5px] leading-relaxed text-paper/70">
                  Reserva tu plaza hoy y dispones de{" "}
                  <span className="font-semibold text-paper">3 meses</span> para
                  realizar tu valoración.
                </p>

                <div className="mt-6 flex items-center justify-center gap-1.5 text-sage">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} aria-hidden className="h-4 w-4 fill-current" />
                  ))}
                  <span className="ml-1.5 text-[13px] text-paper/70">
                    Valorado por miles de pacientes
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* ── ¿Cómo funciona? ── */}
          <section
            aria-labelledby="como-funciona"
            className="mx-auto max-w-[1100px] px-5 pt-20"
          >
            <div className="overflow-hidden rounded-[32px] bg-espresso px-6 py-12 text-paper sm:px-12">
              <span className="text-[13px] font-semibold uppercase tracking-[.16em] text-sage">
                ¿Cómo funciona?
              </span>
              <h2
                id="como-funciona"
                className="mt-3 max-w-[22ch] text-balance text-[clamp(24px,3.2vw,38px)] font-light leading-[1.12]"
              >
                Tres pasos para empezar tu programa
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
                {steps.map(({ icon: Icon, title, text }, i) => (
                  <div
                    key={title}
                    className="rounded-[24px] bg-paper/[.06] p-7 ring-1 ring-paper/10"
                  >
                    <span className="text-[13px] font-semibold text-sage">
                      0{i + 1}
                    </span>
                    <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-full bg-paper/10">
                      <Icon aria-hidden className="h-6 w-6 text-sage" />
                    </div>
                    <h3 className="mt-5 text-[19px] font-medium text-paper">
                      {title}
                    </h3>
                    <p className="mt-2.5 text-[14.5px] leading-relaxed text-paper/75">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <QuizTrigger
                  plan={`${planPrefix}-como`}
                  className="inline-block rounded-full bg-clay px-8 py-[15px] text-[16px] font-bold text-paper"
                >
                  Solicitar mi valoración
                </QuizTrigger>
              </div>
            </div>
          </section>

          {/* ── Opiniones + pago seguro ── */}
          <section className="mx-auto max-w-[1100px] px-5 pt-6">
            <div className="grid grid-cols-1 items-center gap-6 rounded-[32px] border border-ink/10 bg-warm p-8 sm:p-10 md:grid-cols-2">
              <div>
                <span className="text-[13px] font-semibold uppercase tracking-[.16em] text-clay">
                  Opiniones
                </span>
                <h2 className="mt-3 text-balance text-[clamp(22px,2.8vw,32px)] font-light leading-[1.12] text-ink">
                  Miles de pacientes ya confían en nuestros médicos
                </h2>
                <div className="mt-5 max-w-[300px]">
                  <TrustBox alignment="left" />
                </div>
              </div>
              <div className="rounded-[24px] bg-paper p-7 ring-1 ring-ink/10">
                <div className="flex items-center gap-2 text-olive">
                  <Lock aria-hidden className="h-5 w-5" />
                  <span className="text-[15px] font-semibold text-ink">
                    Pago seguro
                  </span>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-4">
                  {payments.map(({ src, alt }) => (
                    <span key={alt} className="relative block h-7 w-12">
                      <Image
                        src={src}
                        alt={alt}
                        fill
                        sizes="48px"
                        className="object-contain"
                      />
                    </span>
                  ))}
                </div>
                <p className="mt-6 text-[13.5px] leading-relaxed text-ink-mute">
                  Tus pagos y tus datos de salud se tratan de forma cifrada y
                  conforme al RGPD y la LOPDGDD.
                </p>
              </div>
            </div>
          </section>

          {/* ── CTA final ── */}
          <section
            aria-labelledby="cta-final"
            className="mx-auto max-w-[1100px] px-5 py-16"
          >
            <div className="overflow-hidden rounded-[32px] bg-espresso px-6 py-14 text-center text-paper sm:px-12">
              <h2
                id="cta-final"
                className="mx-auto max-w-[20ch] text-balance text-[clamp(26px,3.4vw,40px)] font-light leading-[1.1]"
              >
                Empieza hoy tu tratamiento GLP-1 supervisado
              </h2>
              <div className="mt-5 flex flex-wrap items-end justify-center gap-x-3 gap-y-1">
                <span className="text-[clamp(36px,6vw,52px)] font-semibold leading-none text-paper">
                  {FIRST_VISIT}
                </span>
                <span className="mb-1 text-[15px] font-medium text-paper/75">
                  y luego {MONTHLY} · sin permanencia
                </span>
              </div>
              <QuizTrigger
                plan={`${planPrefix}-final`}
                className="mt-7 inline-block rounded-full bg-clay px-9 py-[16px] text-[16.5px] font-bold text-paper"
              >
                Solicitar mi valoración
              </QuizTrigger>
              <p className="mx-auto mt-4 max-w-[52ch] text-[14px] leading-relaxed text-paper/70">
                Reserva tu plaza hoy · Sin permanencia · Médicos colegiados en
                España
              </p>
            </div>

            <p className="mx-auto mt-8 max-w-[70ch] text-center text-[12.5px] leading-relaxed text-ink-mute">
              Servicio de telemedicina prestado por médicos colegiados en España.
              La indicación de cualquier tratamiento depende siempre de una
              valoración médica individual. Este servicio no garantiza resultados
              concretos y no sustituye la atención presencial cuando sea necesaria.
              Tratamos tus datos conforme al RGPD y la LOPDGDD.
            </p>
          </section>
        </main>

        {/* ── Footer legal mínimo ── */}
        <footer className="border-t border-ink/10 bg-warm">
          <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-4 px-5 py-10 text-center">
            <BrandLogo markSize={24} textSize={19} />
            <p className="max-w-[52ch] text-[13.5px] leading-relaxed text-ink-mute">
              Plataforma de telemedicina que conecta a pacientes con médicos
              colegiados en España para una atención rápida, segura y cercana.
            </p>
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-ink-soft">
              <a href="/aviso-legal" className="hover:text-ink">
                Aviso legal
              </a>
              <a href="/privacidad" className="hover:text-ink">
                Política de privacidad
              </a>
              <a href="/contacto" className="hover:text-ink">
                Contacto
              </a>
            </nav>
            <span className="text-[12.5px] text-ink-mute">
              © {new Date().getFullYear()} {BRAND}. Todos los derechos reservados.
            </span>
          </div>
        </footer>
      </div>
    </QuizProvider>
  );
}
