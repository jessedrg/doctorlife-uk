"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useQuiz } from "./quiz-context";
import { quizSteps, products, adsQuizSteps, adsProducts } from "@/lib/data";
import { saveLead } from "@/app/actions/leads";
import { getPublicSlots, startPublicCheckout } from "@/app/actions/public-booking";
import {
  COMORBIDITIES,
  CONTRAINDICATIONS,
  evaluateEligibility,
  type EligibilityResult,
} from "@/lib/eligibility";
import type { PooledSlot } from "@/lib/scheduling/types";
import { BrandLogo } from "./brand-logo";
import { analytics } from "@/lib/analytics";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const WA_QUIZ_URL = `https://wa.me/34711267223?text=${encodeURIComponent(
  "Me gustaría recibir más información sobre el tratamiento con GLP-1.",
)}`;

type Phase =
  | "questions"
  | "profile"
  | "measures"
  | "comorbidities"
  | "contraindications"
  | "result"
  | "plan"
  | "details"
  | "submitting"
  | "slot"
  | "blocked"
  | "done";

// Orden lineal de fases para la barra de progreso (la rama "blocked" sale del flujo).
const FLOW: Phase[] = [
  "questions",
  "profile",
  "measures",
  "comorbidities",
  "contraindications",
  "result",
  "plan",
  "details",
  "slot",
  "done",
];

/** Sanea textos que mencionan el fármaco/tratamiento para la variante de campañas. */
function sanitizeAds(text: string) {
  return text
    .replace(/Reacción alérgica grave previa a un GLP[-‑]1/g, "Reacción alérgica grave previa a este tipo de tratamiento")
    .replace(/Los GLP[-‑]1 no se recomiendan/g, "Este servicio no se recomienda")
    .replace(/GLP[-‑]1/g, "el control de peso")
    .replace(/\bTratamiento\b/g, "Servicio")
    .replace(/\btratamiento\b/g, "servicio");
}

