"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { siteContent } from "@/config/site-content";
import {
  KairosDepthReveal,
  KairosStaggerContainer,
  kairosChildVariant,
} from "@/components/ui/KairosScrollReveal";

type Destination = (typeof siteContent.explore.destinations)[number];

/**
 * Progressive hairline divider — draws from left to right as it enters the viewport.
 */
const RevealLine: React.FC<{ className?: string }> = ({ className = "" }) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <span aria-hidden="true" className={`block h-px w-full bg-white/15 ${className}`} />;
  }

  return (
    <motion.span
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`block h-px w-full origin-left bg-white/15 ${className}`}
    />
  );
};

/**
 * One editorial index entry — number, serif title, description and directional arrow.
 */
const ExploreEntry: React.FC<{ item: Destination }> = ({ item }) => (
  <motion.div variants={kairosChildVariant}>
    <RevealLine />
    <Link
      href={item.href}
      className="group relative block py-8 sm:py-10 outline-none focus-visible:ring-1 focus-visible:ring-[#E67514] focus-visible:ring-offset-4 focus-visible:ring-offset-[#212121]"
    >
      {/* Brass hover rule that sweeps across the top hairline */}
      <span
        aria-hidden="true"
        className="absolute top-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-[#E67514] transition-transform duration-700 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />

      <div className="flex items-start gap-5 sm:gap-8">
        <span className="font-display text-5xl sm:text-6xl xl:text-7xl font-light leading-[0.85] tabular-nums text-[#06923E] transition-colors duration-500 group-hover:text-[#E67514] group-focus-visible:text-[#E67514] w-[3.25rem] sm:w-[4.5rem] xl:w-[5.25rem] shrink-0">
          {item.number}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-2xl sm:text-3xl xl:text-4xl font-light tracking-tight leading-[1.1] text-[#D3ECCD] transition-colors duration-500 group-hover:text-white">
              {item.label}
            </h3>

            <span
              aria-hidden="true"
              className="mt-1 shrink-0 w-10 h-10 sm:w-11 sm:h-11 border border-white/25 flex items-center justify-center text-[#D3ECCD] transition-all duration-500 group-hover:border-[#06923E] group-hover:bg-[#06923E] group-hover:text-white group-focus-visible:border-[#06923E]"
            >
              <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>

          <p className="mt-3 max-w-md text-xs sm:text-sm font-mono font-light leading-relaxed text-[#CADCAE]/80 transition-colors duration-500 group-hover:text-[#D3ECCD]">
            {item.description}
          </p>

          <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.28em] text-[#CADCAE]/70 transition-colors duration-500 group-hover:text-[#D3ECCD]">
            <span className="h-px w-6 bg-[#E67514] transition-all duration-500 group-hover:w-10" aria-hidden="true" />
            Open page
          </span>
        </div>
      </div>
    </Link>
  </motion.div>
);

/**
 * Scroll-driven heading: the first word ("Explore") starts small inside the dark tab, travels and
 * grows with scroll until it lands in its place in the heading; the rest ("Our World") is then typed
 * out letter by letter in orange. Scrolling back up reverses both. Reduced motion shows the final state.
 */
const ScrollExploreHeading: React.FC<{
  title: string;
  anchorRef: React.RefObject<HTMLSpanElement | null>;
}> = ({ title, anchorRef }) => {
  const shouldReduceMotion = useReducedMotion();
  const [first, ...restWords] = title.split(" ");
  const rest = restWords.join(" ");

  const slotRef = useRef<HTMLSpanElement>(null);

  // Offset (px) and starting scale that place the word inside the tab. Both elements live in the
  // same section, so the offset does not change while scrolling — only on resize / font load.
  const dx = useMotionValue(0);
  const dy = useMotionValue(0);
  const s0 = useMotionValue(1);
  // Page-scroll range over which the word travels (start: heading reaches the viewport bottom,
  // or the top of the page if it is already on screen; end: heading settled at ~38% of the viewport).
  const startY = useMotionValue(0);
  const endY = useMotionValue(1);

  const measure = useCallback(() => {
    const anchor = anchorRef.current;
    const slot = slotRef.current;
    if (!anchor || !slot) return;
    const a = anchor.getBoundingClientRect();
    const w = slot.getBoundingClientRect();
    const fontSize = parseFloat(getComputedStyle(slot).fontSize) || 1;
    const startScale = Math.min(1, a.height / fontSize);
    // Centre the scaled word on the anchor (the visual centre of the tab).
    dx.set(a.left + a.width / 2 - (w.left + (w.width * startScale) / 2));
    dy.set(a.top + a.height / 2 - (w.top + (w.height * startScale) / 2));
    s0.set(startScale);
    const slotTop = w.top + window.scrollY;
    const start = Math.max(0, slotTop - window.innerHeight);
    startY.set(start);
    endY.set(Math.max(start + 1, slotTop - window.innerHeight * 0.38));
  }, [anchorRef, dx, dy, s0, startY, endY]);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (slotRef.current) ro.observe(slotRef.current);
    if (anchorRef.current) ro.observe(anchorRef.current);
    document.fonts?.ready.then(measure).catch(() => {});
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, anchorRef]);

  const { scrollY } = useScroll();
  const rawProgress = useTransform([scrollY, startY, endY], ([y, a, b]: number[]) =>
    Math.min(1, Math.max(0, (y - a) / (b - a)))
  );
  const progress = useSpring(rawProgress, { stiffness: 170, damping: 32, mass: 0.35 });

  const x = useTransform([progress, dx], ([p, d]: number[]) => d * (1 - p));
  const y = useTransform([progress, dy], ([p, d]: number[]) => d * (1 - p));
  const scale = useTransform([progress, s0], ([p, s]: number[]) => s + (1 - s) * p);

  // Typewriter for the remaining words, started once the first word has landed.
  const [landed, setLanded] = useState(false);
  useMotionValueEvent(progress, "change", (p) => {
    if (p >= 0.97) setLanded(true);
    else if (p < 0.85) setLanded(false);
  });

  const typed = useMotionValue(0);
  const [count, setCount] = useState(0);
  useMotionValueEvent(typed, "change", (v) => setCount(Math.round(v)));

  useEffect(() => {
    if (shouldReduceMotion) return;
    const controls = animate(typed, landed ? rest.length : 0, {
      duration: landed ? rest.length * 0.085 : 0.25,
      ease: "linear",
    });
    return () => controls.stop();
  }, [landed, rest.length, shouldReduceMotion, typed]);

  const shown = shouldReduceMotion ? rest.length : count;
  const typing = !shouldReduceMotion && landed && shown < rest.length;

  return (
    <h2
      id="explore-heading"
      className="font-display text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.04] text-[#D3ECCD]"
    >
      {/* Full heading for assistive technology; the animated parts are hidden from it */}
      <span className="sr-only">{title}</span>
      <span aria-hidden="true">
        <span ref={slotRef} className="relative inline-block">
          <motion.span
            className="inline-block italic origin-top-left will-change-transform"
            style={shouldReduceMotion ? undefined : { x, y, scale }}
          >
            {first}
          </motion.span>
        </span>{" "}
        <span className="text-[#E67514]">
          {rest.slice(0, shown)}
          <span
            className={`inline-block w-[3px] -mr-[3px] h-[0.8em] translate-y-[0.08em] bg-[#E67514] align-baseline ${
              typing ? "animate-[caret-blink_0.9s_steps(1)_infinite]" : "opacity-0"
            }`}
          />
          <span className="invisible">{rest.slice(shown)}</span>
        </span>
      </span>
    </h2>
  );
};

