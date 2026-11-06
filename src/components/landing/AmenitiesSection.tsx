"use client";

import React from "react";
import { siteAssets } from "@/config/site-assets";
import { siteContent } from "@/config/site-content";
import {
  ShieldCheck,
  Gem,
  Sparkles,
  Cpu,
  Leaf,
  Award,
  CheckCircle2,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-[#526653]" />,
  Gem: <Gem className="w-6 h-6 text-[#526653]" />,
  Sparkles: <Sparkles className="w-6 h-6 text-[#526653]" />,
  Cpu: <Cpu className="w-6 h-6 text-[#526653]" />,
  Leaf: <Leaf className="w-6 h-6 text-[#526653]" />,
  Award: <Award className="w-6 h-6 text-[#526653]" />,
};

export const AmenitiesSection: React.FC = () => {
  return (
    <section
      id="amenities"
      className="py-24 sm:py-32 bg-[#F3F0E8] text-[#202622] border-t border-[#D9D2C4] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="text-xs uppercase tracking-[0.25em] text-[#526653] font-semibold block mb-3">
            {siteContent.amenities.tag}
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-normal text-[#202622] tracking-tight leading-[1.12]">
            {siteContent.amenities.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#202622]/75 font-light leading-relaxed">
            {siteContent.amenities.subtitle}
          </p>
        </div>

        {/* Editorial Grid of Quality Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteAssets.amenities.map((item) => (
            <div
              key={item.id}
              className="bg-[#D9D2C4]/35 p-8 border border-[#D9D2C4] hover:border-[#526653]/60 transition-all duration-300 flex flex-col justify-between group hover:bg-[#D9D2C4]/60"
            >
              <div>
                <div className="w-12 h-12 bg-[#F3F0E8] border border-[#D9D2C4] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {iconMap[item.icon] || <CheckCircle2 className="w-6 h-6 text-[#526653]" />}
                </div>

                <span className="text-[11px] uppercase tracking-[0.2em] text-[#526653] font-semibold block mb-1">
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
                <span>Standard Grade</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
