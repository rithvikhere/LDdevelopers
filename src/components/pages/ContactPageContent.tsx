"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteContent } from "@/config/site-content";
import { ContactInfoCard } from "@/components/landing/ContactInfoCard";
import { KairosDepthReveal, KairosMaskedText } from "@/components/ui/KairosScrollReveal";

/**
 * ContactPageContent — informational contact page (/contact).
 * Reuses the existing studio details + WhatsApp card. The enquiry form itself lives on the
 * homepage (/#enquiry) and is intentionally not duplicated here.
 */
export const ContactPageContent: React.FC = () => (
  <section
    id="contact-page"
    className="pt-10 pb-20 sm:pt-12 sm:pb-24 bg-transparent text-[#F5F3EF] relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-architectural-grid opacity-15 pointer-events-none" />

    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Editorial introduction */}
        <div className="lg:col-span-6 xl:col-span-7">
          <KairosDepthReveal delay={0.05}>
            <span className="text-sm sm:text-base md:text-lg font-mono tracking-[0.3em] text-[#C5B083] uppercase font-semibold">
              05 / CONTACT
            </span>
          </KairosDepthReveal>

          <KairosMaskedText
            delay={0.12}
            as="h1"
            className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#F5F3EF] tracking-tight leading-[1.1]"
          >
            {siteContent.contact.title}
          </KairosMaskedText>

          <KairosDepthReveal delay={0.2}>
            <p className="mt-6 max-w-xl text-xs sm:text-sm text-[#9EA8A1] font-light leading-relaxed font-mono">
              {siteContent.contact.subtitle}
            </p>
          </KairosDepthReveal>

          <KairosDepthReveal delay={0.28}>
            <div className="mt-10 pt-8 border-t border-[#343B33] max-w-xl">
              <p className="text-sm text-[#D9D2C4] font-light leading-relaxed">
                {siteContent.contact.enquiryNotice}
              </p>
              <Link
                href="/#enquiry"
                className="group mt-6 inline-flex items-center justify-center gap-3 bg-[#F5F2EB] hover:bg-[#526653] hover:text-[#F5F3EF] text-[#0B0F0D] px-7 py-4 text-xs font-mono uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-xl outline-none focus-visible:ring-1 focus-visible:ring-[#C5B083] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0B0F0D]"
              >
                <span>Go to the Enquiry Form</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#526653] group-hover:text-[#C5B083] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </KairosDepthReveal>
        </div>

        {/* Existing studio details & WhatsApp click-to-chat */}
        <div className="lg:col-span-6 xl:col-span-5">
          <ContactInfoCard />
        </div>
      </div>
    </div>
  </section>
);
