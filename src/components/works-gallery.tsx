"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { WORKS, WORK_CATEGORIES } from "@/lib/content";
import { ProjectLinks, ProjectStatus } from "@/components/project-meta";
import { ProjectStage } from "@/components/project-stage";
import { TiltCard } from "@/components/tilt-card";

const COUNTS = Object.fromEntries(
  WORK_CATEGORIES.map((category) => [
    category,
    category === "All"
      ? WORKS.length
      : WORKS.filter((work) => work.category === category).length,
  ] as const)
);

const categoryListeners = new Set<() => void>();

function resolveCategory(raw: string | null): string {
  if (!raw) return "All";
  const normalized = raw.toLowerCase();
  return (
    WORK_CATEGORIES.find((item) => item.toLowerCase() === normalized) ?? "All"
  );
}

function getCategorySnapshot(): string {
  const params = new URLSearchParams(window.location.search);
  return resolveCategory(params.get("category"));
}

function getServerCategorySnapshot(): string {
  return "All";
}

function subscribeCategory(callback: () => void) {
  categoryListeners.add(callback);
  window.addEventListener("popstate", callback);
  return () => {
    categoryListeners.delete(callback);
    window.removeEventListener("popstate", callback);
  };
}

function setCategoryInUrl(category: string) {
  const url = new URL(window.location.href);
  if (category === "All") {
    url.searchParams.delete("category");
  } else {
    url.searchParams.set("category", category.toLowerCase());
  }
  window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
  categoryListeners.forEach((listener) => listener());
}

export function WorksGallery() {
  const selected = useSyncExternalStore(
    subscribeCategory,
    getCategorySnapshot,
    getServerCategorySnapshot
  );

  const filtered =
    selected === "All"
      ? WORKS
      : WORKS.filter((item) => item.category === selected);

  return (
    <div className="space-y-4">
      <div
        role="group"
        aria-label="Filter projects by category"
        className="flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-zinc-200/80 py-3 dark:border-zinc-800/80"
      >
        {WORK_CATEGORIES.map((category) => {
          const isActive = selected === category;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={isActive}
              onClick={() => setCategoryInUrl(category)}
              className={`group relative pb-1 font-mono text-xs transition-colors duration-200 ${
                isActive
                  ? "text-zinc-950 dark:text-zinc-50"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              {category}
              <span className="ml-1.5 text-[10px] tabular-nums opacity-50">
                {COUNTS[category]}
              </span>
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 bottom-0 h-px origin-left bg-zinc-950 transition-transform duration-300 dark:bg-zinc-50 ${
                  isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </button>
          );
        })}
      </div>

      <div className="divide-y divide-zinc-200/80 dark:divide-zinc-800/80">
        {filtered.map((project, index) => (
          <article
            key={`${selected}-${project.slug}`}
            className="reveal group relative isolate grid gap-6 py-8 lg:grid-cols-12 lg:items-center lg:gap-8"
            style={{ animationDelay: `${Math.min(index * 60, 300)}ms` }}
          >
            <Link
              href={`/works/${project.slug}`}
              transitionTypes={["nav-forward"]}
              aria-label={`View ${project.title}`}
              className="absolute inset-0 z-10 rounded-xl"
            />

            <div
              className="relative z-20 min-w-0 lg:col-span-7"
              style={{
                viewTransitionName: `project-${project.slug}`,
                viewTransitionClass: "project-morph",
              }}
            >
              <TiltCard strength={3}>
                <Link
                  href={`/works/${project.slug}`}
                  transitionTypes={["nav-forward"]}
                  tabIndex={-1}
                  aria-hidden="true"
                  className="block"
                >
                  <ProjectStage
                    project={project}
                    className="transition-transform duration-500 group-hover:-translate-y-1"
                  />
                </Link>
              </TiltCard>
            </div>

            <div className="lg:col-span-5">
              <div className="flex items-center justify-between gap-4 font-mono text-xs text-zinc-500 tabular-nums dark:text-zinc-400">
                <span>{project.category}</span>
                <div className="flex items-center gap-2">
                  <ProjectStatus status={project.status} />
                  <span aria-hidden="true">/</span>
                  <span>{project.year}</span>
                </div>
              </div>

              <h2 className="mt-2.5 wrap-break-word font-display text-3xl font-semibold leading-[1.1] tracking-[-0.025em] text-zinc-950 dark:text-zinc-50">
                {project.title}
                <span
                  aria-hidden="true"
                  className="ml-2 inline-block align-middle text-xl text-zinc-400 transition-transform duration-200 group-hover:translate-x-0.5 dark:text-zinc-500"
                >
                  →
                </span>
              </h2>

              <p className="mt-3 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                {project.description}
              </p>

              <ProjectLinks
                project={project}
                className="relative z-20 mt-5 items-center border-t border-zinc-200/70 pt-3.5 dark:border-zinc-800/70"
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
