"use client";

import React from "react";
import { siteAssets } from "@/config/site-assets";
import { KairosDepthReveal } from "@/components/ui/KairosScrollReveal";
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowUpRight } from "lucide-react";

const rawPhone = siteAssets.contact.phonePlaceholder.replace(/[^0-9]/g, "");

/** WhatsApp click-to-chat link with the existing pre-filled consultation message. */
export const contactWhatsappUrl = `https://wa.me/${rawPhone}?text=${encodeURIComponent(
  "Hello LD Developers, I am interested in commissioning an architectural and turnkey construction consultation."
)}`;

/**
 * ContactInfoCard — Principal studio details (address, phone, email, hours) and WhatsApp CTA.
 * Shared by the homepage enquiry section and the dedicated /contact page.
 */
export const ContactInfoCard: React.FC = () => {
  const whatsappUrl = contactWhatsappUrl;

  return (
    <KairosDepthReveal delay={0.2} withFrame={true}>
      <div className="space-y-6">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#212121] font-semibold">
            PRINCIPAL STUDIO
          </span>
          <h3 className="font-display text-2xl font-light text-[#212121] mt-1">
            Design Desk &amp; Consultation
          </h3>
          <p className="text-xs sm:text-sm text-[#212121] font-light mt-2 leading-relaxed">
            Available for site visits, zoning assessments, and private client architectural briefings across Telangana and Karnataka.
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#212121]/15 text-xs font-mono">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-[#CADCAE] border border-[#212121]/20 shadow-xs flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-[#06923E]" />
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#212121]/75 font-semibold block">Location</span>
              <span className="text-[#212121] font-medium">{siteAssets.contact.addressPlaceholder}</span>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-[#CADCAE] border border-[#212121]/20 shadow-xs flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 text-[#06923E]" />
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#212121]/75 font-semibold block">Direct Studio Line</span>
              <a href={`tel:${siteAssets.contact.phonePlaceholder}`} className="text-[#212121] font-medium hover:text-[#06923E] transition-colors">
                {siteAssets.contact.phonePlaceholder}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-[#CADCAE] border border-[#212121]/20 shadow-xs flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4 text-[#06923E]" />
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#212121]/75 font-semibold block">Inquiries</span>
              <a href={`mailto:${siteAssets.contact.emailPlaceholder}`} className="text-[#212121] font-medium hover:text-[#06923E] transition-colors">
                {siteAssets.contact.emailPlaceholder}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-[#CADCAE] border border-[#212121]/20 shadow-xs flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-[#06923E]" />
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#212121]/75 font-semibold block">Hours</span>
              <span className="text-[#212121] font-medium">{siteAssets.contact.businessHoursPlaceholder}</span>
            </div>
          </div>
        </div>

        {/* Direct WhatsApp CTA Button */}
        <div className="pt-4 border-t border-[#212121]/15">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full inline-flex items-center justify-center gap-3 bg-[#06923E] hover:bg-[#212121] border border-[#06923E] hover:border-[#212121] text-white py-3.5 px-6 text-xs font-mono uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-md"
          >
            <MessageCircle className="w-4 h-4 text-white" />
            <span>WhatsApp Consultation</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white group-hover:text-[#E67514]" />
          </a>
        </div>
      </div>
    </KairosDepthReveal>
  );
};
