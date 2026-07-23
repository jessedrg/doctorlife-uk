"use client";

import { usePathname } from "next/navigation";
import { WhatsAppBubble } from "./whatsapp-bubble";

const PRIVATE_PREFIXES = ["/clinica", "/admin", "/portal", "/sign-in", "/sign-up"];
// Ads funnels with their own fixed CTA bar: hide the bubble so they don't overlap.
const HIDDEN_PATHS = ["/medical-consultation", "/medical-assessment", "/medical-assessment-2"];

export function PublicWhatsAppBubble() {
  const pathname = usePathname() ?? "/";
  const isPrivate = PRIVATE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  const isHidden = HIDDEN_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  // On blog articles we already show the sticky WhatsApp bar,
  // so we hide the floating bubble to avoid duplicating/overlapping on mobile.
  const isBlogArticle = /^\/blog\/[^/]+/.test(pathname);
  if (isPrivate || isHidden || isBlogArticle) return null;
  return <WhatsAppBubble />;
}
