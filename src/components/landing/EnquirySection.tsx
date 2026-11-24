"use client";

import React, { useId, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, type Variants } from "framer-motion";
import { ArrowUpRight, CheckCircle2, MessageCircle, RotateCcw } from "lucide-react";
import { submitPublicEnquiryAction } from "@/app/actions/enquiries";
import { contactWhatsappUrl } from "@/components/landing/ContactInfoCard";
import { EnquiryBackdrop } from "@/components/landing/EnquiryBackdrop";
import { useHydratedReducedMotion } from "@/hooks/useHydrated";

/* -------------------------------------------------------------------------------------------------
 * Motion
 * Everything mounts "hidden" (as server-rendered). In view it plays "shown"; with reduced motion it
 * switches to "still" — the final state with no transition.
 * ---------------------------------------------------------------------------------------------- */
const ease = [0.16, 1, 0.3, 1] as const;
const inOut = [0.65, 0, 0.35, 1] as const;
const still = { duration: 0 };

// Headline lines rise out of a mask with a slight rotation
const lineVariants: Variants = {
  hidden: { y: "110%", rotate: 3.5 },
  shown: (i: number) => ({ y: "0%", rotate: 0, transition: { duration: 1.05, delay: 0.1 + i * 0.13, ease } }),
  still: { y: "0%", rotate: 0, transition: still },
};

const fadeVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  shown: (delay: number) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay, ease } }),
  still: { opacity: 1, y: 0, transition: still },
};

// Handwritten words are "written" left to right, then an annotation is drawn around them
const writeVariants: Variants = {
  hidden: { clipPath: "inset(0% 100% 0% 0%)" },
  shown: (delay: number) => ({
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.75, delay, ease: inOut },
    transitionEnd: { clipPath: "none" },
  }),
  still: { clipPath: "none", transition: still },
};

const drawVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  shown: (delay: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 0.7, delay, ease: "easeInOut" }, opacity: { duration: 0.01, delay } },
  }),
  still: { pathLength: 1, opacity: 1, transition: still },
};

// The form card is dropped onto the desk: it falls in tilted, settles flat with a small bounce, and its
// shadow tightens as it lands. A blueprint scan line then "prints" the contents from top to bottom.
const cardVariants: Variants = {
  hidden: { opacity: 0, y: -120, rotateX: 40, rotateZ: -7, scale: 1.05 },
  shown: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    rotateZ: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 90, damping: 12.5, mass: 0.9, opacity: { duration: 0.3 } },
  },
  still: { opacity: 1, y: 0, rotateX: 0, rotateZ: 0, scale: 1, transition: still },
};

const shadowVariants: Variants = {
  hidden: { opacity: 0, scaleX: 0.45, scaleY: 0.5 },
  shown: { opacity: 1, scaleX: 1, scaleY: 1, transition: { duration: 0.95, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] } },
  still: { opacity: 1, scaleX: 1, scaleY: 1, transition: still },
};

const PRINT_DELAY = 0.75;
const PRINT_DURATION = 1.25;

const printVariants: Variants = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)" },
  shown: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { delay: PRINT_DELAY, duration: PRINT_DURATION, ease: inOut },
    transitionEnd: { clipPath: "none" },
  },
  still: { clipPath: "none", transition: still },
};

const scanVariants: Variants = {
  hidden: { top: "0%", opacity: 0 },
  shown: {
    top: "100%",
    opacity: [0, 1, 1, 0],
    transition: {
      top: { delay: PRINT_DELAY, duration: PRINT_DURATION, ease: inOut },
      opacity: { delay: PRINT_DELAY, duration: PRINT_DURATION, times: [0, 0.08, 0.86, 1] },
    },
  },
  still: { opacity: 0, transition: still },
};

const cornerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  shown: (i: number) => ({ opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.55 + i * 0.06, ease } }),
  still: { opacity: 1, scale: 1, transition: still },
};

/* -------------------------------------------------------------------------------------------------
 * Pieces
 * ---------------------------------------------------------------------------------------------- */

