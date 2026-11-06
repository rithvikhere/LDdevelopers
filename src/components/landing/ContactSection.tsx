"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteAssets } from "@/config/site-assets";
import { siteContent } from "@/config/site-content";
import {
  KairosDepthReveal,
  KairosMaskedText,
} from "@/components/ui/KairosScrollReveal";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Sparkles,
  Lock,
} from "lucide-react";

interface FormDataState {
  fullName: string;
  phone: string;
  buildingType: string;
  location: string;
  visionNotes: string;
}

interface FormErrorsState {
  fullName?: string;
  phone?: string;
}

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormDataState>({
    fullName: "",
    phone: "",
    buildingType: "Bespoke Residential Architecture",
    location: "",
    visionNotes: "",
  });

  const [errors, setErrors] = useState<FormErrorsState>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    data: FormDataState;
    refCode: string;
    timestamp: string;
  } | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrorsState = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please provide your full legal or representative name.";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must contain at least 2 characters.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required for architectural consultation.";
    } else {
      const cleaned = formData.phone.replace(/[\s\-\(\)\+]/g, "");
      if (cleaned.length < 10 || cleaned.length > 15) {
        newErrors.phone = "Please enter a valid 10-digit phone number.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const generatedRef = `LD-ENQ-2026-${randomSuffix}`;

      setSubmittedData({
        data: { ...formData },
        refCode: generatedRef,
        timestamp: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      });

      setIsSubmitting(false);
    }, 600);
  };

  const handleReset = () => {
    setSubmittedData(null);
    setFormData({
      fullName: "",
      phone: "",
      buildingType: "Bespoke Residential Architecture",
      location: "",
      visionNotes: "",
    });
    setErrors({});
  };

  const rawPhone = siteAssets.contact.phonePlaceholder.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${rawPhone}?text=${encodeURIComponent(
    "Hello LD Developers, I am interested in commissioning an architectural and turnkey construction consultation."
  )}`;

  return (
    <section
      id="contact"
      className="py-28 sm:py-36 lg:py-44 bg-[#0B0F0D] text-[#F5F3EF] relative overflow-hidden transition-colors"
    >
      {/* Top Hairline Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#24322A] to-transparent" />
      <div className="absolute inset-0 bg-architectural-grid opacity-15 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 sm:mb-24">
          <div>
            <KairosDepthReveal delay={0.05}>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[11px] font-mono tracking-[0.25em] text-[#C5B083] uppercase">
                  08 / ARCHITECTURAL INTAKE &amp; CONTACT
                </span>
                <div className="h-px bg-[#24322A] w-16" />
              </div>
            </KairosDepthReveal>

            <KairosMaskedText delay={0.15} as="h2" className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#F5F3EF] tracking-tight max-w-2xl leading-[1.12]">
              {siteContent.contact.title}
            </KairosMaskedText>
          </div>

          <KairosDepthReveal delay={0.25}>
            <p className="text-xs sm:text-sm text-[#9EA8A1] max-w-md font-light leading-relaxed font-mono">
              Initiate a confidential consultation with our principal design desk, or submit your land parcel specifications for architectural feasibility review.
            </p>
          </KairosDepthReveal>
        </div>

        {/* Asymmetrical Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Studio Information & Direct Outreach (Columns 1-5) */}
          <div className="lg:col-span-5 space-y-8">
            <KairosDepthReveal delay={0.2} withFrame={true}>
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C5B083]">
                    PRINCIPAL STUDIO
                  </span>
                  <h3 className="font-display text-2xl font-light text-[#F5F3EF] mt-1">
                    Design Desk &amp; Consultation
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9EA8A1] font-light mt-2 leading-relaxed">
                    Available for site visits, zoning assessments, and private client architectural briefings across Telangana and Karnataka.
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-[#24322A]/60 text-xs font-mono">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#17201B] border border-[#24322A] flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-[#C5B083]" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-[#9EA8A1] block">Location</span>
                      <span className="text-[#F5F3EF]">{siteAssets.contact.addressPlaceholder}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#17201B] border border-[#24322A] flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-[#C5B083]" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-[#9EA8A1] block">Direct Studio Line</span>
                      <a href={`tel:${siteAssets.contact.phonePlaceholder}`} className="text-[#F5F3EF] hover:text-[#C5B083] transition-colors">
                        {siteAssets.contact.phonePlaceholder}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#17201B] border border-[#24322A] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-[#C5B083]" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-[#9EA8A1] block">Inquiries</span>
                      <a href={`mailto:${siteAssets.contact.emailPlaceholder}`} className="text-[#F5F3EF] hover:text-[#C5B083] transition-colors">
                        {siteAssets.contact.emailPlaceholder}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#17201B] border border-[#24322A] flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 text-[#C5B083]" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-[#9EA8A1] block">Hours</span>
                      <span className="text-[#F5F3EF]">{siteAssets.contact.businessHoursPlaceholder}</span>
                    </div>
                  </div>
                </div>

                {/* Direct WhatsApp CTA Button */}
                <div className="pt-4 border-t border-[#24322A]/60">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-full inline-flex items-center justify-center gap-3 bg-[#17201B] hover:bg-[#2E5A44] border border-[#24322A] hover:border-[#C5B083]/60 text-[#F5F3EF] py-3.5 px-6 text-xs font-mono uppercase tracking-[0.2em] font-medium transition-all duration-300"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span>WhatsApp Consultation</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#C5B083]" />
                  </a>
                </div>

                {/* Link to Full Client Portal */}
                <div className="pt-2 text-center text-xs font-mono">
                  <Link href="/login" className="text-[#9EA8A1] hover:text-[#C5B083] underline decoration-[#24322A] underline-offset-4 transition-colors">
                    Access Client Portal &bull; Live Project Tracker &rarr;
                  </Link>
                </div>
              </div>
            </KairosDepthReveal>
          </div>

          {/* Right Column: Architectural Intake Form (Columns 6-12) */}
          <div className="lg:col-span-7">
            <KairosDepthReveal delay={0.25} withFrame={false}>
              <div className="border border-[#24322A] bg-[#121815]/70 backdrop-blur-md p-8 sm:p-12 relative overflow-hidden">
                <div className="pb-6 border-b border-[#24322A]/60 mb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5B083]" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C5B083]">
                      INTAKE DESK
                    </span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-light text-[#F5F3EF]">
                    Initiate Construction Enquiry
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9EA8A1] font-light mt-1.5 leading-relaxed">
                    Submit your plot parameters or development vision for preliminary zoning and structural review.
                  </p>
                </div>

                {submittedData ? (
                  /* Confirmation State */
                  <div className="space-y-6">
                    <div className="p-4 bg-[#2E5A44]/15 border border-[#2E5A44]/40 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#C5B083]" />
                        <div>
                          <span className="text-xs font-display text-[#F5F3EF]">Consultation Registered</span>
                          <span className="block text-[10px] font-mono text-[#9EA8A1]">{submittedData.timestamp}</span>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-semibold text-[#C5B083] bg-[#0B0F0D] px-2.5 py-1 border border-[#24322A]">
                        {submittedData.refCode}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                      <div className="p-3.5 bg-[#17201B] border border-[#24322A]">
                        <span className="text-[10px] text-[#9EA8A1] uppercase block mb-1">Client Name</span>
                        <span className="text-[#F5F3EF]">{submittedData.data.fullName}</span>
                      </div>
                      <div className="p-3.5 bg-[#17201B] border border-[#24322A]">
                        <span className="text-[10px] text-[#9EA8A1] uppercase block mb-1">Contact Phone</span>
                        <span className="text-[#F5F3EF]">{submittedData.data.phone}</span>
                      </div>
                      <div className="p-3.5 bg-[#17201B] border border-[#24322A]">
                        <span className="text-[10px] text-[#9EA8A1] uppercase block mb-1">Selected Discipline</span>
                        <span className="text-[#C5B083]">{submittedData.data.buildingType}</span>
                      </div>
                      <div className="p-3.5 bg-[#17201B] border border-[#24322A]">
                        <span className="text-[10px] text-[#9EA8A1] uppercase block mb-1">Location / Parcel</span>
                        <span className="text-[#F5F3EF]">{submittedData.data.location || "Consultation review"}</span>
                      </div>
                    </div>

                    {submittedData.data.visionNotes && (
                      <div className="p-3.5 bg-[#17201B] border border-[#24322A] text-xs font-mono">
                        <span className="text-[10px] text-[#9EA8A1] uppercase block mb-1">Preliminary Vision Scope</span>
                        <p className="text-[#E8E4DC] font-light italic">&ldquo;{submittedData.data.visionNotes}&rdquo;</p>
                      </div>
                    )}

                    <div className="pt-4 border-t border-[#24322A]/60 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#9EA8A1] hover:text-[#C5B083] transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Submit Another Enquiry</span>
                      </button>
                      <Link
                        href="/login"
                        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#C5B083] hover:text-[#F5F3EF] transition-colors"
                      >
                        <span>Open Client Portal</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ) : (
                  /* Active Form */
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-[11px] font-mono tracking-wider text-[#9EA8A1] uppercase mb-1.5">
                        Client Representative Name *
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                        }}
                        placeholder="e.g., Rajeshwari Rao"
                        className={`w-full bg-[#17201B] border ${
                          errors.fullName ? "border-red-500" : "border-[#24322A]"
                        } focus:border-[#C5B083] text-[#F5F3EF] text-sm px-4 py-2.5 transition-colors placeholder:text-[#9EA8A1]/40 outline-none`}
                      />
                      {errors.fullName && (
                        <p className="text-red-400 text-xs font-mono mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono tracking-wider text-[#9EA8A1] uppercase mb-1.5">
                          Direct Contact Phone *
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value });
                            if (errors.phone) setErrors({ ...errors, phone: undefined });
                          }}
                          placeholder="+91 98450 12345"
                          className={`w-full bg-[#17201B] border ${
                            errors.phone ? "border-red-500" : "border-[#24322A]"
                          } focus:border-[#C5B083] text-[#F5F3EF] text-sm px-4 py-2.5 transition-colors placeholder:text-[#9EA8A1]/40 outline-none`}
                        />
                        {errors.phone && (
                          <p className="text-red-400 text-xs font-mono mt-1">{errors.phone}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono tracking-wider text-[#9EA8A1] uppercase mb-1.5">
                          Architectural Typology
                        </label>
                        <select
                          value={formData.buildingType}
                          onChange={(e) => setFormData({ ...formData, buildingType: e.target.value })}
                          className="w-full bg-[#17201B] border border-[#24322A] focus:border-[#C5B083] text-[#F5F3EF] text-sm px-4 py-2.5 transition-colors outline-none cursor-pointer"
                        >
                          <option value="Bespoke Residential Architecture">Bespoke Residential Architecture</option>
                          <option value="Duplexes & Multi-Level Living">Duplexes &amp; Multi-Level Living</option>
                          <option value="Luxury Villas & Private Estates">Luxury Villas &amp; Private Estates</option>
                          <option value="Commercial Buildings & Landmarks">Commercial Buildings &amp; Landmarks</option>
                          <option value="Strategic Land Investing">Strategic Land Investing</option>
                          <option value="Property Buying & Selling">Property Buying &amp; Selling</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono tracking-wider text-[#9EA8A1] uppercase mb-1.5">
                        Site Location or Plot Parameters
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g., Jubilee Hills, Hyderabad (4,800 sq.ft plot)"
                        className="w-full bg-[#17201B] border border-[#24322A] focus:border-[#C5B083] text-[#F5F3EF] text-sm px-4 py-2.5 transition-colors placeholder:text-[#9EA8A1]/40 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono tracking-wider text-[#9EA8A1] uppercase mb-1.5">
                        Preliminary Scope &amp; Vision Notes
                      </label>
                      <textarea
                        rows={3}
                        value={formData.visionNotes}
                        onChange={(e) => setFormData({ ...formData, visionNotes: e.target.value })}
                        placeholder="Describe your design aspirations, timeline requirements, or structural preferences..."
                        className="w-full bg-[#17201B] border border-[#24322A] focus:border-[#C5B083] text-[#F5F3EF] text-sm px-4 py-2.5 transition-colors placeholder:text-[#9EA8A1]/40 outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-[#2E5A44] hover:bg-[#17201B] border border-[#24322A] hover:border-[#C5B083] text-[#F5F3EF] py-4 text-xs font-mono uppercase tracking-[0.2em] font-medium transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[#2E5A44]/20"
                    >
                      <span>{isSubmitting ? "TRANSMITTING ENQUIRY..." : "TRANSMIT ARCHITECTURAL BRIEF"}</span>
                      <ArrowUpRight className="w-4 h-4 text-[#C5B083]" />
                    </button>
                  </form>
                )}
              </div>
            </KairosDepthReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
