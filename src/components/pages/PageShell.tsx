"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Footer } from "@/components/navigation/Footer";
import { HalftoneBackground } from "@/components/ui/HalftoneBackground";
import { BackToExplore } from "@/components/pages/BackToExplore";

/**
 * PageShell — shared frame for the six independent content pages.
 * - Same near-black canvas and ambient halftone layer as the homepage
 * - A single "← BACK TO EXPLORE" control (no navigation bar)
 * - Quick, restrained entrance transition (fade + slight rise), reduced-motion aware
 * - The existing site Footer, unchanged
 */
export const PageShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F0D] text-[#F5F3EF] relative">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <HalftoneBackground opacity="opacity-40" dotScale={0.88} speed={0.12} />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0B0F0D]/30 to-[#0B0F0D]/70 pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-6 sm:pt-8">
        <BackToExplore />
      </div>

      <motion.main
        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="flex-1 relative z-10"
      >
        {children}
      </motion.main>

      <Footer />
    </div>
  );
};
