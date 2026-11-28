import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gem, House, Lightbulb, ShieldCheck, Users, type LucideIcon } from "lucide-react";
import { heroSerif } from "@/components/landing/hero-fonts";
import { siteAssets } from "@/config/site-assets";
import { siteContent } from "@/config/site-content";
import { LowSkyline, PortraitPlaceholder, TowerSkyline } from "@/components/pages/about/AboutArt";

const { hero, founder, story, values, vision, mission } = siteContent.aboutPage;
const images = siteAssets.aboutPage;

const VALUE_ICONS: Record<(typeof values.items)[number]["icon"], LucideIcon> = {
  trust: ShieldCheck,
  quality: Gem,
  innovation: Lightbulb,
  customer: Users,
};

/** Small uppercase label with an orange rule, as in the reference. */
const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#3B4037]">
    <span aria-hidden="true" className="h-px w-8 bg-[#E67514]" />
    {children}
  </p>
);

const headingClass = `${heroSerif.className} font-bold leading-[1.08] tracking-[-0.01em] text-[#212121]`;

/**
 * About page (/about), after the developer's reference:
 *   1. Sage hero: "Building Better. Together." with the house cut-out standing on the edge of the paper body.
 *   2. Founder's message: arched photo frame, message, signature + name, and a short "our goal" card.
 *   3. Our story, the construction illustration, and the four values.
 *   4. Vision & mission band with a line-drawn skyline.
 * Static by design (the page shell already fades the page in). Founder photo, name and signature are
 * placeholders until the client supplies them (siteContent.aboutPage / siteAssets.aboutPage).
 */
