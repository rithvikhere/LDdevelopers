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
    <div className="min-h-screen bg-[#F8F6F1] text-[#0B0F0D] flex flex-col justify-between selection:bg-[#C5B083] selection:text-[#0B0F0D]">
      {/* Top Header */}
      <header className="border-b border-[#24322A]/15 bg-[#FAF8F5]/95 backdrop-blur-md px-6 lg:px-12 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#4A5A51] hover:text-[#0B0F0D] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#8C774B]" />
            <span>Studio</span>
          </Link>
          <div className="hidden sm:block h-4 w-px bg-[#24322A]/15" />
          <CompanyLogo theme="light" showSubtitle={false} />
        </div>

        {/* Admin Badge & Sign Out */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#24322A]/15 shadow-xs">
            <Shield className="w-3.5 h-3.5 text-[#8C774B]" />
            <span className="text-[#0B0F0D] font-medium">{session.user.fullName}</span>
            <span className="text-[#8C774B]">&bull;</span>
            <span className="text-[#8C774B] uppercase text-[10px] tracking-wider font-semibold">Principal Admin</span>
          </div>

          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 py-1.5 px-3 bg-white border border-[#24322A]/20 hover:border-red-600 text-[#4A5A51] hover:text-red-700 hover:bg-red-50 text-xs transition-colors cursor-pointer shadow-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </header>

      {/* Main Admin Console */}
      <main className="flex-1 max-w-[1720px] w-full mx-auto p-4 sm:p-6 lg:p-12">
        <AdminDashboardClient initialEnquiries={enquiries} />
      </main>

      {/* Footer */}
      <footer className="border-t border-[#24322A]/15 bg-[#EFECE6] py-4 px-6 text-center text-[10px] font-mono text-[#5A6B62]">
        [COMPANY NAME] EXECUTIVE ADMINISTRATIVE CONSOLE &bull; LEVEL 4 GOVERNANCE &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}

