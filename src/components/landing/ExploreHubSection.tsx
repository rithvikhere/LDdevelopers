"use client";

import React, { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
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
import { siteContent } from "@/config/site-content";
import { ExploreBento } from "@/components/landing/explore/ExploreBento";
import { heroSerif } from "@/components/landing/hero-fonts";

// False during server render and hydration, true afterwards — lets client-only preferences
// (like reduced motion) change the markup without a hydration mismatch.
const noopSubscribe = () => () => {};
const useHydrated = () => useSyncExternalStore(noopSubscribe, () => true, () => false);

/**
 * Scroll-driven heading: the first word ("Explore") starts small inside the dark tab, travels and
 * grows with scroll until it lands in its place in the heading; the rest ("Our World") is then typed
 * out letter by letter in a heavy serif, in azure. Scrolling back up reverses both. Reduced motion shows the final state.
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

  const hydrated = useHydrated();
  const shown = hydrated && shouldReduceMotion ? rest.length : count;
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
        {/* "Our World": heavy didone (the hero's serif) in a soft azure — the complement of the page's orange */}
        <span className={`${heroSerif.className} font-extrabold tracking-[-0.015em] text-[#7DB6EC]`}>
          {rest.slice(0, shown)}
          <span
            className={`inline-block w-[3px] -mr-[3px] h-[0.8em] translate-y-[0.08em] bg-[#7DB6EC] align-baseline ${
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
 * The primary navigation system of the public website: the scroll-driven "Explore Our World" heading,
 * then a bento of five destination cards (About, Services, Construction Options, Gallery, Achievements).
 * Contact is not repeated here — it is Section 03, directly below.
 */
export const ExploreHubSection: React.FC = () => {
  const { title } = siteContent.explore;
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
        <div className="mb-10 sm:mb-14 lg:mb-16">
          <ScrollExploreHeading title={title} anchorRef={tabAnchorRef} />
        </div>

        <ExploreBento />
      </div>
      </div>
    </section>
  );
};
