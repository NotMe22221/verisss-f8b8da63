import { createFileRoute } from "@tanstack/react-router";
import {
  useState,
  useEffect,
  useRef,
  type FormEvent,
  type ReactNode,
} from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { CornerFrame } from "@/components/landing/Frame";
import ringHero from "@/assets/ring-hero.jpg";
import ringDevice from "@/assets/ring-device.jpg";
import { submitEarlyAccess } from "@/lib/early-access.functions";

/* ---------- HOOKS ---------- */
function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

function useLiveSignal(base: number, jitter: number, interval = 1500) {
  const [v, setV] = useState(base);
  useEffect(() => {
    const t = setInterval(() => {
      setV(base + (Math.random() - 0.5) * jitter * 2);
    }, interval);
    return () => clearInterval(t);
  }, [base, jitter, interval]);
  return v;
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setSeen(true),
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return [ref, seen] as const;
}

export const Route = createFileRoute("/")({
  component: VerisLanding,
  head: () => ({
    meta: [
      { title: "Veris — Moonshot 03 · Cognitive Defense System" },
      {
        name: "description",
        content:
          "A moonshot project. Veris is the first wearable intelligence system designed to detect coercion, manipulation, and scam pressure in real time — before financial loss occurs.",
      },
      { property: "og:title", content: "Veris — Protection before the damage." },
      {
        property: "og:description",
        content:
          "Cognitive defense infrastructure for the AI era. A whisper-thin titanium ring with on-device AI.",
      },
    ],
  }),
});

function VerisLanding() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster />
      <Nav />
      <main>
        <Hero />
        <AuthorityStrip />
        <Manifesto />
        <div className="hidden md:block"><TelemetryTicker /></div>
        <SectionDivider />
        <HowItWorks />
        <Device />
        <Statement />
        <SectionDivider />
        <Metrics />
        <EarlyAccess />
      </main>
      <Footer />
      <LiveConsole />
    </div>
  );
}

function SectionDivider() {
  return (
    <div className="bg-background py-10">
      <span className="hairline-gold" />
    </div>
  );
}

function AuthorityStrip() {
  return (
    <div className="border-y border-border bg-background">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-3 px-4 py-5 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground md:flex-row md:items-center md:justify-between md:px-10">
        <span className="text-gold">Backed by research from</span>
        <span className="flex flex-wrap gap-x-6 gap-y-1 text-ink/80">
          <span>Stanford HAI</span>
          <span className="opacity-30">·</span>
          <span>MIT Media Lab</span>
          <span className="opacity-30">·</span>
          <span>AARP Fraud Watch</span>
        </span>
        <span className="opacity-60">In private discussion · 2026</span>
      </div>
    </div>
  );
}

/* ---------- REVEAL HOOK ---------- */
function useReveal<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return ref;
}

/* ---------- TELEMETRY TICKER ---------- */
function TelemetryTicker() {
  const items = [
    "↗ HRV +0.4σ",
    "◐ EDA stable",
    "⚠ urgency-spike pattern detected · cohort 14",
    "◉ on-device inference",
    "◇ 127 active nodes",
    "↗ confidence 0.92",
    "◐ no audio retained",
    "⚡ haptic intervention · −38% loss",
    "◉ private by design",
    "↗ HRV +0.2σ",
    "◇ 9 states online",
    "⚠ impersonation vector blocked",
  ];
  const line = items.join("   ·   ");
  return (
    <div className="relative overflow-hidden border-b border-border bg-background/60">
      <div className="marquee-track flex whitespace-nowrap py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        <span className="px-6">{line}</span>
        <span className="px-6">{line}</span>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}

/* ---------- LIVE CONSOLE ---------- */
function LiveConsole() {
  const hrv = useLiveSignal(62, 4, 1400);
  const eda = useLiveSignal(1.4, 0.3, 1700);
  const risk = useLiveSignal(0.12, 0.05, 1100);
  const now = useNow();
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-40 hidden border border-gold/30 bg-background/85 p-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur lg:block">
      <div className="mb-2 flex items-center gap-2 text-gold">
        <span className="blink h-1.5 w-1.5 rounded-full bg-gold" />
        VERIS · LIVE
      </div>
      <div className="grid gap-1">
        <ConsoleRow k="HRV" v={`${hrv.toFixed(1)} ms`} />
        <ConsoleRow k="EDA" v={`${eda.toFixed(2)} µS`} />
        <ConsoleRow k="RISK" v={risk.toFixed(2)} />
        <ConsoleRow k="UTC" v={now ? now.toISOString().slice(11, 19) : "--:--:--"} />
      </div>
    </div>
  );
}
function ConsoleRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-6">
      <span>{k}</span>
      <span className="text-ink">{v}</span>
    </div>
  );
}

