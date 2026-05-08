import React from "react";

type Props = {
  children: string;
  by?: "word" | "char";
  className?: string;
  itemClassName?: string;
};

/**
 * Splits text into spans for word/char-level animation targets.
 * Each span gets the .anim-word or .anim-char class so GSAP can target it.
 */
export function SplitText({ children, by = "word", className, itemClassName }: Props) {
  const tokens = by === "word" ? children.split(/(\s+)/) : Array.from(children);

  return (
    <span className={className} aria-label={children}>
      {tokens.map((tok, i) => {
        if (by === "word" && /^\s+$/.test(tok)) return <span key={i}>{tok}</span>;
        return (
          <span
            key={i}
            aria-hidden="true"
            className={`inline-block will-change-transform ${by === "word" ? "anim-word" : "anim-char"} ${itemClassName ?? ""}`}
          >
            {tok}
          </span>
        );
      })}
    </span>
  );
}
