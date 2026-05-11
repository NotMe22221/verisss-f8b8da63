import { useEffect, useRef } from "react";
import { animate, rafThrottle, reducedMotion } from "@/lib/anime";

/**
 * Custom cursor: small ink dot + lagging ring. Only mounts on devices with a
 * fine pointer and respects reduced motion.
 */
export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (reducedMotion()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    document.body.classList.add("has-custom-cursor");

    // Park them off-screen until first move so they don't flash at 0,0.
    dot.style.transform = "translate3d(-100px,-100px,0)";
    ring.style.transform = "translate3d(-100px,-100px,0)";
    dot.style.opacity = "1";
    ring.style.opacity = "1";

    let dx = -100, dy = -100, rx = -100, ry = -100;
    let scale = 1;

    const onMove = rafThrottle((e: PointerEvent) => {
      dx = e.clientX;
      dy = e.clientY;
      rx = e.clientX;
      ry = e.clientY;
      animate(dot, { x: dx, y: dy, duration: 120, ease: "outQuad" });
      animate(ring, { x: rx, y: ry, duration: 320, ease: "outExpo" });

      const t = e.target as HTMLElement | null;
      const interactive = !!t?.closest(
        "a, button, input, textarea, [role='button'], [data-cursor='hover']",
      );
      const wantScale = interactive ? 1.8 : 1;
      if (wantScale !== scale) {
        scale = wantScale;
        animate(ring, { scale, duration: 320, ease: "outExpo" });
      }
    });

    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  const baseStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    pointerEvents: "none",
    zIndex: 2147483647,
    opacity: 0,
    willChange: "transform",
  };

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        style={{
          ...baseStyle,
          width: 38,
          height: 38,
          marginLeft: -19,
          marginTop: -19,
          borderRadius: 999,
          border: "1.5px solid #1B3A4B",
          boxShadow: "0 0 0 1px rgba(244,239,230,0.6)",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        style={{
          ...baseStyle,
          width: 8,
          height: 8,
          marginLeft: -4,
          marginTop: -4,
          borderRadius: 999,
          background: "#1B3A4B",
          boxShadow: "0 0 0 2px rgba(244,239,230,0.8), 0 6px 18px rgba(27,58,75,0.35)",
        }}
      />
    </>
  );
}
