"use client";

import { usePathname } from "next/navigation";
import { WhatsAppBubble } from "./whatsapp-bubble";

const PRIVATE_PREFIXES = ["/medico", "/admin", "/portal", "/sign-in", "/sign-up"];

export function PublicWhatsAppBubble() {
  const pathname = usePathname() ?? "/";
  const isPrivate = PRIVATE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  if (isPrivate) return null;
  return <WhatsAppBubble />;
}
