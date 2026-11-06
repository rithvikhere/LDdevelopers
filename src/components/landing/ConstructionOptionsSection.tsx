"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteAssets } from "@/config/site-assets";
import { siteContent } from "@/config/site-content";
import { ArrowUpRight, Maximize2, Layers, CheckCircle } from "lucide-react";

export const ConstructionOptionsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      id="options"
      className="py-24 sm:py-32 bg-[#202622] text-[#F3F0E8] relative overflow-hidden"
    >
      {/* Decorative Champagne Grid Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B49A68]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B49A68] font-semibold block mb-3">
            {siteContent.constructionOptions.tag}
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-normal text-[#F3F0E8] tracking-tight leading-[1.12]">
            {siteContent.constructionOptions.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#D9D2C4]/80 font-light leading-relaxed">
            {siteContent.constructionOptions.subtitle}
          </p>
        </div>

        {/* Tab Pills for Plot Formats */}
        <div className="flex flex-wrap gap-2.5 sm:gap-4 mb-12 border-b border-[#343B33] pb-6">
          {siteAssets.constructionOptions.map((opt, index) => (
            <button
              key={opt.id}
              onClick={() => setActiveTab(index)}
              type="button"
              className={`px-4 sm:px-6 py-2.5 text-xs uppercase tracking-[0.16em] font-medium transition-all duration-300 border ${
                activeTab === index
                  ? "bg-[#B49A68] text-[#202622] border-[#B49A68] font-semibold"
                  : "bg-[#343B33]/60 text-[#D9D2C4] border-[#343B33] hover:border-[#B49A68]/40 hover:text-[#F3F0E8]"
              }`}
            >
              {opt.type}
            </button>
          ))}
        </div>

        {/* Active Option Showcase Card */}
        {(() => {
          const current = siteAssets.constructionOptions[activeTab];
          return (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#252C27] border border-[#343B33] p-6 sm:p-10 shadow-2xl">
              {/* Left Column: Visual */}
              <div className="lg:col-span-6 relative aspect-[4/3] w-full overflow-hidden bg-[#202622]">
                <Image
                  src={current.image}
                  alt={current.type}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#202622] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 bg-[#202622]/90 border border-[#B49A68]/30 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-[#B49A68]">
                  Sample Typology Model
                </div>
              </div>

              {/* Right Column: Parameters and Specifications */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#B49A68] font-semibold">
                      Format Specification
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-4xl text-[#F3F0E8]">
                    {current.type}
                  </h3>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-[#343B33]">
                    <div className="flex items-start gap-3">
                      <Maximize2 className="w-4 h-4 text-[#B49A68] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[11px] uppercase tracking-wider text-[#D9D2C4]/60 block">
                          Suggested Plot Area
                        </span>
                        <span className="text-sm text-[#F3F0E8] font-medium">
                          {current.recommendedPlotSize}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Layers className="w-4 h-4 text-[#B49A68] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[11px] uppercase tracking-wider text-[#D9D2C4]/60 block">
                          Ideal Target
                        </span>
                        <span className="text-sm text-[#F3F0E8] font-medium">
                          {current.idealFor}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-6 text-sm text-[#D9D2C4]/90 font-light leading-relaxed">
                    {current.description}
                  </p>

                  <div className="mt-6 space-y-2.5">
                    {current.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-[#D9D2C4]">
                        <CheckCircle className="w-3.5 h-3.5 text-[#526653]" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-[#343B33] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <span className="text-[11px] text-[#B49A68]/80 italic">
                    {siteContent.constructionOptions.disclaimer}
                  </span>
                  <Link
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 bg-[#526653] hover:bg-[#343B33] text-[#F3F0E8] px-6 py-3 border border-[#B49A68]/40 text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 shadow-md shrink-0"
                  >
                    <span>Check Plot Feasibility</span>
                    <ArrowUpRight className="w-4 h-4 text-[#B49A68]" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
};

