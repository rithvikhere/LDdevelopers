"use client";

import React, { useRef, useState, useSyncExternalStore } from "react";
import { motion, useMotionTemplate, useScroll, useSpring, useTransform, type Variants } from "framer-motion";
import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteAssets } from "@/config/site-assets";
import { contactWhatsappUrl } from "@/lib/contact-links";
import { useHydrated, useHydratedReducedMotion } from "@/hooks/useHydrated";
import { heroCondensed, heroSans, heroSerif } from "@/components/landing/hero-fonts";

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
/** "9 AM" / "5:30 PM" — compact form for the big headline time. */
const formatShort = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return `${h % 12 || 12}${m ? `:${String(m).padStart(2, "0")}` : ""} ${h >= 12 ? "PM" : "AM"}`;
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
 * Look — a deep wine → plum → near-black glow (after the client's reference), with a soft ember of
 * orange low on the left and a fine grain. It melts into the footer's #212121 at the bottom edge.
 * ---------------------------------------------------------------------------------------------- */
const CREAM = "#F6EEE6";

const deskBackground: React.CSSProperties = {
  backgroundColor: "#140A11",
  backgroundImage: [
    "linear-gradient(180deg, transparent 78%, #212121 100%)",
    "radial-gradient(55% 75% at 100% 45%, rgba(10,7,9,0.96) 0%, rgba(10,7,9,0.55) 45%, transparent 75%)",
    "radial-gradient(70% 55% at 4% 0%, rgba(140,28,38,0.95) 0%, rgba(118,24,36,0.55) 38%, transparent 72%)",
    "radial-gradient(55% 50% at 36% 40%, rgba(104,20,70,0.85) 0%, transparent 72%)",
    "radial-gradient(50% 45% at 8% 80%, rgba(78,22,110,0.8) 0%, transparent 72%)",
    "radial-gradient(28% 26% at 0% 55%, rgba(222,104,48,0.4) 0%, transparent 72%)",
  ].join(","),
};

const GRAIN = `url("data:image/svg+xml;utf8,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>"
)}")`;

/** Dark glass card, like the reference's rating card. */
const glass =
  "rounded-[28px] border border-white/10 bg-[#1A0E17]/60 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.75)] backdrop-blur-xl";

/* -------------------------------------------------------------------------------------------------
 * Motion — the cards fold out like a folded drawing sheet opening down from its top edge, a shadow in
 * the fold lifting as each one flattens; the paper plane's trail draws, then the plane glides in to
 * point at the map. "still" = final state for reduced motion.
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

const trailVariants: Variants = {
  hidden: { pathLength: 0 },
  shown: { pathLength: 1, transition: { duration: 1.7, delay: 0.35, ease: [0.45, 0, 0.25, 1] } },
  still: { pathLength: 1, transition: still },
};

const planeVariants: Variants = {
  hidden: { opacity: 0, x: 26, y: -22, rotate: -8 },
  shown: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    transition: { delay: 1.75, type: "spring", stiffness: 90, damping: 14, opacity: { duration: 0.25, delay: 1.75 } },
  },
  still: { opacity: 1, x: 0, y: 0, rotate: 0, transition: still },
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
        className="pointer-events-none absolute inset-0 rounded-[28px] bg-linear-to-b from-black/60 via-black/25 to-transparent motion-reduce:hidden"
      />
    </motion.div>
  </div>
);

/** The "———•" rule from the reference. */
const DotRule: React.FC<{ className?: string }> = ({ className = "" }) => (
  <span aria-hidden="true" className={`relative inline-block h-px bg-[#F6EEE6]/55 ${className}`}>
    <span className="absolute -right-1 -top-[3px] h-[7px] w-[7px] rounded-full bg-[#F6EEE6]" />
  </span>
);

/* -------------------------------------------------------------------------------------------------
 * The paper plane — a hand-folded plane in cream line work, its dashed trail looping in from the hours
 * card, the nose pointing into the map. Drawn in a 400 × 300 box; strokes keep their weight at any size.
 * ---------------------------------------------------------------------------------------------- */
const TRAIL =
  "M412,14 C372,4 338,30 344,68 C350,104 326,130 298,126 C268,122 262,90 288,82 C316,74 330,108 314,136 C300,160 272,172 238,178";
// The reference plane, turned to dive down-left: nose N, top-wing tail A, fold B, keel tip C, wing root D, wing tip E
const P = { N: "40,292", A: "149.7,127.8", B: "141.3,178.7", C: "200.8,196.5", D: "157.6,204", E: "218.3,240.7" };

const PaperPlane: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg viewBox="0 0 420 320" aria-hidden="true" focusable="false" className={`pointer-events-none overflow-visible ${className}`}>
    <defs>
      <mask id="desk-trail-reveal" maskUnits="userSpaceOnUse" x="0" y="0" width="420" height="320">
        <motion.path d={TRAIL} variants={trailVariants} fill="none" stroke="#fff" strokeWidth={16} strokeLinecap="round" />
      </mask>
      <radialGradient id="desk-plane-glow">
        <stop offset="0" stopColor="#E67514" stopOpacity="0.22" />
        <stop offset="1" stopColor="#E67514" stopOpacity="0" />
      </radialGradient>
    </defs>
    <path
      d={TRAIL}
      mask="url(#desk-trail-reveal)"
      fill="none"
      stroke={CREAM}
      strokeOpacity={0.9}
      strokeWidth={3}
      strokeDasharray="11 10"
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
    />
    <motion.g variants={planeVariants} style={{ transformOrigin: "140px 220px" }}>
      <g className="desk-plane-bob" style={{ filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.45))" }}>
        <ellipse cx={140} cy={214} rx={110} ry={80} fill="url(#desk-plane-glow)" />
        {/* an opaque paper base (so nothing behind shows through), then cream tints that give each fold depth */}
        <polygon points={`${P.N} ${P.D} ${P.E}`} fill="#2A1526" />
        <polygon points={`${P.N} ${P.A} ${P.B}`} fill="#2A1526" />
        <polygon points={`${P.B} ${P.C} ${P.D}`} fill="#2A1526" />
        <polygon points={`${P.N} ${P.D} ${P.E}`} fill={CREAM} fillOpacity={0.2} />
        <polygon points={`${P.N} ${P.A} ${P.B}`} fill={CREAM} fillOpacity={0.4} />
        <polygon points={`${P.B} ${P.C} ${P.D}`} fill={CREAM} fillOpacity={0.62} />
        <g
          fill="none"
          stroke={CREAM}
          strokeWidth={3}
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        >
          <polyline points={`${P.N} ${P.A} ${P.B} ${P.N}`} />
          <polyline points={`${P.B} ${P.C} ${P.D} ${P.N} ${P.E} ${P.D}`} />
        </g>
      </g>
    </motion.g>
  </svg>
);

