import { QuizTrigger } from "./quiz-trigger";

export function Announcement() {
  return (
    <div className="flex items-center justify-center gap-[14px] bg-ink px-5 py-[11px] text-[14.5px] text-paper">
      <span className="opacity-80">El GLP‑1 oral ya está aquí.</span>
      <QuizTrigger className="inline-flex items-center gap-[6px] whitespace-nowrap font-semibold text-amber-light">
        Descúbrelo <span className="text-base">→</span>
      </QuizTrigger>
    </div>
  );
}
