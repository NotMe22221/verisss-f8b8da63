import { useEffect, useRef } from "react";
import { animate, reducedMotion } from "@/lib/anime";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  strength?: number;
  children: React.ReactNode;
};

export function Magnetic({ children, strength = 0.35, className, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const inner = (el.firstElementChild as HTMLElement | null) ?? el;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      animate(inner, {
        x: (e.clientX - cx) * strength,
        y: (e.clientY - cy) * strength,
        duration: 450,
        ease: "outExpo",
      });
    };
    const onLeave = () => {
      animate(inner, { x: 0, y: 0, duration: 600, ease: "outElastic(1, .6)" });
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