/* ---------- NAV ---------- */
function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-4 px-4 md:h-16 md:px-10">
        <a href="#" className="flex items-center gap-3">
          <span className="grid h-7 w-7 place-items-center border border-gold text-gold font-mono text-xs">V</span>
          <span className="font-display text-lg tracking-tight text-ink md:text-xl">Veris</span>
          <span className="ml-3 hidden items-center gap-2 border-l border-border pl-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground md:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
            Moonshot 03 · Private Beta
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          <NavLink href="#mission">Mission</NavLink>
          <NavLink href="#science">Science</NavLink>
          <NavLink href="#device">Device</NavLink>
          <NavLink href="#early-access">Access</NavLink>
        </nav>
        <a
          href="#early-access"
          className="inline-flex h-9 items-center border border-gold bg-gold px-4 font-mono text-[10px] uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-transparent hover:text-gold md:text-[11px]"
        >
          Secure a Spot
        </a>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-ink"
    >
      {children}
    </a>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-nebula noise">
      <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 70% 45%, oklch(0.78 0.10 80 / 0.22), transparent 55%)",
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" aria-hidden />
      <div className="relative mx-auto max-w-[1440px] px-4 pt-16 md:px-10 md:pt-24 lg:pt-32">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div className="rise order-2 lg:order-1">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Moonshot 03 — Cognitive Defense
            </div>
            <h1 className="mt-6 font-display text-[2.75rem] font-light leading-[1.02] tracking-tight text-ink md:text-7xl lg:text-[5.5rem]">
              Protection before<br />
              <span className="italic text-gold">the damage.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:mt-8 md:text-lg">
              A wearable intelligence system that detects coercion and scam
              pressure in real time — before loss occurs.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6 md:mt-10">
              <a
                href="#early-access"
                className="group inline-flex h-12 items-center bg-gold px-7 font-mono text-[12px] uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
              >
                Join Early Access
                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#science"
                className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink transition-colors hover:text-gold"
              >
                See how it works
                <span className="transition-transform group-hover:translate-y-0.5">↓</span>
              </a>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-border pt-6 md:mt-14 md:pt-8">
              <HeroStat label="Families" value="127" />
              <HeroStat label="States" value="9" />
            </div>
          </div>
          <div className="relative order-1 lg:order-2">
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.78_0.10_80/0.32),transparent_60%)] blur-2xl" />
            </div>
            <div className="relative aspect-square">
              <div className="absolute inset-[15%] hidden place-items-center md:grid" aria-hidden>
                <div className="pulse-ring" />
                <div className="pulse-ring" style={{ animationDelay: "1.3s" }} />
                <div className="pulse-ring" style={{ animationDelay: "2.6s" }} />
              </div>
              <img
                src={ringHero}
                alt="Veris titanium ring"
                width={1024}
                height={1024}
                className="float-slow relative mx-auto h-full w-full object-contain"
                style={{ filter: "drop-shadow(0 30px 60px oklch(0.78 0.10 80 / 0.25))" }}
              />
              <div className="hidden md:block">
                <Callout pos="tl" label="01 · HRV" />
                <Callout pos="br" label="04 · IMU" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Callout({ pos, label }: { pos: "tl" | "tr" | "bl" | "br"; label: string }) {
  const map = {
    tl: "top-2 left-2",
    tr: "top-2 right-2",
    bl: "bottom-2 left-2",
    br: "bottom-2 right-2",
  } as const;
  return (
    <div
      className={`absolute ${map[pos]} flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground`}
    >
      <span className="h-1 w-1 rounded-full bg-gold" />
      {label}
    </div>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-2xl font-light text-ink">{value}</p>
    </div>
  );
}

