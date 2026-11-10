"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CompanyLogo } from "@/components/brand/CompanyLogo";
import { siteContent } from "@/config/site-content";
import { Menu, X, ArrowUpRight } from "lucide-react";

/**
 * Navbar Component — Kairos Minimalist Architectural Redesign
 * - Transparent & floating initially; transitions to dark glass on scroll
 * - Fine editorial typography with Champagne Gold indicator
 * - Restrained, elegant CTA button
 * - Clean mobile drawer navigation
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex items-center ${
          isScrolled
            ? "h-[88px] sm:h-[92px] lg:h-[96px] bg-[#0B0F0D]/90 backdrop-blur-md border-b border-[#24322A]/40 shadow-2xl"
            : "h-[98px] sm:h-[104px] lg:h-[110px] bg-transparent border-b border-transparent"
        }`}
      >
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
          <div className="flex items-center justify-between gap-6 xl:gap-8">
            {/* Brand Logo — Enlarged to ~270-300px visual presence on desktop */}
            <div className="shrink-0">
              <CompanyLogo theme="dark" size="lg" />
            </div>

            {/* Desktop Navigation — Centered 3-part layout with generous 24-32px spacing & 14px typography */}
            <nav
              className="hidden xl:flex items-center justify-center gap-6 xl:gap-7 2xl:gap-8 text-[13.5px] 2xl:text-[14px] font-mono uppercase tracking-[0.12em]"
              aria-label="Main Navigation"
            >
              {siteContent.navigation.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href, item.id)}
                    className={`relative py-2 transition-colors duration-300 whitespace-nowrap ${
                      isActive
                        ? "text-[#C5B083] font-semibold"
                        : "text-[#F5F3EF]/75 hover:text-[#C5B083] font-medium"
                    }`}
                  >
                    <span>{item.label}</span>

                    {isActive && (
                      <motion.span
                        layoutId={shouldReduceMotion ? undefined : "activeNavbarIndicator"}
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#C5B083]"
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

            {/* Right Action: Refined Initiate Project CTA (54-56px height) */}
            <div className="hidden sm:flex items-center gap-4 shrink-0">
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "#contact", "contact")}
                className="group inline-flex items-center justify-center gap-3 h-[52px] sm:h-[54px] lg:h-[56px] px-7 sm:px-8 bg-[#F5F2EB] hover:bg-[#2E5A44] hover:text-[#F5F3EF] border border-[#24322A]/20 text-[#0B0F0D] text-[11.5px] sm:text-[12px] font-mono uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
              >
                <span>INITIATE PROJECT</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#1F4A36] group-hover:text-[#C5B083] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 xl:hidden">
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "#contact", "contact")}
                className="sm:hidden text-[10.5px] font-mono uppercase tracking-wider text-[#C5B083] border border-[#24322A] px-3 py-1.5"
              >
                Contact
              </a>
              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 text-[#F5F3EF] hover:text-[#C5B083] transition-colors"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#0B0F0D]/95 backdrop-blur-xl xl:hidden flex flex-col justify-between p-6 sm:p-10 pt-24"
          >
            <div className="flex flex-col space-y-4">
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C5B083] mb-2">
                DISCIPLINES &amp; NAVIGATION
              </div>
              {siteContent.navigation.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href, item.id)}
                  className="font-display text-2xl text-[#F5F3EF] hover:text-[#C5B083] transition-colors py-1 border-b border-[#24322A]/40"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="pt-8 border-t border-[#24322A]/60 flex flex-col gap-3 font-mono text-xs">
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "#contact", "contact")}
                className="text-center py-3 bg-[#2E5A44] text-[#F5F3EF] uppercase tracking-wider font-semibold"
              >
                Initiate Project Brief
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
