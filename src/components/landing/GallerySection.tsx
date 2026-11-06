"use client";

import React, { useState } from "react";
import Image from "next/image";
import { siteAssets } from "@/config/site-assets";
import { siteContent } from "@/config/site-content";
import { X, ZoomIn, Eye } from "lucide-react";

export const GallerySection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<{
    image: string;
    title: string;
    category: string;
  } | null>(null);

  return (
    <section
      id="gallery"
      className="py-24 sm:py-32 bg-[#202622] text-[#F3F0E8] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B49A68] font-semibold block mb-3">
            {siteContent.gallery.tag}
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-normal text-[#F3F0E8] tracking-tight leading-[1.12]">
            {siteContent.gallery.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#D9D2C4]/80 font-light leading-relaxed">
            {siteContent.gallery.subtitle}
          </p>
        </div>

        {/* Responsive Editorial Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteAssets.gallery.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative aspect-[4/3] overflow-hidden bg-[#252C27] cursor-pointer border border-[#343B33] hover:border-[#B49A68]/60 transition-all duration-300"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#202622] via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Hover Overlay Meta */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-xs">
                <div className="flex justify-end">
                  <span className="w-8 h-8 rounded-full bg-[#202622]/80 text-[#B49A68] flex items-center justify-center">
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

              {/* Always Visible Bottom Label on Mobile */}
              <div className="sm:hidden absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] text-[#D9D2C4] bg-black/60 px-2 py-1">
                <span>{item.title}</span>
                <span className="text-[#B49A68]">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Modal */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#202622] border border-[#B49A68]/40 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-[#343B33] bg-[#202622]">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#B49A68] font-semibold">
                  {selectedImage.category}
                </span>
                <h3 className="font-display text-lg sm:text-xl text-[#F3F0E8]">
                  {selectedImage.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="p-2 text-[#D9D2C4] hover:text-[#B49A68] transition-colors focus:outline-none"
                aria-label="Close image modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative aspect-[16/10] w-full bg-black">
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {/* Modal Footer Note */}
            <div className="p-4 bg-[#252C27] flex items-center justify-between text-xs text-[#D9D2C4]/70 font-mono">
              <span>Sample Architectural Photography Concept</span>
              <span>[COMPANY NAME] Archive</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
