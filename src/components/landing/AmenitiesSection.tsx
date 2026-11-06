"use client";

import React from "react";
import { siteAssets } from "@/config/site-assets";
import { siteContent } from "@/config/site-content";
import { MotionReveal } from "@/components/ui/MotionReveal";
import {
  ShieldCheck,
  Gem,
  Sparkles,
  Cpu,
  Leaf,
  Award,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-[#526653]" />,
  Gem: <Gem className="w-5 h-5 text-[#526653]" />,
  Sparkles: <Sparkles className="w-5 h-5 text-[#526653]" />,
  Cpu: <Cpu className="w-5 h-5 text-[#526653]" />,
  Leaf: <Leaf className="w-5 h-5 text-[#526653]" />,
  Award: <Award className="w-5 h-5 text-[#526653]" />,
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
      className="py-24 sm:py-32 bg-[#F3F0E8] text-[#202622] relative overflow-hidden transition-colors"
    >
      {/* Subtle top architectural hairline divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D9D2C4] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <MotionReveal className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 bg-[#526653]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#526653] font-semibold">
              {siteContent.amenities.tag}
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-light text-[#202622] tracking-tight leading-[1.12]">
            {siteContent.amenities.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#202622]/75 font-light leading-relaxed">
            {siteContent.amenities.subtitle}
          </p>
        </MotionReveal>

        {/* Architectural Specification Ledger (Breaks away from generic card grids) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {siteAssets.amenities.map((item, idx) => (
            <MotionReveal key={item.id} delay={idx * 0.07}>
              <div
                className="bg-[#FFFFFF] p-8 border border-[#D9D2C4] hover:border-[#B49A68] transition-all duration-300 flex flex-col justify-between group shadow-xs hover:shadow-md h-full relative"
              >
                {/* Subtle Champagne Brass Corner Mark */}
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#B49A68]/40 group-hover:border-[#B49A68] transition-colors" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 bg-[#F3F0E8] border border-[#D9D2C4] flex items-center justify-center group-hover:scale-105 transition-transform">
                      {iconMap[item.icon] || <CheckCircle2 className="w-5 h-5 text-[#526653]" />}
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-[#B49A68] uppercase tracking-widest">
                      SPEC. 0{idx + 1}
                    </span>
                  </div>

                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#526653] font-semibold block mb-1">
                    {item.subtitle}
                  </span>

                  <h3 className="font-display text-xl sm:text-2xl text-[#202622] font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-xs sm:text-sm text-[#202622]/80 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#D9D2C4] flex items-center justify-between text-[11px] text-[#526653] font-mono">
                  <span>Verified Protocol</span>
                  <span className="text-[#B49A68] font-semibold">Standard Grade</span>
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>

        {/* Customer Journey Link */}
        <MotionReveal delay={0.25}>
          <div className="mt-14 pt-8 border-t border-[#D9D2C4] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <span className="text-xs text-[#202622]/70">
              Inquire about customized construction grades and structural certifications.
            </span>
            <a
              href="#contact"
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#526653] hover:text-[#202622] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#526653]"
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
