import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth-helpers";
import { getEnquiriesAction } from "@/app/actions/enquiries";
import { logoutAction } from "@/app/actions/auth";
import { CompanyLogo } from "@/components/brand/CompanyLogo";
import { CustomerDashboardClient } from "@/components/dashboard/CustomerDashboardClient";
import { ArrowLeft, LogOut, UserCheck } from "lucide-react";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/login");
  }

  const enquiries = await getEnquiriesAction();

  return (
    <div className="min-h-screen bg-[#0B0F0D] text-[#F5F3EF] flex flex-col justify-between selection:bg-[#C5B083] selection:text-[#0B0F0D]">
      {/* Top Header */}
      <header className="border-b border-[#24322A] bg-[#0B0F0D]/90 backdrop-blur-md px-6 lg:px-12 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#9EA8A1] hover:text-[#C5B083] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#C5B083]" />
            <span>Studio</span>
          </Link>
          <div className="hidden sm:block h-4 w-px bg-[#24322A]" />
          <CompanyLogo theme="dark" showSubtitle={false} />
        </div>

        {/* User Badge & Sign Out */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#17201B] border border-[#24322A]">
            <UserCheck className="w-3.5 h-3.5 text-[#2E5A44]" />
            <span className="text-[#F5F3EF] font-medium">{session.user.fullName}</span>
            <span className="text-[#9EA8A1]">&bull;</span>
            <span className="text-[#C5B083] uppercase text-[10px] tracking-wider">Client</span>
          </div>

          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 py-1.5 px-3 border border-[#24322A] hover:border-red-800 text-[#9EA8A1] hover:text-red-400 text-xs transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </header>

      {/* Main Client Experience */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto p-4 sm:p-6 lg:p-12">
        <CustomerDashboardClient user={session.user} initialEnquiries={enquiries} />
      </main>

      {/* Footer */}
      <footer className="border-t border-[#24322A] bg-[#0B0F0D] py-4 px-6 text-center text-[10px] font-mono text-[#9EA8A1]">
        [COMPANY NAME] CLIENT PORTAL &bull; ENCRYPTED &amp; CONFIDENTIAL ARCHITECTURAL REPOSITORY &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
