// Thin re-export + helpers for anime.js v4.
export { animate, createTimeline, createTimer, stagger, utils, eases } from "animejs";
import { animate, utils } from "animejs";

// Animations always play — OS-level reduce-motion preference is intentionally ignored.
export const reducedMotion = () => false;

/**
 * IntersectionObserver-based "play once when visible" helper.
 * Returns a disconnect function for cleanup.
 */
export function onInView(
  targets: Element | Element[] | NodeListOf<Element>,
  cb: (el: Element) => void,
  opts: IntersectionObserverInit = { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
) {
  const list: Element[] = Array.isArray(targets)
    ? targets
    : targets instanceof Element
      ? [targets]
      : Array.from(targets);
  if (!list.length) return () => {};
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        cb(e.target);
        io.unobserve(e.target);
      }
    });
  }, opts);
  list.forEach((el) => io.observe(el));
  return () => io.disconnect();
}

/** Throttle to next animation frame. */
export function rafThrottle<T extends (...args: any[]) => void>(fn: T): T {
  let frame = 0;
  let lastArgs: any[] | null = null;
  return ((...args: any[]) => {
    lastArgs = args;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      if (lastArgs) fn(...lastArgs);
    });
  }) as T;
}

export { animate as anime };
export { utils as animeUtils };
