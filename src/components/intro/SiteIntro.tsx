"use client";

import React, { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import {
  animate,
  cubicBezier,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type AnimationPlaybackControls,
  type MotionValue,
} from "framer-motion";
import { LD_MARK, LD_OUTLINES } from "@/components/intro/ld-outline";
import { useIntro, type IntroPhase } from "@/components/intro/IntroProvider";

/** Timeline (seconds). One clock drives every layer so the sequence stays in sync and can be skipped. */
const T = {
  drawStart: 0.3,
  drawDuration: 1.4,
  drawStagger: 0.38,
  fillStart: 1.7,
  fillEnd: 2.45,
  strokeFadeStart: 2.25,
  strokeFadeEnd: 2.8,
  shineStart: 2.45,
  shineEnd: 3.1,
  travelStart: 3.15,
  travelEnd: 4.15,
  curtainStart: 3.2,
  curtainEnd: 4.05,
  reveal: 3.45,
  land: 4.15,
  colourStart: 4.15,
  colourEnd: 4.85,
  end: 4.95,
} as const;

const glide = cubicBezier(0.76, 0, 0.24, 1);
const pen = cubicBezier(0.65, 0, 0.35, 1);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const span = (v: number, a: number, b: number) => clamp01((v - a) / (b - a));

/** Length of the bright "pen tip" travelling along each outline, as a fraction of the path. */
const TIP = 0.045;

/** One traced outline: a thin line that draws itself, led by a bright pen tip. */
const Outline: React.FC<{ d: string; kind: "gold" | "dark"; index: number; clock: MotionValue<number> }> = ({
  d,
  kind,
  index,
  clock,
}) => {
  const start = T.drawStart + index * T.drawStagger;
  const end = start + T.drawDuration;
  const drawn = useTransform(clock, (v) => pen(span(v, start, end)));
  const lineOffset = useTransform(drawn, (f) => 1 - f);
  const tipOffset = useTransform(drawn, (f) => TIP - f);
  const tipOpacity = useTransform(clock, [start, start + 0.12, end - 0.12, end + 0.12], [0, 1, 1, 0]);
  const lineColour = kind === "gold" ? "#E2E2E2" : "#B8B8B8";

  return (
    <g>
      <motion.path
        d={d}
        pathLength={1}
        fill="none"
        stroke={lineColour}
        strokeWidth={4.4}
        strokeLinejoin="round"
        strokeDasharray="1 1"
        style={{ strokeDashoffset: lineOffset }}
      />
      <motion.path
        d={d}
        pathLength={1}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={8}
        strokeLinecap="round"
        strokeDasharray={`${TIP} 2`}
        style={{ strokeDashoffset: tipOffset, opacity: tipOpacity }}
        filter="url(#ld-intro-tip)"
      />
    </g>
  );
};

/**
 * SiteIntro — homepage intro, shown once per page load.
 *
 * Black screen → the LD mark is drawn from scratch by crisp light lines (buildings, then the D) → it fills in,
 * in monochrome (silver/charcoal with a soft grey rim), with a single shine → it glides to the hero's top-left
 * brand slot while the black curtain lifts → the logo's colour fades in. Reduced motion skips it entirely.
 */
export const SiteIntro: React.FC = () => {
  const { advance } = useIntro();
  const clock = useMotionValue(0);
  const controls = useRef<AnimationPlaybackControls | null>(null);
  const unlockScroll = useRef<(() => void) | null>(null);
  const reached = useRef<IntroPhase>(0);
  const measured = useRef(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // Travel target (offset + scale from the centred mark to the hero brand mark), measured at runtime.
  const dx = useMotionValue(0);
  const dy = useMotionValue(0);
  const endScale = useMotionValue(0.2);

  const measure = useCallback(() => {
    const box = boxRef.current;
    const mark = document.getElementById("hero-brand-mark");
    if (!box || !mark) return;
    const b = box.getBoundingClientRect();
    const m = mark.getBoundingClientRect();
    if (!b.height || !m.height) return;
    dx.set(m.left + m.width / 2 - (b.left + b.width / 2));
    dy.set(m.top + m.height / 2 - (b.top + b.height / 2));
    endScale.set(m.height / b.height);
  }, [dx, dy, endScale]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      advance(3);
      return;
    }
    window.scrollTo(0, 0);
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";
    unlockScroll.current = () => {
      html.style.overflow = previous;
      unlockScroll.current = null;
    };

    measure();
    controls.current = animate(clock, T.end, { duration: T.end, ease: "linear" });

    const onResize = () => {
      if (clock.get() < T.travelStart - 0.1) measure();
    };
    window.addEventListener("resize", onResize);
    return () => {
      controls.current?.stop();
      unlockScroll.current?.();
      window.removeEventListener("resize", onResize);
    };
  }, [advance, clock, measure]);

  // Skip straight to the hand-off (logo complete → travels into the hero).
  const skip = useCallback(() => {
    const jumpTo = T.travelStart - 0.15;
    if (clock.get() >= jumpTo) return;
    controls.current?.stop();
    clock.set(jumpTo);
    controls.current = animate(clock, T.end, { duration: T.end - jumpTo, ease: "linear" });
  }, [clock]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") skip();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [skip]);

  useMotionValueEvent(clock, "change", (v) => {
    if (!measured.current && v >= T.travelStart - 0.1) {
      measured.current = true;
      measure();
    }
    const next: IntroPhase = v >= T.end ? 3 : v >= T.land ? 2 : v >= T.reveal ? 1 : 0;
    if (next > reached.current) {
      reached.current = next;
      if (next >= 2) {
        unlockScroll.current?.();
        const hash = window.location.hash.slice(1);
        if (hash) document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }
      advance(next);
    }
  });

  // Layers
  const travel = useTransform(clock, (v) => glide(span(v, T.travelStart, T.travelEnd)));
  const x = useTransform([travel, dx], ([p, d]: number[]) => d * p);
  const y = useTransform([travel, dy], ([p, d]: number[]) => d * p);
  const scale = useTransform([travel, endScale], ([p, s]: number[]) => 1 + (s - 1) * p);

  const curtain = useTransform(
    clock,
    (v) => `inset(0% 0% ${(glide(span(v, T.curtainStart, T.curtainEnd)) * 100).toFixed(3)}% 0%)`
  );
  const fillOpacity = useTransform(clock, [T.fillStart, T.fillEnd], [0, 1]);
  // Monochrome (silver/charcoal) during the intro; colour fades in once the mark has landed top-left
  const fillFilter = useTransform(clock, (v) => {
    const blur = 6 * (1 - span(v, T.fillStart, T.fillEnd));
    const grey = 1 - span(v, T.colourStart, T.colourEnd);
    return `blur(${blur.toFixed(2)}px) grayscale(${grey.toFixed(3)}) brightness(${(1 + 0.08 * grey).toFixed(3)}) contrast(${(1 + 0.06 * grey).toFixed(3)})`;
  });
  const strokeOpacity = useTransform(
    clock,
    [T.strokeFadeStart, T.strokeFadeEnd, T.travelStart, T.travelStart + 0.4],
    [1, 0.35, 0.35, 0]
  );
  const shinePosition = useTransform(clock, [T.shineStart, T.shineEnd], ["130% 0%", "-30% 0%"]);
  const shineOpacity = useTransform(
    clock,
    [T.shineStart, T.shineStart + 0.1, T.shineEnd - 0.1, T.shineEnd],
    [0, 1, 1, 0]
  );
  const skipOpacity = useTransform(clock, [0.6, 1.0, T.travelStart - 0.35, T.travelStart - 0.15], [0, 1, 1, 0]);
  const pointerEvents = useTransform(clock, (v) => (v >= T.reveal ? "none" : "auto"));

  return (
    <motion.div className="site-intro fixed inset-0 z-[100]" data-state="active" style={{ pointerEvents }}>
      {/* Black stage — lifts like a curtain to reveal the site */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-black"
        style={{ clipPath: curtain, WebkitClipPath: curtain }}
      />

      {/* The mark */}
      {/* pb-[8vh] lifts the mark's starting point slightly above the true centre (by 4vh) */}
      <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center pb-[8vh] pointer-events-none">
        <motion.div
          ref={boxRef}
          className="relative will-change-transform"
          style={{
            x,
            y,
            scale,
            height: "clamp(170px, 30vh, 270px)",
            aspectRatio: `${LD_MARK.width} / ${LD_MARK.height}`,
          }}
        >
          <motion.div className="absolute inset-0" style={{ opacity: fillOpacity, filter: fillFilter }}>
            <Image src={LD_MARK.src} alt="" fill unoptimized loading="eager" className="object-contain" />
          </motion.div>

          {/* One soft shine across the finished mark */}
          <motion.div
            className="absolute inset-0"
            style={{
              opacity: shineOpacity,
              backgroundImage:
                "linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.7) 50%, transparent 62%)",
              backgroundSize: "260% 100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: shinePosition,
              WebkitMaskImage: `url(${LD_MARK.src})`,
              maskImage: `url(${LD_MARK.src})`,
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
            }}
          />

          <motion.svg
            viewBox={`0 0 ${LD_MARK.width} ${LD_MARK.height}`}
            className="absolute inset-0 h-full w-full overflow-visible"
            style={{ opacity: strokeOpacity }}
          >
            <defs>
              {/* Small highlight on the moving pen tip only — no glow halos */}
              <filter id="ld-intro-tip" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {LD_OUTLINES.map((o, i) => (
              <Outline key={o.order} d={o.d} kind={o.kind} index={i} clock={clock} />
            ))}
          </motion.svg>
        </motion.div>
      </div>

      <motion.button
        type="button"
        onClick={skip}
        style={{ opacity: skipOpacity }}
        className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 px-3 py-2 text-[11px] uppercase tracking-[0.32em] text-white/55 hover:text-white focus-visible:text-white transition-colors outline-none focus-visible:ring-1 focus-visible:ring-white/60 rounded-sm cursor-pointer"
      >
        Skip intro
      </motion.button>
    </motion.div>
  );
};
