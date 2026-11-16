import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";
import { WorksGallery } from "@/components/works-gallery";

export const metadata: Metadata = {
  title: "Works",
  description: "Selected tools, design systems, and web experiments.",
};

export default function WorksPage() {
  return (
    <PageTransition>
      <div className="space-y-14">
        <PageHeader
          kicker="Works"
          title="Selected software, systems, and web studies."
          description="A focused collection of tools and interface experiments built with attention to speed, typography, and calm interaction."
          titleClassName="max-w-3xl"
          size="large"
          folio="Index / 2026"
        />

        <div className="reveal-3">
          <WorksGallery />
        </div>
      </div>
    </PageTransition>
  );
}
