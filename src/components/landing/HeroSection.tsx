"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/**
 * HeroSection — Editorial split hero with a rising architectural residence.
 *
 * Left:  label, bold headline, supporting brief and twin pill CTAs.
 * Right: the residence image as a layer that rises from the bottom on load.
 *
 * On large screens the hero is sticky, so the dark Explore section (Section 02)
 * slides up and overlays it as the visitor scrolls.
 *
 * Note: the animated ArchitecturalLineArt (handshake & skyline) is intentionally not used here
 * any more. The component is kept at src/components/hero/ArchitecturalLineArt.tsx for later use.
 */
export const HeroSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  // The residence starts rising only once its image has actually loaded, so the motion is never missed.
  const [houseLoaded, setHouseLoaded] = useState(false);

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

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      id="home"
      className="relative lg:sticky lg:top-0 z-0 min-h-[100svh] overflow-hidden bg-[#CADCAE] text-[#212121]"
    >
      {/* Low-contrast dark olive architectural grid */}
      <div className="absolute inset-0 bg-hero-grid pointer-events-none" aria-hidden="true" />

      <div className="relative z-20 w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 pt-14 sm:pt-20 lg:pt-24 xl:pt-28 pb-6 sm:pb-10 lg:pb-64 xl:pb-72">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="w-full lg:max-w-[56%] xl:max-w-[54%] flex flex-col items-start"
        >
          {/* Label */}
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.42em] text-[#212121]/75 font-medium mb-6 sm:mb-8">
            Architectural Excellence &amp; Turnkey Construction
          </span>

          {/* Headline */}
          <h1 className="font-sans font-bold uppercase text-[2.4rem] leading-[1.04] sm:text-[3.25rem] lg:text-[3.4rem] xl:text-[4rem] tracking-[-0.02em] text-[#212121] mb-6 sm:mb-8">
            Sculpting Enduring Spaces, Defining Modern Living.
          </h1>

          {/* Supporting text */}
          <p className="text-sm sm:text-base text-[#212121]/75 leading-relaxed max-w-md mb-8 sm:mb-10">
            A distinguished property developer and master builder dedicated to crafting bespoke residences,
            luxury duplexes, villas, and commercial landmarks.
          </p>

          {/* Pill CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
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
          </div>
        </motion.div>
      </div>

      {/* Residence layer — rises from the bottom once the section loads */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 180 }}
        animate={shouldReduceMotion || houseLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 180 }}
        transition={{ duration: 1.4, delay: 0.15, ease }}
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
    </section>
  );
};
