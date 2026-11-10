"use client";

import React, { useState, useTransition } from "react";
import { Enquiry, EnquiryStatus } from "@/lib/types/database";
import { createEnquiryAction } from "@/app/actions/enquiries";
import {
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  FileText,
  MapPin,
  Plus,
  Send,
  Sparkles,
  Layers,
  ChevronRight,
  ArrowRight,
  Check,
} from "lucide-react";

interface CustomerDashboardClientProps {
  user: {
    id: string;
    email: string;
    fullName: string;
    phone?: string;
  };
  initialEnquiries: Enquiry[];
}

export const CustomerDashboardClient: React.FC<CustomerDashboardClientProps> = ({
  user,
  initialEnquiries,
}) => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const [successCode, setSuccessCode] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: user.fullName || "",
    email: user.email || "",
    phone: user.phone || "+91 98450 12345",
    alternatePhone: "",
    ownsLand: true,
    landSize: 3200,
    landUnit: "sq.ft",
    siteLocation: "Jubilee Hills",
    city: "Hyderabad",
    buildingType: "Luxury Contemporary Villa",
    numberOfFloors: 3,
    builtUpArea: 4800,
    bedrooms: 4,
    bathrooms: 5,
    parkingRequirements: "2 Covered Bays",
    constructionStyle: "Minimalist Architectural Concrete & Glass",
    specialRequirements: "Double-height atrium, rooftop garden, home automation",
    estimatedBudget: "₹2.5 Cr – ₹4.0 Cr",
    expectedStartDate: "Within 3 Months",
    expectedCompletion: "12-14 Months",
    additionalNotes: "",
    preferredContactMethod: "whatsapp" as const,
    preferredContactTime: "Afternoon (2 PM – 5 PM)",
  });

  const handleNextStep = () => {
    setFormError(null);
    if (wizardStep === 1) {
      if (!formData.siteLocation || !formData.city) {
        setFormError("Please provide plot site location and city.");
        return;
      }
    }
    if (wizardStep < 4) {
      setWizardStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (wizardStep > 1) {
      setWizardStep((prev) => prev - 1);
    }
  };

  const handleFinalSubmit = () => {
    setFormError(null);
    startTransition(async () => {
      const res = await createEnquiryAction(formData);
      if (res.success && res.enquiryNumber) {
        setSuccessCode(res.enquiryNumber);
        // Optimistically add to UI list
        const newEnq: Enquiry = {
          id: `enq-${Date.now()}`,
          enquiry_number: res.enquiryNumber,
          user_id: user.id,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          owns_land: formData.ownsLand,
          land_size: formData.landSize,
          land_unit: formData.landUnit,
          site_location: formData.siteLocation,
          city: formData.city,
          building_type: formData.buildingType,
          number_of_floors: formData.numberOfFloors,
          built_up_area: formData.builtUpArea,
          bedrooms: formData.bedrooms,
          bathrooms: formData.bathrooms,
          estimated_budget: formData.estimatedBudget,
          status: "new",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setEnquiries((prev) => [newEnq, ...prev]);
        setShowWizard(false);
        setWizardStep(1);
      } else {
        setFormError(res.error || "Failed to submit enquiry. Please review the inputs.");
      }
    });
  };

  const getStatusColor = (status: EnquiryStatus) => {
    switch (status) {
      case "new":
        return "text-[#C5B083] border-[#C5B083]/40 bg-[#C5B083]/10";
      case "contacted":
        return "text-teal-400 border-teal-500/40 bg-teal-950/20";
      case "in_progress":
        return "text-emerald-400 border-emerald-500/40 bg-emerald-950/20";
      case "completed":
        return "text-blue-400 border-blue-500/40 bg-blue-950/20";
      case "closed":
        return "text-[#9EA8A1] border-[#24322A] bg-[#17201B]";
    }
  };

  const getStepProgress = (status: EnquiryStatus) => {
    switch (status) {
      case "new":
        return 1;
      case "contacted":
        return 2;
      case "in_progress":
        return 3;
      case "completed":
        return 5;
      case "closed":
        return 4;
      default:
        return 1;
    }
  };

  const milestoneSteps = [
    "Brief Logged",
    "Zoning Review",
    "Architectural Concept",
    "Structural EPC Plan",
    "Master Build",
  ];

  return (
    <div className="space-y-12">
      {/* Client Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 border border-[#24322A] bg-[#121815]/70 backdrop-blur-md">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C5B083] mb-1">
            CLIENT PORTAL OVERVIEW
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-light text-[#F5F3EF]">
            Welcome, {user.fullName}
          </h1>
          <p className="text-xs text-[#9EA8A1] font-mono mt-1">
            {user.email} &bull; Registered Architectural Client
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setShowWizard(true);
            setSuccessCode(null);
          }}
          className="inline-flex items-center gap-2 bg-[#2E5A44] hover:bg-[#17201B] border border-[#24322A] hover:border-[#C5B083] text-[#F5F3EF] px-6 py-3.5 text-xs font-mono uppercase tracking-[0.2em] font-medium transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[#2E5A44]/20 shrink-0"
        >
          <Plus className="w-4 h-4 text-[#C5B083]" />
          <span>Commission New Project</span>
        </button>
      </div>

      {/* Success Notification */}
      {successCode && (
        <div className="p-4 bg-emerald-950/30 border border-emerald-600/50 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-3 text-emerald-300">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Project commission registered successfully under reference code:</span>
            <strong className="text-[#C5B083]">{successCode}</strong>
          </div>
          <button
            type="button"
            onClick={() => setSuccessCode(null)}
            className="text-[#9EA8A1] hover:text-[#F5F3EF]"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Multi-Step Commission Wizard Modal */}
      {showWizard && (
        <div className="p-8 border border-[#24322A]/20 bg-[#F5F2EB]/95 backdrop-blur-md shadow-2xl relative text-[#0B0F0D]">
          <div className="flex items-center justify-between border-b border-[#24322A]/15 pb-6 mb-8">
            <div>
              <span className="text-[10px] font-mono text-[#1F4A36] font-semibold uppercase tracking-widest block mb-1">
                STEP 0{wizardStep} OF 04
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-light text-[#0B0F0D]">
                {wizardStep === 1 && "Land & Site Specifications"}
                {wizardStep === 2 && "Architectural Typology & Spatial Volume"}
                {wizardStep === 3 && "Investment Budget & Schedule"}
                {wizardStep === 4 && "Review & Submit Architectural Commission"}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setShowWizard(false)}
              className="text-xs font-mono text-[#5A6B62] hover:text-[#0B0F0D] cursor-pointer"
            >
              Cancel
            </button>
          </div>

          {formError && (
            <div className="mb-6 p-3 bg-red-50 border border-red-300 text-red-700 text-xs font-mono">
              {formError}
            </div>
          )}

          {/* Wizard Step 1: Land & Plot */}
          {wizardStep === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-mono">
              <div>
                <label className="block text-[#141E18] font-semibold uppercase mb-1.5">Do you currently hold land? *</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, ownsLand: true })}
                    className={`py-2.5 px-4 border text-center transition-colors cursor-pointer font-medium ${
                      formData.ownsLand ? "bg-[#0B0F0D] border-[#0B0F0D] text-[#F5F3EF]" : "bg-[#FAF8F5] border-[#24322A]/20 text-[#141E18]"
                    }`}
                  >
                    Yes, Owned Land
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, ownsLand: false })}
                    className={`py-2.5 px-4 border text-center transition-colors cursor-pointer font-medium ${
                      !formData.ownsLand ? "bg-[#0B0F0D] border-[#0B0F0D] text-[#F5F3EF]" : "bg-[#FAF8F5] border-[#24322A]/20 text-[#141E18]"
                    }`}
                  >
                    Seeking Plot Acquisition
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[#141E18] font-semibold uppercase mb-1.5">Plot Size / Dimensions</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={formData.landSize}
                    onChange={(e) => setFormData({ ...formData, landSize: Number(e.target.value) })}
                    className="flex-1 bg-[#FAF8F5] border border-[#24322A]/25 text-[#0B0F0D] font-medium px-3.5 py-2.5 outline-none focus:border-[#2E5A44] shadow-xs"
                    placeholder="3200"
                  />
                  <select
                    value={formData.landUnit}
                    onChange={(e) => setFormData({ ...formData, landUnit: e.target.value })}
                    className="bg-[#FAF8F5] border border-[#24322A]/25 text-[#0B0F0D] font-medium px-3 py-2.5 outline-none focus:border-[#2E5A44] shadow-xs"
                  >
                    <option value="sq.ft">Sq.Ft</option>
                    <option value="cents">Cents</option>
                    <option value="sq.yards">Sq.Yards</option>
                    <option value="acres">Acres</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#141E18] font-semibold uppercase mb-1.5">Site Location / Neighborhood *</label>
                <input
                  type="text"
                  value={formData.siteLocation}
                  onChange={(e) => setFormData({ ...formData, siteLocation: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#24322A]/25 text-[#0B0F0D] font-medium px-3.5 py-2.5 outline-none focus:border-[#2E5A44] placeholder:text-[#68776F] shadow-xs"
                  placeholder="e.g., Jubilee Hills, Road 36"
                />
              </div>

              <div>
                <label className="block text-[#141E18] font-semibold uppercase mb-1.5">City *</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#24322A]/25 text-[#0B0F0D] font-medium px-3.5 py-2.5 outline-none focus:border-[#2E5A44] placeholder:text-[#68776F] shadow-xs"
                  placeholder="e.g., Hyderabad / Bengaluru"
                />
              </div>
            </div>
          )}

          {/* Wizard Step 2: Architecture & Typology */}
          {wizardStep === 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-mono">
              <div>
                <label className="block text-[#141E18] font-semibold uppercase mb-1.5">Building Typology *</label>
                <select
                  value={formData.buildingType}
                  onChange={(e) => setFormData({ ...formData, buildingType: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#24322A]/25 text-[#0B0F0D] font-medium px-3.5 py-2.5 outline-none focus:border-[#2E5A44] shadow-xs"
                >
                  <option value="Bespoke Residential Architecture">Bespoke Independent Residence</option>
                  <option value="Duplexes & Multi-Level Living">Duplex Residence</option>
                  <option value="Luxury Villas & Private Estates">Luxury Villa Estate</option>
                  <option value="Commercial Buildings & Landmarks">Commercial Building</option>
                </select>
              </div>

              <div>
                <label className="block text-[#141E18] font-semibold uppercase mb-1.5">Target Built-up Area (Sq.Ft)</label>
                <input
                  type="number"
                  value={formData.builtUpArea}
                  onChange={(e) => setFormData({ ...formData, builtUpArea: Number(e.target.value) })}
                  className="w-full bg-[#FAF8F5] border border-[#24322A]/25 text-[#0B0F0D] font-medium px-3.5 py-2.5 outline-none focus:border-[#2E5A44] placeholder:text-[#68776F] shadow-xs"
                  placeholder="4800"
                />
              </div>

              <div>
                <label className="block text-[#141E18] font-semibold uppercase mb-1.5">Number of Floors</label>
                <input
                  type="number"
                  value={formData.numberOfFloors}
                  onChange={(e) => setFormData({ ...formData, numberOfFloors: Number(e.target.value) })}
                  className="w-full bg-[#FAF8F5] border border-[#24322A]/25 text-[#0B0F0D] font-medium px-3.5 py-2.5 outline-none focus:border-[#2E5A44] placeholder:text-[#68776F] shadow-xs"
                  placeholder="3"
                />
              </div>

              <div>
                <label className="block text-[#141E18] font-semibold uppercase mb-1.5">Bedrooms &amp; Suites</label>
                <input
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                  className="w-full bg-[#FAF8F5] border border-[#24322A]/25 text-[#0B0F0D] font-medium px-3.5 py-2.5 outline-none focus:border-[#2E5A44] placeholder:text-[#68776F] shadow-xs"
                  placeholder="4"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[#141E18] font-semibold uppercase mb-1.5">Architectural Style Preference</label>
                <input
                  type="text"
                  value={formData.constructionStyle}
                  onChange={(e) => setFormData({ ...formData, constructionStyle: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#24322A]/25 text-[#0B0F0D] font-medium px-3.5 py-2.5 outline-none focus:border-[#2E5A44] placeholder:text-[#68776F] shadow-xs"
                  placeholder="e.g., Minimalist Concrete & Teak, Biophilic Courtyard, Brutalist"
                />
              </div>
            </div>
          )}

          {/* Wizard Step 3: Budget & Timeline */}
          {wizardStep === 3 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-mono">
              <div>
                <label className="block text-[#141E18] font-semibold uppercase mb-1.5">Estimated Budget Investment *</label>
                <select
                  value={formData.estimatedBudget}
                  onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#24322A]/25 text-[#0B0F0D] font-medium px-3.5 py-2.5 outline-none focus:border-[#2E5A44] shadow-xs"
                >
                  <option value="₹1.5 Cr – ₹2.5 Cr">₹1.5 Cr – ₹2.5 Cr</option>
                  <option value="₹2.5 Cr – ₹4.0 Cr">₹2.5 Cr – ₹4.0 Cr</option>
                  <option value="₹4.0 Cr – ₹7.0 Cr">₹4.0 Cr – ₹7.0 Cr</option>
                  <option value="₹7.0 Cr – ₹15.0+ Cr">₹7.0 Cr – ₹15.0+ Cr</option>
                </select>
              </div>

              <div>
                <label className="block text-[#141E18] font-semibold uppercase mb-1.5">Anticipated Construction Start</label>
                <select
                  value={formData.expectedStartDate}
                  onChange={(e) => setFormData({ ...formData, expectedStartDate: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#24322A]/25 text-[#0B0F0D] font-medium px-3.5 py-2.5 outline-none focus:border-[#2E5A44] shadow-xs"
                >
                  <option value="Immediate (1 Month)">Immediate (1 Month)</option>
                  <option value="Within 3 Months">Within 3 Months</option>
                  <option value="Within 6 Months">Within 6 Months</option>
                  <option value="Planning for Next Year">Planning for Next Year</option>
                </select>
              </div>

              <div>
                <label className="block text-[#141E18] font-semibold uppercase mb-1.5">Preferred Consultation Method</label>
                <select
                  value={formData.preferredContactMethod}
                  onChange={(e) => setFormData({ ...formData, preferredContactMethod: e.target.value as any })}
                  className="w-full bg-[#FAF8F5] border border-[#24322A]/25 text-[#0B0F0D] font-medium px-3.5 py-2.5 outline-none focus:border-[#2E5A44] shadow-xs"
                >
                  <option value="whatsapp">WhatsApp Direct</option>
                  <option value="phone">Phone Call</option>
                  <option value="in_person">In-Studio Consultation</option>
                  <option value="email">Formal Architectural Email</option>
                </select>
              </div>

              <div>
                <label className="block text-[#141E18] font-semibold uppercase mb-1.5">Preferred Time Window</label>
                <input
                  type="text"
                  value={formData.preferredContactTime}
                  onChange={(e) => setFormData({ ...formData, preferredContactTime: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#24322A]/25 text-[#0B0F0D] font-medium px-3.5 py-2.5 outline-none focus:border-[#2E5A44] placeholder:text-[#68776F] shadow-xs"
                  placeholder="e.g., Weekdays 2 PM - 5 PM"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[#141E18] font-semibold uppercase mb-1.5">Special Architectural Requirements</label>
                <textarea
                  rows={2}
                  value={formData.specialRequirements}
                  onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#24322A]/25 text-[#0B0F0D] font-medium px-3.5 py-2.5 outline-none focus:border-[#2E5A44] placeholder:text-[#68776F] shadow-xs resize-none"
                  placeholder="e.g., Home cinema, solar microgrid, elevator shaft, double-height atrium"
                />
              </div>
            </div>
          )}

          {/* Wizard Step 4: Summary Review */}
          {wizardStep === 4 && (
            <div className="space-y-4 text-xs font-mono">
              <div className="p-4 bg-[#ECE8DE] border border-[#24322A]/15 shadow-xs grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <span className="text-[#3B4B42] font-semibold block text-[10px] uppercase">TYPOLOGY</span>
                  <span className="text-[#1F4A36] font-semibold">{formData.buildingType}</span>
                </div>
                <div>
                  <span className="text-[#3B4B42] font-semibold block text-[10px] uppercase">LOCATION</span>
                  <span className="text-[#0B0F0D] font-semibold">{formData.siteLocation}, {formData.city}</span>
                </div>
                <div>
                  <span className="text-[#3B4B42] font-semibold block text-[10px] uppercase">BUILT-UP AREA</span>
                  <span className="text-[#0B0F0D] font-semibold">{formData.builtUpArea} sq.ft</span>
                </div>
                <div>
                  <span className="text-[#3B4B42] font-semibold block text-[10px] uppercase">BUDGET RANGE</span>
                  <span className="text-[#1F4A36] font-semibold">{formData.estimatedBudget}</span>
                </div>
              </div>

              <div className="p-4 bg-[#ECE8DE] border border-[#24322A]/15 shadow-xs">
                <span className="text-[#3B4B42] font-semibold block text-[10px] uppercase mb-1">ARCHITECTURAL NOTES</span>
                <p className="text-[#1A231F] font-serif italic">
                  {formData.specialRequirements || "No special requirements indicated."}
                </p>
              </div>

              <p className="text-[#1A231F] text-[11px] pt-2">
                Upon transmission, a senior architectural project lead will conduct a zoning and volumetric feasibility study and contact you via {formData.preferredContactMethod}.
              </p>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 pt-6 border-t border-[#24322A]/15 flex items-center justify-between text-xs font-mono">
            {wizardStep > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="py-2.5 px-5 border border-[#24322A]/20 text-[#141E18] hover:text-[#0B0F0D] font-semibold transition-colors cursor-pointer bg-[#ECE8DE]"
              >
                &larr; Previous Step
              </button>
            ) : <div />}

            {wizardStep < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="inline-flex items-center gap-2 py-2.5 px-6 bg-[#0B0F0D] hover:bg-[#2E5A44] border border-[#24322A] text-[#F5F3EF] uppercase tracking-wider font-semibold cursor-pointer shadow-md"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4 text-[#C5B083]" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isPending}
                onClick={handleFinalSubmit}
                className="inline-flex items-center gap-2 py-3 px-8 bg-[#2E5A44] hover:bg-[#0B0F0D] text-[#F5F3EF] uppercase tracking-widest font-semibold cursor-pointer transition-colors shadow-lg"
              >
                <Send className="w-4 h-4 text-[#C5B083]" />
                <span>{isPending ? "REGISTERING..." : "CONFIRM & TRANSMIT COMMISSION"}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Active Enquiries Ledger */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#24322A] pb-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#2E5A44]" />
            <h2 className="font-display text-2xl font-light text-[#F5F3EF]">
              Active Architectural Commissions
            </h2>
          </div>
          <span className="text-xs font-mono text-[#9EA8A1]">
            {enquiries.length} {enquiries.length === 1 ? "Project" : "Projects"} in Portfolio
          </span>
        </div>

        {enquiries.length === 0 ? (
          <div className="p-12 border border-[#24322A] bg-[#121815]/40 text-center space-y-4">
            <Compass className="w-8 h-8 text-[#C5B083] mx-auto opacity-70" />
            <h3 className="font-display text-2xl text-[#F5F3EF] font-light">No Active Commissions Logged</h3>
            <p className="text-xs font-mono text-[#9EA8A1] max-w-md mx-auto">
              You haven&apos;t commissioned an architectural project yet. Click below to begin your consultation.
            </p>
            <button
              type="button"
              onClick={() => setShowWizard(true)}
              className="inline-flex items-center gap-2 py-2.5 px-6 bg-[#2E5A44] border border-[#24322A] hover:border-[#C5B083] text-[#F5F3EF] text-xs font-mono uppercase tracking-wider cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Initiate First Commission</span>
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {enquiries.map((enq) => {
              const currentStepIndex = getStepProgress(enq.status);

              return (
                <div
                  key={enq.id}
                  className="border border-[#24322A] bg-[#121815]/60 p-6 sm:p-8 hover:border-[#C5B083]/40 transition-colors duration-300 space-y-6"
                >
                  {/* Top Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#24322A]/60 pb-4">
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-mono font-semibold text-[#C5B083] bg-[#0B0F0D] px-3 py-1 border border-[#24322A]">
                        {enq.enquiry_number}
                      </span>
                      <div>
                        <h3 className="font-display text-xl sm:text-2xl text-[#F5F3EF]">
                          {enq.building_type}
                        </h3>
                        <span className="text-[11px] font-mono text-[#9EA8A1]">
                          Submitted on {new Date(enq.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      </div>
                    </div>

                    <span className={`inline-flex items-center px-3 py-1 border text-[10px] font-mono uppercase tracking-widest font-semibold ${getStatusColor(enq.status)}`}>
                      STATUS: {enq.status.replace("_", " ")}
                    </span>
                  </div>

                  {/* 5-Step Visual Milestone Tracker */}
                  <div className="pt-2">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[#9EA8A1] mb-3">
                      ARCHITECTURAL LIFECYCLE MILESTONES
                    </div>

                    <div className="grid grid-cols-5 gap-2">
                      {milestoneSteps.map((mStep, idx) => {
                        const isDone = idx + 1 < currentStepIndex;
                        const isCurrent = idx + 1 === currentStepIndex;

                        return (
                          <div key={idx} className="space-y-2">
                            <div
                              className={`h-1.5 transition-colors ${
                                isDone
                                  ? "bg-[#2E5A44]"
                                  : isCurrent
                                  ? "bg-[#C5B083]"
                                  : "bg-[#24322A]"
                              }`}
                            />
                            <span
                              className={`block text-[10px] font-mono leading-tight ${
                                isCurrent
                                  ? "text-[#C5B083] font-semibold"
                                  : isDone
                                  ? "text-[#E8E4DC]"
                                  : "text-[#9EA8A1]/40"
                              }`}
                            >
                              0{idx + 1}. {mStep}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Summary Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#24322A]/60 text-xs font-mono">
                    <div>
                      <span className="text-[#9EA8A1] text-[10px] block uppercase">LOCATION</span>
                      <span className="text-[#F5F3EF]">{enq.site_location || "N/A"}, {enq.city || ""}</span>
                    </div>
                    <div>
                      <span className="text-[#9EA8A1] text-[10px] block uppercase">PLOT FOOTPRINT</span>
                      <span className="text-[#F5F3EF]">{enq.land_size ? `${enq.land_size} ${enq.land_unit || "sq.ft"}` : "Unspecified"}</span>
                    </div>
                    <div>
                      <span className="text-[#9EA8A1] text-[10px] block uppercase">BUILT-UP AREA</span>
                      <span className="text-[#F5F3EF]">{enq.built_up_area ? `${enq.built_up_area} sq.ft` : "To be drafted"}</span>
                    </div>
                    <div>
                      <span className="text-[#9EA8A1] text-[10px] block uppercase">BUDGET ALLOCATION</span>
                      <span className="text-[#C5B083] font-medium">{enq.estimated_budget || "In Consultation"}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

