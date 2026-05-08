import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Ambient layers for the hero: an animated gradient mesh, a cursor-following
 * spotlight, and a subtle grain. Sits absolutely behind the foreground text.
 * Pass a ref to the hero container to limit pointer tracking to that area.
 */
export function HeroAmbient({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const spot = spotRef.current;
    if (!container || !spot) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const setX = gsap.quickTo(spot, "x", { duration: 0.6, ease: "power3.out" });
    const setY = gsap.quickTo(spot, "y", { duration: 0.6, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      setX(e.clientX - rect.left);
      setY(e.clientY - rect.top);
    };
    container.addEventListener("pointermove", onMove);

    // Center it initially.
    const rect = container.getBoundingClientRect();
    setX(rect.width / 2);
    setY(rect.height / 2);

    return () => container.removeEventListener("pointermove", onMove);
  }, [containerRef]);

  return (
    <>
      {/* Animated gradient mesh */}
      <div
        aria-hidden
        className="hero-mesh"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.55,
          mixBlendMode: "soft-light",
          pointerEvents: "none",
        }}
      />
      {/* Cursor spotlight */}
      <div
        ref={spotRef}
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 600,
          height: 600,
          marginLeft: -300,
          marginTop: -300,
          borderRadius: 999,
          background:
            "radial-gradient(circle, rgba(244,239,230,0.55) 0%, rgba(244,239,230,0.18) 35%, transparent 70%)",
          pointerEvents: "none",
          mixBlendMode: "soft-light",
          filter: "blur(10px)",
        }}
      />
      {/* Grain */}
      <div aria-hidden className="hero-grain" />
    </>
  );
}
