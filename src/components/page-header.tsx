import type { ReactNode } from "react";
import { SectionLabel } from "@/components/section-label";

interface PageHeaderProps {
  kicker: string;
  title: ReactNode;
  description?: ReactNode;
  titleClassName?: string;
  size?: "default" | "large";
  folio?: string;
}

export function PageHeader({
  kicker,
  title,
  description,
  titleClassName = "max-w-xl",
  size = "default",
  folio = "Portfolio / 2026",
}: PageHeaderProps) {
  return (
    <header>
      <div className="reveal flex items-center justify-between gap-4 border-b border-zinc-200/80 pb-3 dark:border-zinc-800/80">
        <SectionLabel>{kicker}</SectionLabel>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">
          {folio}
        </span>
      </div>
      <h1
        style={{ textWrap: "wrap" }}
        className={`reveal-1 mt-8 font-serif font-normal leading-[0.98] tracking-[-0.03em] text-zinc-950 dark:text-zinc-50 ${
          size === "large"
            ? "text-5xl sm:text-6xl lg:text-7xl"
            : "text-4xl sm:text-5xl lg:text-6xl"
        } ${titleClassName}`}
      >
        {title}
      </h1>
      {description ? (
        <p className="reveal-2 mt-6 max-w-xl text-[15.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      ) : null}
    </header>
  );
}
