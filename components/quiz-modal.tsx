"use client";

import { useState } from "react";
import { useQuiz } from "./quiz-context";
import { quizSteps } from "@/lib/data";

export function QuizModal() {
  const { open, closeQuiz } = useQuiz();
  const [step, setStep] = useState(0);
  const total = quizSteps.length;

  if (!open) return null;

  const isQuestion = step < total;
  const isEmail = step === total;
  const isDone = step > total;
  const progress = Math.round((Math.min(step, total) / total) * 100);

  const pick = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(0, s - 1));
  const finish = () => setStep(total + 1);
  const close = () => {
    closeQuiz();
    setStep(0);
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-6"
      style={{ background: "rgba(23,16,9,.55)", backdropFilter: "blur(8px)" }}
      onClick={close}
    >
      <div
        className="w-[560px] max-w-full overflow-hidden rounded-[30px] bg-paper"
        style={{ boxShadow: "0 40px 90px rgba(0,0,0,.4)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-[5px] bg-cream-2">
          <div
            className="h-full bg-amber transition-[width] duration-[400ms]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="px-9 pb-9 pt-8">
          <div className="mb-6 flex items-center justify-between">
            <span className="font-serif text-[26px]">maren</span>
            <button
              type="button"
              onClick={close}
              className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-ink/15 text-base text-ink"
            >
              ✕
            </button>
          </div>

          {isQuestion && (
            <>
              <div className="text-[13px] uppercase tracking-[.14em] text-clay">
                Step {step + 1} of {total}
              </div>
              <h3 className="mb-[22px] mt-2 text-[30px] font-light leading-[1.1] tracking-[-.02em]">
                {quizSteps[step].q}
              </h3>
              <div className="flex flex-col gap-[11px]">
                {quizSteps[step].opts.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={pick}
                    className="flex items-center justify-between gap-[14px] rounded-2xl border border-ink/15 bg-warm px-[22px] py-[17px] text-left text-[16.5px] font-normal transition-colors hover:border-amber"
                  >
                    <span className="whitespace-nowrap">{opt}</span>
                    <span className="text-amber">→</span>
                  </button>
                ))}
              </div>
              {step > 0 && (
                <button
                  type="button"
                  onClick={back}
                  className="mt-5 text-sm text-ink-mute"
                >
                  ← Back
                </button>
              )}
            </>
          )}

          {isEmail && (
            <>
              <div className="text-[13px] uppercase tracking-[.14em] text-clay">
                Last step
              </div>
              <h3 className="mb-[10px] mt-2 text-[30px] font-light leading-[1.1] tracking-[-.02em]">
                We&apos;ve got your match
              </h3>
              <p className="mb-[22px] text-[15.5px] leading-relaxed text-ink-soft">
                Add your email and a Maren clinician will review your answers and
                build your personalized plan.
              </p>
              <div className="flex flex-col gap-3">
                <input
                  placeholder="Email address"
                  className="rounded-[14px] border border-ink/15 bg-warm px-[18px] py-4 text-[15.5px] text-ink outline-none"
                />
                <button
                  type="button"
                  onClick={finish}
                  className="rounded-[14px] bg-ink py-4 text-base font-semibold text-paper"
                >
                  See my plan
                </button>
              </div>
              <button
                type="button"
                onClick={back}
                className="mt-[18px] text-sm text-ink-mute"
              >
                ← Back
              </button>
            </>
          )}

          {isDone && (
            <div className="py-[14px] text-center">
              <div
                className="mx-auto flex h-[84px] w-[84px] items-center justify-center rounded-full text-[38px] text-white"
                style={{
                  background:
                    "radial-gradient(60% 60% at 38% 32%,#cdd9a0,#9aa472 60%,#5f6a3e)",
                }}
              >
                ✓
              </div>
              <h3 className="mb-[10px] mt-6 text-[30px] font-light tracking-[-.02em]">
                Your plan is on its way
              </h3>
              <p className="mx-auto mb-6 max-w-[36ch] text-[15.5px] leading-relaxed text-ink-soft">
                A board-certified clinician will review your answers within 24
                hours. Welcome to Maren.
              </p>
              <button
                type="button"
                onClick={close}
                className="rounded-full bg-amber px-[38px] py-[15px] text-base font-semibold text-white"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
