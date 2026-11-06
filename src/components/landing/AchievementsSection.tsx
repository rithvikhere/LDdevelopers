"use client";

import React from "react";
import { siteAssets } from "@/config/site-assets";
import { siteContent } from "@/config/site-content";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { Award } from "lucide-react";

export const AchievementsSection: React.FC = () => {
  return (
    <section
      id="achievements"
      className="py-24 sm:py-32 bg-[#1E2521] text-[#FAF9F5] relative overflow-hidden transition-colors"
    >
      {/* Subtle top architectural hairline divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#343B33] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <MotionReveal className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 bg-[#B49A65]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#B49A65] font-semibold">
              {siteContent.achievements.tag}
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-light text-[#FAF9F5] tracking-tight leading-[1.12]">
            {siteContent.achievements.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#FAF9F5]/75 font-light leading-relaxed max-w-2xl">
            {siteContent.achievements.subtitle}
          </p>
        </MotionReveal>

        {/* Four Milestone Metrics (Design Variation D — Minimal Ledger, No Boxes) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 border-y border-[#343B33] py-12 mb-12">
          {siteAssets.achievements.map((item, idx) => (
            <MotionReveal
              key={item.id}
              delay={idx * 0.08}
              className="lg:border-r lg:border-[#343B33] lg:last:border-r-0 lg:px-8 first:lg:pl-0 last:lg:pr-0"
            >
              <div className="flex flex-col justify-between h-full group">
                <div>
                  {/* Monumental Serif Metric */}
                  <div className="font-display text-5xl sm:text-6xl lg:text-7xl text-[#B49A65] font-light tracking-tight leading-none mb-3">
                    {item.metric}
                  </div>

                  <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#FAF9F5]">
                    {item.label}
                  </h3>

                  <p className="mt-3 text-xs text-[#FAF9F5]/70 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Status Note / Integrity Notice */}
                <div className="mt-8 pt-4 border-t border-[#343B33]/60 flex items-center gap-1.5 text-[10px] text-[#B49A65]/80 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B49A65]/60" />
                  <span>{item.statusNote}</span>
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>

        {/* Verification Transparency Notice */}
        <MotionReveal delay={0.35}>
          <div className="p-4 bg-[#252C27] border border-[#343B33] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#FAF9F5]/70 font-mono">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#B49A65] shrink-0" />
              <span>{siteContent.achievements.verificationNotice}</span>
            </div>
            <span className="text-[11px] uppercase tracking-wider text-[#B49A65]/90">
              Integrity First Policy
            </span>
          </div>

          {/* Customer Journey Bridge to Contact */}
          <div className="mt-12 pt-8 border-t border-[#343B33] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <p className="text-lg text-[#FAF9F5] font-light font-display">
                Ready to transform architectural precision into your next landmark?
              </p>
              <p className="text-xs text-[#FAF9F5]/60 font-light mt-0.5">
                Our principal desk reviews site dimensions, bylaws, and engineering viability.
              </p>
            </div>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("contact");
                if (el) {
                  const offset = el.getBoundingClientRect().top + window.pageYOffset - 72;
                  window.scrollTo({ top: offset, behavior: "smooth" });
                }
              }}
              className="inline-flex items-center gap-2 bg-[#506653] hover:bg-[#1E2521] text-[#FAF9F5] px-6 py-3 text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 shadow-md border border-[#B49A65]/40 hover:border-[#B49A65] shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A65]"
            >
              <span>Initiate Consultation Below</span>
            </a>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
};
