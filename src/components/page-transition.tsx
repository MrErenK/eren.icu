import { ViewTransition } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition
      enter={{
        "nav-forward": "page-forward",
        "nav-back": "page-back",
        default: "page-crossfade",
      }}
      exit={{
        "nav-forward": "page-forward",
        "nav-back": "page-back",
        default: "page-crossfade",
      }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
