"use client";

import React, { useState, useTransition } from "react";
import { Enquiry, EnquiryStatus } from "@/lib/types/database";
import { updateEnquiryStatusAction } from "@/app/actions/enquiries";
import {
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Filter,
  Layers,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  Shield,
  Sparkles,
  User,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
} from "lucide-react";

interface AdminDashboardClientProps {
  initialEnquiries: Enquiry[];
}

export const AdminDashboardClient: React.FC<AdminDashboardClientProps> = ({
  initialEnquiries,
}) => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Metrics
  const totalCount = enquiries.length;
  const newCount = enquiries.filter((e) => e.status === "new").length;
  const inProgressCount = enquiries.filter((e) => e.status === "in_progress").length;
  const completedCount = enquiries.filter((e) => e.status === "completed").length;

  const handleStatusChange = (enquiryId: string, newStatus: EnquiryStatus) => {
    startTransition(async () => {
      // Optimistic update
      setEnquiries((prev) =>
        prev.map((e) => (e.id === enquiryId ? { ...e, status: newStatus, updated_at: new Date().toISOString() } : e))
      );
      await updateEnquiryStatusAction(enquiryId, newStatus);
    });
  };

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch =
      e.full_name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.enquiry_number.toLowerCase().includes(search.toLowerCase()) ||
      (e.site_location && e.site_location.toLowerCase().includes(search.toLowerCase())) ||
      e.building_type.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "all" || e.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: EnquiryStatus) => {
    switch (status) {
      case "new":
        return "text-[#C5B083] border-[#C5B083]/50 bg-[#C5B083]/10";
      case "contacted":
        return "text-teal-400 border-teal-500/50 bg-teal-950/20";
      case "in_progress":
        return "text-emerald-400 border-emerald-500/50 bg-emerald-950/20";
      case "completed":
        return "text-blue-400 border-blue-500/50 bg-blue-950/20";
      case "closed":
        return "text-[#9EA8A1] border-[#24322A] bg-[#17201B]";
    }
  };

  return (
    <div className="space-y-10">
      {/* Executive Header & KPIs */}
      <div>
        <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C5B083] mb-2">
          ADMINISTRATIVE GOVERNANCE &amp; INQUIRY LEDGER
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-light text-[#F5F3EF]">
          Executive Lead Management Console
        </h1>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-6 bg-[#121815] border border-[#24322A]">
          <span className="text-[10px] font-mono uppercase text-[#9EA8A1] block mb-2">TOTAL COMMISSIONS</span>
          <div className="font-display text-4xl text-[#F5F3EF]">{totalCount}</div>
          <span className="text-[10px] font-mono text-[#C5B083] block mt-1">Recorded in registry</span>
        </div>

        <div className="p-6 bg-[#121815] border border-[#24322A]">
          <span className="text-[10px] font-mono uppercase text-[#9EA8A1] block mb-2">NEW / ACTIONABLE</span>
          <div className="font-display text-4xl text-[#C5B083]">{newCount}</div>
          <span className="text-[10px] font-mono text-emerald-400 block mt-1">Pending first outreach</span>
        </div>

        <div className="p-6 bg-[#121815] border border-[#24322A]">
          <span className="text-[10px] font-mono uppercase text-[#9EA8A1] block mb-2">ACTIVE IN DESIGN</span>
          <div className="font-display text-4xl text-emerald-400">{inProgressCount}</div>
          <span className="text-[10px] font-mono text-[#9EA8A1] block mt-1">Under drafting &amp; review</span>
        </div>

        <div className="p-6 bg-[#121815] border border-[#24322A]">
          <span className="text-[10px] font-mono uppercase text-[#9EA8A1] block mb-2">DELIVERED</span>
          <div className="font-display text-4xl text-blue-400">{completedCount}</div>
          <span className="text-[10px] font-mono text-[#9EA8A1] block mt-1">Completed commissions</span>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-[#121815] border border-[#24322A]">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#9EA8A1] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client, location, reference #, or typology..."
            className="w-full bg-[#17201B] border border-[#24322A] focus:border-[#C5B083] text-[#F5F3EF] text-xs font-mono pl-10 pr-3.5 py-2.5 outline-none transition-colors placeholder:text-[#9EA8A1]/50"
          />
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
          {["all", "new", "contacted", "in_progress", "completed", "closed"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`py-1.5 px-3 uppercase tracking-wider border cursor-pointer transition-colors ${
                statusFilter === st
                  ? "bg-[#C5B083] text-[#0B0F0D] border-[#C5B083] font-semibold"
                  : "bg-[#17201B] text-[#9EA8A1] border-[#24322A] hover:border-[#9EA8A1] hover:text-[#F5F3EF]"
              }`}
            >
              {st.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Full Architectural Enquiry Ledger Table */}
      <div className="border border-[#24322A] bg-[#121815] overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[#17201B] text-[#9EA8A1] uppercase tracking-wider border-b border-[#24322A] text-[10px]">
            <tr>
              <th className="py-4 px-6">REFERENCE #</th>
              <th className="py-4 px-6">CLIENT CONTACT</th>
              <th className="py-4 px-6">TYPOLOGY &amp; PARCEL</th>
              <th className="py-4 px-6">ESTIMATED BUDGET</th>
              <th className="py-4 px-6">STATUS WORKFLOW</th>
              <th className="py-4 px-6 text-right">ONE-CLICK ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#24322A]">
            {filteredEnquiries.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-[#9EA8A1]">
                  No enquiry records matched your search parameters.
                </td>
              </tr>
            ) : (
              filteredEnquiries.map((enq) => {
                const isExpanded = expandedId === enq.id;
                const rawPhone = enq.phone.replace(/[^0-9]/g, "");
                const waMessage = encodeURIComponent(
                  `Hello ${enq.full_name}, this is the Principal Architectural Desk at LD Developers regarding your enquiry ${enq.enquiry_number} for a ${enq.building_type}. We have reviewed your plot parameters and would like to schedule a formal consultation.`
                );
                const waUrl = `https://wa.me/${rawPhone}?text=${waMessage}`;

                return (
                  <React.Fragment key={enq.id}>
                    <tr className="hover:bg-[#17201B]/50 transition-colors">
                      {/* Reference # */}
                      <td className="py-4 px-6">
                        <span className="font-semibold text-[#C5B083] block">{enq.enquiry_number}</span>
                        <span className="text-[10px] text-[#9EA8A1]">
                          {new Date(enq.created_at).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </td>

                      {/* Client Contact */}
                      <td className="py-4 px-6">
                        <span className="font-semibold text-[#F5F3EF] block">{enq.full_name}</span>
                        <span className="text-[#9EA8A1] block text-[11px]">{enq.phone}</span>
                        <span className="text-[#9EA8A1]/70 block text-[10px]">{enq.email}</span>
                      </td>

                      {/* Typology & Parcel */}
                      <td className="py-4 px-6">
                        <span className="text-[#F5F3EF] block font-medium">{enq.building_type}</span>
                        <span className="text-[#9EA8A1] text-[11px]">
                          {enq.site_location || "Location pending"}, {enq.city || ""}
                        </span>
                        {enq.land_size && (
                          <span className="text-[10px] text-[#C5B083] block">
                            {enq.land_size} {enq.land_unit || "sq.ft"} parcel
                          </span>
                        )}
                      </td>

                      {/* Estimated Budget */}
                      <td className="py-4 px-6">
                        <span className="text-[#C5B083] font-semibold">{enq.estimated_budget || "In Consultation"}</span>
                      </td>

                      {/* Status Selector */}
                      <td className="py-4 px-6">
                        <select
                          value={enq.status}
                          disabled={isPending}
                          onChange={(e) => handleStatusChange(enq.id, e.target.value as EnquiryStatus)}
                          className={`text-[10px] uppercase tracking-wider font-semibold py-1.5 px-3 border outline-none cursor-pointer bg-[#0B0F0D] ${getStatusBadge(
                            enq.status
                          )}`}
                        >
                          <option value="new">NEW INQUIRY</option>
                          <option value="contacted">CONTACTED</option>
                          <option value="in_progress">IN PROGRESS</option>
                          <option value="completed">COMPLETED</option>
                          <option value="closed">CLOSED</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="inline-flex items-center gap-2">
                          {/* 1-Click WhatsApp Button */}
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-[#17201B] hover:bg-[#25D366]/20 border border-[#24322A] hover:border-[#25D366] text-[#25D366] transition-colors"
                            title="Direct WhatsApp Consultation"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>

                          {/* 1-Click Phone Call */}
                          <a
                            href={`tel:${enq.phone}`}
                            className="p-2 bg-[#17201B] hover:bg-[#C5B083]/20 border border-[#24322A] hover:border-[#C5B083] text-[#C5B083] transition-colors"
                            title="Call Client"
                          >
                            <Phone className="w-4 h-4" />
                          </a>

                          {/* Expand details toggle */}
                          <button
                            type="button"
                            onClick={() => setExpandedId(isExpanded ? null : enq.id)}
                            className="p-2 bg-[#17201B] hover:bg-[#24322A] border border-[#24322A] text-[#9EA8A1] hover:text-[#F5F3EF] transition-colors cursor-pointer"
                            title="Inspect Full Specifications"
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expandable Details Row */}
                    {isExpanded && (
                      <tr className="bg-[#0B0F0D]">
                        <td colSpan={6} className="p-6">
                          <div className="p-6 bg-[#17201B] border border-[#24322A] space-y-4 text-xs font-mono">
                            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C5B083]">
                              FULL ARCHITECTURAL SPECIFICATIONS &amp; CLIENT BRIEF
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                              <div>
                                <span className="text-[#9EA8A1] block text-[10px] uppercase">BUILT-UP AREA</span>
                                <span className="text-[#F5F3EF]">{enq.built_up_area ? `${enq.built_up_area} sq.ft` : "Unspecified"}</span>
                              </div>
                              <div>
                                <span className="text-[#9EA8A1] block text-[10px] uppercase">FLOORS</span>
                                <span className="text-[#F5F3EF]">{enq.number_of_floors || "N/A"}</span>
                              </div>
                              <div>
                                <span className="text-[#9EA8A1] block text-[10px] uppercase">BEDROOMS / SUITES</span>
                                <span className="text-[#F5F3EF]">{enq.bedrooms || "N/A"}</span>
                              </div>
                              <div>
                                <span className="text-[#9EA8A1] block text-[10px] uppercase">PREFERRED METHOD</span>
                                <span className="text-[#C5B083] uppercase">{enq.preferred_contact_method || "whatsapp"}</span>
                              </div>
                            </div>

                            {enq.special_requirements && (
                              <div className="pt-2">
                                <span className="text-[#9EA8A1] block text-[10px] uppercase mb-1">SPECIAL ARCHITECTURAL REQUIREMENTS</span>
                                <p className="text-[#E8E4DC] font-light italic">{enq.special_requirements}</p>
                              </div>
                            )}

                            {enq.additional_notes && (
                              <div className="pt-2">
                                <span className="text-[#9EA8A1] block text-[10px] uppercase mb-1">CLIENT VISION NOTES</span>
                                <p className="text-[#E8E4DC] font-light italic">{enq.additional_notes}</p>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

