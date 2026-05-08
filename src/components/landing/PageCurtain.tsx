import { useEffect, useRef } from "react";
import { animate, reducedMotion } from "@/lib/anime";

/** Deep-teal panel that slides off the screen on first paint. */
export function PageCurtain() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion()) {
      el.style.display = "none";
      return;
    }
    animate(el, {
      translateY: ["0%", "-100%"],
      duration: 1050,
      ease: "inOutExpo",
      delay: 50,
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
