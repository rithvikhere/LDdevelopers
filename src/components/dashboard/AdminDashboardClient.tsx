"use client";

import React, { useState, useEffect, useCallback, useTransition } from "react";
import { Enquiry, EnquiryStatus } from "@/lib/types/database";
import { updateEnquiryStatusAction, getLatestEnquiriesAction } from "@/app/actions/enquiries";
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
  RefreshCw,
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
  const [isSyncing, setIsSyncing] = useState(false);

  const syncLatest = useCallback(async () => {
    try {
      setIsSyncing(true);
      const latest = await getLatestEnquiriesAction();
      if (latest && Array.isArray(latest)) {
        setEnquiries(latest);
      }
    } catch (err) {
      console.error("Failed to sync enquiries:", err);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  // Auto-refresh every 5 seconds so any public landing page enquiry appears automatically
  useEffect(() => {
    let active = true;
    const interval = setInterval(async () => {
      try {
        const latest = await getLatestEnquiriesAction();
        if (active && latest && Array.isArray(latest)) {
          setEnquiries(latest);
        }
      } catch (err) {
        console.warn("Background auto-poll:", err);
      }
    }, 5000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

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
        return "text-[#8C6D23] border-[#8C6D23]/40 bg-[#FEF9EE]";
      case "contacted":
        return "text-[#0E7090] border-[#0E7090]/40 bg-[#ECFEFF]";
      case "in_progress":
        return "text-[#15803D] border-[#15803D]/40 bg-[#F0FDF4]";
      case "completed":
        return "text-[#1D4ED8] border-[#1D4ED8]/40 bg-[#EFF6FF]";
      case "closed":
        return "text-[#475569] border-[#CBD5E1] bg-[#F8FAFC]";
    }
  };

  return (
    <div className="space-y-10">
      {/* Executive Header & KPIs */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8C774B] font-semibold mb-2">
            ADMINISTRATIVE GOVERNANCE &amp; INQUIRY LEDGER
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-light text-[#0B0F0D]">
            Executive Lead Management Console
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={syncLatest}
            disabled={isSyncing}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-[#FAF8F5] border border-[#24322A]/20 text-xs font-mono text-[#0B0F0D] transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
            title="Refresh latest inquiries"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#8C774B] ${isSyncing ? "animate-spin" : ""}`} />
            <span className="font-medium">Sync Data</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-6 bg-white border border-[#24322A]/15 shadow-xs">
          <span className="text-[10px] font-mono uppercase text-[#5A6B62] block mb-2 font-medium">TOTAL COMMISSIONS</span>
          <div className="font-display text-4xl text-[#0B0F0D]">{totalCount}</div>
          <span className="text-[10px] font-mono text-[#8C774B] block mt-1 font-medium">Recorded in registry</span>
        </div>

        <div className="p-6 bg-white border border-[#24322A]/15 shadow-xs">
          <span className="text-[10px] font-mono uppercase text-[#5A6B62] block mb-2 font-medium">NEW / ACTIONABLE</span>
          <div className="font-display text-4xl text-[#1F4A36]">{newCount}</div>
          <span className="text-[10px] font-mono text-[#15803D] block mt-1 font-medium">Pending first outreach</span>
        </div>

        <div className="p-6 bg-white border border-[#24322A]/15 shadow-xs">
          <span className="text-[10px] font-mono uppercase text-[#5A6B62] block mb-2 font-medium">ACTIVE IN DESIGN</span>
          <div className="font-display text-4xl text-[#0E7090]">{inProgressCount}</div>
          <span className="text-[10px] font-mono text-[#5A6B62] block mt-1 font-medium">Under drafting &amp; review</span>
        </div>

        <div className="p-6 bg-white border border-[#24322A]/15 shadow-xs">
          <span className="text-[10px] font-mono uppercase text-[#5A6B62] block mb-2 font-medium">DELIVERED</span>
          <div className="font-display text-4xl text-[#1D4ED8]">{completedCount}</div>
          <span className="text-[10px] font-mono text-[#5A6B62] block mt-1 font-medium">Completed commissions</span>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-white border border-[#24322A]/15 shadow-xs">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#5A6B62] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client, location, reference #, or typology..."
            className="w-full bg-[#FAF8F5] border border-[#24322A]/20 focus:border-[#1F4A36] focus:bg-white text-[#0B0F0D] text-xs font-mono pl-10 pr-3.5 py-2.5 outline-none transition-colors placeholder:text-[#7A8A81] shadow-xs font-medium"
          />
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
          {["all", "new", "contacted", "in_progress", "completed", "closed"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`py-1.5 px-3 uppercase tracking-wider border cursor-pointer transition-colors shadow-xs ${
                statusFilter === st
                  ? "bg-[#1F4A36] text-white border-[#1F4A36] font-semibold"
                  : "bg-white text-[#4A5A51] border-[#24322A]/20 hover:border-[#1F4A36] hover:text-[#0B0F0D]"
              }`}
            >
              {st.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Full Architectural Enquiry Ledger Table */}
      <div className="border border-[#24322A]/15 bg-white shadow-xs overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[#F3EFE8] text-[#4A5A51] uppercase tracking-wider border-b border-[#24322A]/15 text-[10px] font-semibold">
            <tr>
              <th className="py-4 px-6">REFERENCE #</th>
              <th className="py-4 px-6">CLIENT CONTACT</th>
              <th className="py-4 px-6">TYPOLOGY &amp; PARCEL</th>
              <th className="py-4 px-6">ESTIMATED BUDGET</th>
              <th className="py-4 px-6">STATUS WORKFLOW</th>
              <th className="py-4 px-6 text-right">ONE-CLICK ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#24322A]/10">
            {filteredEnquiries.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-[#5A6B62]">
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
                    <tr className="hover:bg-[#FAF8F5] transition-colors">
                      {/* Reference # */}
                      <td className="py-4 px-6">
                        <span className="font-semibold text-[#8C774B] block">{enq.enquiry_number}</span>
                        <span className="text-[10px] text-[#5A6B62]">
                          {new Date(enq.created_at).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </td>

                      {/* Client Contact */}
                      <td className="py-4 px-6">
                        <span className="font-semibold text-[#0B0F0D] block">{enq.full_name}</span>
                        <span className="text-[#2E5A44] block text-[11px] font-medium">{enq.phone}</span>
                        <span className="text-[#5A6B62] block text-[10px]">{enq.email}</span>
                      </td>

                      {/* Typology & Parcel */}
                      <td className="py-4 px-6">
                        <span className="text-[#0B0F0D] block font-medium">{enq.building_type}</span>
                        <span className="text-[#5A6B62] text-[11px]">
                          {enq.site_location || "Location pending"}, {enq.city || ""}
                        </span>
                        {enq.land_size && (
                          <span className="text-[10px] text-[#8C774B] block font-medium">
                            {enq.land_size} {enq.land_unit || "sq.ft"} parcel
                          </span>
                        )}
                      </td>

                      {/* Estimated Budget */}
                      <td className="py-4 px-6">
                        <span className="text-[#1F4A36] font-semibold text-[13px]">{enq.estimated_budget || "In Consultation"}</span>
                      </td>

                      {/* Status Selector */}
                      <td className="py-4 px-6">
                        <select
                          value={enq.status}
                          disabled={isPending}
                          onChange={(e) => handleStatusChange(enq.id, e.target.value as EnquiryStatus)}
                          className={`text-[10px] uppercase tracking-wider font-semibold py-1.5 px-3 border outline-none cursor-pointer rounded-none shadow-xs ${getStatusBadge(
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
                            className="p-2 bg-white hover:bg-[#25D366]/15 border border-[#24322A]/20 hover:border-[#25D366] text-[#128C7E] transition-colors shadow-xs"
                            title="Direct WhatsApp Consultation"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>

                          {/* 1-Click Phone Call */}
                          <a
                            href={`tel:${enq.phone}`}
                            className="p-2 bg-white hover:bg-[#8C774B]/15 border border-[#24322A]/20 hover:border-[#8C774B] text-[#8C774B] transition-colors shadow-xs"
                            title="Call Client"
                          >
                            <Phone className="w-4 h-4" />
                          </a>

                          {/* Expand details toggle */}
                          <button
                            type="button"
                            onClick={() => setExpandedId(isExpanded ? null : enq.id)}
                            className="p-2 bg-white hover:bg-[#F3EFE8] border border-[#24322A]/20 text-[#4A5A51] hover:text-[#0B0F0D] transition-colors cursor-pointer shadow-xs"
                            title="Inspect Full Specifications"
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expandable Details Row */}
                    {isExpanded && (
                      <tr className="bg-[#FAF8F5]">
                        <td colSpan={6} className="p-6">
                          <div className="p-6 bg-white border border-[#24322A]/15 shadow-xs space-y-4 text-xs font-mono">
                            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8C774B] font-semibold">
                              FULL ARCHITECTURAL SPECIFICATIONS &amp; CLIENT BRIEF
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                              <div>
                                <span className="text-[#5A6B62] block text-[10px] uppercase font-medium">BUILT-UP AREA</span>
                                <span className="text-[#0B0F0D] font-medium">{enq.built_up_area ? `${enq.built_up_area} sq.ft` : "Unspecified"}</span>
                              </div>
                              <div>
                                <span className="text-[#5A6B62] block text-[10px] uppercase font-medium">FLOORS</span>
                                <span className="text-[#0B0F0D] font-medium">{enq.number_of_floors || "N/A"}</span>
                              </div>
                              <div>
                                <span className="text-[#5A6B62] block text-[10px] uppercase font-medium">BEDROOMS / SUITES</span>
                                <span className="text-[#0B0F0D] font-medium">{enq.bedrooms || "N/A"}</span>
                              </div>
                              <div>
                                <span className="text-[#5A6B62] block text-[10px] uppercase font-medium">PREFERRED METHOD</span>
                                <span className="text-[#1F4A36] uppercase font-semibold">{enq.preferred_contact_method || "whatsapp"}</span>
                              </div>
                            </div>

                            {enq.special_requirements && (
                              <div className="pt-2">
                                <span className="text-[#5A6B62] block text-[10px] uppercase font-medium mb-1">SPECIAL ARCHITECTURAL REQUIREMENTS</span>
                                <p className="text-[#1A231F] font-normal italic bg-[#FAF8F5] p-3 border border-[#24322A]/10 leading-relaxed">{enq.special_requirements}</p>
                              </div>
                            )}

                            {enq.additional_notes && (
                              <div className="pt-2">
                                <span className="text-[#5A6B62] block text-[10px] uppercase font-medium mb-1">CLIENT VISION NOTES</span>
                                <p className="text-[#1A231F] font-normal italic bg-[#FAF8F5] p-3 border border-[#24322A]/10 leading-relaxed">{enq.additional_notes}</p>
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

