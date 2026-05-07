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
import ringHero from "@/assets/ring-hero-cinematic.jpg";
import ringDevice from "@/assets/ring-device-studio.jpg";
import { submitEarlyAccess } from "@/lib/early-access.functions";

/* ---------- HOOKS ---------- */
function useReveal<T extends HTMLElement>(threshold = 0.15) {
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
      { title: "Veris — Cognitive defense for the AI era" },
      {
        name: "description",
        content:
          "A titanium ring with on-device AI that detects coercion in real time and intervenes before financial loss.",
      },
      { property: "og:title", content: "Veris — Protection before the damage." },
      {
        property: "og:description",
        content:
          "Cognitive defense infrastructure. A wearable that reads manipulation as it happens.",
      },
      { property: "og:image", content: ringHero },
      { name: "twitter:image", content: ringHero },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function VerisLanding() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Toaster />
      <Nav />
      <main>
        <Hero />
        <Mission />
        <HowItWorks />
        <Device />
        <Intervention />
        <Numbers />
        <EarlyAccess />
      </main>
      <Footer />
    </div>
  );
}

/* ---------- NAV ---------- */
function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container-x flex h-14 items-center justify-between md:h-16">
        <a href="#" className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full border border-foreground/40 text-[13px] font-semibold tracking-tight">V</span>
          <span className="text-[15px] font-semibold tracking-tight">Veris</span>
        </a>
        <nav className="hidden items-center gap-9 md:flex">
          <NavLink href="#mission">Mission</NavLink>
          <NavLink href="#how">How it works</NavLink>
          <NavLink href="#device">Device</NavLink>
          <NavLink href="#access">Access</NavLink>
        </nav>
        <a href="#access" className="btn-primary !h-9 !px-4 text-[13px]">
          Request access
        </a>
      </div>
    </header>
  );
}
function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground">
      {children}
    </a>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-black text-[#F4EFE6]">
      <div className="relative h-screen min-h-[640px] w-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 z-0 h-full w-full object-cover"
        >
          <source
            src="https://res.cloudinary.com/dfonotyfb/video/upload/v1775585556/dds3_1_rqhg7x.mp4"
            type="video/mp4"
          />
        </video>
        {/* gradient legibility wash */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black via-black/50 to-black/20" />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/70 via-transparent to-transparent" />

        <div className="container-x relative z-10 flex h-full flex-col justify-end pb-16 md:pb-24">
          <p className="eyebrow mb-5 !text-[#C9A46A]">Veris · Cognitive Defense</p>
          <h1 className="display-xl max-w-[14ch]">
            Protection before<br />the damage.
          </h1>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[#F4EFE6]/70 md:text-lg">
            A titanium ring with on-device AI that reads coercion as it happens — and intervenes before money moves.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#access" className="inline-flex h-11 items-center gap-2 rounded-full bg-[#C9A46A] px-5 text-[14px] font-medium text-[#1B3A4B] transition-colors hover:bg-[#d4b27a]">
              Request access
              <span aria-hidden>→</span>
            </a>
            <a href="#how" className="inline-flex h-11 items-center gap-2 rounded-full border border-[#F4EFE6]/30 px-5 text-[14px] font-medium text-[#F4EFE6] transition-colors hover:border-[#F4EFE6]">
              See how it works
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- MISSION (paper) ---------- */
function Mission() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="mission" className="paper section">
      <div className="container-x">
        <div ref={ref} className="reveal mx-auto max-w-4xl">
          <p className="eyebrow">Mission</p>
          <h2 className="display-lg mt-6 text-[--paper-foreground]">
            Today's attacks no longer target systems.
            <span className="opacity-50"> They target human cognition.</span>
          </h2>
          <p className="mt-8 max-w-2xl body-lg">
            Synthetic voices. Engineered urgency. Impersonation that bypasses every security layer built for a slower world. Veris is the first wearable built to defend the human in the loop.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- HOW IT WORKS ---------- */
function HowItWorks() {
  const steps = [
    { n: "01", title: "Detect", body: "Continuous biosignal sensing reads autonomic stress as it happens — HRV, EDA, micro-tension." },
    { n: "02", title: "Decide", body: "On-device AI fuses physiology with conversation context into a real-time risk score. Nothing leaves the ring." },
    { n: "03", title: "Defend", body: "A quiet haptic breaks engineered urgency. Trusted contacts are alerted before money moves." },
  ];
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="how" className="section">
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="eyebrow">How it works</p>
          <h2 className="display-lg mt-6">Three steps. Under one second.</h2>
        </div>
        <div ref={ref} className="reveal mt-16 grid gap-px bg-border md:mt-24 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="bg-background p-8 md:p-10">
              <div className="flex items-baseline gap-3">
                <span className="text-[12px] font-mono text-muted-foreground">{s.n}</span>
                <span className="hairline flex-1" />
              </div>
              <h3 className="display-md mt-8">{s.title}</h3>
              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- DEVICE ---------- */
function Device() {
  const ref = useReveal<HTMLDivElement>();
  const specs = [
    ["Material", "Aerospace titanium"],
    ["Weight", "4 grams"],
    ["Battery", "7-day continuous"],
    ["Compute", "On-device NPU"],
    ["Sensors", "PPG · EDA · IMU · mic"],
    ["Privacy", "Local-only · no cloud"],
  ];
  return (
    <section id="device" className="section border-t border-border">
      <div className="container-x">
        <div ref={ref} className="reveal grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-card">
            <img
              src={ringDevice}
              alt="Veris ring, three-quarter view"
              width={1080}
              height={1350}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="eyebrow">Device</p>
            <h2 className="display-lg mt-6">Engineered for continuous wear.</h2>
            <p className="mt-6 max-w-md body-lg">
              Titanium shell. Sensor band integrated on the inner surface. All inference runs locally — audio is processed and discarded.
            </p>
            <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6">
              {specs.map(([k, v]) => (
                <div key={k}>
                  <dt className="eyebrow">{k}</dt>
                  <dd className="mt-2 text-[15px] font-medium tracking-tight md:text-base">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- INTERVENTION ---------- */
function Intervention() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="section border-t border-border">
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="eyebrow">The intervention</p>
          <h2 className="display-lg mt-6">
            One quiet pulse — at the moment it matters.
          </h2>
        </div>
        <div ref={ref} className="reveal mt-16 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="mb-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              <span className="haptic-dot" aria-hidden />
              <span>Live transcript · Veris on-device</span>
            </div>
            <pre className="terminal whitespace-pre-wrap break-words font-mono">
{`14:02:11  caller   "This is Officer Reyes. Your account is compromised."
14:02:18  caller   "I need you to transfer $4,200 to a secure holding."
14:02:24  veris    `}<span className="sig">HRV ↓ 38ms · EDA ↑ 2.7µS · urgency markers detected</span>{`
14:02:25  veris    `}<span className="alert">RISK 0.91 — coercion pattern</span>{`
14:02:26  veris    `}<span className="alert">→ haptic pulse · trusted contact notified</span>{`
14:02:31  user     "Wait. I'm going to call my daughter first."`}
            </pre>
          </div>
          <div className="flex flex-col justify-center">
            <p className="body-lg">
              Veris doesn't block your call. It doesn't read transcripts to a server. It interrupts the autonomic loop the attacker is exploiting — long enough for the rational mind to come back.
            </p>
            <div className="mt-8 hairline" />
            <p className="eyebrow mt-6">Median intervention latency</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight">
              <span className="text-[color:var(--signal)]">0.84s</span>
              <span className="ml-2 text-muted-foreground text-base font-normal">from detection to pulse</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- NUMBERS ---------- */
function Numbers() {
  const stats = [
    { to: 3.4, prefix: "$", suffix: "B", decimals: 1, label: "Lost annually by Americans 60+ to scams" },
    { to: 76, suffix: "%", decimals: 0, label: "Increase in AI-enabled fraud, year over year" },
    { to: 0, suffix: "", decimals: 0, label: "Real-time cognitive fraud defenses in market" },
    { to: 1, suffix: "st", decimals: 0, label: "Wearable built for manipulation awareness" },
  ];
  const [ref, seen] = useInView<HTMLDivElement>();
  return (
    <section ref={ref} className="section border-t border-border">
      <div className="container-x">
        <p className="eyebrow">Field data</p>
        <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="display-md font-semibold tracking-tight">
                {seen ? <CountUp {...s} /> : `${s.prefix ?? ""}0${s.suffix ?? ""}`}
              </div>
              <p className="mt-4 max-w-[18ch] text-[14px] leading-snug text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CountUp({
  to, prefix = "", suffix = "", decimals = 0, duration = 1400,
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
  return <span>{prefix}{v.toFixed(decimals)}{suffix}</span>;
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
    <section id="access" className="section border-t border-border">
      <div className="container-x">
        <div className="mx-auto max-w-2xl">
          <p className="eyebrow">Access</p>
          <h2 className="display-lg mt-6">Give them independence. Not vulnerability.</h2>
          <p className="mt-6 body-lg">
            Veris is in private beta with families, clinicians, and security researchers. Request an invitation.
          </p>
          <form onSubmit={onSubmit} className="mt-12 grid gap-6">
            <div className="grid gap-6 md:grid-cols-2">
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
            <Field label="Organization (optional)">
              <LabInput
                maxLength={150}
                value={form.team}
                onChange={(e) => setForm({ ...form, team: e.target.value })}
              />
            </Field>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary disabled:opacity-60"
              >
                {loading ? "Sending…" : "Request access"}
                <span aria-hidden>→</span>
              </button>
              <a href="mailto:research@veris.systems" className="text-[14px] text-muted-foreground hover:text-foreground">
                Research inquiries →
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
}: { label: string; required?: boolean; children: ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow block">
        {label}{required && <span className="text-foreground"> *</span>}
      </span>
      <div className="mt-3">{children}</div>
    </label>
  );
}

function LabInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="h-11 w-full border-b border-border bg-transparent px-0 text-base font-medium tracking-tight text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-foreground"
    />
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  const cols = [
    { title: "Product", links: [
      { label: "Device", href: "#device" },
      { label: "How it works", href: "#how" },
      { label: "Access", href: "#access" },
    ]},
    { title: "Company", links: [
      { label: "Mission", href: "#mission" },
      { label: "Press", href: "mailto:press@veris.systems" },
      { label: "Research", href: "mailto:research@veris.systems" },
    ]},
    { title: "Legal", links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Disclosure", href: "mailto:security@veris.systems" },
    ]},
  ];
  return (
    <footer className="border-t border-border">
      <div className="container-x grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:py-20">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-full border border-foreground/40 text-[13px] font-semibold">V</span>
            <span className="text-[15px] font-semibold tracking-tight">Veris</span>
          </div>
          <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-muted-foreground">
            Cognitive defense infrastructure for the AI era.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <p className="eyebrow">{c.title}</p>
            <ul className="mt-5 space-y-3">
              {c.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-[14px] text-foreground/80 transition-colors hover:text-foreground">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="container-x flex flex-col items-start justify-between gap-2 py-5 text-[12px] text-muted-foreground md:flex-row md:items-center">
          <span>© 2026 Veris Labs · San Francisco</span>
          <span>Cognitive defense — built for the AI era.</span>
        </div>
      </div>
    </footer>
  );
}
