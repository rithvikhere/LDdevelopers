"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { HeroBrand } from "@/components/brand/HeroBrand";
import { useIntroPhase } from "@/components/intro/IntroProvider";
import { useHydratedReducedMotion } from "@/hooks/useHydrated";

const HEADLINE = "Sculpting Enduring Spaces, Defining Modern Living.";
const ease = [0.16, 1, 0.3, 1] as const;

// The 3D depth effect only runs where the hero is sticky (large screens).
const DESKTOP_QUERY = "(min-width: 1024px)";
const subscribeDesktop = (onChange: () => void) => {
  const mq = window.matchMedia(DESKTOP_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};
const getDesktop = () => window.matchMedia(DESKTOP_QUERY).matches;
const getDesktopServer = () => false;

// "still" is the final state with no transition, used for reduced motion.
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (delay: number) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay, ease } }),
  still: { opacity: 1, y: 0, transition: { duration: 0 } },
};

const word: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(10px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, delay: 0.12 + i * 0.085, ease },
  }),
  still: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0 } },
};

/**
 * HeroSection — editorial split hero with a rising architectural residence.
 *
 * - Top-left: the LD brand (the intro's mark lands here on first load).
 * - Left: label, bold headline (revealed word by word after the intro), brief and pill CTAs.
 * - Right: the residence rising from the bottom once loaded.
 * - Large screens: the hero is sticky; as the dark Explore panel slides over it, the hero recedes like a
 *   card — zooming out, tilting back slightly and dimming — for a smooth 3D hand-off.
 *
 * Note: the animated ArchitecturalLineArt (handshake & skyline) is intentionally not used here
 * any more. The component is kept at src/components/hero/ArchitecturalLineArt.tsx for later use.
 */
