"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useQuiz } from "./quiz-context";
import { products, adsProducts } from "@/lib/data";
import { saveLead } from "@/app/actions/leads";
import { getPublicSlots, startPublicCheckout } from "@/app/actions/public-booking";
import type { PooledSlot } from "@/lib/scheduling/types";
import { BrandLogo } from "./brand-logo";
import { analytics } from "@/lib/analytics";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// UK or international phone: 9-15 digits, allows +, spaces and dashes.
const PHONE_RE = /^\+?[\d\s-]{9,17}$/;

const WA_QUIZ_URL = `https://wa.me/447700900123?text=${encodeURIComponent(
  "I'd like more information about GLP-1 treatment.",
)}`;

// SINGLE-page form: minimal details → choose appointment → done.
type Phase = "form" | "submitting" | "slot" | "done";

export function QuizModal() {
  const { open, initialPlan, closeQuiz, variant } = useQuiz();
  const isAds = variant === "ads";
  const productList = isAds ? adsProducts : products;

  const [phase, setPhase] = useState<Phase>("form");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [slots, setSlots] = useState<PooledSlot[] | null>(null);
  const [activeDate, setActiveDate] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);

  const phoneRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setPhase("form");
    setName("");
    setPhone("");
    setEmail("");
    setHeight("");
    setWeight("");
    setError(null);
    setSlots(null);
    setActiveDate(null);
    setPaying(false);
  };

  // Only one plan is purchasable: the featured one. It's implicit, no selection screen.
  const mainPlan = useMemo(
    () => productList.find((p) => !p.comingSoon) ?? productList[0],
    [productList],
  );

  // Group slots by day for the appointment picker.
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
      setPhase("form");
      analytics.formOpened(initialPlan ?? undefined);
    }
  }, [open, initialPlan]);

  const close = () => {
    if (phase === "form" || phase === "slot") {
      analytics.formAbandoned(phase);
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

  const h = parseFloat(height);
  const w = parseFloat(weight);
  const bmi = h > 0 && w > 0 ? w / Math.pow(h / 100, 2) : null;

  if (!open) return null;

  const bmiCategory = (b: number) =>
    b < 18.5
      ? { label: "Underweight", color: "text-amber" }
      : b < 25
        ? { label: "Healthy weight", color: "text-olive" }
        : b < 30
          ? { label: "Overweight", color: "text-amber" }
          : { label: "Obesity", color: "text-clay" };

  const submit = async () => {
    setError(null);
    if (!(h > 0 && w > 0)) {
      setError("Please enter your height and weight.");
      return;
    }
    if (!PHONE_RE.test(phone.trim())) {
      setError("Please enter a valid phone number.");
      phoneRef.current?.focus();
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setPhase("submitting");
    const res = await saveLead({
      name,
      email,
      phone,
      goal: "Lose weight",
      formatPreference: "Weekly pen",
      plan: mainPlan?.name,
      heightCm: h > 0 ? h : null,
      weightKg: w > 0 ? w : null,
    });
    if (!res.ok) {
      setError(res.error);
      setPhase("form");
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

  const payForSlot = async (startUtc: string) => {
    setError(null);
    setPaying(true);
    try {
      const result = await startPublicCheckout({ name, email, startUtcISO: startUtc });
      if ("url" in result) {
        analytics.formCompleted({ source: mainPlan?.name });
        window.location.href = result.url;
        return;
      }
      setError(result.error);
    } catch {
      setError("Payment could not be started. Please try again.");
    }
    setPaying(false);
  };

  const activeSlots = slotsByDate.find(([d]) => d === activeDate)?.[1] ?? [];

  const inputClass =
    "rounded-[14px] border border-ink/15 bg-warm px-[18px] py-4 text-[16px] text-ink outline-none transition-colors focus:border-amber disabled:opacity-60";

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center p-0 sm:items-center sm:p-6"
      style={{ background: "rgba(23,16,9,.45)", backdropFilter: "blur(6px)" }}
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Book your first free consultation"
    >
      <div
        className="quiz-card flex max-h-[92dvh] w-full max-w-[480px] flex-col overflow-hidden rounded-t-[28px] bg-paper sm:max-h-[88dvh] sm:rounded-[26px]"
        style={{ boxShadow: "0 40px 90px rgba(0,0,0,.35)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-y-auto overscroll-contain px-6 pb-7 pt-5 sm:px-8 sm:pb-8 sm:pt-6">
          <div aria-hidden className="mx-auto mb-4 h-1 w-12 rounded-full bg-ink/15 sm:hidden" />
          {/* Header */}
          <div className="mb-5 flex items-center justify-between">
            <BrandLogo markSize={24} textSize={17} textClassName="text-ink" />
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="flex h-[40px] w-[40px] items-center justify-center rounded-full border border-ink/15 text-[15px] text-ink transition-colors hover:bg-warm active:bg-warm"
            >
              ✕
            </button>
          </div>

          {/* FORM — everything on a single page */}
          {(phase === "form" || phase === "submitting") && (
            <div className="quiz-fade">
              <h3 className="text-[24px] font-light leading-[1.14] tracking-[-.02em] text-balance sm:text-[27px]">
                Your first consultation, free
              </h3>
              <p className="mb-5 mt-2 text-[14.5px] leading-relaxed text-ink-soft">
                Leave us these details and choose your appointment with the doctor. No waiting and no commitment.
              </p>

              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex flex-col gap-1.5 text-[13px] font-medium text-ink-soft">
                    Height (cm)
                    <input
                      value={height}
                      onChange={(e) => setHeight(e.target.value.replace(/[^0-9]/g, ""))}
                      inputMode="numeric"
                      placeholder="170"
                      disabled={phase === "submitting"}
                      className={inputClass}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5 text-[13px] font-medium text-ink-soft">
                    Weight (kg)
                    <input
                      value={weight}
                      onChange={(e) => setWeight(e.target.value.replace(/[^0-9]/g, ""))}
                      inputMode="numeric"
                      placeholder="75"
                      disabled={phase === "submitting"}
                      className={inputClass}
                    />
                  </label>
                </div>

                {bmi && (
                  <div className="flex items-center justify-between rounded-[14px] border border-sage/40 bg-sage/10 px-[18px] py-3">
                    <span className="text-[13.5px] text-ink-soft">Your BMI</span>
                    <span className="flex items-baseline gap-2">
                      <span className="text-[19px] font-semibold text-ink">{bmi.toFixed(1)}</span>
                      <span className={`text-[13px] font-medium ${bmiCategory(bmi).color}`}>
                        {bmiCategory(bmi).label}
                      </span>
                    </span>
                  </div>
                )}

                <label className="flex flex-col gap-1.5 text-[13px] font-medium text-ink-soft">
                  Phone
                  <input
                    ref={phoneRef}
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value.replace(/[^\d+\s-]/g, ""));
                      if (error) setError(null);
                    }}
                    inputMode="tel"
                    type="tel"
                    autoComplete="tel"
                    placeholder="07700 900123"
                    disabled={phase === "submitting"}
                    className={inputClass}
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-[13px] font-medium text-ink-soft">
                  Email address
                  <input
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !(e.nativeEvent as KeyboardEvent).isComposing && e.keyCode !== 229) submit();
                    }}
                    type="email"
                    autoComplete="email"
                    placeholder="you@email.com"
                    disabled={phase === "submitting"}
                    aria-invalid={!!error}
                    className={inputClass}
                  />
                </label>

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name (optional)"
                  autoComplete="name"
                  disabled={phase === "submitting"}
                  className={inputClass}
                />

                {error && <p className="text-[13.5px] text-clay">{error}</p>}

                <button
                  type="button"
                  onClick={submit}
                  disabled={phase === "submitting"}
                  className="mt-1 flex items-center justify-center gap-2 rounded-[14px] bg-ink py-[17px] text-[16px] font-semibold text-paper transition-opacity hover:opacity-90 active:opacity-80 disabled:opacity-70"
                >
                  {phase === "submitting" ? (
                    <>
                      <span className="quiz-spinner h-[18px] w-[18px] rounded-full border-2 border-paper/30 border-t-paper" />
                      Finding your appointment…
                    </>
                  ) : (
                    "Choose my free appointment"
                  )}
                </button>
              </div>

              <p className="mt-3.5 text-[12px] leading-relaxed text-ink-mute">
                By continuing you accept our{" "}
                <a href="/privacy" className="underline decoration-ink/25 underline-offset-2 hover:text-ink">
                  privacy policy
                </a>
                . First consultation free, no card and no commitment.
              </p>

              {/* WhatsApp shortcut */}
              <div className="mt-4 flex items-center gap-3">
                <span className="h-px flex-1 bg-ink/10" />
                <span className="text-[12px] text-ink-mute">or if you prefer</span>
                <span className="h-px flex-1 bg-ink/10" />
              </div>
              <button
                type="button"
                onClick={() => {
                  analytics.whatsappClicked("quiz");
                  window.open(WA_QUIZ_URL, "_blank");
                }}
                className="mt-3 flex w-full items-center justify-center gap-2.5 rounded-[14px] border border-ink/15 bg-warm py-[13px] text-[15px] font-medium text-ink transition-colors hover:border-[#25D366] hover:bg-cream"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className="h-5 w-5 fill-[#25D366]"
                  aria-hidden="true"
                >
                  <path d="M24 4C13 4 4 13 4 24c0 3.6 1 7 2.7 9.9L4 44l10.4-2.7C17 43 20.4 44 24 44c11 0 20-9 20-20S35 4 24 4zm0 36c-3.1 0-6.1-.8-8.7-2.3l-.6-.4-6.2 1.6 1.7-6-.4-.6C8.3 30 7.5 27.1 7.5 24 7.5 14.8 15 7.5 24 7.5S40.5 15 40.5 24 33 40 24 40zm10.8-13.4c-.6-.3-3.4-1.7-3.9-1.9-.5-.2-.9-.3-1.2.3-.4.6-1.4 1.9-1.7 2.2-.3.4-.6.4-1.1.1-.6-.3-2.4-.9-4.6-2.8-1.7-1.5-2.8-3.4-3.2-3.9-.3-.6 0-.9.3-1.1l.9-1.1c.2-.3.3-.6.5-.9.2-.3.1-.6 0-.9-.1-.2-1.2-2.9-1.6-3.9-.4-1-.8-.9-1.2-.9h-1c-.3 0-.9.1-1.4.7-.5.5-1.8 1.8-1.8 4.3s1.9 5 2.1 5.4c.3.3 3.7 5.7 9 8 1.3.5 2.3.8 3 1.1 1.3.4 2.4.3 3.3.2 1-.2 3.1-1.3 3.5-2.5.4-1.2.4-2.2.3-2.5-.1-.3-.5-.4-1-.7z" />
                </svg>
                Chat to us on WhatsApp
              </button>
            </div>
          )}

          {/* SLOT: elegir hora */}
          {phase === "slot" && (
            <div className="quiz-fade">
              <h3 className="text-[23px] font-light tracking-[-.02em] sm:text-[26px]">Choose your first appointment</h3>
              <p className="mt-2 max-w-[46ch] text-[14.5px] leading-relaxed text-ink-soft">
                Video call with a doctor. Your{" "}
                <span className="font-medium text-ink">first consultation is free</span> and we'll create
                your account automatically when you confirm.
              </p>

              {slots === null ? (
                <div className="flex items-center justify-center py-12 text-ink-mute">
                  <span className="quiz-spinner mr-2 inline-block h-5 w-5 rounded-full border-2 border-ink/20 border-t-ink/60" />
                  Finding available slots…
                </div>
              ) : slotsByDate.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-ink/10 bg-ink/[.04] p-6 text-center">
                  <p className="text-[15px] font-medium text-ink">
                    No appointments available right now
                  </p>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-ink-soft">
                    Message us on WhatsApp and we'll find you availability within 24&nbsp;hours.
                  </p>
                  <a
                    href={`https://wa.me/447700900123?text=${encodeURIComponent(`Hi, I've just left my details on DoctorLife and there are no appointments available. I'd like to book a consultation. My name is ${name || "…"}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-[14.5px] font-semibold text-white transition-opacity hover:opacity-90"
                    onClick={() => analytics.whatsappClicked("no_slots_quiz")}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5 fill-white" aria-hidden="true">
                      <path d="M24 4C13 4 4 13 4 24c0 3.6 1 7 2.7 9.9L4 44l10.4-2.7C17 43 20.4 44 24 44c11 0 20-9 20-20S35 4 24 4zm0 36c-3.1 0-6.1-.8-8.7-2.3l-.6-.4-6.2 1.6 1.7-6-.4-.6C8.3 30 7.5 27.1 7.5 24 7.5 14.8 15 7.5 24 7.5S40.5 15 40.5 24 33 40 24 40zm10.8-13.4c-.6-.3-3.4-1.7-3.9-1.9-.5-.2-.9-.3-1.2.3-.4.6-1.4 1.9-1.7 2.2-.3.4-.6.4-1.1.1-.6-.3-2.4-.9-4.6-2.8-1.7-1.5-2.8-3.4-3.2-3.9-.3-.6 0-.9.3-1.1l.9-1.1c.2-.3.3-.6.5-.9.2-.3.1-.6 0-.9-.1-.2-1.2-2.9-1.6-3.9-.4-1-.8-.9-1.2-.9h-1c-.3 0-.9.1-1.4.7-.5.5-1.8 1.8-1.8 4.3s1.9 5 2.1 5.4c.3.3 3.7 5.7 9 8 1.3.5 2.3.8 3 1.1 1.3.4 2.4.3 3.3.2 1-.2 3.1-1.3 3.5-2.5.4-1.2.4-2.2.3-2.5-.1-.3-.5-.4-1-.7z" />
                    </svg>
                    Message us on WhatsApp
                  </a>
                  <p className="mt-3 text-[12px] text-ink-mute">
                    You can also email us at{" "}
                    <a href="mailto:hello@doctorlife.co.uk" className="underline underline-offset-2 hover:text-ink">
                      hello@doctorlife.co.uk
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
                            {d.toLocaleDateString("en-GB", { weekday: "short" })}
                          </span>
                          <span className="block text-[15px] font-medium">
                            {d.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
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
                        onClick={() => {
                          // Metric: appointment selected
                          analytics.formPhaseSlot(s.startUtc);
                          payForSlot(s.startUtc);
                        }}
                        className="rounded-xl border border-ink/12 py-2.5 text-[14.5px] font-medium text-ink transition-colors hover:border-ink hover:bg-ink/[.04] disabled:opacity-50"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
              {paying && <p className="mt-4 text-center text-sm text-ink-mute">Confirming your booking…</p>}

              <button
                type="button"
                onClick={() => setPhase("form")}
                disabled={paying}
                className="mt-4 text-sm text-ink-mute hover:text-ink disabled:opacity-50"
              >
                ← Back
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
                {name ? `Thank you, ${name.split(" ")[0]}` : "All set"}
              </h3>
              <p className="mx-auto mb-6 max-w-[40ch] text-[15.5px] leading-relaxed text-ink-soft">
                We've received your details. A GMC-registered doctor will review your case and write to you at{" "}
                <span className="font-medium text-ink">{email}</span> within 24 hours.
              </p>
              <button
                type="button"
                onClick={close}
                className="rounded-full bg-amber px-[38px] py-[15px] text-base font-semibold text-white transition-opacity hover:opacity-90"
              >
                Done
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
