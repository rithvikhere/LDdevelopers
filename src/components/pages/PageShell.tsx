"use client";

import React from "react";
import { motion } from "framer-motion";
import { Footer } from "@/components/navigation/Footer";
import { BackToExplore } from "@/components/pages/BackToExplore";
import { useHydratedReducedMotion } from "@/hooks/useHydrated";

/**
 * PageShell — shared frame for the six independent content pages.
 * - Same sage canvas as the homepage
 * - A single "← BACK TO EXPLORE" control (no navigation bar)
 * - Quick, restrained entrance transition (fade + slight rise), reduced-motion aware
 * - The existing site Footer, unchanged
 */
export const PageShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // false while hydrating (matches the server HTML); reduced motion then shows the page at once
  const shouldReduceMotion = useHydratedReducedMotion();

  return (
    <div className="min-h-screen flex flex-col bg-[#CADCAE] text-[#212121] relative">
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-6 sm:pt-8">
        <BackToExplore />
      </div>

      <motion.main
        data-reveal
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="flex-1 relative z-10"
      >
        {children}
      </motion.main>

      <Footer />
    </div>
  );
};