/* -------------------------------------------------------------------------------------------------
 * Cards
 * ---------------------------------------------------------------------------------------------- */

/** Site sketch shown while the live map loads (or if it cannot load). */
const MapSketch: React.FC = () => (
  <div aria-hidden="true" className="absolute inset-0 bg-[#1E0F1B]">
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <pattern id="desk-map-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="#F6EEE6" strokeOpacity="0.06" />
        </pattern>
      </defs>
      <rect width="400" height="300" fill="url(#desk-map-grid)" />
      <g fill="none" stroke="#F6EEE6" strokeLinecap="round">
        <path d="M-10 210C60 190 110 150 170 150s120 40 240 10" strokeWidth="5" opacity="0.22" />
        <path d="M120-10c10 70 30 120 50 160s30 90 20 160" strokeWidth="3.5" opacity="0.18" />
        <path d="M-10 90c90 10 170-20 260-5s110 35 160 25" strokeWidth="2" opacity="0.14" />
        <path d="M280-10c-10 80 0 150 30 210s20 80 10 110" strokeWidth="2" opacity="0.14" />
        <circle cx="200" cy="150" r="46" strokeWidth="1" strokeDasharray="3 5" opacity="0.35" />
      </g>
    </svg>
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
      <MapPin className="h-9 w-9 fill-orange text-[#1A0E17]" strokeWidth={1.5} />
    </div>
  </div>
);

