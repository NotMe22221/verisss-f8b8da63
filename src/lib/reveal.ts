import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Apply scroll-triggered reveals to all marker classes inside a scope.
 * - .reveal-eyebrow: small caps slide in from left
 * - .reveal-head: words rise from below a mask (requires <SplitText>)
 * - .reveal-up: paragraphs / cards / stats fade-rise
 * - .reveal-stagger: children stagger in
 *
 * Critical: every target is hidden via gsap.set FIRST so the browser never
 * paints the "before" state visibly. That's what makes the reveal read.
 */
export function revealAll(scope: HTMLElement) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const eyebrows = scope.querySelectorAll<HTMLElement>(".reveal-eyebrow");
  const heads = scope.querySelectorAll<HTMLElement>(".reveal-head");
  const ups = scope.querySelectorAll<HTMLElement>(".reveal-up");
  const staggers = scope.querySelectorAll<HTMLElement>(".reveal-stagger");

  if (reduced) {
    if (eyebrows.length) gsap.set(eyebrows, { clearProps: "all", opacity: 1, x: 0 });
    if (ups.length) gsap.set(ups, { clearProps: "all", opacity: 1, y: 0 });
    heads.forEach((h) => {
      const w = h.querySelectorAll(".anim-word, .anim-char");
      if (w.length) gsap.set(w, { clearProps: "all", yPercent: 0, opacity: 1 });
    });
    staggers.forEach((s) => {
      const kids = Array.from(s.children);
      if (kids.length) gsap.set(kids, { clearProps: "all", opacity: 1, y: 0 });
    });
    return;
  }

  // Hide everything immediately.
  if (eyebrows.length) gsap.set(eyebrows, { opacity: 0, x: -16 });
  if (ups.length) gsap.set(ups, { opacity: 0, y: 56 });
  heads.forEach((h) => {
    const words = h.querySelectorAll(".anim-word, .anim-char");
    if (words.length) gsap.set(words, { yPercent: 115, opacity: 0 });
  });
  staggers.forEach((s) => {
    const kids = Array.from(s.children);
    if (kids.length) gsap.set(kids, { opacity: 0, y: 48 });
  });

  // Animate in on scroll.
  eyebrows.forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: 0.9,
      ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 92%", once: true },
    });
  });

  heads.forEach((head) => {
    const words = head.querySelectorAll(".anim-word, .anim-char");
    if (!words.length) return;
    gsap.to(words, {
      yPercent: 0,
      opacity: 1,
      duration: 1.15,
      ease: "expo.out",
      stagger: 0.045,
      scrollTrigger: { trigger: head, start: "top 90%", once: true },
    });
  });

  ups.forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1.1,
      ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 92%", once: true },
    });
  });

  staggers.forEach((s) => {
    gsap.to(Array.from(s.children), {
      opacity: 1,
      y: 0,
      duration: 1.1,
      ease: "expo.out",
      stagger: 0.08,
      scrollTrigger: { trigger: s, start: "top 88%", once: true },
    });
  });

  // Refresh after fonts so trigger positions are accurate.
  if (typeof document !== "undefined" && (document as any).fonts?.ready) {
    (document as any).fonts.ready.then(() => ScrollTrigger.refresh());
  }
}
