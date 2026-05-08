import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * A custom cursor: small dot + lagging ring. Hidden on touch devices and
 * when prefers-reduced-motion is set. Grows over interactive elements.
 */
export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    dot.style.opacity = "1";
    ring.style.opacity = "1";

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    let scale = 1;
    const onMove = (e: PointerEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);

      const t = e.target as HTMLElement | null;
      const interactive = !!t?.closest(
        "a, button, input, textarea, [role='button'], [data-cursor='hover']",
      );
      const wantScale = interactive ? 2.4 : 1;
      if (wantScale !== scale) {
        scale = wantScale;
        gsap.to(ring, { scale, duration: 0.4, ease: "power3.out" });
      }
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="cursor-ring"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          marginLeft: -18,
          marginTop: -18,
          borderRadius: 999,
          border: "1px solid rgba(27,58,75,0.55)",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0,
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="cursor-dot"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          borderRadius: 999,
          background: "#1B3A4B",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0,
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}
