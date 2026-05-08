import { useEffect, useRef } from "react";

/** Deep-teal panel that slides off the screen on first paint. */
export function PageCurtain() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.style.display = "none";
      return;
    }
    // Two RAFs so the initial transform commits before transitioning.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transform = "translateY(-100%)";
      });
    });
    const t = window.setTimeout(() => {
      el.style.display = "none";
    }, 1300);
    return () => clearTimeout(t);
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
        transform: "translateY(0)",
        transition: "transform 1050ms cubic-bezier(0.86, 0, 0.07, 1)",
        willChange: "transform",
      }}
    />
  );
}
