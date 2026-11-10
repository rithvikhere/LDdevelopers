"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { ArchitecturalLineArt } from "@/components/hero/ArchitecturalLineArt";

/**
 * HeroSection Component — Editorial Split Layout with Animated Architectural Line Art
 *
 * Left Side (~42%):
 * - Architectural Excellence & Turnkey Construction label
 * - "Sculpting Enduring Spaces, Defining Modern Living."
 * - Editorial supporting brief
 * - Twin CTAs: "LET'S BUILD" & "EXPLORE OUR PROJECTS"
 *
 * Right Side (~58%):
 * - Pure code-generated animated SVG technical line art recreating the architectural handshake
 *   and rising city skyline illustration stroke-by-stroke.
 */
export const HeroSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("contact");
    if (el) {
      const offset = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  const scrollToServices = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("services");
    if (el) {
      const offset = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  const scrollToAbout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("about");
    if (el) {
      const offset = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-transparent text-[#F5F3EF] pt-28 sm:pt-36 lg:pt-32 pb-8 sm:pb-12"
    >
      {/* Subtle Architectural Hairline Grid Overlay */}
      <div className="absolute inset-0 bg-architectural-grid opacity-20 pointer-events-none" />

      {/* ========================================================================= */}
      {/* EDITORIAL SPLIT CONTAINER: Left ~42% / Right ~58%                         */}
      {/* ========================================================================= */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 flex-1 flex flex-col justify-center relative z-10 py-6 sm:py-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12 xl:gap-16">
          
          {/* --------------------------------------------------------------------- */}
          {/* LEFT SIDE: EDITORIAL NARRATIVE & CTAS (~42%)                         */}
          {/* --------------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full lg:w-[42%] text-left flex flex-col items-start"
          >
            {/* Small Label */}
            <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
              <span className="w-2 h-2 rounded-full bg-[#C5B083]" />
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#C5B083] font-semibold">
                ARCHITECTURAL EXCELLENCE &amp; TURNKEY CONSTRUCTION
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-light text-[#F5F3EF] leading-[1.08] tracking-tight mb-6">
              Sculpting Enduring Spaces, Defining Modern Living.
            </h1>

            {/* Supporting Text */}
            <p className="text-xs sm:text-sm md:text-base text-[#9EA8A1] font-light leading-relaxed max-w-xl mb-8 sm:mb-10 font-sans">
              A distinguished property developer and master builder dedicated to crafting bespoke residences,
              luxury duplexes, villas, and commercial landmarks.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <a
                href="#contact"
                onClick={scrollToContact}
                className="group inline-flex items-center justify-center gap-3 bg-[#F5F2EB] hover:bg-[#2E5A44] hover:text-[#F5F3EF] border border-[#24322A]/20 text-[#0B0F0D] px-8 py-3.5 text-xs font-mono uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-xl hover:shadow-[#2E5A44]/25"
              >
                <span>LET&apos;S BUILD</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#1F4A36] group-hover:text-[#C5B083] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="#services"
                onClick={scrollToServices}
                className="group inline-flex items-center justify-center gap-3 bg-[#F5F2EB]/10 hover:bg-[#F5F2EB]/20 border border-[#24322A] hover:border-[#C5B083] text-[#F5F3EF] hover:text-[#C5B083] px-8 py-3.5 text-xs font-mono uppercase tracking-[0.2em] font-semibold transition-all duration-300"
              >
                <span>EXPLORE OUR PROJECTS</span>
              </a>
            </div>
          </motion.div>

          {/* --------------------------------------------------------------------- */}
          {/* RIGHT SIDE: ANIMATED ARCHITECTURAL LINE ART SVG (~58%)               */}
          {/* --------------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.1,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full lg:w-[58%] flex items-center justify-center relative select-none"
          >
            <ArchitecturalLineArt
              className="w-full h-auto max-h-[640px] xl:max-h-[720px] text-[#E8E4DC] drop-shadow-[0_20px_45px_rgba(0,0,0,0.5)]"
              strokeColor="#E8E4DC"
            />
          </motion.div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* CENTERED SCROLL DOWN INDICATOR                                            */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="w-full flex flex-col items-center justify-center relative z-10 pt-2"
      >
        <a
          href="#about"
          onClick={scrollToAbout}
          className="group inline-flex flex-col items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-[0.28em] uppercase text-[#9EA8A1] hover:text-[#C5B083] transition-colors cursor-pointer"
          aria-label="Scroll down to philosophy"
        >
          <span>SCROLL DOWN</span>
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ArrowDown className="w-3.5 h-3.5 text-[#C5B083]" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
};
