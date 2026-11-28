"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { LD_MARK } from "@/components/intro/ld-outline";
import { useIntroPhase } from "@/components/intro/IntroProvider";
import { useHydratedReducedMotion } from "@/hooks/useHydrated";

const ease = [0.16, 1, 0.3, 1] as const;

/** The logo's wordmark (LAKSHMI · BUILDERS & DEVELOPERS · Real Estate), cut out of the brand artwork. */
const WORDMARK = { src: "/assets/brand/ld-wordmark.webp", width: 673, height: 234 };

/**
 * HeroBrand — the LD mark + the logo wordmark in the hero's top-left.
 * On first load the intro's mark lands exactly on #hero-brand-mark (its size and position are what the intro
 * measures — keep them unchanged), then the wordmark wipes in beside it, left to right.
 * The wordmark is 90% of the mark's height and sits a few px below the mark's baseline (developer's choice);
 * "BUILDERS & DEVELOPERS" is set in LAKSHMI's green, without the band. The nudge is a transform, so the mark
 * (the intro's landing target) does not move.
 */
export const HeroBrand: React.FC = () => {
  const phase = useIntroPhase();
  const landed = phase >= 2;
  // false while hydrating, so the wordmark mounts in the same hidden state the server rendered
  const reduce = useHydratedReducedMotion();

  return (
    <Link
      href="/"
      aria-label="Lakshmi Builders & Developers — home"
      className="inline-flex items-end gap-3 sm:gap-4 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-[#E67514] focus-visible:ring-offset-4 focus-visible:ring-offset-[#CADCAE]"
    >
      <Image
        id="hero-brand-mark"
        src={LD_MARK.src}
        width={LD_MARK.width}
        height={LD_MARK.height}
        alt=""
        unoptimized
        loading="eager"
        className="h-11 sm:h-12 lg:h-14 w-auto"
        data-reveal
        style={{ opacity: landed ? 1 : 0 }}
      />
      <motion.span
        aria-hidden="true"
        className="block translate-y-[5px] sm:translate-y-[6px] lg:translate-y-[7px]"
        data-reveal
        initial={{ opacity: 0, clipPath: "inset(0% 100% 0% 0%)" }}
        animate={landed || reduce ? { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" } : undefined}
        transition={
          reduce
            ? { duration: 0 }
            : { clipPath: { duration: 0.95, delay: 0.08, ease }, opacity: { duration: 0.4, delay: 0.08 } }
        }
      >
        <Image
          id="hero-brand-wordmark"
          src={WORDMARK.src}
          width={WORDMARK.width}
          height={WORDMARK.height}
          alt=""
          unoptimized
          loading="eager"
          className="h-[2.475rem] sm:h-[2.7rem] lg:h-[3.15rem] w-auto"
        />
      </motion.span>
    </Link>
  );
};
