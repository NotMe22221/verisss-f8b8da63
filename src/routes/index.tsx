import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Shield, Heart, Lock } from "lucide-react";
import ringDevice from "@/assets/ring-device-studio.png";
import heroGrandmother from "@/assets/hero-grandmother.jpg";
import scenePhone from "@/assets/scene-phone.jpg";
import sceneDoor from "@/assets/scene-door.jpg";
import sceneFamily from "@/assets/scene-family.jpg";
import sceneReassurance from "@/assets/scene-reassurance.jpg";

export const Route = createFileRoute("/")({
  component: VerisLanding,
  head: () => ({
    meta: [
      { title: "Veris — Quiet protection for the people who matter most." },
      {
        name: "description",
        content:
          "Veris is a calm, wearable layer of intelligence designed to protect older adults from manipulation and coercion — gently, privately, before any damage is done.",
      },
    ],
  }),
});

/* ---------- LOGO ---------- */
function LogoIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" className={className} fill="currentColor" aria-hidden="true">
      <path d="M 128.005 191.173 C 128.448 156.208 156.93 128 192 128 L 192 64 L 128 64 C 128 99.346 99.346 128 64 128 L 64 192 L 128 192 Z M 192 256 L 64 256 C 28.654 256 0 227.346 0 192 L 0 64 L 64 64 L 64 0 L 192 0 C 227.346 0 256 28.654 256 64 L 256 192 L 192 192 Z" />
    </svg>
  );
}

/* ---------- NAVBAR ---------- */
function Navbar() {
  const links = ["Mission", "The Ring", "Science", "Families", "Press"];
  return (
    <nav className="absolute top-0 left-0 right-0 z-30 px-6 py-5">
      <div className="max-w-[88rem] mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-foreground">
          <LogoIcon className="w-7 h-7" />
          <span className="text-2xl font-medium tracking-tight">Veris</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l} href="#" className="text-sm text-foreground/65 hover:text-foreground font-medium transition-colors duration-200">
              {l}
            </a>
          ))}
        </div>
        <a href="#early-access" className="hidden md:inline-flex items-center gap-2 bg-foreground text-background text-sm font-medium pl-5 pr-2 py-1.5 rounded-full hover:bg-foreground/90 transition-colors">
          Join Early Access
          <span className="bg-background rounded-full p-1.5">
            <ArrowRight className="w-3.5 h-3.5 text-foreground" />
          </span>
        </a>
      </div>
    </nav>
  );
}

/* ---------- HERO ---------- */
function HeroSection() {
  return (
    <section className="relative w-full px-4 md:px-6 pt-4 pb-6">
      <div className="relative w-full rounded-[28px] overflow-hidden max-w-[88rem] mx-auto" style={{ minHeight: "min(92vh, 880px)" }}>
        <img
          src={heroGrandmother}
          alt="Older woman in warm morning light wearing the Veris ring"
          className="absolute inset-0 w-full h-full object-cover"
          width={1600}
          height={1200}
        />
        {/* warm cream wash for legibility, no dark overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(251,248,242,0.85) 0%, rgba(251,248,242,0.55) 28%, rgba(251,248,242,0.18) 55%, rgba(251,248,242,0.05) 100%)",
          }}
        />
        {/* soft sun glow bottom-right */}
        <div
          className="absolute -bottom-24 -right-24 w-[420px] h-[420px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(closest-side, rgba(249,233,201,0.55), transparent 70%)" }}
        />

        <div className="relative z-10 flex flex-col items-start justify-start h-full px-6 pt-28 pb-16 md:px-14 md:pt-36 md:pb-20" style={{ minHeight: "inherit" }}>
          <p className="text-foreground/65 text-[11px] md:text-xs font-medium tracking-[0.22em] uppercase mb-6 flex items-center gap-2">
            <span className="inline-block w-6 h-px bg-accent" />
            Quiet protection, worn naturally
          </p>
          <h1
            className="text-foreground text-[44px] sm:text-6xl md:text-7xl font-medium leading-[1.02] max-w-2xl mb-6"
            style={{ letterSpacing: "-0.04em" }}
          >
            Protection before<br />the damage.
          </h1>
          <p className="text-foreground/75 text-base md:text-xl max-w-xl mb-10 leading-relaxed">
            A calm, wearable layer of intelligence for the people who matter most — designed to protect independence, not replace it.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href="#early-access"
              className="inline-flex items-center justify-center gap-3 bg-foreground text-background text-base font-medium pl-7 pr-2 py-2 rounded-full hover:bg-foreground/90 transition-colors duration-200"
            >
              Join Early Access
              <span className="bg-background rounded-full p-2">
                <ArrowRight className="w-4 h-4 text-foreground" />
              </span>
            </a>
            <a
              href="#how"
              className="inline-flex items-center justify-center gap-2 border border-foreground/25 text-foreground text-base font-medium px-6 py-3 rounded-full hover:border-foreground/60 transition-colors duration-200"
            >
              See how it works
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- WORN NATURALLY ---------- */
const moments = [
  {
    img: scenePhone,
    title: "On the phone",
    quote: "The body reacts before the mind understands.",
  },
  {
    img: sceneDoor,
    title: "At the front door",
    quote: "A gentle pause when something feels off.",
  },
  {
    img: sceneFamily,
    title: "With family",
    quote: "Family stays close, without watching.",
  },
];

