import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

/**
 * Always-on animated hero scene. Pure SVG/DOM, no external media.
 * Layers: orbiting rings, pulsing core, scanning waveform, particle field,
 * data ticks. Everything loops infinitely so the page never reads as static.
 */
export function HeroScene() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      // Orbits — continuous rotation at different speeds + directions
      gsap.to(".hs-orbit-1", { rotate: 360, duration: 28, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
      gsap.to(".hs-orbit-2", { rotate: -360, duration: 44, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
      gsap.to(".hs-orbit-3", { rotate: 360, duration: 70, ease: "none", repeat: -1, transformOrigin: "50% 50%" });

      // Core pulse
      gsap.to(".hs-core", {
        scale: 1.08,
        duration: 1.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: "50% 50%",
      });

      // Pulse rings — staggered expanding waves
      gsap.utils.toArray<SVGElement>(".hs-pulse").forEach((el, i) => {
        gsap.fromTo(
          el,
          { scale: 0.4, opacity: 0.6, transformOrigin: "50% 50%" },
          {
            scale: 2.4,
            opacity: 0,
            duration: 3.2,
            ease: "power2.out",
            repeat: -1,
            delay: i * 1.06,
          },
        );
      });

      // Orbiting satellite dots
      gsap.utils.toArray<SVGElement>(".hs-sat").forEach((el, i) => {
        gsap.to(el, {
          rotate: i % 2 === 0 ? 360 : -360,
          duration: 12 + i * 4,
          ease: "none",
          repeat: -1,
          transformOrigin: "50% 50%",
        });
      });

      // Floating particles
      gsap.utils.toArray<HTMLElement>(".hs-particle").forEach((el) => {
        const dx = gsap.utils.random(-40, 40);
        const dy = gsap.utils.random(-60, 60);
        const dur = gsap.utils.random(5, 11);
        gsap.to(el, {
          x: dx,
          y: dy,
          duration: dur,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
        gsap.to(el, {
          opacity: gsap.utils.random(0.2, 0.9),
          duration: gsap.utils.random(1.5, 3),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

      // Scanning waveform — animate the d attribute via a proxy
      const wave = ref.current?.querySelector<SVGPathElement>(".hs-wave");
      if (wave) {
        const proxy = { t: 0 };
        const buildPath = (t: number) => {
          const w = 600;
          const h = 60;
          const points: string[] = [];
          const step = 12;
          for (let x = 0; x <= w; x += step) {
            const phase = (x / w) * Math.PI * 4 + t;
            const amp = 18 + Math.sin(t * 0.7 + x * 0.01) * 10;
            const y = h / 2 + Math.sin(phase) * amp * Math.sin(x / w * Math.PI);
            points.push(`${x === 0 ? "M" : "L"} ${x} ${y.toFixed(2)}`);
          }
          return points.join(" ");
        };
        gsap.to(proxy, {
          t: Math.PI * 8,
          duration: 8,
          ease: "none",
          repeat: -1,
          onUpdate: () => wave.setAttribute("d", buildPath(proxy.t)),
        });
      }

      // Scan line drift
      gsap.fromTo(
        ".hs-scan",
        { y: -20, opacity: 0 },
        { y: 220, opacity: 1, duration: 3.6, ease: "sine.inOut", repeat: -1, yoyo: true },
      );

      // Tick stream (data readout) — vertical scroll loop
      gsap.to(".hs-ticks", {
        yPercent: -50,
        duration: 18,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: ref },
  );

  // Generate particles
  const particles = Array.from({ length: 26 });

  return (
    <div ref={ref} aria-hidden className="hero-scene-root pointer-events-none absolute inset-0 z-[5]">
      {/* Particle field */}
      <div className="absolute inset-0">
        {particles.map((_, i) => {
          const left = (i * 53) % 100;
          const top = (i * 37) % 100;
          const size = 2 + (i % 4);
          return (
            <span
              key={i}
              className="hs-particle absolute rounded-full bg-[#1B3A4B]/40"
              style={{ left: `${left}%`, top: `${top}%`, width: size, height: size }}
            />
          );
        })}
      </div>

      {/* Right-side instrument cluster */}
      <div className="absolute right-[4%] top-1/2 -translate-y-1/2 w-[min(46vw,560px)] aspect-square">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <radialGradient id="hs-core-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#C9A46A" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#1B3A4B" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#1B3A4B" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="hs-stroke" x1="0" x2="1">
              <stop offset="0%" stopColor="#1B3A4B" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#1B3A4B" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Pulse rings */}
          <g style={{ transformOrigin: "200px 200px" }}>
            <circle className="hs-pulse" cx="200" cy="200" r="80" fill="none" stroke="#1B3A4B" strokeWidth="1.2" />
            <circle className="hs-pulse" cx="200" cy="200" r="80" fill="none" stroke="#1B3A4B" strokeWidth="1.2" />
            <circle className="hs-pulse" cx="200" cy="200" r="80" fill="none" stroke="#C9A46A" strokeWidth="1.2" />
          </g>

          {/* Orbits */}
          <g className="hs-orbit-3" style={{ transformOrigin: "200px 200px" }}>
            <circle cx="200" cy="200" r="180" fill="none" stroke="url(#hs-stroke)" strokeWidth="1" strokeDasharray="2 6" />
            <circle className="hs-sat" cx="380" cy="200" r="3" fill="#1B3A4B" style={{ transformOrigin: "200px 200px" }} />
          </g>
          <g className="hs-orbit-2" style={{ transformOrigin: "200px 200px" }}>
            <circle cx="200" cy="200" r="140" fill="none" stroke="#1B3A4B" strokeOpacity="0.25" strokeWidth="1" />
            <circle className="hs-sat" cx="340" cy="200" r="4" fill="#C9A46A" style={{ transformOrigin: "200px 200px" }} />
            <circle className="hs-sat" cx="60" cy="200" r="2.5" fill="#1B3A4B" style={{ transformOrigin: "200px 200px" }} />
          </g>
          <g className="hs-orbit-1" style={{ transformOrigin: "200px 200px" }}>
            <circle cx="200" cy="200" r="110" fill="none" stroke="#1B3A4B" strokeOpacity="0.4" strokeWidth="1.2" strokeDasharray="1 4" />
            <rect className="hs-sat" x="307" y="197" width="6" height="6" fill="#1B3A4B" style={{ transformOrigin: "200px 200px" }} />
          </g>

          {/* Core */}
          <g className="hs-core" style={{ transformOrigin: "200px 200px" }}>
            <circle cx="200" cy="200" r="70" fill="url(#hs-core-grad)" />
            <circle cx="200" cy="200" r="38" fill="none" stroke="#1B3A4B" strokeWidth="2" />
            <circle cx="200" cy="200" r="6" fill="#1B3A4B" />
          </g>

          {/* Crosshair frame */}
          <g stroke="#1B3A4B" strokeOpacity="0.5" strokeWidth="1" fill="none">
            <path d="M10 10 L40 10 L40 40" />
            <path d="M390 10 L360 10 L360 40" />
            <path d="M10 390 L40 390 L40 360" />
            <path d="M390 390 L360 390 L360 360" />
          </g>
        </svg>
      </div>

      {/* Bottom-left waveform card */}
      <div className="absolute left-[4%] bottom-[6%] hidden md:block w-[min(40vw,440px)] rounded-2xl border border-[#1B3A4B]/15 bg-[#F4EFE6]/65 backdrop-blur-sm p-4 overflow-hidden">
        <div className="flex items-center justify-between text-[10px] tracking-[0.2em] uppercase text-[#1B3A4B]/60 mb-2">
          <span>HRV · Voice · Stress</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A46A] animate-pulse" />
            On-device
          </span>
        </div>
        <div className="relative h-[70px] overflow-hidden">
          <svg viewBox="0 0 600 60" className="w-full h-full" preserveAspectRatio="none">
            <path className="hs-wave" d="M0 30 L600 30" fill="none" stroke="#1B3A4B" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <div className="hs-scan absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A46A] to-transparent" />
        </div>
        <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-[#1B3A4B]/55">
          <span>72 bpm</span>
          <span>Δ stress 0.41</span>
          <span>conf 0.93</span>
        </div>
      </div>

      {/* Right-side data ticker */}
      <div className="absolute right-[2%] top-[8%] hidden lg:block h-[200px] overflow-hidden text-[10px] font-mono text-[#1B3A4B]/55 leading-[18px]">
        <div className="hs-ticks">
          {Array.from({ length: 2 }).map((_, j) => (
            <div key={j}>
              {[
                "00:21  hrv.read   72  ok",
                "00:22  voice.in   −18db",
                "00:23  pattern    scan",
                "00:24  stress     0.18",
                "00:25  pattern    urgent?",
                "00:26  stress     0.34",
                "00:27  voice.in   −12db",
                "00:28  pattern    coercion",
                "00:29  stress     0.71",
                "00:30  haptic     fire",
                "00:31  alert      kin",
                "00:32  decision   pause",
              ].map((line) => (
                <div key={`${j}-${line}`}>{line}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
