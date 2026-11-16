import type { ReactNode } from "react";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center whitespace-nowrap rounded-md border border-zinc-200/80 bg-zinc-100/80 px-2.5 py-1 font-mono text-[11px] text-zinc-600 dark:border-zinc-800/80 dark:bg-zinc-800/60 dark:text-zinc-400">
      {children}
    </span>
  );
}
