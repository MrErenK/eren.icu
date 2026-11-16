"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

export function TiltCard({
  children,
  strength = 2,
}: {
  children: ReactNode;
  strength?: number;
}) {
  const tiltRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;

    const el = tiltRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;

    el.style.transform = `perspective(900px) rotateX(${(-py * strength).toFixed(2)}deg) rotateY(${(px * strength * 1.3).toFixed(2)}deg)`;
  };

  const handlePointerLeave = () => {
    const el = tiltRef.current;
    if (el) el.style.transform = "";
  };

  return (
    <div>
      <div
        ref={tiltRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="tilt-inner transition-transform duration-300 ease-out will-change-transform"
      >
        {children}
      </div>
    </div>
  );
}
