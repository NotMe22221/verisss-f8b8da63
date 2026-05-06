import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { CornerFrame } from "@/components/landing/Frame";
import ringHero from "@/assets/ring-hero.jpg";
import ringDevice from "@/assets/ring-device.jpg";
import { submitEarlyAccess } from "@/lib/early-access.functions";

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
      <StatusBar />
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <HowItWorks />
        <Device />
        <Statement />
        <Metrics />
        <EarlyAccess />
      </main>
      <Footer />
    </div>
  );
}

/* ---------- STATUS BAR ---------- */
function StatusBar() {
  return (
    <div className="border-b border-border bg-background/80">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground md:px-10">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
          Moonshot 03 · Veris · Classification: Private Beta
        </span>
        <span className="hidden md:inline">EST. 2026 · COGNITIVE DEFENSE INFRASTRUCTURE</span>
      </div>
    </div>
  );
}

/* ---------- NAV ---------- */
function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 md:px-10">
        <a href="#" className="flex items-center gap-3">
          <span className="grid h-7 w-7 place-items-center border border-gold text-gold font-mono text-xs">V</span>
          <span className="font-display text-xl tracking-tight text-ink">Veris</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          <NavLink href="#mission">Mission</NavLink>
          <NavLink href="#science">Science</NavLink>
          <NavLink href="#device">Device</NavLink>
          <NavLink href="#early-access">Access</NavLink>
        </nav>
        <a
          href="#early-access"
          className="inline-flex h-9 items-center border border-gold bg-gold px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-transparent hover:text-gold"
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
    <section className="relative overflow-hidden border-b border-border bg-nebula">
      <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-[1440px] px-4 py-20 md:px-10 md:py-28 lg:py-36">
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-gold">
              <span className="h-px w-8 bg-gold" />
              Moonshot Idea 03 · Cognitive Defense System
            </div>
            <h1 className="mt-8 font-display text-5xl font-light leading-[1.02] tracking-tight text-ink md:text-7xl lg:text-[5.5rem]">
              Protection before<br />
              <span className="italic text-gold">the damage.</span>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Veris is the first wearable intelligence system designed to
              detect coercion, manipulation, and scam pressure in real time —
              before financial loss occurs.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#early-access"
                className="inline-flex h-12 items-center bg-gold px-7 font-mono text-[12px] uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
              >
                Join Early Access →
              </a>
              <a
                href="#science"
                className="inline-flex h-12 items-center border border-ink/30 px-7 font-mono text-[12px] uppercase tracking-[0.2em] text-ink transition-colors hover:border-gold hover:text-gold"
              >
                See How It Works
              </a>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-border pt-8 sm:grid-cols-4">
              <HeroStat label="Status" value="Orbital" />
              <HeroStat label="Participants" value="127" />
              <HeroStat label="States" value="9" />
              <HeroStat label="Mode" value="Private" />
            </div>
          </div>
          <div className="relative">
            <CornerFrame className="aspect-square">
              <div className="absolute inset-0 bg-grid-sm opacity-60" aria-hidden />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.78_0.10_80/0.25),transparent_60%)]" aria-hidden />
              <img
                src={ringHero}
                alt="Veris titanium ring"
                width={1024}
                height={1024}
                className="relative mx-auto h-full w-full object-contain p-6"
              />
              <div className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                VRS-01 · 04g · Ti
              </div>
              <div className="absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
                ◐ Live Telemetry
              </div>
            </CornerFrame>
          </div>
        </div>
        <p className="mt-16 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          127 families · 9 states · on-device AI · private by design
        </p>
      </div>
    </section>
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
  return (
    <section id="mission" className="border-b border-border bg-background">
      <div className="mx-auto max-w-[1440px] px-4 py-20 md:px-10 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-20">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">§ 01 / Mission</p>
            <h2 className="mt-4 font-display text-3xl font-light leading-tight text-ink md:text-4xl">
              The Problem
            </h2>
          </aside>
          <div className="max-w-2xl space-y-8 text-base leading-[1.75] text-muted-foreground md:text-lg">
            <p className="font-display text-3xl font-light leading-[1.15] text-ink md:text-5xl">
              Today's attacks do not target systems anymore.{" "}
              <span className="italic text-gold">They target human cognition.</span>
            </p>
            <p>
              AI-generated voices, engineered urgency, impersonation, and
              emotional manipulation bypass every security layer built for a
              slower world. The attack no longer happens at the firewall. It
              happens quietly, inside a conversation.
            </p>
            <p>
              Older adults are the most exposed. Not because they are careless,
              but because modern scams exploit trust, fear, and emotional
              pressure faster than people can consciously react.
            </p>
            <PullQuote>Every existing fraud system reacts too late.</PullQuote>
            <p>
              Banks monitor transactions after money moves. Spam filters screen
              calls after the connection is made. Security tools analyze
              compromise after the attack succeeds. None of them understand the
              neurological moment where manipulation actually happens.
            </p>
            <p className="text-ink">
              The scam is already working before the victim realizes it.
            </p>
            <p className="font-display text-2xl font-light text-ink md:text-3xl">
              Veris was built to change that.
            </p>
            <p>
              Veris is a whisper-thin titanium ring powered by on-device AI and
              continuous biosignal sensing. It continuously measures
              physiological stress signals — heart-rate variability,
              electrodermal activity, and micro-patterns associated with
              coercion and engineered urgency.
            </p>
            <p>
              At the same time, lightweight local AI models analyze
              conversational patterns linked to impersonation, secrecy,
              emotional pressure, and financial manipulation.
            </p>
            <p className="font-display text-xl text-ink md:text-2xl">
              Body and language are fused together in real time.
            </p>
            <p>
              The result is the first cognitive defense system designed to
              detect psychological manipulation before irreversible decisions
              occur.
            </p>
            <ul className="space-y-1 font-mono text-sm uppercase tracking-[0.18em] text-ink">
              <li>— No screens.</li>
              <li>— No surveillance.</li>
              <li>— No invasive monitoring.</li>
            </ul>
            <p className="text-ink">Just a quiet pulse when something is wrong.</p>
            <p>
              When risk escalates, Veris creates a moment of interruption
              before financial damage occurs. If pressure continues rising,
              trusted contacts receive intelligent contextual alerts designed
              to intervene before loss happens.
            </p>
            <PullQuote>
              Because the body reacts before the mind understands.
            </PullQuote>
          </div>
        </div>
      </div>
    </section>
  );
}

