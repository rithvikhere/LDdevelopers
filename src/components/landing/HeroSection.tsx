"use client";

import React from "react";
import Image from "next/image";
import { siteAssets } from "@/config/site-assets";
import { siteContent } from "@/config/site-content";
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#202622]"
    >
      {/* Background Architectural Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={siteAssets.hero.mainBackground}
          alt={siteAssets.hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Layered Architectural Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#202622] via-[#202622]/65 to-black/75" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#202622]/40 to-[#202622]/90" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 sm:pt-40 sm:pb-28 text-center sm:text-left flex flex-col justify-between min-h-[85vh]">
        {/* Top Architectural Subtitle Tag */}
        <div className="pt-4">
          <MotionReveal delay={0.05}>
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 border border-[#B49A68]/40 bg-[#202622]/60 backdrop-blur-xs text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#B49A68] font-medium mb-6">
              <Compass className="w-3.5 h-3.5 text-[#B49A68]" />
              <span>{siteContent.hero.badge}</span>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#D9D2C4]/70 mb-2">
              {siteAssets.hero.label}
            </p>
          </MotionReveal>

          {/* Main Cinematic Heading */}
          <MotionReveal delay={0.15}>
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-[#F3F0E8] tracking-tight leading-[1.08] max-w-4xl">
              {siteContent.hero.titleLine1}
              <span className="block italic text-[#B49A68] font-light">
                {siteContent.hero.titleLine2}
              </span>
            </h1>
          </MotionReveal>

          {/* Supporting Description */}
          <MotionReveal delay={0.2}>
            <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-[#D9D2C4]/90 max-w-2xl font-light leading-relaxed">
              {siteContent.hero.subtitle}
            </p>
          </MotionReveal>

          {/* Action CTAs */}
          <MotionReveal delay={0.25}>
            <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
              <a
                href={siteContent.hero.ctaTarget}
                onClick={scrollToContact}
                className="group inline-flex items-center justify-center gap-3 bg-[#526653] hover:bg-[#343B33] active:scale-[0.98] text-[#F3F0E8] px-8 py-4 border border-[#B49A68]/50 hover:border-[#B49A68] text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A68]"
              >
                <span>{siteContent.hero.primaryCta}</span>
                <ArrowUpRight className="w-4 h-4 text-[#B49A68] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>

              <a
                href={siteContent.hero.projectsTarget}
                onClick={scrollToProjects}
                className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-[#F3F0E8]/10 active:scale-[0.98] text-[#F3F0E8] px-7 py-4 border border-[#F3F0E8]/30 hover:border-[#B49A68] text-xs sm:text-sm uppercase tracking-[0.2em] font-medium transition-all duration-300 backdrop-blur-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A68]"
              >
                <span>{siteContent.hero.secondaryCta}</span>
              </a>
            </div>
          </MotionReveal>
        </div>

        {/* Hero Bottom Bar: Scroll Indicator & Coordinates */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-[#F3F0E8]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D9D2C4]/70">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#526653] animate-pulse" />
            <span className="tracking-[0.16em] uppercase">
              Bespoke Residential &amp; Commercial Development
            </span>
          </div>

          <a
            href="#about"
            onClick={scrollToAbout}
            className="group inline-flex items-center gap-2 text-[#F3F0E8]/80 hover:text-[#B49A68] transition-colors tracking-[0.18em] uppercase text-[11px] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B49A68]"
            aria-label="Scroll to About section"
          >
            <span>Explore Architecture</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#B49A68] group-hover:translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
