"use client";

import { createContext, useContext, useState } from "react";
import { QuizModal } from "./quiz-modal";

type QuizContextValue = {
  open: boolean;
  initialPlan: string | null;
  openQuiz: (plan?: string) => void;
  closeQuiz: () => void;
};

const QuizContext = createContext<QuizContextValue | null>(null);

/**
 * Wrap the page once. Provides openQuiz/closeQuiz to any descendant
 * (via useQuiz / <QuizTrigger>) and renders the modal itself.
 */
export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [initialPlan, setInitialPlan] = useState<string | null>(null);

  const openQuiz = (plan?: string) => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
      // Marca el body para que globals.css oculte el launcher de Intercom
      // y no se superponga al formulario (especialmente en móvil).
      document.body.classList.add("quiz-open");
    }
    setInitialPlan(plan ?? null);
    setOpen(true);
  };
  const closeQuiz = () => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
      document.body.classList.remove("quiz-open");
    }
    setOpen(false);
  };

  return (
    <QuizContext.Provider value={{ open, initialPlan, openQuiz, closeQuiz }}>
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
