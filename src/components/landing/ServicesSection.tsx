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
      className="py-24 sm:py-32 bg-[#F3F0E8] text-[#202622] border-t border-[#D9D2C4] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <MotionReveal className="max-w-3xl mb-16 sm:mb-20">
          <span className="text-xs uppercase tracking-[0.25em] text-[#526653] font-semibold block mb-3">
            {siteContent.services.tag}
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-normal text-[#202622] tracking-tight leading-[1.12]">
            {siteContent.services.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#202622]/75 font-light leading-relaxed">
            {siteContent.services.subtitle}
          </p>
        </MotionReveal>

        {/* Editorial Interactive Layout: Tabs & Large Feature Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Service Selector List (Left Column) */}
          <div className="lg:col-span-5 flex flex-col space-y-2">
            {siteAssets.services.map((service, index) => {
              const isSelected = service.id === selectedServiceId;
              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedServiceId(service.id)}
                  type="button"
                  className={`text-left p-5 transition-all duration-300 border-l-2 flex items-center justify-between group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#526653] ${
                    isSelected
                      ? "bg-[#D9D2C4]/60 border-[#526653] shadow-xs"
                      : "bg-transparent border-transparent hover:bg-[#D9D2C4]/25 hover:border-[#B49A68]/50"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-[#526653] font-semibold">
                        0{index + 1}
                      </span>
                      <span className="text-xs uppercase tracking-[0.16em] text-[#B49A68] font-medium">
                        {service.category}
                      </span>
                    </div>
                    <h3
                      className={`font-display text-xl sm:text-2xl mt-1 transition-colors ${
                        isSelected
                          ? "text-[#202622] font-semibold"
                          : "text-[#202622]/80 group-hover:text-[#202622]"
                      }`}
                    >
                      {service.title}
                    </h3>
                  </div>
                  <ArrowUpRight
                    className={`w-5 h-5 transition-transform ${
                      isSelected
                        ? "text-[#526653] translate-x-0.5 -translate-y-0.5"
                        : "text-[#202622]/30 group-hover:text-[#526653]"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Active Service Showcase Card (Right Column) */}
          <MotionReveal className="lg:col-span-7 bg-[#202622] text-[#F3F0E8] overflow-hidden shadow-2xl relative">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <Image
                src={activeService.image}
                alt={activeService.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#202622] via-[#202622]/40 to-transparent" />
              <div className="absolute top-4 left-4 bg-[#526653] text-[#F3F0E8] px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold">
                {activeService.category}
              </div>
              <div className="absolute top-4 right-4 bg-black/60 text-[#D9D2C4] px-2.5 py-1 text-[10px] uppercase tracking-wider backdrop-blur-xs font-mono">
                Sample Architectural Visual
              </div>
            </div>

            <div className="p-8 sm:p-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#343B33]">
                <h3 className="font-display text-2xl sm:text-3xl text-[#F3F0E8]">
                  {activeService.title}
                </h3>
                <span className="text-xs uppercase tracking-[0.18em] text-[#B49A68] italic font-light">
                  {activeService.tagline}
                </span>
              </div>

              <p className="mt-6 text-sm sm:text-base text-[#D9D2C4]/90 font-light leading-relaxed">
                {activeService.description}
              </p>

              {/* Key Deliverables / Features Grid */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {activeService.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-[#F3F0E8]/85">
                    <span className="w-4 h-4 rounded-full bg-[#526653]/40 border border-[#526653] flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#B49A68]" />
                    </span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Service Action CTA */}
              <div className="mt-10 pt-6 border-t border-[#343B33] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <span className="text-xs text-[#D9D2C4]/70">
                  Ready to construct a {activeService.title.toLowerCase()}?
                </span>
                <a
                  href="#contact"
                  onClick={scrollToContact}
                  className="inline-flex items-center justify-center gap-2 bg-[#526653] hover:bg-[#343B33] active:scale-[0.98] text-[#F3F0E8] px-6 py-3 border border-[#B49A68]/40 hover:border-[#B49A68] text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A68]"
                >
                  <span>Request Proposal</span>
                  <ArrowUpRight className="w-4 h-4 text-[#B49A68]" />
                </a>
              </div>
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
};
