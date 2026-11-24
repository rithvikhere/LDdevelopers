"use client";

import React, { useState, useSyncExternalStore } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteAssets } from "@/config/site-assets";
import { contactWhatsappUrl } from "@/components/landing/ContactInfoCard";
import { useHydrated, useHydratedReducedMotion } from "@/hooks/useHydrated";

const { contact } = siteAssets;
const { location, hours, timeZone } = contact;

const coords = `${location.lat},${location.lng}`;
/** Opens Google Maps (the app on phones) with a pin on the studio's exact coordinates. */
const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(coords)}`;
/** Key-free Google Maps embed centred on the same coordinates. */
const mapEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(coords)}&z=14&hl=en&output=embed`;
const coordLabel = `${Math.abs(location.lat).toFixed(4)}° ${location.lat >= 0 ? "N" : "S"}, ${Math.abs(
  location.lng
).toFixed(4)}° ${location.lng >= 0 ? "E" : "W"}`;
const telHref = `tel:${contact.phonePlaceholder.replace(/[^\d+]/g, "")}`;

/* -------------------------------------------------------------------------------------------------
 * Opening hours — "open now" is worked out in the studio's time zone, only after hydration
 * (the server snapshot is "unknown"), and re-checked every 30 seconds.
 * ---------------------------------------------------------------------------------------------- */
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const formatTime = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${suffix}`;
};

/** "open:<group>" | "closed:<group>" (group = index into hours for today, or -1) */
const getStatus = () => {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const part = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const day = WEEKDAYS.indexOf(part("weekday"));
  const now = Number(part("hour")) * 60 + Number(part("minute"));
  const group = hours.findIndex((h) => h.dayNumbers.includes(day));
  if (group === -1) return "closed:-1";
  const { open, close } = hours[group];
  return `${now >= toMinutes(open) && now < toMinutes(close) ? "open" : "closed"}:${group}`;
};
const subscribeClock = (onChange: () => void) => {
  const id = window.setInterval(onChange, 30_000);
  return () => window.clearInterval(id);
};
const useStudioStatus = () => useSyncExternalStore(subscribeClock, getStatus, () => "unknown");

/* -------------------------------------------------------------------------------------------------
 * Motion — the cards fold out like a folded drawing sheet opening down from its top edge, a shadow in
 * the fold lifting as each one flattens. "still" = final state for reduced motion.
 * ---------------------------------------------------------------------------------------------- */
const ease = [0.16, 1, 0.3, 1] as const;
const still = { duration: 0 };

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  shown: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.1, ease } }),
  still: { opacity: 1, y: 0, transition: still },
};

const foldVariants: Variants = {
  hidden: { rotateX: -86, opacity: 0 },
  shown: (i: number) => ({
    rotateX: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 12,
      mass: 1,
      delay: i * 0.16,
      opacity: { duration: 0.2, delay: i * 0.16 },
    },
  }),
  still: { rotateX: 0, opacity: 1, transition: still },
};

const foldShadeVariants: Variants = {
  hidden: { opacity: 0.9 },
  shown: (i: number) => ({ opacity: 0, transition: { duration: 1, delay: i * 0.16 + 0.1, ease } }),
  still: { opacity: 0, transition: still },
};

const riseVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  shown: (delay: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay, ease } }),
  still: { opacity: 1, y: 0, transition: still },
};

/** A card that folds out from its top edge. */
const FoldCard: React.FC<{ index: number; className?: string; children: React.ReactNode }> = ({
  index,
  className = "",
  children,
}) => (
  <div className={`[perspective:1300px] ${className}`}>
    <motion.div
      data-reveal
      custom={index}
      variants={foldVariants}
      style={{ transformOrigin: "50% 0%" }}
      className="relative h-full"
    >
      {children}
      <motion.span
        aria-hidden="true"
        custom={index}
        variants={foldShadeVariants}
        className="pointer-events-none absolute inset-0 rounded-[28px] bg-linear-to-b from-ink/60 via-ink/25 to-transparent motion-reduce:hidden"
      />
    </motion.div>
  </div>
);

/* -------------------------------------------------------------------------------------------------
 * Cards
 * ---------------------------------------------------------------------------------------------- */

/** Blueprint-style site sketch shown while the live map loads (or if it cannot load). */
const MapSketch: React.FC = () => (
  <div aria-hidden="true" className="absolute inset-0 bg-blueprint-900">
    <div className="bg-blueprint-grid absolute inset-0" />
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <g fill="none" stroke="#B5D0F0" strokeLinecap="round">
        <path d="M-10 210C60 190 110 150 170 150s120 40 240 10" strokeWidth="5" opacity="0.35" />
        <path d="M120-10c10 70 30 120 50 160s30 90 20 160" strokeWidth="3.5" opacity="0.3" />
        <path d="M-10 90c90 10 170-20 260-5s110 35 160 25" strokeWidth="2" opacity="0.22" />
        <path d="M280-10c-10 80 0 150 30 210s20 80 10 110" strokeWidth="2" opacity="0.22" />
        <circle cx="200" cy="150" r="46" strokeWidth="1" strokeDasharray="3 5" opacity="0.4" />
      </g>
    </svg>
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
      <MapPin className="h-9 w-9 fill-orange text-ink" strokeWidth={1.5} />
    </div>
  </div>
);

const MapCard: React.FC = () => {
  // The live map is created after hydration (so its load event is never missed) and fades in over the sketch
  const hydrated = useHydrated();
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <div className="relative h-full min-h-[360px] overflow-hidden rounded-[28px] border border-ink/15 bg-blueprint-900 shadow-[0_30px_60px_-30px_rgba(33,33,33,0.55)] sm:min-h-[440px]">
      <MapSketch />
      {hydrated && (
        <iframe
          title={`Map of ${location.label}`}
          src={mapEmbedSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          tabIndex={-1}
          aria-hidden="true"
          onLoad={() => setMapLoaded(true)}
          className={`pointer-events-none absolute inset-0 h-full w-full border-0 transition-opacity duration-700 [filter:saturate(0.85)_contrast(1.04)] ${
            mapLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* The whole card opens Google Maps */}
      <a
        href={mapsHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${location.label} in Google Maps (opens in a new tab)`}
        className="group absolute inset-0 z-10 flex flex-col justify-between p-3 outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-orange sm:p-4"
      >
        <span className="self-start rounded-full bg-cream/95 px-3.5 py-1.5 text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-ink shadow-md">
          Studio location
        </span>

        <motion.span
          data-reveal
          custom={0.55}
          variants={riseVariants}
          className="flex items-center justify-between gap-3 rounded-2xl bg-ink/90 p-3.5 text-cream shadow-xl backdrop-blur-md sm:gap-4 sm:p-5"
        >
          <span className="flex min-w-0 items-center gap-3.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange text-ink sm:h-11 sm:w-11">
              <MapPin className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block font-display text-lg font-semibold leading-tight sm:text-2xl">{location.label}</span>
              <span className="mt-0.5 block whitespace-nowrap font-mono text-[10px] tracking-wider text-cream/65 sm:text-[11px]">
                {coordLabel}
              </span>
            </span>
          </span>
          <span className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full bg-cream px-3.5 py-2.5 text-xs font-semibold text-ink transition-colors duration-300 group-hover:bg-orange sm:px-4">
            <span className="hidden sm:inline">Open in</span> Maps
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </span>
        </motion.span>
      </a>
    </div>
  );
};

const ContactRow: React.FC<{
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  external?: boolean;
}> = ({ href, icon, label, value, external }) => (
  <a
    href={href}
    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    className="group flex min-h-16 items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-sage-bg/60 px-4 py-3.5 transition-colors duration-300 hover:border-green/50 hover:bg-sage-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
  >
    <span className="flex min-w-0 items-center gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-mint transition-colors duration-300 group-hover:bg-green group-hover:text-white">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-ink/70">{label}</span>
        <span className="block font-display text-lg font-semibold leading-snug text-ink [overflow-wrap:anywhere] sm:text-2xl">
          {value}
        </span>
      </span>
    </span>
    <ArrowUpRight
      className="h-4 w-4 shrink-0 text-ink/60 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-green"
      aria-hidden="true"
    />
  </a>
);

const EnquiriesCard: React.FC = () => (
  <div className="flex h-full flex-col rounded-[28px] border border-ink/15 bg-mint p-6 shadow-[0_30px_60px_-34px_rgba(33,33,33,0.5)] sm:p-8">
    <p className="text-[11px] font-mono font-semibold uppercase tracking-[0.28em] text-ink/75">Enquiries</p>
    <h3 className="mt-2 font-display text-3xl font-medium text-ink">Talk to the desk</h3>
    <div className="mt-6 space-y-3">
      <ContactRow href={telHref} icon={<Phone className="h-4.5 w-4.5" aria-hidden="true" />} label="Call the studio" value={contact.phonePlaceholder} />
      <ContactRow
        href={`mailto:${contact.emailPlaceholder}`}
        icon={<Mail className="h-4.5 w-4.5" aria-hidden="true" />}
        label="Write to us"
        value={contact.emailPlaceholder}
      />
    </div>
    <a
      href={contactWhatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group mt-5 inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-green px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green"
    >
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      WhatsApp the studio
      <ArrowUpRight
        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </a>
  </div>
);

const HoursCard: React.FC = () => {
  const status = useStudioStatus();
  const [state, groupText] = status.split(":");
  const today = status === "unknown" ? -1 : Number(groupText);

  return (
    <div className="h-full rounded-[28px] border border-ink/15 bg-ink p-6 text-cream shadow-[0_30px_60px_-34px_rgba(33,33,33,0.6)] sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <p className="inline-flex items-center gap-2 text-[11px] font-mono font-semibold uppercase tracking-[0.28em] text-cream/75">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          Studio hours
        </p>
        {status !== "unknown" && (
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
              state === "open" ? "bg-green/20 text-[#86EFAC]" : "bg-white/10 text-cream/75"
            }`}
          >
            <span className="relative flex h-2 w-2">
              {state === "open" && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#86EFAC] opacity-60 motion-reduce:hidden" />
              )}
              <span className={`relative inline-flex h-2 w-2 rounded-full ${state === "open" ? "bg-[#86EFAC]" : "bg-cream/50"}`} />
            </span>
            {state === "open" ? "Open now" : "Closed now"}
          </span>
        )}
      </div>

      <ul className="mt-4 divide-y divide-white/10">
        {hours.map((h, i) => (
          <li key={h.label} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3.5">
            <span className="flex items-baseline gap-2">
              <span className={`font-display text-xl font-semibold ${i === today ? "text-orange-light" : "text-cream"}`}>
                {h.label}
              </span>
              <span className="text-xs text-cream/60">{h.days}</span>
            </span>
            <span className="font-mono text-sm tabular-nums text-cream/90">
              {formatTime(h.open)} – {formatTime(h.close)}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[11px] font-mono text-cream/60">All times IST · Site visits by appointment</p>
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Section
 * ---------------------------------------------------------------------------------------------- */

/**
 * DesignDeskSection — homepage section 04: where to find and reach the studio.
 * A live map card (opens Google Maps at the studio's coordinates), an enquiries card (phone, email,
 * WhatsApp) and a small opening-hours card with a live "open now" indicator.
 */
export const DesignDeskSection: React.FC = () => {
  const reduce = useHydratedReducedMotion();
  const play = (amount: number) =>
    reduce
      ? { initial: "hidden", animate: "still" }
      : { initial: "hidden", whileInView: "shown", viewport: { once: true, amount } };

  return (
    <section
      id="design-desk"
      aria-labelledby="design-desk-heading"
      className="relative z-10 -mt-12 rounded-t-[32px] bg-sage-bg pb-24 pt-20 text-ink sm:-mt-16 sm:rounded-t-[44px] sm:pb-32 sm:pt-28"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
        <motion.div {...play(0.6)} className="mb-12 grid grid-cols-1 items-end gap-6 sm:mb-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.p
              data-reveal
              custom={0}
              variants={headerVariants}
              className="inline-flex items-center gap-3 text-[11px] font-mono font-semibold uppercase tracking-[0.32em] text-ink/75"
            >
              <span className="h-px w-10 bg-ink/50" aria-hidden="true" />
              Principal studio
            </motion.p>
            <motion.h2
              data-reveal
              custom={1}
              variants={headerVariants}
              id="design-desk-heading"
              className="mt-5 font-display text-5xl font-light leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
            >
              Design Desk <span className="italic text-[#14532D]">&amp;</span> Consultation
            </motion.h2>
          </div>
          <motion.p
            data-reveal
            custom={2}
            variants={headerVariants}
            className="max-w-md text-sm leading-relaxed text-ink/75 sm:text-base lg:col-span-5 lg:justify-self-end"
          >
            Available for site visits, zoning assessments, and private client architectural briefings across Telangana
            and Karnataka.
          </motion.p>
        </motion.div>

        <motion.div {...play(0.2)} className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:grid-rows-[auto_auto]">
          <FoldCard index={0} className="lg:col-span-7 lg:row-span-2">
            <MapCard />
          </FoldCard>
          <FoldCard index={1} className="lg:col-span-5">
            <EnquiriesCard />
          </FoldCard>
          <FoldCard index={2} className="lg:col-span-5">
            <HoursCard />
          </FoldCard>
        </motion.div>
      </div>
    </section>
  );
};
