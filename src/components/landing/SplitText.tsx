import React from "react";

type Props = {
  children: string;
  by?: "word" | "char";
  className?: string;
  itemClassName?: string;
};

/**
 * Splits text into spans wrapped in an overflow-hidden mask so GSAP can do a
 * proper "rise from below" reveal. Each visible token becomes:
 *   <span class="mask-word"><span class="anim-word">…</span></span>
 */
export function SplitText({ children, by = "word", className, itemClassName }: Props) {
  const tokens = by === "word" ? children.split(/(\s+)/) : Array.from(children);
  const innerClass = by === "word" ? "anim-word" : "anim-char";
  const maskClass = by === "word" ? "mask-word" : "mask-char";

  return (
    <span className={className} aria-label={children}>
      {tokens.map((tok, i) => {
        if (by === "word" && /^\s+$/.test(tok)) return <span key={i}>{tok}</span>;
        return (
          <span key={i} aria-hidden="true" className={maskClass}>
            <span className={`${innerClass} ${itemClassName ?? ""}`}>{tok}</span>
          </span>
        );
      })}
    </span>
  );
}