/* ---------- MANIFESTO ---------- */
function Manifesto() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="mission" className="bg-background">
      <div className="mx-auto max-w-[1440px] px-4 py-24 md:px-10 md:py-40">
        <div ref={ref} className="reveal mx-auto max-w-3xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">§ 01 / Mission</p>
          <div className="mt-10 space-y-10 text-base leading-[1.75] text-muted-foreground md:text-lg">
            <p className="font-display text-3xl font-light leading-[1.15] text-ink md:text-5xl">
              Today's attacks no longer target systems.{" "}
              <span className="italic text-gold">They target human cognition.</span>
            </p>
            <p>
              AI-generated voices, engineered urgency, and impersonation
              bypass every security layer built for a slower world. Older
              adults are the most exposed — not because they are careless, but
              because modern scams exploit trust faster than people can
              consciously react.
            </p>
            <PullQuote>Every existing fraud system reacts too late.</PullQuote>
            <p className="font-display text-2xl font-light text-ink md:text-3xl">
              Veris was built to change that.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="border-l-2 border-gold pl-6 font-display text-xl font-light italic leading-snug text-ink md:text-2xl">
      {children}
    </blockquote>
  );
}

/* ---------- HOW IT WORKS ---------- */
function HowItWorks() {
  const items = [
    { n: "01", title: "Detect", desc: "Continuous biosignal sensing reads stress as it happens." },
    { n: "02", title: "Analyze", desc: "On-device AI fuses body and language into a real-time risk score." },
    { n: "03", title: "Intervene", desc: "A quiet haptic pulse breaks engineered urgency." },
    { n: "04", title: "Protect", desc: "Trusted contacts are alerted before money moves." },
  ];
  return (
    <section id="science">
      <div className="mx-auto max-w-[1440px] px-4 py-20 md:px-10 md:py-28">
        <div className="max-w-3xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">§ 02 / Science</p>
          <h2 className="mt-4 font-display text-4xl font-light leading-tight tracking-tight text-ink md:text-6xl">
            Four quiet steps. <span className="italic text-gold">One moment of clarity.</span>
          </h2>
        </div>
        <div className="mt-16 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <CornerFrame
              key={it.n}
              className="group bg-background p-6 transition-colors hover:bg-card md:p-10"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">{it.n}</span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-gold" />
              </div>
              <h3 className="mt-10 font-display text-xl font-light text-ink md:text-3xl">
                {it.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {it.desc}
              </p>
            </CornerFrame>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- DEVICE ---------- */
function Device() {
  const specs = [
    { k: "Battery", v: "7 days" },
    { k: "Mass", v: "4 grams" },
    { k: "Shell", v: "Titanium" },
    { k: "Compute", v: "On-device" },
    { k: "Water", v: "Resistant" },
    { k: "Audio", v: "Local · Discarded" },
  ];
  return (
    <section id="device" className="border-y border-border bg-card">
      <div className="mx-auto max-w-[1440px] px-4 py-20 md:px-10 md:py-28">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <CornerFrame className="relative aspect-square overflow-hidden bg-background">
            <div className="absolute inset-0 bg-grid-sm opacity-70" aria-hidden />
            <div className="absolute inset-x-6 top-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <span>VRS-01</span>
              <span className="text-gold">Brushed Ti</span>
            </div>
            <img
              src={ringDevice}
              alt="Veris ring blueprint"
              width={1024}
              height={1024}
              loading="lazy"
              className="relative mx-auto h-full w-full object-contain p-12"
            />
            <div className="absolute inset-x-6 bottom-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <span>Ø 22.4mm</span>
              <span>04g</span>
            </div>
          </CornerFrame>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">§ 03 / Device</p>
            <h2 className="mt-4 font-display text-4xl font-light leading-tight tracking-tight text-ink md:text-6xl">
              A whisper-thin titanium ring engineered for{" "}
              <span className="italic text-gold">continuous wear.</span>
            </h2>
            <p className="mt-8 font-display text-xl font-light italic text-ink md:text-2xl">
              No cloud. No recordings. Audio processed locally and discarded.
            </p>
            <dl className="mt-12 grid grid-cols-2 gap-px border border-border bg-border">
              {specs.map((s) => (
                <div key={s.k} className="bg-background p-5">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {s.k}
                  </dt>
                  <dd className="mt-2 font-display text-lg font-light text-ink">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- STATEMENT ---------- */
function Statement() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="relative overflow-hidden vignette">
      <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
      <div className="absolute inset-0 bg-nebula" aria-hidden />
      <Constellation />
      <div className="relative mx-auto max-w-[1440px] px-4 py-28 md:px-10 md:py-40">
        <div ref={ref} className="reveal-scale mx-auto max-w-4xl text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">§ 04 / Thesis</p>
          <h2 className="mt-8 font-display text-5xl font-light leading-[1.05] tracking-tight text-ink md:text-7xl lg:text-[5.5rem]">
            The future of security is{" "}
            <span className="italic text-gold">human-aware.</span>
          </h2>
          <p className="mx-auto mt-10 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Defending infrastructure is no longer enough. Veris is building
            the layer that understands human vulnerability in real time.
          </p>
        </div>
      </div>
    </section>
  );
}

function Constellation() {
  // Faint dot+line mesh, very slow rotate
  const nodes = [
    [12, 22], [28, 14], [44, 30], [62, 18], [78, 28], [88, 46],
    [70, 58], [52, 70], [34, 64], [18, 52], [8, 70], [80, 78],
    [40, 42], [60, 48],
  ];
  const links: Array<[number, number]> = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8],
    [8, 9], [9, 0], [9, 10], [6, 11], [12, 2], [12, 7], [13, 3], [13, 6],
    [12, 13],
  ];
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="spin-slow pointer-events-none absolute inset-[-20%] h-[140%] w-[140%] opacity-30"
    >
      {links.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]} y1={nodes[a][1]}
          x2={nodes[b][0]} y2={nodes[b][1]}
          stroke="var(--gold)" strokeWidth="0.08" opacity="0.5"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="0.4" fill="var(--gold)" />
      ))}
    </svg>
  );
}

