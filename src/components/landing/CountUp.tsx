import { useEffect, useRef } from "react";
import { animate, onInView, reducedMotion } from "@/lib/anime";

type Props = {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  duration?: number;
};

export function CountUp({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
  duration = 2000,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const format = (v: number) => {
      const n = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString();
      return `${prefix}${n}${suffix}`;
    };
    if (reducedMotion()) {
      el.textContent = format(to);
      return;
    }
    el.textContent = format(0);
    const obj = { v: 0 };
    const disconnect = onInView(el, () => {
      animate(obj, {
        v: to,
        duration,
        ease: "outExpo",
        onUpdate: () => {
          el.textContent = format(obj.v);
        },
      });
    });
    return disconnect;
  }, [to, prefix, suffix, decimals, duration]);

  return <span ref={ref} className={className}>{prefix}0{suffix}</span>;
}
