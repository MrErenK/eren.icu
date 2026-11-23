import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";
import { WorksGallery } from "@/components/works-gallery";

export const metadata: Metadata = {
  title: "Works",
  description: "Web tools, Android ROM utilities, and game mods built by Eren.",
};

export default function WorksPage() {
  return (
    <PageTransition>
      <div className="space-y-10">
        <PageHeader
          kicker="Works"
          title="Projects, tools, and mods."
          description="Web applications, Minecraft and Spaceflight Simulator mods, and shell scripts for AOSP builds."
          titleClassName="max-w-3xl"
          size="large"
        />

        <div className="reveal-3">
          <WorksGallery />
        </div>
      </div>
    </PageTransition>
  );
}
