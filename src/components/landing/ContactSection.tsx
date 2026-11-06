"use client";

import React, { useState } from "react";
import { siteAssets } from "@/config/site-assets";
import { siteContent } from "@/config/site-content";
import { MotionReveal } from "@/components/ui/MotionReveal";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ArrowUpRight,
  Send,
  CheckCircle2,
  AlertCircle,
  FileText,
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
    buildingType: "Houses / Independent Houses",
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

  // Validate form inputs according to architectural enquiry rules
  const validate = (): boolean => {
    const newErrors: FormErrorsState = {};

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please provide your full legal or representative name.";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must contain at least 2 characters.";
    }

    // Phone number validation (international or local 10+ digit check)
    const phoneClean = formData.phone.replace(/[\s\-\(\)\.]/g, "");
    const phoneRegex = /^[+]?[0-9]{10,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "A valid telephone or WhatsApp number is required for consultation.";
    } else if (!phoneRegex.test(phoneClean)) {
      newErrors.phone = "Please enter a valid phone number (at least 10 digits).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Realistic frontend consultation handling
    setTimeout(() => {
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      setSubmittedData({
        data: { ...formData },
        refCode: `LD-ENQ-${new Date().getFullYear()}-${randomCode}`,
        timestamp: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
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
      buildingType: "Houses / Independent Houses",
      location: "",
      visionNotes: "",
    });
    setErrors({});
  };

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    siteAssets.contact.whatsappDefaultMessage
  )}`;

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 bg-[#343B33] text-[#F3F0E8] relative overflow-hidden transition-colors duration-500"
    >
      {/* Architectural ambient gradient bridge */}
      <div className="absolute inset-0 bg-radial-at-t from-[#526653]/40 via-[#343B33] to-[#202622] pointer-events-none" />

      {/* Subtle architectural hairline framing accents */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B49A68]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#343B33] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <MotionReveal className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 bg-[#B49A68]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#B49A68] font-semibold">
              {siteContent.contact.tag}
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-normal text-[#F3F0E8] tracking-tight leading-[1.12]">
            {siteContent.contact.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#D9D2C4]/85 font-light leading-relaxed">
            {siteContent.contact.subtitle}
          </p>
        </MotionReveal>

        {/* Two-Column Layout: Direct Architectural Desk & Refined Consultation Intake */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Architectural Desk & WhatsApp Action */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <MotionReveal delay={0.1}>
              <div className="space-y-6">
                <div className="border-l-2 border-[#B49A68] pl-4">
                  <h3 className="font-display text-2xl sm:text-3xl text-[#F3F0E8]">
                    Principal Architectural Desk
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D9D2C4]/80 font-light mt-1">
                    Direct access to structural engineers, zoning consultants, and master planners.
                  </p>
                </div>

                <p className="text-sm text-[#D9D2C4]/85 font-light leading-relaxed">
                  We review site dimensions, municipal compliance, and architectural feasibility before any commercial commitment is initiated.
                </p>

                {/* Contact Information Details */}
                <div className="space-y-4 pt-4 border-t border-[#526653]/40">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#202622]/80 border border-[#B49A68]/40 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <Phone className="w-4 h-4 text-[#B49A68]" />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#B49A68] block font-medium">
                        Telephone / Mobile
                      </span>
                      <span className="text-sm text-[#F3F0E8] font-mono">
                        {siteAssets.contact.phonePlaceholder}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#202622]/80 border border-[#B49A68]/40 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <Mail className="w-4 h-4 text-[#B49A68]" />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#B49A68] block font-medium">
                        Email Address
                      </span>
                      <span className="text-sm text-[#F3F0E8] font-mono">
                        {siteAssets.contact.emailPlaceholder}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#202622]/80 border border-[#B49A68]/40 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <MapPin className="w-4 h-4 text-[#B49A68]" />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#B49A68] block font-medium">
                        Corporate Office Address
                      </span>
                      <span className="text-xs sm:text-sm text-[#D9D2C4] leading-relaxed">
                        {siteAssets.contact.addressPlaceholder}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#202622]/80 border border-[#B49A68]/40 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <Clock className="w-4 h-4 text-[#B49A68]" />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#B49A68] block font-medium">
                        Consultation Hours
                      </span>
                      <span className="text-xs text-[#D9D2C4]">
                        {siteAssets.contact.businessHoursPlaceholder}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp CTA Button */}
              <div className="pt-6">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full inline-flex items-center justify-center gap-3 bg-[#202622] hover:bg-[#252C27] active:scale-[0.98] text-[#F3F0E8] py-4 px-6 border border-[#B49A68]/70 hover:border-[#B49A68] text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A68]"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] group-hover:scale-110 transition-transform" />
                  <span>Contact via WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#B49A68]" />
                </a>
                <p className="text-[11px] text-[#D9D2C4]/70 mt-2 text-center font-mono">
                  Manual WhatsApp consultation with our principal project desk
                </p>
              </div>
            </MotionReveal>
          </div>

          {/* Right Column: Premium Warm Ivory Consultation Form Card */}
          <div className="lg:col-span-7 bg-[#F3F0E8] text-[#202622] p-8 sm:p-12 shadow-2xl border border-[#D9D2C4] relative">
            {/* Fine Champagne Corner Accent */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#B49A68] pointer-events-none" />

            <MotionReveal delay={0.15}>
              <div className="pb-6 border-b border-[#D9D2C4] mb-8">
                <div className="flex items-center gap-2 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#526653]" />
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#526653] font-semibold">
                    Architectural Consultation Intake
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl text-[#202622]">
                  Initiate Construction Enquiry
                </h3>
                <p className="text-xs sm:text-sm text-[#202622]/75 font-light mt-1.5 leading-relaxed">
                  Provide your plot parameters or development vision. Our architectural team reviews each enquiry for structural feasibility and zoning parameters.
                </p>
              </div>

              {submittedData ? (
                /* Elegant Architectural Consultation Confirmation Card */
                <div className="p-8 sm:p-10 bg-[#FFFFFF] border border-[#526653]/30 shadow-md text-left space-y-6">
                  <div className="flex items-start justify-between gap-4 border-b border-[#D9D2C4] pb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#526653]/15 text-[#526653] flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-6 h-6 text-[#526653]" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#526653] font-semibold block">
                          Consultation Registered
                        </span>
                        <h4 className="font-display text-2xl text-[#202622]">
                          Enquiry Summary
                        </h4>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase tracking-wider text-[#202622]/60 block font-mono">
                        Reference Number
                      </span>
                      <span className="text-xs sm:text-sm font-mono font-semibold text-[#526653] bg-[#D9D2C4]/40 px-2.5 py-1 border border-[#D9D2C4]">
                        {submittedData.refCode}
                      </span>
                    </div>
                  </div>

                  {/* Summary Parameter Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3 bg-[#F3F0E8] border border-[#D9D2C4]">
                      <span className="text-[10px] uppercase tracking-wider text-[#202622]/60 block mb-0.5">
                        Client Representative
                      </span>
                      <span className="font-semibold text-[#202622]">
                        {submittedData.data.fullName}
                      </span>
                    </div>

                    <div className="p-3 bg-[#F3F0E8] border border-[#D9D2C4]">
                      <span className="text-[10px] uppercase tracking-wider text-[#202622]/60 block mb-0.5">
                        Contact Number
                      </span>
                      <span className="font-mono font-semibold text-[#202622]">
                        {submittedData.data.phone}
                      </span>
                    </div>

                    <div className="p-3 bg-[#F3F0E8] border border-[#D9D2C4]">
                      <span className="text-[10px] uppercase tracking-wider text-[#202622]/60 block mb-0.5">
                        Selected Typology
                      </span>
                      <span className="font-semibold text-[#526653]">
                        {submittedData.data.buildingType}
                      </span>
                    </div>

                    <div className="p-3 bg-[#F3F0E8] border border-[#D9D2C4]">
                      <span className="text-[10px] uppercase tracking-wider text-[#202622]/60 block mb-0.5">
                        Location / Plot Area
                      </span>
                      <span className="text-[#202622]">
                        {submittedData.data.location || "Location to be detailed in consultation"}
                      </span>
                    </div>
                  </div>

                  {submittedData.data.visionNotes && (
                    <div className="p-3.5 bg-[#F3F0E8] border border-[#D9D2C4] text-xs">
                      <span className="text-[10px] uppercase tracking-wider text-[#202622]/60 block mb-1">
                        Preliminary Scope / Plot Notes
                      </span>
                      <p className="text-[#202622]/85 italic font-light leading-relaxed">
                        &ldquo;{submittedData.data.visionNotes}&rdquo;
                      </p>
                    </div>
                  )}

                  <div className="p-4 bg-[#526653]/10 border-l-2 border-[#526653] text-xs text-[#202622]/80 leading-relaxed space-y-1">
                    <p className="font-medium text-[#526653]">
                      Next Step in Customer Journey:
                    </p>
                    <p>
                      Your consultation parameters have been logged on the architectural desk. Our principal team will review local zoning bylaws and plot feasibility, then contact you directly via phone or WhatsApp.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-[11px] text-[#202622]/60 font-mono">
                      Timestamp: {submittedData.timestamp}
                    </span>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 px-6 py-2.5 text-xs uppercase tracking-wider text-[#526653] border border-[#526653]/50 hover:bg-[#526653] hover:text-[#F3F0E8] active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#526653]"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Submit Another Consultation</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Interactive Consultation Form with Frontend Validation */
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Row 1: Full Name & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.14em] text-[#202622] font-semibold mb-2">
                        Full Name <span className="text-[#526653]">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                        }}
                        placeholder="e.g. Alexander Reed"
                        className={`w-full bg-[#FFFFFF] border px-4 py-3 text-sm text-[#202622] transition-colors focus:outline-none ${
                          errors.fullName
                            ? "border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-500"
                            : "border-[#D9D2C4] focus:border-[#B49A68] focus:ring-1 focus:ring-[#B49A68]"
                        }`}
                        aria-invalid={!!errors.fullName}
                        aria-describedby={errors.fullName ? "name-error" : undefined}
                      />
                      {errors.fullName && (
                        <p id="name-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-[0.14em] text-[#202622] font-semibold mb-2">
                        Phone Number <span className="text-[#526653]">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: undefined });
                        }}
                        placeholder="+91 98765 43210"
                        className={`w-full bg-[#FFFFFF] border px-4 py-3 text-sm text-[#202622] font-mono transition-colors focus:outline-none ${
                          errors.phone
                            ? "border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-500"
                            : "border-[#D9D2C4] focus:border-[#B49A68] focus:ring-1 focus:ring-[#B49A68]"
                        }`}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                      />
                      {errors.phone && (
                        <p id="phone-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Building Typology & Site / City Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.14em] text-[#202622] font-semibold mb-2">
                        Building Typology
                      </label>
                      <select
                        name="buildingType"
                        value={formData.buildingType}
                        onChange={(e) =>
                          setFormData({ ...formData, buildingType: e.target.value })
                        }
                        className="w-full bg-[#FFFFFF] border border-[#D9D2C4] px-4 py-3 text-sm text-[#202622] focus:outline-none focus:border-[#B49A68] focus:ring-1 focus:ring-[#B49A68] transition-colors"
                      >
                        <option value="Houses / Independent Houses">Houses / Independent Houses</option>
                        <option value="Duplexes">Duplexes</option>
                        <option value="Villas">Villas</option>
                        <option value="Commercial Buildings">Commercial Buildings</option>
                        <option value="Land Investing">Land Investing</option>
                        <option value="Custom Construction Requirements">Custom Construction Requirements</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-[0.14em] text-[#202622] font-semibold mb-2">
                        Site / City Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        placeholder="e.g. North Enclave, City"
                        className="w-full bg-[#FFFFFF] border border-[#D9D2C4] px-4 py-3 text-sm text-[#202622] focus:outline-none focus:border-[#B49A68] focus:ring-1 focus:ring-[#B49A68] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 3: Project Vision / Plot Details */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs uppercase tracking-[0.14em] text-[#202622] font-semibold">
                        Project Vision / Plot Details
                      </label>
                      <span className="text-[11px] text-[#202622]/50 font-mono">
                        Optional parameter guidance
                      </span>
                    </div>
                    <textarea
                      name="visionNotes"
                      rows={3}
                      value={formData.visionNotes}
                      onChange={(e) =>
                        setFormData({ ...formData, visionNotes: e.target.value })
                      }
                      placeholder="Outline land dimensions (e.g. 2,400 sq.ft), preferred architectural style, floors, or expected project timeline..."
                      className="w-full bg-[#FFFFFF] border border-[#D9D2C4] px-4 py-3 text-sm text-[#202622] focus:outline-none focus:border-[#B49A68] focus:ring-1 focus:ring-[#B49A68] transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  {/* Submission Row */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-[#D9D2C4]/70 pt-5">
                    <div className="text-[11px] text-[#202622]/65 font-mono leading-relaxed">
                      Consultation details handled with strict architectural confidentiality.
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2.5 bg-[#526653] hover:bg-[#343B33] active:scale-[0.98] disabled:opacity-75 disabled:cursor-wait text-[#F3F0E8] px-8 py-3.5 text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A68]"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-[#F3F0E8]/40 border-t-[#F3F0E8] rounded-full animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Request</span>
                          <Send className="w-3.5 h-3.5 text-[#B49A68]" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </MotionReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
