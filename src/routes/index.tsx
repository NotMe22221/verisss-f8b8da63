import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight, Check } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import ringHero from "@/assets/ring-hero.jpg";
import ringDevice from "@/assets/ring-device.jpg";
import { submitEarlyAccess } from "@/lib/early-access.functions";

export const Route = createFileRoute("/")({
  component: VerisLanding,
  head: () => ({
    meta: [
      { title: "Veris — Cognitive defense system for the AI era" },
      {
        name: "description",
        content:
          "Veris is the first wearable intelligence system designed to detect coercion, manipulation, and scam pressure in real time — before financial loss occurs.",
      },
      { property: "og:title", content: "Veris — Protection before the damage." },
      {
        property: "og:description",
        content:
          "A whisper-thin titanium ring with on-device AI that detects manipulation in real time.",
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
        <Manifesto />
        <Pillars />
        <Device />
        <Statement />
        <Metrics />
        <EarlyAccess />
      </main>
      <Footer />
    </div>
  );
}

/* ---------- NAV ---------- */
function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 md:px-10">
        <a href="#" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-taupe text-taupe-foreground text-sm font-semibold">V</span>
          <span className="text-lg font-semibold tracking-tight text-charcoal">Veris</span>
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          <NavLink href="#how" active>How it works</NavLink>
          <NavLink href="#device">The Ring</NavLink>
          <NavLink href="#early-access">Early Access</NavLink>
        </nav>
        <div className="flex items-center gap-3">
          <button className="hidden text-sm text-muted-foreground hover:text-charcoal sm:inline">
            Sign in
          </button>
          <a
            href="#early-access"
            className="inline-flex h-10 items-center rounded-full bg-taupe px-5 text-sm text-taupe-foreground transition-colors hover:bg-charcoal"
          >
            Join Early Access
          </a>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, children, active }: { href: string; children: ReactNode; active?: boolean }) {
  return (
    <a
      href={href}
      className={`px-4 py-3 text-sm transition-colors ${
        active
          ? "text-charcoal border-b-2 border-taupe"
          : "text-muted-foreground border-b-2 border-transparent hover:text-charcoal"
      }`}
    >
      {children}
    </a>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-[1440px] px-4 py-16 md:px-10 md:py-24 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-periwinkle-soft px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-periwinkle">
              <span className="h-1.5 w-1.5 rounded-full bg-periwinkle" />
              Moonshot Idea 03 • Private Beta • Cognitive Defense System
            </span>
            <h1 className="mt-6 text-4xl font-light leading-[1.05] tracking-tight text-charcoal md:text-6xl lg:text-7xl">
              Protection before<br />
              <span className="text-taupe">the damage.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Veris is the first wearable intelligence system designed to detect
              coercion, manipulation, and scam pressure in real time — before
              financial loss occurs.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#early-access"
                className="inline-flex h-12 items-center rounded-full bg-periwinkle px-6 text-base text-white transition-opacity hover:opacity-90"
              >
                Join Early Access
              </a>
              <a
                href="#how"
                className="inline-flex h-12 items-center rounded-full border border-taupe px-6 text-base text-taupe transition-colors hover:bg-taupe/10"
              >
                See How It Works
              </a>
            </div>
            <p className="mt-10 text-xs uppercase tracking-[0.22em] text-muted-foreground">
              127 families • 9 states • on-device AI • private by design
            </p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-periwinkle-soft blur-3xl opacity-60" />
            <img
              src={ringHero}
              alt="Veris titanium smart ring"
              width={1024}
              height={1024}
              className="relative mx-auto w-full max-w-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- MANIFESTO ---------- */
function Manifesto() {
  return (
    <section className="border-b border-border bg-card">
      <div className="mx-auto max-w-[1440px] px-4 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-sage">The problem</p>
          <h2 className="mt-4 text-3xl font-light leading-tight tracking-tight text-charcoal md:text-5xl">
            Today's attacks do not target systems anymore.<br />
            <span className="text-taupe">They target human cognition.</span>
          </h2>
          <div className="mt-10 space-y-6 text-base leading-relaxed text-charcoal/80 md:text-lg">
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
            <p className="font-medium text-charcoal">
              Every existing fraud system reacts too late.
            </p>
            <p>
              Banks monitor transactions after money moves. Spam filters screen
              calls after the connection is made. Security tools analyze
              compromise after the attack succeeds. None of them understand the
              neurological moment where manipulation actually happens.
            </p>
            <p className="text-charcoal">
              The scam is already working before the victim realizes it.
            </p>
            <p className="text-2xl font-light text-charcoal md:text-3xl">
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
            <p className="text-charcoal">
              Body and language are fused together in real time.
            </p>
            <p>
              The result is the first cognitive defense system designed to
              detect psychological manipulation before irreversible decisions
              occur.
            </p>
            <ul className="space-y-1 text-charcoal">
              <li>No screens.</li>
              <li>No surveillance.</li>
              <li>No invasive monitoring.</li>
            </ul>
            <p className="text-charcoal">
              Just a quiet pulse when something is wrong.
            </p>
            <p>
              When risk escalates, Veris creates a moment of interruption
              before financial damage occurs. If pressure continues rising,
              trusted contacts receive intelligent contextual alerts designed
              to intervene before loss happens.
            </p>
            <p className="text-xl font-light italic text-taupe md:text-2xl">
              Because the body reacts before the mind understands.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- PILLARS / HOW IT WORKS ---------- */
function Pillars() {
  const items = [
    {
      title: "Detect",
      desc: "Continuous biosignal and ambient sensing recognize stress, coercion, and manipulation patterns as they happen.",
      tone: "bg-card",
    },
    {
      title: "Analyze",
      desc: "On-device AI fuses physiological and conversational signals into a real-time cognitive risk score.",
      tone: "bg-periwinkle-soft",
    },
    {
      title: "Intervene",
      desc: "A subtle haptic pulse interrupts engineered urgency and creates a moment of clarity.",
      tone: "bg-card",
    },
    {
      title: "Protect",
      desc: "Trusted contacts receive context-aware alerts before money is lost.",
      tone: "bg-periwinkle-soft",
    },
  ];
  return (
    <section id="how" className="border-b border-border">
      <div className="mx-auto max-w-[1440px] px-4 py-16 md:px-10 md:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-sage">How it works</p>
          <h2 className="mt-4 text-3xl font-light tracking-tight text-charcoal md:text-5xl">
            Four quiet steps. One moment of clarity.
          </h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <article
              key={it.title}
              className={`rounded-lg p-6 md:p-8 ${it.tone} transition-transform hover:-translate-y-1`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-charcoal">{it.title}</h3>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-charcoal/80">
                {it.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- DEVICE ---------- */
function Device() {
  const features = [
    "7-day battery life",
    "On-device AI inference",
    "4-gram titanium shell",
    "Water resistant",
    "Private by default",
    "Audio processed locally, discarded instantly",
  ];
  return (
    <section id="device" className="border-b border-border bg-card">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-16 md:px-10 md:py-24 lg:grid-cols-2 lg:items-center">
        <div className="relative overflow-hidden rounded-lg bg-background p-8 md:p-12">
          <img
            src={ringDevice}
            alt="Veris ring detail"
            width={1024}
            height={1024}
            loading="lazy"
            className="mx-auto aspect-square w-full max-w-md object-contain"
          />
          <p className="mt-6 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            VRS-01 · Brushed Titanium
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-sage">The Ring</p>
          <h2 className="mt-4 text-3xl font-light tracking-tight text-charcoal md:text-5xl">
            A whisper-thin titanium ring engineered for continuous wear.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            No conversations are stored. No cloud recordings exist. Audio is
            processed locally and discarded instantly.
          </p>
          <p className="mt-3 text-base font-medium text-charcoal">
            Protection without surveillance.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-charcoal">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sage/15 text-sage">
                  <Check className="h-3 w-3" />
                </span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- BIG STATEMENT ---------- */
function Statement() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-[1440px] px-4 py-20 md:px-10 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-sage">A new layer</p>
          <h2 className="mt-6 text-4xl font-light leading-tight tracking-tight text-charcoal md:text-6xl">
            The future of security is <span className="text-taupe">human-aware.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            As AI-generated manipulation scales globally, defending
            infrastructure alone will no longer be enough. The next generation
            of security systems must understand human vulnerability in real
            time.
          </p>
          <p className="mt-6 text-lg text-charcoal md:text-xl">
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
    <section className="border-b border-border bg-card">
      <div className="mx-auto max-w-[1440px] px-4 py-16 md:px-10 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="border-l-2 border-taupe pl-6">
              <dt className="text-4xl font-light text-charcoal md:text-5xl">{s.value}</dt>
              <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.label}</dd>
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
        toast.success("You're in. Welcome to Veris.");
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
      <div className="mx-auto max-w-[1440px] px-4 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-3xl rounded-lg bg-taupe p-8 text-taupe-foreground md:p-12">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">Final call</p>
          <h2 className="mt-4 text-3xl font-light tracking-tight md:text-5xl">
            Give them independence.<br />Not vulnerability.
          </h2>
          <p className="mt-4 max-w-xl text-base text-white/70">
            Join the private beta shaping the future of cognitive defense
            systems.
          </p>
          <form onSubmit={onSubmit} className="mt-10 grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Name" required>
                <DarkInput
                  required
                  maxLength={100}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </Field>
              <Field label="Email" required>
                <DarkInput
                  required
                  type="email"
                  maxLength={255}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </Field>
            </div>
            <Field label="Team or organization (optional)">
              <DarkInput
                maxLength={150}
                value={form.team}
                onChange={(e) => setForm({ ...form, team: e.target.value })}
              />
            </Field>
            <div className="mt-2 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-12 items-center justify-center rounded-full bg-periwinkle px-6 text-base text-white transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "Joining..." : "Join Early Access"}
              </button>
              <a
                href="mailto:research@veris.systems"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/30 px-6 text-base text-white transition-colors hover:bg-white/10"
              >
                Request Research Access
              </a>
            </div>
          </form>
        </div>
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
      <span className="block text-sm font-semibold text-white/85">
        {label}
        {required && <span className="text-periwinkle-soft"> *</span>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function DarkInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="h-10 w-full rounded-lg bg-charcoal/40 px-5 text-base text-white placeholder:text-white/50 outline-none ring-0 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] focus:shadow-[inset_0_2px_0_0_rgba(255,255,255,0.12)]"
    />
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-4 px-4 py-10 md:flex-row md:items-center md:px-10">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-taupe text-taupe-foreground text-xs font-semibold">V</span>
          <span className="text-sm text-charcoal">Veris</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Veris © {new Date().getFullYear()} • Cognitive defense infrastructure for the AI era.
        </p>
      </div>
    </footer>
  );
}
