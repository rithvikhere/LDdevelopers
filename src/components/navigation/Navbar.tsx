"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CompanyLogo } from "@/components/brand/CompanyLogo";
import { siteContent } from "@/config/site-content";
import { Menu, X, ArrowUpRight } from "lucide-react";

/**
 * Navbar Component — Refined Architectural Header
 * - Clean 3-part CSS Grid layout on desktop (Logo | 6 Active Links | CTA)
 * - Generous spacing between navigation options
 * - Guaranteed zero clipping or overflow on the Initiate Project CTA
 */
export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sectionIds = siteContent.navigation.map((item) => item.id);
      const scrollPosition = window.scrollY + 140;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(id);

    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });

      setActiveSection(id);
    }

    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex items-center ${
          isScrolled
            ? "h-[80px] sm:h-[84px] bg-[#0B0F0D]/90 backdrop-blur-md border-b border-[#24322A]/40 shadow-2xl"
            : "h-[92px] sm:h-[98px] bg-transparent border-b border-transparent"
        }`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 xl:px-12 box-border">
          {/* ========================================================================= */}
          {/* DESKTOP LAYOUT (xl: 1280px and above) — 3-part CSS Grid                  */}
          {/* ========================================================================= */}
          <div className="hidden xl:grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-6 xl:gap-8 2xl:gap-10 w-full">
            {/* LEFT — Company Brand (approx 300-340px) */}
            <div className="shrink-0 flex items-center max-w-[340px]">
              <CompanyLogo theme="dark" size="md" />
            </div>

            {/* CENTER — Navigation Links (Centered, spacious & readable) */}
            <nav
              className="flex items-center justify-center gap-5 xl:gap-7 2xl:gap-8 min-w-0"
              aria-label="Main Navigation"
            >
              {siteContent.navigation.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href, item.id)}
                    className={`relative py-1.5 transition-colors duration-200 whitespace-nowrap text-[13px] 2xl:text-[13.5px] font-mono uppercase tracking-[0.12em] ${
                      isActive
                        ? "text-[#C5B083] font-semibold"
                        : "text-[#F5F3EF]/75 hover:text-[#C5B083] font-medium"
                    }`}
                  >
                    <span>{item.label}</span>

                    {isActive && (
                      <motion.span
                        layoutId={shouldReduceMotion ? undefined : "activeNavbarIndicator"}
                        className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#C5B083]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                        aria-hidden="true"
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* RIGHT — Primary CTA (Completely visible, fixed width, no cut-off) */}
            <div className="shrink-0 flex items-center justify-end">
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "#contact", "contact")}
                className="group inline-flex items-center justify-center gap-2.5 h-[48px] sm:h-[50px] px-6 bg-[#F5F2EB] hover:bg-[#2E5A44] hover:text-[#F5F3EF] border border-[#24322A]/20 text-[#0B0F0D] text-[11px] font-mono uppercase tracking-[0.18em] font-semibold transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>INITIATE PROJECT</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#1F4A36] group-hover:text-[#C5B083] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RESPONSIVE LAYOUT (< xl: Tablets & Mobile)                                */}
          {/* ========================================================================= */}
          <div className="flex xl:hidden items-center justify-between w-full">
            {/* Left: Brand Logo */}
            <div className="shrink-0 flex items-center max-w-[280px] sm:max-w-[320px]">
              <CompanyLogo theme="dark" size="sm" className="sm:hidden" />
              <CompanyLogo theme="dark" size="md" className="hidden sm:inline-flex" />
            </div>

            {/* Right: Accessible CTA on tablets/laptops + Sleek Menu Toggle Button */}
            <div className="flex items-center gap-3 sm:gap-4">
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "#contact", "contact")}
                className="hidden sm:inline-flex items-center justify-center gap-2 h-[44px] px-4 sm:px-5 bg-[#F5F2EB] hover:bg-[#2E5A44] hover:text-[#F5F3EF] border border-[#24322A]/20 text-[#0B0F0D] text-[10.5px] font-mono uppercase tracking-[0.16em] font-semibold transition-all duration-300 whitespace-nowrap shrink-0 shadow-sm"
              >
                <span>INITIATE PROJECT</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#1F4A36]" />
              </a>

              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 sm:p-2.5 text-[#F5F3EF] hover:text-[#C5B083] border border-[#24322A] hover:border-[#C5B083]/40 bg-[#121815]/60 transition-colors rounded-sm flex items-center justify-center cursor-pointer"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MOBILE & TABLET DRAWER OVERLAY                                            */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#0B0F0D]/95 backdrop-blur-xl xl:hidden flex flex-col justify-between p-6 sm:p-10 pt-24 overflow-y-auto"
          >
            <div className="flex flex-col space-y-3 sm:space-y-4">
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C5B083] mb-2">
                NAVIGATION
              </div>
              {siteContent.navigation.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href, item.id)}
                  className="font-display text-xl sm:text-2xl text-[#F5F3EF] hover:text-[#C5B083] transition-colors py-2 border-b border-[#24322A]/30"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="pt-8 border-t border-[#24322A]/60 flex flex-col gap-3 font-mono text-xs mt-6">
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "#contact", "contact")}
                className="text-center py-3.5 bg-[#2E5A44] hover:bg-[#41785D] text-[#F5F3EF] uppercase tracking-wider font-semibold transition-colors"
              >
                Initiate Project Brief ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
