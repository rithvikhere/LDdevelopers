"use client";

import React from "react";
import { siteContent } from "@/config/site-content";
import {
  KairosDepthReveal,
  KairosMaskedText,
  KairosStaggerContainer,
  kairosChildVariant,
} from "@/components/ui/KairosScrollReveal";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/**
 * AboutSection Component — Kairos Editorial Narrative
 * - Pure typographic & architectural spatial composition (no generic 2-column image layout)
 * - Large editorial typography with forward-moving scroll reveals
 * - Generous spacing, asymmetric chapter blocks, and minimal geometric hairline frames
 */
export const AboutSection: React.FC = () => {
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

  const metrics = [
    { value: "14+", label: "Years of Practice", sub: "Since 2012" },
    { value: "2.4M+", label: "Square Feet Built", sub: "Residential & Commercial" },
    { value: "180+", label: "Curated Landmarks", sub: "Delivered On Schedule" },
    { value: "100%", label: "Structural Compliance", sub: "Seismic & LEED Certified" },
  ];

  return (
    <section
      id="about"
      className="py-28 sm:py-36 lg:py-44 bg-transparent text-[#F5F3EF] relative overflow-hidden transition-colors"
    >
      <div className="absolute inset-0 bg-architectural-grid opacity-20 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Index & Eyebrow — Centered & Prominent */}
        <KairosDepthReveal delay={0.05}>
          <div className="flex flex-col items-center justify-center text-center mx-auto mb-6">
            <span className="text-sm sm:text-base md:text-lg font-mono tracking-[0.3em] text-[#C5B083] uppercase font-semibold">
              01 / ARCHITECTURAL PROVENANCE
            </span>
          </div>
        </KairosDepthReveal>

        {/* Large Editorial Headline — Centered */}
        <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-24">
          <KairosMaskedText delay={0.1} as="h2" className="font-display text-3xl sm:text-5xl lg:text-6xl font-light text-[#F5F3EF] leading-[1.14] tracking-tight">
            Rooted in structural integrity, spatial purity, and enduring permanence.
          </KairosMaskedText>
        </div>

        {/* Asymmetrical Narrative Section — Unfolds Gradually */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-24">
          {/* Left Hero Statement (Columns 1-7) */}
          <div className="lg:col-span-7">
            <KairosDepthReveal delay={0.2} withFrame={true} highlight={true}>
              <div className="space-y-6">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#2E5A44] font-semibold">
                  MANIFESTO
                </span>
                <p className="font-display text-2xl sm:text-3xl text-[#0B0F0D] font-light italic leading-relaxed">
                  &ldquo;We do not merely construct enclosures; we curate light, shadow, and materiality into living spaces designed to outlive ephemeral trends.&rdquo;
                </p>
                <div className="h-px bg-[#2E5A44]/30 w-24 pt-2" />
                <p className="text-sm sm:text-base text-[#2A332E] font-light leading-relaxed">
                  Founded on the conviction that timeless architecture demands an uncompromising balance between aesthetic poise and engineering rigor. Every commission—from bespoke private residences to commercial towers—is conceived from the ground up as a bespoke masterwork.
                </p>
              </div>
            </KairosDepthReveal>
          </div>

          {/* Right Narrative Pillar (Columns 8-12) */}
          <div className="lg:col-span-5 space-y-8 lg:pt-8">
            {siteContent.about.pillars.map((pillar, idx) => (
              <KairosDepthReveal key={idx} delay={0.25 + idx * 0.12}>
                <div className="p-6 border border-[#24322A]/15 border-l-4 border-l-[#2E5A44] bg-white/90 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300">
                  <span className="text-[10px] font-mono text-[#2E5A44] font-semibold tracking-widest uppercase">
                    DISCIPLINE 0{idx + 1}
                  </span>
                  <h3 className="font-display text-xl text-[#0B0F0D] font-normal tracking-wide mt-1.5 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#2A332E] font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </KairosDepthReveal>
            ))}
          </div>
        </div>

        {/* Minimalist Architectural Metric Matrix */}
        <KairosStaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-16 border-t border-[#24322A]/60"
        >
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              variants={kairosChildVariant}
              className="p-6 sm:p-8 bg-white/90 backdrop-blur-md border border-[#24322A]/15 hover:border-[#2E5A44]/50 shadow-lg hover:shadow-xl transition-all duration-400"
            >
              <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-[#2E5A44] mb-2 tracking-tight">
                {metric.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold tracking-wider text-[#0B0F0D] uppercase font-mono">
                {metric.label}
              </div>
              <div className="text-[11px] text-[#41554A] font-mono mt-1 font-medium">
                {metric.sub}
              </div>
            </motion.div>
          ))}
        </KairosStaggerContainer>

        {/* Narrative Flow CTAs */}
        <KairosDepthReveal delay={0.4}>
          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-[#24322A]/40 text-xs font-mono uppercase tracking-[0.2em]">
            <a
              href="#services"
              onClick={scrollToServices}
              className="group inline-flex items-center gap-2 text-[#C5B083] hover:text-[#F5F3EF] transition-colors"
            >
              <span>Explore Architectural Disciplines</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href="#contact"
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 text-[#9EA8A1] hover:text-[#C5B083] transition-colors"
            >
              <span>Commission A Consultation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </KairosDepthReveal>
      </div>
    </section>
  );
};