/* ---------- METRICS ---------- */
function Metrics() {
  const stats: Array<{ value: string; label: string; numeric?: { to: number; prefix?: string; suffix?: string; decimals?: number } }> = [
    { value: "$3.4B", label: "Lost annually by Americans 60+ to scams", numeric: { to: 3.4, prefix: "$", suffix: "B", decimals: 1 } },
    { value: "76%", label: "Increase in AI-enabled fraud attempts", numeric: { to: 76, suffix: "%" } },
    { value: "0", label: "Existing systems for real-time cognitive fraud detection" },
    { value: "1st", label: "Wearable built for manipulation awareness" },
  ];
  const [ref, seen] = useInView<HTMLDivElement>();
  return (
    <section className="border-b border-border bg-background">
      <div ref={ref} className="mx-auto max-w-[1440px] px-4 py-20 md:px-10 md:py-28">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">§ 05 / Field Data</p>
        <div className="mt-12 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className="bg-background p-8 md:p-10">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                FIG. {String(i + 1).padStart(2, "0")}
              </div>
              <div className="mt-6 font-display text-5xl font-light text-gold md:text-6xl">
                {s.numeric && seen ? (
                  <CountUp
                    to={s.numeric.to}
                    prefix={s.numeric.prefix}
                    suffix={s.numeric.suffix}
                    decimals={s.numeric.decimals ?? 0}
                  />
                ) : (
                  s.value
                )}
              </div>
              <div className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CountUp({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1600,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(to * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return (
    <span>
      {prefix}
      {v.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ---------- EARLY ACCESS ---------- */
function EarlyAccess() {
  const submit = useServerFn(submitEarlyAccess);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", team: "" });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const res = await submit({ data: form });
      if (res.duplicate) {
        toast.success("You're already on the list — we'll be in touch.");
      } else {
        toast.success("You're in. Welcome to the Veris private beta.");
      }
      setForm({ name: "", email: "", team: "" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="early-access" className="bg-background">
      <div className="mx-auto max-w-[1440px] px-4 py-20 md:px-10 md:py-28">
        <CornerFrame className="mx-auto max-w-3xl bg-card p-8 md:p-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">§ 06 / Access</p>
          <h2 className="mt-4 font-display text-4xl font-light leading-tight tracking-tight text-ink md:text-6xl">
            Give them independence.<br />
            <span className="italic text-gold">Not vulnerability.</span>
          </h2>
          <form onSubmit={onSubmit} className="mt-12 grid gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Name" required>
                <LabInput
                  required
                  maxLength={100}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </Field>
              <Field label="Email" required>
                <LabInput
                  required
                  type="email"
                  maxLength={255}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </Field>
            </div>
            <Field label="Team or organization (optional)">
              <LabInput
                maxLength={150}
                value={form.team}
                onChange={(e) => setForm({ ...form, team: e.target.value })}
              />
            </Field>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-12 items-center bg-gold px-7 font-mono text-[12px] uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "Securing..." : "Join Early Access →"}
              </button>
              <a
                href="mailto:research@veris.systems"
                className="inline-flex h-12 items-center border border-ink/30 px-7 font-mono text-[12px] uppercase tracking-[0.2em] text-ink transition-colors hover:border-gold hover:text-gold"
              >
                Request Research Access
              </a>
            </div>
          </form>
          <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <span className="text-gold">{">"}</span> awaiting transmission
            <span className="blink ml-1 inline-block h-3 w-1.5 -mb-0.5 bg-gold align-middle" />
          </p>
        </CornerFrame>
      </div>
    </section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
        {required && <span className="text-gold"> *</span>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function LabInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="h-11 w-full border-b border-border bg-transparent px-0 font-display text-lg text-ink placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-gold"
    />
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  const cols: Array<{ title: string; links: Array<{ label: string; href: string }> }> = [
    {
      title: "Product",
      links: [
        { label: "Device", href: "#device" },
        { label: "Science", href: "#science" },
        { label: "Early Access", href: "#early-access" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Mission", href: "#mission" },
        { label: "Press", href: "mailto:press@veris.systems" },
        { label: "Research", href: "mailto:research@veris.systems" },
        { label: "Contact", href: "mailto:hello@veris.systems" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
        { label: "Responsible Disclosure", href: "mailto:security@veris.systems" },
      ],
    },
  ];
  return (
    <footer className="border-t border-border bg-background">
      <div className="hidden border-b border-border md:block">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground md:px-10">
          <span>BUILD 2026.05.06</span>
          <span>NODE veris-01</span>
          <span className="flex items-center gap-2">
            SIGNAL <span className="text-gold">◉◉◉</span><span className="opacity-30">○</span>
          </span>
          <span>UPLINK · STABLE</span>
        </div>
      </div>
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-10 md:py-20">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center border border-gold text-gold font-mono text-xs">V</span>
            <span className="font-display text-xl text-ink">Veris</span>
          </div>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Cognitive defense infrastructure for the AI era. A whisper-thin
            titanium ring, built for the moment manipulation begins.
          </p>
          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Veris Labs · San Francisco, CA
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">
              {c.title}
            </p>
            <ul className="mt-5 space-y-3">
              {c.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-ink/80 transition-colors hover:text-gold"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-3 px-4 py-6 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground md:flex-row md:items-center md:px-10">
          <span>© 2026 Veris Labs · All rights reserved</span>
          <span className="text-gold">Moonshot 03 — Cognitive Defense</span>
        </div>
      </div>
    </footer>
  );
}
