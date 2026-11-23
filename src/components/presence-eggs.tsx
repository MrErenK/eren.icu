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
  icuPeek: boolean;
}

const DEFAULT_STATE: PresenceState = {
  icuPeek: false,
};

const PresenceContext = createContext<PresenceState>(DEFAULT_STATE);

export function PresenceEggsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [icuPeek, setIcuPeek] = useState(false);

  const initializedRef = useRef(false);
  const baseTitleRef = useRef(DOMAIN_TITLE);
  const titleShiftedRef = useRef(false);
  const awayCountRef = useRef(0);
  const keyBufferRef = useRef("");

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    baseTitleRef.current = document.title || DOMAIN_TITLE;

    console.info(
      `%c${DOMAIN_TITLE}\n%c${PROFILE.easterEgg}.`,
      "font-weight: 600; color: inherit;",
      "color: #71717a;"
    );
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
          setIcuPeek(true);
          if (peekTimer) window.clearTimeout(peekTimer);
          peekTimer = window.setTimeout(() => {
            setIcuPeek(false);
          }, 3400);
        }
      }
    };

    window.addEventListener("keydown", handleKeydown);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      if (awayTimer) window.clearTimeout(awayTimer);
      if (returnTimer) window.clearTimeout(returnTimer);
      if (peekTimer) window.clearTimeout(peekTimer);
      window.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const value = useMemo(() => ({ icuPeek }), [icuPeek]);

  return (
    <PresenceContext.Provider value={value}>{children}</PresenceContext.Provider>
  );
}

export function usePresenceEggs() {
  return useContext(PresenceContext);
}
