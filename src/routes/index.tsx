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
      { title: "Veris — Quiet intelligence for everyday wellness" },
      {
        name: "description",
        content:
          "The Veris smart ring blends precision biosignals with calm, human design. Track sleep, recovery, and readiness — without the noise.",
      },
      { property: "og:title", content: "Veris — Quiet intelligence" },
      {
        property: "og:description",
        content: "Precision wellness in a titanium ring.",
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
        <Pillars />
        <Device />
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
          <NavLink href="#pillars" active>Wellness</NavLink>
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
            Join waitlist
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
            <span className="inline-flex items-center gap-2 rounded-full bg-periwinkle-soft px-3 py-1 text-xs font-medium text-periwinkle">
              <span className="h-1.5 w-1.5 rounded-full bg-periwinkle" />
              Now accepting early access
            </span>
            <h1 className="mt-6 text-4xl font-light leading-[1.05] tracking-tight text-charcoal md:text-6xl lg:text-7xl">
              Quiet intelligence,<br />
              <span className="text-taupe">worn lightly.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Veris is a titanium smart ring that listens to your body so you
              don't have to. Sleep, recovery, and readiness — distilled into
              calm, daily guidance.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#early-access"
                className="inline-flex h-12 items-center rounded-full bg-periwinkle px-6 text-base text-white transition-opacity hover:opacity-90"
              >
                Reserve your ring
              </a>
              <a
                href="#device"
                className="inline-flex h-12 items-center rounded-full border border-taupe px-6 text-base text-taupe transition-colors hover:bg-taupe/10"
              >
                Explore the ring
              </a>
            </div>
            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
              <Stat value="7d" label="Battery" />
              <Stat value="4g" label="Weight" />
              <Stat value="100m" label="Water resistance" />
            </dl>
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

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="text-3xl font-light text-charcoal">{value}</dt>
      <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{label}</dd>
    </div>
  );
}

/* ---------- PILLARS ---------- */
function Pillars() {
  const items = [
    {
      title: "Sleep",
      desc: "Stages, latency, and restorative depth tracked with research-grade accuracy — no nightly chart-staring required.",
      tone: "bg-card",
    },
    {
      title: "Recovery",
      desc: "HRV, resting heart rate, and skin temperature converge into one calm score: ready, take it easy, or rest.",
      tone: "bg-periwinkle-soft",
    },
    {
      title: "Readiness",
      desc: "A single morning signal that respects your context — workouts, illness, travel — without overwhelming you.",
      tone: "bg-card",
    },
  ];
  return (
    <section id="pillars" className="border-b border-border">
      <div className="mx-auto max-w-[1440px] px-4 py-16 md:px-10 md:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-sage">Three pillars</p>
          <h2 className="mt-4 text-3xl font-light tracking-tight text-charcoal md:text-5xl">
            One ring. The signals that matter.
          </h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
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
    "Aerospace-grade titanium shell",
    "On-device AI — your data stays yours",
    "Continuous biosignal capture",
    "Whisper-quiet haptics",
    "7-day battery, 80-min charge",
    "Water resistant to 100 meters",
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
            Engineered to disappear.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Four grams of titanium, sapphire-coated sensors, and a battery that
            outlasts your week. The ring you forget you're wearing — until it
            quietly tells you something useful.
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
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">Early access</p>
          <h2 className="mt-4 text-3xl font-light tracking-tight md:text-5xl">
            Join the first wearers.
          </h2>
          <p className="mt-4 max-w-xl text-base text-white/70">
            Reserve your spot. We'll reach out as production batches open — no
            spam, no noise.
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
            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-periwinkle px-6 text-base text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Reserving..." : "Reserve my ring"}
            </button>
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
          © {new Date().getFullYear()} Veris. Quiet intelligence for everyday wellness.
        </p>
      </div>
    </footer>
  );
}
