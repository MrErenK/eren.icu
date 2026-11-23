import type { WorkProject } from "@/lib/content";

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572a5",
  Java: "#b07219",
  "C#": "#178600",
  "C++": "#f34b7d",
  C: "#555555",
  Shell: "#89e051",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Go: "#00add8",
  Rust: "#dea584",
  Kotlin: "#a97bff",
  Swift: "#f05138",
  Lua: "#000080",
};

function getRepo(project: WorkProject) {
  if (!project.repo) {
    return { owner: "MrErenK", name: project.title };
  }

  const parts = new URL(project.repo).pathname.split("/").filter(Boolean);
  return {
    owner: parts[0] ?? "MrErenK",
    name: parts[1] ?? project.title,
  };
}

function getLanguageName(project: WorkProject) {
  const tag = project.tags.find((item) => LANGUAGE_COLORS[item]);
  if (tag) return tag;
  if (project.category === "Web") return "TypeScript";
  return project.tags[0] ?? "Code";
}

export function GitHubRepoPreview({
  project,
  size = "compact",
}: {
  project: WorkProject;
  size?: "compact" | "large" | "hero";
}) {
  const isHero = size === "hero";
  const isLarge = size !== "compact";
  const repo = getRepo(project);
  const languageName = getLanguageName(project);
  const languageColor = LANGUAGE_COLORS[languageName] ?? "#8b949e";
  const topics = project.tags.slice(0, 3);
  const cardSize = isLarge
    ? `h-36 rounded-xl border p-4 sm:h-full sm:min-h-36 sm:rounded-2xl ${
        isHero ? "sm:p-8" : "sm:p-6"
      }`
    : "h-36 rounded-xl border p-4";

  return (
    <div
      className={`${cardSize} flex w-full min-w-0 flex-col justify-between overflow-hidden border-zinc-200/80 bg-paper transition-shadow duration-500 group-hover:shadow-[0_8px_24px_rgba(9,9,11,0.07)] dark:border-zinc-800/80 dark:group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]`}
    >
      <div className="flex items-center gap-2">
        <span
          className={`min-w-0 truncate whitespace-nowrap leading-tight text-[#0969da] dark:text-[#4493f8] ${
            isHero
              ? "text-[12.5px] sm:text-lg lg:text-xl"
              : isLarge
                ? "text-[12.5px] sm:text-base"
                : "text-[12.5px] sm:text-[11px]"
          }`}
        >
          <span>{repo.owner} / </span>
          <span className="font-semibold">{repo.name}</span>
        </span>

        <span
          className={`shrink-0 rounded-full border border-zinc-300/80 text-zinc-500 dark:border-zinc-700/80 dark:text-zinc-400 ${
            isHero
              ? "px-2 py-0.5 text-[9.5px] sm:px-3 sm:py-1 sm:text-xs"
              : isLarge
                ? "px-2 py-0.5 text-[9.5px] sm:px-2.5 sm:py-1 sm:text-[11px]"
                : "px-2 py-0.5 text-[9.5px]"
          }`}
        >
          Public
        </span>
      </div>

      <p
        className={`line-clamp-2 leading-relaxed text-zinc-600 sm:line-clamp-3 dark:text-zinc-400 ${
          isHero
            ? "text-[11.5px] sm:text-base"
            : isLarge
              ? "text-[11.5px] sm:text-sm"
              : "text-[11.5px] sm:text-[10.5px]"
        }`}
      >
        {project.summary}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {topics.map((tag) => (
          <span
            key={tag}
            className={`rounded-full bg-[#ddf4ff] text-[#0969da] dark:bg-[#122d42] dark:text-[#4493f8] ${
              isHero
                ? "px-2 py-0.5 text-[9px] sm:px-3 sm:py-1 sm:text-sm"
                : isLarge
                  ? "px-2 py-0.5 text-[9px] sm:px-2.5 sm:py-1 sm:text-xs"
                  : "px-2 py-0.5 text-[9px] sm:text-[8px]"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>

      <div
        className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-zinc-500 dark:text-zinc-400 ${
          isHero
            ? "text-[10px] sm:text-sm"
            : isLarge
              ? "text-[10px] sm:text-xs"
              : "text-[10px] sm:text-[9px]"
        }`}
      >
        <span className="flex items-center gap-1.5">
          <span
            className={`shrink-0 rounded-full ${
              isHero ? "h-2 w-2 sm:h-2.5 sm:w-2.5" : "h-2 w-2"
            }`}
            style={{ backgroundColor: languageColor }}
          />
          {languageName}
        </span>
        <span>Updated {project.year}</span>
      </div>
    </div>
  );
}
