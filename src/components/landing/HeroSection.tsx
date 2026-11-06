"use client";

import React from "react";
import { siteAssets } from "@/config/site-assets";
import { siteContent } from "@/config/site-content";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { HalftoneBackground } from "@/components/ui/HalftoneBackground";
import { ArrowDown, ArrowUpRight, Compass } from "lucide-react";

export const HeroSection: React.FC = () => {
  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("contact");
    if (el) {
      const offset = el.getBoundingClientRect().top + window.pageYOffset - 72;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  const scrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("projects");
    if (el) {
      const offset = el.getBoundingClientRect().top + window.pageYOffset - 72;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  const scrollToAbout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("about");
    if (el) {
      const offset = el.getBoundingClientRect().top + window.pageYOffset - 72;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative isolate min-h-screen flex items-center justify-center overflow-hidden bg-[#1F2924] text-[#F4F1E8]"
    >
      {/* Halftone — Subtle Champagne Gold on Forest Green (Zero Orange / Violet) */}
      <HalftoneBackground variant="dark" opacity="opacity-45" />

      {/* Subtle Atmospheric Vignette for Architectural Contrast */}
      <div className="absolute inset-0 -z-10 bg-radial-at-c from-transparent via-[#1F2924]/20 to-[#1F2924]/90 pointer-events-none" />

      {/* Hero Content Container — Expansive Width Alignment */}
      <div className="relative z-10 w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 pt-32 pb-16 sm:pt-40 sm:pb-24 text-center sm:text-left flex flex-col justify-between min-h-[90vh]">
        {/* Top Architectural Subtitle Tag */}
        <div className="pt-4">
          <MotionReveal delay={0.05}>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 border border-[#B89A62]/40 bg-[#1F2924]/85 backdrop-blur-md text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#B89A62] font-medium mb-6 shadow-sm">
              <Compass className="w-3.5 h-3.5 text-[#B89A62]" />
              <span>{siteContent.hero.badge}</span>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <p className="text-[11px] tracking-[0.22em] uppercase text-[#D8D8CC]/80 mb-3 font-mono">
              {siteAssets.hero.label}
            </p>
          </MotionReveal>

          {/* Main Cinematic Heading — High-Contrast Serif */}
          <MotionReveal delay={0.15}>
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-light text-[#F4F1E8] tracking-tight leading-[1.05] max-w-5xl">
              {siteContent.hero.titleLine1}{" "}
              <span className="block italic text-[#B89A62] font-light">
                {siteContent.hero.titleLine2}
              </span>
            </h1>
          </MotionReveal>

          {/* Supporting Description — Warm Ivory / Off-White */}
          <MotionReveal delay={0.2}>
            <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-[#D8D8CC] max-w-2xl font-light leading-relaxed">
              {siteContent.hero.subtitle}
            </p>
          </MotionReveal>

          {/* Action CTAs */}
          <MotionReveal delay={0.25}>
            <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
              <a
                href={siteContent.hero.ctaTarget}
                onClick={scrollToContact}
                className="group inline-flex items-center justify-center gap-3 bg-[#536957] hover:bg-[#1F2924] active:scale-[0.98] text-[#F4F1E8] px-8 py-4 border border-[#B89A62]/60 hover:border-[#B89A62] text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B89A62]"
              >
                <span>{siteContent.hero.primaryCta}</span>
                <ArrowUpRight className="w-4 h-4 text-[#B89A62] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>

              <a
                href={siteContent.hero.projectsTarget}
                onClick={scrollToProjects}
                className="inline-flex items-center justify-center gap-2 bg-[#1F2924]/50 hover:bg-[#F4F1E8]/10 active:scale-[0.98] text-[#F4F1E8] px-7 py-4 border border-[#F4F1E8]/30 hover:border-[#B89A62] text-xs sm:text-sm uppercase tracking-[0.2em] font-medium transition-all duration-300 backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B89A62]"
              >
                <span>{siteContent.hero.secondaryCta}</span>
              </a>
            </div>
          </MotionReveal>
        </div>

        {/* Hero Bottom Bar: Architectural Coordinates & Scroll Indicator */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-[#F4F1E8]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D8D8CC]/80">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#536957] animate-pulse" />
            <span className="tracking-[0.16em] uppercase font-mono text-[11px]">
              Bespoke Residential &amp; Commercial Development
            </span>
          </div>

          <a
            href="#about"
            onClick={scrollToAbout}
            className="group inline-flex items-center gap-2 text-[#D8D8CC] hover:text-[#B89A62] transition-colors tracking-[0.18em] uppercase text-[11px] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B89A62]"
            aria-label="Scroll to About section"
          >
            <span>Explore Architecture</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#B89A62] group-hover:translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
