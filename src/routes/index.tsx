import { createFileRoute } from "@tanstack/react-router";
import {
  useState,
  useEffect,
  useRef,
  type FormEvent,
  type ReactNode,
} from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import ringHero from "@/assets/ring-hero.jpg";
import ringShell from "@/assets/ring-shell.png";
import ringSensors from "@/assets/ring-sensors.png";
import ringHaptic from "@/assets/ring-haptic.png";
import ringAntenna from "@/assets/ring-antenna.png";
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

/* Drives global --scroll variable + a per-element --hero-progress (0→1)
   while a sentinel "stage" element passes through the viewport. */
function useScrollDriver(stageRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    let raf = 0;
    const root = document.documentElement;
    const tick = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const s = docH > 0 ? Math.min(1, Math.max(0, window.scrollY / docH)) : 0;
      root.style.setProperty("--scroll", s.toFixed(4));

      const stage = stageRef.current;
      if (stage) {
        const rect = stage.getBoundingClientRect();
        const total = stage.offsetHeight - window.innerHeight;
        const past = Math.min(total, Math.max(0, -rect.top));
        const p = total > 0 ? past / total : 0;
        stage.style.setProperty("--hero-progress", p.toFixed(4));
      }
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [stageRef]);
}

export const Route = createFileRoute("/")({
  component: VerisLanding,
  head: () => ({
    meta: [
      { title: "Veris — Moonshot 03 · Cognitive Defense System" },
      {
        name: "description",
        content:
          "A wearable intelligence system that detects coercion and scam pressure in real time — before financial loss occurs.",
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
  const stageRef = useRef<HTMLElement | null>(null);
  useScrollDriver(stageRef);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Toaster />
      <div className="living-bg" aria-hidden />
      <div className="living-grid" aria-hidden />
      <div className="scroll-aurora" aria-hidden />
      <div className="scroll-progress" aria-hidden />
      <div className="living-grain" aria-hidden />

      <Nav />
      <main>
        <HeroStage stageRef={stageRef} />
        <Manifesto />
        <Science />
        <Device />
        <Statement />
        <EarlyAccess />
      </main>
      <Footer />
      <LiveConsole />
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
        Veris · Live
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
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-4 px-4 md:h-16 md:px-10">
        <a href="#" className="flex items-center gap-3">
          <span className="grid h-7 w-7 place-items-center border border-gold text-gold font-display italic text-sm">V</span>
          <span className="font-display text-xl tracking-tight text-ink">Veris</span>
          <span className="ml-3 hidden items-center gap-2 border-l border-border pl-3 label-italic text-muted-foreground md:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
            Moonshot 03 · Private Beta
          </span>
        </a>
        <nav className="hidden items-center gap-10 md:flex">
          <NavLink href="#mission">Mission</NavLink>
          <NavLink href="#science">Science</NavLink>
          <NavLink href="#device">Device</NavLink>
          <NavLink href="#access">Access</NavLink>
        </nav>
        <a
          href="#access"
          className="group inline-flex h-9 items-center gap-2 border border-gold bg-gold px-4 font-display italic text-sm text-primary-foreground transition-colors hover:bg-transparent hover:text-gold"
        >
          Secure a spot
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </a>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="font-display italic text-sm text-muted-foreground transition-colors hover:text-ink"
    >
      {children}
    </a>
  );
}

/* ---------- HERO STAGE — RING DECONSTRUCTION ---------- */
function HeroStage({ stageRef }: { stageRef: React.RefObject<HTMLElement | null> }) {
  return (
    <section
      ref={stageRef as React.RefObject<HTMLElement>}
      className="hero-stage"
    >
      <div className="hero-pin">
        {/* Assembled ring — fades & rotates away */}
        <img
          src={ringHero}
          alt="Veris titanium ring"
          width={1024}
          height={1024}
          className="ring-assembled"
        />

        {/* Four fragments — fly outward as you scroll */}
        <img src={ringShell} alt="" aria-hidden className="ring-fragment frag-shell" />
        <img src={ringSensors} alt="" aria-hidden className="ring-fragment frag-sensors" />
        <img src={ringHaptic} alt="" aria-hidden className="ring-fragment frag-haptic" />
        <img src={ringAntenna} alt="" aria-hidden className="ring-fragment frag-antenna" />

        {/* Headline overlay — fades on scroll */}
        <div className="hero-headline">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <div className="flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Moonshot 03 — Cognitive Defense
            </div>
            <h1 className="mt-6 font-display text-[3.25rem] font-extralight leading-[0.98] tracking-[-0.02em] text-ink md:text-[6rem] lg:text-[7.5rem]">
              Protection before<br />
              <span className="italic font-light text-gold">the damage.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl font-display text-base font-light italic leading-relaxed text-muted-foreground md:text-lg">
              A wearable intelligence that reads coercion as it happens —
              and intervenes before loss occurs.
            </p>
            <div className="mt-10 flex items-center justify-center gap-8 pointer-events-auto">
              <a
                href="#access"
                className="group inline-flex h-12 items-center bg-gold px-8 font-display italic text-base text-primary-foreground transition-opacity hover:opacity-90"
              >
                Join early access
                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#mission"
                className="group inline-flex items-center gap-2 font-display italic text-base text-ink transition-colors hover:text-gold"
              >
                See how it works
                <span className="transition-transform group-hover:translate-y-0.5">↓</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- MANIFESTO ---------- */
function Manifesto() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="mission" className="relative overflow-hidden">
      <div className="relative mx-auto max-w-[1440px] px-4 py-32 md:px-10 md:py-48">
        <div ref={ref} className="reveal mx-auto max-w-3xl">
          <p className="label-italic text-gold">§ 01 — Mission</p>
          <p className="mt-12 font-display text-3xl font-extralight leading-[1.15] tracking-tight text-ink md:text-6xl">
            Today's attacks no longer target systems.{" "}
            <span className="italic font-light text-gold">They target human cognition.</span>
          </p>
          <p className="mt-12 font-display text-lg font-light italic leading-[1.75] text-muted-foreground md:text-xl">
            AI-generated voices. Engineered urgency. Impersonation that bypasses
            every security layer built for a slower world. Veris was built to
            change that.
          </p>
          <p className="mt-16 font-display text-2xl font-light italic text-ink md:text-3xl">
            127 families. <span className="text-gold">9 states.</span> One quiet system.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- SCIENCE — full-bleed verb rows ---------- */
function Science() {
  const items = [
    { n: "01", verb: "Detect", line: "Continuous biosignal sensing reads stress as it happens." },
    { n: "02", verb: "Analyze", line: "On-device AI fuses body and language into a real-time risk score." },
    { n: "03", verb: "Intervene", line: "A quiet haptic pulse breaks engineered urgency." },
    { n: "04", verb: "Protect", line: "Trusted contacts are alerted before money moves." },
  ];
  return (
    <section id="science" className="relative">
      <div className="mx-auto max-w-[1440px] px-4 py-24 md:px-10 md:py-32">
        <div className="max-w-3xl">
          <p className="label-italic text-gold">§ 02 — Science</p>
          <h2 className="mt-6 font-display text-4xl font-extralight leading-[1.05] tracking-tight text-ink md:text-7xl">
            Four quiet steps.<br />
            <span className="italic font-light text-gold">One moment of clarity.</span>
          </h2>
        </div>
        <div className="mt-20 divide-y divide-border border-y border-border">
          {items.map((it) => (
            <ScienceRow key={it.n} {...it} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ScienceRow({
  n, verb, line,
}: { n: string; verb: string; line: string }) {
  const ref = useReveal<HTMLDivElement>(0.25);
  return (
    <div
      ref={ref}
      className="reveal grid grid-cols-12 items-baseline gap-6 py-12 md:gap-10 md:py-20"
    >
      <div className="col-span-12 flex items-center gap-4 md:col-span-1">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">{n}</span>
      </div>
      <div className="col-span-12 md:col-span-5">
        <h3 className="font-display text-5xl font-extralight italic leading-none tracking-tight text-ink md:text-[7rem]">
          {verb}.
        </h3>
      </div>
      <div className="col-span-12 md:col-span-6">
        <p className="max-w-md font-display text-lg font-light leading-relaxed text-muted-foreground md:text-xl">
          {line}
        </p>
      </div>
    </div>
  );
}

/* ---------- DEVICE ---------- */
function Device() {
  const specs = ["7 days", "4 grams", "Titanium", "On-device", "Resistant", "Local-only"];
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="device" className="relative overflow-hidden">
      <div className="relative mx-auto max-w-[1440px] px-4 py-28 md:px-10 md:py-40">
        <div ref={ref} className="reveal grid items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
          <div className="relative aspect-square">
            <img
              src={ringDevice}
              alt="Veris ring blueprint"
              width={1024}
              height={1024}
              loading="lazy"
              className="float-slow relative mx-auto h-full w-full object-contain"
              style={{ filter: "drop-shadow(0 30px 80px oklch(0.78 0.10 80 / 0.30))" }}
            />
          </div>
          <div>
            <p className="label-italic text-gold">§ 03 — Device</p>
            <h2 className="mt-6 font-display text-4xl font-extralight leading-tight tracking-tight text-ink md:text-7xl">
              A whisper-thin titanium ring,<br />
              <span className="italic font-light text-gold">engineered for continuous wear.</span>
            </h2>
            <p className="mt-10 font-display text-lg font-light italic text-muted-foreground md:text-xl">
              No cloud. No recordings. Audio processed locally and discarded.
            </p>
            <p className="mt-12 font-display text-xl font-light leading-loose text-ink md:text-2xl">
              {specs.map((s, i) => (
                <span key={s}>
                  {s}
                  {i < specs.length - 1 && <span className="mx-3 text-gold">·</span>}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- STATEMENT — ring reassembles ---------- */
function Statement() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="relative overflow-hidden vignette">
      <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
      <Constellation />
      {/* Reassembled ring as backdrop */}
      <img
        src={ringHero}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 w-[120vmin] -translate-x-1/2 -translate-y-1/2 opacity-25"
        style={{ filter: "blur(1px) drop-shadow(0 0 80px oklch(0.78 0.10 80 / 0.4))" }}
      />
      <div className="relative mx-auto max-w-[1440px] px-4 py-32 md:px-10 md:py-56">
        <div ref={ref} className="reveal-scale mx-auto max-w-4xl text-center">
          <p className="label-italic text-gold">§ 04 — Thesis</p>
          <h2 className="mt-10 font-display text-5xl font-extralight leading-[1.02] tracking-tight text-ink md:text-7xl lg:text-[6.5rem]">
            The future of security<br />
            <span className="italic font-light text-gold">is human-aware.</span>
          </h2>
          <p className="mx-auto mt-12 max-w-2xl font-display text-lg font-light italic leading-relaxed text-muted-foreground md:text-xl">
            Defending infrastructure is no longer enough. Veris is building the
            layer that understands human vulnerability in real time.
          </p>
        </div>
      </div>
    </section>
  );
}

function Constellation() {
  const nodes: [number, number][] = [
    [10, 20], [30, 8], [55, 15], [78, 6], [92, 24],
    [85, 50], [70, 70], [50, 80], [30, 72], [12, 60],
    [45, 45], [60, 35], [38, 30],
  ];
  const edges: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7],
    [7, 8], [8, 9], [9, 0], [10, 1], [10, 5], [10, 7],
    [11, 2], [11, 6], [12, 0], [12, 4], [12, 8],
  ];
  return (
    <svg
      viewBox="0 0 100 100"
      className="absolute inset-0 h-full w-full opacity-40 spin-slow"
      preserveAspectRatio="none"
      aria-hidden
    >
      {edges.map(([a, b], i) => (
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
    <section className="relative">
      <div ref={ref} className="mx-auto max-w-[1440px] px-4 py-24 md:px-10 md:py-32">
        <p className="label-italic text-gold">§ 05 — Field Data</p>
        <div className="mt-16 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className="bg-background p-8 md:p-12">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Fig. {String(i + 1).padStart(2, "0")}
              </div>
              <div className="mt-8 font-display text-6xl font-extralight italic text-gold md:text-7xl">
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
              <div className="mt-6 font-display text-base font-light leading-relaxed text-muted-foreground">
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
  to, prefix = "", suffix = "", decimals = 0, duration = 1600,
}: {
  to: number; prefix?: string; suffix?: string; decimals?: number; duration?: number;
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
    <span>{prefix}{v.toFixed(decimals)}{suffix}</span>
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
    <section id="access" className="relative">
      <div className="mx-auto max-w-[1440px] px-4 py-24 md:px-10 md:py-40">
        <div className="mx-auto max-w-3xl">
          <p className="label-italic text-gold">§ 06 — Access</p>
          <h2 className="mt-6 font-display text-4xl font-extralight leading-tight tracking-tight text-ink md:text-7xl">
            Give them independence.<br />
            <span className="italic font-light text-gold">Not vulnerability.</span>
          </h2>
          <form onSubmit={onSubmit} className="mt-16 grid gap-8">
            <div className="grid gap-8 md:grid-cols-2">
              <Field label="Name" required>
                <LabInput
                  required maxLength={100}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </Field>
              <Field label="Email" required>
                <LabInput
                  required type="email" maxLength={255}
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
            <div className="mt-6 flex flex-wrap items-center gap-6">
              <button
                type="submit"
                disabled={loading}
                className="group inline-flex h-12 items-center bg-gold px-8 font-display italic text-base text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "Securing…" : "Join early access"}
                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </button>
              <a
                href="mailto:research@veris.systems"
                className="font-display italic text-base text-ink transition-colors hover:text-gold"
              >
                Request research access →
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label, required, children,
}: {
  label: string; required?: boolean; children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="block label-italic text-muted-foreground">
        {label}
        {required && <span className="text-gold"> *</span>}
      </span>
      <div className="mt-3">{children}</div>
    </label>
  );
}

function LabInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="h-11 w-full border-b border-border bg-transparent px-0 font-display text-xl font-light text-ink placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-gold"
    />
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  const cols: Array<{ title: string; links: Array<{ label: string; href: string }> }> = [
    { title: "Product", links: [
      { label: "Device", href: "#device" },
      { label: "Science", href: "#science" },
      { label: "Early Access", href: "#access" },
    ]},
    { title: "Company", links: [
      { label: "Mission", href: "#mission" },
      { label: "Press", href: "mailto:press@veris.systems" },
      { label: "Research", href: "mailto:research@veris.systems" },
      { label: "Contact", href: "mailto:hello@veris.systems" },
    ]},
    { title: "Legal", links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Responsible Disclosure", href: "mailto:security@veris.systems" },
    ]},
  ];
  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-20 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-10 md:py-24">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center border border-gold text-gold font-display italic text-base">V</span>
            <span className="font-display text-2xl text-ink">Veris</span>
          </div>
          <p className="mt-6 max-w-xs font-display text-base font-light italic leading-relaxed text-muted-foreground">
            Cognitive defense infrastructure for the AI era. A whisper-thin
            titanium ring, built for the moment manipulation begins.
          </p>
          <p className="mt-8 label-italic text-muted-foreground">
            Veris Labs — San Francisco
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <p className="label-italic text-gold">{c.title}</p>
            <ul className="mt-6 space-y-3">
              {c.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="font-display italic text-base text-ink/80 transition-colors hover:text-gold">
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
