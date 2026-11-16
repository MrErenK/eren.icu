import Link from "next/link";
import { PageTransition } from "@/components/page-transition";

export default function NotFoundPage() {
  return (
    <PageTransition>
      <div className="relative isolate">
        <div className="flex items-center justify-between gap-4 border-b border-zinc-200/80 pb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500 dark:border-zinc-800/80 dark:text-zinc-400">
          <span>Error</span>
          <span>404 / Not found</span>
        </div>

        <div className="relative mt-16 space-y-6">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-20 -z-10 hidden select-none font-serif leading-[0.7] tracking-[-0.06em] text-zinc-950/[0.055] print:hidden md:block md:text-[13rem] lg:text-[22rem] dark:text-zinc-50/[0.055]"
          >
            404
          </span>

          <h1 className="max-w-2xl font-serif text-5xl font-normal leading-[0.96] tracking-[-0.035em] text-zinc-950 dark:text-zinc-50 sm:text-6xl lg:text-7xl">
            Nothing lives at this address. Still, you looked.
          </h1>
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
