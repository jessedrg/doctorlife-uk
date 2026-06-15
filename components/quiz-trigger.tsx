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
    <button type="button" onClick={openQuiz} className={className} style={style}>
      {children}
    </button>
  );
}
