import { useEffect, useRef } from "react";
import { animate, rafThrottle, reducedMotion } from "@/lib/anime";

export function HeroAmbient({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const spot = spotRef.current;
    if (!container || !spot) return;
    if (reducedMotion()) return;

    const center = () => {
      const rect = container.getBoundingClientRect();
      animate(spot, { x: rect.width / 2, y: rect.height / 2, duration: 0 });
    };
    center();

    const onMove = rafThrottle((e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      animate(spot, {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        duration: 600,
        ease: "outExpo",
      });
    });
    container.addEventListener("pointermove", onMove);
    return () => container.removeEventListener("pointermove", onMove);
  }, [containerRef]);

  return (
    <>
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
          willChange: "transform",
        }}
      />
      <div aria-hidden className="hero-grain" />
    </>
  );
}
