"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { siteContent } from "@/config/site-content";
import {
  KairosDepthReveal,
  KairosMaskedText,
  KairosStaggerContainer,
  kairosChildVariant,
} from "@/components/ui/KairosScrollReveal";

type Destination = (typeof siteContent.explore.destinations)[number];

/**
 * Progressive hairline divider — draws from left to right as it enters the viewport.
 */
const RevealLine: React.FC<{ className?: string }> = ({ className = "" }) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <span aria-hidden="true" className={`block h-px w-full bg-[#343B33] ${className}`} />;
  }

  return (
    <motion.span
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`block h-px w-full origin-left bg-[#343B33] ${className}`}
    />
  );
};

/**
 * One editorial index entry — number, serif title, description and directional arrow.
 */
const ExploreEntry: React.FC<{ item: Destination }> = ({ item }) => (
  <motion.div variants={kairosChildVariant}>
    <RevealLine />
    <Link
      href={item.href}
      className="group relative block py-8 sm:py-10 outline-none focus-visible:ring-1 focus-visible:ring-[#C5B083] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0B0F0D]"
    >
      {/* Brass hover rule that sweeps across the top hairline */}
      <span
        aria-hidden="true"
        className="absolute top-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-[#B49A68] transition-transform duration-700 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />

      <div className="flex items-start gap-5 sm:gap-8">
        <span className="font-display text-5xl sm:text-6xl xl:text-7xl font-light leading-[0.85] tabular-nums text-[#526653] transition-colors duration-500 group-hover:text-[#C5B083] group-focus-visible:text-[#C5B083] w-[3.25rem] sm:w-[4.5rem] xl:w-[5.25rem] shrink-0">
          {item.number}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-2xl sm:text-3xl xl:text-4xl font-light tracking-tight leading-[1.1] text-[#F3F0E8] transition-colors duration-500 group-hover:text-[#C5B083] group-focus-visible:text-[#C5B083]">
              {item.label}
            </h3>

            <span
              aria-hidden="true"
              className="mt-1 shrink-0 w-10 h-10 sm:w-11 sm:h-11 border border-[#343B33] flex items-center justify-center text-[#D9D2C4] transition-all duration-500 group-hover:border-[#B49A68] group-hover:bg-[#B49A68] group-hover:text-[#0B0F0D] group-focus-visible:border-[#B49A68]"
            >
              <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>

          <p className="mt-3 max-w-md text-xs sm:text-sm font-mono font-light leading-relaxed text-[#9EA8A1] transition-colors duration-500 group-hover:text-[#D9D2C4]">
            {item.description}
          </p>

          <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.28em] text-[#D9D2C4]/50 transition-colors duration-500 group-hover:text-[#C5B083]">
            <span className="h-px w-6 bg-current transition-all duration-500 group-hover:w-10" aria-hidden="true" />
            Open page
          </span>
        </div>
      </div>
    </Link>
  </motion.div>
);

/**
 * ExploreHubSection — Homepage Section 02
 *
 * The primary navigation system of the public website. An editorial, architectural index
 * that links to six independent content routes (same browser tab, Next.js <Link>).
 */
export const ExploreHubSection: React.FC = () => {
  const { tag, title, subtitle, destinations } = siteContent.explore;
  const leftColumn = destinations.slice(0, 3);
  const rightColumn = destinations.slice(3);

  return (
    <section
      id="explore"
      aria-labelledby="explore-heading"
      className="relative py-24 sm:py-32 lg:py-40 bg-transparent text-[#F5F3EF] overflow-hidden"
    >
      <div className="absolute inset-0 bg-architectural-grid opacity-15 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Header — asymmetric editorial composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-14 sm:mb-20">
          <div className="lg:col-span-7">
            <KairosDepthReveal delay={0.05}>
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#C5B083]" aria-hidden="true" />
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#C5B083] font-semibold">
                  {tag}
                </span>
              </div>
            </KairosDepthReveal>

            <div className="overflow-hidden">
              <KairosMaskedText
                delay={0.12}
                as="h2"
                className="font-display text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.04] text-[#F3F0E8]"
              >
                <span id="explore-heading">{title}</span>
              </KairosMaskedText>
            </div>
          </div>

          <div className="lg:col-span-5">
            <KairosDepthReveal delay={0.22}>
              <div className="lg:border-l lg:border-[#343B33] lg:pl-8">
                <p className="text-sm sm:text-base font-light leading-relaxed text-[#9EA8A1] max-w-md">
                  {subtitle}
                </p>
                <p className="mt-4 text-[10px] font-mono uppercase tracking-[0.28em] text-[#D9D2C4]/50">
                  Six destinations &bull; Select to open
                </p>
              </div>
            </KairosDepthReveal>
          </div>
        </div>

        {/* Editorial index — two offset columns on desktop, single column on mobile */}
        <nav aria-label="Explore the website">
          <KairosStaggerContainer
            staggerDelay={0.09}
            className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-24"
          >
            <div>
              {leftColumn.map((item) => (
                <ExploreEntry key={item.href} item={item} />
              ))}
              <RevealLine />
            </div>

            <div className="lg:mt-24">
              {rightColumn.map((item) => (
                <ExploreEntry key={item.href} item={item} />
              ))}
              <RevealLine />
            </div>
          </KairosStaggerContainer>
        </nav>
      </div>
    </section>
  );
};
