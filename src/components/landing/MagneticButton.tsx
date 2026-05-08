import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  strength?: number;
  children: React.ReactNode;
  as?: "div" | "span";
};

/**
 * Wraps any element to add a subtle cursor-magnetic hover effect.
 * Disabled on touch devices and when reduced motion is preferred.
 */
export function Magnetic({ children, strength = 0.35, className, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const inner = el.firstElementChild as HTMLElement | null;
    const target = inner ?? el;
    const xTo = gsap.quickTo(target, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(target, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      xTo((e.clientX - cx) * strength);
      yTo((e.clientY - cy) * strength);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={className} {...rest}>
      {children}
    </div>
  );
}
