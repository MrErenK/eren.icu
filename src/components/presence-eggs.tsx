"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { PROFILE } from "@/lib/content";

const DOMAIN_TITLE = `${PROFILE.handle}${PROFILE.tld}`;
const AWAY_TITLES = [PROFILE.easterEgg, "still here", "left the tab open"];

interface PresenceState {
  mounted: boolean;
  tabSwitches: number;
  idleSeconds: number;
  icuPeek: boolean;
}

const DEFAULT_STATE: PresenceState = {
  mounted: false,
  tabSwitches: 0,
  idleSeconds: 0,
  icuPeek: false,
};

const PresenceContext = createContext<PresenceState>(DEFAULT_STATE);

export function PresenceEggsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [state, setState] = useState<PresenceState>(DEFAULT_STATE);

  const initializedRef = useRef(false);
  const lastActivityRef = useRef(0);
  const baseTitleRef = useRef(DOMAIN_TITLE);
  const titleShiftedRef = useRef(false);
  const awayCountRef = useRef(0);
  const keyBufferRef = useRef("");

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    lastActivityRef.current = Date.now();

    baseTitleRef.current = document.title || DOMAIN_TITLE;

    console.info(
      `%c${DOMAIN_TITLE}\n%c${PROFILE.easterEgg}.`,
      "font-weight: 600; color: inherit;",
      "color: #71717a;"
    );

    queueMicrotask(() => {
      setState((prev) => ({ ...prev, mounted: true }));
    });
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!titleShiftedRef.current) {
        baseTitleRef.current = document.title || DOMAIN_TITLE;
      }
    }, 150);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    let awayTimer: number | null = null;
    let returnTimer: number | null = null;
    let peekTimer: number | null = null;

    const resetIdle = () => {
      lastActivityRef.current = Date.now();
      setState((prev) =>
        prev.idleSeconds === 0 ? prev : { ...prev, idleSeconds: 0 }
      );
    };

    const handleVisibility = () => {
      if (document.visibilityState === "hidden") {
        if (!titleShiftedRef.current) {
          baseTitleRef.current = document.title || DOMAIN_TITLE;
        }
        if (awayTimer) window.clearTimeout(awayTimer);
        awayTimer = window.setTimeout(() => {
          if (document.visibilityState === "hidden") {
            const nextTitle =
              AWAY_TITLES[awayCountRef.current % AWAY_TITLES.length];
            awayCountRef.current += 1;
            titleShiftedRef.current = true;
            document.title = nextTitle;
          }
        }, 2500);
      } else {
        if (awayTimer) {
          window.clearTimeout(awayTimer);
          awayTimer = null;
        }
        lastActivityRef.current = Date.now();
        setState((prev) => ({
          ...prev,
          tabSwitches: prev.tabSwitches + 1,
          idleSeconds: 0,
        }));

        if (titleShiftedRef.current) {
          if (returnTimer) window.clearTimeout(returnTimer);
          const restoreTo = baseTitleRef.current || DOMAIN_TITLE;
          returnTimer = window.setTimeout(() => {
            document.title = restoreTo;
            titleShiftedRef.current = false;
          }, 550);
        }
      }
    };

    const handleKeydown = (e: KeyboardEvent) => {
      resetIdle();
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key.length === 1) {
        keyBufferRef.current = (
          keyBufferRef.current + e.key.toLowerCase()
        ).slice(-3);
        if (keyBufferRef.current === "icu") {
          keyBufferRef.current = "";
          setState((prev) => ({ ...prev, icuPeek: true }));
          if (peekTimer) window.clearTimeout(peekTimer);
          peekTimer = window.setTimeout(() => {
            setState((prev) => ({ ...prev, icuPeek: false }));
          }, 3400);
        }
      }
    };

    const tick = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      const idle = Math.floor((Date.now() - lastActivityRef.current) / 1000);
      setState((prev) =>
        prev.idleSeconds === idle ? prev : { ...prev, idleSeconds: idle }
      );
    }, 1000);

    window.addEventListener("pointermove", resetIdle, { passive: true });
    window.addEventListener("scroll", resetIdle, { passive: true });
    window.addEventListener("keydown", handleKeydown);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.clearInterval(tick);
      if (awayTimer) window.clearTimeout(awayTimer);
      if (returnTimer) window.clearTimeout(returnTimer);
      if (peekTimer) window.clearTimeout(peekTimer);
      window.removeEventListener("pointermove", resetIdle);
      window.removeEventListener("scroll", resetIdle);
      window.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const value = useMemo(() => state, [state]);

  return (
    <PresenceContext.Provider value={value}>{children}</PresenceContext.Provider>
  );
}

export function usePresenceEggs() {
  return useContext(PresenceContext);
}
