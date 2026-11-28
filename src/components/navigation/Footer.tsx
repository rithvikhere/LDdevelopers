import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import { contactTelHref, contactWhatsappUrl } from "@/lib/contact-links";
import { siteAssets } from "@/config/site-assets";
import { siteContent, type FooterLink } from "@/config/site-content";

/** The logo files (same artwork as the hero lockup; kept local so the intro's outline data isn't bundled here). */
const MARK = { src: "/assets/brand/ld-mark.webp", width: 792, height: 986 };
const WORDMARK = { src: "/assets/brand/ld-wordmark.webp", width: 673, height: 234 };

/**
 * Footer — the final section on the homepage and the six content pages. Deliberately static (no animation).
 * A light "drawing sheet" card held to the dark #212121 board by two strips of masking tape: the logo and a
 * one-line description, then three short link columns. Below the card: copyright, legal links and contact icons.
 * The board colour continues the Design Desk's fade, so the homepage ends without a seam.
 */
export const Footer: React.FC = () => {
  const { footer, company } = siteContent;
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-20 bg-[#212121] text-[#D3ECCD]">
      <div className="mx-auto max-w-[1440px] px-4 pb-10 pt-14 sm:px-6 sm:pt-16 lg:px-12 lg:pb-12">
        {/* The taped sheet */}
        <div className="relative">
          <Tape className="-left-3 -top-3 w-24 -rotate-[32deg] sm:-left-5 sm:-top-4 sm:w-32" />
          <Tape className="-right-2 -top-5 w-24 rotate-[58deg] sm:-right-4 sm:w-32" />

          <div className="grid gap-x-8 gap-y-12 rounded-[28px] bg-[#F5F7F0] px-5 py-10 text-[#212121] shadow-[0_30px_60px_-34px_rgba(0,0,0,0.75)] sm:rounded-[36px] sm:px-10 sm:py-12 lg:px-14 lg:py-16 xl:grid-cols-12">
            {/* Brand */}
            <div className="xl:col-span-5">
              <Link
                href="/"
                aria-label={`${footer.brandName} — home`}
                className="inline-flex items-end gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E67514]"
              >
                <Image src={MARK.src} width={MARK.width} height={MARK.height} alt="" unoptimized className="h-11 w-auto" />
                <Image
                  src={WORDMARK.src}
                  width={WORDMARK.width}
                  height={WORDMARK.height}
                  alt=""
                  unoptimized
                  className="h-[2.475rem] w-auto translate-y-[5px]"
                />
              </Link>
              <p className="mt-7 max-w-[24rem] text-[17px] leading-[1.6] text-[#50564D]">{footer.tagline}</p>
              <p className="mt-5 text-sm text-[#50564D]">
                {footer.registrationLabel} <span className="text-[#212121]">{company.registrationNumberPlaceholder}</span>
              </p>
            </div>

            {/* Link columns */}
            <nav aria-label="Footer" className="grid grid-cols-1 gap-x-5 gap-y-10 min-[375px]:grid-cols-[1.2fr_1fr] sm:gap-x-6 md:grid-cols-3 xl:col-span-7 xl:pl-6">
              {footer.columns.map((column) => (
                <div key={column.title} className="min-[375px]:last:col-span-2 md:last:col-span-1">
                  <h2 className="text-[15px] font-medium uppercase tracking-[0.02em] text-[#5E645B]">{column.title}</h2>
                  <ul className="mt-5 space-y-2">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <FooterItem link={link} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom row, on the board */}
        <div className="mt-8 flex flex-col gap-6 px-1 sm:px-4 md:flex-row md:items-center md:justify-between lg:px-14">
          <div className="flex flex-col gap-3 text-sm text-[#D3ECCD]/80 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8">
            <p>
              &copy; {year} {footer.brandName}. {footer.rights}
            </p>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {footer.legal.map((link) => (
                <li key={link.label}>
                  <FooterItem link={link} onDark />
                </li>
              ))}
            </ul>
          </div>

          <ul className="flex items-center gap-2" aria-label="Contact and social links">
            <li>
              <SocialLink href={contactWhatsappUrl} label="Chat on WhatsApp" external>
                <WhatsAppIcon />
              </SocialLink>
            </li>
            <li>
              <SocialLink href={siteAssets.social.facebook} label="Facebook" external>
                <FacebookIcon />
              </SocialLink>
            </li>
            <li>
              <SocialLink href={siteAssets.social.instagram} label="Instagram" external>
                <InstagramIcon />
              </SocialLink>
            </li>
            <li>
              <SocialLink href={siteAssets.social.justdial} label="Justdial" external>
                <span aria-hidden="true" className="text-[13px] font-bold leading-none tracking-[-0.02em]">
                  Jd
                </span>
              </SocialLink>
            </li>
            <li>
              <SocialLink href={contactTelHref} label={`Call the studio, ${siteAssets.contact.phonePlaceholder}`}>
                <Phone className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
              </SocialLink>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

/** A link, or plain text with a "soon" pill when the page doesn't exist yet. */
const FooterItem: React.FC<{ link: FooterLink; onDark?: boolean }> = ({ link, onDark = false }) => {
  const text = onDark ? "text-[#D3ECCD]/80" : "text-[#3B4037]";
  if (link.soon) {
    return (
      <span className={`inline-flex items-center gap-2 py-1 ${onDark ? "text-sm" : "text-[15px] sm:text-base"} ${text}`}>
        {link.label}
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs ${onDark ? "bg-white/10 text-[#D3ECCD]/80" : "bg-[#E3E8DA] text-[#50564D]"}`}
        >
          soon
        </span>
      </span>
    );
  }
  return (
    <Link
      href={link.href}
      className={`inline-block rounded-sm py-1 underline-offset-[6px] decoration-[#E67514] decoration-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E67514] ${
        onDark ? `text-sm ${text} hover:text-[#D3ECCD]` : `text-[15px] sm:text-base ${text} hover:text-[#212121]`
      }`}
    >
      {link.label}
    </Link>
  );
};

const SocialLink: React.FC<{ href: string; label: string; external?: boolean; children: React.ReactNode }> = ({
  href,
  label,
  external = false,
  children,
}) => (
  <a
    href={href}
    aria-label={label}
    title={label}
    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[#D3ECCD] transition-colors hover:border-[#D3ECCD] hover:bg-[#D3ECCD] hover:text-[#212121] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E67514]"
  >
    {children}
  </a>
);

/** A strip of masking tape with torn ends, laid across a corner of the sheet. Decorative. */
const Tape: React.FC<{ className: string }> = ({ className }) => (
  <span
    aria-hidden="true"
    className={`pointer-events-none absolute z-10 block h-9 sm:h-11 [filter:drop-shadow(0_2px_2px_rgba(0,0,0,0.35))] ${className}`}
  >
    <span className="block h-full w-full bg-[#D8CAA4] bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.07)_0_2px,transparent_2px_5px),linear-gradient(180deg,rgba(255,255,255,0.22),rgba(255,255,255,0)_45%,rgba(0,0,0,0.07))] [clip-path:polygon(3%_0,97%_0,100%_14%,96.5%_30%,99.5%_46%,96%_62%,99%_78%,96.5%_100%,2.5%_100%,0_84%,3.5%_68%,0.5%_52%,4%_36%,1%_20%)]" />
  </span>
);

const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const WhatsAppIcon = () => (
  <svg {...iconProps}>
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

const FacebookIcon = () => (
  <svg {...iconProps}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg {...iconProps}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17.5 6.5h.01" />
  </svg>
);
