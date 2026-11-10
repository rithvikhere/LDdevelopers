"use client";

import React, { useState } from "react";
import Image from "next/image";
import { siteAssets } from "@/config/site-assets";
import { siteContent } from "@/config/site-content";
import {
  KairosDepthReveal,
  KairosMaskedText,
} from "@/components/ui/KairosScrollReveal";
import { ArrowUpRight, Check, Compass, Ruler, Clock, ShieldCheck } from "lucide-react";

export const ConstructionOptionsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("contact");
    if (el) {
      const offset = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  const currentOption = siteAssets.constructionOptions[activeTab] || siteAssets.constructionOptions[0];

  return (
    <section
      id="options"
      className="py-28 sm:py-36 lg:py-44 bg-transparent text-[#F5F3EF] relative overflow-hidden transition-colors"
    >
      <div className="absolute inset-0 bg-architectural-grid opacity-15 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header — Centered & Prominent */}
        <div className="flex flex-col items-center text-center mx-auto max-w-4xl mb-16 sm:mb-20">
          <KairosDepthReveal delay={0.05}>
            <div className="flex flex-col items-center justify-center text-center mx-auto mb-6">
              <span className="text-sm sm:text-base md:text-lg font-mono tracking-[0.3em] text-[#C5B083] uppercase font-semibold">
                03 / EXECUTION FRAMEWORKS
              </span>
            </div>
          </KairosDepthReveal>

          <KairosMaskedText delay={0.15} as="h2" className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#F5F3EF] tracking-tight leading-[1.12] mb-6">
            {siteContent.constructionOptions.title}
          </KairosMaskedText>

          <KairosDepthReveal delay={0.25}>
            <p className="text-xs sm:text-sm text-[#9EA8A1] max-w-2xl mx-auto font-light leading-relaxed font-mono">
              Tailored structural delivery modalities accommodating varied land parcel dimensions, regulatory parameters, and bespoke client timelines.
            </p>
          </KairosDepthReveal>
        </div>

        {/* Minimalist Typology Switcher Tabs — Centered */}
        <KairosDepthReveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 border-b border-[#24322A]/60 pb-6">
            {siteAssets.constructionOptions.map((opt, index) => (
              <button
                key={opt.id}
                onClick={() => setActiveTab(index)}
                type="button"
                className={`px-5 py-2.5 text-[11px] font-mono uppercase tracking-[0.2em] transition-all duration-300 border cursor-pointer ${
                  activeTab === index
                    ? "bg-[#F5F2EB] text-[#0B0F0D] border-[#2E5A44] font-semibold shadow-md"
                    : "bg-[#F5F2EB]/65 text-[#1A231F] border-[#24322A]/20 hover:bg-[#F5F2EB]/95 hover:text-[#0B0F0D]"
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
            <div className="border border-[#24322A]/20 bg-[#F5F2EB]/95 backdrop-blur-md shadow-2xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Visual Imagery */}
                <div className="lg:col-span-6 relative min-h-[340px] sm:min-h-[440px] lg:min-h-[500px] overflow-hidden bg-[#0B0F0D]">
                  <Image
                    src={currentOption.image}
                    alt={currentOption.type}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 bg-[#0B0F0D]/85 backdrop-blur-md px-3 py-1 border border-[#24322A] text-[10px] font-mono tracking-widest text-[#C5B083] uppercase">
                    TYPOLOGY BLUEPRINT
                  </div>
                </div>

                {/* Technical Specifications */}
                <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-between space-y-8">
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#1F4A36] font-semibold">
                      RECOMMENDED SPECIFICATION
                    </span>
                    <h3 className="font-display text-3xl sm:text-4xl font-light text-[#0B0F0D] leading-tight">
                      {currentOption.type}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#1A231F] font-light leading-relaxed">
                      {currentOption.description}
                    </p>
                  </div>

                  {/* Specification Badges */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#24322A]/15 font-mono text-xs">
                    <div className="p-4 bg-[#ECE8DE] border border-[#24322A]/15 shadow-xs">
                      <div className="flex items-center gap-2 text-[#1F4A36] mb-1 font-semibold">
                        <Ruler className="w-3.5 h-3.5" />
                        <span className="text-[10px] uppercase">PLOT DIMENSIONS</span>
                      </div>
                      <div className="text-[#0B0F0D] font-semibold">{currentOption.recommendedPlotSize}</div>
                    </div>

                    <div className="p-4 bg-[#ECE8DE] border border-[#24322A]/15 shadow-xs">
                      <div className="flex items-center gap-2 text-[#1F4A36] mb-1 font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span className="text-[10px] uppercase">OPTIMAL FOR</span>
                      </div>
                      <div className="text-[#0B0F0D] font-semibold truncate">{currentOption.idealFor}</div>
                    </div>
                  </div>

                  {/* Feature Deliverables List */}
                  <div className="space-y-3 pt-4 border-t border-[#24322A]/15">
                    <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#3B4B42] font-semibold">
                      CORE STRUCTURAL INCLUSIONS
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {currentOption.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-[#1A231F] font-medium">
                          <Check className="w-3.5 h-3.5 text-[#1F4A36] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Consultation CTA */}
                  <div className="pt-6 border-t border-[#24322A]/20">
                    <a
                      href="#contact"
                      onClick={scrollToContact}
                      className="inline-flex items-center justify-between w-full py-3.5 px-6 bg-[#0B0F0D] hover:bg-[#2E5A44] border border-[#24322A] text-[#F5F3EF] text-xs font-mono uppercase tracking-[0.2em] transition-all duration-300 shadow-md"
                    >
                      <span>Consult on This Typology</span>
                      <ArrowUpRight className="w-4 h-4 text-[#C5B083]" />
                    </a>
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
