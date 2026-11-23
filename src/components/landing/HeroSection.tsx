"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { HeroBrand } from "@/components/brand/HeroBrand";
import { useIntroPhase } from "@/components/intro/IntroProvider";
import { siteContent } from "@/config/site-content";
import { heroCondensed, heroSans, heroSerif } from "@/components/landing/hero-fonts";

const hero = siteContent.hero;
const ease = [0.16, 1, 0.3, 1] as const;

// The parallax hand-off only runs where the hero is sticky (large screens).
const DESKTOP_QUERY = "(min-width: 1024px)";
const subscribeDesktop = (onChange: () => void) => {
  const mq = window.matchMedia(DESKTOP_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};
const getDesktop = () => window.matchMedia(DESKTOP_QUERY).matches;
const getDesktopServer = () => false;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (delay: number) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay, ease } }),
};

// Headline words rise in one by one (blur → sharp). The condensed words rise a little further for more punch.
const word: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(10px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, delay: 0.12 + i * 0.085, ease },
  }),
};

const punch: Variants = {
  hidden: { opacity: 0, y: 48, filter: "blur(12px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.95, delay: 0.12 + i * 0.085, ease },
  }),
};

/**
 * HeroSection — editorial split hero with a rising architectural residence.
 *
 * - Top-left: the LD brand (the intro's mark lands here on first load).
 * - Left: a large editorial headline — "Your Land. / Your Vision." in a heavy didone serif, "OUR EXPERTISE."
 *   in heavy condensed caps (the last word in orange) — revealed word by word after the intro, then a
 *   supporting line and pill CTAs.
 * - Right: the residence rising from the bottom once loaded.
 * - Large screens: the hero is sticky; as the dark Explore panel slides over it, the hero's layers drift up
 *   at different speeds (text fastest and fading, house slower, grid slowest) — a smooth parallax hand-off
 *   that keeps the hero's own colours (no dimming, so no grey).
 *
 * Note: the animated ArchitecturalLineArt (handshake & skyline) is intentionally not used here
 * any more. The component is kept at src/components/hero/ArchitecturalLineArt.tsx for later use.
 */
