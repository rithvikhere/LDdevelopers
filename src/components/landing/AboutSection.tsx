"use client";

import React from "react";
import { siteContent } from "@/config/site-content";
import { motion } from "framer-motion";

/**
 * AboutSection Component — Kairos Editorial Narrative
 * - Pure typographic & architectural spatial composition (no generic 2-column image layout)
 * - Large editorial typography with forward-moving scroll reveals
 * - Generous spacing, asymmetric chapter blocks, and minimal geometric hairline frames
 */
export const AboutSection: React.FC = () => {
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Left Column: Manifesto Card (Full Height) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="h-full flex flex-col"
          >
            <div className="flex-1 border border-[#24322A]/20 bg-[#F5F2EB]/95 backdrop-blur-md p-8 sm:p-12 shadow-xl hover:shadow-2xl hover:border-[#2E5A44]/50 transition-all duration-300 flex flex-col justify-between">
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
      </div>
    </section>
  );
};
