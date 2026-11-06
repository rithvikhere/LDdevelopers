"use client";

import React from "react";
import { CompanyLogo } from "@/components/brand/CompanyLogo";
import { siteAssets } from "@/config/site-assets";
import { siteContent } from "@/config/site-content";
import { ArrowUp, Phone, Mail, MapPin, Clock } from "lucide-react";

/**
 * Footer Component — Phase 02 Specification
 * - Solid Deep Charcoal (#202622) background
 * - Exactly the 9 planned sections in specified order
 * - Clean company placeholders (phone, email, address, consultation hours)
 * - Restrained typography and smooth back-to-top trigger
 * - No premature portal or mock admin links
 */
export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#202622] text-[#F3F0E8] border-t border-[#343B33] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-16 border-b border-[#343B33]">
          {/* Column 1: Brand & Philosophy */}
          <div className="lg:col-span-2 flex flex-col pr-0 lg:pr-8">
            <CompanyLogo theme="dark" className="mb-6" />
            <p className="text-sm text-[#D9D2C4]/80 leading-relaxed font-light mb-6 max-w-md">
              A bespoke master builder and property developer creating timeless architectural
              landmarks. Dedicated to precision engineering, tactile craftsmanship, and transparent client partnerships.
            </p>
            <div className="flex items-center gap-3 mt-auto pt-2">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#B49A68] font-medium">
                Registration / RERA:
              </span>
              <span className="text-xs text-[#D9D2C4]/70 font-mono">
                {siteContent.company.registrationNumberPlaceholder}
              </span>
            </div>
          </div>

          {/* Column 2: Exact 9 Landing Page Sections */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.22em] text-[#B49A68] font-semibold mb-6">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs uppercase tracking-wider">
              {siteContent.navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="text-[#D9D2C4]/75 hover:text-[#B49A68] transition-colors inline-block py-0.5"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Construction Services */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.22em] text-[#B49A68] font-semibold mb-6">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs text-[#D9D2C4]/80">
              {siteAssets.services.map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    className="hover:text-[#B49A68] transition-colors inline-block py-0.5"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Office & Desk Contact Details */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.22em] text-[#B49A68] font-semibold mb-6">
              Contact &amp; Desk
            </h4>
            <div className="space-y-4 text-xs text-[#D9D2C4]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B49A68] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {siteAssets.contact.addressPlaceholder}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B49A68] shrink-0" />
                <span className="font-mono">{siteAssets.contact.phonePlaceholder}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B49A68] shrink-0" />
                <span>{siteAssets.contact.emailPlaceholder}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#B49A68] shrink-0 mt-0.5" />
                <span>{siteAssets.contact.businessHoursPlaceholder}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back-to-Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D9D2C4]/60">
          <p>
            &copy; {new Date().getFullYear()} {siteContent.company.name}. All rights reserved.
            {" "}<span className="text-[#B49A68]/80 text-[11px] block sm:inline mt-1 sm:mt-0 font-mono">Sample imagery &amp; placeholder copy.</span>
          </p>

          <div className="flex items-center gap-6">
            <span className="hover:text-[#F3F0E8] cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-[#F3F0E8] cursor-pointer transition-colors">Terms of Service</span>
            <button
              onClick={scrollToTop}
              type="button"
              className="inline-flex items-center gap-2 text-[#B49A68] hover:text-[#F3F0E8] transition-colors ml-2 py-1 px-2.5 border border-[#343B33] hover:border-[#B49A68]"
              aria-label="Back to top"
            >
              <span className="text-[11px] uppercase tracking-wider">Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
