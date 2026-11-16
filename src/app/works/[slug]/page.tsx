import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WORKS } from "@/lib/content";
import { PageTransition } from "@/components/page-transition";
import { ProjectLinks, ProjectStatus } from "@/components/project-meta";
import { ProjectStage } from "@/components/project-stage";
import { SectionLabel } from "@/components/section-label";
import { Tag } from "@/components/tag";
import { TiltCard } from "@/components/tilt-card";

export const instant = false;

export function generateStaticParams() {
  return WORKS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = WORKS.find((item) => item.slug === slug);

  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = WORKS.find((item) => item.slug === slug);

  if (!project) notFound();

  const index = WORKS.indexOf(project);
  const next = WORKS[(index + 1) % WORKS.length];

  return (
    <PageTransition>
      <div className="space-y-12">
        <div className="flex items-center justify-between gap-4 border-b border-zinc-200/80 pb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500 dark:border-zinc-800/80 dark:text-zinc-400">
          <Link
            href="/works"
            transitionTypes={["nav-back"]}
            className="group inline-flex items-center gap-1.5 transition-colors hover:text-zinc-950 dark:hover:text-zinc-100"
          >
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            >
              ←
            </span>
            <span className="link-underline">All works</span>
          </Link>
          <span>
            Case study / {String(index + 1).padStart(2, "0")} of{" "}
            {String(WORKS.length).padStart(2, "0")}
          </span>
        </div>

        <header className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500 tabular-nums dark:text-zinc-400">
              <span>{project.category}</span>
              <span aria-hidden="true">/</span>
              <ProjectStatus status={project.status} />
              <span aria-hidden="true">/</span>
              <span>{project.year}</span>
            </div>
            <h1 className="mt-5 wrap-break-word font-serif text-5xl font-normal leading-[0.92] tracking-[-0.045em] text-zinc-950 dark:text-zinc-50 sm:text-6xl lg:text-7xl">
              {project.title}
            </h1>
          </div>

          <p className="max-w-xl text-[17px] leading-relaxed text-zinc-600 dark:text-zinc-400 lg:col-span-4">
            {project.summary}
          </p>
        </header>

        <div
          className="w-full"
          style={{
            viewTransitionName: `project-${project.slug}`,
            viewTransitionClass: "project-morph",
          }}
        >
          <ProjectStage project={project} size="hero" />
        </div>

        <section
          aria-label="Project details"
          className="grid grid-cols-2 gap-6 border-y border-zinc-200/80 py-8 dark:border-zinc-800/80 sm:gap-8 lg:grid-cols-4"
        >
          <div>
            <SectionLabel>Year</SectionLabel>
            <p className="mt-2 font-serif text-3xl font-normal tracking-[-0.02em] text-zinc-950 dark:text-zinc-50">
              {project.year}
            </p>
          </div>

          <div>
            <SectionLabel>Category</SectionLabel>
            <p className="mt-2 font-serif text-3xl font-normal tracking-[-0.02em] text-zinc-950 dark:text-zinc-50">
              {project.category}
            </p>
          </div>

          <div>
            <SectionLabel>Status</SectionLabel>
            <div className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">
              <ProjectStatus status={project.status} />
            </div>
          </div>

          <div>
            <SectionLabel>Links</SectionLabel>
            <ProjectLinks project={project} className="mt-3" />
          </div>
        </section>

        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionLabel>Overview</SectionLabel>
            <p className="mt-4 max-w-3xl font-serif text-3xl leading-[1.18] tracking-[-0.02em] text-zinc-900 dark:text-zinc-100 sm:text-4xl">
              {project.description}
            </p>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <SectionLabel>Stack</SectionLabel>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
        </div>

        <TiltCard>
          <Link
            href={`/works/${next.slug}`}
            transitionTypes={["nav-forward"]}
            className="group block border-t border-zinc-200/80 pt-10 dark:border-zinc-800/80"
          >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <SectionLabel>Next project</SectionLabel>
              <h2 className="mt-2 wrap-break-word font-serif text-4xl font-normal tracking-[-0.02em] text-zinc-950 dark:text-zinc-50 sm:text-5xl">
                {next.title}
              </h2>
            </div>
            <span className="inline-flex items-center gap-1 pb-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">
              <span className="link-underline">View project</span>
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                →
              </span>
            </span>
          </div>

          <div
            className="mt-8 transition-transform duration-500 group-hover:-translate-y-1"
            style={{
              viewTransitionName: `project-${next.slug}`,
              viewTransitionClass: "project-morph",
            }}
          >
            <ProjectStage project={next} size="hero" />
          </div>
          </Link>
        </TiltCard>
      </div>
    </PageTransition>
  );
}
