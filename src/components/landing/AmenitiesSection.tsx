"use client";

import React from "react";
import { siteAssets } from "@/config/site-assets";
import { siteContent } from "@/config/site-content";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { HalftoneBackground } from "@/components/ui/HalftoneBackground";
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
  ShieldCheck: <ShieldCheck className="w-4 h-4 text-[#506653]" />,
  Gem: <Gem className="w-4 h-4 text-[#506653]" />,
  Sparkles: <Sparkles className="w-4 h-4 text-[#506653]" />,
  Cpu: <Cpu className="w-4 h-4 text-[#506653]" />,
  Leaf: <Leaf className="w-4 h-4 text-[#506653]" />,
  Award: <Award className="w-4 h-4 text-[#506653]" />,
};

export const AmenitiesSection: React.FC = () => {
  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("contact");
    if (el) {
      const offset = el.getBoundingClientRect().top + window.pageYOffset - 72;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  return (
    <section
      id="amenities"
      className="py-24 sm:py-32 bg-[#F4F1E8] text-[#252B27] relative isolate overflow-hidden transition-colors"
    >
      {/* Halftone — Subtle Sage on Warm Ivory (Zero Orange / Violet) */}
      <HalftoneBackground variant="ivory" opacity="opacity-25" />

      {/* Subtle top architectural hairline divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DCD6C9] to-transparent" />

      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <MotionReveal className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 bg-[#536957]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#536957] font-semibold">
              {siteContent.amenities.tag}
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-light text-[#252B27] tracking-tight leading-[1.12]">
            {siteContent.amenities.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#626A66] font-light leading-relaxed max-w-2xl">
            {siteContent.amenities.subtitle}
          </p>
        </MotionReveal>

        {/* Architectural Specification Panels (Design Variation B — No generic heavy boxes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {siteAssets.amenities.map((item, idx) => (
            <MotionReveal key={item.id} delay={idx * 0.07}>
              <div
                className="bg-[#FAF9F5] p-8 border border-[#DCD6C9] hover:border-[#B49A65] transition-all duration-300 flex flex-col justify-between group h-full relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-8 h-8 flex items-center justify-center border border-[#DCD6C9] bg-[#FFFFFF]">
                      {iconMap[item.icon] || <ShieldCheck className="w-4 h-4 text-[#506653]" />}
                    </div>
                    <span className="text-[10px] font-mono text-[#B49A65] tracking-widest uppercase">
                      SPEC. 0{idx + 1}
                    </span>
                  </div>

                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#506653] font-semibold block mb-1">
                    {item.subtitle}
                  </span>

                  <h3 className="font-display text-xl sm:text-2xl text-[#1E2521] font-light">
                    {item.title}
                  </h3>

                  <p className="mt-3.5 text-xs sm:text-sm text-[#626A66] font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#DCD6C9]/60 flex items-center justify-between text-[11px] text-[#506653] font-mono">
                  <span>Verified Protocol</span>
                  <span className="text-[#B49A65] font-semibold">Standard Grade</span>
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>

        {/* Customer Journey Link */}
        <MotionReveal delay={0.25}>
          <div className="mt-14 pt-8 border-t border-[#DCD6C9] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <span className="text-xs text-[#626A66]">
              Inquire about customized construction grades and structural certifications.
            </span>
            <a
              href="#contact"
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#506653] hover:text-[#1E2521] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#506653]"
            >
              <span>Consult On Material Specs</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
};
