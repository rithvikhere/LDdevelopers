import React from "react";
import { Footer } from "@/components/navigation/Footer";
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
    <div className="min-h-screen flex flex-col bg-[#CADCAE] text-[#212121] relative">
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

      {/* Editorial Architectural Footer */}
      <Footer />
    </div>
  );
}