export const AboutPageContent: React.FC = () => (
  <>
    {/* 1 · Hero (on the sage page background) */}
    <section aria-labelledby="about-title" className="relative z-10">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-end gap-y-4 px-4 sm:px-6 lg:grid-cols-12 lg:gap-x-8 lg:px-12">
        <div className="pt-6 sm:pt-10 lg:col-span-6 lg:self-center lg:pb-16 lg:pt-4 xl:col-span-5">
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 id="about-title" className={`${headingClass} mt-6 text-[clamp(2.2rem,11.2vw,4.4rem)] lg:text-[clamp(3.2rem,4.5vw,4.1rem)]`}>
            <span className="block whitespace-nowrap">{hero.title}</span>
            <span className="block bg-[linear-gradient(100deg,#E67514_0%,#C25A0B_55%,#A84C09_100%)] bg-clip-text pb-[0.06em] text-transparent">
              {hero.titleAccent}
            </span>
          </h1>
          <p className="mt-6 max-w-[30rem] text-[17px] leading-[1.65] text-[#3B4037]">{hero.lead}</p>
          <Link
            href={hero.cta.href}
            className="group mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#06923E] pl-6 pr-5 text-[15px] font-semibold text-white transition-colors hover:bg-[#212121] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E67514]"
          >
            {hero.cta.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>

        {/* The house stands on the line where the sage meets the paper body: the image's transparent strip
            below the slab (≈14% of its height ≈ 9.3% of its width) hangs over the next section. */}
        <div className="relative lg:col-span-6 xl:col-span-7">
          <Image
            src={images.house.src}
            width={images.house.width}
            height={images.house.height}
            alt="A modern two-storey home with a roof terrace, garden planters and a garage"
            priority
            quality={92}
            sizes="(min-width: 1440px) 820px, (min-width: 1280px) 57vw, (min-width: 1024px) 50vw, 100vw"
            className="relative -mb-[9.3%] h-auto w-full"
          />
        </div>
      </div>
    </section>

    <div className="bg-[#F5F7F0]">
      {/* 2 · Founder's message */}
      <section aria-labelledby="founder-title" className="mx-auto max-w-[1440px] px-4 pt-20 sm:px-6 lg:px-12 lg:pt-28">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 lg:gap-8">
          <FounderPhoto className="md:col-span-5 xl:col-span-4" />

          <div className="md:col-span-7 xl:col-span-5 xl:pl-4">
            <Eyebrow>{founder.eyebrow}</Eyebrow>
            <h2 id="founder-title" className={`${headingClass} mt-5 text-[clamp(2rem,6vw,2.6rem)] md:text-[2.05rem] lg:text-[clamp(2.2rem,3vw,2.75rem)]`}>
              {founder.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-6 max-w-[34rem] text-[17px] leading-[1.7] text-[#50564D]">{founder.message}</p>

            <div className="mt-8">
              {images.founderSignature ? (
                <Image src={images.founderSignature} alt="" width={240} height={80} className="h-14 w-auto" />
              ) : (
                <div className="flex h-14 w-48 items-center justify-center rounded-xl border border-dashed border-[#2F4E26]/35 text-sm text-[#50564D]">
                  {founder.signatureLabel}
                </div>
              )}
              <p className={`${heroSerif.className} mt-4 text-lg font-semibold text-[#212121]`}>{founder.name}</p>
              <p className="mt-1 flex items-center gap-2 text-sm text-[#50564D]">
                <span aria-hidden="true" className="h-px w-5 bg-[#E67514]" />
                {founder.role}
              </p>
            </div>
          </div>

          {/* "Our goal" card: a column beside the message on wide screens, a full-width row below it otherwise */}
          <aside className="flex flex-col items-center overflow-hidden rounded-[28px] bg-[#DDE7CE] px-8 pt-10 text-center md:col-span-12 md:flex-row md:items-end md:justify-between md:gap-10 md:px-12 md:pt-10 md:text-left xl:col-span-3 xl:flex-col xl:items-center xl:justify-start xl:gap-0 xl:px-8 xl:text-center">
            <div className="flex flex-col items-center md:items-start md:pb-10 xl:items-center xl:pb-0">
              <House className="h-10 w-10 text-[#2F4E26]" strokeWidth={1.5} aria-hidden="true" />
              <p className="mt-5 max-w-[16rem] text-[17px] leading-[1.6] text-[#2B3027] md:max-w-[22rem] xl:max-w-[16rem]">{founder.goal}</p>
              <span aria-hidden="true" className="mt-5 h-0.5 w-10 rounded-full bg-[#E67514]" />
            </div>
            <LowSkyline className="mt-8 w-full max-w-[22rem] text-[#2F4E26]/40 md:mt-0 md:w-[46%] xl:mt-8 xl:w-full" />
          </aside>
        </div>
      </section>

      {/* 3 · Our story + values */}
      <section
        id="our-story"
        aria-labelledby="story-title"
        className="mx-auto max-w-[1440px] scroll-mt-24 px-4 pt-20 sm:px-6 lg:px-12 lg:pt-28"
      >
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 lg:gap-8">
          <div className="md:col-span-6 xl:col-span-4">
            <Eyebrow>{story.eyebrow}</Eyebrow>
            <h2 id="story-title" className={`${headingClass} mt-5 text-[clamp(2rem,6vw,2.6rem)] md:text-[2.05rem] lg:text-[clamp(2.2rem,3vw,2.75rem)]`}>
              {story.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-6 max-w-[32rem] text-[17px] leading-[1.7] text-[#50564D]">{story.body}</p>
            <Link
              href={story.cta.href}
              className="group mt-8 inline-flex min-h-12 items-center gap-3 rounded-full border border-[#2F4E26]/40 pl-6 pr-5 text-[15px] font-semibold text-[#212121] transition-colors hover:border-[#212121] hover:bg-[#212121] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E67514]"
            >
              {story.cta.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>

          {/* A tower going up: the cut-out photo stands on a rounded sage card, its crown and crane rising
              above the card's top edge (the same "breaking the frame" idea as the hero house and the portrait). */}
          <div className="md:col-span-6 xl:col-span-5">
            <div className="relative mx-auto aspect-[1976/2200] w-full max-w-[560px]">
              <div className="absolute inset-x-0 bottom-0 top-[36%] rounded-[28px] bg-[linear-gradient(180deg,#E9EFDE_0%,#D2DFBE_100%)]" />
              <Image
                src={images.storyPhoto.src}
                width={images.storyPhoto.width}
                height={images.storyPhoto.height}
                alt="A concrete tower under construction with a tower crane beside it"
                sizes="(min-width: 1280px) 560px, (min-width: 768px) 50vw, 100vw"
                quality={92}
                className="absolute inset-0 h-full w-full object-contain object-bottom [clip-path:inset(0_round_0_0_28px_28px)]"
              />
            </div>
          </div>

          <div className="md:col-span-12 xl:col-span-3 xl:pl-4">
            <Eyebrow>{values.eyebrow}</Eyebrow>
            <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 xl:grid-cols-2">
              {values.items.map(({ icon, label }) => {
                const Icon = VALUE_ICONS[icon];
                return (
                  <li key={label} className="flex flex-col items-center text-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#DDE7CE] text-[#2F4E26]">
                      <Icon className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <span className="mt-3 max-w-[9rem] text-[15px] font-medium leading-snug text-[#2B3027]">{label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* 4 · Vision & mission */}
      <section aria-label="Our vision and mission" className="mx-auto max-w-[1440px] px-4 pb-20 pt-20 sm:px-6 lg:px-12 lg:pb-28 lg:pt-28">
        <div className="relative overflow-hidden rounded-[32px] bg-[#DDE7CE] px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1px_1fr] xl:grid-cols-[1fr_1px_1fr_15rem]">
            <Statement {...vision} />
            <span aria-hidden="true" className="hidden bg-[#2F4E26]/20 lg:block" />
            <Statement {...mission} />
            <TowerSkyline className="-mb-14 hidden w-full self-end text-[#2F4E26]/50 xl:block" />
          </div>
        </div>
      </section>
    </div>
  </>
);

const Statement: React.FC<{ eyebrow: string; title: string[]; body: string }> = ({ eyebrow, title, body }) => (
  <div>
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2 className={`${headingClass} mt-5 text-[clamp(1.75rem,5vw,2.2rem)] lg:text-[clamp(1.75rem,2.2vw,2.2rem)]`}>
      {title.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </h2>
    <p className="mt-5 max-w-[30rem] text-base leading-[1.7] text-[#3B4037]">{body}</p>
  </div>
);

/** One L-shaped crop mark, as at the corners of an architect's drawing sheet. */
const CropMark: React.FC<{ className: string }> = ({ className }) => (
  <span aria-hidden="true" className={`absolute h-4 w-4 border-[#2F4E26]/45 ${className}`} />
);

/**
 * The founder's portrait set against an architect's drawing sheet: a sage panel with a fine drafting grid,
 * crop marks at its corners and a dimension line down one side. The portrait (a transparent cut-out works
 * best) stands in front and rises over the top edge of the sheet. A drawn figure stands in until the
 * photo is supplied.
 */
const FounderPhoto: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`mx-auto w-full max-w-[300px] px-3 sm:max-w-[360px] md:mx-0 md:max-w-[400px] ${className}`}>
    <div className="relative aspect-[4/5]">
      {/* the drawing sheet (the lower 78% of the frame) */}
      <div className="absolute inset-x-0 bottom-0 top-[22%]">
        <div className="absolute inset-0 rounded-[20px] bg-[#DDE7CE] bg-[linear-gradient(rgba(47,78,38,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(47,78,38,0.07)_1px,transparent_1px)] bg-[size:22px_22px] shadow-[inset_0_0_0_1px_rgba(47,78,38,0.12)]" />
        <CropMark className="-left-3 -top-3 border-l border-t" />
        <CropMark className="-right-3 -top-3 border-r border-t" />
        <CropMark className="-bottom-3 -left-3 border-b border-l" />
        <CropMark className="-bottom-3 -right-3 border-b border-r" />
        {/* dimension line with end ticks and an orange node */}
        <span aria-hidden="true" className="absolute bottom-6 left-5 top-6 w-px bg-[#2F4E26]/35">
          <span className="absolute -left-1.5 top-0 h-px w-3 bg-[#2F4E26]/45" />
          <span className="absolute -left-1.5 bottom-0 h-px w-3 bg-[#2F4E26]/45" />
          <span className="absolute -left-[3px] top-1/2 h-[7px] w-[7px] -translate-y-1/2 bg-[#E67514]" />
        </span>
      </div>

      {images.founderPhoto ? (
        <Image
          src={images.founderPhoto}
          alt={`${founder.name}, ${founder.role}`}
          fill
          sizes="400px"
          className="object-contain object-bottom"
        />
      ) : (
        <>
          <PortraitPlaceholder className="absolute inset-0 h-full w-full" />
          <span className="absolute bottom-4 right-4 rounded-full bg-[#F5F7F0]/90 px-3 py-1 text-xs text-[#50564D]">
            {founder.photoLabel}
          </span>
        </>
      )}
    </div>
  </div>
);
