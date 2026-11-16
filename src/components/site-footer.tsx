"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PROFILE } from "@/lib/content";
import { getRouteOrder, getTransitionTypes, NAV_ITEMS } from "@/lib/nav";
import { usePresenceEggs } from "@/components/presence-eggs";

export function SiteFooter() {
  const pathname = usePathname();
  const { icuPeek } = usePresenceEggs();
  const currentOrder = getRouteOrder(pathname);

  return (
    <footer
      style={{ viewTransitionName: "site-footer" }}
      className="relative mt-auto w-full border-t border-zinc-200/80 dark:border-zinc-800/80"
    >
      <div
        aria-hidden="true"
        className="bg-dot-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_top,black,transparent)]"
      />
      <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
        <div className="flex flex-col gap-4 py-8 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between dark:text-zinc-400">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">
              © 2026 {PROFILE.name}.
            </span>
          </div>

          <div className="flex items-center gap-5">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                transitionTypes={getTransitionTypes(item.order, currentOrder)}
                className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-200"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`mailto:${PROFILE.email}`}
              className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-200"
            >
              Email
            </a>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="select-none overflow-hidden border-t border-zinc-200/80 print:hidden dark:border-zinc-800/80"
        >
          <span className="block translate-y-[0.16em] pt-5 font-serif text-[clamp(5rem,20vw,16rem)] leading-[0.8] tracking-[-0.06em] text-zinc-950/[0.055] dark:text-zinc-50/[0.055]">
            {PROFILE.handle}
            <span className="group/icu inline-grid">
              <span
                className={`col-start-1 row-start-1 transition-opacity duration-300 group-hover/icu:opacity-0 ${
                  icuPeek ? "opacity-0" : "opacity-100"
                }`}
              >
                {PROFILE.tld}
              </span>
              <span
                aria-hidden="true"
                className={`pointer-events-none col-start-1 row-start-1 whitespace-nowrap pl-[0.15em] transition-opacity duration-500 group-hover/icu:opacity-100 ${
                  icuPeek ? "opacity-100" : "opacity-0"
                }`}
              >
                {PROFILE.easterEgg}
              </span>
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
