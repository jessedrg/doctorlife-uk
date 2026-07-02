"use client";

import { usePathname } from "next/navigation";
import { WhatsAppBubble } from "./whatsapp-bubble";

const PRIVATE_PREFIXES = ["/medico", "/admin", "/portal", "/sign-in", "/sign-up"];

export function PublicWhatsAppBubble() {
  const pathname = usePathname() ?? "/";
  const isPrivate = PRIVATE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  // En los artículos del blog ya mostramos la barra sticky de WhatsApp,
  // así que ocultamos la burbuja flotante para no duplicar/solapar en móvil.
  const isBlogArticle = /^\/blog\/[^/]+/.test(pathname);
  if (isPrivate || isBlogArticle) return null;
  return <WhatsAppBubble />;
}
