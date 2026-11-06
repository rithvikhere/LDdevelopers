"use client";

import React from "react";
import Image from "next/image";
import { siteAssets } from "@/config/site-assets";
import { siteContent } from "@/config/site-content";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { HalftoneBackground } from "@/components/ui/HalftoneBackground";
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

  // Six defined capabilities from centralized configuration
  const residentialServices = siteAssets.services.slice(0, 3);
  const commercialServices = siteAssets.services.slice(3, 6);

  const housesService = residentialServices[0]; // Houses / Independent Houses
  const duplexesService = residentialServices[1]; // Duplexes
  const villasService = residentialServices[2]; // Villas

  return (
    <section
      id="services"
      className="py-24 sm:py-32 bg-[#F4F1E8] text-[#252B27] relative isolate overflow-hidden transition-colors"
    >
      {/* Halftone — Subtle Sage on Warm Ivory (Zero Orange / Violet) */}
      <HalftoneBackground variant="ivory" opacity="opacity-20" />

      {/* Top architectural hairline divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DCD6C9] to-transparent" />

      {/* Expansive Full-Width Container (90-92% viewport on desktop, max-w-[1720px]) */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* ========================================================================= */}
        {/* SECTION INTRODUCTION (Editorial Split Header)                             */}
        {/* ========================================================================= */}
        <MotionReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 sm:pb-16 border-b border-[#DCD6C9] mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-[#536957]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#536957] font-semibold font-mono">
                03 / CAPABILITIES
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-light text-[#252B27] tracking-tight leading-[1.12]">
              {siteContent.services.title}
            </h2>
          </div>
          <div className="lg:max-w-lg">
            <p className="text-sm sm:text-base text-[#46534B] font-light leading-relaxed">
              {siteContent.services.subtitle}
            </p>
          </div>
        </MotionReveal>

        {/* ========================================================================= */}
        {/* 1. RESIDENTIAL PORTFOLIO — BALANCED ASYMMETRICAL EDITORIAL GRID           */}
        {/* Desktop: Houses (50% / 6-cols) + Duplexes (25% / 3-cols) + Villas (25% / 3-cols) */}
        {/* ========================================================================= */}
        <div className="mb-16 sm:mb-24">
          <MotionReveal delay={0.06} className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-px bg-[#B89A62]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#B89A62] font-semibold">
                01 &bull; BESPOKE RESIDENTIAL ARCHITECTURE
              </span>
            </div>
            <span className="hidden sm:inline-block text-xs font-mono text-[#626A66] tracking-wider uppercase">
              Single-Family &bull; Duplex &bull; Estate Villas
            </span>
          </MotionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* ------------------------------------------------------------------- */}
            {/* HOUSES / INDEPENDENT HOUSES (50% Desktop Width: lg:col-span-6)      */}
            {/* ------------------------------------------------------------------- */}
            <div className="col-span-1 md:col-span-2 lg:col-span-6">
              <MotionReveal delay={0.1} className="h-full">
                <div className="bg-[#FAF9F5] border border-[#DCD6C9] p-6 sm:p-8 flex flex-col justify-between h-full group hover:border-[#B89A62] transition-all duration-300 relative shadow-2xs">
                  {/* Subtle Top-Right Brass Geometric Accent */}
                  <div className="absolute top-0 right-0 w-7 h-7 border-t-2 border-r-2 border-[#B89A62] pointer-events-none" />

                  <div>
                    {/* Generous Architectural Imagery */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1F2924] border border-[#DCD6C9]/80 mb-6">
                      <Image
                        src={housesService.image}
                        alt={housesService.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-3.5 left-3.5 bg-[#1F2924]/90 text-[#FAF9F5] px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold border border-[#B89A62]/40 backdrop-blur-sm font-mono">
                        01 &bull; {housesService.category}
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/60 text-[#DCD6C9] px-2 py-0.5 text-[9px] uppercase tracking-wider backdrop-blur-xs font-mono">
                        Sample Architectural Visual
                      </div>
                    </div>

                    {/* Typography */}
                    <h3 className="font-display text-2xl sm:text-3xl text-[#1F2924] font-light group-hover:text-[#536957] transition-colors leading-snug">
                      {housesService.title}
                    </h3>
                    <p className="text-xs uppercase tracking-[0.16em] text-[#B89A62] mt-1 font-light italic">
                      {housesService.tagline}
                    </p>
                    <p className="mt-3.5 text-xs sm:text-sm text-[#626A66] font-light leading-relaxed">
                      {housesService.description}
                    </p>

                    {/* Specifications: 2-Column Balanced Grid */}
                    <div className="mt-6 pt-5 border-t border-[#DCD6C9]">
                      <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#1F2924] font-medium block mb-2.5">
                        Architectural Deliverables
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {housesService.features.map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-[#1F2924]/85">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#536957] shrink-0" />
                            <span className="font-light">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Proposal Action Bar */}
                  <div className="mt-8 pt-5 border-t border-[#DCD6C9] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <span className="text-xs text-[#626A66] font-light font-mono">
                      Architectural brief tailored to plot contour
                    </span>
                    <a
                      href="#contact"
                      onClick={scrollToContact}
                      className="inline-flex items-center justify-center gap-2 bg-[#536957] hover:bg-[#1F2924] active:scale-[0.98] text-[#FAF9F5] px-5 py-2.5 border border-[#B89A62]/40 hover:border-[#B89A62] text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B89A62]"
                    >
                      <span>Request Proposal</span>
                      <ArrowUpRight className="w-4 h-4 text-[#B89A62] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </MotionReveal>
            </div>

            {/* ------------------------------------------------------------------- */}
            {/* DUPLEXES (25% Desktop Width: lg:col-span-3)                         */}
            {/* ------------------------------------------------------------------- */}
            <div className="col-span-1 md:col-span-1 lg:col-span-3">
              <MotionReveal delay={0.16} className="h-full">
                <div className="bg-[#FAF9F5] border border-[#DCD6C9] p-6 sm:p-7 flex flex-col justify-between h-full group hover:border-[#B89A62] transition-all duration-300 shadow-2xs relative">
                  <div>
                    {/* Architectural Imagery */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1F2924] border border-[#DCD6C9]/80 mb-5">
                      <Image
                        src={duplexesService.image}
                        alt={duplexesService.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-3 left-3 bg-[#1F2924]/90 text-[#FAF9F5] px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] font-semibold border border-[#B89A62]/40 backdrop-blur-sm font-mono">
                        02 &bull; {duplexesService.category}
                      </div>
                      <div className="absolute bottom-2.5 right-2.5 bg-black/60 text-[#DCD6C9] px-2 py-0.5 text-[9px] uppercase tracking-wider backdrop-blur-xs font-mono">
                        Sample Concept
                      </div>
                    </div>

                    {/* Typography */}
                    <h3 className="font-display text-xl sm:text-2xl text-[#1F2924] font-light group-hover:text-[#536957] transition-colors leading-snug">
                      {duplexesService.title}
                    </h3>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-[#B89A62] mt-1 font-light italic">
                      {duplexesService.tagline}
                    </p>
                    <p className="mt-3 text-xs sm:text-sm text-[#626A66] font-light leading-relaxed">
                      {duplexesService.description}
                    </p>

                    {/* Specifications List */}
                    <div className="mt-5 pt-4 border-t border-[#DCD6C9]">
                      <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#1F2924] font-medium block mb-2">
                        Core Specifications
                      </span>
                      <div className="space-y-1.5">
                        {duplexesService.features.map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-[#626A66]">
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
                      Multi-level scope
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
            </div>

            {/* ------------------------------------------------------------------- */}
            {/* VILLAS (25% Desktop Width: lg:col-span-3)                           */}
            {/* ------------------------------------------------------------------- */}
            <div className="col-span-1 md:col-span-1 lg:col-span-3">
              <MotionReveal delay={0.22} className="h-full">
                <div className="bg-[#FAF9F5] border border-[#DCD6C9] p-6 sm:p-7 flex flex-col justify-between h-full group hover:border-[#B89A62] transition-all duration-300 shadow-2xs relative">
                  <div>
                    {/* Architectural Imagery */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1F2924] border border-[#DCD6C9]/80 mb-5">
                      <Image
                        src={villasService.image}
                        alt={villasService.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-3 left-3 bg-[#1F2924]/90 text-[#FAF9F5] px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] font-semibold border border-[#B89A62]/40 backdrop-blur-sm font-mono">
                        03 &bull; {villasService.category}
                      </div>
                      <div className="absolute bottom-2.5 right-2.5 bg-black/60 text-[#DCD6C9] px-2 py-0.5 text-[9px] uppercase tracking-wider backdrop-blur-xs font-mono">
                        Sample Concept
                      </div>
                    </div>

                    {/* Typography */}
                    <h3 className="font-display text-xl sm:text-2xl text-[#1F2924] font-light group-hover:text-[#536957] transition-colors leading-snug">
                      {villasService.title}
                    </h3>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-[#B89A62] mt-1 font-light italic">
                      {villasService.tagline}
                    </p>
                    <p className="mt-3 text-xs sm:text-sm text-[#626A66] font-light leading-relaxed">
                      {villasService.description}
                    </p>

                    {/* Specifications List */}
                    <div className="mt-5 pt-4 border-t border-[#DCD6C9]">
                      <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#1F2924] font-medium block mb-2">
                        Core Specifications
                      </span>
                      <div className="space-y-1.5">
                        {villasService.features.map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-[#626A66]">
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
                      Private estate brief
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
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. COMMERCIAL, LAND & ADVISORY — FULL-WIDTH 3-COLUMN EDITORIAL GRID        */}
        {/* ========================================================================= */}
        <div>
          {/* Subtle Editorial Header Divider */}
          <MotionReveal delay={0.24} className="pb-8 border-t border-[#DCD6C9] pt-12 sm:pt-16 mb-8 sm:mb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2.5 mb-2">
                  <span className="w-2 h-px bg-[#B89A62]" />
                  <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#B89A62] font-semibold">
                    02 &bull; STRATEGIC COMMERCIAL &amp; LAND DISCIPLINES
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-4xl text-[#1F2924] font-light">
                  Commercial Infrastructure, Land &amp; Property Advisory
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#626A66] font-light max-w-lg">
                Institutional-grade development, high-yield land acquisitions, and discreet private brokerage managed under single-window accountability.
              </p>
            </div>
          </MotionReveal>

          {/* Equal-Height 3-Column Architectural Ledger */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {commercialServices.map((service, idx) => (
              <MotionReveal key={service.id} delay={0.28 + idx * 0.08} className="h-full">
                <div className="bg-[#FAF9F5] border border-[#DCD6C9] p-6 sm:p-8 flex flex-col justify-between h-full group hover:border-[#B89A62] transition-all duration-300 shadow-2xs">
                  <div>
                    {/* Generous Architectural Imagery (~40-45% Visual Impact) */}
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
                      <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#1F2924] font-medium block mb-2">
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
