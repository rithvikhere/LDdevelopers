"use client";

import React from "react";
import Image from "next/image";
import { siteAssets } from "@/config/site-assets";
import { siteContent } from "@/config/site-content";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { HalftoneBackground } from "@/components/ui/HalftoneBackground";
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
      className="py-24 sm:py-32 bg-[#F4F1E8] text-[#252B27] relative isolate overflow-hidden transition-colors"
    >
      {/* Halftone — Subtle Sage on Warm Ivory (Zero Orange / Violet) */}
      <HalftoneBackground variant="ivory" opacity="opacity-30" />

      {/* Subtle architectural hairline divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DCD6C9] to-transparent" />

      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header Tag */}
        <MotionReveal className="mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 bg-[#536957]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#536957] font-semibold">
              {siteContent.about.tag}
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-light text-[#252B27] tracking-tight leading-[1.12] max-w-4xl">
            {siteContent.about.title}
          </h2>
        </MotionReveal>

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Narrative Copy & Minimal List Pillars */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <MotionReveal delay={0.1}>
              <p className="font-display text-2xl sm:text-3xl text-[#252B27] italic font-light leading-[1.3] mb-8 border-l-2 border-[#B89A62] pl-5">
                &ldquo;{siteContent.about.lead}&rdquo;
              </p>
            </MotionReveal>

            {/* Structured Editorial Paragraphs with Generous Whitespace */}
            <MotionReveal delay={0.15}>
              <div className="space-y-4 text-sm sm:text-base text-[#46534B] font-light leading-relaxed mb-10 max-w-xl">
                {siteContent.about.paragraphs.map((p, i) => (
                  <div
                    key={i}
                    className={
                      i === 0
                        ? "p-4 bg-[#FAF9F5] border-l-2 border-[#536957] text-xs font-mono text-[#536957] leading-relaxed shadow-2xs"
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
                  <div className="py-4 border-b border-[#DCD6C9]/60 flex items-start gap-5 group hover:border-[#B89A62] transition-colors duration-300">
                    <span className="text-xs font-mono text-[#B89A62] font-semibold tracking-wider pt-0.5">
                      0{idx + 1}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-xs sm:text-sm font-semibold tracking-[0.12em] uppercase text-[#252B27] group-hover:text-[#536957] transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#46534B] font-light mt-1.5 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </MotionReveal>
              ))}
            </div>

            {/* Navigation & Customer Journey CTAs */}
            <MotionReveal delay={0.35}>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <a
                  href="#services"
                  onClick={scrollToServices}
                  className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-semibold text-[#536957] hover:text-[#252B27] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#536957]"
                >
                  <span>Explore Capabilities</span>
                  <ArrowUpRight className="w-4 h-4 text-[#B89A62] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href="#contact"
                  onClick={scrollToContact}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#46534B] hover:text-[#B89A62] transition-colors font-medium"
                >
                  <span>Initiate Consultation</span>
                </a>
              </div>
            </MotionReveal>
          </div>

          {/* Right Column: Architectural Image Composition */}
          <div className="lg:col-span-6 relative">
            <MotionReveal delay={0.2}>
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#1F2924] border border-[#DCD6C9] shadow-md group">
                <Image
                  src={siteAssets.about.primaryImage}
                  alt={siteAssets.about.altPrimary}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 bg-[#1F2924]/90 border border-[#B89A62]/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-[#B89A62] font-mono backdrop-blur-md">
                  Sample Architectural Concept
                </div>
              </div>
            </MotionReveal>

            {/* Inset Secondary Detail Visual */}
            <MotionReveal delay={0.3}>
              <div className="hidden sm:block absolute -bottom-10 -left-10 w-3/5 aspect-[4/3] overflow-hidden bg-[#1F2924] border-2 border-[#F4F1E8] shadow-2xl">
                <Image
                  src={siteAssets.about.secondaryImage}
                  alt={siteAssets.about.altSecondary}
                  fill
                  sizes="30vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20 pointer-events-none" />
              </div>
            </MotionReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
