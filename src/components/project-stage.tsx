import type { WorkProject } from "@/lib/content";
import { GitHubRepoPreview } from "@/components/github-repo-preview";

export function ProjectStage({
  project,
  className = "",
  size = "default",
}: {
  project: WorkProject;
  className?: string;
  size?: "default" | "hero";
}) {
  const hero = size === "hero";

  return (
    <div
      className={`relative flex items-center justify-center ${
        hero
          ? "h-36 sm:h-61.25 lg:h-65"
          : "h-36 sm:h-54 lg:h-57.5 xl:h-61.25"
      } ${className}`}
    >
      <div
        aria-hidden="true"
        className="bg-dot-grid pointer-events-none absolute inset-0 opacity-50 mask-[radial-gradient(ellipse_at_center,black_30%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className={`relative h-full ${
          hero
            ? "w-full sm:max-w-120 lg:max-w-150 xl:max-w-170"
            : "w-full sm:max-w-105 lg:max-w-125"
        }`}
      >
        <GitHubRepoPreview project={project} size={hero ? "hero" : "large"} />
      </div>
    </div>
  );
}
