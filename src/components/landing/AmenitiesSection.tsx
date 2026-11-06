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
      className="py-28 sm:py-36 lg:py-44 bg-[#0B0F0D] text-[#F5F3EF] relative overflow-hidden transition-colors"
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
                  05 / MATERIAL SPECIFICATIONS &amp; AMENITIES
                </span>
                <div className="h-px bg-[#24322A] w-16" />
              </div>
            </KairosDepthReveal>

            <KairosMaskedText delay={0.15} as="h2" className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#F5F3EF] tracking-tight max-w-2xl leading-[1.12]">
              {siteContent.amenities.title}
            </KairosMaskedText>
          </div>

          <KairosDepthReveal delay={0.25}>
            <p className="text-xs sm:text-sm text-[#9EA8A1] max-w-md font-light leading-relaxed font-mono">
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
              className="group p-8 sm:p-10 border border-[#24322A]/60 bg-[#121815]/50 hover:border-[#C5B083]/50 transition-all duration-400 relative overflow-hidden"
            >
              {/* Subtle top indicator bar */}
              <div className="w-8 h-px bg-[#2E5A44] group-hover:bg-[#C5B083] group-hover:w-16 transition-all duration-500 mb-6" />

              <div className="mb-6 flex items-center justify-between">
                <div className="p-3 bg-[#17201B] border border-[#24322A] group-hover:border-[#C5B083]/40 transition-colors">
                  {iconMap[item.icon] || <Sparkles className="w-5 h-5 text-[#C5B083]" />}
                </div>
                <span className="text-[10px] font-mono text-[#9EA8A1] uppercase tracking-widest">
                  SPEC 0{index + 1}
                </span>
              </div>

              <h3 className="font-display text-2xl font-light text-[#F5F3EF] group-hover:text-[#C5B083] transition-colors leading-snug mb-3">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#9EA8A1] font-light leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </KairosStaggerContainer>

        {/* Feature Summary Strip */}
        <KairosDepthReveal delay={0.35} withFrame={false} className="mt-16">
          <div className="p-8 border border-[#24322A] bg-[#121815]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="w-2 h-2 rounded-full bg-[#2E5A44]" />
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#E8E4DC]">
                All structural materials carry independent laboratory metallurgical certification
              </span>
            </div>

            <a
              href="#contact"
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#C5B083] hover:text-[#F5F3EF] transition-colors shrink-0"
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
