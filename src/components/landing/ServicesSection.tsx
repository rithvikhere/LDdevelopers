"use client";

import React from "react";
import {
  KairosDepthReveal,
  KairosMaskedText,
} from "@/components/ui/KairosScrollReveal";
import { Compass, Layers, Building, Sparkles } from "lucide-react";

interface Discipline {
  number: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  accent: string;
  icon: React.ElementType;
}

export const ServicesSection: React.FC = () => {
  const disciplines: Discipline[] = [
    {
      number: "01",
      category: "PRIVATE RESIDENCES",
      title: "Bespoke Residential Architecture",
      tagline: "Individual custom residences engineered around climate, light, and personal legacy.",
      description:
        "Full-scope architectural conception and turnkey realization for distinguished independent residences. We harmonize passive thermal design, expansive cantilevers, and artisan masonry.",
      accent: "#2E5A44",
      icon: Compass,
    },
    {
      number: "02",
      category: "MULTI-LEVEL TYPOLOGY",
      title: "Duplexes & Multi-Level Living",
      tagline: "Intelligent vertical volume, double-height voids, and acoustic privacy.",
      description:
        "Architectural duplex homes optimizing urban parcels through dramatic double-height light wells, cascading terrace gardens, and acoustic zoning that isolates social salons from private suites.",
      accent: "#1F4E4B",
      icon: Layers,
    },
    {
      number: "03",
      category: "HIGH-END REPOSITORIES",
      title: "Luxury Villas & Private Estates",
      tagline: "Ultra-luxury sanctuaries balancing monumental scale with intimate craftsmanship.",
      description:
        "Private villa compounds featuring infinity plunge pools, landscaped internal courtyards, subterranean entertainment lounges, and smart biometric security envelopes.",
      accent: "#C5B083",
      icon: Sparkles,
    },
    {
      number: "04",
      category: "CIVIC & INSTITUTIONAL",
      title: "Commercial Buildings & Landmarks",
      tagline: "High-performance office complexes, corporate headquarters, and retail flagships.",
      description:
        "Post-tensioned concrete structural frames, energy-efficient double-glazed curtain walls, and column-free floor plates designed to maximize asset yields and corporate prestige.",
      accent: "#24322A",
      icon: Building,
    },
  ];

  return (
    <section
      id="services"
      className="py-28 sm:py-36 lg:py-44 bg-transparent text-[#F5F3EF] relative overflow-hidden transition-colors"
    >
      <div className="absolute inset-0 bg-architectural-grid opacity-15 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header — Centered & Prominent */}
        <div className="flex flex-col items-center text-center mx-auto max-w-4xl mb-16 sm:mb-20">
          <KairosDepthReveal delay={0.05}>
            <div className="flex flex-col items-center justify-center text-center mx-auto mb-6">
              <span className="text-sm sm:text-base md:text-lg font-mono tracking-[0.3em] text-[#C5B083] uppercase font-semibold">
                02 / CORE DISCIPLINES &amp; SERVICES
              </span>
            </div>
          </KairosDepthReveal>

          <KairosMaskedText delay={0.15} as="h2" className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#F5F3EF] tracking-tight leading-[1.12] mb-6">
            Architectural Mastery across Residential &amp; Civic Horizons.
          </KairosMaskedText>

          <KairosDepthReveal delay={0.25}>
            <p className="text-xs sm:text-sm text-[#9EA8A1] max-w-2xl mx-auto font-light leading-relaxed font-mono">
              Each discipline operates as a dedicated center of architectural innovation, ensuring seamless transitions from preliminary blueprint sketches to turnkey structural completion.
            </p>
          </KairosDepthReveal>
        </div>

        {/* 2x2 Grid of 4 Sized & Aligned Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {disciplines.map((item, index) => {
            const Icon = item.icon;

            return (
              <KairosDepthReveal
                key={item.number}
                delay={0.1 + index * 0.08}
                withFrame={false}
              >
                <div className="group relative h-full border border-[#24322A]/20 bg-[#F5F2EB]/95 backdrop-blur-md p-8 sm:p-10 hover:border-[#2E5A44]/60 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col justify-between">
                  {/* Subtle hover gradient wash */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#2E5A44]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <div className="relative z-10 space-y-4">
                    {/* Top Eyebrow Row: Number, Category & Icon */}
                    <div className="flex items-center justify-between pb-2 border-b border-[#24322A]/15">
                      <div className="flex items-center gap-3">
                        <span className="font-display text-3xl sm:text-4xl font-light text-[#1F4A36]">
                          {item.number}
                        </span>
                        <span className="text-[10px] font-mono tracking-[0.25em] text-[#3B4B42] font-semibold uppercase">
                          {item.category}
                        </span>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-[#1F4A36]/10 flex items-center justify-center text-[#1F4A36] group-hover:bg-[#2E5A44] group-hover:text-white transition-colors duration-300">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Service Title */}
                    <h3 className="font-display text-2xl sm:text-3xl font-light text-[#0B0F0D] group-hover:text-[#1F4A36] transition-colors duration-300 tracking-tight leading-tight">
                      {item.title}
                    </h3>

                    {/* Tagline */}
                    <p className="text-xs sm:text-sm text-[#1F4A36] font-medium italic leading-relaxed">
                      &ldquo;{item.tagline}&rdquo;
                    </p>

                    <div className="h-px bg-[#24322A]/15 w-16 pt-1" />

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#1A231F] font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </KairosDepthReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
