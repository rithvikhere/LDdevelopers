"use client";

import React from "react";
import Link from "next/link";
import { MotionConfig, motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { siteContent } from "@/config/site-content";
import {
  BuildingTrio,
  DraftingRing,
  GalleryPrints,
  KeystoneArch,
  PlotBlocks,
  Rosette,
} from "@/components/landing/explore/ExploreIllustrations";

const MotionLink = motion.create(Link);

// The card lifts and grows slightly; its illustration (which inherits these variants) does its own bounce.
const cardMotion: Variants = {
  rest: { scale: 1, y: 0, transition: { type: "spring", stiffness: 320, damping: 26 } },
  hover: { scale: 1.02, y: -4, transition: { type: "spring", stiffness: 320, damping: 20 } },
};

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
};

/* Surface textures — each card is a different building material (solid colour underneath as a fallback) */
const grain =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")";
const brick =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='28'%3E%3Cpath d='M0 .5H56M0 14.5H56M.5 0V14M28.5 14V28' fill='none' stroke='%23212121' stroke-opacity='.09'/%3E%3C/svg%3E\")";

const surfaces = {
  // sage plaster
  about: {
    backgroundColor: "#D3ECCD",
    backgroundImage: `${grain}, radial-gradient(120% 95% at 0% 0%, #E6F5E1 0%, #D3ECCD 48%, #BEDCB5 100%)`,
    backgroundBlendMode: "soft-light, normal",
  },
  // forest green with blueprint lines
  services: {
    backgroundColor: "#14532D",
    backgroundImage:
      "linear-gradient(rgba(211,236,205,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(211,236,205,0.07) 1px, transparent 1px), radial-gradient(130% 130% at 100% 100%, #1D6E3D 0%, #14532D 55%, #0E3F22 100%)",
    backgroundSize: "26px 26px, 26px 26px, auto",
  },
  // terracotta brickwork
  options: {
    backgroundColor: "#E67514",
    backgroundImage: `${brick}, linear-gradient(160deg, #EF8C36 0%, #E67514 52%, #D0640C 100%)`,
  },
  // charcoal, lit from above
  gallery: {
    backgroundColor: "#2A2A2A",
    backgroundImage: "radial-gradient(110% 70% at 50% 0%, rgba(211,236,205,0.13) 0%, rgba(211,236,205,0) 62%), linear-gradient(180deg, #2E2E2E 0%, #262626 100%)",
  },
  // brushed brass
  achievements: {
    backgroundColor: "#D5A94C",
    backgroundImage:
      "repeating-linear-gradient(0deg, rgba(255,255,255,0.07) 0 1px, transparent 1px 3px), linear-gradient(115deg, #E8C873 0%, #D5A94C 48%, #B98A31 100%)",
  },
} satisfies Record<string, React.CSSProperties>;

const CardLink: React.FC<{
  href: string;
  className: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ href, className, style, children }) => (
  <MotionLink
    href={href}
    initial="rest"
    animate="rest"
    whileHover="hover"
    whileFocus="hover"
    whileTap="hover"
    variants={cardMotion}
    style={style}
    className={`group relative isolate flex h-full w-full overflow-hidden rounded-[28px] outline-none focus-visible:ring-2 focus-visible:ring-[#E67514] focus-visible:ring-offset-4 focus-visible:ring-offset-[#212121] cursor-pointer ${className}`}
  >
    {children}
  </MotionLink>
);

const Title: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = "", children }) => (
  <h3 className={`font-display font-medium tracking-[-0.01em] leading-[0.95] ${className}`}>{children}</h3>
);

const Line: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = "", children }) => (
  <p className={`mt-3 text-[15px] leading-snug ${className}`}>{children}</p>
);

