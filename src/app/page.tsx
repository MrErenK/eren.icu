import Link from "next/link";
import { Fragment } from "react";
import { ABOUT, FEATURED_WORKS, PROFILE } from "@/lib/content";
import { PageTransition } from "@/components/page-transition";
import { ProjectStage } from "@/components/project-stage";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { Tag } from "@/components/tag";
import { GitHubRepoPreview } from "@/components/github-repo-preview";
import { TiltCard } from "@/components/tilt-card";

export default function HomePage() {
  const [featured, ...moreWorks] = FEATURED_WORKS;

  return (
    <PageTransition>
      <div className="space-y-24">
        <section aria-labelledby="hero-heading">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
            <aside className="reveal-2 hidden flex-col items-start gap-5 md:col-span-3 md:flex md:gap-7 md:pt-2">
              <div className="space-y-2">
                <SectionLabel>Focus</SectionLabel>
                <p className="font-mono text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {PROFILE.availabilityBadge}
                </p>
              </div>

              <div className="space-y-2">
                <SectionLabel>Elsewhere</SectionLabel>
                <div className="flex flex-col gap-1.5 font-mono text-xs">
                  {PROFILE.socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-fit items-center gap-1 text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100"
                    >
                      <span className="link-underline">{social.label}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </aside>

            <div className="md:col-span-9">
              <h1
                id="hero-heading"
                className="font-display text-[clamp(2.5rem,5.2vw,4.25rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-zinc-950 dark:text-zinc-50"
              >
                {PROFILE.headline.split(" ").map((word, i) => (
                  <Fragment key={`${word}-${i}`}>
                    <span
                      className="reveal-word"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      {word}
                    </span>{" "}
                  </Fragment>
                ))}
              </h1>
              <p className="reveal-2 mt-6 max-w-lg text-[15.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                {PROFILE.subheadline}
              </p>

              <div className="reveal-3 mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/works"
                  transitionTypes={["nav-forward"]}
                  className="inline-flex items-center justify-center rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-paper shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink/85 active:translate-y-0 active:shadow-none"
                >
                  View works
                </Link>
                <Link
                  href="/about"
                  transitionTypes={["nav-forward"]}
                  className="inline-flex items-center justify-center rounded-lg border border-zinc-200/80 bg-white/70 px-4 py-2.5 text-sm font-medium text-zinc-800 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-white active:translate-y-0 active:shadow-none dark:border-zinc-800/80 dark:bg-zinc-900/60 dark:text-zinc-200 dark:shadow-none dark:hover:border-zinc-700 dark:hover:bg-zinc-800/80"
                >
                  About me
                </Link>
                <Link
                  href="/contact"
                  transitionTypes={["nav-forward"]}
                  className="group inline-flex items-center gap-1 px-2.5 py-2 text-sm text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  <span className="link-underline">Contact</span>
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Reveal>
          <section
            aria-labelledby="selected-works-heading"
            className="space-y-8"
          >
            <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2 border-b border-zinc-200/80 pb-4 dark:border-zinc-800/80">
              <h2
                id="selected-works-heading"
                className="font-display text-3xl font-semibold tracking-[-0.03em] text-zinc-950 dark:text-zinc-50 sm:text-4xl"
              >
                Selected works
              </h2>
              <Link
                href="/works"
                transitionTypes={["nav-forward"]}
                className="group ml-auto inline-flex shrink-0 items-center gap-1 text-sm text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                <span className="link-underline">All works</span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
            </div>

            {featured ? (
              <TiltCard>
                <Link
                  href={`/works/${featured.slug}`}
                  transitionTypes={["nav-forward"]}
                  className="group grid gap-6 lg:grid-cols-12 lg:items-center lg:gap-10"
                >
                  <div
                    className="min-w-0 lg:col-span-7"
                    style={{
                      viewTransitionName: `project-${featured.slug}`,
                      viewTransitionClass: "project-morph",
                    }}
                  >
                    <ProjectStage
                      project={featured}
                      className="transition-transform duration-500 group-hover:-translate-y-1"
                    />
                  </div>
                  <div className="lg:col-span-5">
                    <div className="flex items-center justify-between gap-4 font-mono text-xs">
                      <span className="text-zinc-500 dark:text-zinc-400">
                        {featured.category} / {featured.year}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-accent">
                        <span
                          aria-hidden="true"
                          className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent"
                        />
                        Featured
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-3xl font-semibold leading-[1.1] tracking-[-0.025em] text-zinc-950 dark:text-zinc-50 xl:text-4xl">
                      {featured.title}
                    </h3>
                    <p className="mt-4 max-w-md text-[15.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {featured.summary}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {featured.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                    <span className="mt-7 inline-flex items-center gap-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      <span className="link-underline">View project</span>
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </TiltCard>
            ) : null}

            {moreWorks.length > 0 ? (
              <div className="grid gap-x-6 gap-y-12 border-t border-zinc-200/80 pt-10 sm:grid-cols-2 dark:border-zinc-800/80 lg:grid-cols-3">
                {moreWorks.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/works/${project.slug}`}
                    transitionTypes={["nav-forward"]}
                    className="group flex flex-col gap-4"
                  >
                    <div
                      aria-hidden="true"
                      className="transition-transform duration-500 group-hover:-translate-y-1"
                    >
                      <TiltCard strength={4}>
                        <GitHubRepoPreview project={project} />
                      </TiltCard>
                    </div>

                    <div className="flex items-center justify-between gap-3 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                      <span>{project.category}</span>
                      <span>{project.year}</span>
                    </div>

                    <h3 className="font-display text-xl font-semibold leading-snug tracking-[-0.02em] text-zinc-950 dark:text-zinc-50">
                      {project.title}
                      <span
                        aria-hidden="true"
                        className="ml-2 inline-block text-base text-zinc-400 transition-transform duration-200 group-hover:translate-x-0.5 dark:text-zinc-500"
                      >
                        →
                      </span>
                    </h3>

                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {project.summary}
                    </p>

                    <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
                      {project.tags.slice(0, 3).map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            ) : null}
          </section>
        </Reveal>

        <Reveal>
          <section
            aria-label="About and contact"
            className="grid gap-10 border-t border-zinc-200/80 pt-10 dark:border-zinc-800/80 lg:grid-cols-12"
          >
            <div className="lg:col-span-7">
              <SectionLabel>About</SectionLabel>
              <h2 className="mt-2 max-w-2xl font-display text-2xl font-semibold leading-[1.2] tracking-[-0.025em] text-zinc-950 dark:text-zinc-50 sm:text-3xl">
                {ABOUT.lead}
              </h2>
              <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                {ABOUT.paragraphs[0]}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {(ABOUT.stack[0]?.items ?? []).slice(0, 4).map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>
                <Link
                  href="/about"
                  transitionTypes={["nav-forward"]}
                  className="group inline-flex items-center gap-1 text-sm font-medium text-zinc-900 transition-opacity hover:opacity-75 dark:text-zinc-100"
                >
                  <span className="link-underline">More about me</span>
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 lg:col-start-9 lg:border-l lg:border-zinc-200/80 lg:pl-8 dark:lg:border-zinc-800/80">
              <SectionLabel>Contact</SectionLabel>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.025em] text-zinc-950 dark:text-zinc-50 sm:text-3xl">
                Get in touch.
              </h2>
              <p className="mt-3 text-[15.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                {PROFILE.contactPrompt}
              </p>
              <a
                href={`mailto:${PROFILE.email}`}
                className="link-underline mt-5 block w-fit font-mono text-sm font-medium text-zinc-900 dark:text-zinc-100"
              >
                {PROFILE.email}
              </a>
              <Link
                href="/contact"
                transitionTypes={["nav-forward"]}
                className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                <span className="link-underline">Contact page</span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
            </div>
          </section>
        </Reveal>
      </div>
    </PageTransition>
  );
}
