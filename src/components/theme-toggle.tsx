"use client";

import { useRef, useSyncExternalStore, type MouseEvent } from "react";
import { useTheme } from "next-themes";

let namedElements: { el: HTMLElement; name: string }[] | null = null;

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const latest = useRef(0);
  const mounted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const isDark = mounted ? resolvedTheme === "dark" : true;

  const toggleTheme = (event: MouseEvent<HTMLButtonElement>) => {
    const next = isDark ? "light" : "dark";
    const root = document.documentElement;

    if (
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTheme(next);
      return;
    }

    if (!namedElements) {
      namedElements = Array.from(
        document.querySelectorAll<HTMLElement>("[style*='view-transition-name']")
      ).map((el) => ({
        el,
        name: el.style.getPropertyValue("view-transition-name"),
      }));
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    namedElements.forEach(({ el }) => {
      el.style.setProperty("view-transition-name", "");
    });

    root.classList.add("theme-transition");
    root.style.setProperty("--theme-x", `${x}px`);
    root.style.setProperty("--theme-y", `${y}px`);
    root.style.setProperty("--theme-r", `${radius}px`);

    const id = ++latest.current;

    const cleanup = () => {
      if (id !== latest.current || !namedElements) return;
      namedElements.forEach(({ el, name }) => {
        el.style.setProperty("view-transition-name", name);
      });
      namedElements = null;
      root.classList.remove("theme-transition");
    };

    const transition = document.startViewTransition(() => {
      root.classList.remove("light", "dark");
      root.classList.add(next);
      root.style.colorScheme = next;
      setTheme(next);
    });

    transition.finished.then(cleanup, cleanup);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        mounted
          ? isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
          : "Toggle theme"
      }
      title={
        mounted
          ? isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
          : "Toggle theme"
      }
      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200/80 bg-white/80 text-zinc-600 shadow-2xs transition-all duration-200 hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-950 active:scale-95 print:hidden dark:border-zinc-800/80 dark:bg-zinc-900/70 dark:text-zinc-400 dark:shadow-none dark:hover:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
    >
      {!mounted ? (
        <span className="h-3.5 w-3.5" aria-hidden="true" />
      ) : (
        <span className="relative h-[15px] w-[15px]" aria-hidden="true">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`absolute inset-0 transition-all duration-300 ${
              isDark ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
            }`}
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`absolute inset-0 transition-all duration-300 ${
              isDark ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
            }`}
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        </span>
      )}
    </button>
  );
}