/** A headline line that rises out of its own mask. */
const RiseLine: React.FC<{ index: number; nowrap?: boolean; children: React.ReactNode }> = ({ index, nowrap, children }) => (
  <span className={`block overflow-hidden ${nowrap ? "whitespace-nowrap" : ""} pt-[0.1em] -mt-[0.1em] pb-[0.16em] -mb-[0.16em] pr-[0.12em]`}>
    <motion.span data-reveal custom={index} variants={lineVariants} className="block origin-[0%_100%]">
      {children}
    </motion.span>
  </span>
);

/** A word in the architect's hand, in light orange, with a hand-drawn loop or underline. */
const Annotated: React.FC<{ children: string; mark: "loop" | "underline"; delay: number }> = ({
  children,
  mark,
  delay,
}) => (
  <span
    className={`relative inline-block whitespace-nowrap px-[0.1em] text-orange-light ${
      mark === "loop" ? "mx-[0.3em]" : ""
    }`}
  >
    <motion.span
      data-reveal
      custom={delay}
      variants={writeVariants}
      className="font-hand inline-block text-[1.2em] leading-none align-[-0.04em]"
    >
      {children}
    </motion.span>
    {mark === "loop" ? (
      <svg
        aria-hidden="true"
        viewBox="0 0 120 56"
        preserveAspectRatio="none"
        fill="none"
        className="pointer-events-none absolute -left-[16%] -top-[34%] h-[164%] w-[130%] overflow-visible"
      >
        <motion.path
          data-reveal
          custom={delay + 0.6}
          variants={drawVariants}
          d="M96 9C70-1 22 3 10 22c-10 16 14 30 46 31 34 1 60-9 59-25-1-15-30-23-58-21"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    ) : (
      <svg
        aria-hidden="true"
        viewBox="0 0 100 16"
        preserveAspectRatio="none"
        fill="none"
        className="pointer-events-none absolute left-[2%] -bottom-[0.28em] h-[0.42em] w-[98%] overflow-visible"
      >
        <motion.path
          data-reveal
          custom={delay + 0.6}
          variants={drawVariants}
          d="M3 10C22 5 46 3 64 6s27 6 33 1"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <motion.path
          data-reveal
          custom={delay + 0.9}
          variants={drawVariants}
          d="M14 14c18-3 40-4 60-1"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.8"
        />
      </svg>
    )}
  </span>
);

/** Blueprint registration marks in the four corners of the form card. */
const CornerMarks: React.FC = () => (
  <>
    {[
      "left-3 top-3 border-l border-t",
      "right-3 top-3 border-r border-t",
      "left-3 bottom-3 border-l border-b",
      "right-3 bottom-3 border-r border-b",
    ].map((pos, i) => (
      <motion.span
        key={pos}
        aria-hidden="true"
        data-reveal
        custom={i}
        variants={cornerVariants}
        className={`pointer-events-none absolute h-4 w-4 border-blueprint-200/45 ${pos}`}
      />
    ))}
  </>
);

/* -------------------------------------------------------------------------------------------------
 * Form
 * ---------------------------------------------------------------------------------------------- */
interface FormDataState {
  fullName: string;
  phone: string;
  buildingType: string;
  location: string;
  visionNotes: string;
}

interface FormErrorsState {
  fullName?: string;
  phone?: string;
}

const BUILDING_TYPES = [
  "Bespoke Residential Architecture",
  "Duplexes & Multi-Level Living",
  "Luxury Villas & Private Estates",
  "Commercial Buildings & Landmarks",
  "Strategic Land Investing",
  "Property Buying & Selling",
];

const EMPTY_FORM: FormDataState = {
  fullName: "",
  phone: "",
  buildingType: BUILDING_TYPES[0],
  location: "",
  visionNotes: "",
};

const labelClass = "block text-[11px] lg:text-xs font-mono uppercase tracking-[0.16em] text-cream/75 font-semibold mb-2";
const fieldClass =
  "w-full rounded-xl bg-white/[0.06] border text-cream text-sm lg:text-[15px] font-medium px-4 py-3 lg:px-5 lg:py-3.5 outline-none transition-colors duration-200 placeholder:text-cream/55 focus:bg-white/[0.09] focus:border-blueprint-200 focus:ring-2 focus:ring-blueprint-200/25";
