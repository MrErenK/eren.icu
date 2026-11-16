"use client";

import { useState } from "react";
import { PROFILE } from "@/lib/content";

export function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={() => void handleCopy()}
      className="inline-flex items-center gap-2 rounded-lg border border-zinc-200/80 bg-zinc-100/80 px-3 py-1.5 font-mono text-xs text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-200/70 hover:text-zinc-950 dark:border-zinc-800/80 dark:bg-zinc-800/60 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
    >
      <span>{copied ? "Copied to clipboard" : "Copy address"}</span>
    </button>
  );
}
