"use client";

import React, { useState, useEffect, useCallback, useTransition } from "react";
import { Enquiry, EnquiryStatus } from "@/lib/types/database";
import { updateEnquiryStatusAction, getLatestEnquiriesAction } from "@/app/actions/enquiries";
import {
  MessageCircle,
  Phone,
  Search,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

interface AdminDashboardClientProps {
  initialEnquiries: Enquiry[];
}

// Strict semantic status colour configuration (Section 2)
const STATUS_CONFIG: Record<
  EnquiryStatus,
  {
    label: string;
    bg: string;
    text: string;
    border: string;
    indicator: string;
    activeFilter: string;
    inactiveFilterText: string;
  }
> = {
  new: {
    label: "NEW / UNCONTACTED",
    bg: "bg-[#FCE8E6]",
    text: "text-[#B3261E]",
    border: "border-[#F5C2BE]",
    indicator: "bg-[#B3261E]",
    activeFilter: "bg-[#B3261E] text-white border-[#B3261E]",
    inactiveFilterText: "text-[#B3261E]",
  },
  contacted: {
    label: "CONTACTED",
    bg: "bg-[#FFF2D6]",
    text: "text-[#926000]",
    border: "border-[#EAD5AB]",
    indicator: "bg-[#C58A22]",
    activeFilter: "bg-[#926000] text-white border-[#926000]",
    inactiveFilterText: "text-[#926000]",
  },
  in_progress: {
    label: "IN PROGRESS",
    bg: "bg-[#E7F0FA]",
    text: "text-[#245A86]",
    border: "border-[#C2D9EE]",
    indicator: "bg-[#3779AC]",
    activeFilter: "bg-[#245A86] text-white border-[#245A86]",
    inactiveFilterText: "text-[#245A86]",
  },
  completed: {
    label: "COMPLETED",
    bg: "bg-[#E5F3E9]",
    text: "text-[#27663E]",
    border: "border-[#BFDFCB]",
    indicator: "bg-[#2E8540]",
    activeFilter: "bg-[#27663E] text-white border-[#27663E]",
    inactiveFilterText: "text-[#27663E]",
  },
  closed: {
    label: "CLOSED",
    bg: "bg-[#ECEDEA]",
    text: "text-[#58615B]",
    border: "border-[#D1D4CF]",
    indicator: "bg-[#737B75]",
    activeFilter: "bg-[#58615B] text-white border-[#58615B]",
    inactiveFilterText: "text-[#58615B]",
  },
};

export const AdminDashboardClient: React.FC<AdminDashboardClientProps> = ({
  initialEnquiries,
}) => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<Date>(new Date());

  const syncLatest = useCallback(async () => {
    try {
      setIsSyncing(true);
      const latest = await getLatestEnquiriesAction();
      if (latest && Array.isArray(latest)) {
        setEnquiries(latest);
        setLastSyncedAt(new Date());
      }
    } catch (err) {
      console.error("Failed to sync enquiries:", err);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  // Auto-refresh every 5 seconds so public landing page enquiries appear live
  useEffect(() => {
    let active = true;
    const interval = setInterval(async () => {
      try {
        const latest = await getLatestEnquiriesAction();
        if (active && latest && Array.isArray(latest)) {
          setEnquiries(latest);
          setLastSyncedAt(new Date());
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

  // Operational metrics
  const totalCount = enquiries.length;
  const newCount = enquiries.filter((e) => e.status === "new").length;
  const inProgressCount = enquiries.filter((e) => e.status === "in_progress").length;
  const completedCount = enquiries.filter((e) => e.status === "completed").length;

  const handleStatusChange = (enquiryId: string, newStatus: EnquiryStatus) => {
    startTransition(async () => {
      // Optimistic update — immediate visual state change
      setEnquiries((prev) =>
        prev.map((e) =>
          e.id === enquiryId
            ? { ...e, status: newStatus, updated_at: new Date().toISOString() }
            : e
        )
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

  const getFilterButtonClass = (st: string, isActive: boolean) => {
    const base =
      "py-1.5 px-3.5 uppercase tracking-wider border cursor-pointer transition-colors rounded-sm text-xs font-medium inline-flex items-center gap-1.5";

    if (!isActive) {
      return `${base} bg-[#FAF9F5] text-[#626A66] border-[#DDD8CC] hover:border-[#202622] hover:text-[#202622]`;
    }

    switch (st) {
      case "all":
        return `${base} bg-[#202622] text-[#FAF9F5] border-[#202622] font-semibold`;
      case "new":
        return `${base} bg-[#B3261E] text-white border-[#B3261E] font-semibold shadow-xs`;
      case "contacted":
        return `${base} bg-[#926000] text-white border-[#926000] font-semibold shadow-xs`;
      case "in_progress":
        return `${base} bg-[#245A86] text-white border-[#245A86] font-semibold shadow-xs`;
      case "completed":
        return `${base} bg-[#27663E] text-white border-[#27663E] font-semibold shadow-xs`;
      case "closed":
        return `${base} bg-[#58615B] text-white border-[#58615B] font-semibold shadow-xs`;
      default:
        return `${base} bg-[#202622] text-white border-[#202622]`;
    }
  };

  return (
    <div className="space-y-8 lg:space-y-9">
      {/* 1. Dashboard Title Area & Live Synchronization */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-[#626A66] mb-1.5">
            ADMINISTRATIVE GOVERNANCE &amp; ENQUIRY LEDGER
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-[#202622] font-normal tracking-tight">
            Executive Lead Management Console
          </h1>
        </div>

        {/* Live sync pill & manual trigger */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#FAF9F5] border border-[#DDD8CC] rounded-sm text-xs font-sans">
            <span className="w-2 h-2 rounded-full bg-[#526653] animate-pulse" />
            <span className="text-[#626A66] text-xs">
              Live Synced{" "}
              {lastSyncedAt.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </span>
          </div>

          <button
            type="button"
            onClick={syncLatest}
            disabled={isSyncing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF9F5] hover:bg-[#F3F0E8] border border-[#DDD8CC] hover:border-[#202622] text-xs font-sans text-[#202622] transition-colors cursor-pointer disabled:opacity-50 rounded-sm"
            title="Refresh latest inquiries"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 text-[#526653] ${isSyncing ? "animate-spin" : ""}`}
            />
            <span className="font-medium">Sync</span>
          </button>
        </div>
      </div>

      {/* 2. Functional KPI Cards (Section 3) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Enquiries */}
        <div className="p-6 bg-[#FAF9F5] border border-[#DDD8CC] rounded-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-sans font-medium uppercase tracking-[0.15em] text-[#626A66]">
              TOTAL ENQUIRIES
            </span>
          </div>
          <div className="font-display text-4xl sm:text-[42px] text-[#202622] font-semibold leading-tight">
            {totalCount}
          </div>
          <span className="text-xs font-sans text-[#626A66] mt-1.5 block">
            Recorded in registry
          </span>
        </div>

        {/* New / Actionable — High-Priority Red Treatment */}
        <div className="p-6 bg-[#FCE8E6] border border-[#F5C2BE] rounded-sm flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-[#B3261E]">
              NEW / ACTIONABLE
            </span>
            {newCount > 0 && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#B3261E] text-white">
                <AlertCircle className="w-3 h-3" />
                ACTION REQ
              </span>
            )}
          </div>
          <div className="font-display text-4xl sm:text-[42px] text-[#B3261E] font-bold leading-tight">
            {newCount}
          </div>
          <span className="text-xs font-sans text-[#B3261E] mt-1.5 font-medium block">
            Pending first outreach
          </span>
        </div>

        {/* Active in Design — Semantic Blue Treatment */}
        <div className="p-6 bg-[#E7F0FA] border border-[#C2D9EE] rounded-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-[#245A86]">
              ACTIVE IN DESIGN
            </span>
          </div>
          <div className="font-display text-4xl sm:text-[42px] text-[#245A86] font-semibold leading-tight">
            {inProgressCount}
          </div>
          <span className="text-xs font-sans text-[#245A86] mt-1.5 block">
            Under drafting &amp; review
          </span>
        </div>

        {/* Delivered — Semantic Green Treatment */}
        <div className="p-6 bg-[#E5F3E9] border border-[#BFDFCB] rounded-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-[#27663E]">
              DELIVERED
            </span>
          </div>
          <div className="font-display text-4xl sm:text-[42px] text-[#27663E] font-semibold leading-tight">
            {completedCount}
          </div>
          <span className="text-xs font-sans text-[#27663E] mt-1.5 block">
            Completed commissions
          </span>
        </div>
      </div>

      {/* 3. Search and Functional Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 sm:p-5 bg-[#FAF9F5] border border-[#DDD8CC] rounded-sm">
        {/* Search Field */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#626A66] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client, location, reference number, or typology..."
            className="w-full bg-[#FAF9F5] border border-[#DDD8CC] focus:border-[#526653] focus:bg-[#FFFFFF] text-[#202622] text-xs font-sans pl-10 pr-3.5 py-2.5 outline-none transition-colors placeholder:text-[#626A66]/70 rounded-sm"
          />
        </div>

        {/* Status Filters with Semantic Dot Indicators */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-sans">
          {["all", "new", "contacted", "in_progress", "completed", "closed"].map((st) => {
            const isActive = statusFilter === st;
            const config = st !== "all" ? STATUS_CONFIG[st as EnquiryStatus] : null;

            return (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={getFilterButtonClass(st, isActive)}
              >
                {config && (
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isActive ? "bg-white" : config.indicator
                    }`}
                  />
                )}
                <span>{st === "new" ? "NEW / UNCONTACTED" : st.replace("_", " ")}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Enquiry Table with Prioritization and Fixed Grid */}
      <div className="border border-[#DDD8CC] bg-[#FAF9F5] rounded-sm overflow-x-auto">
        <table className="w-full table-fixed min-w-[1040px] text-left text-xs font-sans">
          <thead className="bg-[#EAE6DC] text-[#626A66] uppercase tracking-wider border-b border-[#DDD8CC] text-[11px] font-semibold">
            <tr>
              <th className="w-[15%] py-3.5 px-6">REFERENCE #</th>
              <th className="w-[22%] py-3.5 px-6">CLIENT CONTACT</th>
              <th className="w-[24%] py-3.5 px-6">TYPOLOGY &amp; PARCEL</th>
              <th className="w-[14%] py-3.5 px-6">ESTIMATED BUDGET</th>
              <th className="w-[14%] py-3.5 px-6">STATUS WORKFLOW</th>
              <th className="w-[11%] py-3.5 px-6 text-right">ONE-CLICK ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DDD8CC]">
            {filteredEnquiries.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-[#626A66]">
                  No enquiry records matched your search parameters.
                </td>
              </tr>
            ) : (
              filteredEnquiries.map((enq) => {
                const isExpanded = expandedId === enq.id;
                const isNew = enq.status === "new";
                const statusCfg = STATUS_CONFIG[enq.status];
                const rawPhone = enq.phone.replace(/[^0-9]/g, "");
                const waMessage = encodeURIComponent(
                  `Hello ${enq.full_name}, this is the Principal Architectural Desk at LD Developers regarding your enquiry ${enq.enquiry_number} for a ${enq.building_type}. We have reviewed your plot parameters and would like to schedule a formal consultation.`
                );
                const waUrl = `https://wa.me/${rawPhone}?text=${waMessage}`;

                return (
                  <React.Fragment key={enq.id}>
                    <tr
                      className={`transition-colors border-b border-[#DDD8CC] ${
                        isNew
                          ? "bg-[#FCE8E6]/25 hover:bg-[#FCE8E6]/40 border-l-4 border-l-[#B3261E]"
                          : "hover:bg-[#F3F0E8]/60 border-l-4 border-l-transparent"
                      }`}
                    >
                      {/* Reference # Container (Section 4) */}
                      <td className="w-[15%] py-4 px-6 align-top">
                        <div className="inline-block px-2.5 py-1.5 bg-[#EAE6DC] border border-[#DDD8CC] rounded-sm">
                          <span className="font-mono text-[12.5px] font-semibold text-[#343B33] block leading-tight">
                            {enq.enquiry_number}
                          </span>
                          <span className="text-[10.5px] text-[#626A66] block mt-0.5">
                            {new Date(enq.created_at).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        {isNew && (
                          <span className="inline-block mt-1.5 px-1.5 py-0.5 rounded text-[9.5px] font-bold bg-[#FCE8E6] text-[#B3261E] border border-[#F5C2BE]">
                            UNCONTACTED
                          </span>
                        )}
                      </td>

                      {/* Client Contact — Unified Subtle Box (Section 4) */}
                      <td className="w-[22%] py-4 px-6 align-top">
                        <div className="p-3 bg-[#F3F0E8] border border-[#DDD8CC]/70 rounded-sm space-y-1">
                          <div className="font-semibold text-[13.5px] text-[#202622] leading-tight">
                            {enq.full_name}
                          </div>
                          <div className="text-[#526653] text-[12px] font-mono font-medium">
                            {enq.phone}
                          </div>
                          <div
                            className="text-[#626A66] text-[11px] truncate"
                            title={enq.email}
                          >
                            {enq.email}
                          </div>
                        </div>
                      </td>

                      {/* Typology & Parcel — Clean text grouping (Section 4) */}
                      <td className="w-[24%] py-4 px-6 align-top">
                        <div className="space-y-0.5">
                          <span className="text-[13.5px] text-[#202622] block font-medium leading-tight">
                            {enq.building_type}
                          </span>
                          <span className="text-[#626A66] text-[12px] block">
                            {enq.site_location || "Location pending"}, {enq.city || ""}
                          </span>
                          {enq.land_size && (
                            <span className="text-[11px] text-[#526653] font-medium block">
                              {enq.land_size} {enq.land_unit || "sq.ft"} parcel
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Estimated Budget — Neutral container (Section 4) */}
                      <td className="w-[14%] py-4 px-6 align-top">
                        <div className="px-2.5 py-1.5 bg-[#EAE6DC] border border-[#DDD8CC] rounded-sm inline-block">
                          <span className="text-[13px] font-semibold text-[#202622] block leading-tight">
                            {enq.estimated_budget || "In Consultation"}
                          </span>
                        </div>
                      </td>

                      {/* Status Workflow Selector (Section 2 & 5) */}
                      <td className="w-[14%] py-4 px-6 align-top">
                        <div className="relative inline-flex items-center">
                          <select
                            value={enq.status}
                            disabled={isPending}
                            onChange={(e) =>
                              handleStatusChange(enq.id, e.target.value as EnquiryStatus)
                            }
                            className={`text-[11px] uppercase tracking-wider font-semibold py-1.5 pl-3 pr-7 border rounded-sm outline-none cursor-pointer appearance-none transition-colors shadow-xs ${
                              statusCfg.bg
                            } ${statusCfg.text} ${statusCfg.border}`}
                          >
                            <option value="new">NEW / UNCONTACTED</option>
                            <option value="contacted">CONTACTED</option>
                            <option value="in_progress">IN PROGRESS</option>
                            <option value="completed">COMPLETED</option>
                            <option value="closed">CLOSED</option>
                          </select>
                          <ChevronDown
                            className={`w-3.5 h-3.5 absolute right-2 pointer-events-none ${statusCfg.text}`}
                          />
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="w-[11%] py-4 px-6 text-right align-top">
                        <div className="inline-flex items-center gap-1.5 justify-end">
                          {/* 1-Click WhatsApp Button */}
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 flex items-center justify-center bg-[#FAF9F5] hover:bg-[#526653] border border-[#DDD8CC] hover:border-[#526653] text-[#526653] hover:text-[#FFFFFF] transition-colors rounded-sm shadow-xs"
                            title="Direct WhatsApp Consultation"
                            aria-label="Direct WhatsApp Consultation"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>

                          {/* 1-Click Phone Call */}
                          <a
                            href={`tel:${enq.phone}`}
                            className="w-8 h-8 flex items-center justify-center bg-[#FAF9F5] hover:bg-[#526653] border border-[#DDD8CC] hover:border-[#526653] text-[#626A66] hover:text-[#FFFFFF] transition-colors rounded-sm shadow-xs"
                            title="Call Client"
                            aria-label="Call Client"
                          >
                            <Phone className="w-4 h-4" />
                          </a>

                          {/* Expand details toggle */}
                          <button
                            type="button"
                            onClick={() => setExpandedId(isExpanded ? null : enq.id)}
                            className="w-8 h-8 flex items-center justify-center bg-[#FAF9F5] hover:bg-[#EAE6DC] border border-[#DDD8CC] text-[#626A66] hover:text-[#202622] transition-colors cursor-pointer rounded-sm shadow-xs"
                            title="Inspect Full Specifications"
                            aria-label="Inspect Full Specifications"
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expandable Specifications Row */}
                    {isExpanded && (
                      <tr className="bg-[#FAF9F5] border-t border-[#DDD8CC]">
                        <td colSpan={6} className="p-6">
                          <div className="p-6 bg-[#FAF9F5] border border-[#DDD8CC] rounded-sm space-y-4 text-xs font-sans">
                            <div className="flex items-center justify-between pb-3 border-b border-[#DDD8CC]">
                              <div className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#526653] font-semibold">
                                FULL ARCHITECTURAL SPECIFICATIONS &amp; CLIENT BRIEF
                              </div>
                              <div
                                className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-sm border ${statusCfg.bg} ${statusCfg.text} ${statusCfg.border}`}
                              >
                                CURRENT STATUS: {statusCfg.label}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                              <div className="p-2.5 bg-[#F3F0E8] border border-[#DDD8CC]/60 rounded-sm">
                                <span className="text-[#626A66] block text-[10.5px] uppercase font-semibold">
                                  BUILT-UP AREA
                                </span>
                                <span className="text-[#202622] font-medium text-xs">
                                  {enq.built_up_area
                                    ? `${enq.built_up_area} sq.ft`
                                    : "Unspecified"}
                                </span>
                              </div>
                              <div className="p-2.5 bg-[#F3F0E8] border border-[#DDD8CC]/60 rounded-sm">
                                <span className="text-[#626A66] block text-[10.5px] uppercase font-semibold">
                                  FLOORS
                                </span>
                                <span className="text-[#202622] font-medium text-xs">
                                  {enq.number_of_floors || "N/A"}
                                </span>
                              </div>
                              <div className="p-2.5 bg-[#F3F0E8] border border-[#DDD8CC]/60 rounded-sm">
                                <span className="text-[#626A66] block text-[10.5px] uppercase font-semibold">
                                  BEDROOMS / SUITES
                                </span>
                                <span className="text-[#202622] font-medium text-xs">
                                  {enq.bedrooms || "N/A"}
                                </span>
                              </div>
                              <div className="p-2.5 bg-[#F3F0E8] border border-[#DDD8CC]/60 rounded-sm">
                                <span className="text-[#626A66] block text-[10.5px] uppercase font-semibold">
                                  PREFERRED METHOD
                                </span>
                                <span className="text-[#526653] uppercase font-semibold text-xs">
                                  {enq.preferred_contact_method || "whatsapp"}
                                </span>
                              </div>
                            </div>

                            {enq.special_requirements && (
                              <div className="pt-2">
                                <span className="text-[#626A66] block text-[10.5px] uppercase font-semibold mb-1">
                                  SPECIAL ARCHITECTURAL REQUIREMENTS
                                </span>
                                <p className="text-[#202622] text-xs italic bg-[#F3F0E8] p-3.5 border border-[#DDD8CC] rounded-sm leading-relaxed">
                                  {enq.special_requirements}
                                </p>
                              </div>
                            )}

                            {enq.additional_notes && (
                              <div className="pt-2">
                                <span className="text-[#626A66] block text-[10.5px] uppercase font-semibold mb-1">
                                  CLIENT VISION NOTES
                                </span>
                                <p className="text-[#202622] text-xs italic bg-[#F3F0E8] p-3.5 border border-[#DDD8CC] rounded-sm leading-relaxed">
                                  {enq.additional_notes}
                                </p>
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
