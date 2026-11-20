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
    <footer className="bg-[#212121] text-[#D3ECCD] border-t border-white/10 relative z-20 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          {/* Column 1: Brand & Philosophy */}
          <div className="lg:col-span-2 flex flex-col pr-0 lg:pr-8">
            <CompanyLogo theme="dark" className="mb-6" />
            <p className="text-xs sm:text-sm text-[#CADCAE]/80 leading-relaxed font-light mb-8 max-w-md">
              A bespoke architectural practice and master builder creating timeless residences, duplexes, villas, and commercial landmarks. Dedicated to structural purity, precision engineering, and enduring client partnerships.
            </p>
            <div className="flex items-center gap-3 mt-auto text-xs font-mono">
              <span className="uppercase tracking-[0.2em] text-[#E67514]">
                RERA / REGISTRATION:
              </span>
              <span className="text-[#CADCAE]/80">
                {siteContent.company.registrationNumberPlaceholder}
              </span>
            </div>
          </div>

          {/* Column 2: Six Independent Content Pages */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.22em] text-[#E67514] font-mono mb-6">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-mono uppercase tracking-wider">
              {siteContent.navigation.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="text-[#CADCAE]/80 hover:text-[#E67514] transition-colors inline-block py-0.5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Studio Portal & Administration */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.22em] text-[#E67514] font-mono mb-6">
              Studio Portal
            </h4>
            <ul className="space-y-2.5 text-xs font-mono uppercase tracking-wider">
              <li>
                <Link
                  href="/login"
                  className="text-[#CADCAE]/80 hover:text-[#E67514] transition-colors inline-flex items-center gap-1.5 py-0.5"
                >
                  <span>Admin Dashboard</span>
                  <ArrowUpRight className="w-3 h-3 text-[#E67514]" />
                </Link>
              </li>
              <li>
                <Link
                  href="/#enquiry"
                  className="text-[#CADCAE]/80 hover:text-[#E67514] transition-colors inline-block py-0.5"
                >
                  Commission Enquiry
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Locations */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.22em] text-[#E67514] font-mono mb-6">
              Studio Locations
            </h4>
            <div className="space-y-4 text-xs font-mono text-[#CADCAE]/80">
              <div>
                <span className="text-[#D3ECCD] block font-medium">Bengaluru Studio</span>
                <span className="text-[11px] block mt-0.5">{siteAssets.contact.addressPlaceholder}</span>
              </div>
              <div>
                <span className="text-[#D3ECCD] block font-medium">Hyderabad Desk</span>
                <span className="text-[11px] block mt-0.5">Jubilee Hills, Road No. 36</span>
              </div>
              <div className="pt-2">
                <span className="text-[10px] text-[#E67514] uppercase block">Direct Line</span>
                <a href={`tel:${siteAssets.contact.phonePlaceholder}`} className="text-[#D3ECCD] hover:text-[#E67514] transition-colors">
                  {siteAssets.contact.phonePlaceholder}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#CADCAE]/70">
          <div>
            &copy; {new Date().getFullYear()} [COMPANY NAME] ARCHITECTURE &amp; PROPERTY DEVELOPMENTS &bull; ALL RIGHTS RESERVED
          </div>

          <button
            onClick={scrollToTop}
            type="button"
            className="group inline-flex items-center gap-2 hover:text-[#E67514] transition-colors cursor-pointer uppercase tracking-widest text-[10px]"
            aria-label="Scroll back to the top of the page"
          >
            <span>Back to Summit</span>
            <span className="p-1.5 border border-white/10 group-hover:border-[#E67514] transition-colors">
              <ArrowUp className="w-3 h-3" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};
