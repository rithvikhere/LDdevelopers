import React from "react";
import { GalleryGrid } from "@/components/pages/gallery/GalleryGrid";
import { heroSerif } from "@/components/landing/hero-fonts";
import { siteAssets } from "@/config/site-assets";
import { siteContent } from "@/config/site-content";
import { placeholderTiles, type GalleryTile } from "@/components/pages/gallery/placeholderTiles";

const copy = siteContent.galleryPage;

/** Real photos when the client has supplied them, otherwise the material-board placeholder tiles. */
const photos: GalleryTile[] = siteAssets.gallery.map((p) => ({
  id: p.id,
  img: p.src,
  width: p.width,
  height: p.height,
  title: p.title,
  description: p.description ?? "",
  alt: p.title,
}));
const usingPlaceholders = photos.length === 0;
const items = usingPlaceholders ? placeholderTiles(copy.placeholderCaption) : photos;

/**
 * Gallery page (/gallery): a short sage header in the About page's style, then the React Bits masonry on the
 * paper body — tiles animate in from below, zoom on hover, show captions on hover, open in a lightbox (arrow
 * keys / Esc) and can be dragged to reorder.
 */
export const GalleryPageContent: React.FC = () => (
  <>
    <section aria-labelledby="gallery-title" className="mx-auto max-w-[1440px] px-4 pb-14 pt-6 sm:px-6 sm:pt-10 lg:px-12 lg:pb-20">
      <p className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#3B4037]">
        <span aria-hidden="true" className="h-px w-8 bg-[#E67514]" />
        {copy.eyebrow}
      </p>
      <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
        <h1
          id="gallery-title"
          className={`${heroSerif.className} font-bold leading-[1.04] tracking-[-0.01em] text-[#212121] text-[clamp(2.4rem,9vw,4.1rem)] lg:col-span-7`}
        >
          {copy.title}
        </h1>
        <p className="max-w-[30rem] text-[17px] leading-[1.65] text-[#3B4037] lg:col-span-5 lg:justify-self-end lg:pb-2">
          {copy.lead}
        </p>
      </div>
    </section>

    <section aria-label="Project gallery" className="bg-[#F5F7F0]">
      <div className="mx-auto max-w-[1440px] px-4 pb-20 pt-10 sm:px-6 lg:px-12 lg:pb-28 lg:pt-14">
        {usingPlaceholders && (
          <p className="mb-8 inline-flex items-start gap-2.5 rounded-2xl bg-[#DDE7CE] px-4 py-2 text-sm leading-relaxed text-[#3B4037] sm:rounded-full">
            <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#E67514]" />
            {copy.pendingNote}
          </p>
        )}
        <GalleryGrid items={items} />
      </div>
    </section>
  </>
);
