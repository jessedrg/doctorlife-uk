"use client";

import { createContext, useContext, useState } from "react";
import { QuizModal } from "./quiz-modal";

type QuizContextValue = {
  open: boolean;
  openQuiz: () => void;
  closeQuiz: () => void;
};

const QuizContext = createContext<QuizContextValue | null>(null);

/**
 * Wrap the page once. Provides openQuiz/closeQuiz to any descendant
 * (via useQuiz / <QuizTrigger>) and renders the modal itself.
 */
export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const openQuiz = () => {
    if (typeof document !== "undefined") document.body.style.overflow = "hidden";
    setOpen(true);
  };
  const closeQuiz = () => {
    if (typeof document !== "undefined") document.body.style.overflow = "";
    setOpen(false);
  };

  return (
    <QuizContext.Provider value={{ open, openQuiz, closeQuiz }}>
      {children}
      <QuizModal />
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used within a <QuizProvider>");
  return ctx;
}