export function QuizModal() {
  const { open, initialPlan, closeQuiz, variant } = useQuiz();
  const isAds = variant === "ads";
  const steps = isAds ? adsQuizSteps : quizSteps;
  const productList = isAds ? adsProducts : products;
  const sa = (text: string) => (isAds ? sanitizeAds(text) : text);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [phase, setPhase] = useState<Phase>("questions");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState<string>("");
  const [pregnancy, setPregnancy] = useState<string>("");
  const [comorbidities, setComorbidities] = useState<string[]>([]);
  const [contraindications, setContraindications] = useState<string[]>([]);
  const [plan, setPlan] = useState<string | null>(null);
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [slots, setSlots] = useState<PooledSlot[] | null>(null);
  const [activeDate, setActiveDate] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);
  const [blockedSaved, setBlockedSaved] = useState(false);

  const total = steps.length;
  const emailRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setPhase("questions");
    setName("");
    setEmail("");
    setHeight("");
    setWeight("");
    setAge("");
    setSex("");
    setPregnancy("");
    setComorbidities([]);
    setContraindications([]);
    setPlan(null);
    setExpandedPlan(null);
    setError(null);
    setSlots(null);
    setActiveDate(null);
    setPaying(false);
    setBlockedSaved(false);
  };

  // Solo hay un plan contratable: el destacado. Lo preseleccionamos siempre.
  const mainPlan = useMemo(
    () => productList.find((p) => !p.comingSoon) ?? productList[0],
    [productList],
  );

  // Agrupa los huecos por día para el selector de la fase "slot".
  const slotsByDate = useMemo(() => {
    const map = new Map<string, PooledSlot[]>();
    for (const s of slots ?? []) {
      const list = map.get(s.date) ?? [];
      list.push(s);
      map.set(s.date, list);
    }
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [slots]);
  useEffect(() => {
    if (open) {
      setPlan(initialPlan && initialPlan === mainPlan.name ? initialPlan : mainPlan.name);
      analytics.formOpened(initialPlan ?? undefined);
    }
  }, [open, initialPlan, mainPlan]);

  const close = () => {
    // Solo registramos abandono si el usuario estaba en medio del formulario.
    if (phase !== "blocked") {
      analytics.formAbandoned(phase, phase === "questions" ? step : undefined);
    }
    closeQuiz();
    setTimeout(reset, 200);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (phase === "details") emailRef.current?.focus();
  }, [phase]);

  const h = parseFloat(height);
  const w = parseFloat(weight);
  const ageNum = parseInt(age) || 0;
  const bmi = h > 0 && w > 0 ? w / Math.pow(h / 100, 2) : null;

  // Veredicto de elegibilidad (se confirma de nuevo en el servidor al guardar).
  const verdict: EligibilityResult = useMemo(
    () =>
      evaluateEligibility({
        age: ageNum || null,
        heightCm: h > 0 ? h : null,
        weightKg: w > 0 ? w : null,
        pregnancy: pregnancy || null,
        comorbidities,
        contraindications,
      }),
    [ageNum, h, w, pregnancy, comorbidities, contraindications],
  );

  if (!open) return null;

  const isFemale = sex === "female";
  const stageIndex = FLOW.indexOf(phase === "submitting" ? "details" : phase);
  // Dentro de la fase de preguntas, la barra avanza por cada respuesta para dar momentum.
  const effectiveIndex =
    phase === "questions" ? step / Math.max(total, 1) : stageIndex < 0 ? 1 : stageIndex;
  const progress =
    phase === "blocked" ? 100 : Math.round((effectiveIndex / (FLOW.length - 1)) * 100);

  const bmiCategory = (b: number) =>
    b < 18.5
      ? { label: "Bajo peso", color: "text-amber" }
      : b < 25
        ? { label: "Peso saludable", color: "text-olive" }
        : b < 30
          ? { label: "Sobrepeso", color: "text-amber" }
          : { label: "Obesidad", color: "text-clay" };

  // Calculadora de tiempo seguro para alcanzar un peso saludable.
  const heightM = h / 100;
  const targetWeight = h > 0 ? 24 * heightM * heightM : 0;
  const kgToLose = bmi && bmi >= 25 ? Math.max(0, w - targetWeight) : 0;
  const ageFactor = ageNum >= 60 ? 0.8 : ageNum >= 45 ? 0.9 : 1;
  const fastRate = 0.85 * ageFactor;
  const slowRate = 0.5 * ageFactor;
  const monthsFast = kgToLose > 0 ? Math.max(1, Math.round(kgToLose / fastRate / 4.345)) : 0;
  const monthsSlow = kgToLose > 0 ? Math.max(monthsFast + 1, Math.round(kgToLose / slowRate / 4.345)) : 0;
  const estTimeline =
    kgToLose > 0 ? `≈ ${monthsFast}–${monthsSlow} meses · objetivo ${targetWeight.toFixed(0)} kg` : null;

  const toggle = (list: string[], setList: (v: string[]) => void, id: string) => {
    setList(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
  };

  const choose = (opt: string) => {
    const next = [...answers];
    next[step] = opt;
    setAnswers(next);
    // Métrica: registra la respuesta y el paso para el funnel de abandono.
    analytics.quizQuestion(step, steps[step].key ?? `step_${step}`, opt, total);
    setTimeout(() => {
      if (step < total - 1) setStep(step + 1);
      else setPhase("profile");
    }, 180);
  };

  const back = () => {
    setError(null);
    if (phase === "slot") setPhase("details");
    else if (phase === "details") setPhase("plan");
    else if (phase === "plan") setPhase("result");
    else if (phase === "result") setPhase("contraindications");
    else if (phase === "blocked") setPhase("contraindications");
    else if (phase === "contraindications") setPhase("comorbidities");
    else if (phase === "comorbidities") setPhase("measures");
    else if (phase === "measures") setPhase("profile");
    else if (phase === "profile") {
      setPhase("questions");
      setStep(total - 1);
    } else if (step > 0) setStep(step - 1);
  };

  // Construye el payload clínico común para guardar el lead.
  const leadPayload = () => {
    // Mapea las respuestas del cuestionario por su clave semántica.
    const byKey: Record<string, string | undefined> = {};
    steps.forEach((s, i) => {
      if (s.key) byKey[s.key] = answers[i];
    });
    // Resume el objetivo y la motivación en el campo `goal` para la notificación.
    const goalSummary =
      [
        byKey.objective && `Objetivo: ${byKey.objective.toLowerCase()}`,
        byKey.amount && `Meta: ${byKey.amount.toLowerCase()}`,
        byKey.why && `Motivo: ${byKey.why.toLowerCase()}`,
        byKey.tried && `Ha probado: ${byKey.tried.toLowerCase()}`,
        byKey.frustration && `Frustración: ${byKey.frustration.toLowerCase()}`,
      ]
        .filter(Boolean)
        .join(" · ") || "Perder peso";

    return {
      name,
      email,
      goal: goalSummary,
      glp1Experience: byKey.glp1Experience ?? answers[0],
      formatPreference: "Pluma semanal",
      timeline: estTimeline || undefined,
      plan: plan || undefined,
      heightCm: h > 0 ? h : null,
      weightKg: w > 0 ? w : null,
      age: ageNum || null,
      sex: sex || null,
      pregnancy: pregnancy || null,
      comorbidities,
      contraindications,
    };
  };

  const submit = async () => {
    setError(null);
    if (!EMAIL_RE.test(email.trim())) {
      setError("Introduce un correo electrónico válido.");
      emailRef.current?.focus();
      return;
    }
    setPhase("submitting");
    const res = await saveLead(leadPayload());
    if (!res.ok) {
      setError(res.error);
      setPhase("details");
      return;
    }
    // El servidor manda: si re-evaluó como bloqueado, vamos a la rama de bloqueo.
    if (res.eligibility === "blocked") {
      setPhase("blocked");
      setBlockedSaved(true);
      return;
    }
    setPhase("slot");
    analytics.formStep("slot");
    try {
      const available = await getPublicSlots(14);
      setSlots(available);
      setActiveDate(available[0]?.date ?? null);
    } catch {
      setSlots([]);
    }
  };

  // Guarda el lead bloqueado (para seguimiento) cuando deja su correo.
  const saveBlockedLead = async () => {
    setError(null);
    if (!EMAIL_RE.test(email.trim())) {
      setError("Introduce un correo electrónico válido.");
      return;
    }
    const res = await saveLead(leadPayload());
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setBlockedSaved(true);
  };

  const payForSlot = async (startUtc: string) => {
    setError(null);
    setPaying(true);
    try {
      const result = await startPublicCheckout({ name, email, startUtcISO: startUtc });
      if ("url" in result) {
        analytics.formCompleted({ source: plan ?? undefined, timeline: estTimeline ?? undefined });
        window.location.href = result.url;
        return;
      }
      setError(result.error);
    } catch {
      setError("No se pudo iniciar el pago. Inténtalo de nuevo.");
    }
    setPaying(false);
  };

  const activeSlots = slotsByDate.find(([d]) => d === activeDate)?.[1] ?? [];

  const verdictMeta = {
    eligible: {
      label: "Eres buen candidato",
      chip: "bg-olive/15 text-olive border-olive/30",
      ring: "radial-gradient(60% 60% at 38% 32%,#cdd9a0,#9aa472 60%,#5f6a3e)",
    },
    review: {
      label: "Requiere valoración médica",
      chip: "bg-amber/15 text-amber border-amber/30",
      ring: "radial-gradient(60% 60% at 38% 32%,#f0d49a,#d8a85a 60%,#a8772e)",
    },
    blocked: {
      label: "No recomendado",
      chip: "bg-clay/15 text-clay border-clay/30",
      ring: "radial-gradient(60% 60% at 38% 32%,#e4b3a6,#c5806f 60%,#9a4f3e)",
    },
  } as const;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center p-0 sm:items-center sm:p-6"
      style={{ background: "rgba(23,16,9,.55)", backdropFilter: "blur(8px)" }}
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label={isAds ? "Comprueba si es para ti" : "Comprueba si el tratamiento es para ti"}
    >
      <div
        className="quiz-card flex max-h-[94dvh] w-full max-w-[580px] flex-col overflow-hidden rounded-t-[28px] bg-paper sm:max-h-[90dvh] sm:rounded-[30px]"
        style={{ boxShadow: "0 40px 90px rgba(0,0,0,.4)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress bar */}
        <div className="h-[5px] flex-shrink-0 bg-cream-2">
          <div
            className="h-full bg-amber transition-[width] duration-[450ms] ease-out"
            style={{ width: `${Math.max(progress, 6)}%` }}
          />
        </div>

        <div className="overflow-y-auto overscroll-contain px-5 pb-7 pt-6 sm:px-9 sm:pb-9 sm:pt-8">
          <div aria-hidden className="mx-auto mb-4 h-1 w-10 rounded-full bg-ink/15 sm:hidden" />
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <BrandLogo markSize={26} textSize={18} textClassName="text-ink" />
            <button
              type="button"
              onClick={close}
              aria-label="Cerrar"
              className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-ink/15 text-base text-ink transition-colors hover:bg-warm"
            >
              ✕
            </button>
          </div>

          {/* QUESTIONS (experiencia GLP-1) */}
          {phase === "questions" && (
            <div key={step} className="quiz-fade">
              <div className="text-[13px] uppercase tracking-[.14em] text-clay">
                Paso {step + 1} de {total}
              </div>
              <h3 className="mb-[10px] mt-2 text-[27px] font-light leading-[1.12] tracking-[-.02em] text-balance sm:text-[30px]">
                {steps[step].q}
              </h3>
              {steps[step].sub && (
                <p className="mb-[22px] text-[15px] leading-relaxed text-ink-soft text-pretty">
                  {steps[step].sub}
                </p>
              )}
              <div className="flex flex-col gap-[11px]">
                {steps[step].opts.map((opt) => {
                  const selected = answers[step] === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => choose(opt)}
                      aria-pressed={selected}
                      className={`group flex items-center justify-between gap-[14px] rounded-2xl border px-[22px] py-[17px] text-left text-[16.5px] transition-all duration-150 ${
                        selected
                          ? "border-sage bg-sage/25 text-ink"
                          : "border-ink/15 bg-warm text-ink hover:border-amber hover:bg-cream"
                      }`}
                    >
                      <span>{opt}</span>
                      <span
                        className={`flex h-[26px] w-[26px] flex-shrink-0 items-center justify-center rounded-full text-sm transition-colors ${
                          selected ? "bg-sage text-ink" : "text-amber group-hover:bg-amber/10"
                        }`}
                      >
                        {selected ? "✓" : "→"}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Atajo a WhatsApp (solo en el primer paso) */}
              {step === 0 && (
                <div className="mt-6 flex items-center gap-3">
                  <span className="h-px flex-1 bg-ink/10" />
                  <span className="text-[12.5px] text-ink-mute">o si lo prefieres</span>
                  <span className="h-px flex-1 bg-ink/10" />
                </div>
              )}
              {step === 0 && (
                <button
                  type="button"
                  onClick={() => {
                    analytics.whatsappClicked("quiz");
                    window.open(WA_QUIZ_URL, "_blank");
                  }}
                  className="mt-3 flex w-full items-center justify-center gap-2.5 rounded-[14px] border border-ink/15 bg-warm py-[15px] text-[15.5px] font-medium text-ink transition-colors hover:border-[#25D366] hover:bg-cream"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    className="h-5 w-5 fill-[#25D366]"
                    aria-hidden="true"
                  >
                    <path d="M24 4C13 4 4 13 4 24c0 3.6 1 7 2.7 9.9L4 44l10.4-2.7C17 43 20.4 44 24 44c11 0 20-9 20-20S35 4 24 4zm0 36c-3.1 0-6.1-.8-8.7-2.3l-.6-.4-6.2 1.6 1.7-6-.4-.6C8.3 30 7.5 27.1 7.5 24 7.5 14.8 15 7.5 24 7.5S40.5 15 40.5 24 33 40 24 40zm10.8-13.4c-.6-.3-3.4-1.7-3.9-1.9-.5-.2-.9-.3-1.2.3-.4.6-1.4 1.9-1.7 2.2-.3.4-.6.4-1.1.1-.6-.3-2.4-.9-4.6-2.8-1.7-1.5-2.8-3.4-3.2-3.9-.3-.6 0-.9.3-1.1l.9-1.1c.2-.3.3-.6.5-.9.2-.3.1-.6 0-.9-.1-.2-1.2-2.9-1.6-3.9-.4-1-.8-.9-1.2-.9h-1c-.3 0-.9.1-1.4.7-.5.5-1.8 1.8-1.8 4.3s1.9 5 2.1 5.4c.3.3 3.7 5.7 9 8 1.3.5 2.3.8 3 1.1 1.3.4 2.4.3 3.3.2 1-.2 3.1-1.3 3.5-2.5.4-1.2.4-2.2.3-2.5-.1-.3-.5-.4-1-.7z" />
                  </svg>
                  Habla con nosotros por WhatsApp
                </button>
              )}
            </div>
          )}

          {/* PROFILE (edad, sexo, embarazo) */}
          {phase === "profile" && (
            <div className="quiz-fade">
              <div className="text-[13px] uppercase tracking-[.14em] text-clay">Sobre ti</div>
              <h3 className="mb-[6px] mt-2 text-[27px] font-light leading-[1.12] tracking-[-.02em] text-balance sm:text-[30px]">
                Cuéntanos un poco más
              </h3>
              <p className="mb-6 text-[15.5px] leading-relaxed text-ink-soft">
                {isAds
                  ? "Estos datos nos ayudan a comprobar si es adecuado para ti."
                  : "Estos datos nos ayudan a comprobar si el tratamiento es seguro para ti."}
              </p>

              <label className="flex flex-col gap-1.5 text-[13px] font-medium text-ink-soft">
                Edad (años)
                <input
                  value={age}
                  onChange={(e) => setAge(e.target.value.replace(/[^0-9]/g, ""))}
                  inputMode="numeric"
                  placeholder="35"
                  className="rounded-[14px] border border-ink/15 bg-warm px-[18px] py-4 text-[16px] text-ink outline-none transition-colors focus:border-amber"
                />
              </label>

              <div className="mt-4">
                <span className="text-[13px] font-medium text-ink-soft">Sexo biológico</span>
                <div className="mt-2 flex flex-col gap-[9px]">
                  {[
                    { id: "female", label: "Mujer" },
                    { id: "male", label: "Hombre" },
                    { id: "other", label: "Prefiero no decirlo" },
                  ].map((o) => {
                    const selected = sex === o.id;
                    return (
                      <button
                        key={o.id}
                        type="button"
                onClick={() => {
                  // Métrica: plan seleccionado
                  analytics.formPhasePlan(p.id);
                  setPlan(p.id);
                  setPhase("details");
                }}
                        aria-pressed={selected}
                        className={`flex items-center justify-between gap-3 rounded-2xl border px-[20px] py-[14px] text-left text-[15.5px] transition-all duration-150 ${
                          selected ? "border-sage bg-sage/25 text-ink" : "border-ink/15 bg-warm text-ink hover:border-amber"
                        }`}
                      >
                        {o.label}
                        <span className={`text-sm ${selected ? "text-ink" : "text-transparent"}`}>✓</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {isFemale && (
                <div className="mt-4">
                  <span className="text-[13px] font-medium text-ink-soft">
                    ¿Estás embarazada, en periodo de lactancia o buscando un embarazo?
                  </span>
                  <div className="mt-2 flex flex-col gap-[9px]">
                    {[
                      { id: "no", label: "No" },
                      { id: "yes", label: "Sí, actualmente" },
                      { id: "planning", label: "Estoy buscándolo" },
                    ].map((o) => {
                      const selected = pregnancy === o.id;
                      return (
                        <button
                          key={o.id}
                          type="button"
                          onClick={() => setPregnancy(o.id)}
                          aria-pressed={selected}
                          className={`flex items-center justify-between gap-3 rounded-2xl border px-[20px] py-[14px] text-left text-[15.5px] transition-all duration-150 ${
                            selected ? "border-sage bg-sage/25 text-ink" : "border-ink/15 bg-warm text-ink hover:border-amber"
                          }`}
                        >
                          {o.label}
                          <span className={`text-sm ${selected ? "text-ink" : "text-transparent"}`}>✓</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {error && <p className="mt-3 text-[13.5px] text-clay">{error}</p>}

              <button
                type="button"
                onClick={() => {
                  if (!ageNum) {
                    setError("Introduce tu edad para continuar.");
                    return;
                  }
                  if (!sex) {
                    setError("Selecciona una opción para continuar.");
                    return;
                  }
                  if (isFemale && !pregnancy) {
                    setError("Responde la última pregunta para continuar.");
                    return;
                  }
                  setError(null);
                  // Métrica: fase de perfil completada
                  analytics.formPhaseProfile(ageNum || null, sex || null, pregnancy || null);
                  setPhase("measures");
                }}
                className="mt-5 w-full rounded-[14px] bg-ink py-4 text-base font-semibold text-paper transition-opacity hover:opacity-90"
              >
                Continuar
              </button>
              <button type="button" onClick={back} className="mt-3 text-sm text-ink-mute hover:text-ink">
                ← Atrás
              </button>
            </div>
          )}

          {/* MEASURES (altura, peso → IMC + tiempo) */}
          {phase === "measures" && (
            <div className="quiz-fade">
              <div className="text-[13px] uppercase tracking-[.14em] text-clay">Tus medidas</div>
              <h3 className="mb-[6px] mt-2 text-[27px] font-light leading-[1.12] tracking-[-.02em] text-balance sm:text-[30px]">
                Tu objetivo, sin arriesgar tu salud
              </h3>
              <p className="mb-6 text-[15.5px] leading-relaxed text-ink-soft">
                Con tu altura y peso calculamos tu IMC y cuánto tardarías en llegar a un peso saludable a un ritmo seguro.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <label className="flex flex-col gap-1.5 text-[13px] font-medium text-ink-soft">
                  Altura (cm)
                  <input
                    value={height}
                    onChange={(e) => setHeight(e.target.value.replace(/[^0-9]/g, ""))}
                    inputMode="numeric"
                    placeholder="170"
                    className="rounded-[14px] border border-ink/15 bg-warm px-[18px] py-4 text-[16px] text-ink outline-none transition-colors focus:border-amber"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-[13px] font-medium text-ink-soft">
                  Peso (kg)
                  <input
                    value={weight}
                    onChange={(e) => setWeight(e.target.value.replace(/[^0-9]/g, ""))}
                    inputMode="numeric"
                    placeholder="75"
                    className="rounded-[14px] border border-ink/15 bg-warm px-[18px] py-4 text-[16px] text-ink outline-none transition-colors focus:border-amber"
                  />
                </label>
              </div>

              <div
                className={`mt-5 rounded-[18px] border transition-all duration-300 ${
                  bmi ? "border-sage/40 bg-sage/10 opacity-100" : "border-ink/10 bg-warm opacity-70"
                }`}
              >
                <div className="flex items-center justify-between px-5 py-4">
                  <span className="text-[14px] text-ink-soft">Tu IMC</span>
                  {bmi ? (
                    <span className="flex items-baseline gap-2">
                      <span className="text-[24px] font-semibold text-ink">{bmi.toFixed(1)}</span>
                      <span className={`text-[13.5px] font-medium ${bmiCategory(bmi).color}`}>
                        {bmiCategory(bmi).label}
                      </span>
                    </span>
                  ) : (
                    <span className="text-[14px] text-ink-mute">Introduce altura y peso</span>
                  )}
                </div>

                {bmi && kgToLose > 0 && (
                  <div className="border-t border-sage/30 px-5 py-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-[14px] text-ink-soft">Tiempo estimado</span>
                      <span className="text-right text-[20px] font-semibold text-ink">
                        {monthsFast}–{monthsSlow}
                        <span className="ml-1 text-[13.5px] font-normal text-ink-soft">meses</span>
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-[12.5px] text-ink-mute">
                      <span>
                        Hasta tu peso saludable (~{targetWeight.toFixed(0)} kg, −{kgToLose.toFixed(0)} kg)
                      </span>
                      <span>Ritmo seguro: 0,5–0,85 kg/sem</span>
                    </div>
                  </div>
                )}

                {bmi && bmi < 25 && bmi >= 18.5 && (
                  <div className="border-t border-sage/30 px-5 py-4 text-[13.5px] text-ink-soft">
                    Ya te encuentras en un rango de peso saludable. Tu plan se centrará en mantenerlo y en tu bienestar metabólico.
                  </div>
                )}
              </div>

              {error && <p className="mt-3 text-[13.5px] text-clay">{error}</p>}

              <button
                type="button"
                onClick={() => {
                  if (!(h > 0 && w > 0)) {
                    setError("Introduce tu altura y peso para continuar.");
                    return;
                  }
                  setError(null);
                  // Métrica: fase de medidas completada
                  analytics.formPhaseMeasures(h > 0 ? h : null, w > 0 ? w : null, bmi || null);
                  setPhase("comorbidities");
                }}
                className="mt-5 w-full rounded-[14px] bg-ink py-4 text-base font-semibold text-paper transition-opacity hover:opacity-90"
              >
                Continuar
              </button>
              <button type="button" onClick={back} className="mt-3 text-sm text-ink-mute hover:text-ink">
                ← Atrás
              </button>
            </div>
          )}

          {/* COMORBIDITIES */}
          {phase === "comorbidities" && (
            <div className="quiz-fade">
              <div className="text-[13px] uppercase tracking-[.14em] text-clay">Tu salud</div>
              <h3 className="mb-[6px] mt-2 text-[27px] font-light leading-[1.12] tracking-[-.02em] text-balance sm:text-[30px]">
                ¿Tienes alguna de estas condiciones?
              </h3>
              <p className="mb-5 text-[15.5px] leading-relaxed text-ink-soft">
                Marca todas las que apliquen. Si no tienes ninguna, continúa sin seleccionar nada.
              </p>

              <div className="flex flex-col gap-[9px]">
                {COMORBIDITIES.map((c) => {
                  const selected = comorbidities.includes(c.id);
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => toggle(comorbidities, setComorbidities, c.id)}
                      aria-pressed={selected}
                      className={`flex items-center justify-between gap-3 rounded-2xl border px-[20px] py-[13px] text-left text-[15px] transition-all duration-150 ${
                        selected ? "border-sage bg-sage/25 text-ink" : "border-ink/15 bg-warm text-ink hover:border-amber"
                      }`}
                    >
                      {sa(c.label)}
                      <span
                        className={`flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-md border text-[11px] ${
                          selected ? "border-sage bg-sage text-ink" : "border-ink/25 text-transparent"
                        }`}
                      >
                        ✓
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => {
                  // Métrica: fase de comorbilidades completada
                  analytics.formPhaseComorbidities(comorbidities);
                  setPhase("contraindications");
                }}
                className="mt-5 w-full rounded-[14px] bg-ink py-4 text-base font-semibold text-paper transition-opacity hover:opacity-90"
              >
                Continuar
              </button>
              <button type="button" onClick={back} className="mt-3 text-sm text-ink-mute hover:text-ink">
                ← Atrás
              </button>
            </div>
          )}

          {/* CONTRAINDICATIONS */}
          {phase === "contraindications" && (
            <div className="quiz-fade">
              <div className="text-[13px] uppercase tracking-[.14em] text-clay">Seguridad</div>
              <h3 className="mb-[6px] mt-2 text-[27px] font-light leading-[1.12] tracking-[-.02em] text-balance sm:text-[30px]">
                Antecedentes médicos importantes
              </h3>
              <p className="mb-5 text-[15.5px] leading-relaxed text-ink-soft">
                Marca lo que corresponda. Es clave para tu seguridad; si no tienes ninguno, continúa.
              </p>

              <div className="flex flex-col gap-[9px]">
                {CONTRAINDICATIONS.map((c) => {
                  const selected = contraindications.includes(c.id);
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => toggle(contraindications, setContraindications, c.id)}
                      aria-pressed={selected}
                      className={`flex items-start justify-between gap-3 rounded-2xl border px-[20px] py-[13px] text-left text-[14.5px] leading-snug transition-all duration-150 ${
                        selected ? "border-clay/60 bg-clay/12 text-ink" : "border-ink/15 bg-warm text-ink hover:border-amber"
                      }`}
                    >
                      <span>{sa(c.label)}</span>
                      <span
                        className={`mt-0.5 flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-md border text-[11px] ${
                          selected ? "border-clay bg-clay text-paper" : "border-ink/25 text-transparent"
                        }`}
                      >
                        ✓
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setPhase(verdict.status === "blocked" ? "blocked" : "result")}
                className="mt-5 w-full rounded-[14px] bg-ink py-4 text-base font-semibold text-paper transition-opacity hover:opacity-90"
              >
                Ver mi resultado
              </button>
              <button type="button" onClick={back} className="mt-3 text-sm text-ink-mute hover:text-ink">
                ← Atrás
              </button>
            </div>
          )}

          {/* RESULT (eligible / review) */}
          {phase === "result" && (
            <div className="quiz-fade">
              <div className="text-center">
                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] font-medium ${verdictMeta[verdict.status].chip}`}
                >
                  {verdictMeta[verdict.status].label}
                </span>
              </div>
              <h3 className="mb-3 mt-4 text-center text-[26px] font-light leading-[1.14] tracking-[-.02em] text-balance sm:text-[29px]">
                {verdict.status === "eligible"
                  ? isAds
                    ? "Buenas noticias: podemos ayudarte"
                    : "Buenas noticias: encajas en el tratamiento"
                  : "Podemos ayudarte, con revisión médica"}
              </h3>

              <div className="rounded-[18px] border border-ink/10 bg-warm px-5 py-4">
                <ul className="flex flex-col gap-2.5">
                  {verdict.reasons.map((r, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[14px] leading-snug text-ink-soft">
                      <span
                        className={`mt-0.5 flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full text-[10px] ${
                          verdict.status === "eligible" ? "bg-olive/30 text-ink" : "bg-amber/30 text-ink"
                        }`}
                      >
                        {verdict.status === "eligible" ? "✓" : "!"}
                      </span>
                      <span>{sa(r)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-4 text-[12.5px] leading-relaxed text-ink-mute">
                Este resultado es orientativo. La decisión final la toma siempre tu
                médico colegiado durante la consulta, tras revisar tu historia clínica completa.
              </p>

              <button
                type="button"
                onClick={() => {
                  // Métrica: fase de contraindicaciones completada
                  analytics.formPhaseContraindications(contraindications);
                  setPhase(verdict.status === "blocked" ? "blocked" : "result");
                }}
                className="mt-5 w-full rounded-[14px] bg-ink py-4 text-base font-semibold text-paper transition-opacity hover:opacity-90"
              >
                Continuar
              </button>
              <button type="button" onClick={back} className="mt-3 text-sm text-ink-mute hover:text-ink">
                ← Atrás
              </button>
            </div>
          )}

          {/* BLOCKED (contraindicación grave) */}
          {phase === "blocked" && (
            <div className="quiz-fade text-center">
              <div
                className="mx-auto flex h-[78px] w-[78px] items-center justify-center rounded-full text-[34px] text-paper"
                style={{ background: verdictMeta.blocked.ring }}
              >
                !
              </div>
              <h3 className="mb-3 mt-5 text-[25px] font-light leading-[1.16] tracking-[-.02em] text-balance sm:text-[28px]">
                {isAds
                  ? "Este servicio no es adecuado para ti ahora"
                  : "El tratamiento con GLP‑1 no es adecuado para ti ahora"}
              </h3>
              <p className="mx-auto mb-4 max-w-[44ch] text-[15px] leading-relaxed text-ink-soft">
                {isAds
                  ? "Según tus respuestas, este servicio podría no ser seguro en tu caso. Tu salud es lo primero."
                  : "Según tus respuestas, este tratamiento podría no ser seguro en tu caso. Tu salud es lo primero."}
              </p>

              <div className="rounded-[18px] border border-clay/25 bg-clay/8 px-5 py-4 text-left">
                <ul className="flex flex-col gap-2.5">
                  {verdict.reasons.map((r, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[14px] leading-snug text-ink-soft">
                      <span className="mt-0.5 flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full bg-clay/25 text-[10px] text-ink">
                        !
                      </span>
                      <span>{sa(r)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mx-auto mt-4 max-w-[46ch] text-[13.5px] leading-relaxed text-ink-soft">
                Te recomendamos consultarlo con tu médico de cabecera. Si lo deseas, déjanos tu correo y te
                enviaremos información y alternativas seguras.
              </p>

              {blockedSaved ? (
                <div className="mt-5 rounded-2xl border border-sage/40 bg-sage/12 px-5 py-4 text-[14.5px] text-ink">
                  Gracias. Te escribiremos a <span className="font-medium">{email}</span> con información útil.
                </div>
              ) : (
                <div className="mt-5 flex flex-col gap-3">
                  <input
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Tu correo electrónico (opcional)"
                    type="email"
                    autoComplete="email"
                    className={`rounded-[14px] border bg-warm px-[18px] py-4 text-[15.5px] text-ink outline-none transition-colors focus:border-amber ${
                      error ? "border-clay" : "border-ink/15"
                    }`}
                  />
                  {error && <p className="text-[13.5px] text-clay">{error}</p>}
                  <button
                    type="button"
                    onClick={saveBlockedLead}
                    className="rounded-[14px] bg-ink py-4 text-base font-semibold text-paper transition-opacity hover:opacity-90"
                  >
                    Enviarme información
                  </button>
                </div>
              )}

              <button type="button" onClick={close} className="mt-4 text-sm text-ink-mute hover:text-ink">
                Cerrar
              </button>
            </div>
          )}

          {/* PLAN SELECTION */}
          {phase === "plan" && (
            <div className="quiz-fade">
              <div className="text-[13px] uppercase tracking-[.14em] text-clay">Tu plan</div>
              <h3 className="mb-[6px] mt-2 text-[27px] font-light leading-[1.12] tracking-[-.02em] text-balance sm:text-[30px]">
                Elige tu plan
              </h3>
              <p className="mb-4 text-[15.5px] leading-relaxed text-ink-soft">
                Tu plan de seguimiento con endocrino. Pronto añadiremos más planes.
              </p>

              <div className="mb-5 flex items-start gap-3 rounded-2xl border border-sage/50 bg-sage/15 px-4 py-3.5">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-sage text-[12px] font-bold text-ink">
                  0€
                </span>
                {isAds ? (
                  <p className="text-[13.5px] leading-snug text-ink-soft">
                    <span className="font-semibold text-ink">Tu primera valoración es gratis.</span> Si decides
                    continuar, lo gestionas con la suscripción mensual. Oferta de lanzamiento: primer mes
                    60&nbsp;€ (después, 100&nbsp;€/mes + IVA). Cancela cuando quieras.
                  </p>
                ) : (
                  <p className="text-[13.5px] leading-snug text-ink-soft">
                    <span className="font-semibold text-ink">Tu primera visita es gratis.</span> Si tu médico te
                    receta tratamiento, lo desbloqueas con la suscripción mensual. Oferta de lanzamiento: primer
                    mes 60&nbsp;€ (después, 100&nbsp;€/mes + IVA). Cancela cuando quieras.
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-[11px]">
                {productList.map((p) => {
                  const selected = plan === p.name;
                  const expanded = expandedPlan === p.name;
                  return (
                    <div
                      key={p.name}
                      className={`overflow-hidden rounded-2xl border transition-all duration-150 ${
                        p.comingSoon
                          ? "border-ink/10 bg-warm/60 opacity-70"
                          : selected
                            ? "border-sage bg-sage/25"
                            : "border-ink/15 bg-warm"
                      }`}
                    >
                      <button
                        type="button"
                        disabled={p.comingSoon}
                        onClick={() => {
                          if (p.comingSoon) return;
                          // Métrica: plan seleccionado
                          analytics.formPhasePlan(p.name);
                          setPlan(p.name);
                          setError(null);
                        }}
                        aria-pressed={selected}
                        className="flex w-full items-center justify-between gap-3 px-4 py-[14px] text-left disabled:cursor-not-allowed sm:px-5"
                      >
                        <span className="flex min-w-0 flex-col">
                          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                            <span className="text-[15.5px] font-medium text-ink sm:text-[16.5px]">{p.name}</span>
                            <span
                              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[.08em] ${
                                p.comingSoon ? "bg-ink/10 text-ink-soft" : "bg-sage text-ink"
                              }`}
                            >
                              {p.tag}
                            </span>
                          </span>
                          <span className="mt-0.5 text-[13.5px] text-ink-mute">{p.price}</span>
                        </span>
                        <span
                          className={`flex h-[26px] w-[26px] flex-shrink-0 items-center justify-center rounded-full text-sm transition-colors ${
                            p.comingSoon
                              ? "border border-dashed border-ink/20 text-transparent"
                              : selected
                                ? "bg-sage text-ink"
                                : "border border-ink/20 text-transparent"
                          }`}
                        >
                          ✓
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setExpandedPlan(expanded ? null : p.name)}
                        aria-expanded={expanded}
                        className="flex w-full items-center justify-between gap-2 border-t border-ink/10 px-4 py-2.5 text-left text-[13px] font-medium text-clay transition-colors hover:bg-cream/60 sm:px-5"
                      >
                        {expanded ? "Ocultar detalles" : "Ver qué incluye"}
                        <span
                          className={`text-[11px] transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                          aria-hidden
                        >
                          ▼
                        </span>
                      </button>

                      <div
                        className="grid transition-all duration-300 ease-out"
                        style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
                      >
                        <div className="overflow-hidden">
                          <ul className="flex flex-col gap-2 px-4 pb-4 pt-1 sm:px-5">
                            {p.features.map((f) => (
                              <li key={f} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-ink-soft">
                                <span className="mt-0.5 flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full bg-sage/40 text-[10px] text-ink">
                                  ✓
                                </span>
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {error && <p className="mt-3 text-[13.5px] text-clay">{error}</p>}

              <button
                type="button"
                onClick={() => {
                  if (!plan) {
                    setError("Selecciona un plan para continuar.");
                    return;
                  }
                  setError(null);
                  setPhase("details");
                }}
                className="mt-5 w-full rounded-[14px] bg-ink py-4 text-base font-semibold text-paper transition-opacity hover:opacity-90"
              >
                Continuar
              </button>
              <button type="button" onClick={back} className="mt-3 text-sm text-ink-mute hover:text-ink">
                ← Atrás
              </button>
            </div>
          )}

          {/* DETAILS (name + email + plan summary) */}
          {(phase === "details" || phase === "submitting") && (
            <div className="quiz-fade">
              <div className="text-[13px] uppercase tracking-[.14em] text-clay">Casi listo</div>
              <h3 className="mb-[10px] mt-2 text-[27px] font-light leading-[1.12] tracking-[-.02em] sm:text-[30px]">
                Tus datos de acceso
              </h3>
              <p className="mb-5 text-[15.5px] leading-relaxed text-ink-soft">
                Usaremos tu correo como usuario para entrar a tu panel. En el siguiente paso eliges tu
                primera cita con el endocrino. La primera visita es gratis.
              </p>

              <div className="mb-6 flex flex-wrap gap-2">
                {plan && (
                  <span className="rounded-full border border-amber/50 bg-amber/15 px-3 py-1.5 text-[13px] font-medium text-ink">
                    {plan}
                  </span>
                )}
                {bmi && (
                  <span className="rounded-full border border-sage/50 bg-sage/15 px-3 py-1.5 text-[13px] font-medium text-ink">
                    IMC {bmi.toFixed(1)}
                  </span>
                )}
                {verdict.status === "review" && (
                  <span className="rounded-full border border-amber/50 bg-amber/15 px-3 py-1.5 text-[13px] font-medium text-ink">
                    Revisión médica
                  </span>
                )}
                {kgToLose > 0 && (
                  <span className="rounded-full border border-olive/40 bg-olive/10 px-3 py-1.5 text-[13px] font-medium text-ink">
                    {monthsFast}–{monthsSlow} meses estim.
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre (opcional)"
                  autoComplete="name"
                  disabled={phase === "submitting"}
                  className="rounded-[14px] border border-ink/15 bg-warm px-[18px] py-4 text-[15.5px] text-ink outline-none transition-colors focus:border-amber disabled:opacity-60"
                />
                <input
                  ref={emailRef}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && submit()}
                  placeholder="Correo electrónico"
                  type="email"
                  autoComplete="email"
                  disabled={phase === "submitting"}
                  aria-invalid={!!error}
                  className={`rounded-[14px] border bg-warm px-[18px] py-4 text-[15.5px] text-ink outline-none transition-colors focus:border-amber disabled:opacity-60 ${
                    error ? "border-clay" : "border-ink/15"
                  }`}
                />
                {error && <p className="text-[13.5px] text-clay">{error}</p>}
                <button
                  type="button"
                  onClick={submit}
                  disabled={phase === "submitting"}
                  className="flex items-center justify-center gap-2 rounded-[14px] bg-ink py-4 text-base font-semibold text-paper transition-opacity hover:opacity-90 disabled:opacity-70"
                >
                  {phase === "submitting" ? (
                    <>
                      <span className="quiz-spinner h-[18px] w-[18px] rounded-full border-2 border-paper/30 border-t-paper" />
                      Buscando tu cita…
                    </>
                  ) : (
                    "Elegir mi cita"
                  )}
                </button>
              </div>

              <p className="mt-4 text-[12.5px] leading-relaxed text-ink-mute">
                Al continuar aceptas nuestra{" "}
                <a href="/privacidad" className="underline decoration-ink/25 underline-offset-2 hover:text-ink">
                  política de privacidad
                </a>
                . Tu primera visita es gratis, sin tarjeta ni compromiso.
              </p>

              {phase !== "submitting" && (
                <button type="button" onClick={back} className="mt-3 text-sm text-ink-mute hover:text-ink">
                  ← Atrás
                </button>
              )}
            </div>
          )}

          {/* SLOT: elegir hora */}
          {phase === "slot" && (
            <div className="quiz-fade">
              <h3 className="text-[24px] font-light tracking-[-.02em] sm:text-[27px]">Elige tu primera cita</h3>
              <p className="mt-2 max-w-[46ch] text-[15px] leading-relaxed text-ink-soft">
                Reserva tu videollamada con un endocrino. Tu{" "}
                <span className="font-medium text-ink">primera visita es gratis</span> y crearemos
                tu cuenta automáticamente al confirmar.
              </p>

              {slots === null ? (
                <div className="flex items-center justify-center py-12 text-ink-mute">
                  <span className="quiz-spinner mr-2 inline-block h-5 w-5 rounded-full border-2 border-ink/20 border-t-ink/60" />
                  Buscando huecos disponibles…
                </div>
              ) : slotsByDate.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-ink/10 bg-ink/[.04] p-6 text-center">
                  <p className="text-[15px] font-medium text-ink">
                    No hay horas disponibles ahora mismo
                  </p>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-ink-soft">
                    Escríbenos por WhatsApp y te buscamos una disponibilidad en menos de 24&nbsp;h.
                  </p>
                  <a
                    href={`https://wa.me/34711267223?text=${encodeURIComponent(`Hola, acabo de hacer el quiz en DoctorLife y no hay horas disponibles. Me gustaría reservar una cita. Mi nombre es ${name || "…"}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-[14.5px] font-semibold text-white transition-opacity hover:opacity-90"
                    onClick={() => analytics.whatsappClicked("no_slots_quiz")}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5 fill-white" aria-hidden="true">
                      <path d="M24 4C13 4 4 13 4 24c0 3.6 1 7 2.7 9.9L4 44l10.4-2.7C17 43 20.4 44 24 44c11 0 20-9 20-20S35 4 24 4zm0 36c-3.1 0-6.1-.8-8.7-2.3l-.6-.4-6.2 1.6 1.7-6-.4-.6C8.3 30 7.5 27.1 7.5 24 7.5 14.8 15 7.5 24 7.5S40.5 15 40.5 24 33 40 24 40zm10.8-13.4c-.6-.3-3.4-1.7-3.9-1.9-.5-.2-.9-.3-1.2.3-.4.6-1.4 1.9-1.7 2.2-.3.4-.6.4-1.1.1-.6-.3-2.4-.9-4.6-2.8-1.7-1.5-2.8-3.4-3.2-3.9-.3-.6 0-.9.3-1.1l.9-1.1c.2-.3.3-.6.5-.9.2-.3.1-.6 0-.9-.1-.2-1.2-2.9-1.6-3.9-.4-1-.8-.9-1.2-.9h-1c-.3 0-.9.1-1.4.7-.5.5-1.8 1.8-1.8 4.3s1.9 5 2.1 5.4c.3.3 3.7 5.7 9 8 1.3.5 2.3.8 3 1.1 1.3.4 2.4.3 3.3.2 1-.2 3.1-1.3 3.5-2.5.4-1.2.4-2.2.3-2.5-.1-.3-.5-.4-1-.7z" />
                    </svg>
                    Escríbenos por WhatsApp
                  </a>
                  <p className="mt-3 text-[12px] text-ink-mute">
                    También puedes escribirnos a{" "}
                    <a href="mailto:hola@doctorlife.app" className="underline underline-offset-2 hover:text-ink">
                      hola@doctorlife.app
                    </a>
                  </p>
                </div>
              ) : (
                <>
                  <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
                    {slotsByDate.map(([date, list]) => {
                      const d = new Date(list[0].startUtc);
                      const active = date === activeDate;
                      return (
                        <button
                          key={date}
                          type="button"
                          onClick={() => setActiveDate(date)}
                          className={`shrink-0 rounded-xl px-3.5 py-2 text-center transition-colors ${
                            active ? "bg-ink text-paper" : "bg-ink/[.05] text-ink-soft hover:bg-ink/10"
                          }`}
                        >
                          <span className="block text-[11px] uppercase tracking-wide opacity-70">
                            {d.toLocaleDateString("es-ES", { weekday: "short" })}
                          </span>
                          <span className="block text-[15px] font-medium">
                            {d.toLocaleDateString("es-ES", { day: "numeric", month: "short" })}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {activeSlots.map((s) => (
                      <button
                        key={s.startUtc}
                        type="button"
                        disabled={paying}
                        onClick={() => payForSlot(s.startUtc)}
                        className="rounded-xl border border-ink/12 py-2.5 text-[14.5px] font-medium text-ink transition-colors hover:border-ink hover:bg-ink/[.04] disabled:opacity-50"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
              {paying && <p className="mt-4 text-center text-sm text-ink-mute">Confirmando tu reserva…</p>}

              <button
                type="button"
                onClick={back}
                disabled={paying}
                className="mt-4 text-sm text-ink-mute hover:text-ink disabled:opacity-50"
              >
                ← Atrás
              </button>
            </div>
          )}

          {/* DONE */}
          {phase === "done" && (
            <div className="quiz-fade py-[14px] text-center">
              <div
                className="mx-auto flex h-[84px] w-[84px] items-center justify-center rounded-full text-[38px] text-white"
                style={{ background: "radial-gradient(60% 60% at 38% 32%,#cdd9a0,#9aa472 60%,#5f6a3e)" }}
              >
                ✓
              </div>
              <h3 className="mb-[10px] mt-6 text-[27px] font-light tracking-[-.02em] sm:text-[30px]">
                {name ? `Gracias, ${name.split(" ")[0]}` : "Tu plan está en camino"}
              </h3>
              <p className="mx-auto mb-6 max-w-[40ch] text-[15.5px] leading-relaxed text-ink-soft">
                Hemos recibido tus respuestas. Un médico colegiado revisará tu caso y te escribirá a{" "}
                <span className="font-medium text-ink">{email}</span> en menos de 24 horas.
              </p>
              <button
                type="button"
                onClick={close}
                className="rounded-full bg-amber px-[38px] py-[15px] text-base font-semibold text-white transition-opacity hover:opacity-90"
              >
                Hecho
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .quiz-card {
          animation: quizIn 0.32s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .quiz-fade {
          animation: quizFade 0.28s ease;
        }
        .quiz-spinner {
          animation: quizSpin 0.7s linear infinite;
        }
        @keyframes quizIn {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes quizFade {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes quizSpin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
