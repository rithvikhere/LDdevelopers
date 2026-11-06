"use client";

import React from "react";
import Image from "next/image";
import { siteAssets } from "@/config/site-assets";
import { siteContent } from "@/config/site-content";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { ArrowUpRight } from "lucide-react";

export const ServicesSection: React.FC = () => {
  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("contact");
    if (el) {
      const offset = el.getBoundingClientRect().top + window.pageYOffset - 72;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  // Group services strictly into residential (01-03) and commercial/real estate (04-06)
  const residentialServices = siteAssets.services.slice(0, 3);
  const commercialServices = siteAssets.services.slice(3, 6);

  const primaryResidential = residentialServices[0]; // Houses / Independent Houses
  const secondaryResidential = residentialServices.slice(1, 3); // Duplexes & Villas

  return (
    <section
      id="services"
      className="py-24 sm:py-32 bg-[#F4F1E8] text-[#1F2924] relative overflow-hidden transition-colors"
    >
      {/* Subtle top architectural hairline divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DCD6C9] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================================= */}
        {/* SECTION INTRODUCTION (Editorial Split)                                   */}
        {/* ========================================================================= */}
        <MotionReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 sm:pb-16 border-b border-[#DCD6C9] mb-14 sm:mb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-[#536957]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#536957] font-semibold font-mono">
                03 / CAPABILITIES
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-light text-[#1F2924] tracking-tight leading-[1.12]">
              {siteContent.services.title}
            </h2>
          </div>
          <div className="lg:max-w-md">
            <p className="text-sm sm:text-base text-[#626A66] font-light leading-relaxed">
              {siteContent.services.subtitle}
            </p>
          </div>
        </MotionReveal>

        {/* ========================================================================= */}
        {/* PART A: RESIDENTIAL SERVICES — ASYMMETRICAL EDITORIAL COMPOSITION          */}
        {/* ========================================================================= */}
        <div className="mb-20 sm:mb-28">
          <MotionReveal delay={0.06} className="flex items-center justify-between gap-4 mb-8 sm:mb-10">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-px bg-[#B89A62]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#B89A62] font-semibold">
                01 &bull; BESPOKE RESIDENTIAL PORTFOLIO
              </span>
            </div>
            <span className="hidden sm:inline-block text-xs font-mono text-[#626A66] tracking-wider uppercase">
              Single-Family &bull; Duplex &bull; Estate Villas
            </span>
          </MotionReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* DOMINANT RESIDENTIAL HERO (Service 01: Houses / Independent Houses) */}
            <div className="lg:col-span-7">
              <MotionReveal delay={0.1} className="h-full">
                <div className="bg-[#FAF9F5] border border-[#DCD6C9] p-6 sm:p-9 lg:p-10 flex flex-col justify-between h-full group hover:border-[#B89A62] transition-all duration-300 relative shadow-2xs">
                  {/* Subtle Top-Right Brass Geometric Accent */}
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#B89A62] pointer-events-none" />

                  <div>
                    {/* Generous Architectural Photography */}
                    <div className="relative aspect-[16/11] sm:aspect-[4/3] w-full overflow-hidden bg-[#1F2924] border border-[#DCD6C9]/80 mb-7">
                      <Image
                        src={primaryResidential.image}
                        alt={primaryResidential.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-4 left-4 bg-[#1F2924]/90 text-[#FAF9F5] px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-semibold border border-[#B89A62]/40 backdrop-blur-sm font-mono">
                        01 &bull; {primaryResidential.category}
                      </div>
                      <div className="absolute bottom-4 right-4 bg-black/60 text-[#DCD6C9] px-2.5 py-1 text-[10px] uppercase tracking-wider backdrop-blur-xs font-mono">
                        Sample Architectural Visual
                      </div>
                    </div>

                    {/* Editorial Content */}
                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-[#1F2924] font-light group-hover:text-[#536957] transition-colors leading-tight">
                      {primaryResidential.title}
                    </h3>
                    <p className="text-xs uppercase tracking-[0.18em] text-[#B89A62] mt-1.5 font-light italic">
                      {primaryResidential.tagline}
                    </p>
                    <p className="mt-4 text-sm text-[#626A66] font-light leading-relaxed">
                      {primaryResidential.description}
                    </p>

                    {/* Deliverables / Architectural Specifications */}
                    <div className="mt-7 pt-6 border-t border-[#DCD6C9]">
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#1F2924] font-medium block mb-3">
                        Key Architectural Deliverables
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {primaryResidential.features.map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2.5 text-xs text-[#1F2924]/85">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#536957] shrink-0" />
                            <span className="font-light">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Proposal Action Bar */}
                  <div className="mt-9 pt-6 border-t border-[#DCD6C9] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <span className="text-xs text-[#626A66] font-light font-mono">
                      Architectural brief tailored to plot contour
                    </span>
                    <a
                      href="#contact"
                      onClick={scrollToContact}
                      className="inline-flex items-center justify-center gap-2 bg-[#536957] hover:bg-[#1F2924] active:scale-[0.98] text-[#FAF9F5] px-6 py-3 border border-[#B89A62]/40 hover:border-[#B89A62] text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B89A62]"
                    >
                      <span>Request Proposal</span>
                      <ArrowUpRight className="w-4 h-4 text-[#B89A62] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </MotionReveal>
            </div>

            {/* COMPLEMENTARY RESIDENTIAL PAIR (Service 02: Duplexes & Service 03: Villas) */}
            <div className="lg:col-span-5 flex flex-col gap-8 lg:gap-10">
              {secondaryResidential.map((service, idx) => (
                <MotionReveal key={service.id} delay={0.16 + idx * 0.08} className="flex-1">
                  <div className="bg-[#FAF9F5] border border-[#DCD6C9] p-6 sm:p-7 flex flex-col justify-between h-full group hover:border-[#B89A62] transition-all duration-300 shadow-2xs relative">
                    <div>
                      {/* Image Frame */}
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#1F2924] border border-[#DCD6C9]/80 mb-5">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 42vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute top-3.5 left-3.5 bg-[#1F2924]/90 text-[#FAF9F5] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] font-semibold border border-[#B89A62]/40 backdrop-blur-sm font-mono">
                          0{idx + 2} &bull; {service.category}
                        </div>
                        <div className="absolute bottom-3 right-3 bg-black/60 text-[#DCD6C9] px-2 py-0.5 text-[9px] uppercase tracking-wider backdrop-blur-xs font-mono">
                          Sample Concept
                        </div>
                      </div>

                      {/* Header & Typography */}
                      <h3 className="font-display text-xl sm:text-2xl text-[#1F2924] font-light group-hover:text-[#536957] transition-colors leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-[11px] uppercase tracking-[0.16em] text-[#B89A62] mt-1 font-light italic">
                        {service.tagline}
                      </p>
                      <p className="mt-3 text-xs sm:text-sm text-[#626A66] font-light leading-relaxed">
                        {service.description}
                      </p>

                      {/* Features */}
                      <div className="mt-5 pt-4 border-t border-[#DCD6C9]">
                        <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#1F2924] font-medium block mb-2">
                          Core Specifications
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {service.features.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-2 text-xs text-[#626A66]">
                              <span className="w-1 h-1 rounded-full bg-[#B89A62] shrink-0" />
                              <span className="font-light">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Proposal Action Link */}
                    <div className="mt-6 pt-4 border-t border-[#DCD6C9] flex items-center justify-between">
                      <span className="text-[11px] font-mono text-[#626A66]">
                        Tailored Scope
                      </span>
                      <a
                        href="#contact"
                        onClick={scrollToContact}
                        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-[#536957] hover:text-[#1F2924] font-semibold transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#536957]"
                      >
                        <span>Request Proposal</span>
                        <ArrowUpRight className="w-4 h-4 text-[#B89A62] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </div>
                  </div>
                </MotionReveal>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PART B: COMMERCIAL, LAND & BROKERAGE ADVISORY (Triptych Showcase)         */}
        {/* ========================================================================= */}
        <div>
          <MotionReveal delay={0.2} className="pb-8 border-t border-[#DCD6C9] pt-14 sm:pt-16 mb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2.5 mb-2">
                  <span className="w-2 h-px bg-[#B89A62]" />
                  <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#B89A62] font-semibold">
                    02 &bull; STRATEGIC COMMERCIAL &amp; LAND DISCIPLINES
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-4xl text-[#1F2924] font-light">
                  Commercial Infrastructure &amp; Property Advisory
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#626A66] font-light max-w-md">
                Institutional-grade development, high-yield land acquisitions, and discreet private brokerage managed under single-window accountability.
              </p>
            </div>
          </MotionReveal>

          {/* 3-Column Architectural Ledger */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {commercialServices.map((service, idx) => (
              <MotionReveal key={service.id} delay={0.25 + idx * 0.08}>
                <div className="bg-[#FAF9F5] border border-[#DCD6C9] p-6 sm:p-7 flex flex-col justify-between h-full group hover:border-[#B89A62] transition-all duration-300 shadow-2xs">
                  <div>
                    {/* Image Header with Architectural Proportions */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1F2924] border border-[#DCD6C9]/80 mb-5">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-3 left-3 bg-[#1F2924]/90 text-[#FAF9F5] px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] font-semibold border border-[#B89A62]/40 backdrop-blur-sm font-mono">
                        0{idx + 4} &bull; {service.category}
                      </div>
                      <div className="absolute bottom-2.5 right-2.5 bg-black/60 text-[#DCD6C9] px-2 py-0.5 text-[9px] uppercase tracking-wider backdrop-blur-xs font-mono">
                        Sample Architecture
                      </div>
                    </div>

                    {/* Titles */}
                    <h4 className="font-display text-xl sm:text-2xl text-[#1F2924] group-hover:text-[#536957] transition-colors font-light leading-snug">
                      {service.title}
                    </h4>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-[#B89A62] mt-1 font-light italic">
                      {service.tagline}
                    </p>
                    <p className="mt-3.5 text-xs sm:text-sm text-[#626A66] font-light leading-relaxed">
                      {service.description}
                    </p>

                    {/* Parameters / Specifications */}
                    <div className="mt-5 pt-4 border-t border-[#DCD6C9]">
                      <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-[#1F2924] font-medium block mb-2">
                        Core Parameters
                      </span>
                      <div className="space-y-1.5">
                        {service.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2 text-xs text-[#626A66]">
                            <span className="w-1 h-1 rounded-full bg-[#536957] shrink-0" />
                            <span className="font-light">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Proposal Action Link */}
                  <div className="mt-6 pt-4 border-t border-[#DCD6C9] flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#626A66]">
                      {idx === 0 ? "Commercial Feasibility" : idx === 1 ? "Land Due Diligence" : "Advisory Mandate"}
                    </span>
                    <a
                      href="#contact"
                      onClick={scrollToContact}
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-[#536957] hover:text-[#1F2924] font-semibold transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#536957]"
                    >
                      <span>Request Proposal</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#B89A62] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
