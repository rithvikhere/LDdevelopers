import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface EnquiryCtaProps {
  eyebrow: string;
  title: string;
  description: string;
  label: string;
}

/**
 * EnquiryCta — contextual call-to-action that sends visitors to the homepage enquiry form (/#enquiry).
 */
export const EnquiryCta: React.FC<EnquiryCtaProps> = ({ eyebrow, title, description, label }) => (
  <section className="relative z-10 pb-20 sm:pb-28">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
      <div className="border-t border-[#343B33] pt-10 sm:pt-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end">
        <div className="md:col-span-8">
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.28em] text-[#C5B083] font-semibold">
            {eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-light tracking-tight text-[#F3F0E8] leading-tight">
            {title}
          </h2>
          <p className="mt-3 max-w-xl text-xs sm:text-sm font-light leading-relaxed text-[#9EA8A1]">
            {description}
          </p>
        </div>
        <div className="md:col-span-4 md:flex md:justify-end">
          <Link
            href="/#enquiry"
            className="group inline-flex w-full md:w-auto items-center justify-center gap-3 bg-[#F5F2EB] hover:bg-[#526653] hover:text-[#F5F3EF] text-[#0B0F0D] px-7 py-4 text-xs font-mono uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-xl outline-none focus-visible:ring-1 focus-visible:ring-[#C5B083] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0B0F0D]"
          >
            <span>{label}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#526653] group-hover:text-[#C5B083] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);
