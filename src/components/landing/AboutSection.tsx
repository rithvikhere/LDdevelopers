"use client";

import React from "react";
import Image from "next/image";
import { siteAssets } from "@/config/site-assets";
import { siteContent } from "@/config/site-content";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { ArrowUpRight, ShieldCheck, Ruler, Scale } from "lucide-react";

export const AboutSection: React.FC = () => {
  const scrollToServices = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("services");
    if (el) {
      const offset = el.getBoundingClientRect().top + window.pageYOffset - 72;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  return (
    <section id="about" className="py-24 sm:py-32 bg-[#F3F0E8] text-[#202622] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Tag */}
        <MotionReveal className="mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#526653] font-semibold block mb-3">
            {siteContent.about.tag}
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-normal text-[#202622] tracking-tight leading-[1.15] max-w-3xl">
            {siteContent.about.title}
          </h2>
        </MotionReveal>

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Narrative Copy */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <MotionReveal delay={0.1}>
              <p className="font-display text-xl sm:text-2xl text-[#526653] italic font-light leading-relaxed mb-6">
                &ldquo;{siteContent.about.lead}&rdquo;
              </p>
            </MotionReveal>

            <MotionReveal delay={0.15}>
              <div className="space-y-4 text-sm sm:text-base text-[#202622]/85 font-light leading-relaxed mb-10">
                {siteContent.about.paragraphs.map((p, i) => (
                  <p key={i} className={i === 0 ? "text-xs font-mono text-[#526653] bg-[#D9D2C4]/40 p-3 border-l-2 border-[#526653]" : ""}>
                    {p}
                  </p>
                ))}
              </div>
            </MotionReveal>

            {/* Three Foundational Pillars */}
            <div className="space-y-6 pt-6 border-t border-[#D9D2C4]">
              {siteContent.about.pillars.map((pillar, idx) => (
                <MotionReveal key={idx} delay={0.2 + idx * 0.08}>
                  <div className="flex items-start gap-4 group">
                    <div className="w-8 h-8 rounded-none bg-[#526653]/15 text-[#526653] flex items-center justify-center shrink-0 mt-0.5 border border-[#526653]/30 group-hover:bg-[#526653] group-hover:text-[#F3F0E8] transition-colors">
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
                </MotionReveal>
              ))}
            </div>

            <MotionReveal delay={0.4}>
              <div className="mt-10">
                <a
                  href="#services"
                  onClick={scrollToServices}
                  className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#526653] hover:text-[#202622] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#526653]"
                >
                  <span>View Our Capabilities</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </MotionReveal>
          </div>

          {/* Right Column: Architectural Photography Pairing */}
          <div className="lg:col-span-6 relative">
            <MotionReveal delay={0.2} direction="right">
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
                  <div className="absolute bottom-4 left-4 bg-[#202622]/85 text-[#F3F0E8] px-3 py-1.5 text-[10px] tracking-[0.18em] uppercase backdrop-blur-xs font-mono">
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

                {/* Champagne Brass Architectural Graphic Accent */}
                <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-[#B49A68] pointer-events-none" />
              </div>
            </MotionReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
