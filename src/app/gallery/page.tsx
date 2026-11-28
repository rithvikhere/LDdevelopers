import type { Metadata } from "next";
import { PageShell } from "@/components/pages/PageShell";
import { GalleryPageContent } from "@/components/pages/gallery/GalleryPageContent";

export const metadata: Metadata = {
  title: "Gallery — Lakshmi Builders & Developers",
  description: "Homes, villas and commercial spaces built by Lakshmi Builders & Developers.",
};

export default function GalleryPage() {
  return (
    <PageShell>
      <GalleryPageContent />
    </PageShell>
  );
}
