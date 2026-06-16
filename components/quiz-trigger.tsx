"use client";

import { useQuiz } from "./quiz-context";

/**
 * A button that opens the quiz modal. Use anywhere in a server
 * component for any CTA: <QuizTrigger className="...">Get started</QuizTrigger>
 */
export function QuizTrigger({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { openQuiz } = useQuiz();
  return (
    <button
      type="button"
      onClick={openQuiz}
      className={`cursor-pointer transition-all duration-200 hover:brightness-[1.04] hover:shadow-lg active:scale-[.97] ${className ?? ""}`}
      style={style}
    >
      {children}
    </button>
  );
}