/** Round arrow — turns from ↗ to → as its card is hovered. */
const ArrowChip: React.FC<{ className: string; icon?: string }> = ({ className, icon = "w-5 h-5" }) => (
  <span aria-hidden="true" className={`grid shrink-0 place-items-center rounded-full ${className}`}>
    <motion.span
      className="grid place-items-center"
      variants={{ rest: { rotate: 0 }, hover: { rotate: 45 } }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
    >
      <ArrowUpRight className={icon} strokeWidth={1.75} />
    </motion.span>
  </span>
);

/**
 * ExploreBento — Section 02's destinations as an interlocking bento of five cards, each its own material,
 * size and illustration. Contact is not listed here (it is Section 03, right below).
 *
 *   Construction Options is the most visited destination, so it gets the largest card.
 *
 *   lg (12 cols)                                      md (2 cols)            phones (1 col)
 *   [ Options 5×2 ][ Services 7×1            ]        [ Options ×2    ]      Options
 *   [ Options     ][ About 4×1 ][ Gallery 3×2 ]       [ Services ][Gal]      Services
 *   [ Achievements 9×1        ][ Gallery    ]         [ About    ][   ]      About
 *                                                     [ Achievements  ]      Gallery · Achievements
 */
export const ExploreBento: React.FC = () => {
  const cards = Object.fromEntries(siteContent.explore.cards.map((c) => [c.id, c]));
  const { about, services, gallery, achievements } = cards;
  const options = cards["construction-options"];

  return (
    <MotionConfig reducedMotion="user">
      <nav aria-label="Explore the website">
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          variants={{ show: { transition: { staggerChildren: 0.07 } } }}
          className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:auto-rows-[250px] lg:grid-cols-12 lg:auto-rows-[228px] xl:auto-rows-[244px]"
        >
          {/* Construction Options — the most visited page, so the largest card: terracotta brickwork, blocks on a plot */}
          <motion.li
            variants={reveal}
            data-reveal
            className="min-h-[360px] md:min-h-0 md:col-span-2 lg:col-span-5 lg:row-span-2 lg:col-start-1 lg:row-start-1"
          >
            <CardLink href={options.href} style={surfaces.options} className="flex-col justify-between p-7 sm:p-9 lg:p-10 text-[#212121]">
              <div className="relative max-w-[88%] md:max-w-[52%] lg:max-w-[86%]">
                <Title className="text-[2.75rem] sm:text-6xl md:text-5xl lg:text-[3.4rem] xl:text-[4.25rem]">{options.label}</Title>
                <Line className="text-[#212121]">{options.line}</Line>
              </div>
              <ArrowChip className="relative w-12 h-12 bg-[#212121] text-[#FBE2C8]" />
              <PlotBlocks className="absolute -right-1 bottom-1 w-[64%] max-w-[340px] md:w-[33%] md:right-6 lg:w-[80%] lg:max-w-[430px] lg:-right-3 lg:bottom-3" />
            </CardLink>
          </motion.li>

          {/* Services — forest green, house · villa · tower */}
          <motion.li
            variants={reveal}
            data-reveal
            className="min-h-[260px] md:min-h-0 md:col-start-1 md:row-start-2 lg:col-span-7 lg:col-start-6 lg:row-start-1"
          >
            <CardLink href={services.href} style={surfaces.services} className="flex-col justify-between p-7 sm:p-9 text-[#D3ECCD]">
              <div className="relative max-w-[56%] lg:max-w-[44%]">
                <Title className="text-[2.6rem] sm:text-5xl">{services.label}</Title>
                <Line className="text-[#D3ECCD]/80">{services.line}</Line>
              </div>
              <ArrowChip className="relative w-12 h-12 bg-[#D3ECCD] text-[#14532D]" />
              <BuildingTrio className="absolute right-3 bottom-3 w-[58%] max-w-[390px] md:w-[62%] lg:w-[52%] lg:right-8" />
            </CardLink>
          </motion.li>

          {/* About — sage plaster, stone arch */}
          <motion.li
            variants={reveal}
            data-reveal
            className="min-h-[260px] md:min-h-0 md:col-start-1 md:row-start-3 lg:col-span-4 lg:col-start-6 lg:row-start-2"
          >
            <CardLink href={about.href} style={surfaces.about} className="flex-col justify-between p-7 sm:p-8 text-[#212121]">
              <DraftingRing className="absolute -z-10 -right-24 -bottom-44 w-[360px] lg:w-[400px]" />
              <div className="relative max-w-[56%]">
                <Title className="text-[2.6rem] sm:text-5xl">{about.label}</Title>
                <Line className="text-[#212121]/75">{about.line}</Line>
              </div>
              <ArrowChip className="relative w-12 h-12 bg-[#212121] text-[#D3ECCD]" />
              <KeystoneArch className="absolute right-3 bottom-2 w-[44%] max-w-[205px]" />
            </CardLink>
          </motion.li>

          {/* Gallery — charcoal, three prints of the house */}
          <motion.li
            variants={reveal}
            data-reveal
            className="min-h-[470px] md:min-h-0 md:col-start-2 md:row-start-2 md:row-span-2 lg:col-span-3 lg:col-start-10 lg:row-start-2 lg:row-span-2"
          >
            <CardLink href={gallery.href} style={surfaces.gallery} className="flex-col justify-end p-7 sm:p-8 text-[#D3ECCD] ring-1 ring-inset ring-white/[0.07]">
              <GalleryPrints className="absolute inset-x-4 top-7 h-[62%]" />
              <div className="relative">
                <Title className="text-[2.6rem] sm:text-5xl">{gallery.label}</Title>
                <Line className="text-[#D3ECCD]/75">{gallery.line}</Line>
                <ArrowChip className="mt-6 w-12 h-12 bg-[#D3ECCD] text-[#212121]" />
              </div>
            </CardLink>
          </motion.li>

          {/* Achievements — brushed brass, medal on a ribbon */}
          <motion.li
            variants={reveal}
            data-reveal
            className="min-h-[260px] md:min-h-0 md:col-span-2 md:row-start-4 lg:col-span-9 lg:col-start-1 lg:row-start-3"
          >
            <CardLink href={achievements.href} style={surfaces.achievements} className="flex-col justify-between p-7 sm:p-9 text-[#212121]">
              {/* A sheen that sweeps across the brass on hover */}
              <motion.span
                aria-hidden="true"
                className="absolute -z-10 inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                variants={{
                  rest: { x: "-160%", transition: { duration: 0 } },
                  hover: { x: "420%", transition: { duration: 1.1, ease: [0.4, 0, 0.2, 1] } },
                }}
              />
              <div className="relative max-w-[66%] sm:max-w-[55%] lg:max-w-[40%]">
                <Title className="text-[2.3rem] sm:text-5xl">{achievements.label}</Title>
                <Line className="text-[#212121]/80">{achievements.line}</Line>
              </div>
              <ArrowChip
                className="relative w-12 h-12 bg-[#212121] text-[#E8C873] lg:absolute lg:right-9 lg:top-1/2 lg:-translate-y-1/2 lg:w-16 lg:h-16"
                icon="w-5 h-5 lg:w-6 lg:h-6"
              />
              <Rosette className="absolute top-0 -right-1 h-[68%] sm:h-[86%] sm:right-[14%] md:right-[22%] lg:h-full lg:right-[24%]" />
            </CardLink>
          </motion.li>
        </motion.ul>
      </nav>
    </MotionConfig>
  );
};
