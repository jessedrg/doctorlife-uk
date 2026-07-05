import Image from "next/image";
import {
  ShieldCheck,
  Stethoscope,
  ClipboardList,
  MessageSquareText,
  Clock,
  Lock,
  BadgeCheck,
  Scale,
  Activity,
  HeartPulse,
  FlaskConical,
  UserRound,
  FileCheck2,
} from "lucide-react";
import { QuizProvider } from "@/components/quiz-context";
import { QuizTrigger } from "@/components/quiz-trigger";
import { Navbar } from "@/components/navbar";
import { BrandLogo } from "@/components/brand-logo";
import { Experts } from "@/components/experts";
import { TrustBox } from "@/components/trustbox";
import { FooterColumns } from "@/components/footer-columns";
import { SITE_URL, BRAND } from "@/lib/articles";

export type ClinicConfig = {
  /** Ruta canónica, p. ej. "/consulta-medica-online" */
  path: string;
  /** Prefijo para los eventos de analítica, p. ej. "ads-clinica" */
  planPrefix: string;
};

const heroPoints = [
  { icon: Clock, label: "Respuesta de un médico colegiado en menos de 3 horas" },
  { icon: ClipboardList, label: "Consulta basada en un cuestionario médico seguro" },
  { icon: MessageSquareText, label: "Mensajes escritos con tu médico durante todo el proceso" },
];

const services = [
  {
    icon: Scale,
    title: "Control de peso",
    text: "Valoración clínica del sobrepeso y la obesidad con un plan personalizado y seguimiento médico continuo.",
  },
  {
    icon: HeartPulse,
    title: "Salud metabólica",
    text: "Revisión de tu metabolismo, azúcar y colesterol para prevenir y cuidar tu salud a largo plazo.",
  },
  {
    icon: Activity,
    title: "Salud hormonal y tiroides",
    text: "Evaluación de síntomas hormonales y de tiroides por especialistas en endocrinología.",
  },
  {
    icon: UserRound,
    title: "Salud femenina",
    text: "Acompañamiento en salud hormonal femenina con médicas colegiadas, de forma discreta y cercana.",
  },
  {
    icon: FlaskConical,
    title: "Analíticas y biomarcadores",
    text: "Interpretación de tus analíticas y recomendaciones personalizadas basadas en evidencia.",
  },
  {
    icon: Stethoscope,
    title: "Medicina general online",
    text: "Consulta médica general para resolver dudas y orientarte sobre los siguientes pasos.",
  },
];

