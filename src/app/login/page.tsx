"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CompanyLogo } from "@/components/brand/CompanyLogo";
import { loginAction } from "@/app/actions/auth";
import { ArrowLeft, Lock, Mail, Shield, ArrowRight, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@lddevelopers.com");
  const [password, setPassword] = useState("DemoSecure@2026");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", "admin");

    startTransition(async () => {
      const res = await loginAction(null, formData);
      if (res.success && res.redirectUrl) {
        router.push(res.redirectUrl);
      } else {
        setError(res.error || "Authentication failed. Please verify administrator credentials.");
      }
    });
  };

  const handleQuickDemoAdmin = () => {
    const demoEmail = "admin@lddevelopers.com";
    setEmail(demoEmail);
    setPassword("DemoSecure@2026");
    setError(null);

    const formData = new FormData();
    formData.append("email", demoEmail);
    formData.append("password", "DemoSecure@2026");
    formData.append("role", "admin");

    startTransition(async () => {
      const res = await loginAction(null, formData);
      if (res.success && res.redirectUrl) {
        router.push(res.redirectUrl);
      } else {
        setError(res.error || "Failed to start admin session.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F0E7] text-[#252A26] flex flex-col justify-between selection:bg-[#B89A60]/30 selection:text-[#1D2923]">
      {/* Top Header */}
      <header className="border-b border-[#DDD6C8] bg-[#FAF9F5]/80 backdrop-blur-md px-6 lg:px-12 py-5 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-[#69716C] hover:text-[#252A26] transition-colors">
          <ArrowLeft className="w-3.5 h-3.5 text-[#B89A60]" />
          <span>Return to Studio</span>
        </Link>
        <CompanyLogo theme="light" />
        <div className="w-24 hidden sm:block" />
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-12">
        <div className="w-full max-w-md bg-[#FAF9F5] border border-[#DDD6C8] shadow-sm p-6 sm:p-10 relative isolate">
          {/* Subtle Top Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#506653] via-[#B89A60] to-[#506653]" />

          {/* Heading */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-[#B89A60] mb-2 font-medium">
              <Shield className="w-3.5 h-3.5 text-[#B89A60]" />
              <span>STUDIO GOVERNANCE</span>
            </div>
            <h1 className="font-display text-3xl font-light text-[#252A26] tracking-tight">
              Admin Dashboard Login
            </h1>
            <p className="text-xs text-[#69716C] font-light mt-2 leading-relaxed">
              Administrative portal for managing client construction enquiries, architectural briefs, and commission workflows.
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-3 bg-red-50/80 border border-red-200 text-red-700 text-xs font-light rounded-xs leading-relaxed">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] font-mono tracking-wider text-[#69716C] uppercase mb-1.5 font-medium">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8C938E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@lddevelopers.com"
                  className="w-full bg-[#FAF9F5] border border-[#DDD6C8] focus:border-[#506653] focus:ring-1 focus:ring-[#506653] text-[#252A26] text-sm pl-10 pr-3.5 py-2.5 transition-colors placeholder:text-[#A7ADA9] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono tracking-wider text-[#69716C] uppercase mb-1.5 font-medium">
                Security Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8C938E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#FAF9F5] border border-[#DDD6C8] focus:border-[#506653] focus:ring-1 focus:ring-[#506653] text-[#252A26] text-sm pl-10 pr-3.5 py-2.5 transition-colors placeholder:text-[#A7ADA9] outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-[#1D2923] hover:bg-[#506653] active:scale-[0.99] disabled:opacity-60 text-[#FAF9F5] py-3.5 text-xs font-semibold uppercase tracking-[0.2em] border border-[#B89A60]/40 transition-all duration-200 cursor-pointer shadow-xs"
            >
              <span>{isPending ? "AUTHENTICATING..." : "SIGN IN AS ADMIN"}</span>
              <ArrowRight className="w-4 h-4 text-[#B89A60]" />
            </button>
          </form>

          {/* Quick 1-Click Demo Admin Button */}
          <div className="mt-8 pt-6 border-t border-[#DDD6C8]/60">
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#69716C] mb-3 text-center">
              Instant Access
            </div>
            <button
              type="button"
              onClick={handleQuickDemoAdmin}
              disabled={isPending}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-[#EBE5D8] hover:bg-[#DDD6C8] border border-[#DDD6C8] text-xs font-mono tracking-wider text-[#252A26] transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#506653]" />
              <span>One-Click Principal Admin Demo</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#DDD6C8] bg-[#FAF9F5] py-4 px-6 text-center text-[11px] font-mono text-[#69716C]">
        [COMPANY NAME] ARCHITECTURAL PLATFORM &copy; {new Date().getFullYear()} — CONFIDENTIAL &amp; PROPRIETARY
      </footer>
    </div>
  );
}
