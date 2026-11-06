"use client";

import React, { useState } from "react";
import Image from "next/image";
import { siteAssets } from "@/config/site-assets";
import { siteContent } from "@/config/site-content";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { ArrowUpRight, Check } from "lucide-react";

export const ServicesSection: React.FC = () => {
  const [selectedServiceId, setSelectedServiceId] = useState(
    siteAssets.services[0].id
  );

  const activeService =
    siteAssets.services.find((s) => s.id === selectedServiceId) ||
    siteAssets.services[0];

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
      id="services"
      className="py-24 sm:py-32 bg-[#FAF9F5] text-[#1E2521] relative overflow-hidden transition-colors"
    >
      {/* Subtle top architectural hairline divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DCD6C9] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <MotionReveal className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 bg-[#506653]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#506653] font-semibold">
              {siteContent.services.tag}
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-light text-[#1E2521] tracking-tight leading-[1.12]">
            {siteContent.services.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#626A66] font-light leading-relaxed max-w-2xl">
            {siteContent.services.subtitle}
          </p>
        </MotionReveal>

        {/* Editorial Layout: Minimal List (Variation D) & Image-Led Feature Panel (Variation C) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Service Selector (Left Column: Variation D Minimal List) */}
          <div className="lg:col-span-5 flex flex-col divide-y divide-[#DCD6C9]/80 border-t border-b border-[#DCD6C9]">
            {siteAssets.services.map((service, index) => {
              const isSelected = service.id === selectedServiceId;
              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedServiceId(service.id)}
                  type="button"
                  className={`text-left py-5 px-3 transition-all duration-300 flex items-center justify-between group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#506653] ${
                    isSelected
                      ? "bg-[#F3F0E7] pl-5 border-l-2 border-l-[#506653]"
                      : "bg-transparent hover:pl-5 hover:bg-[#F3F0E7]/50"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-[#B49A65] font-semibold">
                        0{index + 1}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-[#626A66] font-medium">
                        {service.category}
                      </span>
                    </div>
                    <h3
                      className={`font-display text-xl sm:text-2xl mt-1 transition-colors ${
                        isSelected
                          ? "text-[#1E2521] font-normal"
                          : "text-[#1E2521]/75 group-hover:text-[#1E2521]"
                      }`}
                    >
                      {service.title}
                    </h3>
                  </div>
                  <ArrowUpRight
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isSelected
                        ? "text-[#506653] translate-x-0.5 -translate-y-0.5"
                        : "text-[#DCD6C9] group-hover:text-[#506653]"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Active Service Showcase Card (Right Column: Variation C Image-Led Feature Panel) */}
          <MotionReveal className="lg:col-span-7 bg-[#1E2521] text-[#FAF9F5] overflow-hidden shadow-2xl relative border border-[#343B33]">
            {/* Fine Champagne Brass Corner Mark */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#B49A65] pointer-events-none z-10" />

            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <Image
                src={activeService.image}
                alt={activeService.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E2521] via-[#1E2521]/40 to-transparent" />
              <div className="absolute top-4 left-4 bg-[#506653] text-[#FAF9F5] px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold">
                {activeService.category}
              </div>
              <div className="absolute top-4 right-4 bg-black/60 text-[#DCD6C9] px-2.5 py-1 text-[10px] uppercase tracking-wider backdrop-blur-xs font-mono">
                Sample Architectural Visual
              </div>
            </div>

            <div className="p-8 sm:p-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#343B33]">
                <h3 className="font-display text-2xl sm:text-3xl text-[#FAF9F5] font-light">
                  {activeService.title}
                </h3>
                <span className="text-xs uppercase tracking-[0.18em] text-[#B49A65] italic font-light">
                  {activeService.tagline}
                </span>
              </div>

              <p className="mt-6 text-sm sm:text-base text-[#FAF9F5]/85 font-light leading-relaxed">
                {activeService.description}
              </p>

              {/* Key Deliverables / Features Grid */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {activeService.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-[#FAF9F5]/85">
                    <span className="w-4 h-4 rounded-full bg-[#506653]/40 border border-[#506653] flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#B49A65]" />
                    </span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Service Action CTA Guiding Toward Enquiry */}
              <div className="mt-10 pt-6 border-t border-[#343B33] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <span className="text-xs text-[#FAF9F5]/70">
                  Ready to construct a {activeService.title.toLowerCase()}?
                </span>
                <a
                  href="#contact"
                  onClick={scrollToContact}
                  className="inline-flex items-center justify-center gap-2 bg-[#506653] hover:bg-[#1E2521] active:scale-[0.98] text-[#FAF9F5] px-6 py-3 border border-[#B49A65]/40 hover:border-[#B49A65] text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A65]"
                >
                  <span>Request Proposal</span>
                  <ArrowUpRight className="w-4 h-4 text-[#B49A65]" />
                </a>
              </div>
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
};
