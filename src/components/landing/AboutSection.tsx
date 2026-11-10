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
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center text-center mx-auto mb-4"
        >
          <span className="text-sm sm:text-base md:text-lg font-mono tracking-[0.3em] text-[#C5B083] uppercase font-semibold">
            01 / ARCHITECTURAL PROVENANCE
          </span>
        </motion.div>

        {/* Large Editorial Headline — Centered & Fully Visible */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-4xl mx-auto text-center mb-12 sm:mb-16"
        >
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-light text-[#F5F3EF] leading-[1.14] tracking-tight">
            Rooted in structural integrity, spatial purity, and enduring permanence.
          </h2>
        </motion.div>

        {/* Perfectly Aligned Equal-Height 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-6xl mx-auto mb-20">
          {/* Left Column: Manifesto Card (Full Height) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="h-full"
          >
            <div className="h-full border border-[#24322A]/20 bg-[#F5F2EB]/95 backdrop-blur-md p-8 sm:p-12 shadow-xl hover:shadow-2xl hover:border-[#2E5A44]/50 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#1F4A36]" />
                  <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#1F4A36] font-semibold">
                    MANIFESTO
                  </span>
                </div>
                <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl text-[#0B0F0D] font-light italic leading-relaxed">
                  &ldquo;We do not merely construct enclosures; we curate light, shadow, and materiality into living spaces designed to outlive ephemeral trends.&rdquo;
                </blockquote>
              </div>

              <div className="pt-8">
                <div className="h-px bg-[#24322A]/15 w-24 mb-6" />
                <p className="text-xs sm:text-sm text-[#1A231F] font-light leading-relaxed">
                  Founded on the conviction that timeless architecture demands an uncompromising balance between aesthetic poise and engineering rigor. Every commission—from bespoke private residences to commercial towers—is conceived from the ground up as a bespoke masterwork.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3 Balanced Discipline Cards (Exact Same Top & Bottom Alignment) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="h-full flex flex-col justify-between gap-4"
          >
            {siteContent.about.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="flex-1 border border-[#24322A]/20 border-l-4 border-l-[#2E5A44] bg-[#F5F2EB]/95 backdrop-blur-md p-6 sm:p-7 shadow-lg hover:shadow-xl hover:border-[#2E5A44]/50 transition-all duration-300 flex flex-col justify-center"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-[#1F4A36] font-semibold tracking-widest uppercase">
                    DISCIPLINE 0{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono text-[#4A5A51] uppercase tracking-wider font-medium">
                    Core Standard
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl text-[#0B0F0D] font-light tracking-tight mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#1A231F] font-light leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Minimalist Architectural Metric Matrix */}
        <div className="max-w-6xl mx-auto pt-16 border-t border-[#24322A]/60">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {metrics.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{ duration: 0.6, delay: 0.1 * i }}
                className="p-6 sm:p-8 bg-[#F5F2EB]/95 backdrop-blur-md border border-[#24322A]/20 hover:border-[#2E5A44]/50 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-[#1F4A36] mb-2 tracking-tight">
                  {metric.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold tracking-wider text-[#0B0F0D] uppercase font-mono">
                  {metric.label}
                </div>
                <div className="text-[11px] text-[#3B4B42] font-mono mt-1 font-medium">
                  {metric.sub}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Narrative Flow CTAs */}
        <div className="max-w-6xl mx-auto mt-16 flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-[#24322A]/40 text-xs font-mono uppercase tracking-[0.2em]">
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
      </div>
    </section>
  );
};
