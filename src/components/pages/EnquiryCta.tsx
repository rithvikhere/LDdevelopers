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
      <div className="border-t border-[#212121]/20 pt-10 sm:pt-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end">
        <div className="md:col-span-8">
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.28em] text-[#212121] font-semibold">
            {eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-light tracking-tight text-[#212121] leading-tight">
            {title}
          </h2>
          <p className="mt-3 max-w-xl text-xs sm:text-sm font-light leading-relaxed text-[#212121]/75">
            {description}
          </p>
        </div>
        <div className="md:col-span-4 md:flex md:justify-end">
          <Link
            href="/#enquiry"
            className="group inline-flex w-full md:w-auto items-center justify-center gap-3 bg-[#06923E] hover:bg-[#212121] border border-[#06923E] hover:border-[#212121] text-white px-7 py-4 text-xs font-mono uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-xl outline-none focus-visible:ring-1 focus-visible:ring-[#E67514] focus-visible:ring-offset-4 focus-visible:ring-offset-[#CADCAE]"
          >
            <span>{label}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white group-hover:text-[#E67514] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);
