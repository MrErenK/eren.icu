import type { ReactNode } from "react";
import { SectionLabel } from "@/components/section-label";

interface PageHeaderProps {
  kicker?: string;
  title: ReactNode;
  description?: ReactNode;
  titleClassName?: string;
  size?: "default" | "large";
}

export function PageHeader({
  kicker,
  title,
  description,
  titleClassName = "max-w-2xl",
  size = "default",
}: PageHeaderProps) {
  return (
    <header>
      {kicker ? (
        <div className="reveal">
          <SectionLabel>{kicker}</SectionLabel>
        </div>
      ) : null}
      <h1
        style={{ textWrap: "wrap" }}
        className={`reveal-1 ${kicker ? "mt-3" : ""} font-display font-semibold leading-[1.06] tracking-[-0.035em] text-zinc-950 dark:text-zinc-50 ${
          size === "large"
            ? "text-4xl sm:text-5xl lg:text-6xl"
            : "text-3xl sm:text-4xl lg:text-5xl"
        } ${titleClassName}`}
      >
        {title}
      </h1>
      {description ? (
        <p className="reveal-2 mt-5 max-w-xl text-[15.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      ) : null}
    </header>
  );
}
