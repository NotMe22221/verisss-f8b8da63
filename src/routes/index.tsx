import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import ringHero from "@/assets/ring-hero.jpg";
import ringDevice from "@/assets/ring-device.jpg";
import { CornerFrame } from "@/components/landing/Frame";
import { submitEarlyAccess } from "@/server/early-access.functions";

export const Route = createFileRoute("/")({
  component: VerisLanding,
  head: () => ({
    meta: [
      { title: "Veris — Moonshot Hackathon Mission Control" },
      {
        name: "description",
        content:
          "Veris Moonshot Hackathon: 127 teams, 48 hours, one mission. Protect before the damage with the Veris smart ring.",
      },
      { property: "og:title", content: "Veris — Moonshot Hackathon" },
      {
        property: "og:description",
        content: "Mission control for the Veris Moonshot Hackathon.",
      },
    ],
  }),
});

function VerisLanding() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster theme="dark" />
      <Nav />
      <Hero />
      <CarouselStrip />
      <Problem />
      <Device />
      <EarlyAccess />
      <FooterMicro />
    </div>
  );
}

/* ---------- NAV ---------- */
function Nav() {
  return (
    <header className="border-b border-border/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#" className="flex items-center gap-2">
          <VMark />
          <span className="font-display text-2xl tracking-wide">Veris</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#problem" className="hover:text-foreground">Features</a>
          <a href="#device" className="hover:text-foreground">Business</a>
          <a href="#early-access" className="hover:text-foreground">Contacts</a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline">
            Log In
          </button>
          <a
            href="#early-access"
            className="rounded-sm bg-gold px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gold-foreground hover:opacity-90"
          >
            Secure a Spot
          </a>
        </div>
      </div>
    </header>
  );
}

function VMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M3 4 L12 22 L21 4 L17 4 L12 14 L7 4 Z" fill="currentColor" className="text-gold" />
    </svg>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 nebula opacity-90" />
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-16 lg:pb-24 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Mission Control
            </p>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              Moonshot Hackathon<br />Mission Control
            </h1>
            <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <Stat label="Status" value="Orbital" />
              <Stat label="Participants" value="127 Teams" />
              <Stat label="Duration" value="48 Hrs" />
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#early-access"
                className="rounded-sm bg-gold px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-gold-foreground hover:opacity-90"
              >
                Champagne Gold
              </a>
              <a
                href="#device"
                className="rounded-sm border border-gold/60 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-gold hover:bg-gold/10"
              >
                Ghost Style
              </a>
            </div>
          </div>
          <div className="relative">
            <img
              src={ringHero}
              alt="Veris titanium smart ring floating against a cosmic nebula"
              width={1024}
              height={1024}
              className="mx-auto w-full max-w-md drop-shadow-[0_30px_80px_oklch(0.55_0.15_220/0.5)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}:</dt>
      <dd className="mt-1 text-base text-foreground tracking-wider">{value}</dd>
    </div>
  );
}

/* ---------- CAROUSEL STRIP ---------- */
function CarouselStrip() {
  const slots = ["Mission Control", "", "", ""];
  return (
    <section className="border-y border-border/60">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-5 overflow-x-auto">
        {slots.map((s, i) => (
          <button
            key={i}
            className={`min-w-[140px] flex-1 rounded-sm border px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.22em] ${
              i === 0
                ? "border-gold/60 text-gold bg-gold/5"
                : "border-border/60 text-muted-foreground/40"
            }`}
          >
            {s || "•••"}
          </button>
        ))}
        <div className="ml-auto flex gap-2">
          <ArrowBtn><ArrowLeft className="h-4 w-4" /></ArrowBtn>
          <ArrowBtn><ArrowRight className="h-4 w-4" /></ArrowBtn>
        </div>
      </div>
    </section>
  );
}

function ArrowBtn({ children }: { children: ReactNode }) {
  return (
    <button className="rounded-sm border border-border/60 p-2.5 text-muted-foreground hover:text-foreground hover:border-gold/60">
      {children}
    </button>
  );
}

