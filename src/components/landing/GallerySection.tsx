"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { siteAssets } from "@/config/site-assets";
import { siteContent } from "@/config/site-content";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

export const GallerySection: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const activeItem =
    selectedIndex !== null ? siteAssets.gallery[selectedIndex] : null;

  // Open modal & remember previous focus element
  const openModal = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    previousFocusRef.current = e.currentTarget;
    setSelectedIndex(index);
  };

  // Close modal & restore previous focus
  const closeModal = () => {
    setSelectedIndex(null);
    setTimeout(() => {
      previousFocusRef.current?.focus();
    }, 50);
  };

  // Navigate next / previous image
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

  // Lock background scroll and handle keyboard navigation (Escape, Left, Right)
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
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedIndex]);

  return (
    <section
      id="gallery"
      className="py-24 sm:py-32 bg-[#202622] text-[#F3F0E8] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <MotionReveal className="max-w-3xl mb-16 sm:mb-20">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B49A68] font-semibold block mb-3">
            {siteContent.gallery.tag}
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-normal text-[#F3F0E8] tracking-tight leading-[1.12]">
            {siteContent.gallery.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#D9D2C4]/80 font-light leading-relaxed">
            {siteContent.gallery.subtitle}
          </p>
        </MotionReveal>

        {/* Responsive Editorial Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteAssets.gallery.map((item, idx) => (
            <MotionReveal key={item.id} delay={idx * 0.06}>
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
                className="group relative aspect-[4/3] overflow-hidden bg-[#252C27] cursor-pointer border border-[#343B33] hover:border-[#B49A68]/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A68] transition-all duration-300"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#202622] via-transparent to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />

                {/* Subtle Hover Overlay Meta */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-xs">
                  <div className="flex justify-end">
                    <span className="w-8 h-8 rounded-full bg-[#202622]/90 text-[#B49A68] flex items-center justify-center border border-[#B49A68]/30">
                      <ZoomIn className="w-4 h-4" />
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#B49A68] font-semibold block">
                      {item.category}
                    </span>
                    <h4 className="font-display text-xl text-[#F3F0E8] mt-1">
                      {item.title}
                    </h4>
                  </div>
                </div>

                {/* Mobile Friendly Bottom Label */}
                <div className="sm:hidden absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] text-[#D9D2C4] bg-black/70 px-2.5 py-1">
                  <span>{item.title}</span>
                  <span className="text-[#B49A68]">{item.category}</span>
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>

        {/* Customer Journey Link */}
        <MotionReveal delay={0.2}>
          <div className="mt-16 pt-8 border-t border-[#343B33] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <span className="text-xs text-[#D9D2C4]/70">
              Captivated by our volumetric forms and light studies? Discuss an original architectural brief.
            </span>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("contact");
                if (el) {
                  const offset = el.getBoundingClientRect().top + window.pageYOffset - 72;
                  window.scrollTo({ top: offset, behavior: "smooth" });
                }
              }}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#B49A68] hover:text-[#F3F0E8] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B49A68]"
            >
              <span>Initiate Project Consultation</span>
              <ZoomIn className="w-4 h-4" />
            </a>
          </div>
        </MotionReveal>
      </div>

      {/* Accessible Interactive Lightbox Modal */}
      <AnimatePresence>
        {activeItem && selectedIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Enlarged image: ${activeItem.title}`}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={closeModal}
          >
            {/* Previous Image Control */}
            <button
              type="button"
              onClick={handlePrev}
              className="hidden sm:flex absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#202622]/80 hover:bg-[#343B33] text-[#F3F0E8] hover:text-[#B49A68] items-center justify-center border border-[#343B33] hover:border-[#B49A68] transition-colors z-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A68]"
              aria-label="Previous photograph"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Image Control */}
            <button
              type="button"
              onClick={handleNext}
              className="hidden sm:flex absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#202622]/80 hover:bg-[#343B33] text-[#F3F0E8] hover:text-[#B49A68] items-center justify-center border border-[#343B33] hover:border-[#B49A68] transition-colors z-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A68]"
              aria-label="Next photograph"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Dialog Content Container */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative max-w-5xl w-full bg-[#202622] border border-[#B49A68]/40 overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 flex items-center justify-between border-b border-[#343B33] bg-[#202622]">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#B49A68] font-semibold">
                    {activeItem.category} &bull; {selectedIndex + 1} of{" "}
                    {siteAssets.gallery.length}
                  </span>
                  <h3 className="font-display text-lg sm:text-xl text-[#F3F0E8]">
                    {activeItem.title}
                  </h3>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeModal}
                  className="p-2 text-[#D9D2C4] hover:text-[#B49A68] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A68]"
                  aria-label="Close image lightbox"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Image with Preserved Proportions */}
              <div className="relative aspect-[16/10] w-full bg-black">
                <Image
                  src={activeItem.image}
                  alt={activeItem.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              {/* Modal Footer Note & Mobile Controls */}
              <div className="p-4 bg-[#252C27] flex items-center justify-between text-xs text-[#D9D2C4]/70 font-mono">
                <div className="flex sm:hidden gap-3">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="p-1.5 bg-[#202622] border border-[#343B33] text-[#D9D2C4] hover:text-[#B49A68]"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="p-1.5 bg-[#202622] border border-[#343B33] text-[#D9D2C4] hover:text-[#B49A68]"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <span>Sample Architectural Concept Archive</span>
                <span className="hidden sm:inline">[COMPANY NAME]</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
