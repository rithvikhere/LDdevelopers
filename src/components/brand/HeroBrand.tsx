"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { LD_MARK } from "@/components/intro/ld-outline";
import { useIntroPhase } from "@/components/intro/IntroProvider";

const ease = [0.16, 1, 0.3, 1] as const;

/** Writes a word letter by letter (soft fade + de-blur per letter). */
const WrittenWord: React.FC<{ text: string; play: boolean; delay: number; step: number; className: string }> = ({
  text,
  play,
  delay,
  step,
  className,
}) => {
  const reduce = useReducedMotion();
  return (
    <span className={className}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          className="inline-block"
          initial={reduce ? false : { opacity: 0, y: 6, filter: "blur(5px)" }}
          animate={play || reduce ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
          transition={{ duration: 0.45, delay: delay + i * step, ease }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
};

/**
 * HeroBrand — the LD mark + "Lakshmi Developers" in the hero's top-left.
 * On first load the intro's mark lands exactly on #hero-brand-mark, then the name is written in.
 */
export const HeroBrand: React.FC = () => {
  const phase = useIntroPhase();
  const landed = phase >= 2;

  return (
    <Link
      href="/"
      aria-label="Lakshmi Developers — home"
      className="inline-flex items-center gap-3 sm:gap-4 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-[#E67514] focus-visible:ring-offset-4 focus-visible:ring-offset-[#CADCAE]"
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
        style={{ opacity: landed ? 1 : 0 }}
      />
      <span aria-hidden="true" className="flex flex-col leading-none">
        <WrittenWord
          text="LAKSHMI"
          play={landed}
          delay={0.05}
          step={0.06}
          className="font-display font-bold text-[1.35rem] sm:text-[1.55rem] lg:text-[1.8rem] tracking-[0.08em] text-[#14532D]"
        />
        <WrittenWord
          text="DEVELOPERS"
          play={landed}
          delay={0.45}
          step={0.035}
          className="mt-1.5 font-sans font-semibold text-[9px] sm:text-[10px] tracking-[0.5em] text-[#212121]/80"
        />
      </span>
    </Link>
  );
};
