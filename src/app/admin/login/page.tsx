import React from "react";
import Link from "next/link";
import { CompanyLogo } from "@/components/brand/CompanyLogo";
import { ArrowLeft, Lock, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#202622] text-[#F3F0E8] flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between relative z-10">
        <CompanyLogo theme="dark" />
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-[#B49A68] hover:text-[#F3F0E8] font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Public Site</span>
        </Link>
      </div>

      {/* Main Admin Login Card */}
      <div className="max-w-md w-full mx-auto my-12 bg-[#252C27] border border-[#343B33] p-8 sm:p-10 shadow-2xl relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="w-4 h-4 text-[#B49A68]" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B49A68] font-semibold">
            Administrative Management
          </span>
        </div>

        <h1 className="font-display text-3xl text-[#F3F0E8] mb-2">Staff Sign In</h1>
        <p className="text-xs text-[#D9D2C4]/70 font-light mb-8">
          Restricted access for authorized construction managers and administrative personnel only.
        </p>

        <form className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-[0.14em] text-[#F3F0E8] font-semibold mb-2">
              Admin Identifier / Email
            </label>
            <input
              type="email"
              required
              placeholder="admin@[companydomain].com"
              className="w-full bg-[#202622] border border-[#343B33] px-4 py-3 text-sm text-[#F3F0E8] focus:outline-none focus:border-[#B49A68] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.14em] text-[#F3F0E8] font-semibold mb-2">
              Security Key / Password
            </label>
            <input
              type="password"
              required
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
              className="w-full bg-[#202622] border border-[#343B33] px-4 py-3 text-sm text-[#F3F0E8] focus:outline-none focus:border-[#B49A68] transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#B49A68] hover:bg-[#8e784f] text-[#202622] py-3.5 text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-md flex items-center justify-center gap-2"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Authenticate Session</span>
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#343B33] text-center text-xs text-[#D9D2C4]/50 font-mono">
          Public registration is disabled. Accounts are provisioned via database authority.
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-[#D9D2C4]/40 font-mono relative z-10">
        [COMPANY NAME] Internal Enterprise Console &bull; Security Level High
      </div>
    </div>
  );
}
