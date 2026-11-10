import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth-helpers";
import { getEnquiriesAction } from "@/app/actions/enquiries";
import { logoutAction } from "@/app/actions/auth";
import { CompanyLogo } from "@/components/brand/CompanyLogo";
import { AdminDashboardClient } from "@/components/dashboard/AdminDashboardClient";
import { ArrowLeft, LogOut, Shield } from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await getSession();

  if (!session?.user || session.user.role !== "admin") {
    redirect("/login");
  }

  const enquiries = await getEnquiriesAction();

  return (
    <div className="min-h-screen bg-[#F3F0E8] text-[#202622] flex flex-col justify-between selection:bg-[#B49A68]/30 selection:text-[#202622]">
      {/* Top Navigation Header — 76-84px height, Soft White #FAF9F5, border #DDD8CC */}
      <header className="h-20 bg-[#FAF9F5] border-b border-[#DDD8CC] px-6 sm:px-8 lg:px-12 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-sans font-medium uppercase tracking-[0.18em] text-[#626A66] hover:text-[#202622] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#526653]" />
            <span>Studio</span>
          </Link>
          <div className="hidden sm:block h-4 w-px bg-[#DDD8CC]" />
          <CompanyLogo theme="light" showSubtitle={false} />
        </div>

        {/* Administrator identity & Sign Out */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs font-sans">
          <div className="flex items-center gap-2.5 px-3 py-1.5 bg-[#FAF9F5] border border-[#DDD8CC] rounded-sm">
            <Shield className="w-3.5 h-3.5 text-[#B49A68]" />
            <span className="text-[#202622] font-medium">{session.user.fullName}</span>
            <span className="text-[#DDD8CC]">&bull;</span>
            <span className="text-[#626A66] uppercase text-[10px] tracking-wider font-medium">Principal Admin</span>
          </div>

          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 py-1.5 px-3 bg-[#FAF9F5] border border-[#DDD8CC] hover:border-[#202622] hover:bg-[#F3F0E8] text-[#626A66] hover:text-[#202622] text-xs transition-colors cursor-pointer rounded-sm"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </header>

      {/* Main Admin Console Container */}
      <main className="flex-1 max-w-[1680px] w-full mx-auto px-6 sm:px-8 lg:px-12 py-8 lg:py-10">
        <AdminDashboardClient initialEnquiries={enquiries} />
      </main>

      {/* Footer */}
      <footer className="border-t border-[#DDD8CC] bg-[#FAF9F5] py-4 px-6 text-center text-xs font-sans text-[#626A66]">
        [COMPANY NAME] EXECUTIVE ADMINISTRATIVE CONSOLE &bull; LEVEL 4 GOVERNANCE &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
