import React from "react";
import { Footer } from "@/components/navigation/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { ExploreHubSection } from "@/components/landing/ExploreHubSection";
import { EnquirySection } from "@/components/landing/EnquirySection";
import { DesignDeskSection } from "@/components/landing/DesignDeskSection";
import { IntroProvider } from "@/components/intro/IntroProvider";

/**
 * Public Homepage
 *
 *   01. Hero            (unchanged artwork, copy and animation)
 *   02. Explore Hub     (#explore — primary navigation to the six content routes)
 *   03. Enquiry         (#enquiry — "Have a project? Let's talk." + enquiry form on the blueprint backdrop)
 *   04. Design Desk     (#design-desk — map, enquiries and studio hours)
 *   Footer              (unchanged)
 *
 * There is intentionally no global top navigation bar.
 */
export default function HomePage() {
  return (
    // IntroProvider plays the one-time LD intro on first load and sequences the hero's entrance after it.
    <IntroProvider>
    <div className="min-h-screen flex flex-col bg-[#CADCAE] text-[#212121] relative">
      <main className="flex-1 relative z-10">
        {/* Sections 01 + 02 share a wrapper so the sticky hero is released after the dark Explore panel */}
        <div className="relative">
          {/* Section 01: Hero (sticky on large screens) */}
          <HeroSection />

          {/* Section 02: Explore Hub — dark panel that overlays the hero while scrolling */}
          <ExploreHubSection />
        </div>

        {/* Section 03: Enquiry — tilts up out of the dark Explore panel */}
        <EnquirySection />

        {/* Section 04: Design Desk & Consultation */}
        <DesignDeskSection />
      </main>

      {/* Editorial Architectural Footer */}
      <Footer />
    </div>
    </IntroProvider>
  );
}