export const HeroSection: React.FC = () => {
  // false while hydrating (matches the server HTML); reduced-motion visitors jump to the final state right after
  const shouldReduceMotion = useHydratedReducedMotion();
  const phase = useIntroPhase();
  const show = phase >= 1 || shouldReduceMotion;

  // The residence starts rising only once its image has actually loaded, so the motion is never missed.
  const [houseLoaded, setHouseLoaded] = useState(false);

  // --- 3D depth while the Explore panel slides over (desktop only) -------------------------------
  const isDesktop = useSyncExternalStore(subscribeDesktop, getDesktop, getDesktopServer);
  const depthOn = isDesktop && !shouldReduceMotion;

  const { scrollY } = useScroll();
  const viewport = useMotionValue(900);
  useEffect(() => {
    const update = () => viewport.set(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [viewport]);

  const depthRaw = useTransform([scrollY, viewport], ([y, h]: number[]) => Math.min(1, Math.max(0, y / (h * 0.9))));
  const depth = useSpring(depthRaw, { stiffness: 110, damping: 26, mass: 0.45 });
  const cardScale = useTransform(depth, [0, 1], [1, 0.86]);
  const cardTilt = useTransform(depth, [0, 1], [0, 7]);
  const cardRadius = useTransform(depth, [0, 1], [0, 40]);
  const cardShade = useTransform(depth, [0, 1], [0, 0.55]);
  const backdrop = useTransform(depth, [0, 0.55], [0, 1]);

  // Smoothly scrolls to a homepage section (no navbar offset — the global navbar was removed).
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: offset, behavior: shouldReduceMotion ? "auto" : "smooth" });
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  // Everything mounts "hidden" (as server-rendered). Reduced motion switches to "still", which snaps to
  // the final state; otherwise "show" plays the entrance once the intro reveals the site.
  const target = shouldReduceMotion ? "still" : show ? "show" : "hidden";

  return (
    <section
      id="home"
      className="relative lg:sticky lg:top-0 z-0 min-h-[100svh] text-[#212121] lg:[perspective:1600px]"
    >
      {/* Darkness the hero recedes into (desktop) */}
      {depthOn && (
        <motion.div aria-hidden="true" className="absolute inset-0 bg-[#212121]" style={{ opacity: backdrop }} />
      )}

      <motion.div
        className="relative min-h-[100svh] overflow-hidden bg-[#CADCAE] origin-[50%_35%] will-change-transform"
        style={depthOn ? { scale: cardScale, rotateX: cardTilt, borderRadius: cardRadius } : undefined}
      >
        {/* Low-contrast dark olive architectural grid */}
        <div className="absolute inset-0 bg-hero-grid pointer-events-none" aria-hidden="true" />

        {/* Brand — top-left (the intro's mark lands here) */}
        <div className="absolute inset-x-0 top-0 z-30">
          <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 pt-5 sm:pt-7 lg:pt-8">
            <HeroBrand />
          </div>
        </div>

        <div className="relative z-20 w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 pt-28 sm:pt-32 lg:pt-32 xl:pt-36 pb-6 sm:pb-10 lg:pb-64 xl:pb-72">
          <div className="w-full lg:max-w-[56%] xl:max-w-[54%] flex flex-col items-start">
            {/* Label */}
            <motion.span
              variants={fadeUp}
              custom={0.02}
              initial="hidden"
              animate={target}
              className="text-[11px] sm:text-xs uppercase tracking-[0.42em] text-[#212121]/75 font-medium mb-6 sm:mb-8"
            >
              Architectural Excellence &amp; Turnkey Construction
            </motion.span>

            {/* Headline — revealed word by word */}
            <h1 className="font-sans font-bold uppercase text-[2.4rem] leading-[1.04] sm:text-[3.25rem] lg:text-[3.4rem] xl:text-[4rem] tracking-[-0.02em] text-[#212121] mb-6 sm:mb-8">
              {HEADLINE.split(" ").map((w, i, all) => (
                <React.Fragment key={`${w}-${i}`}>
                  <motion.span variants={word} custom={i} initial="hidden" animate={target} className="inline-block">
                    {w}
                  </motion.span>
                  {i < all.length - 1 ? " " : null}
                </React.Fragment>
              ))}
            </h1>

            {/* Supporting text */}
            <motion.p
              variants={fadeUp}
              custom={0.75}
              initial="hidden"
              animate={target}
              className="text-sm sm:text-base text-[#212121]/75 leading-relaxed max-w-md mb-8 sm:mb-10"
            >
              A distinguished property developer and master builder dedicated to crafting bespoke residences,
              luxury duplexes, villas, and commercial landmarks.
            </motion.p>

            {/* Pill CTAs */}
            <motion.div
              variants={fadeUp}
              custom={0.9}
              initial="hidden"
              animate={target}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto"
            >
              <a
                href="#enquiry"
                onClick={(e) => scrollToSection(e, "enquiry")}
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#06923E] hover:bg-[#212121] text-white px-8 py-3.5 text-sm font-semibold transition-colors duration-300 shadow-md outline-none focus-visible:ring-2 focus-visible:ring-[#E67514] focus-visible:ring-offset-2 focus-visible:ring-offset-[#CADCAE]"
              >
                <span>Let&apos;s Build</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="#explore"
                onClick={(e) => scrollToSection(e, "explore")}
                className="inline-flex items-center justify-center rounded-full bg-[#D3ECCD] hover:bg-[#E67514] border border-[#212121]/15 hover:border-[#E67514] text-[#212121] px-8 py-3.5 text-sm font-semibold transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#E67514] focus-visible:ring-offset-2 focus-visible:ring-offset-[#CADCAE]"
              >
                Explore Our Projects
              </a>
            </motion.div>
          </div>
        </div>

        {/* Residence layer — rises from the bottom once loaded (after the intro on first visit) */}
        <motion.div
          initial={{ opacity: 0, y: 180 }}
          animate={shouldReduceMotion || (houseLoaded && show) ? { opacity: 1, y: 0 } : { opacity: 0, y: 180 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 1.4, delay: 0.35, ease }}
          className="relative lg:absolute z-10 lg:right-[-6%] xl:right-[-3%] lg:bottom-0 w-[122%] -ml-[11%] -mt-8 sm:-mt-12 lg:mt-0 lg:ml-0 lg:w-[60%] xl:w-[64%] pointer-events-none select-none"
          aria-hidden="true"
        >
          <Image
            src="/assets/images/hero-house.webp"
            alt=""
            width={2304}
            height={1536}
            quality={92}
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 1024px) 122vw, 64vw"
            onLoad={() => setHouseLoaded(true)}
            className="w-full h-auto drop-shadow-[0_30px_40px_rgba(33,33,33,0.18)]"
          />
        </motion.div>

        {/* Dims the hero as it recedes (desktop) */}
        {depthOn && (
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 z-40 bg-[#212121] pointer-events-none"
            style={{ opacity: cardShade }}
          />
        )}
      </motion.div>
    </section>
  );
};