/* ---------- PROBLEM ---------- */
function Problem() {
  return (
    <section id="problem" className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            Problem
          </p>
          <h2 className="mt-6 font-display text-4xl tracking-tight md:text-5xl">
            Protection before<br />the damage.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            Veris's Moonshot Hackathon mission control unifies signal,
            response, and recovery — protecting wearers in the seconds before
            harm occurs, not the minutes after.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#early-access"
              className="rounded-sm bg-gold px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-gold-foreground hover:opacity-90"
            >
              Submit Now
            </a>
            <a
              href="#device"
              className="rounded-sm border border-gold/60 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-gold hover:bg-gold/10"
            >
              Ghost Style
            </a>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <StatCard value="$3.4B" label="Lost annually" />
          <StatCard value="127" label="Participants · 127 teams" />
          <StatCard value="25M" label="Patients impacted" />
          <StatCard value="480+" label="Duration · 48 Hrs" />
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="group relative rounded-sm border border-border/60 bg-card/40 p-6 transition-colors hover:border-gold/50">
      <ArrowUpRight className="absolute right-4 top-4 h-4 w-4 text-muted-foreground group-hover:text-gold" />
      <div className="font-display text-4xl text-foreground">{value}</div>
      <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

/* ---------- DEVICE ---------- */
function Device() {
  return (
    <section id="device" className="mx-auto max-w-7xl px-6 py-24">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
        The Device
      </p>
      <h2 className="mt-4 font-display text-5xl tracking-tight md:text-6xl">
        The Device
      </h2>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <CornerFrame className="relative overflow-hidden rounded-sm border border-border/60 bg-card/30 p-8">
          <div className="absolute inset-0 bg-grid opacity-50" />
          <ArrowUpRight className="absolute right-4 top-4 h-4 w-4 text-muted-foreground" />
          <img
            src={ringDevice}
            alt="Veris ring device detail"
            width={1024}
            height={1024}
            loading="lazy"
            className="relative mx-auto aspect-square w-full max-w-md object-contain"
          />
          <p className="relative mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            VRS-01 / Titanium
          </p>
        </CornerFrame>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <FeatureCard title="Titanium Shell" desc="Aerospace-grade housing" />
          <FeatureCard title="On-device AI" desc="On-device AI processors" />
          <FeatureCard title="Haptic Engine" desc="Cutting-edge haptic engine" />
          <FeatureCard title="Skin Contact Sensors" desc="Continuous biosignal capture" />
          <FeatureCard title="Sensor Array" desc="Sensor array · OPSC" />
          <FeatureCard title="Sensor Array" desc="Multi-channel capture" />
          <BigStat value="7" unit="-Day" label="Battery" />
          <BigStat value="4" unit="g" label="Weight" />
          <BigStat value="100" unit="m" label="Water Resistance" />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-sm border border-border/60 bg-card/30 p-4">
      <div className="text-sm text-foreground">{title}</div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {desc}
      </div>
    </div>
  );
}

function BigStat({ value, unit, label }: { value: string; unit: string; label: string }) {
  return (
    <div className="rounded-sm border border-border/60 bg-card/30 p-4">
      <div className="font-display text-3xl text-foreground">
        {value}
        <span className="font-sans text-base text-muted-foreground">{unit}</span>
      </div>
      <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </div>
    </div>
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
        toast.success("Spot secured. Welcome to Mission Control.");
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
    <section id="early-access" className="px-6 py-12">
      <CornerFrame className="mx-auto max-w-7xl rounded-sm border border-border/60 bg-card/40 p-8 md:p-12">
        <h2 className="font-display text-4xl tracking-tight md:text-5xl">
          Early Access
        </h2>
        <form
          onSubmit={onSubmit}
          className="mt-8 grid gap-4 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end"
        >
          <Field label="Name" required>
            <input
              required
              maxLength={100}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-sm border border-border/60 bg-input/40 px-3 py-3 text-sm outline-none focus:border-gold"
            />
          </Field>
          <Field label="Email" required>
            <input
              required
              type="email"
              maxLength={255}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-sm border border-border/60 bg-input/40 px-3 py-3 text-sm outline-none focus:border-gold"
            />
          </Field>
          <Field label="Team / Organization">
            <input
              maxLength={150}
              value={form.team}
              onChange={(e) => setForm({ ...form, team: e.target.value })}
              className="w-full rounded-sm border border-border/60 bg-input/40 px-3 py-3 text-sm outline-none focus:border-gold"
            />
          </Field>
          <button
            type="submit"
            disabled={loading}
            className="rounded-sm bg-gold px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-gold-foreground hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Securing..." : "Secure Your Spot"}
          </button>
        </form>
      </CornerFrame>
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
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
        {required && <span className="text-gold"> *</span>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

/* ---------- FOOTER ---------- */
function FooterMicro() {
  return (
    <footer className="px-6 pb-12">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 border-t border-border/60 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          OGCST / H6AX6V0I / VERIS.OOM
        </p>
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
      </div>
    </footer>
  );
}

// Re-export type for ReactNode reference above
type ReactNode = import("react").ReactNode;
