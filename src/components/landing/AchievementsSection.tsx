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
import { Award, ShieldCheck, CheckCircle2 } from "lucide-react";

export const AchievementsSection: React.FC = () => {
  return (
    <section
      id="achievements"
      className="py-28 sm:py-36 lg:py-44 bg-transparent text-[#F5F3EF] relative overflow-hidden transition-colors"
    >
      {/* Top Hairline Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#24322A] to-transparent" />
      <div className="absolute inset-0 bg-architectural-grid opacity-15 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 sm:mb-24">
          <div>
            <KairosDepthReveal delay={0.05}>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[11px] font-mono tracking-[0.25em] text-[#C5B083] uppercase">
                  07 / PROVEN MILESTONES
                </span>
                <div className="h-px bg-[#24322A] w-16" />
              </div>
            </KairosDepthReveal>

            <KairosMaskedText delay={0.15} as="h2" className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#F5F3EF] tracking-tight max-w-2xl leading-[1.12]">
              {siteContent.achievements.title}
            </KairosMaskedText>
          </div>

          <KairosDepthReveal delay={0.25}>
            <p className="text-xs sm:text-sm text-[#9EA8A1] max-w-md font-light leading-relaxed font-mono">
              Verifiable track record of structural excellence, timely delivery, and zero legal disputes across all residential and commercial portfolios.
            </p>
          </KairosDepthReveal>
        </div>

        {/* Monumental Architectural Milestone Ledger */}
        <KairosStaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 border-y border-[#24322A] py-14"
        >
          {siteAssets.achievements.map((item, idx) => (
            <motion.div
              key={item.id}
              variants={kairosChildVariant}
              className="lg:border-r lg:border-[#24322A] lg:last:border-r-0 lg:px-8 first:lg:pl-0 last:lg:pr-0"
            >
              <div className="flex flex-col justify-between h-full group">
                <div>
                  <div className="font-display text-5xl sm:text-6xl lg:text-7xl font-light text-[#C5B083] tracking-tight leading-none mb-4 group-hover:scale-105 transition-transform duration-300 origin-left">
                    {item.metric}
                  </div>

                  <h3 className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-[#F5F3EF]">
                    {item.label}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-[#9EA8A1] font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#24322A]/60 flex items-center gap-2 text-[10px] text-[#C5B083] font-mono uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2E5A44]" />
                  <span>Verified Metric</span>
                </div>
              </div>
            </motion.div>
          ))}
        </KairosStaggerContainer>

        {/* Quality Seal Assurance */}
        <KairosDepthReveal delay={0.35} withFrame={false} className="mt-14">
          <div className="p-8 border border-[#24322A] bg-[#121815]/40 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#17201B] border border-[#24322A]">
                <Award className="w-5 h-5 text-[#C5B083]" />
              </div>
              <div>
                <h4 className="text-sm font-display text-[#F5F3EF] tracking-wide">
                  Master Builder Guarantee &bull; 10-Year Structural Warranty
                </h4>
                <p className="text-xs text-[#9EA8A1] font-mono mt-0.5">
                  Backed by comprehensive architectural insurances and third-party QA auditing.
                </p>
              </div>
            </div>

            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C5B083] border border-[#24322A] px-4 py-2 bg-[#0B0F0D]">
              ISO 9001:2015 CERTIFIED
            </span>
          </div>
        </KairosDepthReveal>
      </div>
    </section>
  );
};
