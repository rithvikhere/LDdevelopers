"use client";

import React, { useState } from "react";
import Image from "next/image";
import { siteAssets } from "@/config/site-assets";
import { siteContent } from "@/config/site-content";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { HalftoneBackground } from "@/components/ui/HalftoneBackground";
import { ArrowUpRight, Maximize2, Layers, CheckCircle } from "lucide-react";

export const ConstructionOptionsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

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
      id="options"
      className="py-24 sm:py-32 bg-[#1F2924] text-[#F4F1E8] relative isolate overflow-hidden transition-colors"
    >
      {/* Halftone — Subtle Champagne Gold on Forest Green (Zero Orange / Violet) */}
      <HalftoneBackground variant="dark" opacity="opacity-35" />

      {/* Decorative Champagne Grid Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B89A62]/40 to-transparent" />

      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <MotionReveal className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 bg-[#B89A62]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#B89A62] font-semibold">
              {siteContent.constructionOptions.tag}
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-light text-[#F4F1E8] tracking-tight leading-[1.12]">
            {siteContent.constructionOptions.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#D8D8CC] font-light leading-relaxed max-w-2xl">
            {siteContent.constructionOptions.subtitle}
          </p>
        </MotionReveal>

        {/* Tab Pills for Plot Formats */}
        <MotionReveal delay={0.1}>
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-12 border-b border-[#343B33] pb-6">
            {siteAssets.constructionOptions.map((opt, index) => (
              <button
                key={opt.id}
                onClick={() => setActiveTab(index)}
                type="button"
                className={`px-5 py-2.5 text-xs uppercase tracking-[0.16em] font-medium transition-all duration-300 border focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B49A65] ${
                  activeTab === index
                    ? "bg-[#B49A65] text-[#1E2521] border-[#B49A65] font-semibold shadow-sm"
                    : "bg-[#252C27]/80 text-[#FAF9F5]/70 border-[#343B33] hover:border-[#B49A65]/40 hover:text-[#FAF9F5]"
                }`}
              >
                {opt.type}
              </button>
            ))}
          </div>
        </MotionReveal>

        {/* Active Option Showcase (Design Variation B — Architectural Information Panel) */}
        {(() => {
          const current = siteAssets.constructionOptions[activeTab];
          return (
            <MotionReveal key={current.id} delay={0.15}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-[#252C27] border border-[#343B33] p-6 sm:p-12 shadow-2xl relative">
                {/* Fine Champagne Corner Accent */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#B49A65] pointer-events-none" />

                {/* Left Column: Typology Visual */}
                <div className="lg:col-span-6 relative aspect-[4/3] w-full overflow-hidden bg-[#1E2521] border border-[#343B33]">
                  <Image
                    src={current.image}
                    alt={current.type}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E2521] via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 bg-[#1E2521]/90 border border-[#B49A65]/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-[#B49A65] font-mono backdrop-blur-md">
                    Sample Typology Model
                  </div>
                </div>

                {/* Right Column: Architectural Specification Sheet (Variation B) */}
                <div className="lg:col-span-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B49A65]">
                        FORMAT SPECIFICATION
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-4xl text-[#FAF9F5] font-light">
                      {current.type}
                    </h3>

                    {/* Parameter Specification Grid */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-[#343B33]">
                      <div className="p-3.5 bg-[#1E2521] border border-[#343B33]">
                        <span className="text-[10px] uppercase tracking-wider text-[#FAF9F5]/60 block font-mono">
                          Suggested Plot Area
                        </span>
                        <span className="text-sm text-[#FAF9F5] font-medium font-mono mt-1 block">
                          {current.recommendedPlotSize}
                        </span>
                      </div>
                      <div className="p-3.5 bg-[#1E2521] border border-[#343B33]">
                        <span className="text-[10px] uppercase tracking-wider text-[#FAF9F5]/60 block font-mono">
                          Ideal Target
                        </span>
                        <span className="text-sm text-[#FAF9F5] font-medium mt-1 block">
                          {current.idealFor}
                        </span>
                      </div>
                    </div>

                    <p className="mt-6 text-sm text-[#FAF9F5]/85 font-light leading-relaxed">
                      {current.description}
                    </p>

                    <div className="mt-6 space-y-2">
                      {current.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-xs text-[#FAF9F5]/80">
                          <CheckCircle className="w-3.5 h-3.5 text-[#506653] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-10 pt-6 border-t border-[#343B33] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <span className="text-[11px] text-[#B49A65]/80 italic font-mono">
                      {siteContent.constructionOptions.disclaimer}
                    </span>
                    <a
                      href="#contact"
                      onClick={scrollToContact}
                      className="inline-flex items-center justify-center gap-2 bg-[#506653] hover:bg-[#1E2521] active:scale-[0.98] text-[#FAF9F5] px-6 py-3 border border-[#B49A65]/50 hover:border-[#B49A65] text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 shadow-md shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A65]"
                    >
                      <span>Check Plot Feasibility</span>
                      <ArrowUpRight className="w-4 h-4 text-[#B49A65]" />
                    </a>
                  </div>
                </div>
              </div>
            </MotionReveal>
          );
        })()}
      </div>
    </section>
  );
};
