"use client";

import React, { useState } from "react";
import Image from "next/image";
import { siteAssets, ProjectAsset } from "@/config/site-assets";
import { siteContent } from "@/config/site-content";
import {
  KairosDepthReveal,
  KairosMaskedText,
} from "@/components/ui/KairosScrollReveal";
import { ArrowUpRight, MapPin, Maximize2 } from "lucide-react";

export const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Residential", "Villas", "Commercial", "Duplex"];

  const filteredProjects: ProjectAsset[] =
    filter === "All"
      ? siteAssets.projects
      : siteAssets.projects.filter((p) => p.category === filter);

  const featured = filteredProjects[0];
  const secondary = filteredProjects.slice(1, 3);
  const remaining = filteredProjects.slice(3);

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("contact");
    if (el) {
      const offset = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  return (
    <section
      id="projects"
      className="py-28 sm:py-36 lg:py-44 bg-transparent text-[#F5F3EF] relative overflow-hidden transition-colors"
    >
      {/* Top Hairline Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#24322A] to-transparent" />
      <div className="absolute inset-0 bg-architectural-grid opacity-15 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Header & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 sm:mb-24">
          <div>
            <KairosDepthReveal delay={0.05}>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[11px] font-mono tracking-[0.25em] text-[#C5B083] uppercase">
                  03 / CURATED PORTFOLIO
                </span>
                <div className="h-px bg-[#24322A] w-16" />
              </div>
            </KairosDepthReveal>

            <KairosMaskedText delay={0.15} as="h2" className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#F5F3EF] tracking-tight max-w-2xl leading-[1.12]">
              {siteContent.projects.title}
            </KairosMaskedText>
          </div>

          {/* Minimalist Architectural Category Tabs */}
          <KairosDepthReveal delay={0.25}>
            <div className="flex flex-wrap gap-2 border-b border-[#24322A]/60 pb-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`py-1.5 px-3 text-[11px] font-mono uppercase tracking-[0.2em] transition-all cursor-pointer ${
                    filter === cat
                      ? "text-[#C5B083] border-b-2 border-[#C5B083] -mb-[13px] font-medium"
                      : "text-[#9EA8A1] hover:text-[#F5F3EF]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </KairosDepthReveal>
        </div>

        {/* 1. Primary Featured Project (Full-Width Asymmetrical Showcase) */}
        {featured && (
          <KairosDepthReveal delay={0.1} withFrame={false} className="mb-12 sm:mb-16">
            <div className="group relative border border-[#24322A]/20 bg-white/90 backdrop-blur-md shadow-2xl overflow-hidden hover:border-[#2E5A44]/50 transition-colors duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                {/* Image Aspect Box */}
                <div className="lg:col-span-7 relative min-h-[360px] sm:min-h-[460px] lg:min-h-[540px] overflow-hidden bg-[#0B0F0D]">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0D] via-transparent to-transparent lg:hidden" />
                  <div className="absolute top-4 left-4 bg-[#0B0F0D]/85 backdrop-blur-md px-3 py-1 border border-[#24322A] text-[10px] font-mono tracking-widest text-[#C5B083] uppercase">
                    FEATURED LANDMARK
                  </div>
                </div>

                {/* Editorial Content Column */}
                <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#2E5A44] font-semibold">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="tracking-widest uppercase">{featured.locationPlaceholder}</span>
                    </div>

                    <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-[#0B0F0D] leading-tight">
                      {featured.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#2E5A44] font-medium italic">
                      &ldquo;{featured.tagline}&rdquo;
                    </p>

                    <p className="text-xs sm:text-sm text-[#2A332E] font-light leading-relaxed pt-2">
                      {featured.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[#24322A]/15 space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                      <div>
                        <span className="text-[#5A6B62] block text-[10px] uppercase font-semibold">AREA</span>
                        <span className="text-[#0B0F0D] font-semibold">{featured.specifications.area}</span>
                      </div>
                      <div>
                        <span className="text-[#5A6B62] block text-[10px] uppercase font-semibold">STYLE</span>
                        <span className="text-[#0B0F0D] font-semibold">{featured.specifications.style}</span>
                      </div>
                    </div>

                    <a
                      href="#contact"
                      onClick={scrollToContact}
                      className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#2E5A44] hover:text-[#0B0F0D] pt-2 transition-colors font-semibold group"
                    >
                      <span>Inquire About Commission</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </KairosDepthReveal>
        )}

        {/* 2. Secondary Complementary Project Grid (Asymmetrical 2-Column) */}
        {secondary.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 mb-12 sm:mb-16">
            {secondary.map((proj, idx) => (
              <KairosDepthReveal key={proj.id} delay={0.15 + idx * 0.1} withFrame={false}>
                <div className="group border border-[#24322A]/15 bg-white/90 backdrop-blur-md shadow-xl hover:shadow-2xl overflow-hidden hover:border-[#2E5A44]/50 transition-all duration-500">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0B0F0D]">
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-3 left-3 bg-[#0B0F0D]/85 backdrop-blur-md px-2.5 py-1 border border-[#24322A] text-[9px] font-mono tracking-widest text-[#C5B083] uppercase">
                      {proj.category}
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-[#2E5A44] font-semibold">
                      <MapPin className="w-3 h-3 text-[#2E5A44]" />
                      <span>{proj.locationPlaceholder}</span>
                    </div>

                    <h4 className="font-display text-2xl font-light text-[#0B0F0D] group-hover:text-[#2E5A44] transition-colors leading-tight">
                      {proj.title}
                    </h4>

                    <p className="text-xs text-[#2A332E] font-light leading-relaxed line-clamp-2">
                      {proj.description}
                    </p>

                    <div className="pt-4 border-t border-[#24322A]/15 flex items-center justify-between text-xs font-mono">
                      <span className="text-[#2E5A44] font-semibold">{proj.specifications.area}</span>
                      <a
                        href="#contact"
                        onClick={scrollToContact}
                        className="inline-flex items-center gap-1.5 text-[#0B0F0D] hover:text-[#2E5A44] font-semibold uppercase text-[10px] tracking-wider transition-colors"
                      >
                        <span>Details</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </KairosDepthReveal>
            ))}
          </div>
        )}

        {/* 3. Editorial Ledger List for Remaining Projects */}
        {remaining.length > 0 && (
          <div className="pt-10 border-t border-[#24322A]/60 space-y-3">
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C5B083] font-semibold mb-4">
              ADDITIONAL ARCHITECTURAL COMMISSIONS
            </div>
            {remaining.map((item, rIdx) => (
              <KairosDepthReveal key={item.id} delay={0.1 + rIdx * 0.05}>
                <div className="group py-4 px-6 border border-[#24322A]/15 hover:border-[#2E5A44]/50 bg-white/90 hover:bg-white/95 backdrop-blur-md shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-[#2E5A44] font-semibold">0{4 + rIdx}</span>
                    <div>
                      <h5 className="font-display text-xl text-[#0B0F0D] group-hover:text-[#2E5A44] transition-colors">
                        {item.title}
                      </h5>
                      <span className="text-[10px] font-mono text-[#5A6B62]">
                        {item.category} &bull; {item.locationPlaceholder}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-xs font-mono">
                    <span className="text-[#2A332E] hidden md:block">{item.specifications.style}</span>
                    <span className="text-[#2E5A44] font-semibold">{item.specifications.area}</span>
                    <a
                      href="#contact"
                      onClick={scrollToContact}
                      className="p-1.5 border border-[#24322A]/20 text-[#0B0F0D] group-hover:text-[#2E5A44] group-hover:border-[#2E5A44] transition-colors"
                      aria-label={`Inquire about ${item.title}`}
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </KairosDepthReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
