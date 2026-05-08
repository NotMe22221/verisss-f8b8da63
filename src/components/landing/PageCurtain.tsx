import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/** Deep-teal panel that slides off the screen on first paint. */
export function PageCurtain() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      el.style.display = "none";
      return;
    }
    gsap.to(el, {
      yPercent: -100,
      duration: 1.05,
      ease: "expo.inOut",
      delay: 0.05,
      onComplete: () => {
        el.style.display = "none";
      },
    });
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        background: "#1B3A4B",
        zIndex: 9998,
        pointerEvents: "none",
      }}
    />
  );
}
