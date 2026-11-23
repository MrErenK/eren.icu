import Link from "next/link";
import { PageTransition } from "@/components/page-transition";
import { SectionLabel } from "@/components/section-label";

export default function NotFoundPage() {
  return (
    <PageTransition>
      <div className="relative isolate">
        <div className="relative mt-8 space-y-5">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-10 -z-10 hidden select-none font-display font-semibold leading-[0.8] tracking-[-0.06em] text-zinc-950/[0.055] print:hidden md:block md:text-[12rem] lg:text-[18rem] dark:text-zinc-50/[0.055]"
          >
            404
          </span>

          <SectionLabel>404</SectionLabel>
          <h1 className="max-w-xl font-display text-4xl font-semibold leading-[1.06] tracking-[-0.035em] text-zinc-950 dark:text-zinc-50 sm:text-5xl lg:text-6xl">
            Page not found.
          </h1>
          <p className="max-w-md text-[15.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">
            The page you are looking for does not exist or may have been moved.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              transitionTypes={["nav-back"]}
              className="inline-flex items-center justify-center rounded-lg border border-zinc-200/80 bg-white/70 px-4 py-2.5 text-sm text-zinc-900 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-white active:translate-y-0 active:shadow-none dark:border-zinc-800/80 dark:bg-zinc-900/60 dark:text-zinc-100 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
            >
              Back home
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
