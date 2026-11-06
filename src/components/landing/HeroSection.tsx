"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { KairosMaskedText, KairosDepthReveal } from "@/components/ui/KairosScrollReveal";
import { ArrowDown, ArrowUpRight, Compass } from "lucide-react";

/**
 * HeroSection Component — Kairos Minimalist Cinematic Master Redesign
 * - 100% photo-free; atmospheric halftone background with emerald, teal, & champagne ambiance
 * - Centered architectural composition
 * - Forward-moving masked reveal typography
 * - Two minimalist rectangular CTAs
 * - Minimal animated scroll indicator
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
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-transparent text-[#F5F3EF] pt-32 sm:pt-40 pb-10"
    >
      {/* Subtle Architectural Hairline Grid Overlay */}
      <div className="absolute inset-0 bg-architectural-grid opacity-25 pointer-events-none" />

      {/* ========================================================================= */}
      {/* CENTERED HERO CONTENT CONTAINER                                          */}
      {/* ========================================================================= */}
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col items-center justify-center text-center relative z-10 py-12">
        {/* Minimal Architectural Eyebrow Badge */}
        <KairosDepthReveal delay={0.1} withFrame={false}>
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 border border-[#24322A]/20 bg-white/90 backdrop-blur-md shadow-md text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.26em] text-[#2E5A44] font-semibold mb-8">
            <Compass className="w-3.5 h-3.5 text-[#2E5A44]" />
            <span>ARCHITECTURAL STUDIO &amp; PROPERTY DEVELOPMENT</span>
          </div>
        </KairosDepthReveal>

        {/* Master Editorial Serif Headline with Masked Depth Reveal */}
        <div className="max-w-4xl mx-auto space-y-1 mb-6">
          <KairosMaskedText delay={0.2} as="h1" className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-light text-[#F5F3EF] tracking-tight leading-[1.06]">
            Crafting Timeless Spaces.
          </KairosMaskedText>
          <KairosMaskedText delay={0.35} as="h1" className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-light tracking-tight leading-[1.06]">
            <span className="italic text-[#C5B083] font-light">Shaping Tomorrow.</span>
          </KairosMaskedText>
        </div>

        {/* Supporting Editorial Monograph */}
        <KairosDepthReveal delay={0.5} highlight={true}>
          <p className="text-sm sm:text-base md:text-lg text-[#9EA8A1] font-light max-w-2xl mx-auto leading-relaxed mb-10">
            From visionary architecture to enduring developments, we create spaces that elevate
            the way people live, work, and experience the world.
          </p>
        </KairosDepthReveal>

        {/* Minimalist CTA Buttons */}
        <KairosDepthReveal delay={0.65}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <a
              href="#projects"
              onClick={scrollToProjects}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#17201B] hover:bg-[#2E5A44] border border-[#24322A] hover:border-[#C5B083]/60 text-[#F5F3EF] px-8 py-3.5 text-xs font-mono uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-lg hover:shadow-[#2E5A44]/20"
            >
              <span>Explore Our Projects</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#C5B083] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="#contact"
              onClick={scrollToContact}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-transparent hover:bg-[#121815] border border-[#24322A] hover:border-[#9EA8A1] text-[#9EA8A1] hover:text-[#F5F3EF] px-8 py-3.5 text-xs font-mono uppercase tracking-[0.2em] font-medium transition-all duration-300"
            >
              <span>Begin Your Journey</span>
            </a>
          </div>
        </KairosDepthReveal>
      </div>

      {/* ========================================================================= */}
      {/* SUBTLE SCROLL INDICATOR                                                  */}
      {/* ========================================================================= */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-[#9EA8A1]/70 relative z-10 pt-4 border-t border-[#24322A]/40">
        <div className="flex items-center gap-2 tracking-[0.22em] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2E5A44] animate-pulse" />
          <span>ESTABLISHED TO ENDURE &bull; BENGALURU &amp; HYDERABAD</span>
        </div>

        <a
          href="#about"
          onClick={scrollToAbout}
          className="group inline-flex items-center gap-2 hover:text-[#C5B083] transition-colors tracking-[0.22em] uppercase cursor-pointer"
          aria-label="Scroll to narrative"
        >
          <span>DISCOVER PHILOSOPHY</span>
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown className="w-3.5 h-3.5 text-[#C5B083]" />
          </motion.div>
        </a>
      </div>
    </section>
  );
};
