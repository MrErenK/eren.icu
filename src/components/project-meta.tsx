import type { WorkProject } from "@/lib/content";

const STATUS_DOT: Record<string, string> = {
  Live: "bg-emerald-500 dark:bg-emerald-400",
  Published: "bg-amber-500 dark:bg-amber-400",
  "Open Source": "bg-sky-500 dark:bg-sky-400",
};

export function ProjectStatus({ status }: { status: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        aria-hidden="true"
        className={`pulse-dot h-1.5 w-1.5 rounded-full ${
          STATUS_DOT[status] ?? "bg-zinc-400"
        }`}
      />
      {status}
    </span>
  );
}

export function ProjectLinks({
  project,
  className = "",
}: {
  project: WorkProject;
  className?: string;
}) {
  if (!project.links?.length && !project.url && !project.repo) return null;

  return (
    <div className={`flex flex-wrap gap-x-5 gap-y-2 ${className}`}>
      {project.links?.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs font-medium text-zinc-900 transition-opacity hover:opacity-75 dark:text-zinc-100"
        >
          <span className="link-underline">{link.label}</span>
          <span aria-hidden="true">↗</span>
        </a>
      ))}

      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs font-medium text-zinc-900 transition-opacity hover:opacity-75 dark:text-zinc-100"
        >
          <span className="link-underline">Visit</span>
          <span aria-hidden="true">↗</span>
        </a>
      ) : null}

      {project.repo ? (
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <span className="link-underline">GitHub</span>
          <span aria-hidden="true">↗</span>
        </a>
      ) : null}
    </div>
  );
}
