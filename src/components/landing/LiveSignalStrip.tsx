import { useEffect, useRef } from "react";
import { reducedMotion } from "@/lib/anime";

/**
 * A faux "live" telemetry strip — mono digits that gently mutate.
 * Sells "this thing is alive" without being a real chart.
 */
export function LiveSignalStrip({ className = "" }: { className?: string }) {
  const hrvRef = useRef<HTMLSpanElement>(null);
  const voiceRef = useRef<HTMLSpanElement>(null);
  const stateRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reducedMotion()) return;
    const states = ["calm", "calm", "calm", "alert", "calm"];
    let i = 0;
    const tick = () => {
      const hrv = 56 + Math.round(Math.random() * 14);
      const voice = (0.02 + Math.random() * 0.06).toFixed(2);
      if (hrvRef.current) hrvRef.current.textContent = String(hrv);
      if (voiceRef.current) voiceRef.current.textContent = voice;
      if (stateRef.current && dotRef.current) {
        const next = states[i % states.length];
        stateRef.current.textContent = next;
        const isAlert = next === "alert";
        stateRef.current.style.color = isAlert ? "#C9A46A" : "rgba(27,58,75,0.85)";
        if (isAlert) {
          dotRef.current.classList.remove("gold-flash");
          void dotRef.current.offsetWidth;
          dotRef.current.classList.add("gold-flash");
        }
        i++;
      }
    };
    tick();
    const id = window.setInterval(tick, 1800);
    return () => window.clearInterval(id);
  }, []);

  const cell = "tabular-nums";

  return (
    <div
      className={`inline-flex items-center gap-3 text-[11px] tracking-[0.18em] uppercase text-[#1B3A4B]/70 font-medium ${className}`}
      style={{ fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace" }}
      aria-hidden
    >
      <span className="relative flex items-center gap-1.5">
        <span
          ref={dotRef}
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background: "#C9A46A",
            boxShadow: "0 0 0 0 rgba(201,164,106,0.6)",
            animation: "pulse-gold 1.8s ease-out infinite",
          }}
        />
        <span>Live</span>
      </span>
      <span className="text-[#1B3A4B]/30">·</span>
      <span>HRV <span ref={hrvRef} className={cell}>62</span>ms</span>
      <span className="text-[#1B3A4B]/30">·</span>
      <span>Voice Δ <span ref={voiceRef} className={cell}>0.04</span></span>
      <span className="text-[#1B3A4B]/30">·</span>
      <span>State <span ref={stateRef} className={cell} style={{ color: "rgba(27,58,75,0.85)" }}>calm</span></span>
      <style>{`
        @keyframes pulse-gold {
          0%   { box-shadow: 0 0 0 0 rgba(201,164,106,0.55); }
          70%  { box-shadow: 0 0 0 10px rgba(201,164,106,0); }
          100% { box-shadow: 0 0 0 0 rgba(201,164,106,0); }
        }
      `}</style>
    </div>
  );
}
