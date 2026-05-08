import { animate, stagger, onInView, reducedMotion, animeUtils } from "@/lib/anime";

/**
 * Apply scroll-triggered reveals to all marker classes inside a scope using
 * anime.js v4 + IntersectionObserver.
 *  - .reveal-eyebrow: small caps slide in from left
 *  - .reveal-head: words rise from below a mask (requires <SplitText>)
 *  - .reveal-up: paragraphs / cards / stats fade-rise
 *  - .reveal-stagger: children stagger in
 *
 * Returns a cleanup function that disconnects every observer.
 */
export function revealAll(scope: HTMLElement): () => void {
  const reduced = reducedMotion();

  const eyebrows = Array.from(scope.querySelectorAll<HTMLElement>(".reveal-eyebrow"));
  const heads = Array.from(scope.querySelectorAll<HTMLElement>(".reveal-head"));
  const ups = Array.from(scope.querySelectorAll<HTMLElement>(".reveal-up"));
  const staggers = Array.from(scope.querySelectorAll<HTMLElement>(".reveal-stagger"));

  if (reduced) {
    [...eyebrows, ...ups].forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    heads.forEach((h) => {
      h.querySelectorAll<HTMLElement>(".anim-word, .anim-char").forEach((w) => {
        w.style.opacity = "1";
        w.style.transform = "none";
      });
    });
    staggers.forEach((s) => {
      Array.from(s.children).forEach((c) => {
        (c as HTMLElement).style.opacity = "1";
        (c as HTMLElement).style.transform = "none";
      });
    });
    return () => {};
  }

  // Pre-hide via inline styles so there's no FOUC if observers haven't fired.
  eyebrows.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateX(-16px)";
    el.style.willChange = "transform, opacity";
  });
  ups.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(56px)";
    el.style.willChange = "transform, opacity";
  });
  heads.forEach((h) => {
    h.querySelectorAll<HTMLElement>(".anim-word, .anim-char").forEach((w) => {
      w.style.opacity = "0";
      w.style.transform = "translateY(115%)";
      w.style.willChange = "transform, opacity";
    });
  });
  staggers.forEach((s) => {
    Array.from(s.children).forEach((c) => {
      const el = c as HTMLElement;
      el.style.opacity = "0";
      el.style.transform = "translateY(48px)";
      el.style.willChange = "transform, opacity";
    });
  });

  const cleanups: Array<() => void> = [];

  cleanups.push(
    onInView(eyebrows, (el) => {
      animate(el, {
        opacity: [0, 1],
        translateX: [-16, 0],
        duration: 900,
        ease: "outExpo",
      });
    }),
  );

  cleanups.push(
    onInView(heads, (head) => {
      const words = head.querySelectorAll<HTMLElement>(".anim-word, .anim-char");
      if (!words.length) return;
      animate(words, {
        opacity: [0, 1],
        translateY: ["115%", "0%"],
        duration: 1150,
        ease: "outExpo",
        delay: stagger(45),
      });
    }),
  );

  cleanups.push(
    onInView(ups, (el) => {
      animate(el, {
        opacity: [0, 1],
        translateY: [56, 0],
        duration: 1100,
        ease: "outExpo",
      });
    }),
  );

  cleanups.push(
    onInView(staggers, (s) => {
      const kids = Array.from(s.children) as HTMLElement[];
      if (!kids.length) return;
      animate(kids, {
        opacity: [0, 1],
        translateY: [48, 0],
        duration: 1100,
        ease: "outExpo",
        delay: stagger(80),
      });
    }),
  );

  return () => cleanups.forEach((c) => c());
}
