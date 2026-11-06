"use client";

import React, { useState } from "react";
import Image from "next/image";
import { siteAssets, ServiceAsset } from "@/config/site-assets";
import { siteContent } from "@/config/site-content";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { ArrowUpRight } from "lucide-react";

export const ServicesSection: React.FC = () => {
  const [featuredServiceId, setFeaturedServiceId] = useState<string>(
    siteAssets.services[0].id
  );

  const activeFeatured =
    siteAssets.services.find((s) => s.id === featuredServiceId) ||
    siteAssets.services[0];

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("contact");
    if (el) {
      const offset = el.getBoundingClientRect().top + window.pageYOffset - 72;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  // Group services for the asymmetrical 1 + 2 + 3 editorial composition
  const tier2Services = siteAssets.services.slice(1, 3); // Duplexes & Villas
  const tier3Services = siteAssets.services.slice(3, 6); // Commercial, Land, Brokerage

  return (
    <section
      id="services"
      className="py-24 sm:py-32 bg-[#F3F0E7] text-[#1E2521] relative overflow-hidden transition-colors"
    >
      {/* Subtle top architectural hairline divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DCD6C9] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Editorial Split Layout (Left: Number & Serif Title, Right: Balanced Description) */}
        <MotionReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 sm:pb-16 border-b border-[#DCD6C9] mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-[#506653]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#506653] font-semibold font-mono">
                03 / CAPABILITIES
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-light text-[#1E2521] tracking-tight leading-[1.12]">
              {siteContent.services.title}
            </h2>
          </div>
          <div className="lg:max-w-md">
            <p className="text-sm sm:text-base text-[#626A66] font-light leading-relaxed">
              {siteContent.services.subtitle}
            </p>
          </div>
        </MotionReveal>

        {/* Quick Discipline Filter / Spotlight Bar */}
        <MotionReveal delay={0.08} className="mb-10">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#B49A65] mr-2 shrink-0">
              Spotlight Discipline:
            </span>
            {siteAssets.services.map((service, idx) => {
              const isSelected = service.id === featuredServiceId;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setFeaturedServiceId(service.id)}
                  className={`px-3.5 py-1.5 whitespace-nowrap transition-all duration-200 border focus:outline-none focus-visible:ring-1 focus-visible:ring-[#506653] ${
                    isSelected
                      ? "bg-[#1E2521] text-[#FAF9F5] border-[#1E2521] font-medium"
                      : "bg-[#FAF9F5] text-[#626A66] border-[#DCD6C9] hover:border-[#B49A65] hover:text-[#1E2521]"
                  }`}
                >
                  <span className="font-mono text-[10px] mr-1.5 text-[#B49A65]">0{idx + 1}</span>
                  <span>{service.category}</span>
                </button>
              );
            })}
          </div>
        </MotionReveal>

        {/* ========================================================================= */}
        {/* TIER 1: LARGE FEATURED ARCHITECTURAL SERVICE PANEL                        */}
        {/* ========================================================================= */}
        <MotionReveal delay={0.12} className="mb-14 sm:mb-18">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#FAF9F5] border border-[#DCD6C9] p-6 sm:p-10 lg:p-12 shadow-sm relative group hover:border-[#B49A65] transition-all duration-300">
            {/* Fine Champagne Brass Corner Mark */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#B49A65] pointer-events-none" />

            {/* Left: Expansive Architectural Image */}
            <div className="lg:col-span-7 relative aspect-[16/10] w-full overflow-hidden bg-[#1E2521] border border-[#DCD6C9]/80">
              <Image
                src={activeFeatured.image}
                alt={activeFeatured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4 bg-[#1E2521]/90 text-[#FAF9F5] px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-semibold border border-[#B49A65]/40 backdrop-blur-sm">
                Featured &bull; {activeFeatured.category}
              </div>
              <div className="absolute bottom-4 right-4 bg-black/60 text-[#DCD6C9] px-2.5 py-1 text-[10px] uppercase tracking-wider backdrop-blur-xs font-mono">
                Sample Architectural Visual
              </div>
            </div>

            {/* Right: Editorial Monograph Details */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-mono text-[#B49A65] font-semibold tracking-widest uppercase">
                    01 / PRIMARY RESIDENTIAL DISCIPLINE
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-4xl text-[#1E2521] font-light leading-tight">
                  {activeFeatured.title}
                </h3>

                <p className="text-xs uppercase tracking-[0.18em] text-[#B49A65] mt-1.5 font-light italic">
                  {activeFeatured.tagline}
                </p>

                <p className="mt-5 text-sm text-[#626A66] font-light leading-relaxed">
                  {activeFeatured.description}
                </p>

                {/* Deliverables Matrix (Minimalist 2-column without loud checkmark icons) */}
                <div className="mt-8 pt-6 border-t border-[#DCD6C9]">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#1E2521] font-medium block mb-3">
                    Architectural Deliverables
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeFeatured.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#1E2521]/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#506653] shrink-0" />
                        <span className="font-light">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Proposal CTA */}
              <div className="mt-10 pt-6 border-t border-[#DCD6C9] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <span className="text-xs text-[#626A66] font-light">
                  Tailored design brief for your plot
                </span>
                <a
                  href="#contact"
                  onClick={scrollToContact}
                  className="inline-flex items-center justify-center gap-2.5 bg-[#506653] hover:bg-[#1E2521] active:scale-[0.98] text-[#FAF9F5] px-7 py-3.5 border border-[#B49A65]/40 hover:border-[#B49A65] text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A65]"
                >
                  <span>Request Proposal</span>
                  <ArrowUpRight className="w-4 h-4 text-[#B49A65]" />
                </a>
              </div>
            </div>
          </div>
        </MotionReveal>

        {/* ========================================================================= */}
        {/* TIER 2: TWO MEDIUM IMAGE-LED SPECIALIZATION PANELS                        */}
        {/* ========================================================================= */}
        <div className="mb-14 sm:mb-18">
          <MotionReveal delay={0.16} className="mb-6">
            <span className="text-xs uppercase tracking-[0.2em] text-[#506653] font-semibold font-mono block">
              Multi-Level &amp; Estate Living
            </span>
          </MotionReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
            {tier2Services.map((service, idx) => (
              <MotionReveal key={service.id} delay={0.2 + idx * 0.1}>
                <div
                  onClick={() => setFeaturedServiceId(service.id)}
                  className="bg-[#FAF9F5] border border-[#DCD6C9] hover:border-[#B49A65] transition-all duration-300 flex flex-col justify-between h-full shadow-2xs group cursor-pointer"
                >
                  {/* Image Header with Framing */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1E2521]">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-4 left-4 bg-[#1E2521]/90 text-[#FAF9F5] px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold border border-[#B49A65]/40 backdrop-blur-sm">
                      0{idx + 2} &bull; {service.category}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-8 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-display text-2xl sm:text-3xl text-[#1E2521] group-hover:text-[#506653] transition-colors font-light">
                        {service.title}
                      </h3>
                      <p className="text-xs uppercase tracking-[0.16em] text-[#B49A65] mt-1 font-light italic">
                        {service.tagline}
                      </p>
                      <p className="mt-4 text-xs sm:text-sm text-[#626A66] font-light leading-relaxed">
                        {service.description}
                      </p>

                      {/* Deliverables List (Refined minimal layout) */}
                      <div className="mt-6 pt-5 border-t border-[#DCD6C9]">
                        <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#1E2521] font-medium block mb-2.5">
                          Key Specifications
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {service.features.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-2 text-xs text-[#626A66]">
                              <span className="w-1 h-1 rounded-full bg-[#B49A65] shrink-0" />
                              <span className="font-light">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-5 border-t border-[#DCD6C9] flex items-center justify-between">
                      <span className="text-xs font-mono text-[#626A66]">
                        Custom architectural scope
                      </span>
                      <a
                        href="#contact"
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollToContact(e);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-[#506653] hover:text-[#1E2521] font-semibold transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#506653]"
                      >
                        <span>Request Proposal</span>
                        <ArrowUpRight className="w-4 h-4 text-[#B49A65]" />
                      </a>
                    </div>
                  </div>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TIER 3: THREE STRATEGIC & COMMERCIAL DISCIPLINES                          */}
        {/* ========================================================================= */}
        <div>
          <MotionReveal delay={0.24} className="mb-6">
            <span className="text-xs uppercase tracking-[0.2em] text-[#506653] font-semibold font-mono block">
              Commercial, Land &amp; Strategic Advisory
            </span>
          </MotionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {tier3Services.map((service, idx) => (
              <MotionReveal key={service.id} delay={0.28 + idx * 0.08}>
                <div
                  onClick={() => setFeaturedServiceId(service.id)}
                  className="bg-[#FAF9F5] border border-[#DCD6C9] hover:border-[#B49A65] transition-all duration-300 flex flex-col justify-between h-full shadow-2xs group cursor-pointer"
                >
                  {/* Image Header with Clean Proportions */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1E2521]">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-3 left-3 bg-[#1E2521]/90 text-[#FAF9F5] px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] font-semibold border border-[#B49A65]/40 backdrop-blur-sm font-mono">
                      0{idx + 4} &bull; {service.category}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl text-[#1E2521] group-hover:text-[#506653] transition-colors font-light">
                        {service.title}
                      </h3>
                      <p className="text-[11px] uppercase tracking-[0.14em] text-[#B49A65] mt-1 font-light italic">
                        {service.tagline}
                      </p>
                      <p className="mt-3.5 text-xs sm:text-sm text-[#626A66] font-light leading-relaxed">
                        {service.description}
                      </p>

                      {/* Minimalist Deliverables List */}
                      <div className="mt-5 pt-4 border-t border-[#DCD6C9]">
                        <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-[#1E2521] font-medium block mb-2">
                          Core Parameters
                        </span>
                        <div className="space-y-1.5">
                          {service.features.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-2 text-xs text-[#626A66]">
                              <span className="w-1 h-1 rounded-full bg-[#506653] shrink-0" />
                              <span className="font-light">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#DCD6C9] flex items-center justify-between">
                      <span className="text-[11px] font-mono text-[#626A66]">
                        Feasibility review
                      </span>
                      <a
                        href="#contact"
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollToContact(e);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-[#506653] hover:text-[#1E2521] font-semibold transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#506653]"
                      >
                        <span>Request Proposal</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#B49A65]" />
                      </a>
                    </div>
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
