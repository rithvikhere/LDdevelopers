"use client";

import React from "react";
import {
  KairosDepthReveal,
  KairosMaskedText,
} from "@/components/ui/KairosScrollReveal";
import { ArrowUpRight, Check, Compass, Layers, Building, Trees, Landmark, Sparkles } from "lucide-react";

interface Discipline {
  number: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  specs: { label: string; value: string }[];
  accent: string;
  icon: React.ElementType;
}

export const ServicesSection: React.FC = () => {
  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("contact");
    if (el) {
      const offset = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  const disciplines: Discipline[] = [
    {
      number: "01",
      category: "PRIVATE RESIDENCES",
      title: "Bespoke Residential Architecture",
      tagline: "Individual custom residences engineered around climate, light, and personal legacy.",
      description:
        "Full-scope architectural conception and turnkey realization for distinguished independent residences. We harmonize passive thermal design, expansive cantilevers, and artisan masonry.",
      deliverables: [
        "Site solar & wind vector analysis",
        "Custom structural BIM drafting",
        "Artisan stone & timber detailing",
        "Turnkey master EPC construction",
      ],
      specs: [
        { label: "Typology", value: "Custom Mansions & Estates" },
        { label: "Footprint", value: "3,500 – 15,000+ sq.ft" },
        { label: "Delivery", value: "Turnkey Master Build" },
      ],
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
      deliverables: [
        "Volumetric split-level planning",
        "Double-height atrium engineering",
        "Acoustic floor-slab dampening",
        "Integrated green terrace courts",
      ],
      specs: [
        { label: "Levels", value: "G+1 / G+2 Split Volume" },
        { label: "Light Wells", value: "Biophilic Sky Atriums" },
        { label: "Efficiency", value: "Zero Corridor Waste" },
      ],
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
      deliverables: [
        "Master site landscape masterplanning",
        "Infinity pool & water wall hydraulics",
        "Home automation & HVAC integration",
        "Imported Italian marble & cladding",
      ],
      specs: [
        { label: "Scale", value: "4 to 7 Bedroom Ensuites" },
        { label: "Amenities", value: "Pool, Spa & Private Screening" },
        { label: "Security", value: "Multi-Tier Smart Access" },
      ],
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
      deliverables: [
        "Column-free structural grid planning",
        "Double-glazed facade engineering",
        "LEED Gold sustainability modeling",
        "MEP, fire safety & high-speed lift shafts",
      ],
      specs: [
        { label: "Footprint", value: "15,000 – 120,000+ sq.ft" },
        { label: "Floors", value: "G+4 to G+10" },
        { label: "Certification", value: "IGBC / LEED Ready" },
      ],
      accent: "#24322A",
      icon: Building,
    },
    {
      number: "05",
      category: "ASSET ALLOCATION",
      title: "Strategic Land Investing",
      tagline: "High-growth corridor acquisition, legal title due diligence, and parcel syndication.",
      description:
        "Strategic identification of high-yield parcels in emerging urban corridors. We conduct forensic 30-year title clearances, zoning feasibility studies, and master development roadmaps.",
      deliverables: [
        "Forensic 30-year legal due diligence",
        "Master plan master-surveying",
        "Zoning & municipal sanction roadmaps",
        "Infrastructure appreciation modeling",
      ],
      specs: [
        { label: "Corridors", value: "Hyderabad & Bengaluru Growth Belts" },
        { label: "Title", value: "100% Clear & Freehold" },
        { label: "Horizon", value: "Medium to Long-Term Yield" },
      ],
      accent: "#382E47",
      icon: Trees,
    },
    {
      number: "06",
      category: "TRANSACTION ADVISORY",
      title: "Property Acquisition & Portfolio Sale",
      tagline: "Discreet advisory for prime architectural assets and verified commercial plots.",
      description:
        "End-to-end representation for high-net-worth individuals and corporate funds seeking off-market architectural residences, luxury penthouses, or prime development land.",
      deliverables: [
        "Off-market discrete representation",
        "Valuation & structural auditing",
        "Regulatory & registration escrow",
        "Asset handover & concierge transition",
      ],
      specs: [
        { label: "Confidentiality", value: "Strict Non-Disclosure" },
        { label: "Advisory", value: "End-to-End Legal & Fiscal" },
        { label: "Asset Quality", value: "Curated Architectural Grade" },
      ],
      accent: "#41785D",
      icon: Landmark,
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
        <div className="flex flex-col items-center text-center mx-auto max-w-4xl mb-20 sm:mb-28">
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

        {/* Asymmetrical Editorial Service Rows */}
        <div className="space-y-6 sm:space-y-8">
          {disciplines.map((item, index) => {
            const Icon = item.icon;
            const isEven = index % 2 === 0;

            return (
              <KairosDepthReveal
                key={item.number}
                delay={0.1 + (index % 3) * 0.08}
                withFrame={false}
              >
                <div className="group relative border border-[#24322A]/15 bg-white/90 backdrop-blur-md p-8 sm:p-12 hover:border-[#2E5A44]/60 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  {/* Subtle hover gradient wash */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2E5A44]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
                    {/* Column 1-4: Number, Category & Title */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="font-display text-3xl sm:text-4xl font-light text-[#2E5A44]">
                          {item.number}
                        </span>
                        <span className="text-[10px] font-mono tracking-[0.25em] text-[#41554A] font-semibold uppercase">
                          {item.category}
                        </span>
                      </div>

                      <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-light text-[#0B0F0D] group-hover:text-[#2E5A44] transition-colors duration-300 tracking-tight leading-tight">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#2E5A44] font-medium italic leading-relaxed">
                        &ldquo;{item.tagline}&rdquo;
                      </p>

                      <p className="text-xs sm:text-sm text-[#2A332E] font-light leading-relaxed pt-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Column 5-8: Key Deliverables Checklist */}
                    <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#24322A]/15 pt-6 lg:pt-0 lg:pl-8 space-y-4">
                      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#41554A] font-semibold">
                        KEY DELIVERABLES &amp; RIGOR
                      </div>
                      <ul className="space-y-2.5">
                        {item.deliverables.map((del, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2.5 text-xs text-[#1F2924] font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2E5A44] mt-1.5 shrink-0 group-hover:bg-[#C5B083] transition-colors" />
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Column 9-12: Architectural Specs & CTA Trigger */}
                    <div className="lg:col-span-3 border-t lg:border-t-0 lg:border-l border-[#24322A]/15 pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-between h-full space-y-6">
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#41554A] font-semibold mb-3">
                          SPECIFICATIONS
                        </div>
                        <div className="space-y-2 text-xs font-mono">
                          {item.specs.map((spec, sIdx) => (
                            <div key={sIdx} className="flex justify-between border-b border-[#24322A]/15 pb-1.5">
                              <span className="text-[#5A6B62]">{spec.label}</span>
                              <span className="text-[#0B0F0D] font-semibold">{spec.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <a
                        href="#contact"
                        onClick={scrollToContact}
                        className="inline-flex items-center justify-between py-2.5 px-4 bg-[#0B0F0D] hover:bg-[#2E5A44] border border-[#24322A] text-[#F5F3EF] text-[10px] font-mono uppercase tracking-[0.2em] transition-all duration-300 shadow-md"
                      >
                        <span>Commission Project</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#C5B083]" />
                      </a>
                    </div>
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
