import { useEffect, useRef, useState } from "react";
import { Phone, PhoneOff, ShieldAlert, RotateCcw, Bell } from "lucide-react";
import { animate, createTimeline } from "@/lib/anime";

type Line = { who: "scammer" | "parent"; text: string; delay: number };

const SCRIPT: Line[] = [
  { who: "scammer", text: "Grandma, it's me. I'm in trouble — please don't tell mom.", delay: 0 },
  { who: "parent", text: "Oh no, sweetheart, what happened?", delay: 1600 },
  { who: "scammer", text: "I was in an accident. I need $4,800 for bail. Right now.", delay: 3000 },
  { who: "scammer", text: "Don't hang up. Stay on the line. Get gift cards from CVS.", delay: 4600 },
  { who: "scammer", text: "Hurry — they'll move me in 20 minutes if you don't.", delay: 6000 },
];

export function ScamCallDemo() {
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState<number>(0);
  const [stress, setStress] = useState(0);
  const [intervened, setIntervened] = useState(false);
  const [alerted, setAlerted] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<ReturnType<typeof createTimeline> | null>(null);

  function reset() {
    tlRef.current?.pause();
    tlRef.current = null;
    setPlaying(false);
    setVisible(0);
    setStress(0);
    setIntervened(false);
    setAlerted(false);
  }

  function play() {
    reset();
    setPlaying(true);
    const tl = createTimeline({ defaults: { duration: 1 } });
    tlRef.current = tl;

    SCRIPT.forEach((line, i) => {
      const obj = { v: i === 0 ? 0 : Math.min(100, 18 + (i - 1) * 22) };
      tl.call(() => setVisible(i + 1), line.delay);
      tl.add(obj, {
        v: Math.min(100, 18 + i * 22),
        duration: 800,
        onUpdate: () => setStress(Math.round(obj.v)),
      }, line.delay);
    });

    tl.call(() => {
      setIntervened(true);
      const r = ringRef.current;
      if (r) {
        r.classList.remove("haptic-shake", "gold-flash");
        // Force reflow to restart animations.
        void r.offsetWidth;
        r.classList.add("haptic-shake", "gold-flash");
        animate(r, {
          scale: [1, 1.06, 1, 1.06, 1],
          duration: 900,
          ease: "inOutQuad",
        });
      }
    }, 4400);
    tl.call(() => setAlerted(true), 6400);
    tl.call(() => setPlaying(false), 6800);
  }

  useEffect(() => () => { tlRef.current?.pause(); }, []);

  return (
    <section id="see-it-work" className="bg-[#F4EFE6] px-6 lg:px-12 py-24 lg:py-36 border-t border-[#1B3A4B]/10">
      <div className="max-w-[88rem] mx-auto">
        <p className="text-[#1B3A4B]/60 text-sm mb-3 reveal-eyebrow">See it work</p>
        <h2 className="text-[#1B3A4B] text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-[1.05] max-w-3xl lg:max-w-5xl mb-10 lg:mb-16 reveal-head" style={{ letterSpacing: "-0.04em" }}>
          Watch a real scam, intercepted in real time.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-4 lg:gap-6 items-stretch">
          <div className="rounded-2xl bg-[#1B3A4B] p-6 md:p-8 lg:p-10 min-h-[520px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F4EFE6]/10 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-[#F4EFE6]/70" />
                </div>
                <div>
                  <p className="text-[#F4EFE6] text-sm font-medium">Unknown caller</p>
                  <p className="text-[#F4EFE6]/40 text-xs">Inbound · 00:0{Math.min(9, Math.max(1, visible))}</p>
                </div>
              </div>
              <span className="text-[10px] font-medium tracking-[0.18em] uppercase text-[#F4EFE6]/40">Live transcript</span>
            </div>

            <div className="flex-1 flex flex-col gap-3">
              {SCRIPT.slice(0, visible).map((line, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm md:text-base leading-snug animate-[fade-in_0.4s_ease-out] ${
                    line.who === "scammer"
                      ? "bg-[#F4EFE6]/10 text-[#F4EFE6] self-start rounded-bl-sm"
                      : "bg-[#F4EFE6] text-[#1B3A4B] self-end rounded-br-sm"
                  }`}
                >
                  {line.text}
                </div>
              ))}
              {!playing && visible === 0 && (
                <div className="flex-1 flex items-center justify-center text-[#F4EFE6]/40 text-sm">
                  Press play to start the scenario.
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={playing ? reset : play}
                className="inline-flex items-center gap-2 bg-[#F4EFE6] text-[#1B3A4B] text-sm font-medium px-5 py-2.5 rounded-full hover:bg-white transition-colors"
              >
                {playing ? <><PhoneOff className="w-4 h-4" /> Stop</> : <><Phone className="w-4 h-4" /> Play scenario</>}
              </button>
              {(intervened || alerted) && (
                <button onClick={reset} className="inline-flex items-center gap-2 text-[#F4EFE6]/60 hover:text-[#F4EFE6] text-sm">
                  <RotateCcw className="w-4 h-4" /> Replay
                </button>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-[#1B3A4B]/15 p-6 md:p-8 lg:p-10 min-h-[520px] flex flex-col bg-[#F4EFE6] relative overflow-hidden">
            <p className="text-[#1B3A4B]/50 text-xs font-medium tracking-[0.18em] uppercase mb-6">Veris ring · live</p>

            <div className="flex-1 flex items-center justify-center">
              <div ref={ringRef} className="relative">
                <div className={`w-44 h-44 md:w-52 md:h-52 rounded-full border-[14px] border-[#1B3A4B] transition-all duration-300 ${intervened ? "shadow-[0_0_0_8px_rgba(27,58,75,0.08),0_0_60px_rgba(27,58,75,0.25)]" : ""}`} />
                {intervened && (
                  <>
                    <span className="absolute inset-0 rounded-full border-2 border-[#1B3A4B]/40 animate-[pulse-ring_1.6s_ease-out_infinite]" />
                    <span className="absolute inset-0 rounded-full border-2 border-[#1B3A4B]/20 animate-[pulse-ring_1.6s_ease-out_0.5s_infinite]" />
                  </>
                )}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between text-xs text-[#1B3A4B]/60 mb-2">
                <span>Cognitive stress index</span>
                <span className="font-mono">{stress}</span>
              </div>
              <div className="h-1.5 bg-[#1B3A4B]/10 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-500"
                  style={{ width: `${stress}%`, background: stress > 60 ? "#B4452F" : "#1B3A4B" }}
                />
              </div>
            </div>

            {intervened && (
              <div className="mt-4 rounded-xl bg-[#1B3A4B] text-[#F4EFE6] px-4 py-3 flex items-center gap-3 animate-[fade-in_0.4s_ease-out]">
                <ShieldAlert className="w-4 h-4 text-[#C9A46A] shrink-0" />
                <p className="text-sm">Manipulation pattern detected. Haptic pulse delivered.</p>
              </div>
            )}

            {alerted && (
              <div className="absolute right-4 bottom-4 max-w-[280px] rounded-xl bg-[#F4EFE6] border border-[#1B3A4B]/20 shadow-[0_20px_60px_-20px_rgba(27,58,75,0.3)] p-4 animate-[slide-in-right_0.45s_ease-out]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1B3A4B] flex items-center justify-center shrink-0">
                    <Bell className="w-3.5 h-3.5 text-[#F4EFE6]" />
                  </div>
                  <div>
                    <p className="text-[#1B3A4B] text-sm font-medium">Mom may need you</p>
                    <p className="text-[#1B3A4B]/60 text-xs mt-0.5">Sustained pressure detected during a call. Just now.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="mt-8 text-[#1B3A4B]/60 italic text-sm md:text-base max-w-2xl">
          No audio leaves the ring. The transcript above is shown for demonstration only — Veris analyzes patterns on-device.
        </p>
      </div>
    </section>
  );
}
