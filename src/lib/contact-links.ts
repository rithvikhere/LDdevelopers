import { siteAssets } from "@/config/site-assets";

/**
 * Contact links built from the studio details in site-assets.ts.
 * A plain module (no "use client"), so server and client components can both import the values.
 */
const rawPhone = siteAssets.contact.phonePlaceholder.replace(/[^0-9]/g, "");

/** WhatsApp click-to-chat link with the pre-filled consultation message. */
export const contactWhatsappUrl = `https://wa.me/${rawPhone}?text=${encodeURIComponent(
  "Hello LD Developers, I am interested in commissioning an architectural and turnkey construction consultation."
)}`;

/** Click-to-call link for the studio phone. */
export const contactTelHref = `tel:${siteAssets.contact.phonePlaceholder.replace(/[^\d+]/g, "")}`;
