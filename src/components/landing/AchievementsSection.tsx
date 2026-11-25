"use client";

import React from "react";
import { siteAssets } from "@/config/site-assets";
import { siteContent } from "@/config/site-content";
import {
  KairosDepthReveal,
  KairosMaskedText,
  KairosStaggerContainer,
  kairosChildVariant,
} from "@/components/ui/KairosScrollReveal";
import { motion } from "framer-motion";
import { Award, Clock } from "lucide-react";

/** compact: tighter vertical rhythm + <h1> heading for use as a standalone route page. */
export const AchievementsSection: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  return (
    <section
      id="achievements"
      className={`${compact ? "pt-10 pb-20 sm:pt-12 sm:pb-24" : "py-28 sm:py-36 lg:py-44"} bg-transparent text-[#212121] relative overflow-hidden transition-colors`}
    >
      <div className="absolute inset-0 bg-architectural-grid opacity-15 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header — Centered & Prominent */}
        <div className="flex flex-col items-center text-center mx-auto max-w-4xl mb-16 sm:mb-24">
          <KairosDepthReveal delay={0.05}>
            <div className="flex flex-col items-center justify-center text-center mx-auto mb-6">
              <span className="text-sm sm:text-base md:text-lg font-mono tracking-[0.3em] text-[#212121] uppercase font-semibold">
                06 / PROVEN MILESTONES
              </span>
            </div>
          </KairosDepthReveal>

          <KairosMaskedText delay={0.15} as={compact ? "h1" : "h2"} className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#212121] tracking-tight leading-[1.12] mb-6">
            {siteContent.achievements.title}
          </KairosMaskedText>

          <KairosDepthReveal delay={0.25}>
            <p className="text-xs sm:text-sm text-[#212121]/75 max-w-2xl mx-auto font-light leading-relaxed font-mono">
              {siteContent.achievements.subtitle}
            </p>
          </KairosDepthReveal>
        </div>

        {/* Monumental Architectural Milestone Ledger */}
        <KairosStaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6"
        >
          {siteAssets.achievements.map((item) => (
            <motion.div
              key={item.id}
              variants={kairosChildVariant}
              className="p-6 sm:p-8 bg-[#D3ECCD]/95 backdrop-blur-md border border-[#212121]/20 shadow-xl hover:shadow-2xl hover:border-[#06923E]/50 transition-all duration-300"
            >
              <div className="flex flex-col justify-between h-full group">
                <div>
                  <div className="font-display text-5xl sm:text-6xl font-light text-[#212121] tracking-tight leading-none mb-4 group-hover:scale-105 transition-transform duration-300 origin-left">
                    {item.metric}
                  </div>

                  <h3 className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[#212121]">
                    {item.label}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-[#212121] font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#212121]/15 flex items-center gap-2 text-[10px] text-[#212121]/75 font-mono font-semibold uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5 text-[#212121]/75" />
                  <span>Awaiting client verification</span>
                </div>
              </div>
            </motion.div>
          ))}
        </KairosStaggerContainer>

        {/* Quality Seal Assurance */}
        <KairosDepthReveal delay={0.35} withFrame={false} className="mt-14">
          <div className="p-8 border border-[#212121]/20 bg-[#D3ECCD]/95 backdrop-blur-md shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#CADCAE] border border-[#212121]/20 shadow-xs">
                <Award className="w-5 h-5 text-[#06923E]" />
              </div>
              <div>
                <h4 className="text-sm font-display text-[#212121] font-medium tracking-wide">
                  Warranties &amp; Certifications
                </h4>
                <p className="text-xs text-[#212121] font-mono mt-0.5">
                  [Warranty terms and certifications will be listed here once confirmed by the company.]
                </p>
              </div>
            </div>

            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#212121] font-semibold border border-[#06923E]/30 px-4 py-2 bg-[#CADCAE] shadow-xs">
              [Pending verification]
            </span>
          </div>
        </KairosDepthReveal>

        <p className="mt-8 text-center text-[11px] font-mono text-[#212121]/75 leading-relaxed">
          {siteContent.achievements.verificationNotice}
        </p>
      </div>
    </section>
  );
};
