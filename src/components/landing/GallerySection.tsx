"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { siteAssets } from "@/config/site-assets";
import { siteContent } from "@/config/site-content";
import {
  KairosDepthReveal,
  KairosMaskedText,
} from "@/components/ui/KairosScrollReveal";
import { X, ZoomIn, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

export const GallerySection: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const activeItem =
    selectedIndex !== null ? siteAssets.gallery[selectedIndex] : null;

  const openModal = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    previousFocusRef.current = e.currentTarget;
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
    setTimeout(() => {
      previousFocusRef.current?.focus();
    }, 50);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex(
        (selectedIndex - 1 + siteAssets.gallery.length) % siteAssets.gallery.length
      );
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % siteAssets.gallery.length);
    }
  };

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          closeModal();
        } else if (e.key === "ArrowLeft") {
          handlePrev();
        } else if (e.key === "ArrowRight") {
          handleNext();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  const getGalleryClasses = (index: number) => {
    switch (index % 6) {
      case 0:
        return "sm:col-span-2 aspect-[16/10]";
      case 1:
        return "sm:col-span-1 aspect-[16/10] sm:aspect-auto";
      case 2:
        return "sm:col-span-1 aspect-[16/10] sm:aspect-auto";
      case 3:
        return "sm:col-span-2 aspect-[16/10]";
      case 4:
        return "sm:col-span-1 aspect-[16/10]";
      case 5:
        return "sm:col-span-2 aspect-[16/10]";
      default:
        return "aspect-[16/10]";
    }
  };

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
      id="gallery"
      className="py-28 sm:py-36 lg:py-44 bg-transparent text-[#F5F3EF] relative overflow-hidden transition-colors"
    >
      <div className="absolute inset-0 bg-architectural-grid opacity-15 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header — Centered & Prominent */}
        <div className="flex flex-col items-center text-center mx-auto max-w-4xl mb-16 sm:mb-24">
          <KairosDepthReveal delay={0.05}>
            <div className="flex flex-col items-center justify-center text-center mx-auto mb-6">
              <span className="text-sm sm:text-base md:text-lg font-mono tracking-[0.3em] text-[#C5B083] uppercase font-semibold">
                04 / VISUAL EXHIBITION
              </span>
            </div>
          </KairosDepthReveal>

          <KairosMaskedText delay={0.15} as="h2" className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#F5F3EF] tracking-tight leading-[1.12] mb-6">
            {siteContent.gallery.title}
          </KairosMaskedText>

          <KairosDepthReveal delay={0.25}>
            <p className="text-xs sm:text-sm text-[#9EA8A1] max-w-2xl mx-auto font-light leading-relaxed font-mono">
              Curated architectural moments celebrating structural form, raw materials, cantilevers, and internal courtyards.
            </p>
          </KairosDepthReveal>
        </div>

        {/* Editorial Asymmetric Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {siteAssets.gallery.map((item, idx) => (
            <KairosDepthReveal key={item.id} delay={idx * 0.06} className={getGalleryClasses(idx)}>
              <div
                tabIndex={0}
                role="button"
                aria-label={`View enlarged photograph: ${item.title}`}
                onClick={(e) => openModal(idx, e)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedIndex(idx);
                  }
                }}
                className="group relative w-full h-full min-h-[260px] overflow-hidden bg-[#121815] cursor-pointer border border-[#24322A] hover:border-[#C5B083] transition-all duration-500 shadow-md"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0D] via-transparent to-transparent opacity-60 group-hover:opacity-85 transition-opacity" />

                {/* Hover Meta Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#F5F2EB]/95 backdrop-blur-sm">
                  <div className="flex justify-end">
                    <span className="w-8 h-8 bg-[#ECE8DE] text-[#1F4A36] flex items-center justify-center border border-[#24322A]/20 shadow-xs">
                      <ZoomIn className="w-4 h-4" />
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#1F4A36] font-semibold font-mono block">
                      {item.category}
                    </span>
                    <h4 className="font-display text-xl sm:text-2xl text-[#0B0F0D] mt-1 font-medium">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </div>
            </KairosDepthReveal>
          ))}
        </div>

        {/* Bottom Strip */}
        <KairosDepthReveal delay={0.25} className="mt-16 pt-8 border-t border-[#24322A]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <span className="text-[#9EA8A1] uppercase tracking-wider">
            All photography reflects true site-built architectural typologies
          </span>
          <a
            href="#contact"
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 text-[#C5B083] hover:text-[#F5F3EF] uppercase tracking-widest transition-colors"
          >
            <span>Request Full High-Resolution Folio</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </KairosDepthReveal>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-50 bg-[#0B0F0D]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          >
            {/* Modal Controls */}
            <div className="absolute top-6 right-6 z-10 flex items-center gap-3">
              <button
                ref={closeButtonRef}
                onClick={closeModal}
                className="p-2.5 bg-[#F5F2EB] text-[#0B0F0D] hover:bg-[#2E5A44] hover:text-[#F5F3EF] border border-[#24322A]/20 shadow-md transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 bg-[#F5F2EB] hover:bg-[#2E5A44] hover:text-[#F5F3EF] border border-[#24322A]/20 text-[#0B0F0D] shadow-md transition-colors cursor-pointer z-10"
              aria-label="Previous photograph"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 bg-[#F5F2EB] hover:bg-[#2E5A44] hover:text-[#F5F3EF] border border-[#24322A]/20 text-[#0B0F0D] shadow-md transition-colors cursor-pointer z-10"
              aria-label="Next photograph"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Modal Image & Caption */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center"
            >
              <div className="relative w-full aspect-[16/10] max-h-[75vh] overflow-hidden border border-[#24322A]/20 bg-[#0B0F0D] shadow-2xl">
                <Image
                  src={activeItem.image}
                  alt={activeItem.title}
                  fill
                  priority
                  className="object-contain"
                />
              </div>

              <div className="w-full mt-4 p-4 bg-[#F5F2EB]/95 backdrop-blur-md border border-[#24322A]/15 shadow-xl flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-[#1F4A36] block text-[10px] uppercase tracking-widest font-semibold">
                    {activeItem.category}
                  </span>
                  <span className="text-[#0B0F0D] text-base font-display font-medium">{activeItem.title}</span>
                </div>
                <span className="text-[#3B4B42] font-semibold">
                  {selectedIndex + 1} / {siteAssets.gallery.length}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
