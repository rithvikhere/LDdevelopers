"use client";

import React from "react";
import Link from "next/link";
import { CompanyLogo } from "@/components/brand/CompanyLogo";
import { siteAssets } from "@/config/site-assets";
import { siteContent } from "@/config/site-content";
import { ArrowUp, ArrowUpRight, Phone, Mail, MapPin, Clock } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0B0F0D] text-[#F5F3EF] border-t border-[#24322A] relative z-20 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-16 border-b border-[#24322A]">
          {/* Column 1: Brand & Philosophy */}
          <div className="lg:col-span-2 flex flex-col pr-0 lg:pr-8">
            <CompanyLogo theme="dark" className="mb-6" />
            <p className="text-xs sm:text-sm text-[#9EA8A1] leading-relaxed font-light mb-8 max-w-md">
              A bespoke architectural practice and master builder creating timeless residences, duplexes, villas, and commercial landmarks. Dedicated to structural purity, precision engineering, and enduring client partnerships.
            </p>
            <div className="flex items-center gap-3 mt-auto text-xs font-mono">
              <span className="uppercase tracking-[0.2em] text-[#C5B083]">
                RERA / REGISTRATION:
              </span>
              <span className="text-[#9EA8A1]">
                {siteContent.company.registrationNumberPlaceholder}
              </span>
            </div>
          </div>

          {/* Column 2: 9 Landing Page Sections */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.22em] text-[#C5B083] font-mono mb-6">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-mono uppercase tracking-wider">
              {siteContent.navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="text-[#9EA8A1] hover:text-[#C5B083] transition-colors inline-block py-0.5"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Portals & Client Governance */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.22em] text-[#C5B083] font-mono mb-6">
              Client &amp; Governance
            </h4>
            <ul className="space-y-2.5 text-xs font-mono uppercase tracking-wider">
              <li>
                <Link
                  href="/login"
                  className="text-[#9EA8A1] hover:text-[#C5B083] transition-colors inline-flex items-center gap-1.5 py-0.5"
                >
                  <span>Client Portal</span>
                  <ArrowUpRight className="w-3 h-3 text-[#C5B083]" />
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-[#9EA8A1] hover:text-[#C5B083] transition-colors inline-flex items-center gap-1.5 py-0.5"
                >
                  <span>Register Account</span>
                  <ArrowUpRight className="w-3 h-3 text-[#C5B083]" />
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-[#9EA8A1] hover:text-[#C5B083] transition-colors inline-flex items-center gap-1.5 py-0.5"
                >
                  <span>Admin Console</span>
                  <ArrowUpRight className="w-3 h-3 text-[#C5B083]" />
                </Link>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-[#9EA8A1] hover:text-[#C5B083] transition-colors inline-block py-0.5"
                >
                  Book Private Consultation
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Locations */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.22em] text-[#C5B083] font-mono mb-6">
              Studio Locations
            </h4>
            <div className="space-y-4 text-xs font-mono text-[#9EA8A1]">
              <div>
                <span className="text-[#F5F3EF] block font-medium">Bengaluru Studio</span>
                <span className="text-[11px] block mt-0.5">{siteAssets.contact.addressPlaceholder}</span>
              </div>
              <div>
                <span className="text-[#F5F3EF] block font-medium">Hyderabad Desk</span>
                <span className="text-[11px] block mt-0.5">Jubilee Hills, Road No. 36</span>
              </div>
              <div className="pt-2">
                <span className="text-[10px] text-[#C5B083] uppercase block">Direct Line</span>
                <a href={`tel:${siteAssets.contact.phonePlaceholder}`} className="text-[#F5F3EF] hover:text-[#C5B083] transition-colors">
                  {siteAssets.contact.phonePlaceholder}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#9EA8A1]/70">
          <div>
            &copy; {new Date().getFullYear()} [COMPANY NAME] ARCHITECTURE &amp; PROPERTY DEVELOPMENTS &bull; ALL RIGHTS RESERVED
          </div>

          <button
            onClick={scrollToTop}
            type="button"
            className="group inline-flex items-center gap-2 hover:text-[#C5B083] transition-colors cursor-pointer uppercase tracking-widest text-[10px]"
            aria-label="Scroll back to the top of the page"
          >
            <span>Back to Summit</span>
            <span className="p-1.5 border border-[#24322A] group-hover:border-[#C5B083] transition-colors">
              <ArrowUp className="w-3 h-3" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};
