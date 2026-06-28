import { track } from "@vercel/analytics";

/** Acción de conversión de Google Ads para "Envío de formulario para clientes potenciales". */
const GOOGLE_ADS_SEND_TO = "AW-18265536787/YUdjCIvbmMQcEJPy14VE";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Dispara la conversión de Google Ads de "formulario completado". */
function fireGoogleAdsConversion() {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "conversion", {
    send_to: GOOGLE_ADS_SEND_TO,
    value: 1.0,
    currency: "EUR",
  });
}

/**
 * Custom events centralizados para DoctorLife.
 *
 * Usamos Vercel Analytics (`track`) para medir el embudo:
 *  - cuánta gente abre el formulario (y desde dónde)
 *  - el avance por los pasos del quiz
 *  - cuántos completan el formulario (leads)
 *  - la aparición / interacción con el popup del blog
 *  - la navegación desde el blog hacia la página principal
 *
 * Los valores de las propiedades solo pueden ser string | number | boolean | null.
 */

function currentPath(): string {
  if (typeof window === "undefined") return "";
  return window.location.pathname;
}

/** ¿El usuario está navegando dentro del blog? */
function isBlog(): boolean {
  return currentPath().startsWith("/blog");
}

export const analytics = {
  /** El usuario abrió el formulario/quiz. `source` = plan o lugar desde donde se abrió. */
  formOpened(source?: string | null) {
    track("form_opened", {
      source: source ?? "navbar",
      path: currentPath(),
      from_blog: isBlog(),
    });
  },

  /** Avance dentro del quiz (p. ej. "bmi", "details"). */
  formStep(step: string) {
    track("form_step", { step, path: currentPath() });
  },

  /** El usuario completó el formulario (lead creado). */
  formCompleted(meta?: { source?: string | null; timeline?: string | null }) {
    track("form_completed", {
      source: meta?.source ?? "unknown",
      timeline: meta?.timeline ?? null,
      from_blog: isBlog(),
    });
    // Conversión de Google Ads
    fireGoogleAdsConversion();
  },

  /** Apareció la card de conversión del blog tras un rato navegando. */
  blogPopupShown() {
    track("blog_popup_shown", { path: currentPath() });
  },

  /** El usuario navegó desde el blog hacia la página principal. */
  blogToHome(target: string) {
    track("blog_to_home", { target, from: currentPath() });
  },

  /** El usuario hizo clic en el botón de WhatsApp. */
  whatsappClicked(source: "button" | "tooltip" | "sticky_bar") {
    track("whatsapp_clicked", { source, path: currentPath() });
    // Fire Google Ads conversion — same weight as form lead
    fireGoogleAdsConversion();
  },
};
