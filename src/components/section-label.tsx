import type { ReactNode } from "react";

export function SectionLabel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-mono text-xs text-zinc-500 dark:text-zinc-400 ${className}`}
    >
      {children}
    </p>
  );
}
