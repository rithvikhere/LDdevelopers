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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#0B0F0D]/85 backdrop-blur-md border-b border-[#24322A]/40 py-3.5 shadow-2xl"
            : "bg-transparent border-b border-transparent py-5 sm:py-6"
        }`}
      >
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <div className="shrink-0">
              <CompanyLogo theme="dark" />
            </div>

            {/* Desktop Navigation */}
            <nav
              className="hidden xl:flex items-center gap-6 lg:gap-8 text-[11px] font-mono uppercase tracking-[0.2em]"
              aria-label="Main Navigation"
            >
              {siteContent.navigation.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href, item.id)}
                    className={`relative py-1.5 transition-colors duration-300 ${
                      isActive
                        ? "text-[#C5B083] font-medium"
                        : "text-[#F5F3EF]/70 hover:text-[#C5B083]"
                    }`}
                  >
                    <span>{item.label}</span>

                    {isActive && (
                      <motion.span
                        layoutId={shouldReduceMotion ? undefined : "activeNavbarIndicator"}
                        className="absolute -bottom-0.5 left-0 right-0 h-[1px] bg-[#C5B083]"
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

            {/* Right Action: Minimalist Portal / Contact Trigger */}
            <div className="hidden sm:flex items-center gap-4">
              <Link
                href="/login"
                className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#F5F3EF]/70 hover:text-[#C5B083] transition-colors py-1.5"
              >
                Portal
              </Link>

              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "#contact", "contact")}
                className="group inline-flex items-center gap-2 bg-[#17201B] hover:bg-[#2E5A44] border border-[#24322A] hover:border-[#C5B083]/50 text-[#F5F3EF] px-5 py-2 text-[10px] font-mono uppercase tracking-[0.22em] font-medium transition-all duration-300"
              >
                <span>INITIATE PROJECT</span>
                <ArrowUpRight className="w-3 h-3 text-[#C5B083] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 xl:hidden">
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "#contact", "contact")}
                className="sm:hidden text-[10px] font-mono uppercase tracking-wider text-[#C5B083] border border-[#24322A] px-2.5 py-1"
              >
                Contact
              </a>
              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#F5F3EF] hover:text-[#C5B083] transition-colors"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-3 border border-[#24322A] text-[#F5F3EF] uppercase tracking-wider"
              >
                Client &amp; Admin Portal
              </Link>
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
