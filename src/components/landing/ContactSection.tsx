"use client";

import React, { useState } from "react";
import { siteContent } from "@/config/site-content";
import { submitPublicEnquiryAction } from "@/app/actions/enquiries";
import { ContactInfoCard, contactWhatsappUrl } from "@/components/landing/ContactInfoCard";
import {
  KairosDepthReveal,
  KairosMaskedText,
} from "@/components/ui/KairosScrollReveal";
import {
  ArrowUpRight,
  CheckCircle2,
  RotateCcw,
  Sparkles,
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

  const [serverError, setServerError] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await submitPublicEnquiryAction({
        fullName: formData.fullName,
        phone: formData.phone,
        buildingType: formData.buildingType,
        location: formData.location,
        visionNotes: formData.visionNotes,
      });

      if (res.success && res.enquiryNumber) {
        setSubmittedData({
          data: { ...formData },
          refCode: res.enquiryNumber,
          timestamp: new Date().toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        });
      } else {
        setServerError(res.error || "Failed to record enquiry. Please retry or contact us directly via WhatsApp.");
      }
    } catch (err) {
      console.error("Enquiry submission error:", err);
      setServerError("Network error registering enquiry. Please reach out directly on WhatsApp or phone.");
    } finally {
      setIsSubmitting(false);
    }
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

  const whatsappUrl = contactWhatsappUrl;

  return (
    <section
      id="contact"
      className="py-28 sm:py-36 lg:py-44 bg-transparent text-[#212121] relative overflow-hidden transition-colors"
    >
      <div className="absolute inset-0 bg-architectural-grid opacity-15 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header — Centered & Prominent */}
        <div className="flex flex-col items-center text-center mx-auto max-w-4xl mb-16 sm:mb-24">
          <KairosDepthReveal delay={0.05}>
            <div className="flex flex-col items-center justify-center text-center mx-auto mb-6">
              <span className="text-sm sm:text-base md:text-lg font-mono tracking-[0.3em] text-[#212121] uppercase font-semibold">
                06 / ARCHITECTURAL INTAKE &amp; CONTACT
              </span>
            </div>
          </KairosDepthReveal>

          <KairosMaskedText delay={0.15} as="h2" className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#212121] tracking-tight leading-[1.12] mb-6">
            {siteContent.contact.title}
          </KairosMaskedText>

          <KairosDepthReveal delay={0.25}>
            <p className="text-xs sm:text-sm text-[#212121]/75 max-w-2xl mx-auto font-light leading-relaxed font-mono">
              Initiate a confidential consultation with our principal design desk, or submit your land parcel specifications for architectural feasibility review.
            </p>
          </KairosDepthReveal>
        </div>

        {/* Asymmetrical Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Studio Information & Direct Outreach (Columns 1-5) */}
          <div className="lg:col-span-5 space-y-8">
            <ContactInfoCard />
          </div>

          {/* Right Column: Architectural Intake Form (Columns 6-12) */}
          <div className="lg:col-span-7">
            <KairosDepthReveal delay={0.25} withFrame={false}>
              <div className="border border-[#212121]/20 bg-[#D3ECCD]/95 backdrop-blur-md shadow-2xl p-8 sm:p-12 relative overflow-hidden">
                <div className="pb-6 border-b border-[#212121]/15 mb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#06923E]" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#212121] font-semibold">
                      INTAKE DESK
                    </span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-light text-[#212121]">
                    Initiate Construction Enquiry
                  </h3>
                  <p className="text-xs sm:text-sm text-[#212121] font-light mt-1.5 leading-relaxed">
                    Submit your plot parameters or development vision for preliminary zoning and structural review.
                  </p>
                </div>

                {submittedData ? (
                  /* Confirmation State */
                  <div className="space-y-6">
                    <div className="p-4 bg-[#06923E]/15 border border-[#06923E]/40 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#06923E]" />
                        <div>
                          <span className="text-xs font-display text-[#212121] font-semibold">Consultation Registered</span>
                          <span className="block text-[10px] font-mono text-[#212121]/75">{submittedData.timestamp}</span>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-semibold text-[#D3ECCD] bg-[#212121] px-2.5 py-1 border border-[#212121]/20">
                        {submittedData.refCode}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                      <div className="p-3.5 bg-[#CADCAE] border border-[#212121]/15 shadow-xs">
                        <span className="text-[10px] text-[#212121]/75 font-semibold uppercase block mb-1">Client Name</span>
                        <span className="text-[#212121] font-semibold">{submittedData.data.fullName}</span>
                      </div>
                      <div className="p-3.5 bg-[#CADCAE] border border-[#212121]/15 shadow-xs">
                        <span className="text-[10px] text-[#212121]/75 font-semibold uppercase block mb-1">Contact Phone</span>
                        <span className="text-[#212121] font-semibold">{submittedData.data.phone}</span>
                      </div>
                      <div className="p-3.5 bg-[#CADCAE] border border-[#212121]/15 shadow-xs">
                        <span className="text-[10px] text-[#212121]/75 font-semibold uppercase block mb-1">Selected Discipline</span>
                        <span className="text-[#212121] font-semibold">{submittedData.data.buildingType}</span>
                      </div>
                      <div className="p-3.5 bg-[#CADCAE] border border-[#212121]/15 shadow-xs">
                        <span className="text-[10px] text-[#212121]/75 font-semibold uppercase block mb-1">Location / Parcel</span>
                        <span className="text-[#212121] font-semibold">{submittedData.data.location || "Consultation review"}</span>
                      </div>
                    </div>

                    {submittedData.data.visionNotes && (
                      <div className="p-3.5 bg-[#CADCAE] border border-[#212121]/15 shadow-xs text-xs font-mono">
                        <span className="text-[10px] text-[#212121]/75 font-semibold uppercase block mb-1">Preliminary Vision Scope</span>
                        <p className="text-[#212121] font-serif italic">&ldquo;{submittedData.data.visionNotes}&rdquo;</p>
                      </div>
                    )}

                    <div className="pt-4 border-t border-[#212121]/15 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#212121] hover:text-[#06923E] font-semibold transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Submit Another Enquiry</span>
                      </button>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#212121] hover:text-[#212121] font-semibold transition-colors"
                      >
                        <span>Priority WhatsApp Desk</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ) : (
                  /* Active Form with Tactile Paper Inset Text Boxes */
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {serverError && (
                      <div className="p-3 bg-red-100 border border-red-300 text-red-800 text-xs font-mono">
                        {serverError}
                      </div>
                    )}
                    <div>
                      <label className="block text-[11px] font-mono tracking-wider text-[#212121] font-semibold uppercase mb-1.5">
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
                        className={`w-full bg-[#FFFFFF] border ${
                          errors.fullName ? "border-red-500" : "border-[#212121]/25"
                        } focus:border-[#06923E] focus:ring-1 focus:ring-[#06923E] text-[#212121] font-medium text-sm px-4 py-3 transition-colors placeholder:text-[#212121]/75 outline-none shadow-xs`}
                      />
                      {errors.fullName && (
                        <p className="text-red-600 text-xs font-mono mt-1 font-semibold">{errors.fullName}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono tracking-wider text-[#212121] font-semibold uppercase mb-1.5">
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
                          className={`w-full bg-[#FFFFFF] border ${
                            errors.phone ? "border-red-500" : "border-[#212121]/25"
                          } focus:border-[#06923E] focus:ring-1 focus:ring-[#06923E] text-[#212121] font-medium text-sm px-4 py-3 transition-colors placeholder:text-[#212121]/75 outline-none shadow-xs`}
                        />
                        {errors.phone && (
                          <p className="text-red-600 text-xs font-mono mt-1 font-semibold">{errors.phone}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono tracking-wider text-[#212121] font-semibold uppercase mb-1.5">
                          Architectural Typology
                        </label>
                        <select
                          value={formData.buildingType}
                          onChange={(e) => setFormData({ ...formData, buildingType: e.target.value })}
                          className="w-full bg-[#FFFFFF] border border-[#212121]/25 focus:border-[#06923E] focus:ring-1 focus:ring-[#06923E] text-[#212121] font-medium text-sm px-4 py-3 transition-colors outline-none cursor-pointer shadow-xs"
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
                      <label className="block text-[11px] font-mono tracking-wider text-[#212121] font-semibold uppercase mb-1.5">
                        Site Location or Plot Parameters
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g., Jubilee Hills, Hyderabad (4,800 sq.ft plot)"
                        className="w-full bg-[#FFFFFF] border border-[#212121]/25 focus:border-[#06923E] focus:ring-1 focus:ring-[#06923E] text-[#212121] font-medium text-sm px-4 py-3 transition-colors placeholder:text-[#212121]/75 outline-none shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono tracking-wider text-[#212121] font-semibold uppercase mb-1.5">
                        Preliminary Scope &amp; Vision Notes
                      </label>
                      <textarea
                        rows={3}
                        value={formData.visionNotes}
                        onChange={(e) => setFormData({ ...formData, visionNotes: e.target.value })}
                        placeholder="Describe your design aspirations, timeline requirements, or structural preferences..."
                        className="w-full bg-[#FFFFFF] border border-[#212121]/25 focus:border-[#06923E] focus:ring-1 focus:ring-[#06923E] text-[#212121] font-medium text-sm px-4 py-3 transition-colors placeholder:text-[#212121]/75 outline-none resize-none shadow-xs"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-[#06923E] hover:bg-[#212121] border border-[#06923E] hover:border-[#212121] text-white py-4 text-xs font-mono uppercase tracking-[0.2em] font-semibold transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
                    >
                      <span>{isSubmitting ? "TRANSMITTING ENQUIRY..." : "TRANSMIT ARCHITECTURAL BRIEF"}</span>
                      <ArrowUpRight className="w-4 h-4 text-white" />
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
