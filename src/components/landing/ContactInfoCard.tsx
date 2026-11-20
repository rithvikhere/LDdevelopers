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
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#1F4A36] font-semibold">
            PRINCIPAL STUDIO
          </span>
          <h3 className="font-display text-2xl font-light text-[#0B0F0D] mt-1">
            Design Desk &amp; Consultation
          </h3>
          <p className="text-xs sm:text-sm text-[#1A231F] font-light mt-2 leading-relaxed">
            Available for site visits, zoning assessments, and private client architectural briefings across Telangana and Karnataka.
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#24322A]/15 text-xs font-mono">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-[#ECE8DE] border border-[#24322A]/20 shadow-xs flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-[#1F4A36]" />
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#3B4B42] font-semibold block">Location</span>
              <span className="text-[#0B0F0D] font-medium">{siteAssets.contact.addressPlaceholder}</span>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-[#ECE8DE] border border-[#24322A]/20 shadow-xs flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 text-[#1F4A36]" />
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#3B4B42] font-semibold block">Direct Studio Line</span>
              <a href={`tel:${siteAssets.contact.phonePlaceholder}`} className="text-[#0B0F0D] font-medium hover:text-[#1F4A36] transition-colors">
                {siteAssets.contact.phonePlaceholder}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-[#ECE8DE] border border-[#24322A]/20 shadow-xs flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4 text-[#1F4A36]" />
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#3B4B42] font-semibold block">Inquiries</span>
              <a href={`mailto:${siteAssets.contact.emailPlaceholder}`} className="text-[#0B0F0D] font-medium hover:text-[#1F4A36] transition-colors">
                {siteAssets.contact.emailPlaceholder}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-[#ECE8DE] border border-[#24322A]/20 shadow-xs flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-[#1F4A36]" />
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#3B4B42] font-semibold block">Hours</span>
              <span className="text-[#0B0F0D] font-medium">{siteAssets.contact.businessHoursPlaceholder}</span>
            </div>
          </div>
        </div>

        {/* Direct WhatsApp CTA Button */}
        <div className="pt-4 border-t border-[#24322A]/15">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full inline-flex items-center justify-center gap-3 bg-[#0B0F0D] hover:bg-[#2E5A44] border border-[#24322A] text-[#F5F3EF] py-3.5 px-6 text-xs font-mono uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-md"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>WhatsApp Consultation</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C5B083]" />
          </a>
        </div>
      </div>
    </KairosDepthReveal>
  );
};
