"use client";

import React from "react";
import { siteAssets } from "@/config/site-assets";
import { siteContent } from "@/config/site-content";
import { ShieldAlert, Award } from "lucide-react";

export const AchievementsSection: React.FC = () => {
  return (
    <section
      id="achievements"
      className="py-24 sm:py-32 bg-[#202622] text-[#F3F0E8] border-t border-[#343B33] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B49A68] font-semibold block mb-3">
            {siteContent.achievements.tag}
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-normal text-[#F3F0E8] tracking-tight leading-[1.12]">
            {siteContent.achievements.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#D9D2C4]/80 font-light leading-relaxed">
            {siteContent.achievements.subtitle}
          </p>
        </div>

        {/* Four Refined Metric Displays */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {siteAssets.achievements.map((item) => (
            <div
              key={item.id}
              className="bg-[#252C27] border border-[#343B33] p-8 flex flex-col justify-between relative group hover:border-[#B49A68]/50 transition-colors"
            >
              <div>
                {/* Metric with prominent champagne display */}
                <div className="font-display text-5xl sm:text-6xl text-[#B49A68] font-light tracking-tight leading-none mb-3">
                  {item.metric}
                </div>

                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#F3F0E8]">
                  {item.label}
                </h3>

                <p className="mt-3 text-xs text-[#D9D2C4]/70 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Status Note / Integrity Notice */}
              <div className="mt-8 pt-4 border-t border-[#343B33] flex items-center gap-1.5 text-[10px] text-[#B49A68]/70 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B49A68]/60" />
                <span>{item.statusNote}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Transparency Notice */}
        <div className="mt-12 p-4 bg-[#252C27]/70 border border-[#343B33] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#D9D2C4]/70 font-mono">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#B49A68] shrink-0" />
            <span>{siteContent.achievements.verificationNotice}</span>
          </div>
          <span className="text-[11px] uppercase tracking-wider text-[#B49A68]/90">
            Integrity First Policy
          </span>
        </div>
      </div>
    </section>
  );
};

