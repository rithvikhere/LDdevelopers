import type { Metadata } from "next";
import { PageShell } from "@/components/pages/PageShell";
import { AboutSection } from "@/components/landing/AboutSection";

export const metadata: Metadata = {
  title: "About — [COMPANY NAME]",
  description: "Company philosophy, vision, and approach.",
};

export default function AboutPage() {
  return (
    <PageShell>
      <AboutSection compact />
    </PageShell>
  );
}
