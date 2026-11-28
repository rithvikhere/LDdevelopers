import type { Metadata } from "next";
import { PageShell } from "@/components/pages/PageShell";
import { AboutPageContent } from "@/components/pages/about/AboutPageContent";

export const metadata: Metadata = {
  title: "About — Lakshmi Builders & Developers",
  description:
    "Who we are and how we build: the founder's message, our story, our values, and our vision and mission.",
};

export default function AboutPage() {
  return (
    <PageShell>
      <AboutPageContent />
    </PageShell>
  );
}