/**
 * ExploreHubSection — Homepage Section 02 (dark, inverted)
 *
 * Sits above the hero: it overlaps the hero's lower edge on load and, on large screens,
 * slides up over the sticky hero while scrolling.
 *
 * The primary navigation system of the public website. An editorial, architectural index
 * that links to six independent content routes (same browser tab, Next.js <Link>).
 */
export const ExploreHubSection: React.FC = () => {
  const { title, subtitle, destinations } = siteContent.explore;
  const leftColumn = destinations.slice(0, 3);
  const rightColumn = destinations.slice(3);
  const tabAnchorRef = useRef<HTMLSpanElement>(null);

  return (
    <section
      id="explore"
      aria-labelledby="explore-heading"
      className="relative z-10 -mt-28 sm:-mt-32 lg:-mt-44 text-[#D3ECCD]"
    >
      {/* Raised tab on the top-left edge — the dark panel's silhouette, as in the reference */}
      {/* The tab overlaps the panel by 2px so no hairline seam shows between the two dark shapes. */}
      <div aria-hidden="true" className="relative h-10 sm:h-14 lg:h-16">
        <div className="absolute top-0 -bottom-[2px] left-0 w-[58%] sm:w-[44%] lg:w-[34%] bg-[#212121] rounded-tl-[28px] sm:rounded-tl-[40px] [clip-path:polygon(0_0,86%_0,100%_100%,0_100%)]" />
        {/* Landing spot for the travelling "Explore" word (its height = the word's size in the tab) */}
        {/* Centred in the tab: the tab is a trapezoid (86% top → 100% bottom), so its visual centre is ~46% across */}
        <div className="absolute inset-y-0 left-0 w-[58%] sm:w-[44%] lg:w-[34%] pointer-events-none">
          <div className="h-full w-[93%] flex items-center justify-center">
            <span ref={tabAnchorRef} className="block w-px h-5 sm:h-7 lg:h-8" />
          </div>
        </div>
      </div>

      <div className="relative bg-[#212121] rounded-tr-[28px] sm:rounded-tr-[40px] pt-12 sm:pt-16 lg:pt-20 pb-24 sm:pb-32 lg:pb-40">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Header — asymmetric editorial composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-14 sm:mb-20">
          <div className="lg:col-span-7">
            <ScrollExploreHeading title={title} anchorRef={tabAnchorRef} />
          </div>

          <div className="lg:col-span-5">
            <KairosDepthReveal delay={0.22}>
              <div className="lg:border-l lg:border-white/15 lg:pl-8">
                <p className="text-sm sm:text-base font-light leading-relaxed text-[#CADCAE]/85 max-w-md">
                  {subtitle}
                </p>
                <p className="mt-4 text-[10px] font-mono uppercase tracking-[0.28em] text-[#CADCAE]/70">
                  Six destinations &bull; Select to open
                </p>
              </div>
            </KairosDepthReveal>
          </div>
        </div>

        {/* Editorial index — two offset columns on desktop, single column on mobile */}
        <nav aria-label="Explore the website">
          <KairosStaggerContainer
            staggerDelay={0.09}
            className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-24"
          >
            <div>
              {leftColumn.map((item) => (
                <ExploreEntry key={item.href} item={item} />
              ))}
              <RevealLine />
            </div>

            <div className="lg:mt-24">
              {rightColumn.map((item) => (
                <ExploreEntry key={item.href} item={item} />
              ))}
              <RevealLine />
            </div>
          </KairosStaggerContainer>
        </nav>
      </div>
      </div>
    </section>
  );
};
