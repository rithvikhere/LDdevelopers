"use client";

import React from "react";
import Image from "next/image";
import { siteAssets } from "@/config/site-assets";
import { MotionReveal } from "@/components/ui/MotionReveal";
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
      className="relative isolate min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#F4F0E7] text-[#252A26] pt-28 sm:pt-36 lg:pt-40 transition-colors"
    >
      {/* ========================================================================= */}
      {/* HERO BACKGROUND IMAGE — Handshake & City Skyline Clean Canvas             */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/assets/images/hero-background.jpg"
          alt="Double-exposure handshake and modern city skyline"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right lg:object-center select-none"
        />
        {/* Soft Left Edge Gradient Overlay — Guarantees 100% typography contrast on Warm Ivory */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F4F0E7] via-[#F4F0E7]/80 to-transparent lg:w-[58%] pointer-events-none" />
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 flex-1 flex flex-col justify-center py-6 sm:py-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* ===================================================================== */}
          {/* LEFT SIDE: Monograph, Headlines, and CTAs (6 of 12 columns)           */}
          {/* ===================================================================== */}
          <div className="lg:col-span-7 xl:col-span-6 flex flex-col justify-center">
            {/* Top Eyebrow Badge */}
            <MotionReveal delay={0.05}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#1D2923] text-[#B89A60] border border-[#B89A60]/40 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-mono shadow-xs mb-5">
                <Compass className="w-3.5 h-3.5 text-[#B89A60]" />
                <span>ARCHITECTURAL EXCELLENCE &amp; TURNKEY CONSTRUCTION</span>
              </div>
            </MotionReveal>

            {/* Sub-label with Hairline Extension */}
            <MotionReveal delay={0.1}>
              <div className="flex items-center gap-4 mb-5">
                <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.22em] text-[#69716C] uppercase font-medium">
                  BESPOKE RESIDENTIAL &amp; COMMERCIAL DEVELOPMENT
                </span>
                <div className="hidden sm:block h-px bg-[#DDD6C8] flex-1 max-w-[100px]" />
              </div>
            </MotionReveal>

            {/* Main Editorial Headline */}
            <MotionReveal delay={0.15}>
              <h1 className="font-display text-4xl sm:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-light text-[#252A26] tracking-tight leading-[1.08] mb-6">
                Sculpting Enduring <br />
                Spaces, <br />
                <span className="italic text-[#B89A60] font-light">
                  Defining Modern Living.
                </span>
              </h1>
            </MotionReveal>

            {/* Supporting Description */}
            <MotionReveal delay={0.2}>
              <p className="text-base sm:text-lg text-[#69716C] font-light leading-relaxed max-w-xl mb-9">
                A distinguished property developer and master builder dedicated to crafting bespoke
                residences, luxury duplexes, villas, and commercial landmarks.
              </p>
            </MotionReveal>

            {/* Sophisticated Rectangular CTA Buttons */}
            <MotionReveal delay={0.25}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="#contact"
                  onClick={scrollToContact}
                  className="group inline-flex items-center justify-center gap-3 bg-[#506653] hover:bg-[#1D2923] active:scale-[0.98] text-[#FAF9F5] px-8 py-3.5 border border-[#B89A60]/50 hover:border-[#B89A60] text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-sm"
                >
                  <span>LET&apos;S BUILD</span>
                  <ArrowUpRight className="w-4 h-4 text-[#B89A60] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  href="#projects"
                  onClick={scrollToProjects}
                  className="inline-flex items-center justify-center bg-transparent hover:bg-[#1D2923]/5 active:scale-[0.98] text-[#252A26] px-7 py-3.5 border border-[#252A26]/40 hover:border-[#506653] text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300"
                >
                  <span>EXPLORE OUR PROJECTS</span>
                </a>
              </div>
            </MotionReveal>
          </div>

          {/* RIGHT SIDE: Open space showcasing the handshake and skyline from the background image */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-6 h-[480px] pointer-events-none" />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* HERO FOOTER STRIP                                                         */}
      {/* ========================================================================= */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 pt-6 pb-6 border-t border-[#DDD6C8] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#69716C] z-10 relative">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#506653]" />
          <span className="tracking-[0.2em] uppercase text-[10px] sm:text-[11px]">
            BESPOKE RESIDENTIAL &amp; COMMERCIAL DEVELOPMENT
          </span>
        </div>

        <a
          href="#about"
          onClick={scrollToAbout}
          className="group inline-flex items-center gap-2 hover:text-[#B89A60] transition-colors tracking-[0.2em] uppercase text-[10px] sm:text-[11px] cursor-pointer"
          aria-label="Scroll to About section"
        >
          <span>EXPLORE ARCHITECTURE</span>
          <ArrowDown className="w-3.5 h-3.5 text-[#B89A60] transition-transform duration-300 group-hover:translate-y-0.5" />
        </a>
      </div>
    </section>
  );
};
