"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CompanyLogo } from "@/components/brand/CompanyLogo";
import { siteContent } from "@/config/site-content";
import { Menu, X, ArrowUpRight } from "lucide-react";

/**
 * Navbar Component — Phase 02 Specification
 * - Over hero: Transparent background, crisp Warm Ivory (#F3F0E8) typography
 * - Scrolled state: Solid Deep Charcoal (#202622) with subtle transition
 * - Active section indication: Subtle Champagne Brass (#B49A68) underline
 * - Primary CTA: Muted Forest (#526653) "Let's Build" leading to #contact
 * - Exactly the 9 planned sections in specified order
 * - Accessible mobile overlay with background scroll lock and Escape key support
 */
export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Transition from transparent to solid after leaving the top of the hero (60px)
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Active section spy based on current scroll position
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

  // Prevent background scrolling when mobile navigation overlay is open
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

  // Handle Escape key to close mobile overlay
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
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

            {/* 2. Centered Navigation Links (All 9 sections in exact planned order) */}
            <nav
              className="hidden xl:flex items-center gap-5 lg:gap-6 text-xs uppercase tracking-[0.14em] font-medium"
              aria-label="Primary Navigation"
            >
              {siteContent.navigation.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    className={`relative py-1 transition-colors duration-200 ${
                      isActive
                        ? "text-[#B49A68] font-semibold"
                        : "text-[#F3F0E8]/85 hover:text-[#F3F0E8]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {/* Subtle Champagne Brass Active Underline */}
                    {isActive && (
                      <span
                        className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#B49A68] rounded-full transition-all"
                        aria-hidden="true"
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* 3. Primary "Let's Build" CTA on the Right (Muted Forest #526653) */}
            <div className="hidden sm:flex items-center gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 bg-[#526653] hover:bg-[#343B33] text-[#F3F0E8] px-5 py-2.5 border border-[#B49A68]/30 hover:border-[#B49A68] text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-200 shadow-sm"
              >
                <span>Let&apos;s Build</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#B49A68] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center gap-2 xl:hidden">
              <a
                href="#contact"
                className="sm:hidden inline-flex items-center bg-[#526653] text-[#F3F0E8] px-3 py-1.5 text-[11px] uppercase tracking-wider font-semibold border border-[#B49A68]/30 mr-1"
              >
                Enquire
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#F3F0E8] hover:text-[#B49A68] transition-colors focus:outline-none focus:ring-2 focus:ring-[#B49A68]"
                aria-expanded={mobileMenuOpen}
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
      <div
        className={`fixed inset-0 z-40 bg-[#202622] transition-all duration-300 flex flex-col justify-between p-6 sm:p-10 xl:hidden ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
        style={{ top: "0px" }}
      >
        <div className="pt-20 overflow-y-auto">
          <p className="text-[11px] tracking-[0.25em] text-[#B49A68] uppercase font-semibold mb-6">
            Landing Navigation
          </p>
          <nav className="flex flex-col gap-3.5" aria-label="Mobile Navigation">
            {siteContent.navigation.map((item, index) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-display text-xl sm:text-2xl transition-colors flex items-center justify-between border-b border-[#343B33] pb-2.5 ${
                    isActive ? "text-[#B49A68]" : "text-[#F3F0E8] hover:text-[#B49A68]"
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
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-3.5 text-center bg-[#526653] hover:bg-[#343B33] text-[#F3F0E8] text-xs uppercase tracking-[0.18em] font-semibold transition-colors border border-[#B49A68]/40"
          >
            Let&apos;s Build — Initiate Enquiry
          </a>
          <p className="text-[11px] text-[#D9D2C4]/60 text-center tracking-wider font-mono">
            [COMPANY NAME] Architecture &amp; Developments
          </p>
        </div>
      </div>
    </>
  );
};