export const HeroSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const phase = useIntroPhase();
  const show = phase >= 1 || !!shouldReduceMotion;

  // The residence starts rising only once its image has actually loaded, so the motion is never missed.
  const [houseLoaded, setHouseLoaded] = useState(false);

  // --- Layered parallax while the Explore panel slides over (desktop only) -------------------------
  const isDesktop = useSyncExternalStore(subscribeDesktop, getDesktop, getDesktopServer);
  const driftOn = isDesktop && !shouldReduceMotion;

  const { scrollY } = useScroll();
  const viewport = useMotionValue(900);
  useEffect(() => {
    const update = () => viewport.set(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [viewport]);

  const driftRaw = useTransform([scrollY, viewport], ([y, h]: number[]) => Math.min(1, Math.max(0, y / (h * 0.9))));
  const drift = useSpring(driftRaw, { stiffness: 110, damping: 26, mass: 0.45 });
  // Each layer rises at its own speed (a fraction of the viewport height) — depth without any colour change
  const textY = useTransform([drift, viewport], ([p, h]: number[]) => -p * h * 0.18);
  const textOpacity = useTransform(drift, [0, 0.75], [1, 0]);
  const houseY = useTransform([drift, viewport], ([p, h]: number[]) => -p * h * 0.07);
  const gridY = useTransform([drift, viewport], ([p, h]: number[]) => -p * h * 0.03);

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

  const reveal = shouldReduceMotion ? false : "hidden";
  const target = show ? "show" : "hidden";

  return (
    <section
      id="home"
      className="relative lg:sticky lg:top-0 z-0 min-h-[100svh] text-[#212121]"
    >
      <div className="relative min-h-[100svh] overflow-hidden bg-[#CADCAE]">
        {/* Low-contrast dark olive architectural grid (slowest parallax layer) */}
        <motion.div
          className="absolute inset-0 bg-hero-grid pointer-events-none"
          aria-hidden="true"
          style={driftOn ? { y: gridY } : undefined}
        />

        {/* Brand + text — fastest parallax layer, fading as the Explore panel arrives */}
        <motion.div className="relative z-20" style={driftOn ? { y: textY, opacity: textOpacity } : undefined}>
        {/* Brand — top-left (the intro's mark lands here) */}
        <div className="absolute inset-x-0 top-0 z-30">
          <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 pt-5 sm:pt-7 lg:pt-8">
            <HeroBrand />
          </div>
        </div>

        <div className="relative z-20 w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 pt-28 sm:pt-32 lg:pt-32 xl:pt-36 pb-6 sm:pb-10 lg:pb-64 xl:pb-72">
          <div className="w-full lg:max-w-[62%] flex flex-col items-start">
            {/* Headline — revealed word by word */}
            <h1 className="mb-6 sm:mb-8 text-[#212121]">
              {hero.titleSerif.map((line, li) => (
                <span
                  key={line}
                  className={`${heroSerif.className} block font-black tracking-[-0.02em] leading-[0.92] text-[13vw] sm:text-[10vw] lg:text-[6.4vw] 2xl:text-[6.5rem] ${
                    li === 1 ? "lg:pl-[0.9em]" : ""
                  }`}
                >
                  {line.split(" ").map((w, wi, all) => (
                    <React.Fragment key={`${w}-${wi}`}>
                      <motion.span
                        variants={word}
                        custom={li * all.length + wi}
                        initial={reveal}
                        animate={target}
                        className="inline-block"
                      >
                        {w}
                      </motion.span>
                      {wi < all.length - 1 ? " " : null}
                    </React.Fragment>
                  ))}
                </span>
              ))}
              <span
                className={`${heroCondensed.className} block uppercase leading-[0.9] mt-[0.12em] text-[14.5vw] sm:text-[12vw] lg:text-[8.6vw] 2xl:text-[8.75rem]`}
              >
                <motion.span variants={punch} custom={4} initial={reveal} animate={target} className="inline-block">
                  {hero.titleLead}
                </motion.span>{" "}
                <motion.span
                  variants={punch}
                  custom={5}
                  initial={reveal}
                  animate={target}
                  className="inline-block text-[#E67514]"
                >
                  {hero.titleAccent}
                </motion.span>
              </span>
            </h1>

            {/* Supporting line */}
            <motion.p
              variants={fadeUp}
              custom={0.7}
              initial={reveal}
              animate={target}
              className={`${heroSans.className} font-medium text-[#212121]/80 text-[clamp(1.15rem,1.7vw,1.75rem)] leading-[1.35] tracking-[-0.005em] text-balance max-w-[34rem] mb-8 sm:mb-10`}
            >
              {hero.subtitle}
            </motion.p>

            {/* Pill CTAs */}
            <motion.div
              variants={fadeUp}
              custom={0.85}
              initial={reveal}
              animate={target}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto"
            >
              <a
                href={`#${hero.ctaTarget}`}
                onClick={(e) => scrollToSection(e, hero.ctaTarget)}
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#06923E] hover:bg-[#212121] text-white px-8 py-3.5 text-sm font-semibold transition-colors duration-300 shadow-md outline-none focus-visible:ring-2 focus-visible:ring-[#E67514] focus-visible:ring-offset-2 focus-visible:ring-offset-[#CADCAE]"
              >
                <span>{hero.primaryCta}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href={`#${hero.projectsTarget}`}
                onClick={(e) => scrollToSection(e, hero.projectsTarget)}
                className="inline-flex items-center justify-center rounded-full bg-[#D3ECCD] hover:bg-[#E67514] border border-[#212121]/15 hover:border-[#E67514] text-[#212121] px-8 py-3.5 text-sm font-semibold transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#E67514] focus-visible:ring-offset-2 focus-visible:ring-offset-[#CADCAE]"
              >
                {hero.secondaryCta}
              </a>
            </motion.div>
          </div>
        </div>
        </motion.div>

        {/* Residence layer — slower parallax (outer) + rises from the bottom once loaded (inner) */}
        <motion.div
          className="relative lg:absolute z-10 lg:right-[-6%] xl:right-[-3%] lg:bottom-0 w-[122%] -ml-[11%] -mt-8 sm:-mt-12 lg:mt-0 lg:ml-0 lg:w-[60%] xl:w-[64%] pointer-events-none select-none"
          style={driftOn ? { y: houseY } : undefined}
          aria-hidden="true"
        >
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 180 }}
          animate={shouldReduceMotion || (houseLoaded && show) ? { opacity: 1, y: 0 } : { opacity: 0, y: 180 }}
          transition={{ duration: 1.4, delay: 0.35, ease }}
          className="w-full"
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
        </motion.div>
      </div>
    </section>
  );
};
