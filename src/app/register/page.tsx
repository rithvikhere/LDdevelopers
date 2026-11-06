"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CompanyLogo } from "@/components/brand/CompanyLogo";
import { registerAction } from "@/app/actions/auth";
import { ArrowLeft, Lock, Mail, Phone, User, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);

    startTransition(async () => {
      const res = await registerAction(null, formData);
      if (res.success && res.redirectUrl) {
        router.push(res.redirectUrl);
      } else {
        setError(res.error || "Registration failed. Please check your details.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#0B0F0D] text-[#F5F3EF] flex flex-col justify-between selection:bg-[#C5B083] selection:text-[#0B0F0D]">
      {/* Top Header */}
      <header className="border-b border-[#24322A] bg-[#0B0F0D]/80 backdrop-blur-md px-6 lg:px-12 py-5 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-[#9EA8A1] hover:text-[#F5F3EF] transition-colors">
          <ArrowLeft className="w-3.5 h-3.5 text-[#C5B083]" />
          <span>Return to Studio</span>
        </Link>
        <CompanyLogo theme="dark" />
        <div className="w-24 hidden sm:block" />
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-12">
        <div className="w-full max-w-md bg-[#121815] border border-[#24322A] p-6 sm:p-10 relative isolate">
          {/* Subtle Top Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2E5A44] via-[#C5B083] to-[#2E5A44]" />

          {/* Heading */}
          <div className="mb-8">
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C5B083] mb-2 font-medium">
              CLIENT REGISTRATION
            </div>
            <h1 className="font-display text-3xl font-light text-[#F5F3EF] tracking-tight">
              Create Client Account
            </h1>
            <p className="text-xs text-[#9EA8A1] font-light mt-2 leading-relaxed">
              Register to access your personal construction portal, track project milestones, and submit architectural briefs.
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-3 bg-red-950/40 border border-red-800/60 text-red-300 text-xs font-light leading-relaxed">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono tracking-wider text-[#9EA8A1] uppercase mb-1">
                Full Legal Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#9EA8A1]/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g., Vikramaditya Sharma"
                  className="w-full bg-[#17201B] border border-[#24322A] focus:border-[#C5B083] text-[#F5F3EF] text-sm pl-10 pr-3.5 py-2.5 transition-colors placeholder:text-[#9EA8A1]/40 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono tracking-wider text-[#9EA8A1] uppercase mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#9EA8A1]/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vikram@example.com"
                  className="w-full bg-[#17201B] border border-[#24322A] focus:border-[#C5B083] text-[#F5F3EF] text-sm pl-10 pr-3.5 py-2.5 transition-colors placeholder:text-[#9EA8A1]/40 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono tracking-wider text-[#9EA8A1] uppercase mb-1">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#9EA8A1]/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98450 12345"
                  className="w-full bg-[#17201B] border border-[#24322A] focus:border-[#C5B083] text-[#F5F3EF] text-sm pl-10 pr-3.5 py-2.5 transition-colors placeholder:text-[#9EA8A1]/40 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono tracking-wider text-[#9EA8A1] uppercase mb-1">
                Password (min. 8 characters) *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#9EA8A1]/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#17201B] border border-[#24322A] focus:border-[#C5B083] text-[#F5F3EF] text-sm pl-10 pr-3.5 py-2.5 transition-colors placeholder:text-[#9EA8A1]/40 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono tracking-wider text-[#9EA8A1] uppercase mb-1">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#9EA8A1]/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#17201B] border border-[#24322A] focus:border-[#C5B083] text-[#F5F3EF] text-sm pl-10 pr-3.5 py-2.5 transition-colors placeholder:text-[#9EA8A1]/40 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-4 inline-flex items-center justify-center gap-2 bg-[#2E5A44] hover:bg-[#17201B] border border-[#24322A] hover:border-[#C5B083] text-[#F5F3EF] py-3.5 text-xs font-mono font-medium uppercase tracking-[0.2em] transition-all duration-200 cursor-pointer"
            >
              <span>{isPending ? "CREATING ACCOUNT..." : "REGISTER CLIENT ACCOUNT"}</span>
              <ArrowRight className="w-4 h-4 text-[#C5B083]" />
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center text-xs text-[#9EA8A1]">
            Already hold an architectural account?{" "}
            <Link href="/login" className="text-[#C5B083] hover:text-[#F5F3EF] underline decoration-[#24322A] underline-offset-4">
              Sign in to Portal
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#24322A] bg-[#0B0F0D] py-4 px-6 text-center text-[10px] font-mono text-[#9EA8A1]">
        [COMPANY NAME] ARCHITECTURAL PLATFORM &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
