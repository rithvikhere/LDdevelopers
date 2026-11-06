import React from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { HalftoneBackground } from "@/components/ui/HalftoneBackground";
import { HeroSection } from "@/components/landing/HeroSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { ConstructionOptionsSection } from "@/components/landing/ConstructionOptionsSection";
import { GallerySection } from "@/components/landing/GallerySection";
import { AchievementsSection } from "@/components/landing/AchievementsSection";
import { ContactSection } from "@/components/landing/ContactSection";

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

      {/* Dynamic Header & Navigation */}
      <Navbar />

      {/* Main Landing Page Experience */}
      <main className="flex-1 relative z-10">
        {/* Section 1: Cinematic Architectural Hero */}
        <HeroSection />

        {/* Section 2: Company Overview & Craftsmanship Philosophy */}
        <AboutSection />

        {/* Section 3: 6 Construction & Development Services */}
        <ServicesSection />

        {/* Section 4: Engineered Plot Formats & Construction Options */}
        <ConstructionOptionsSection />

        {/* Section 5: Immersive Architectural Photography Gallery */}
        <GallerySection />

        {/* Section 6: Verified Milestones & Achievements */}
        <AchievementsSection />

        {/* Section 7: Direct Consultation Desk & WhatsApp Integration */}
        <ContactSection />
      </main>

      {/* Editorial Architectural Footer — Solid Opaque (No Halftone) */}
      <Footer />
    </div>
  );
}
