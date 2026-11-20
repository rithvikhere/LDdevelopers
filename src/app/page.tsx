import React from "react";
import { Footer } from "@/components/navigation/Footer";
import { HalftoneBackground } from "@/components/ui/HalftoneBackground";
import { HeroSection } from "@/components/landing/HeroSection";
import { ExploreHubSection } from "@/components/landing/ExploreHubSection";
import { ContactSection } from "@/components/landing/ContactSection";

/**
 * Public Homepage — Three-Part Architecture
 *
 *   01. Hero            (unchanged artwork, copy and animation)
 *   02. Explore Hub     (#explore — primary navigation to the six content routes)
 *   03. Enquiry         (#enquiry — existing contact desk + enquiry form, unchanged)
 *   Footer              (unchanged)
 *
 * There is intentionally no global top navigation bar.
 */
export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F0D] text-[#F5F3EF] relative">
      {/* ========================================================================= */}
      {/* FLOWING AMBIENT HALFTONE EFFECT — Visible Across All Sections (Except Footer) */}
      {/* ========================================================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <HalftoneBackground opacity="opacity-40" dotScale={0.88} speed={0.12} />
        {/* Subtle radial depth gradient for optimal typography readability */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#0B0F0D]/30 to-[#0B0F0D]/70 pointer-events-none" />
      </div>

      <main className="flex-1 relative z-10">
        {/* Section 01: Cinematic Architectural Hero */}
        <HeroSection />

        {/* Section 02: Explore Hub — editorial index of the six content pages */}
        <ExploreHubSection />

        {/* Section 03: Enquiry — existing consultation desk & enquiry form */}
        <div id="enquiry">
          <ContactSection />
        </div>
      </main>

      {/* Editorial Architectural Footer — Solid Opaque (No Halftone) */}
      <Footer />
    </div>
  );
}
