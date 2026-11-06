import React from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { ConstructionOptionsSection } from "@/components/landing/ConstructionOptionsSection";
import { ProjectsSection } from "@/components/landing/ProjectsSection";
import { AmenitiesSection } from "@/components/landing/AmenitiesSection";
import { GallerySection } from "@/components/landing/GallerySection";
import { AchievementsSection } from "@/components/landing/AchievementsSection";
import { ContactSection } from "@/components/landing/ContactSection";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F0D] text-[#F5F3EF]">
      {/* Dynamic Header & Navigation */}
      <Navbar />

      {/* Main Landing Page Experience */}
      <main className="flex-1">
        {/* Section 1: Cinematic Architectural Hero */}
        <HeroSection />

        {/* Section 2: Company Overview & Craftsmanship Philosophy */}
        <AboutSection />

        {/* Section 3: 6 Construction & Development Services */}
        <ServicesSection />

        {/* Section 4: Engineered Plot Formats & Construction Options */}
        <ConstructionOptionsSection />

        {/* Section 5: Architectural Projects Showcase (Sample Concepts) */}
        <ProjectsSection />

        {/* Section 6: Quality Assurance & Material Specifications */}
        <AmenitiesSection />

        {/* Section 7: Immersive Architectural Photography Gallery */}
        <GallerySection />

        {/* Section 8: Verified Milestones & Achievements */}
        <AchievementsSection />

        {/* Section 9: Direct Consultation Desk & WhatsApp Integration */}
        <ContactSection />
      </main>

      {/* Editorial Architectural Footer */}
      <Footer />
    </div>
  );
}
