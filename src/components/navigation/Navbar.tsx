"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CompanyLogo } from "@/components/brand/CompanyLogo";
import { siteContent } from "@/config/site-content";
import { Menu, X, ArrowUpRight, Phone, MessageSquare } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Transition from transparent to solid after 60px
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Active section spy
      const sections = siteContent.navigation.map((item) =>
        item.href.replace("#", "")
      );
      sections.unshift("home");

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is active
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

  // Handle escape key to close mobile menu
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#202622]/95 backdrop-blur-md shadow-xl py-3 border-b border-[#B49A68]/20"
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5 sm:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <div className="flex items-center">
              <CompanyLogo theme="dark" />
            </div>

            {/* Desktop Navigation Links */}
            <nav
              className="hidden lg:flex items-center gap-7 text-[13px] tracking-[0.12em] uppercase font-medium"
              aria-label="Main Navigation"
            >
              {siteContent.navigation.map((item) => {
                const sectionId = item.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative py-1 transition-colors duration-200 ${
                      isActive
                        ? "text-[#B49A68]"
                        : "text-[#F3F0E8]/85 hover:text-[#F3F0E8]"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B49A68] rounded-full animate-in fade-in duration-300" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="hidden sm:flex items-center gap-4">
              <Link
                href="/login"
                className="text-xs uppercase tracking-[0.16em] text-[#F3F0E8]/75 hover:text-[#B49A68] transition-colors px-3 py-2 font-medium"
              >
                Client Portal
              </Link>
              <Link
                href="#contact"
                className="group inline-flex items-center gap-2 bg-[#526653] hover:bg-[#343B33] text-[#F3F0E8] px-5 py-2.5 rounded-none border border-[#B49A68]/40 text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 shadow-md hover:border-[#B49A68]"
              >
                <span>Let&apos;s Build</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#B49A68] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <div className="flex items-center gap-3 lg:hidden">
              <Link
                href="#contact"
                className="sm:hidden inline-flex items-center justify-center bg-[#526653] text-[#F3F0E8] px-3 py-1.5 text-[11px] uppercase tracking-wider font-semibold border border-[#B49A68]/40"
              >
                Enquire
              </Link>
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

      {/* Mobile Navigation Drawer / Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#202622] transition-all duration-500 flex flex-col justify-between p-6 sm:p-10 lg:hidden ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-6"
        }`}
        style={{ top: "0px" }}
      >
        <div className="pt-20">
          <p className="text-[11px] tracking-[0.25em] text-[#B49A68] uppercase font-semibold mb-6">
            Menu Navigation
          </p>
          <nav className="flex flex-col gap-5">
            {siteContent.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-display text-2xl sm:text-3xl text-[#F3F0E8] hover:text-[#B49A68] transition-colors flex items-center justify-between border-b border-[#343B33] pb-3"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-5 h-5 text-[#B49A68]/60" />
              </Link>
            ))}
          </nav>
        </div>

        <div className="pt-8 border-t border-[#343B33] flex flex-col gap-4">
          <div className="flex gap-4">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-3 text-center border border-[#B49A68]/40 text-[#F3F0E8] text-xs uppercase tracking-[0.16em] font-medium"
            >
              Client Login
            </Link>
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-3 text-center bg-[#526653] text-[#F3F0E8] text-xs uppercase tracking-[0.16em] font-semibold"
            >
              Let&apos;s Build
            </Link>
          </div>
          <p className="text-[11px] text-[#D9D2C4]/60 text-center tracking-wider">
            [COMPANY NAME] Architecture &amp; Developments
          </p>
        </div>
      </div>
    </>
  );
};