/** The reference's pill: label + a cream disc holding the arrow. */
const DiscArrow: React.FC<{ className?: string }> = ({ className = "" }) => (
  <span
    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F6EEE6] text-[#1A0E17] transition-transform duration-300 group-hover:rotate-45 ${className}`}
  >
    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
  </span>
);

const MapCard: React.FC = () => {
  // The live map is created after hydration (so its load event is never missed) and fades in over the sketch
  const hydrated = useHydrated();
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <div className={`${glass} relative h-full p-2.5 sm:p-3`}>
      <div className="relative h-full min-h-[340px] overflow-hidden rounded-[20px] sm:min-h-[460px]">
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
            className={`pointer-events-none absolute inset-0 h-full w-full border-0 transition-opacity duration-700 [filter:invert(0.9)_hue-rotate(180deg)_saturate(0.7)_brightness(0.95)_contrast(0.95)] ${
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
          className="group absolute inset-0 z-10 flex flex-col justify-end p-3 outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-orange sm:p-4"
        >
          <motion.span
            data-reveal
            custom={0.55}
            variants={riseVariants}
            className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#140A11]/85 p-3.5 text-[#F6EEE6] shadow-xl backdrop-blur-md sm:gap-4 sm:p-4"
          >
            <span className="flex min-w-0 items-center gap-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange text-[#1A0E17] sm:h-11 sm:w-11">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className={`${heroSerif.className} block text-lg font-bold leading-tight sm:text-2xl`}>
                  {location.label}
                </span>
                <span className="mt-0.5 block whitespace-nowrap text-[11px] tabular-nums tracking-wide text-[#F6EEE6]/70 sm:text-xs">
                  {coordLabel}
                </span>
              </span>
            </span>
            <span
              className={`${heroSans.className} inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-white/15 bg-white/10 py-1.5 pl-4 pr-1.5 text-sm font-semibold transition-colors duration-300 group-hover:bg-white/20`}
            >
              <span>
                <span className="hidden sm:inline">Open in </span>Maps
              </span>
              <DiscArrow />
            </span>
          </motion.span>
        </a>
      </div>
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
    className="group flex min-h-16 items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 transition-colors duration-300 hover:border-orange/60 hover:bg-white/[0.08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
  >
    <span className="flex min-w-0 items-center gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0F0A12] text-[#F6EEE6] ring-1 ring-white/10 transition-colors duration-300 group-hover:bg-orange group-hover:text-[#1A0E17]">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-medium text-[#F6EEE6]/70">{label}</span>
        <span className="block text-base font-semibold leading-snug text-[#F6EEE6] [overflow-wrap:anywhere] sm:text-xl">
          {value}
        </span>
      </span>
    </span>
    <ArrowUpRight
      className="h-4 w-4 shrink-0 text-[#F6EEE6]/60 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange-light"
      aria-hidden="true"
    />
  </a>
);

const EnquiriesCard: React.FC = () => (
  <div className={`${glass} flex h-full flex-col p-6 text-[#F6EEE6] sm:p-8`}>
    <h3 className={`${heroSerif.className} text-3xl font-bold sm:text-4xl`}>Talk to the desk</h3>
    <p className="mt-2 text-sm text-[#F6EEE6]/70">Call, write or message the studio directly.</p>
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
      className={`${heroSans.className} group mt-6 inline-flex min-h-12 items-center justify-between gap-3 self-start rounded-full bg-orange py-1.5 pl-5 pr-1.5 text-sm font-bold uppercase tracking-[0.04em] text-[#1A0E17] transition-colors duration-300 hover:bg-orange-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-light`}
    >
      <span className="inline-flex items-center gap-2">
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        WhatsApp the studio
      </span>
      <DiscArrow className="h-9 w-9" />
    </a>
  </div>
);

const HoursCard: React.FC = () => {
  const status = useStudioStatus();
  const [state, groupText] = status.split(":");
  const today = status === "unknown" ? -1 : Number(groupText);
  const lead = hours[today >= 0 ? today : 0];

  return (
    <div className={`${glass} p-6 text-[#F6EEE6] sm:p-7`}>
      <div className="flex items-center justify-between gap-3">
        <p className="inline-flex items-center gap-2 text-sm font-medium text-[#F6EEE6]/75">
          <Clock className="h-4 w-4" aria-hidden="true" />
          Studio hours
        </p>
        {status !== "unknown" && (
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
              state === "open" ? "bg-[#86EFAC]/15 text-[#86EFAC]" : "bg-white/10 text-[#F6EEE6]/80"
            }`}
          >
            <span className="relative flex h-2 w-2">
              {state === "open" && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#86EFAC] opacity-60 motion-reduce:hidden" />
              )}
              <span className={`relative inline-flex h-2 w-2 rounded-full ${state === "open" ? "bg-[#86EFAC]" : "bg-[#F6EEE6]/50"}`} />
            </span>
            {state === "open" ? "Open now" : "Closed now"}
          </span>
        )}
      </div>

      {/* today's hours, set large like the reference's rating card */}
      <p className={`${heroCondensed.className} mt-5 text-5xl uppercase leading-none tracking-wide tabular-nums sm:text-6xl`}>
        {formatShort(lead.open)} – {formatShort(lead.close)}
      </p>
      <p className="mt-2 text-sm text-[#F6EEE6]/70">
        {lead.label} · {lead.days}
      </p>

      <ul className="mt-5 divide-y divide-white/10 border-t border-white/10">
        {hours.map((h, i) => (
          <li key={h.label} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3">
            <span className="flex items-baseline gap-2">
              <span className={`text-base font-semibold ${i === today ? "text-orange-light" : "text-[#F6EEE6]"}`}>{h.label}</span>
              <span className="text-xs text-[#F6EEE6]/65">{h.days}</span>
            </span>
            <span className="text-sm tabular-nums text-[#F6EEE6]/90">
              {formatTime(h.open)} – {formatTime(h.close)}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-[#F6EEE6]/65">All times IST. Site visits by appointment.</p>
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Section
 * ---------------------------------------------------------------------------------------------- */

/**
 * DesignDeskSection — homepage section 04: where to find and reach the studio.
 * A deep wine-to-plum glow (after the client's reference) holding: the heading and a glass hours card
 * (live "open now"), then the live map card (opens Google Maps at the studio's coordinates) with a cream
 * paper plane whose looping trail lands it pointing into the map, and the enquiries card (phone, email,
 * WhatsApp). The background melts into the footer below. On the way in, the section zooms open from an
 * inset card to full width.
 */
export const DesignDeskSection: React.FC = () => {
  const reduce = useHydratedReducedMotion();
  const play = (amount: number) =>
    reduce
      ? { initial: "hidden", animate: "still" }
      : { initial: "hidden", whileInView: "shown", viewport: { once: true, amount } };

  // Zoom-open entrance: as the section rises out of the Enquiry section it grows from an inset, rounder card
  // to full width while the glow inside zooms out (scroll-linked, spring-smoothed; static for reduced motion).
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "start 0.15"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const scale = useTransform(progress, [0, 1], [0.88, 1]);
  const extraRadius = useTransform(progress, [0, 1], [32, 0]);
  const radius = useMotionTemplate`calc(var(--desk-r) + ${extraRadius}px)`;
  const glowScale = useTransform(progress, [0, 1], [1.25, 1]);
  const glowY = useTransform(progress, [0, 1], [70, 0]);

  return (
    // While the card zooms open, its sides show the footer's #212121 below the Enquiry section (the first
    // 3rem/4rem stay transparent — that strip overlaps the Enquiry section, which shows through).
    <div className="relative z-10 -mt-12 bg-[linear-gradient(to_bottom,transparent_3rem,#212121_3rem)] sm:-mt-16 sm:bg-[linear-gradient(to_bottom,transparent_4rem,#212121_4rem)]">
    <motion.section
      ref={sectionRef}
      id="design-desk"
      aria-labelledby="design-desk-heading"
      className={`${heroSans.className} relative overflow-hidden bg-[#140A11] [--desk-r:32px] rounded-t-[32px] pb-24 pt-20 text-[#F6EEE6] sm:[--desk-r:44px] sm:rounded-t-[44px] sm:pb-32 sm:pt-28`}
      style={
        reduce
          ? undefined
          : { scale, borderTopLeftRadius: radius, borderTopRightRadius: radius, transformOrigin: "50% 0%" }
      }
    >
      {/* the wine → plum glow (zooms out as the section opens) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={reduce ? deskBackground : { ...deskBackground, scale: glowScale, y: glowY }}
      />

      {/* fine film grain over the glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
        {/* Heading + hours */}
        <motion.div {...play(0.4)} className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <motion.p
              data-reveal
              custom={0}
              variants={headerVariants}
              className="inline-flex items-center gap-4 text-base font-medium text-[#F6EEE6]/85 sm:text-lg"
            >
              Principal studio
              <DotRule className="w-16 sm:w-24" />
            </motion.p>
            <motion.h2
              data-reveal
              custom={1}
              variants={headerVariants}
              id="design-desk-heading"
              className={`${heroCondensed.className} mt-5 uppercase leading-[0.92] tracking-[0.005em] text-[15vw] sm:text-[10.5vw] lg:text-[6.2vw] 2xl:text-[6.25rem]`}
            >
              <span className="block">Design Desk</span>
              <span className="block">&amp; Consultation</span>
            </motion.h2>
          </div>
          <FoldCard index={0} className="lg:col-span-5 lg:justify-self-end lg:w-full lg:max-w-[440px]">
            <HoursCard />
          </FoldCard>
        </motion.div>

        {/* Hairline row, as in the reference */}
        <motion.div
          {...play(0.8)}
          className="mt-14 mb-10 flex items-center gap-4 sm:mt-20 sm:mb-14"
        >
          <motion.span data-reveal custom={0} variants={headerVariants} className="h-px flex-1 bg-[#F6EEE6]/25" aria-hidden="true" />
          <motion.span
            data-reveal
            custom={1}
            variants={headerVariants}
            className="inline-flex items-center gap-2.5 text-sm font-semibold sm:text-base"
          >
            <span className="h-2 w-2 rounded-full bg-[#F6EEE6]" aria-hidden="true" />
            Find the studio
          </motion.span>
        </motion.div>

        {/* Map (with the paper plane) + enquiries */}
        <motion.div {...play(0.2)} className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          <div className="relative mt-40 sm:mt-48 lg:col-span-7 lg:mt-0">
            <PaperPlane className="absolute right-[3%] top-0 z-20 w-[250px] -translate-y-[88%] sm:w-[330px] lg:w-[420px]" />
            <FoldCard index={1} className="h-full">
              <MapCard />
            </FoldCard>
          </div>
          <div className="flex flex-col gap-5 lg:col-span-5">
            <motion.p
              data-reveal
              custom={0.2}
              variants={riseVariants}
              className="max-w-md text-base leading-relaxed text-[#F6EEE6]/80 sm:text-lg"
            >
              Available for site visits, zoning assessments, and private client architectural briefings across
              Telangana and Karnataka.
            </motion.p>
            <FoldCard index={2} className="flex-1">
              <EnquiriesCard />
            </FoldCard>
          </div>
        </motion.div>
      </div>
    </motion.section>
    </div>
  );
};