const steps = [
  {
    icon: ClipboardList,
    title: "Rellena el cuestionario médico",
    text: "Completas un cuestionario clínico sencillo sobre tu historia, hábitos y objetivos. Solo unos minutos.",
  },
  {
    icon: FileCheck2,
    title: "Un médico colegiado te revisa",
    text: "Un médico colegiado valora tu solicitud, emite un diagnóstico y, si procede, recomienda un tratamiento adecuado para tu caso.",
  },
  {
    icon: MessageSquareText,
    title: "Seguimiento por mensajes",
    text: "Puedes escribir a tu médico como parte de la consulta ante cualquier duda, efecto secundario o ajuste que necesites.",
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

export function ClinicLanding({ config }: { config: ClinicConfig }) {
  const { path, planPrefix } = config;

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: BRAND,
    url: `${SITE_URL}${path}`,
    medicalSpecialty: "Endocrinology",
    description:
      "Servicio de telemedicina con médicos colegiados en España. Consulta médica online basada en cuestionario, con diagnóstico y tratamiento si procede.",
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
        <Navbar />

        <main>
          {/* ── Hero ── */}
          <section className="mx-auto mt-5 max-w-none px-3 sm:px-4 lg:px-5">
            <div className="relative w-full overflow-hidden rounded-[36px]">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(155deg,#6b774a 0%,#5f6a3e 45%,#454d2e 100%)",
                }}
              />

              <div className="relative z-[2] grid grid-cols-1 items-center gap-10 px-5 py-12 sm:px-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-12 lg:px-14 lg:py-16">
                <div className="max-w-[620px]">
                  <span className="inline-flex items-center gap-2 rounded-full bg-paper/12 px-3 py-1.5 text-[12.5px] font-semibold uppercase tracking-[.16em] text-sage backdrop-blur-sm">
                    <BadgeCheck aria-hidden className="h-4 w-4" />
                    Telemedicina en España
                  </span>
                  <h1 className="mt-5 text-balance text-[clamp(32px,5.2vw,62px)] font-light leading-[1.03] tracking-[-.03em] text-paper">
                    Tu médico online, estés donde estés
                  </h1>
                  <p className="mt-4 max-w-[46ch] text-[16px] font-medium leading-relaxed text-paper/80">
                    Consulta médica online con médicos colegiados en España, sin
                    esperas ni citas previas. Rellena un cuestionario y recibe una
                    valoración clínica personalizada.
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

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <QuizTrigger
                      plan={planPrefix}
                      className="rounded-full bg-sage px-8 py-[15px] text-[16px] font-semibold text-ink shadow-lg"
                    >
                      Empezar cuestionario médico
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

          {/* ── Conoce DoctorLife ── */}
          <section className="mx-auto max-w-[860px] px-5 pt-20 text-center">
            <span className="text-[13px] font-semibold uppercase tracking-[.16em] text-clay">
              Conoce DoctorLife
            </span>
            <h2 className="mx-auto mt-4 max-w-[24ch] text-balance text-[clamp(26px,3.6vw,42px)] font-light leading-[1.1] text-ink">
              Un servicio médico online, rápido y seguro
            </h2>
            <p className="mx-auto mt-5 max-w-[56ch] text-[16.5px] leading-relaxed text-ink-soft">
              DoctorLife te permite acceder a una valoración médica de forma
              rápida y sin desplazarte. Solo tienes que rellenar un breve
              cuestionario clínico y, si lo deseas, indicar tus preferencias. A
              continuación, un médico colegiado revisa tu solicitud y, si procede,
              emite un diagnóstico y te da recomendaciones de tratamiento.
            </p>
          </section>

          {/* ── Servicios disponibles ── */}
          <section
            aria-labelledby="servicios"
            className="mx-auto max-w-[1100px] px-5 pt-16"
          >
            <div className="flex flex-col gap-3 text-center">
              <span className="text-[13px] font-semibold uppercase tracking-[.16em] text-clay">
                Servicios disponibles
              </span>
              <h2
                id="servicios"
                className="mx-auto max-w-[22ch] text-balance text-[clamp(24px,3.2vw,38px)] font-light leading-[1.1] text-ink"
              >
                Cuidamos distintas áreas de tu salud
              </h2>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="rounded-[24px] border border-ink/10 bg-warm p-7"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sage/50">
                    <Icon aria-hidden className="h-6 w-6 text-olive" />
                  </div>
                  <h3 className="mt-5 text-[19px] font-medium text-ink">{title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-ink-soft">
                    {text}
                  </p>
                </div>
              ))}
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
                Tres pasos para hablar con un médico
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
                  className="inline-block rounded-full bg-sage px-8 py-[15px] text-[16px] font-semibold text-ink"
                >
                  Empezar cuestionario médico
                </QuizTrigger>
              </div>
            </div>
          </section>

          {/* ── Nuestro equipo médico ── */}
          <Experts />

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
                Habla hoy con un médico colegiado
              </h2>
              <p className="mx-auto mt-4 max-w-[52ch] text-[15.5px] leading-relaxed text-paper/75">
                Rellena el cuestionario médico y recibe una valoración clínica
                personalizada. Sin desplazamientos, sin esperas y sin permanencia.
              </p>
              <QuizTrigger
                plan={`${planPrefix}-final`}
                className="mt-8 inline-block rounded-full bg-sage px-8 py-[15px] text-[16px] font-semibold text-ink"
              >
                Empezar cuestionario médico
              </QuizTrigger>
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

        {/* ── Footer ── */}
        <footer className="px-3 pb-6 pt-[40px] sm:px-4 lg:px-5">
          <div className="mx-auto max-w-none overflow-hidden rounded-[32px] bg-ink text-paper">
            <div className="grid grid-cols-2 gap-x-10 gap-y-2 px-8 pb-6 pt-12 md:grid-cols-[1.6fr_1fr_1fr_1fr_1fr] md:gap-y-8 md:px-14">
              <div className="col-span-2 md:col-span-1">
                <a
                  href="/"
                  aria-label="DoctorLife — inicio"
                  className="inline-flex no-underline"
                >
                  <BrandLogo
                    boxed
                    markSize={28}
                    textSize={23}
                    textClassName="text-paper"
                  />
                </a>
                <p className="mt-5 max-w-[320px] text-[15px] leading-relaxed text-paper/65">
                  Plataforma de telemedicina que conecta a pacientes con médicos
                  colegiados en España para una atención rápida, segura y cercana.
                </p>
              </div>
              <FooterColumns />
            </div>
            <div className="flex flex-col gap-2 border-t border-paper/10 px-8 py-6 text-[13px] text-paper/55 sm:flex-row sm:items-center sm:justify-between md:px-14">
              <span>© {new Date().getFullYear()} DoctorLife. Todos los derechos reservados.</span>
              <span>Servicio de telemedicina con médicos colegiados en España.</span>
            </div>
          </div>
        </footer>
      </div>
    </QuizProvider>
  );
}