function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="border-l-2 border-gold pl-6 font-display text-2xl font-light italic leading-snug text-ink md:text-3xl">
      {children}
    </blockquote>
  );
}

/* ---------- HOW IT WORKS ---------- */
function HowItWorks() {
  const items = [
    {
      n: "01",
      title: "Detect",
      desc: "Continuous biosignal and ambient sensing recognize stress, coercion, and manipulation patterns as they happen.",
    },
    {
      n: "02",
      title: "Analyze",
      desc: "On-device AI fuses physiological and conversational signals into a real-time cognitive risk score.",
    },
    {
      n: "03",
      title: "Intervene",
      desc: "A subtle haptic pulse interrupts engineered urgency and creates a moment of clarity.",
    },
    {
      n: "04",
      title: "Protect",
      desc: "Trusted contacts receive context-aware alerts before money is lost.",
    },
  ];
  return (
    <section id="science" className="border-b border-border">
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
              className="group bg-background p-8 transition-colors hover:bg-card md:p-10"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">{it.n}</span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-gold" />
              </div>
              <h3 className="mt-10 font-display text-2xl font-light text-ink md:text-3xl">
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
    <section id="device" className="border-b border-border bg-card">
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
            <p className="mt-8 text-base leading-relaxed text-muted-foreground md:text-lg">
              No conversations are stored. No cloud recordings exist. Audio is
              processed locally and discarded instantly.
            </p>
            <p className="mt-4 font-display text-xl font-light italic text-ink md:text-2xl">
              Protection without surveillance.
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
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
      <div className="absolute inset-0 bg-nebula" aria-hidden />
      <div className="relative mx-auto max-w-[1440px] px-4 py-28 md:px-10 md:py-40">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">§ 04 / Thesis</p>
          <h2 className="mt-8 font-display text-5xl font-light leading-[1.05] tracking-tight text-ink md:text-7xl lg:text-[5.5rem]">
            The future of security is{" "}
            <span className="italic text-gold">human-aware.</span>
          </h2>
          <p className="mx-auto mt-10 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            As AI-generated manipulation scales globally, defending
            infrastructure alone will no longer be enough. The next generation
            of security systems must understand human vulnerability in real
            time.
          </p>
          <p className="mt-8 font-display text-2xl font-light text-ink md:text-3xl">
            Veris is building that layer.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- METRICS ---------- */
function Metrics() {
  const stats = [
    { value: "$3.4B", label: "Lost annually by Americans 60+ to scams" },
    { value: "76%", label: "Increase in AI-enabled fraud attempts" },
    { value: "0", label: "Existing systems for real-time cognitive fraud detection" },
    { value: "1st", label: "Wearable built for manipulation awareness" },
  ];
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-[1440px] px-4 py-20 md:px-10 md:py-28">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">§ 05 / Field Data</p>
        <div className="mt-12 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className="bg-background p-8 md:p-10">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                FIG. {String(i + 1).padStart(2, "0")}
              </div>
              <div className="mt-6 font-display text-5xl font-light text-gold md:text-6xl">
                {s.value}
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
          <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            Join the private beta shaping the future of cognitive defense
            systems.
          </p>
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
            Submissions reviewed weekly · No spam · Beta cohorts open quarterly
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
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-6 px-4 py-12 md:flex-row md:items-center md:px-10">
        <div className="flex items-center gap-3">
          <span className="grid h-7 w-7 place-items-center border border-gold text-gold font-mono text-xs">V</span>
          <span className="font-display text-base text-ink">Veris</span>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Veris © {new Date().getFullYear()} · Cognitive Defense Infrastructure for the AI Era
        </p>
      </div>
    </footer>
  );
}
