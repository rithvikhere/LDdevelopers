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
} from "lucide-react";

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    buildingType: "Houses / Independent Houses",
    city: "",
    notes: "",
  });

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    siteAssets.contact.whatsappDefaultMessage
  )}`;

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 bg-[#526653] text-[#F3F0E8] relative overflow-hidden"
    >
      {/* Background ambient shading */}
      <div className="absolute inset-0 bg-radial-at-t from-[#526653] via-[#343B33] to-[#202622] opacity-90" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <MotionReveal className="max-w-3xl mb-16 sm:mb-20">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B49A68] font-semibold block mb-3">
            {siteContent.contact.tag}
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-normal text-[#F3F0E8] tracking-tight leading-[1.12]">
            {siteContent.contact.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#D9D2C4]/90 font-light leading-relaxed">
            {siteContent.contact.subtitle}
          </p>
        </MotionReveal>

        {/* Two-Column Grid: Contact Information & Interactive Intake Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Channels & WhatsApp Action */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <MotionReveal delay={0.1}>
              <div className="space-y-6">
                <h3 className="font-display text-2xl sm:text-3xl text-[#F3F0E8]">
                  Direct Architectural Desk
                </h3>
                <p className="text-sm text-[#D9D2C4]/85 font-light leading-relaxed">
                  Connect directly with our master builders and architectural advisory team. We review site dimensions, municipal compliance, and design feasibility.
                </p>

                {/* Contact Information Details */}
                <div className="space-y-5 pt-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#202622]/60 border border-[#B49A68]/40 flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="w-4 h-4 text-[#B49A68]" />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#B49A68] block">
                        Telephone / Mobile
                      </span>
                      <span className="text-sm text-[#F3F0E8] font-medium font-mono">
                        {siteAssets.contact.phonePlaceholder}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#202622]/60 border border-[#B49A68]/40 flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-4 h-4 text-[#B49A68]" />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#B49A68] block">
                        Email Address
                      </span>
                      <span className="text-sm text-[#F3F0E8] font-mono">
                        {siteAssets.contact.emailPlaceholder}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#202622]/60 border border-[#B49A68]/40 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 text-[#B49A68]" />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#B49A68] block">
                        Corporate Office Address
                      </span>
                      <span className="text-xs sm:text-sm text-[#D9D2C4] leading-relaxed">
                        {siteAssets.contact.addressPlaceholder}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#202622]/60 border border-[#B49A68]/40 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-4 h-4 text-[#B49A68]" />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#B49A68] block">
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
              <div className="pt-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full inline-flex items-center justify-center gap-3 bg-[#202622] hover:bg-[#343B33] active:scale-[0.98] text-[#F3F0E8] py-4 px-6 border border-[#B49A68] text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A68]"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] group-hover:scale-110 transition-transform" />
                  <span>Contact via WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#B49A68]" />
                </a>
                <p className="text-[11px] text-[#D9D2C4]/70 mt-2 text-center font-mono">
                  Manual WhatsApp consultation with our project desk
                </p>
              </div>
            </MotionReveal>
          </div>

          {/* Right Column: Warm Ivory Enquiry Form Card */}
          <div className="lg:col-span-7 bg-[#F3F0E8] text-[#202622] p-8 sm:p-12 shadow-2xl border border-[#D9D2C4]">
            <MotionReveal delay={0.15}>
              <div className="pb-6 border-b border-[#D9D2C4] mb-8">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#526653] font-semibold block mb-1">
                  Project Consultation
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-[#202622]">
                  Initiate Construction Enquiry
                </h3>
                <p className="text-xs sm:text-sm text-[#202622]/70 font-light mt-1">
                  Share your requirements. Our architectural desk reviews all enquiries for structural and plot feasibility.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 bg-[#526653]/10 border border-[#526653] text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-[#526653] mx-auto" />
                  <h4 className="font-display text-2xl text-[#202622]">
                    Enquiry Request Initiated
                  </h4>
                  <p className="text-xs sm:text-sm text-[#202622]/80 font-light max-w-md mx-auto">
                    Thank you, <span className="font-semibold">{formData.name}</span>. Our architectural team has received your preliminary request for{" "}
                    <span className="font-semibold">{formData.buildingType}</span>. We will reach you shortly at{" "}
                    <span className="font-mono">{formData.phone}</span>.
                  </p>
                  <div className="pt-4 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 text-xs uppercase tracking-wider text-[#526653] border border-[#526653]/40 hover:bg-[#526653] hover:text-[#F3F0E8] active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#526653]"
                    >
                      Submit Another Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleQuickSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.14em] text-[#202622] font-semibold mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alexander Reed"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full bg-[#FFFFFF] border border-[#D9D2C4] px-4 py-3 text-sm text-[#202622] focus:outline-none focus:border-[#526653] focus:ring-1 focus:ring-[#526653] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-[0.14em] text-[#202622] font-semibold mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full bg-[#FFFFFF] border border-[#D9D2C4] px-4 py-3 text-sm text-[#202622] focus:outline-none focus:border-[#526653] focus:ring-1 focus:ring-[#526653] transition-colors font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.14em] text-[#202622] font-semibold mb-2">
                        Building Typology
                      </label>
                      <select
                        value={formData.buildingType}
                        onChange={(e) =>
                          setFormData({ ...formData, buildingType: e.target.value })
                        }
                        className="w-full bg-[#FFFFFF] border border-[#D9D2C4] px-4 py-3 text-sm text-[#202622] focus:outline-none focus:border-[#526653] focus:ring-1 focus:ring-[#526653] transition-colors"
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
                        placeholder="e.g. North Enclave, City"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        className="w-full bg-[#FFFFFF] border border-[#D9D2C4] px-4 py-3 text-sm text-[#202622] focus:outline-none focus:border-[#526653] focus:ring-1 focus:ring-[#526653] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-[0.14em] text-[#202622] font-semibold mb-2">
                      Project Vision / Plot Details
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe your land size (e.g. 2,400 sq.ft), preferred architectural style, or expected timeline..."
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      className="w-full bg-[#FFFFFF] border border-[#D9D2C4] px-4 py-3 text-sm text-[#202622] focus:outline-none focus:border-[#526653] focus:ring-1 focus:ring-[#526653] transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <div className="text-[11px] text-[#202622]/60 font-mono">
                      All enquiries handled confidentially by our architectural desk.
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 bg-[#526653] hover:bg-[#343B33] active:scale-[0.98] text-[#F3F0E8] px-8 py-3.5 text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#526653]"
                    >
                      <span>Submit Request</span>
                      <Send className="w-3.5 h-3.5 text-[#B49A68]" />
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
