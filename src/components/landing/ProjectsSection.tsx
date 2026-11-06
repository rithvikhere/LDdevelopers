"use client";

import React, { useState } from "react";
import Image from "next/image";
import { siteAssets } from "@/config/site-assets";
import { siteContent } from "@/config/site-content";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { HalftoneBackground } from "@/components/ui/HalftoneBackground";
import { ArrowUpRight, MapPin } from "lucide-react";

export const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Residential", "Villas", "Commercial", "Duplex"];

  const filteredProjects =
    filter === "All"
      ? siteAssets.projects
      : siteAssets.projects.filter((p) => p.category === filter);

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
      id="projects"
      className="py-24 sm:py-32 bg-[#F4F1E8] text-[#252B27] relative isolate overflow-hidden transition-colors"
    >
      {/* Halftone — Subtle Sage on Warm Ivory (Zero Orange / Violet) */}
      <HalftoneBackground variant="ivory" opacity="opacity-20" />

      {/* Architectural subtle hairline top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DCD6C9] to-transparent" />

      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <MotionReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-[#536957]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#536957] font-semibold">
                {siteContent.projects.tag}
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-light text-[#252B27] tracking-tight leading-[1.12]">
              {siteContent.projects.title}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#46534B] font-light leading-relaxed max-w-xl">
              {siteContent.projects.subtitle}
            </p>
          </div>

          {/* Category Filter Pills (Refined architectural tabs) */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                type="button"
                className={`px-4 py-2 text-xs uppercase tracking-[0.16em] transition-all duration-200 border focus:outline-none focus-visible:ring-1 focus-visible:ring-[#506653] ${
                  filter === cat
                    ? "bg-[#1E2521] text-[#FAF9F5] border-[#1E2521] font-semibold shadow-xs"
                    : "bg-[#FFFFFF] text-[#626A66] border-[#DCD6C9] hover:border-[#506653] hover:text-[#1E2521]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </MotionReveal>

        {/* Clear Sample Project Notice Banner */}
        <MotionReveal delay={0.1}>
          <div className="mb-10 p-3.5 bg-[#FFFFFF] border border-[#DCD6C9] border-l-4 border-l-[#506653] flex items-center justify-between text-xs text-[#506653] font-mono shadow-2xs">
            <span>{siteContent.projects.sampleNotice}</span>
            <span className="uppercase text-[10px] tracking-widest hidden sm:inline text-[#626A66]">Visual Demonstration</span>
          </div>
        </MotionReveal>

        {/* Projects Editorial Showcase Grid (Design Variation C — Image-led Feature Panels) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {filteredProjects.map((project, idx) => (
            <MotionReveal key={project.id} delay={idx * 0.08}>
              <article
                className="group bg-[#1E2521] text-[#FAF9F5] overflow-hidden shadow-xl border border-[#343B33] hover:border-[#B49A65]/70 transition-all duration-500 flex flex-col justify-between relative"
              >
                {/* Subtle Champagne Corner Accent */}
                <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[#B49A65]/40 group-hover:border-[#B49A65] transition-colors z-10 pointer-events-none" />

                {/* Image Container with Framing */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#1E2521]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E2521] via-[#1E2521]/20 to-transparent" />

                  {/* Sample Tag Badge */}
                  <div className="absolute top-4 left-4 bg-[#B49A65] text-[#1E2521] px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold">
                    Sample Project
                  </div>

                  <div className="absolute top-4 right-4 bg-[#1E2521]/80 text-[#DCD6C9] px-2.5 py-1 text-[10px] uppercase tracking-wider backdrop-blur-xs font-mono">
                    {project.category}
                  </div>

                  {/* Location Placeholder Overlay */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs text-[#FAF9F5]/90 backdrop-blur-sm bg-black/40 px-2.5 py-1 font-mono text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-[#B49A65]" />
                    <span>{project.locationPlaceholder}</span>
                  </div>
                </div>

                {/* Text Meta Content */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl text-[#FAF9F5] group-hover:text-[#B49A65] transition-colors font-light">
                      {project.title}
                    </h3>
                    <p className="text-xs uppercase tracking-[0.18em] text-[#B49A65] mt-1 font-light italic">
                      {project.tagline}
                    </p>
                    <p className="mt-4 text-xs sm:text-sm text-[#FAF9F5]/80 font-light leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-5 border-t border-[#343B33] flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-[#FAF9F5]/70 font-mono">
                      <span>{project.specifications.area}</span>
                      <span>&bull;</span>
                      <span>{project.specifications.style}</span>
                    </div>

                    <a
                      href="#contact"
                      onClick={scrollToContact}
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-[#B49A65] hover:text-[#FAF9F5] transition-colors font-medium focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B49A65]"
                    >
                      <span>Enquire</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </article>
            </MotionReveal>
          ))}
        </div>

        {/* Customer Journey Bridge Callout */}
        <MotionReveal delay={0.2}>
          <div className="mt-16 pt-8 border-t border-[#DCD6C9] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <p className="text-xs sm:text-sm text-[#1E2521] font-medium">
                Envisioning a distinctive architectural residence or commercial development?
              </p>
              <p className="text-xs text-[#626A66] font-light mt-0.5">
                Our principal team conducts site evaluations and custom volumetric studies.
              </p>
            </div>
            <a
              href="#contact"
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 bg-[#506653] hover:bg-[#1E2521] text-[#FAF9F5] px-6 py-3 text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 shadow-sm shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A65]"
            >
              <span>Discuss Your Plot</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#B49A65]" />
            </a>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
};
