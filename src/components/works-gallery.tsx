"use client";

import Link from "next/link";
import { useState } from "react";
import { WORKS, WORK_CATEGORIES } from "@/lib/content";
import { ProjectLinks, ProjectStatus } from "@/components/project-meta";
import { ProjectStage } from "@/components/project-stage";
import { Tag } from "@/components/tag";
import { TiltCard } from "@/components/tilt-card";

const COUNTS = Object.fromEntries(
  WORK_CATEGORIES.map((category) => [
    category,
    category === "All"
      ? WORKS.length
      : WORKS.filter((work) => work.category === category).length,
  ] as const)
);

export function WorksGallery() {
  const [selected, setSelected] = useState<string>("All");

  const filtered =
    selected === "All"
      ? WORKS
      : WORKS.filter((item) => item.category === selected);

  return (
    <div className="space-y-8">
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
              onClick={() => setSelected(category)}
              className={`group relative pb-1 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-200 ${
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
          <TiltCard key={`${selected}-${project.slug}`}>
            <article
              className="reveal group relative isolate grid gap-8 py-12 lg:grid-cols-12 lg:items-center"
              style={{ animationDelay: `${Math.min(index * 60, 300)}ms` }}
            >
            <Link
              href={`/works/${project.slug}`}
              transitionTypes={["nav-forward"]}
              aria-label={`View ${project.title}`}
              className="absolute inset-0 z-10 rounded-2xl"
            />

            <div
              className={`${index % 2 ? "lg:order-2" : ""} min-w-0 lg:col-span-7`}
              style={{
                viewTransitionName: `project-${project.slug}`,
                viewTransitionClass: "project-morph",
              }}
            >
              <ProjectStage
                project={project}
                className="transition-transform duration-500 group-hover:-translate-y-1"
              />
            </div>

            <div className={`${index % 2 ? "lg:order-1" : ""} lg:col-span-5`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-4xl leading-none text-zinc-400 dark:text-zinc-600">
                    {String(WORKS.indexOf(project) + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                    {project.category}
                  </span>
                </div>
                <div className="flex items-center gap-2 pt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500 tabular-nums dark:text-zinc-400">
                  <ProjectStatus status={project.status} />
                  <span aria-hidden="true">/</span>
                  <span>{project.year}</span>
                </div>
              </div>

              <h2 className="mt-4 wrap-break-word font-serif text-4xl font-normal leading-[1.05] tracking-[-0.02em] text-zinc-950 dark:text-zinc-50">
                {project.title}
                <span
                  aria-hidden="true"
                  className="ml-2 inline-block align-middle text-2xl text-zinc-400 transition-transform duration-200 group-hover:translate-x-0.5 dark:text-zinc-500"
                >
                  →
                </span>
              </h2>

              <div className="mt-4 space-y-3 text-[15.5px] leading-relaxed">
                <p className="text-zinc-800 dark:text-zinc-200">
                  {project.summary}
                </p>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {project.description}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>

              <ProjectLinks
                project={project}
                className="relative z-20 mt-6 items-center border-t border-zinc-200/70 pt-4 dark:border-zinc-800/70"
              />
            </div>
            </article>
          </TiltCard>
        ))}
      </div>
    </div>
  );
}
