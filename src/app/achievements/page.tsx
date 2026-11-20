import type { Metadata } from "next";
import { PageShell } from "@/components/pages/PageShell";
import { AchievementsSection } from "@/components/landing/AchievementsSection";
import { EnquiryCta } from "@/components/pages/EnquiryCta";

export const metadata: Metadata = {
  title: "Achievements — [COMPANY NAME]",
  description: "Completed projects, company experience, and verified milestones.",
};

export default function AchievementsPage() {
  return (
    <PageShell>
      <AchievementsSection compact />
      <EnquiryCta
        eyebrow="Start your project"
        title="Ready to discuss your plot?"
        description="Tell us about your site and the kind of building you have in mind through the enquiry form."
        label="Start an Enquiry"
      />
    </PageShell>
  );
}
