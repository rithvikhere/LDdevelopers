"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CompanyLogo } from "@/components/brand/CompanyLogo";
import { siteContent } from "@/config/site-content";
import { Menu, X, ArrowUpRight } from "lucide-react";

/**
 * Navbar Component — Phase 03 Motion, Interactions & Navigation
 * - Seamless transparent-to-solid transition with Deep Charcoal (#202622)
 * - Animated sliding Champagne Brass (#B49A68) active-section indicator
 * - Smooth scroll handler accounting for the sticky navbar height (~72px)
 * - Accessible mobile overlay with smooth open/close, focus management, and Escape key dismissal
 * - Strict adherence to the 9 planned sections in specified order
 */
export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstNavLinkRef = useRef<HTMLAnchorElement>(null);

  // Scroll detection & active section spy
  useEffect(() => {
    const handleScroll = () => {
      // Transition from transparent to solid after 60px scroll
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determine active section by measuring top offsets
      const sectionIds = siteContent.navigation.map((item) => item.id);
      const scrollPosition = window.scrollY + 120; // 120px offset for sticky header

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

  // Lock background scroll when mobile navigation is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      // Focus first link after opening
      setTimeout(() => {
        firstNavLinkRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Smooth scroll click handler accounting for sticky header offset
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(id);

    if (targetElement) {
      const headerOffset = 72;
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
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled
            ? "bg-[#202622] shadow-md py-3.5 border-b border-[#343B33]"
            : "bg-transparent py-5 sm:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* 1. Company Logo Placeholder on Left */}
            <div className="shrink-0">
              <CompanyLogo theme="dark" />
            </div>

            {/* 2. Centered Desktop Navigation (All 9 sections in exact planned order) */}
            <nav
              className="hidden xl:flex items-center gap-5 lg:gap-6 text-xs uppercase tracking-[0.14em] font-medium"
              aria-label="Main Navigation"
            >
              {siteContent.navigation.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href, item.id)}
                    className={`relative py-1.5 transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B49A68] rounded-xs ${
                      isActive
                        ? "text-[#B49A68] font-semibold"
                        : "text-[#F3F0E8]/85 hover:text-[#F3F0E8]"
                    }`}
                  >
                    <span>{item.label}</span>

                    {/* Architectural Sliding Champagne Brass Underline */}
                    {isActive && (
                      <motion.span
                        layoutId={shouldReduceMotion ? undefined : "activeNavbarIndicator"}
                        className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-[#B49A68] rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 32,
                        }}
                        aria-hidden="true"
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* 3. Primary "Let's Build" CTA on Right (Muted Forest #526653) */}
            <div className="hidden sm:flex items-center gap-4">
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "#contact", "contact")}
                className="group inline-flex items-center gap-2 bg-[#526653] hover:bg-[#343B33] active:scale-[0.98] text-[#F3F0E8] px-5 py-2.5 border border-[#B49A68]/30 hover:border-[#B49A68] text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-200 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A68]"
              >
                <span>Let&apos;s Build</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#B49A68] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center gap-2 xl:hidden">
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "#contact", "contact")}
                className="sm:hidden inline-flex items-center bg-[#526653] text-[#F3F0E8] px-3 py-1.5 text-[11px] uppercase tracking-wider font-semibold border border-[#B49A68]/30 mr-1"
              >
                Enquire
              </a>
              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#F3F0E8] hover:text-[#B49A68] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A68]"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation-drawer"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Accessible Full-Screen Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Site Navigation"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-[#202622] flex flex-col justify-between p-6 sm:p-10 xl:hidden"
            style={{ top: "0px" }}
          >
            <div className="pt-20 overflow-y-auto">
              <p className="text-[11px] tracking-[0.25em] text-[#B49A68] uppercase font-semibold mb-6">
                Navigation
              </p>
              <nav className="flex flex-col gap-3.5" aria-label="Mobile Links">
                {siteContent.navigation.map((item, index) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      ref={index === 0 ? firstNavLinkRef : undefined}
                      href={item.href}
                      onClick={(e) => scrollToSection(e, item.href, item.id)}
                      className={`font-display text-xl sm:text-2xl transition-colors flex items-center justify-between border-b border-[#343B33] pb-2.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B49A68] ${
                        isActive
                          ? "text-[#B49A68] font-semibold"
                          : "text-[#F3F0E8] hover:text-[#B49A68]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-[#B49A68]/60">
                          0{index + 1}
                        </span>
                        <span>{item.label}</span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[#B49A68]/50" />
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Drawer Action */}
            <div className="pt-6 border-t border-[#343B33] flex flex-col gap-3">
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "#contact", "contact")}
                className="w-full py-3.5 text-center bg-[#526653] hover:bg-[#343B33] active:scale-[0.98] text-[#F3F0E8] text-xs uppercase tracking-[0.18em] font-semibold transition-all border border-[#B49A68]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A68]"
              >
                Let&apos;s Build — Initiate Enquiry
              </a>
              <p className="text-[11px] text-[#D9D2C4]/60 text-center tracking-wider font-mono">
                [COMPANY NAME] Architecture &amp; Developments
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
