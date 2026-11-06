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
import {
  ShieldCheck,
  Gem,
  Sparkles,
  Cpu,
  Leaf,
  Award,
  ArrowUpRight,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-[#C5B083]" />,
  Gem: <Gem className="w-5 h-5 text-[#C5B083]" />,
  Sparkles: <Sparkles className="w-5 h-5 text-[#C5B083]" />,
  Cpu: <Cpu className="w-5 h-5 text-[#C5B083]" />,
  Leaf: <Leaf className="w-5 h-5 text-[#C5B083]" />,
  Award: <Award className="w-5 h-5 text-[#C5B083]" />,
};

export const AmenitiesSection: React.FC = () => {
  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("contact");
    if (el) {
      const offset = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  return (
    <section
      id="amenities"
      className="py-28 sm:py-36 lg:py-44 bg-transparent text-[#F5F3EF] relative overflow-hidden transition-colors"
    >
      <div className="absolute inset-0 bg-architectural-grid opacity-15 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header — Centered & Prominent */}
        <div className="flex flex-col items-center text-center mx-auto max-w-4xl mb-16 sm:mb-24">
          <KairosDepthReveal delay={0.05}>
            <div className="flex flex-col items-center justify-center text-center mx-auto mb-6">
              <span className="text-sm sm:text-base md:text-lg font-mono tracking-[0.3em] text-[#C5B083] uppercase font-semibold">
                05 / MATERIAL SPECIFICATIONS &amp; AMENITIES
              </span>
            </div>
          </KairosDepthReveal>

          <KairosMaskedText delay={0.15} as="h2" className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#F5F3EF] tracking-tight leading-[1.12] mb-6">
            {siteContent.amenities.title}
          </KairosMaskedText>

          <KairosDepthReveal delay={0.25}>
            <p className="text-xs sm:text-sm text-[#9EA8A1] max-w-2xl mx-auto font-light leading-relaxed font-mono">
              Uncompromising standards of material purity, precision automation, and passive environmental engineering embedded across every build.
            </p>
          </KairosDepthReveal>
        </div>

        {/* Asymmetrical Specification Tiles */}
        <KairosStaggerContainer
          staggerDelay={0.08}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {siteAssets.amenities.map((item, index) => (
            <motion.div
              key={item.id}
              variants={kairosChildVariant}
              className="group p-8 sm:p-10 border border-[#24322A]/15 bg-white/90 backdrop-blur-md shadow-xl hover:shadow-2xl hover:border-[#2E5A44]/50 transition-all duration-400 relative overflow-hidden"
            >
              {/* Subtle top indicator bar */}
              <div className="w-8 h-px bg-[#2E5A44] group-hover:w-16 transition-all duration-500 mb-6" />

              <div className="mb-6 flex items-center justify-between">
                <div className="p-3 bg-white/95 border border-[#24322A]/15 shadow-sm text-[#2E5A44] transition-colors">
                  {iconMap[item.icon] || <Sparkles className="w-5 h-5 text-[#2E5A44]" />}
                </div>
                <span className="text-[10px] font-mono text-[#2E5A44] font-semibold uppercase tracking-widest">
                  SPEC 0{index + 1}
                </span>
              </div>

              <h3 className="font-display text-2xl font-light text-[#0B0F0D] group-hover:text-[#2E5A44] transition-colors leading-snug mb-3">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#2A332E] font-light leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </KairosStaggerContainer>

        {/* Feature Summary Strip */}
        <KairosDepthReveal delay={0.35} withFrame={false} className="mt-16">
          <div className="p-8 border border-[#24322A]/15 bg-white/90 backdrop-blur-md shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2E5A44]" />
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#0B0F0D] font-semibold">
                All structural materials carry independent laboratory metallurgical certification
              </span>
            </div>

            <a
              href="#contact"
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#2E5A44] hover:text-[#0B0F0D] font-semibold transition-colors shrink-0"
            >
              <span>Download Technical Dossier</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </KairosDepthReveal>
      </div>
    </section>
  );
};