const fieldBorder = (invalid?: boolean) => (invalid ? "border-[#F87171]" : "border-white/15 hover:border-white/25");

const EnquiryForm: React.FC = () => {
  const uid = useId();
  const ids = {
    name: `${uid}-name`,
    phone: `${uid}-phone`,
    type: `${uid}-type`,
    location: `${uid}-location`,
    notes: `${uid}-notes`,
    nameError: `${uid}-name-error`,
    phoneError: `${uid}-phone-error`,
  };

  const [formData, setFormData] = useState<FormDataState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrorsState>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<{ data: FormDataState; refCode: string; timestamp: string } | null>(
    null
  );

  const validate = (): boolean => {
    const next: FormErrorsState = {};
    if (!formData.fullName.trim()) {
      next.fullName = "Please provide your full legal or representative name.";
    } else if (formData.fullName.trim().length < 2) {
      next.fullName = "Name must contain at least 2 characters.";
    }
    if (!formData.phone.trim()) {
      next.phone = "Phone number is required for architectural consultation.";
    } else {
      const cleaned = formData.phone.replace(/[\s\-\(\)\+]/g, "");
      if (cleaned.length < 10 || cleaned.length > 15) {
        next.phone = "Please enter a valid 10-digit phone number.";
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setServerError(null);
    try {
      const res = await submitPublicEnquiryAction({
        fullName: formData.fullName,
        phone: formData.phone,
        buildingType: formData.buildingType,
        location: formData.location,
        visionNotes: formData.visionNotes,
      });
      if (res.success && res.enquiryNumber) {
        setSubmitted({
          data: { ...formData },
          refCode: res.enquiryNumber,
          timestamp: new Date().toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        });
      } else {
        setServerError(res.error || "Failed to record enquiry. Please retry or contact us directly via WhatsApp.");
      }
    } catch (err) {
      console.error("Enquiry submission error:", err);
      setServerError("Network error registering enquiry. Please reach out directly on WhatsApp or phone.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(null);
    setFormData(EMPTY_FORM);
    setErrors({});
  };

  if (submitted) {
    const rows = [
      ["Name", submitted.data.fullName],
      ["Phone", submitted.data.phone],
      ["Project type", submitted.data.buildingType],
      ["Site / plot", submitted.data.location || "To be discussed"],
    ];
    return (
      <div className="space-y-6" role="status">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blueprint-200/30 bg-blueprint-200/10 p-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-blueprint-200" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-cream">Your idea is on our desk</p>
              <p className="text-[11px] font-mono text-cream/65">{submitted.timestamp}</p>
            </div>
          </div>
          <span className="rounded-full bg-cream px-3 py-1 font-mono text-xs font-semibold text-ink">
            {submitted.refCode}
          </span>
        </div>

        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {rows.map(([term, value]) => (
            <div key={term} className="rounded-xl border border-white/10 bg-white/[0.04] p-3.5">
              <dt className="text-[10px] font-mono uppercase tracking-[0.16em] text-cream/60">{term}</dt>
              <dd className="mt-1 text-sm font-medium text-cream">{value}</dd>
            </div>
          ))}
        </dl>

        {submitted.data.visionNotes && (
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3.5">
            <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-cream/60">Your notes</p>
            <p className="mt-1 font-display text-lg italic text-cream">&ldquo;{submitted.data.visionNotes}&rdquo;</p>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-xs font-mono font-semibold uppercase tracking-[0.14em] text-cream/80 transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blueprint-200"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Send another
          </button>
          <a
            href={contactWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-[0.14em] text-orange-light transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blueprint-200"
          >
            Follow up on WhatsApp
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 lg:space-y-6">
      {serverError && (
        <div role="alert" className="rounded-xl border border-[#F87171]/50 bg-[#F87171]/10 p-3 text-sm text-[#FECACA]">
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1 lg:gap-6 xl:grid-cols-2">
        <div>
          <label htmlFor={ids.name} className={labelClass}>
            Your name <span aria-hidden="true">*</span>
          </label>
          <input
            id={ids.name}
            type="text"
            autoComplete="name"
            required
            value={formData.fullName}
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? ids.nameError : undefined}
            onChange={(e) => {
              setFormData({ ...formData, fullName: e.target.value });
              if (errors.fullName) setErrors({ ...errors, fullName: undefined });
            }}
            placeholder="e.g., Rajeshwari Rao"
            className={`${fieldClass} ${fieldBorder(!!errors.fullName)}`}
          />
          {errors.fullName && (
            <p id={ids.nameError} className="mt-1.5 text-xs font-medium text-[#FCA5A5]">
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={ids.phone} className={labelClass}>
            Phone <span aria-hidden="true">*</span>
          </label>
          <input
            id={ids.phone}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            required
            value={formData.phone}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? ids.phoneError : undefined}
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value });
              if (errors.phone) setErrors({ ...errors, phone: undefined });
            }}
            placeholder="+91 98450 12345"
            className={`${fieldClass} ${fieldBorder(!!errors.phone)}`}
          />
          {errors.phone && (
            <p id={ids.phoneError} className="mt-1.5 text-xs font-medium text-[#FCA5A5]">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor={ids.type} className={labelClass}>
          Project type
        </label>
        <select
          id={ids.type}
          value={formData.buildingType}
          onChange={(e) => setFormData({ ...formData, buildingType: e.target.value })}
          className={`${fieldClass} ${fieldBorder()} cursor-pointer [color-scheme:dark] [&>option]:bg-[#10151F] [&>option]:text-cream`}
        >
          {BUILDING_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={ids.location} className={labelClass}>
          Site location or plot
        </label>
        <input
          id={ids.location}
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          placeholder="e.g., Hosur, 2,400 sq.ft plot"
          className={`${fieldClass} ${fieldBorder()}`}
        />
      </div>

      <div>
        <label htmlFor={ids.notes} className={labelClass}>
          Tell us about your idea
        </label>
        <textarea
          id={ids.notes}
          rows={3}
          value={formData.visionNotes}
          onChange={(e) => setFormData({ ...formData, visionNotes: e.target.value })}
          placeholder="Style, size, timeline — whatever you have in mind…"
          className={`${fieldClass} ${fieldBorder()} resize-none lg:min-h-36`}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="group mt-1 inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-cream px-6 py-3.5 text-sm font-semibold lg:min-h-14 lg:text-base text-ink shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] transition-colors duration-300 hover:bg-orange disabled:cursor-wait disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blueprint-200"
      >
        <span>{isSubmitting ? "Sending to our desk…" : "Send my idea"}</span>
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </button>
    </form>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Section
 * ---------------------------------------------------------------------------------------------- */

/**
 * EnquirySection — homepage section 03: "Have a project? Let's talk."
 *
 * - Coming from the dark Explore panel, the blueprint board tilts up into place like a drafting table being
 *   raised (scroll-linked rotation, scale and lift), over a living blueprint backdrop that follows the pointer.
 * - Big poster headline; "idea" and "free" are written in an architect's hand with drawn annotations.
 * - The enquiry form sits on a dark translucent card that is dropped onto the desk and then printed in by a
 *   blueprint scan line.
 * Reduced motion: everything is shown in its final place, with a still backdrop.
 */
export const EnquirySection: React.FC = () => {
  const reduce = useHydratedReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Drafting-board tilt: from tilted back (and slightly turned) to upright as the section scrolls in
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "start 0.2"] });
  const rise = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.35 });
  const rotateX = useTransform(rise, [0, 1], [24, 0]);
  const rotateZ = useTransform(rise, [0, 1], [-2.4, 0]);
  const scale = useTransform(rise, [0, 1], [0.9, 1]);
  const lift = useTransform(rise, [0, 1], [36, 0]);

  // Variant driving for each animated group
  const play = (amount: number) =>
    reduce
      ? { initial: "hidden", animate: "still" }
      : { initial: "hidden", whileInView: "shown", viewport: { once: true, amount } };

  return (
    <section
      ref={sectionRef}
      id="enquiry"
      aria-labelledby="enquiry-heading"
      className="relative bg-ink pt-4 [perspective:1700px] sm:pt-8"
    >
      <motion.div
        data-reveal
        style={reduce ? undefined : { rotateX, rotateZ, scale, y: lift, transformOrigin: "50% 100%" }}
        className="relative overflow-hidden rounded-t-[32px] bg-blueprint-900 text-cream will-change-transform sm:rounded-t-[44px]"
      >
        <EnquiryBackdrop className="absolute inset-0" />
        <div className="bg-blueprint-grid pointer-events-none absolute inset-0" aria-hidden="true" />

        <div className="relative z-10 mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-16 px-4 pb-32 pt-20 sm:px-6 sm:pb-40 sm:pt-28 lg:grid-cols-12 lg:gap-12 lg:px-12 lg:pb-48 lg:pt-36">
          {/* Headline */}
          <motion.div {...play(0.45)} className="lg:col-span-6">
            <motion.p
              data-reveal
              custom={0}
              variants={fadeVariants}
              className="mb-8 inline-flex items-center gap-3 text-[11px] font-mono font-semibold uppercase tracking-[0.32em] text-blueprint-200"
            >
              <span className="h-px w-10 bg-blueprint-200/70" aria-hidden="true" />
              Enquiry desk
            </motion.p>

            <h2
              id="enquiry-heading"
              className="font-poster text-[clamp(3.75rem,10.6vw,9.75rem)] uppercase leading-[0.95] tracking-[0.005em] text-cream"
            >
              <RiseLine index={0}>Have a project?</RiseLine>
              <RiseLine index={1} nowrap>
                Let&apos;s{" "}
                <span className="font-display text-[1.06em] font-semibold normal-case italic leading-[0] tracking-[-0.02em]">
                  talk
                </span>
                .
              </RiseLine>
            </h2>

            <motion.p
              data-reveal
              custom={0.55}
              variants={fadeVariants}
              className="mt-10 max-w-xl text-xl font-light leading-relaxed text-cream/85 sm:text-2xl lg:text-[1.7rem]"
            >
              Your{" "}
              <Annotated mark="loop" delay={0.95}>
                idea
              </Annotated>{" "}
              can land on our desk — for{" "}
              <Annotated mark="underline" delay={1.35}>
                free
              </Annotated>
              .
            </motion.p>

            <motion.a
              data-reveal
              custom={0.8}
              variants={fadeVariants}
              href={contactWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 inline-flex min-h-11 items-center gap-3 text-sm text-cream/80 transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blueprint-200"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/25 transition-colors group-hover:border-orange-light group-hover:text-orange-light">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
              </span>
              Prefer to chat? WhatsApp the studio
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </motion.a>
          </motion.div>

          {/* Form card, dropped onto the desk */}
          <motion.div {...play(0.3)} className="relative w-full lg:col-span-6 lg:max-w-[660px] lg:justify-self-end [perspective:1400px]">
            <motion.div
              aria-hidden="true"
              data-reveal
              variants={shadowVariants}
              className="pointer-events-none absolute inset-x-8 -bottom-8 h-16 rounded-[50%] bg-black/55 blur-2xl"
            />
            <motion.div
              data-reveal
              variants={cardVariants}
              style={{ transformOrigin: "50% 100%" }}
              className="relative overflow-hidden rounded-[28px] border border-white/15 bg-glass shadow-[0_40px_80px_-30px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl"
            >
              <CornerMarks />
              <motion.span
                aria-hidden="true"
                variants={scanVariants}
                className="pointer-events-none absolute inset-x-0 z-20 h-px bg-blueprint-200 shadow-[0_0_18px_3px_rgba(181,208,240,0.55)] motion-reduce:hidden"
              />
              <motion.div data-reveal variants={printVariants} className="p-6 sm:p-9 lg:p-11">
                <div className="mb-7 border-b border-white/10 pb-6 lg:mb-8 lg:pb-7">
                  <p className="text-[11px] font-mono font-semibold uppercase tracking-[0.28em] text-blueprint-200">
                    Intake desk
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-medium text-cream sm:text-4xl lg:text-[2.85rem] lg:leading-tight">Start your enquiry</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/70 lg:text-base">
                    Share a few details and our design desk will get back to you.
                  </p>
                </div>
                <EnquiryForm />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
