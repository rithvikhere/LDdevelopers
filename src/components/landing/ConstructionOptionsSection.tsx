"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteAssets } from "@/config/site-assets";
import { siteContent } from "@/config/site-content";
import {
  KairosDepthReveal,
  KairosMaskedText,
} from "@/components/ui/KairosScrollReveal";
import { ArrowUpRight, Check, Ruler, ShieldCheck } from "lucide-react";

/** compact: tighter vertical rhythm + <h1> heading for use as a standalone route page. */
export const ConstructionOptionsSection: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [activeTab, setActiveTab] = useState(0);

  const currentOption = siteAssets.constructionOptions[activeTab] || siteAssets.constructionOptions[0];

  return (
    <section
      id="options"
      className={`${compact ? "pt-10 pb-20 sm:pt-12 sm:pb-24" : "py-28 sm:py-36 lg:py-44"} bg-transparent text-[#212121] relative overflow-hidden transition-colors`}
    >
      <div className="absolute inset-0 bg-architectural-grid opacity-15 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header — Centered & Prominent */}
        <div className="flex flex-col items-center text-center mx-auto max-w-4xl mb-16 sm:mb-20">
          <KairosDepthReveal delay={0.05}>
            <div className="flex flex-col items-center justify-center text-center mx-auto mb-6">
              <span className="text-sm sm:text-base md:text-lg font-mono tracking-[0.3em] text-[#212121] uppercase font-semibold">
                03 / EXECUTION FRAMEWORKS
              </span>
            </div>
          </KairosDepthReveal>

          <KairosMaskedText delay={0.15} as={compact ? "h1" : "h2"} className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#212121] tracking-tight leading-[1.12] mb-6">
            {siteContent.constructionOptions.title}
          </KairosMaskedText>

          <KairosDepthReveal delay={0.25}>
            <p className="text-xs sm:text-sm text-[#212121]/75 max-w-2xl mx-auto font-light leading-relaxed font-mono">
              Tailored structural delivery modalities accommodating varied land parcel dimensions, regulatory parameters, and bespoke client timelines.
            </p>
          </KairosDepthReveal>
        </div>

        {/* Minimalist Typology Switcher Tabs — Centered */}
        <KairosDepthReveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 border-b border-[#212121]/60 pb-6">
            {siteAssets.constructionOptions.map((opt, index) => (
              <button
                key={opt.id}
                onClick={() => setActiveTab(index)}
                type="button"
                className={`px-5 py-2.5 text-[11px] font-mono uppercase tracking-[0.2em] transition-all duration-300 border cursor-pointer ${
                  activeTab === index
                    ? "bg-[#D3ECCD] text-[#212121] border-[#06923E] font-semibold shadow-md"
                    : "bg-transparent text-[#212121] border-[#212121]/40 hover:bg-[#E67514] hover:border-[#E67514]"
                }`}
              >
                {opt.type}
              </button>
            ))}
          </div>
        </KairosDepthReveal>

        {/* Dynamic Architectural Engineering Matrix */}
        {currentOption && (
          <KairosDepthReveal key={currentOption.id} delay={0.15} withFrame={false}>
            <div className="border border-[#212121]/20 bg-[#D3ECCD]/95 backdrop-blur-md shadow-2xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Visual Imagery */}
                <div className="lg:col-span-6 relative min-h-[340px] sm:min-h-[440px] lg:min-h-[500px] overflow-hidden bg-[#212121]">
                  <Image
                    src={currentOption.image}
                    alt={currentOption.type}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 bg-[#212121]/85 backdrop-blur-md px-3 py-1 border border-[#212121]/20 text-[10px] font-mono tracking-widest text-[#E67514] uppercase">
                    TYPOLOGY BLUEPRINT
                  </div>
                </div>

                {/* Technical Specifications */}
                <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-between space-y-8">
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#212121] font-semibold">
                      RECOMMENDED SPECIFICATION
                    </span>
                    <h3 className="font-display text-3xl sm:text-4xl font-light text-[#212121] leading-tight">
                      {currentOption.type}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#212121] font-light leading-relaxed">
                      {currentOption.description}
                    </p>
                  </div>

                  {/* Specification Badges */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#212121]/15 font-mono text-xs">
                    <div className="p-4 bg-[#CADCAE] border border-[#212121]/15 shadow-xs">
                      <div className="flex items-center gap-2 text-[#212121] mb-1 font-semibold">
                        <Ruler className="w-3.5 h-3.5" />
                        <span className="text-[10px] uppercase">PLOT DIMENSIONS</span>
                      </div>
                      <div className="text-[#212121] font-semibold">{currentOption.recommendedPlotSize}</div>
                    </div>

                    <div className="p-4 bg-[#CADCAE] border border-[#212121]/15 shadow-xs">
                      <div className="flex items-center gap-2 text-[#212121] mb-1 font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span className="text-[10px] uppercase">OPTIMAL FOR</span>
                      </div>
                      <div className="text-[#212121] font-semibold truncate">{currentOption.idealFor}</div>
                    </div>
                  </div>

                  {/* Feature Deliverables List */}
                  <div className="space-y-3 pt-4 border-t border-[#212121]/15">
                    <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#212121]/75 font-semibold">
                      CORE STRUCTURAL INCLUSIONS
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {currentOption.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-[#212121] font-medium">
                          <Check className="w-3.5 h-3.5 text-[#06923E] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Consultation CTA */}
                  <div className="pt-6 border-t border-[#212121]/20">
                    <Link
                      href="/#enquiry"
                      className="inline-flex items-center justify-between w-full py-3.5 px-6 bg-[#06923E] hover:bg-[#212121] border border-[#06923E] hover:border-[#212121] text-white text-xs font-mono uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-md"
                    >
                      <span>Consult on This Typology</span>
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </KairosDepthReveal>
        )}
      </div>
    </section>
  );
};
