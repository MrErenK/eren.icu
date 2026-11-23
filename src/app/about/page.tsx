import type { Metadata } from "next";
import Link from "next/link";
import { ABOUT, PROFILE } from "@/lib/content";
import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";

export const metadata: Metadata = {
  title: "About",
  description: "Background and technical stack.",
};

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="space-y-16">
        <PageHeader
          kicker="About"
          title={ABOUT.lead}
          titleClassName="max-w-3xl"
        />

        <section className="reveal-2 grid grid-cols-1 gap-8 border-t border-zinc-200/80 pt-10 dark:border-zinc-800/80 md:grid-cols-[200px_1fr]">
          <SectionLabel>Background</SectionLabel>
          <div className="max-w-3xl space-y-5">
            {ABOUT.paragraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className={
                  idx === 0
                    ? "text-[16px] leading-[1.75] text-zinc-800 dark:text-zinc-200"
                    : "text-[15.5px] leading-[1.75] text-zinc-600 dark:text-zinc-400"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <Reveal>
          <section className="grid grid-cols-1 gap-8 border-t border-zinc-200/80 pt-10 dark:border-zinc-800/80 md:grid-cols-[200px_1fr]">
            <SectionLabel>Stack</SectionLabel>
            <div className="divide-y divide-zinc-200/80 dark:divide-zinc-800/80">
              {ABOUT.stack.map((group) => (
                <div
                  key={group.group}
                  className="grid gap-2 py-5 first:pt-0 last:pb-0 sm:grid-cols-[180px_1fr] sm:items-baseline"
                >
                  <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-zinc-950 dark:text-zinc-50">
                    {group.group}
                  </h3>
                  <ul className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-sm text-zinc-600 dark:text-zinc-400">
                    {group.items.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="border-t border-zinc-200/80 pt-10 dark:border-zinc-800/80">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <SectionLabel>Contact</SectionLabel>
                <h2 className="mt-2 font-display text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-zinc-950 dark:text-zinc-50 sm:text-4xl">
                  Get in touch.
                </h2>
              </div>

              <div className="lg:col-span-4 lg:col-start-9">
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/works"
                    transitionTypes={["nav-forward"]}
                    className="rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink/85 active:translate-y-0 active:shadow-none"
                  >
                    View works
                  </Link>
                  <Link
                    href="/contact"
                    transitionTypes={["nav-forward"]}
                    className="rounded-lg border border-zinc-200/80 bg-white/70 px-4 py-2.5 text-sm text-zinc-800 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-white active:translate-y-0 active:shadow-none dark:border-zinc-800/80 dark:bg-zinc-900/60 dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
                  >
                    Contact
                  </Link>
                </div>

                <a
                  href={`mailto:${PROFILE.email}`}
                  className="link-underline mt-4 block w-fit font-mono text-xs text-zinc-500 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  {PROFILE.email}
                </a>
              </div>
            </div>
          </section>
        </Reveal>
      </div>
    </PageTransition>
  );
}