function MomentsSection() {
  return (
    <section id="how" className="px-6 py-24 md:py-32">
      <div className="max-w-[88rem] mx-auto">
        <div className="max-w-2xl mb-14 md:mb-20">
          <p className="text-foreground/55 text-xs font-medium tracking-[0.22em] uppercase mb-4 flex items-center gap-2">
            <span className="inline-block w-6 h-px bg-accent" />
            Worn naturally
          </p>
          <h2 className="text-foreground text-4xl md:text-5xl font-medium leading-[1.05]" style={{ letterSpacing: "-0.035em" }}>
            A quiet presence in the everyday moments that matter.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {moments.map((m) => (
            <figure key={m.title} className="flex flex-col gap-5">
              <div className="rounded-[22px] overflow-hidden bg-muted aspect-[4/5]">
                <img
                  src={m.img}
                  alt={m.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption>
                <p className="text-foreground/55 text-xs font-medium tracking-[0.18em] uppercase mb-2">{m.title}</p>
                <p className="text-foreground text-lg md:text-xl leading-snug" style={{ letterSpacing: "-0.015em" }}>
                  {m.quote}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- WHY VERIS ---------- */
const pillars = [
  { icon: Heart, title: "Calm", body: "A soft haptic, never an alarm. A pause, never panic." },
  { icon: Lock, title: "Private", body: "Nothing leaves the ring. No cloud, no recording, no surveillance." },
  { icon: Shield, title: "Human", body: "Built with families, for families — protecting dignity, not replacing it." },
];

function WhySection() {
  return (
    <section className="px-6 py-24 md:py-32" style={{ background: "linear-gradient(180deg, var(--surface-warm) 0%, var(--background) 100%)" }}>
      <div className="max-w-[88rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="text-foreground/55 text-xs font-medium tracking-[0.22em] uppercase mb-4 flex items-center gap-2">
            <span className="inline-block w-6 h-px bg-accent" />
            Why Veris
          </p>
          <h2 className="text-foreground text-4xl md:text-5xl font-medium leading-[1.05] mb-6" style={{ letterSpacing: "-0.035em" }}>
            Designed to protect independence, not replace it.
          </h2>
          <p className="text-foreground/70 text-lg leading-relaxed max-w-md">
            Most safeguards arrive too late — after the call, after the transfer, after the regret. Veris notices the quiet signs of pressure as they happen, and offers a gentle moment to pause.
          </p>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {pillars.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-[22px] bg-card border border-border p-7 flex flex-col gap-5 min-h-[240px]">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "var(--surface-sun)" }}>
                <Icon className="w-5 h-5" style={{ color: "var(--accent)" }} strokeWidth={1.6} />
              </div>
              <div>
                <h3 className="text-foreground text-xl font-medium mb-2" style={{ letterSpacing: "-0.02em" }}>{title}</h3>
                <p className="text-foreground/65 text-sm leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- THE RING ---------- */
const ringFeatures = [
  { label: "Material", value: "Aerospace-grade titanium · 4g" },
  { label: "Intelligence", value: "On-device AI · zero cloud" },
  { label: "Signal", value: "Silent haptic, only the wearer feels" },
  { label: "Battery", value: "7-day continuous wear" },
];

function RingSection() {
  return (
    <section id="ring" className="px-6 py-24 md:py-32">
      <div className="max-w-[88rem] mx-auto">
        <div className="max-w-2xl mb-14 md:mb-20">
          <p className="text-foreground/55 text-xs font-medium tracking-[0.22em] uppercase mb-4 flex items-center gap-2">
            <span className="inline-block w-6 h-px bg-accent" />
            The Ring
          </p>
          <h2 className="text-foreground text-4xl md:text-5xl font-medium leading-[1.05]" style={{ letterSpacing: "-0.035em" }}>
            Lightweight. Non-medical.<br />Quietly present.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <div
            className="rounded-[28px] overflow-hidden relative min-h-[480px] lg:min-h-[600px] flex items-center justify-center"
            style={{
              background:
                "radial-gradient(circle at 50% 40%, rgba(249,233,201,0.9) 0%, var(--surface-warm) 55%, var(--background) 100%)",
            }}
          >
            <img
              src={ringDevice}
              alt="The Veris ring"
              loading="lazy"
              className="relative z-10 max-w-[80%] max-h-[80%] object-contain drop-shadow-[0_30px_60px_rgba(31,42,58,0.18)]"
            />
          </div>

          <div className="rounded-[28px] bg-card border border-border p-8 md:p-12 flex flex-col justify-center">
            <p className="text-foreground/70 text-lg leading-relaxed mb-10">
              A piece you forget you're wearing — until the moment it matters. No screens. No notifications. Just a calm presence on your finger.
            </p>
            <ul className="divide-y divide-border">
              {ringFeatures.map((f) => (
                <li key={f.label} className="py-5 flex items-baseline justify-between gap-6">
                  <span className="text-foreground/55 text-xs font-medium tracking-[0.18em] uppercase shrink-0">{f.label}</span>
                  <span className="text-foreground text-base md:text-lg text-right font-medium" style={{ letterSpacing: "-0.015em" }}>{f.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAMILY REASSURANCE ---------- */
function ReassuranceSection() {
  return (
    <section className="px-6 py-24 md:py-32" style={{ background: "var(--surface-warm)" }}>
      <div className="max-w-[88rem] mx-auto">
        <div className="rounded-[28px] overflow-hidden bg-card border border-border grid grid-cols-1 lg:grid-cols-5">
          <div className="lg:col-span-3 relative min-h-[360px] lg:min-h-[560px]">
            <img
              src={sceneReassurance}
              alt="Mother and adult daughter sitting together in warm light"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-2 p-8 md:p-14 flex flex-col justify-center">
            <p className="text-foreground/55 text-xs font-medium tracking-[0.22em] uppercase mb-5 flex items-center gap-2">
              <span className="inline-block w-6 h-px bg-accent" />
              For families
            </p>
            <p className="text-foreground text-3xl md:text-4xl font-medium leading-[1.1] mb-8" style={{ letterSpacing: "-0.03em" }}>
              "Quiet protection for the people who matter most."
            </p>
            <p className="text-foreground/65 text-base leading-relaxed mb-10 max-w-md">
              Veris keeps families close without watching over their shoulder. A gentle reassurance, nothing more.
            </p>
            <a
              href="#early-access"
              className="self-start inline-flex items-center gap-3 bg-foreground text-background text-base font-medium pl-7 pr-2 py-2 rounded-full hover:bg-foreground/90 transition-colors duration-200"
            >
              Join Early Access
              <span className="bg-background rounded-full p-2">
                <ArrowRight className="w-4 h-4 text-foreground" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- TRUST STRIP ---------- */
const trustBrands = [
  "MIT Media Lab",
  "Stanford HAI",
  "AARP Labs",
  "Apple Health",
  "Verily",
  "DARPA",
];

function TrustSection() {
  return (
    <section className="px-6 py-20">
      <div className="max-w-[88rem] mx-auto">
        <p className="text-center text-foreground/45 text-xs font-medium tracking-[0.24em] uppercase mb-8">
          In conversation with
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {trustBrands.map((b) => (
            <span key={b} className="text-foreground/55 text-sm md:text-base font-medium tracking-tight">
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer id="early-access" className="px-6 pt-20 pb-10" style={{ background: "var(--surface-warm)" }}>
      <div className="max-w-[88rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-16">
          <div className="md:col-span-2 max-w-xl">
            <a href="#" className="flex items-center gap-2 text-foreground mb-6">
              <LogoIcon className="w-7 h-7" />
              <span className="text-2xl font-medium tracking-tight">Veris</span>
            </a>
            <p className="text-foreground text-2xl md:text-3xl font-medium leading-[1.15]" style={{ letterSpacing: "-0.025em" }}>
              Human-aware technology, designed with care.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div className="flex flex-col gap-3">
              <p className="text-foreground/45 text-xs font-medium tracking-[0.2em] uppercase mb-1">Veris</p>
              {["Mission", "The Ring", "Science", "Press"].map((l) => (
                <a key={l} href="#" className="text-foreground/70 hover:text-foreground transition-colors">{l}</a>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-foreground/45 text-xs font-medium tracking-[0.2em] uppercase mb-1">Care</p>
              {["For Families", "Privacy", "Contact"].map((l) => (
                <a key={l} href="#" className="text-foreground/70 hover:text-foreground transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-foreground/50 text-sm">© {new Date().getFullYear()} Veris. Designed to protect independence.</p>
          <p className="text-foreground/50 text-sm">Private Beta · By invitation</p>
        </div>
      </div>
    </footer>
  );
}

/* ---------- PAGE ---------- */
function VerisLanding() {
  return (
    <div className="flex flex-col bg-background text-foreground">
      <div className="relative">
        <Navbar />
        <HeroSection />
      </div>
      <MomentsSection />
      <WhySection />
      <RingSection />
      <ReassuranceSection />
      <TrustSection />
      <Footer />
    </div>
  );
}
