"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PROFILE } from "@/lib/content";
import { getRouteOrder, getTransitionTypes, NAV_ITEMS } from "@/lib/nav";
import { usePresenceEggs } from "@/components/presence-eggs";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  const pathname = usePathname();
  const { icuPeek } = usePresenceEggs();
  const currentOrder = getRouteOrder(pathname);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className={`sticky top-0 z-30 w-full border-b border-zinc-200/80 backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300 dark:border-zinc-800/80 ${
        scrolled
          ? "bg-paper/95 shadow-[0_8px_24px_rgba(9,9,11,0.05)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
          : "bg-paper/85"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 sm:h-16 sm:px-8">
        <Link
          href="/"
          transitionTypes={getTransitionTypes(0, currentOrder)}
          className="inline-flex items-baseline text-[15px] font-medium tracking-[-0.015em]"
        >
          <span className="text-zinc-950 transition-opacity duration-200 hover:opacity-75 dark:text-zinc-50">
            {PROFILE.handle}
          </span>
          <span className="group/icu relative inline-flex items-baseline pr-1">
            <span
              className={`font-mono text-[13.5px] text-zinc-400 transition-opacity duration-300 group-hover/icu:opacity-0 ${
                icuPeek ? "opacity-0" : "opacity-100"
              }`}
            >
              {PROFILE.tld}
            </span>
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute left-1 top-0 whitespace-nowrap font-mono text-[12.5px] tracking-tight text-zinc-600 transition-opacity duration-500 group-hover/icu:opacity-100 dark:text-zinc-300 ${
                icuPeek ? "opacity-100" : "opacity-0"
              }`}
            >
              {PROFILE.easterEgg}
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <nav aria-label="Primary" className="flex items-center gap-0.5 sm:gap-1">
            {NAV_ITEMS.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  transitionTypes={getTransitionTypes(item.order, currentOrder)}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-lg px-2 py-1.5 text-[13px] transition-colors duration-200 sm:px-3 sm:text-[13.5px] ${
                    active
                      ? "font-medium text-zinc-950 dark:text-zinc-50"
                      : "text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100"
                  }`}
                >
                  {item.label}
                  {active ? (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent"
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <span
            aria-hidden="true"
            className="hidden h-4 w-px bg-zinc-200/80 sm:block dark:bg-zinc-800/80"
          />

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
