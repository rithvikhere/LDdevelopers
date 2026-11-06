"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteAssets } from "@/config/site-assets";
import { siteContent } from "@/config/site-content";
import { ArrowUpRight, CheckCircle2, ShieldCheck, Ruler, Scale } from "lucide-react";

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 bg-[#F3F0E8] text-[#202622] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Tag */}
        <div className="mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#526653] font-semibold block mb-3">
            {siteContent.about.tag}
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-normal text-[#202622] tracking-tight leading-[1.15] max-w-3xl">
            {siteContent.about.title}
          </h2>
        </div>

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Narrative Copy */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="font-display text-xl sm:text-2xl text-[#526653] italic font-light leading-relaxed mb-6">
              &ldquo;{siteContent.about.lead}&rdquo;
            </p>

            <div className="space-y-4 text-sm sm:text-base text-[#202622]/85 font-light leading-relaxed mb-10">
              {siteContent.about.paragraphs.map((p, i) => (
                <p key={i} className={i === 0 ? "text-xs font-mono text-[#526653] bg-[#D9D2C4]/40 p-3 border-l-2 border-[#526653]" : ""}>
                  {p}
                </p>
              ))}
            </div>

            {/* Three Foundational Pillars */}
            <div className="space-y-6 pt-6 border-t border-[#D9D2C4]">
              {siteContent.about.pillars.map((pillar, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-none bg-[#526653]/15 text-[#526653] flex items-center justify-center shrink-0 mt-0.5 border border-[#526653]/30">
                    {idx === 0 ? (
                      <Ruler className="w-4 h-4" />
                    ) : idx === 1 ? (
                      <ShieldCheck className="w-4 h-4" />
                    ) : (
                      <Scale className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#202622]">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#202622]/75 font-light mt-1 leading-normal">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link
                href="#services"
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#526653] hover:text-[#202622] transition-colors"
              >
                <span>View Our Capabilities</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Architectural Photography Pairing */}
          <div className="lg:col-span-6 relative">
            <div className="relative">
              {/* Primary Large Image */}
              <div className="relative aspect-[4/5] w-full overflow-hidden shadow-2xl bg-[#D9D2C4]">
                <Image
                  src={siteAssets.about.primaryImage}
                  alt={siteAssets.about.altPrimary}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute bottom-4 left-4 bg-[#202622]/85 text-[#F3F0E8] px-3 py-1.5 text-[10px] tracking-[0.18em] uppercase backdrop-blur-xs">
                  Sample Architectural Concept
                </div>
              </div>

              {/* Overlapping Secondary Inset Image */}
              <div className="hidden sm:block absolute -bottom-10 -left-10 w-2/5 aspect-[3/4] overflow-hidden shadow-2xl border-4 border-[#F3F0E8] bg-[#202622]">
                <Image
                  src={siteAssets.about.secondaryImage}
                  alt={siteAssets.about.altSecondary}
                  fill
                  sizes="(max-width: 640px) 0vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[#202622]/20" />
              </div>

              {/* Subtle Champagne Brass Graphic Accent */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-[#B49A68] pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

