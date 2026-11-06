"use client";

import React from "react";
import Image from "next/image";
import { siteAssets } from "@/config/site-assets";
import { siteContent } from "@/config/site-content";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { ArrowUpRight } from "lucide-react";

export const AboutSection: React.FC = () => {
  const scrollToServices = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("services");
    if (el) {
      const offset = el.getBoundingClientRect().top + window.pageYOffset - 72;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

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
      id="about"
      className="py-24 sm:py-32 bg-[#F3F0E7] text-[#1E2521] relative overflow-hidden transition-colors"
    >
      {/* Subtle architectural hairline divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DCD6C9] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Tag */}
        <MotionReveal className="mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 bg-[#506653]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#506653] font-semibold">
              {siteContent.about.tag}
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-light text-[#1E2521] tracking-tight leading-[1.12] max-w-4xl">
            {siteContent.about.title}
          </h2>
        </MotionReveal>

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Narrative Copy & Minimal List Pillars */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <MotionReveal delay={0.1}>
              <p className="font-display text-2xl sm:text-3xl text-[#1E2521] italic font-light leading-[1.3] mb-8 border-l-2 border-[#B49A65] pl-5">
                &ldquo;{siteContent.about.lead}&rdquo;
              </p>
            </MotionReveal>

            {/* Structured Editorial Paragraphs with Generous Whitespace */}
            <MotionReveal delay={0.15}>
              <div className="space-y-4 text-sm sm:text-base text-[#626A66] font-light leading-relaxed mb-10 max-w-xl">
                {siteContent.about.paragraphs.map((p, i) => (
                  <div
                    key={i}
                    className={
                      i === 0
                        ? "p-4 bg-[#FAF9F5] border-l-2 border-[#506653] text-xs font-mono text-[#506653] leading-relaxed shadow-2xs"
                        : "leading-relaxed"
                    }
                  >
                    <p>{p}</p>
                  </div>
                ))}
              </div>
            </MotionReveal>

            {/* Three Foundational Pillars as Minimal List-Based Content (Variation D) */}
            <div className="space-y-2 pt-6 border-t border-[#DCD6C9]">
              {siteContent.about.pillars.map((pillar, idx) => (
                <MotionReveal key={idx} delay={0.2 + idx * 0.08}>
                  <div className="py-4 border-b border-[#DCD6C9]/60 flex items-start gap-5 group hover:border-[#B49A65] transition-colors duration-300">
                    <span className="text-xs font-mono text-[#B49A65] font-semibold tracking-wider pt-0.5">
                      0{idx + 1}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-xs sm:text-sm font-semibold tracking-[0.12em] uppercase text-[#1E2521] group-hover:text-[#506653] transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#626A66] font-light mt-1.5 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </MotionReveal>
              ))}
            </div>

            {/* Navigation & Customer Journey CTAs */}
            <MotionReveal delay={0.4}>
              <div className="mt-10 flex flex-wrap items-center gap-6 pt-4 border-t border-[#DCD6C9]">
                <a
                  href="#services"
                  onClick={scrollToServices}
                  className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#506653] hover:text-[#1E2521] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#506653]"
                >
                  <span>Explore Capabilities</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <span className="text-[#DCD6C9]">&bull;</span>

                <a
                  href="#contact"
                  onClick={scrollToContact}
                  className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#626A66] hover:text-[#B49A65] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B49A65]"
                >
                  <span>Consult An Architect</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#B49A65]" />
                </a>
              </div>
            </MotionReveal>
          </div>

          {/* Right Column: Architectural Photography Pairing */}
          <div className="lg:col-span-6 relative pt-4 sm:pt-0">
            <MotionReveal delay={0.2} direction="right">
              <div className="relative">
                {/* Primary Large Image */}
                <div className="relative aspect-[4/5] w-full overflow-hidden shadow-xl bg-[#FAF9F5] border border-[#DCD6C9]">
                  <Image
                    src={siteAssets.about.primaryImage}
                    alt={siteAssets.about.altPrimary}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute bottom-4 left-4 bg-[#1E2521]/85 text-[#FAF9F5] px-3.5 py-1.5 text-[10px] tracking-[0.2em] uppercase backdrop-blur-md font-mono border border-[#B49A65]/30">
                    Sample Architectural Concept
                  </div>
                </div>

                {/* Overlapping Secondary Inset Image */}
                <div className="hidden sm:block absolute -bottom-10 -left-10 w-2/5 aspect-[3/4] overflow-hidden shadow-2xl border-4 border-[#F3F0E7] bg-[#1E2521]">
                  <Image
                    src={siteAssets.about.secondaryImage}
                    alt={siteAssets.about.altSecondary}
                    fill
                    sizes="(max-width: 640px) 0vw, 25vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[#1E2521]/20" />
                </div>

                {/* Champagne Brass Architectural Graphic Accent */}
                <div className="absolute -top-4 -right-4 w-20 h-20 border-t-2 border-r-2 border-[#B49A65] pointer-events-none" />
              </div>
            </MotionReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
