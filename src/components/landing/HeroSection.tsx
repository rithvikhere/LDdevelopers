"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";

/**
 * HeroSection Component — Kairos Minimalist Cinematic Master Redesign
 * - Monumental champagne gold architectural statement serving as the primary visual centerpiece
 * - Twin minimalist CTAs
 * - Centered "SCROLL DOWN" indicator
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

  const scrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("projects");
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
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-transparent text-[#F5F3EF] pt-32 sm:pt-40 pb-12"
    >
      {/* Subtle Architectural Hairline Grid Overlay */}
      <div className="absolute inset-0 bg-architectural-grid opacity-25 pointer-events-none" />

      {/* ========================================================================= */}
      {/* CENTERED HERO CONTENT CONTAINER                                          */}
      {/* ========================================================================= */}
      <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col items-center justify-center text-center relative z-10 py-8 sm:py-16">
        {/* Monumental Gold Architectural Headline (Main Visual Centerpiece) */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1.1,
            delay: 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="max-w-5xl mx-auto mb-10 sm:mb-14"
        >
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[4.6rem] font-light text-[#C5B083] tracking-tight leading-[1.18] sm:leading-[1.12] drop-shadow-[0_10px_40px_rgba(197,176,131,0.2)]">
            From visionary architecture to enduring developments, we create spaces that elevate
            the way people live, work, and experience the world.
          </h1>
        </motion.div>

        {/* Minimalist CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.45,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#projects"
            onClick={scrollToProjects}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white/95 hover:bg-[#2E5A44] hover:text-[#F5F3EF] border border-[#24322A]/20 text-[#0B0F0D] px-8 py-3.5 text-xs font-mono uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-xl hover:shadow-[#2E5A44]/25"
          >
            <span>Explore Our Projects</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#2E5A44] group-hover:text-[#C5B083] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href="#contact"
            onClick={scrollToContact}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white/80 hover:bg-white/95 border border-[#24322A]/20 text-[#1F2924] hover:text-[#0B0F0D] px-8 py-3.5 text-xs font-mono uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-md"
          >
            <span>Begin Your Journey</span>
          </a>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* CENTERED SCROLL DOWN INDICATOR                                            */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="w-full flex flex-col items-center justify-center relative z-10 pt-4"
      >
        <a
          href="#about"
          onClick={scrollToAbout}
          className="group inline-flex flex-col items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-[0.28em] uppercase text-[#9EA8A1] hover:text-[#C5B083] transition-colors cursor-pointer"
          aria-label="Scroll down to philosophy"
        >
          <span>SCROLL DOWN</span>
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ArrowDown className="w-3.5 h-3.5 text-[#C5B083]" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
};
