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

  // Auto-refresh every 5 seconds so any public landing page enquiry appears automatically
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

  // Approved subtle status badges (Section 9)
  const getStatusBadge = (status: EnquiryStatus) => {
    switch (status) {
      case "new":
        return "bg-[#F1E9D8] text-[#80642F] border-[#E5DBCA]";
      case "contacted":
        return "bg-[#E8EEE8] text-[#49654F] border-[#D6E2D7]";
      case "in_progress":
        return "bg-[#E2ECE6] text-[#355B47] border-[#C8DFD2]";
      case "completed":
        return "bg-[#DDE9DE] text-[#315C3E] border-[#C6DCB8]";
      case "closed":
        return "bg-[#ECEAE4] text-[#68685F] border-[#DCDAD2]";
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

        {/* Live synchronization information & manual sync */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#FAF9F5] border border-[#DDD8CC] rounded-sm text-xs font-sans">
            <span className="w-2 h-2 rounded-full bg-[#526653] animate-pulse" />
            <span className="text-[#626A66] text-xs">
              Live Synced {lastSyncedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </span>
          </div>

          <button
            type="button"
            onClick={syncLatest}
            disabled={isSyncing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF9F5] hover:bg-[#F3F0E8] border border-[#DDD8CC] hover:border-[#202622] text-xs font-sans text-[#202622] transition-colors cursor-pointer disabled:opacity-50 rounded-sm"
            title="Refresh latest inquiries"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#526653] ${isSyncing ? "animate-spin" : ""}`} />
            <span className="font-medium">Sync</span>
          </button>
        </div>
      </div>

      {/* 2. Statistics Cards — 4 balanced horizontal cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-6 bg-[#FAF9F5] border border-[#DDD8CC] rounded-sm flex flex-col justify-between">
          <span className="text-[11px] font-sans font-medium uppercase tracking-[0.15em] text-[#626A66] block mb-2">
            TOTAL COMMISSIONS
          </span>
          <div className="font-display text-4xl sm:text-[40px] text-[#202622] font-medium leading-tight">
            {totalCount}
          </div>
          <span className="text-xs font-sans text-[#626A66] block mt-1.5">
            Recorded in registry
          </span>
        </div>

        <div className="p-6 bg-[#FAF9F5] border border-[#DDD8CC] rounded-sm flex flex-col justify-between">
          <span className="text-[11px] font-sans font-medium uppercase tracking-[0.15em] text-[#626A66] block mb-2">
            NEW / ACTIONABLE
          </span>
          <div className="font-display text-4xl sm:text-[40px] text-[#526653] font-medium leading-tight">
            {newCount}
          </div>
          <span className="text-xs font-sans text-[#526653] block mt-1.5 font-medium">
            Pending first outreach
          </span>
        </div>

        <div className="p-6 bg-[#FAF9F5] border border-[#DDD8CC] rounded-sm flex flex-col justify-between">
          <span className="text-[11px] font-sans font-medium uppercase tracking-[0.15em] text-[#626A66] block mb-2">
            ACTIVE IN DESIGN
          </span>
          <div className="font-display text-4xl sm:text-[40px] text-[#202622] font-medium leading-tight">
            {inProgressCount}
          </div>
          <span className="text-xs font-sans text-[#626A66] block mt-1.5">
            Under drafting &amp; review
          </span>
        </div>

        <div className="p-6 bg-[#FAF9F5] border border-[#DDD8CC] rounded-sm flex flex-col justify-between">
          <span className="text-[11px] font-sans font-medium uppercase tracking-[0.15em] text-[#626A66] block mb-2">
            DELIVERED
          </span>
          <div className="font-display text-4xl sm:text-[40px] text-[#202622] font-medium leading-tight">
            {completedCount}
          </div>
          <span className="text-xs font-sans text-[#626A66] block mt-1.5">
            Completed commissions
          </span>
        </div>
      </div>

      {/* 3. Search and Filter Toolbar */}
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

        {/* Minimal Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-sans">
          {["all", "new", "contacted", "in_progress", "completed", "closed"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`py-1.5 px-3.5 uppercase tracking-wider border cursor-pointer transition-colors rounded-sm text-xs font-medium ${
                statusFilter === st
                  ? "bg-[#526653] text-[#FAF9F5] border-[#526653]"
                  : "bg-[#FAF9F5] text-[#626A66] border-[#DDD8CC] hover:border-[#526653] hover:text-[#202622]"
              }`}
            >
              {st.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Enquiry Table with Strict Column Width System */}
      <div className="border border-[#DDD8CC] bg-[#FAF9F5] rounded-sm overflow-x-auto">
        <table className="w-full table-fixed min-w-[1020px] text-left text-xs font-sans">
          <thead className="bg-[#EAE6DC] text-[#626A66] uppercase tracking-wider border-b border-[#DDD8CC] text-[11px] font-semibold">
            <tr>
              <th className="w-[14%] py-3.5 px-6">REFERENCE #</th>
              <th className="w-[20%] py-3.5 px-6">CLIENT CONTACT</th>
              <th className="w-[26%] py-3.5 px-6">TYPOLOGY &amp; PARCEL</th>
              <th className="w-[15%] py-3.5 px-6">ESTIMATED BUDGET</th>
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
                const rawPhone = enq.phone.replace(/[^0-9]/g, "");
                const waMessage = encodeURIComponent(
                  `Hello ${enq.full_name}, this is the Principal Architectural Desk at LD Developers regarding your enquiry ${enq.enquiry_number} for a ${enq.building_type}. We have reviewed your plot parameters and would like to schedule a formal consultation.`
                );
                const waUrl = `https://wa.me/${rawPhone}?text=${waMessage}`;

                return (
                  <React.Fragment key={enq.id}>
                    <tr className="hover:bg-[#F3F0E8]/60 transition-colors">
                      {/* Reference # */}
                      <td className="w-[14%] py-4 px-6 align-top">
                        <span className="font-mono text-[13px] font-medium text-[#202622] block leading-tight">
                          {enq.enquiry_number}
                        </span>
                        <span className="text-[11px] text-[#626A66] block mt-1">
                          {new Date(enq.created_at).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </td>

                      {/* Client Contact */}
                      <td className="w-[20%] py-4 px-6 align-top">
                        <span className="font-medium text-[14px] text-[#202622] block leading-tight">
                          {enq.full_name}
                        </span>
                        <span className="text-[#526653] block text-[12px] font-mono mt-1 font-medium">
                          {enq.phone}
                        </span>
                        <span className="text-[#626A66] block text-[11px] mt-0.5 truncate" title={enq.email}>
                          {enq.email}
                        </span>
                      </td>

                      {/* Typology & Parcel */}
                      <td className="w-[26%] py-4 px-6 align-top">
                        <span className="text-[14px] text-[#202622] block font-medium leading-tight">
                          {enq.building_type}
                        </span>
                        <span className="text-[#626A66] text-[12px] block mt-1">
                          {enq.site_location || "Location pending"}, {enq.city || ""}
                        </span>
                        {enq.land_size && (
                          <span className="text-[11px] text-[#B49A68] block font-medium mt-0.5">
                            {enq.land_size} {enq.land_unit || "sq.ft"} parcel
                          </span>
                        )}
                      </td>

                      {/* Estimated Budget */}
                      <td className="w-[15%] py-4 px-6 align-top">
                        <span className="text-[14px] font-medium text-[#202622] block leading-tight">
                          {enq.estimated_budget || "In Consultation"}
                        </span>
                      </td>

                      {/* Status Selector */}
                      <td className="w-[14%] py-4 px-6 align-top">
                        <select
                          value={enq.status}
                          disabled={isPending}
                          onChange={(e) => handleStatusChange(enq.id, e.target.value as EnquiryStatus)}
                          className={`text-[11px] uppercase tracking-wider font-semibold py-1.5 px-3 border outline-none cursor-pointer rounded-sm transition-colors ${getStatusBadge(
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
                      <td className="w-[11%] py-4 px-6 text-right align-top">
                        <div className="inline-flex items-center gap-1.5 justify-end">
                          {/* 1-Click WhatsApp Button */}
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 flex items-center justify-center bg-[#FAF9F5] hover:bg-[#526653] border border-[#DDD8CC] hover:border-[#526653] text-[#526653] hover:text-[#FFFFFF] transition-colors rounded-sm"
                            title="Direct WhatsApp Consultation"
                            aria-label="Direct WhatsApp Consultation"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>

                          {/* 1-Click Phone Call */}
                          <a
                            href={`tel:${enq.phone}`}
                            className="w-8 h-8 flex items-center justify-center bg-[#FAF9F5] hover:bg-[#526653] border border-[#DDD8CC] hover:border-[#526653] text-[#626A66] hover:text-[#FFFFFF] transition-colors rounded-sm"
                            title="Call Client"
                            aria-label="Call Client"
                          >
                            <Phone className="w-4 h-4" />
                          </a>

                          {/* Expand details toggle */}
                          <button
                            type="button"
                            onClick={() => setExpandedId(isExpanded ? null : enq.id)}
                            className="w-8 h-8 flex items-center justify-center bg-[#FAF9F5] hover:bg-[#EAE6DC] border border-[#DDD8CC] text-[#626A66] hover:text-[#202622] transition-colors cursor-pointer rounded-sm"
                            title="Inspect Full Specifications"
                            aria-label="Inspect Full Specifications"
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expandable Specifications Row */}
                    {isExpanded && (
                      <tr className="bg-[#FAF9F5] border-t border-[#DDD8CC]">
                        <td colSpan={6} className="p-6">
                          <div className="p-6 bg-[#F3F0E8] border border-[#DDD8CC] rounded-sm space-y-4 text-xs font-sans">
                            <div className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#526653] font-semibold">
                              FULL ARCHITECTURAL SPECIFICATIONS &amp; CLIENT BRIEF
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                              <div>
                                <span className="text-[#626A66] block text-[11px] uppercase font-semibold">BUILT-UP AREA</span>
                                <span className="text-[#202622] font-medium text-xs">
                                  {enq.built_up_area ? `${enq.built_up_area} sq.ft` : "Unspecified"}
                                </span>
                              </div>
                              <div>
                                <span className="text-[#626A66] block text-[11px] uppercase font-semibold">FLOORS</span>
                                <span className="text-[#202622] font-medium text-xs">{enq.number_of_floors || "N/A"}</span>
                              </div>
                              <div>
                                <span className="text-[#626A66] block text-[11px] uppercase font-semibold">BEDROOMS / SUITES</span>
                                <span className="text-[#202622] font-medium text-xs">{enq.bedrooms || "N/A"}</span>
                              </div>
                              <div>
                                <span className="text-[#626A66] block text-[11px] uppercase font-semibold">PREFERRED METHOD</span>
                                <span className="text-[#526653] uppercase font-semibold text-xs">
                                  {enq.preferred_contact_method || "whatsapp"}
                                </span>
                              </div>
                            </div>

                            {enq.special_requirements && (
                              <div className="pt-2">
                                <span className="text-[#626A66] block text-[11px] uppercase font-semibold mb-1">
                                  SPECIAL ARCHITECTURAL REQUIREMENTS
                                </span>
                                <p className="text-[#202622] text-xs italic bg-[#FAF9F5] p-3.5 border border-[#DDD8CC] rounded-sm leading-relaxed">
                                  {enq.special_requirements}
                                </p>
                              </div>
                            )}

                            {enq.additional_notes && (
                              <div className="pt-2">
                                <span className="text-[#626A66] block text-[11px] uppercase font-semibold mb-1">
                                  CLIENT VISION NOTES
                                </span>
                                <p className="text-[#202622] text-xs italic bg-[#FAF9F5] p-3.5 border border-[#DDD8CC] rounded-sm leading-relaxed">
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
