import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type Props = {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  duration?: number;
};

/** Counts up from 0 to `to` when scrolled into view. */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
  duration = 2,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const format = (v: number) => {
      const n = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString();
      return `${prefix}${n}${suffix}`;
    };
    if (reduced) {
      el.textContent = format(to);
      return;
    }
    el.textContent = format(0);
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: to,
      duration,
      ease: "expo.out",
      onUpdate: () => {
        el.textContent = format(obj.v);
      },
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [to, prefix, suffix, decimals, duration]);

  return <span ref={ref} className={className}>{prefix}0{suffix}</span>;
}
