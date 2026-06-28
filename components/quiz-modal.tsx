"use client";

import { useEffect, useRef, useState } from "react";
import { useQuiz } from "./quiz-context";
import { quizSteps } from "@/lib/data";
import { saveLead } from "@/app/actions/leads";
import { BrandLogo } from "./brand-logo";
import { analytics } from "@/lib/analytics";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Phase = "questions" | "bmi" | "details" | "submitting" | "done";

export function QuizModal() {
  const { open, initialPlan, closeQuiz } = useQuiz();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [phase, setPhase] = useState<Phase>("questions");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [plan, setPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const total = quizSteps.length;
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
    setPlan(null);
    setError(null);
  };

  // Preselecciona el plan si el usuario abrió el quiz desde una tarjeta de plan
  useEffect(() => {
    if (open) setPlan(initialPlan);
  }, [open, initialPlan]);

  const close = () => {
    closeQuiz();
    // delay reset so the closing state isn't visible mid-fade
    setTimeout(reset, 200);
  };

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Focus the email field when reaching the details phase
  useEffect(() => {
    if (phase === "details") emailRef.current?.focus();
  }, [phase]);

  if (!open) return null;

  // Etapas: preguntas (total) + IMC (1) + datos/email (1) + done
  // (la antigua pantalla de "elige tu plan" se eliminó del flujo)
  const totalStages = total + 2;
  // Total mostrado al usuario en los contadores "Paso X de N"
  const displayTotal = total + 2;
  const completed =
    phase === "questions"
      ? step
      : phase === "bmi"
        ? total
        : phase === "done"
          ? totalStages
          : total + 1;
  const progress = Math.round((completed / totalStages) * 100);

  const h = parseFloat(height);
  const w = parseFloat(weight);
  const bmi = h > 0 && w > 0 ? w / Math.pow(h / 100, 2) : null;
  const bmiCategory = (b: number) =>
    b < 18.5
      ? { label: "Bajo peso", color: "text-amber" }
      : b < 25
        ? { label: "Peso saludable", color: "text-olive" }
        : b < 30
          ? { label: "Sobrepeso", color: "text-amber" }
          : { label: "Obesidad", color: "text-clay" };

  // Calculadora de tiempo seguro para alcanzar un peso saludable.
  // Objetivo: IMC 24 (centro del rango saludable). Ritmo seguro: 0,5–0,85 kg/sem,
  // ajustado ligeramente por edad (el metabolismo se ralentiza con los años).
  const ageNum = parseInt(age) || 0;
  const heightM = h / 100;
  const targetWeight = h > 0 ? 24 * heightM * heightM : 0;
  const kgToLose = bmi && bmi >= 25 ? Math.max(0, w - targetWeight) : 0;
  const ageFactor = ageNum >= 60 ? 0.8 : ageNum >= 45 ? 0.9 : 1;
  const fastRate = 0.85 * ageFactor; // kg por semana (ritmo alto seguro)
  const slowRate = 0.5 * ageFactor; // kg por semana (ritmo conservador)
  const monthsFast = kgToLose > 0 ? Math.max(1, Math.round(kgToLose / fastRate / 4.345)) : 0;
  const monthsSlow = kgToLose > 0 ? Math.max(monthsFast + 1, Math.round(kgToLose / slowRate / 4.345)) : 0;
  const estTimeline =
    kgToLose > 0 ? `≈ ${monthsFast}–${monthsSlow} meses · objetivo ${targetWeight.toFixed(0)} kg` : null;

  const choose = (opt: string) => {
    const next = [...answers];
    next[step] = opt;
    setAnswers(next);
    setTimeout(() => {
      if (step < total - 1) setStep(step + 1);
      else {
        setPhase("bmi");
        analytics.formStep("bmi");
      }
    }, 180);
  };

  const back = () => {
    setError(null);
    if (phase === "details") {
      setPhase("bmi");
    } else if (phase === "bmi") {
      setPhase("questions");
      setStep(total - 1);
    } else if (step > 0) {
      setStep(step - 1);
    }
  };

  const submit = async () => {
    setError(null);
    if (!EMAIL_RE.test(email.trim())) {
      setError("Introduce un correo electrónico válido.");
      emailRef.current?.focus();
      return;
    }
    setPhase("submitting");
    const res = await saveLead({
      name,
      email,
      goal: "Perder peso",
      glp1Experience: answers[0],
      formatPreference: "Pluma semanal",
      timeline: estTimeline || undefined,
      plan: plan || undefined,
      heightCm: h > 0 ? h : null,
      weightKg: w > 0 ? w : null,
      age: parseInt(age) || null,
    });
    if (res.ok) {
      setPhase("done");
      analytics.formCompleted({ source: plan, timeline: estTimeline });
    } else {
      setError(res.error);
      setPhase("details");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center p-0 sm:items-center sm:p-6"
      style={{ background: "rgba(23,16,9,.55)", backdropFilter: "blur(8px)" }}
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Crea tu plan personalizado"
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
          <div
            aria-hidden
            className="mx-auto mb-4 h-1 w-10 rounded-full bg-ink/15 sm:hidden"
          />
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

          {/* QUESTIONS */}
          {phase === "questions" && (
            <div key={step} className="quiz-fade">
              <div className="text-[13px] uppercase tracking-[.14em] text-clay">
                Paso {step + 1} de {displayTotal}
              </div>
              <h3 className="mb-[22px] mt-2 text-[27px] font-light leading-[1.12] tracking-[-.02em] text-balance sm:text-[30px]">
                {quizSteps[step].q}
              </h3>
              <div className="flex flex-col gap-[11px]">
                {quizSteps[step].opts.map((opt) => {
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
              {step > 0 && (
                <button type="button" onClick={back} className="mt-5 text-sm text-ink-mute hover:text-ink">
                  ← Atrás
                </button>
              )}
            </div>
          )}

          {/* BMI CALCULATOR */}
          {phase === "bmi" && (
            <div className="quiz-fade">
              <div className="text-[13px] uppercase tracking-[.14em] text-clay">
                Paso {total + 1} de {displayTotal}
              </div>
              <h3 className="mb-[6px] mt-2 text-[27px] font-light leading-[1.12] tracking-[-.02em] text-balance sm:text-[30px]">
                Tu objetivo, sin arriesgar tu salud
              </h3>
              <p className="mb-6 text-[15.5px] leading-relaxed text-ink-soft">
                Con tu altura, peso y edad estimamos cuánto tardarías en llegar a un peso saludable a un ritmo seguro.
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
                <label className="col-span-2 flex flex-col gap-1.5 text-[13px] font-medium text-ink-soft">
                  Edad (años)
                  <input
                    value={age}
                    onChange={(e) => setAge(e.target.value.replace(/[^0-9]/g, ""))}
                    inputMode="numeric"
                    placeholder="35"
                    className="rounded-[14px] border border-ink/15 bg-warm px-[18px] py-4 text-[16px] text-ink outline-none transition-colors focus:border-amber"
                  />
                </label>
              </div>

              {/* Live result: BMI + safe weight-loss estimate */}
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

                {/* Estimación de tiempo */}
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

                {/* Ya en rango saludable */}
                {bmi && bmi < 25 && bmi >= 18.5 && (
                  <div className="border-t border-sage/30 px-5 py-4 text-[13.5px] text-ink-soft">
                    Ya te encuentras en un rango de peso saludable. Tu plan se centrará en mantenerlo y en tu bienestar metabólico.
                  </div>
                )}
              </div>

              {bmi && kgToLose > 0 && (
                <p className="mt-3 text-[12px] leading-snug text-ink-mute">
                  Estimación orientativa basada en una pérdida de peso gradual y segura. Tu médico ajustará el ritmo a tu caso.
                </p>
              )}

              {error && <p className="mt-3 text-[13.5px] text-clay">{error}</p>}

              <button
                type="button"
                onClick={() => {
                  if (!(h > 0 && w > 0)) {
                    setError("Introduce tu altura y peso para continuar.");
                    return;
                  }
                  setError(null);
                  setPhase("details");
                  analytics.formStep("details");
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

          {/* DETAILS (email + name + plan summary) */}
          {(phase === "details" || phase === "submitting") && (
            <div className="quiz-fade">
              <div className="text-[13px] uppercase tracking-[.14em] text-clay">
                Paso {total + 2} de {displayTotal}
              </div>
              <h3 className="mb-[10px] mt-2 text-[27px] font-light leading-[1.12] tracking-[-.02em] sm:text-[30px]">
                Tu plan está listo
              </h3>
              <p className="mb-5 text-[15.5px] leading-relaxed text-ink-soft">
                Déjanos tu correo y un médico colegiado de DoctorLife revisará tus respuestas y creará tu
                plan personalizado en menos de 24 horas.
              </p>

              {/* Plan summary chips */}
              <div className="mb-6 flex flex-wrap gap-2">
                {plan && (
                  <span className="rounded-full border border-amber/50 bg-amber/15 px-3 py-1.5 text-[13px] font-medium text-ink">
                    Plan {plan}
                  </span>
                )}
                {answers.filter(Boolean).map((a, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-ink/12 bg-warm px-3 py-1.5 text-[13px] text-ink-soft"
                  >
                    {a}
                  </span>
                ))}
                {bmi && (
                  <span className="rounded-full border border-sage/50 bg-sage/15 px-3 py-1.5 text-[13px] font-medium text-ink">
                    IMC {bmi.toFixed(1)}
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
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre (opcional)"
                  autoComplete="name"
                  disabled={phase === "submitting"}
                  className="rounded-[14px] border border-ink/15 bg-warm px-[18px] py-4 text-[15.5px] text-ink outline-none transition-colors focus:border-amber disabled:opacity-60"
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
                      Creando tu plan…
                    </>
                  ) : (
                    "Ver mi plan"
                  )}
                </button>
              </div>

              {/* Tranquilidad destacada (sacada del gris legal) */}
              <div className="mt-4 flex items-center justify-center gap-2 rounded-[14px] border border-sage/50 bg-sage/15 px-4 py-3 text-center">
                <span aria-hidden className="text-[15px]">✓</span>
                <p className="text-[14px] font-medium text-ink">
                  Sin compromiso ni cobros automáticos
                </p>
              </div>

              {/* Mención de precio (movida aquí desde la antigua pantalla de plan) */}
              <p className="mt-3 text-center text-[13px] leading-relaxed text-ink-soft">
                Si decides empezar, tu primera visita médica son solo{" "}
                <span className="font-semibold text-ink">25&nbsp;€</span>. Sin permanencia.
              </p>

              <p className="mt-3 text-[12.5px] leading-relaxed text-ink-mute">
                Al continuar aceptas nuestra{" "}
                <a href="/privacidad" className="underline decoration-ink/25 underline-offset-2 hover:text-ink">
                  política de privacidad
                </a>
                .
              </p>

              {phase !== "submitting" && (
                <button type="button" onClick={back} className="mt-3 text-sm text-ink-mute hover:text-ink">
                  ← Atrás
                </button>
              )}
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
