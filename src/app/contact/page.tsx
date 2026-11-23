import type { Metadata } from "next";
import { PROFILE } from "@/lib/content";
import { CopyEmailButton } from "@/components/copy-email";
import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";
import { SectionLabel } from "@/components/section-label";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach Eren via email, GitHub, or Telegram.",
};

export default function ContactPage() {
  return (
    <PageTransition>
      <div className="space-y-16">
        <PageHeader
          kicker="Contact"
          title="Get in touch."
          description={PROFILE.contactPrompt}
          size="large"
        />

        <section
          aria-label="Email"
          className="reveal-3 border-y border-zinc-200/80 py-10 dark:border-zinc-800/80"
        >
          <SectionLabel>Email</SectionLabel>

          <a
            href={`mailto:${PROFILE.email}`}
            className="mt-4 block w-fit font-display text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-none tracking-[-0.035em] text-zinc-950 transition-opacity duration-300 hover:opacity-70 dark:text-zinc-50"
          >
            {PROFILE.email}
          </a>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <CopyEmailButton />
            <a
              href={`mailto:${PROFILE.email}`}
              className="group inline-flex items-center gap-1 text-sm font-medium text-zinc-700 transition-colors hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50"
            >
              <span className="link-underline">Write</span>
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              >
                ↗
              </span>
            </a>
          </div>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Best for project inquiries and longer messages.
          </p>
        </section>

        <section
          aria-label="Elsewhere"
          className="reveal-4 grid sm:grid-cols-2"
        >
          {PROFILE.socials.map((social, index) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className={`group flex flex-col gap-2 py-6 ${
                index === 0
                  ? "sm:pr-8"
                  : "border-t border-zinc-200/80 dark:border-zinc-800/80 sm:border-l sm:border-t-0 sm:pl-8"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <SectionLabel>{social.label}</SectionLabel>
                <span
                  aria-hidden="true"
                  className="font-mono text-xs text-zinc-400 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-zinc-900 dark:group-hover:text-zinc-100"
                >
                  ↗
                </span>
              </div>

              <p className="font-display text-2xl font-semibold tracking-[-0.02em] text-zinc-950 dark:text-zinc-50">
                {social.handle ?? social.label}
              </p>

              {social.note ? (
                <p className="max-w-xs text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {social.note}
                </p>
              ) : null}

              <span className="mt-2 font-mono text-xs text-zinc-400 dark:text-zinc-500">
                Open {social.label}
              </span>
            </a>
          ))}
        </section>
      </div>
    </PageTransition>
  );
}
