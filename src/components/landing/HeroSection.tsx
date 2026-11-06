"use client";

import React from "react";
import Image from "next/image";
import { siteAssets } from "@/config/site-assets";
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
      className="relative isolate min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#F4F0E7] text-[#252A26] pt-28 sm:pt-36 lg:pt-40 transition-colors"
    >
      {/* Halftone — Subtle Sage on Warm Ivory (Extremely Low Opacity in Corners) */}
      <HalftoneBackground variant="ivory" opacity="opacity-15" />

      {/* Main Split Layout Container */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 flex-1 flex flex-col justify-center py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* ========================================================================= */}
          {/* LEFT SIDE: Headings, Supporting Copy, and CTAs (45-50% width)             */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 flex flex-col justify-center z-10">
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

          {/* ========================================================================= */}
          {/* RIGHT SIDE: Large Handshake & City Skyline Visual (50-55% width)           */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end">
            <MotionReveal delay={0.2} className="relative w-full flex items-center justify-center lg:justify-end">
              {/* Architectural Gold Compass Circle Detail */}
              <div className="hidden sm:block absolute -top-8 right-6 w-[360px] sm:w-[460px] lg:w-[520px] aspect-square rounded-full border border-[#B89A60]/30 pointer-events-none" />
              <div className="hidden sm:block absolute top-6 right-16 w-2 h-2 rounded-full border border-[#B89A60] pointer-events-none" />

              {/* Handshake & Skyline Double-Exposure Visual */}
              <div className="relative w-full aspect-[16/11] sm:aspect-[4/3] lg:aspect-[16/11] max-w-[680px] overflow-hidden">
                <Image
                  src="/assets/images/handshake-skyline-crop.png"
                  alt="Double-exposure handshake and modern city skyline"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-contain object-center lg:object-right select-none"
                />
                {/* Soft Left Edge Gradient Blend into Warm Ivory */}
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#F4F0E7] to-transparent pointer-events-none" />
              </div>
            </MotionReveal>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* HERO FOOTER STRIP                                                         */}
      {/* ========================================================================= */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 pt-6 pb-6 border-t border-[#DDD6C8] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#69716C] z-10">
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
