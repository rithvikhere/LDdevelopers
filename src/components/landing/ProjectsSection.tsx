"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteAssets } from "@/config/site-assets";
import { siteContent } from "@/config/site-content";
import { ArrowUpRight, MapPin, SquareCode, Compass } from "lucide-react";

export const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Residential", "Villas", "Commercial", "Duplex"];

  const filteredProjects =
    filter === "All"
      ? siteAssets.projects
      : siteAssets.projects.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      className="py-24 sm:py-32 bg-[#F3F0E8] text-[#202622] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-[#526653] font-semibold block mb-3">
              {siteContent.projects.tag}
            </span>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-normal text-[#202622] tracking-tight leading-[1.12]">
              {siteContent.projects.title}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#202622]/75 font-light leading-relaxed">
              {siteContent.projects.subtitle}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                type="button"
                className={`px-4 py-2 text-xs uppercase tracking-[0.16em] transition-all duration-200 border ${
                  filter === cat
                    ? "bg-[#202622] text-[#F3F0E8] border-[#202622] font-semibold"
                    : "bg-transparent text-[#202622]/70 border-[#D9D2C4] hover:border-[#526653] hover:text-[#202622]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Clear Sample Project Notice Banner */}
        <div className="mb-10 p-3.5 bg-[#D9D2C4]/40 border-l-2 border-[#526653] flex items-center justify-between text-xs text-[#526653] font-mono">
          <span>{siteContent.projects.sampleNotice}</span>
          <span className="uppercase text-[10px] tracking-widest hidden sm:inline">Visual Demonstration</span>
        </div>

        {/* Projects Editorial Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group bg-[#202622] text-[#F3F0E8] overflow-hidden shadow-xl border border-transparent hover:border-[#B49A68]/40 transition-all duration-500 flex flex-col justify-between"
            >
              {/* Image Container with Framing */}
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#202622]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#202622] via-[#202622]/20 to-transparent" />

                {/* Sample Tag Badge */}
                <div className="absolute top-4 left-4 bg-[#B49A68] text-[#202622] px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold">
                  Sample Project
                </div>

                <div className="absolute top-4 right-4 bg-[#202622]/80 text-[#D9D2C4] px-2.5 py-1 text-[10px] uppercase tracking-wider backdrop-blur-xs">
                  {project.category}
                </div>

                {/* Location Placeholder Overlay */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs text-[#D9D2C4]/90 backdrop-blur-sm bg-black/40 px-2.5 py-1">
                  <MapPin className="w-3.5 h-3.5 text-[#B49A68]" />
                  <span className="font-mono text-[11px]">{project.locationPlaceholder}</span>
                </div>
              </div>

              {/* Text Meta Content */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl text-[#F3F0E8] group-hover:text-[#B49A68] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.18em] text-[#B49A68] mt-1 font-light italic">
                    {project.tagline}
                  </p>
                  <p className="mt-4 text-xs sm:text-sm text-[#D9D2C4]/80 font-light leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-[#343B33] flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-[#D9D2C4]/70 font-mono">
                    <span>{project.specifications.area}</span>
                    <span>&bull;</span>
                    <span>{project.specifications.style}</span>
                  </div>

                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-[#B49A68] hover:text-[#F3F0E8] transition-colors font-medium"
                  >
                    <span>Enquire</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

