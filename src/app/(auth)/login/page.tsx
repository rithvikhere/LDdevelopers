import React from "react";
import Link from "next/link";
import { CompanyLogo } from "@/components/brand/CompanyLogo";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function CustomerLoginPage() {
  return (
    <div className="min-h-screen bg-[#F3F0E8] flex flex-col justify-between p-6 sm:p-12 text-[#202622]">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <CompanyLogo theme="light" />
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-[#526653] hover:text-[#202622] font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto my-12 bg-[#FFFFFF] border border-[#D9D2C4] p-8 sm:p-10 shadow-xl">
        <div className="mb-8">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#526653] font-semibold block mb-1">
            Client Portal
          </span>
          <h1 className="font-display text-3xl text-[#202622]">Client Login</h1>
          <p className="text-xs text-[#202622]/70 font-light mt-1">
            Access your construction enquiries and track architectural progress.
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-[0.14em] text-[#202622] font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="client@example.com"
              className="w-full bg-[#F3F0E8]/40 border border-[#D9D2C4] px-4 py-3 text-sm text-[#202622] focus:outline-none focus:border-[#526653] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.14em] text-[#202622] font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
              className="w-full bg-[#F3F0E8]/40 border border-[#D9D2C4] px-4 py-3 text-sm text-[#202622] focus:outline-none focus:border-[#526653] transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#526653] hover:bg-[#343B33] text-[#F3F0E8] py-3.5 text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 shadow-md flex items-center justify-center gap-2"
          >
            <span>Sign In</span>
            <ArrowUpRight className="w-4 h-4 text-[#B49A68]" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#D9D2C4] text-center text-xs text-[#202622]/70">
          Do not have an account yet?{" "}
          <Link
            href="/register"
            className="text-[#526653] font-semibold hover:underline ml-1"
          >
            Register Here
          </Link>
        </div>
      </div>

      {/* Footer Notice */}
      <div className="text-center text-xs text-[#202622]/50 font-mono">
        [COMPANY NAME] Architecture &amp; Developments &bull; Secure Authentication
      </div>
    </div>
  );
}
