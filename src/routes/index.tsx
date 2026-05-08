import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import ringDevice from "@/assets/ring-device-studio.png";
import { submitEarlyAccess } from "@/lib/early-access.functions";

export const Route = createFileRoute("/")({
  component: VerisLanding,
  head: () => ({
    meta: [
      { title: "Veris, Every fraud tool reacts. Veris intervenes." },
      {
        name: "description",
        content:
          "Veris is a wearable cognitive defense system. Biosignals, voice, and on-device AI fused in a ring, to interrupt manipulation the second it happens, before money is ever lost.",
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
  const links = [
    { label: "Mission", href: "#problem" },
    { label: "The Device", href: "#device" },
    { label: "Science", href: "#science" },
    { label: "Manifesto", href: "#manifesto" },
  ];
  return (
    <nav className="absolute top-0 left-0 right-0 z-20 px-6 py-5">
      <div className="max-w-[88rem] mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-[#1B3A4B]">
          <LogoIcon className="w-7 h-7" />
          <span className="text-2xl font-medium tracking-tight">Veris</span>
        </Link>
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="text-base text-[#1B3A4B]/70 hover:text-[#1B3A4B] font-medium transition-colors duration-200">
              {l.label}
            </a>
          ))}
          <Link to="/about" className="text-base text-[#1B3A4B]/70 hover:text-[#1B3A4B] font-medium transition-colors duration-200" activeProps={{ className: "text-[#1B3A4B] font-medium" }}>
            About
          </Link>
          <a href="#early-access" className="text-base bg-[#1B3A4B] text-[#F4EFE6] px-4 py-2 rounded-full hover:bg-[#1B3A4B]/90 font-medium transition-colors duration-200">
            Early Access
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ---------- BRAND MARQUEE ---------- */
const heroBrands: Array<{ name: string; style: React.CSSProperties }> = [
  { name: "MIT Media Lab", style: { fontFamily: "Georgia, serif", fontWeight: 700, letterSpacing: "-0.02em", fontSize: 15 } },
  { name: "DARPA", style: { fontFamily: "Arial, sans-serif", fontWeight: 900, letterSpacing: "0.08em", fontSize: 13, textTransform: "uppercase" } },
  { name: "Stanford HAI", style: { fontFamily: "'Trebuchet MS', sans-serif", fontWeight: 600, letterSpacing: "0.01em", fontSize: 15, fontStyle: "italic" } },
  { name: "FINCEN", style: { fontFamily: "'Courier New', monospace", fontWeight: 700, letterSpacing: "0.12em", fontSize: 13, textTransform: "uppercase" } },
  { name: "AARP Labs", style: { fontFamily: "Palatino, serif", fontWeight: 400, letterSpacing: "-0.01em", fontSize: 16 } },
  { name: "Apple Health", style: { fontFamily: "Impact, sans-serif", fontWeight: 400, letterSpacing: "0.04em", fontSize: 14 } },
  { name: "Verily", style: { fontFamily: "Verdana, sans-serif", fontWeight: 700, letterSpacing: "-0.03em", fontSize: 13 } },
];

function HeroMarquee() {
  return (
    <div className="mt-16 lg:mt-24 w-full max-w-md lg:max-w-2xl overflow-hidden">
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .marquee-track { display: flex; width: max-content; animation: marquee 22s linear infinite; }
      `}</style>
      <div className="marquee-track">
        {[...heroBrands, ...heroBrands].map((b, i) => (
          <span key={i} className="mx-7 shrink-0 text-[#1B3A4B]/60 whitespace-nowrap" style={b.style}>
            {b.name}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- HERO ---------- */
function HeroSection() {
  return (
    <section className="flex-1 px-4 md:px-6 pt-20 pb-6 flex items-end">
      <div className="relative w-full rounded-2xl overflow-hidden max-w-[88rem] mx-auto min-h-[640px] lg:min-h-[720px]">
        <video autoPlay muted loop playsInline className="object-cover absolute inset-0 w-full h-full" style={{ filter: "grayscale(1) contrast(1.05) brightness(1.02)" }}>
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_161253_c72b1869-400f-45ed-ac0c-52f68c2ed5bd.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(244,239,230,0.55) 0%, rgba(244,239,230,0.35) 50%, rgba(244,239,230,0.65) 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: "#1B3A4B", mixBlendMode: "soft-light", opacity: 0.5 }} />
        <div className="relative z-10 flex flex-col items-start justify-start h-full p-6 pt-12 md:p-10 md:pt-16 lg:p-14 lg:pt-20 xl:p-20 xl:pt-28">
          <p className="text-[#1B3A4B]/70 text-xs lg:text-sm font-medium tracking-[0.18em] uppercase mb-4 lg:mb-6">
            Private Beta · The Cognitive Defense Layer
          </p>
          <h1 className="text-[#1B3A4B] text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-[1.02] max-w-xl lg:max-w-3xl xl:max-w-4xl mb-4 lg:mb-6" style={{ letterSpacing: "-0.04em" }}>
            Every fraud tool reacts.
            <br />
            Veris intervenes.
          </h1>
          <p className="text-[#1B3A4B] text-base md:text-lg lg:text-xl max-w-lg lg:max-w-2xl mb-6 lg:mb-8 leading-relaxed font-medium">
            Biosignals, voice, and on-device AI, fused in a ring, to interrupt manipulation the second it happens. So your parents get a moment to think, before the transfer, before the regret.
          </p>
          <a href="#early-access" className="inline-flex items-center gap-3 bg-[#1B3A4B] text-[#F4EFE6] text-base md:text-lg lg:text-xl font-medium pl-8 lg:pl-10 pr-2 py-2 lg:py-2.5 rounded-full hover:bg-[#14303f] transition-colors duration-200">
            Join the beta
            <span className="bg-[#F4EFE6] rounded-full p-2">
              <ArrowRight className="w-5 h-5 text-[#1B3A4B]" />
            </span>
          </a>
          <HeroMarquee />
        </div>
      </div>
    </section>
  );
}

/* ---------- PROBLEM ---------- */
function ProblemSection() {
  const stats = [
    { value: "$3.4B", label: "lost annually to elder fraud (FTC, 2024)" },
    { value: "1 in 10", label: "adults 65+ targeted every year" },
    { value: "$35,000", label: "average loss per incident" },
  ];
  return (
    <section id="problem" className="bg-[#F4EFE6] px-6 lg:px-12 py-24 lg:py-36 border-t border-[#1B3A4B]/10">
      <div className="max-w-[88rem] mx-auto">
        <p className="text-[#1B3A4B]/60 text-sm mb-3">The Problem</p>
        <h2 className="text-[#1B3A4B] text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.05] max-w-4xl lg:max-w-6xl mb-16 lg:mb-24" style={{ letterSpacing: "-0.04em" }}>
          Every fraud system in the world reacts after the money is gone.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          <p className="text-[#1B3A4B]/80 text-xl md:text-2xl leading-relaxed font-medium">
            Banks freeze the transfer after it clears. Apps flag the call after it ends. Family finds out after the regret. By then the damage is done, financially, and to the trust an older person has in their own judgment.
          </p>
          <div className="flex flex-col divide-y divide-[#1B3A4B]/15">
            {stats.map((s) => (
              <div key={s.value} className="py-5 first:pt-0">
                <p className="text-[#1B3A4B] text-4xl md:text-5xl font-medium" style={{ letterSpacing: "-0.04em" }}>{s.value}</p>
                <p className="text-[#1B3A4B]/60 text-sm md:text-base mt-1">{s.label}</p>
              </div>
            ))}
            <p className="pt-5 text-[#1B3A4B]/40 text-[11px] tracking-wide uppercase">Sources: FTC · FBI IC3 · AARP</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- HOW IT WORKS ---------- */
const steps = [
  { n: "01", title: "Sense.", body: "The ring continuously reads heart-rate variability, skin conductance, and micro-stress signatures." },
  { n: "02", title: "Listen.", body: "On-device AI analyzes the conversation locally, for scripted scam patterns, urgency, impersonation cues, emotional coercion." },
  { n: "03", title: "Interrupt.", body: "When manipulation is detected, a quiet haptic pulse breaks the spell. A single moment to think." },
  { n: "04", title: "Alert.", body: "If pressure continues, a trusted family contact gets a discreet notification, never a recording, never a transcript." },
];

function HowItWorksSection() {
  return (
    <section className="bg-[#1B3A4B] px-6 lg:px-12 py-24 lg:py-36">
      <div className="max-w-[88rem] mx-auto">
        <p className="text-[#F4EFE6]/50 text-sm mb-3">How It Works</p>
        <h2 className="text-[#F4EFE6] text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.05] max-w-4xl lg:max-w-6xl mb-16 lg:mb-24" style={{ letterSpacing: "-0.04em" }}>
          Four signals. One second. Before the decision.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#F4EFE6]/10 rounded-2xl overflow-hidden">
          {steps.map((s) => (
            <div key={s.n} className="bg-[#1B3A4B] p-7 md:p-8 lg:p-10 min-h-56 lg:min-h-72 flex flex-col justify-between">
              <p className="text-[#F4EFE6]/40 text-sm font-medium tracking-wider">{s.n}</p>
              <div>
                <h3 className="text-[#F4EFE6] text-2xl lg:text-3xl font-medium mb-3" style={{ letterSpacing: "-0.02em" }}>{s.title}</h3>
                <p className="text-[#F4EFE6]/60 text-base lg:text-lg leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[#F4EFE6]/60 italic text-base md:text-lg mt-10 max-w-2xl">
          Nothing leaves the ring unless it has to. No cameras. No surveillance. No loss of independence.
        </p>
      </div>
    </section>
  );
}

/* ---------- AUDIENCE ---------- */
function AudienceSection() {
  return (
    <section className="bg-[#F4EFE6] px-6 lg:px-12 py-24 lg:py-36">
      <div className="max-w-[88rem] mx-auto">
        <p className="text-[#1B3A4B]/60 text-sm mb-3">Who It's For</p>
        <h2 className="text-[#1B3A4B] text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-[1.05] max-w-3xl lg:max-w-5xl mb-12 lg:mb-20" style={{ letterSpacing: "-0.04em" }}>
          Built for the people doing the worrying, and the people they worry about.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          <div className="rounded-2xl border border-[#1B3A4B]/15 p-8 md:p-10 min-h-64 flex flex-col justify-between bg-[#F4EFE6]">
            <p className="text-[#1B3A4B]/50 text-sm font-medium tracking-wider uppercase">For families</p>
            <div>
              <h3 className="text-[#1B3A4B] text-3xl md:text-4xl font-medium mb-4 leading-tight" style={{ letterSpacing: "-0.03em" }}>
                Peace of mind, without surveillance.
              </h3>
              <p className="text-[#1B3A4B]/70 text-base md:text-lg leading-relaxed">
                No cameras in your parents' home. No asking them to hand over their phone. Just a quiet alert if something is wrong.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-[#1B3A4B]/15 p-8 md:p-10 min-h-64 flex flex-col justify-between bg-[#F4EFE6]">
            <p className="text-[#1B3A4B]/50 text-sm font-medium tracking-wider uppercase">For older adults</p>
            <div>
              <h3 className="text-[#1B3A4B] text-3xl md:text-4xl font-medium mb-4 leading-tight" style={{ letterSpacing: "-0.03em" }}>
                Protection that respects you.
              </h3>
              <p className="text-[#1B3A4B]/70 text-base md:text-lg leading-relaxed">
                The ring stays on your finger. The decision stays yours. We just give you back the second you need to make it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- THE DEVICE ---------- */
const deviceFeatures = [
  { title: "Titanium Shell", body: "Aerospace-grade, hypoallergenic, 4g." },
  { title: "On-device AI", body: "Edge inference. Zero cloud dependency." },
  { title: "Haptic Engine", body: "Silent alerts only the wearer feels." },
  { title: "Skin Contact Sensors", body: "Continuous physiological readout." },
];
const deviceStats = [
  { value: "7", unit: "DAY", label: "Battery" },
  { value: "4", unit: "g", label: "Weight" },
  { value: "100", unit: "m", label: "Water resistance" },
];

function DeviceSection() {
  return (
    <section id="device" className="bg-[#F4EFE6] px-6 lg:px-12 py-24 lg:py-36 border-t border-[#1B3A4B]/10">
      <div className="max-w-[88rem] mx-auto">
        <p className="text-[#1B3A4B]/60 text-sm mb-3">The Device</p>
        <h2 className="text-[#1B3A4B] text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-none mb-12 lg:mb-20" style={{ letterSpacing: "-0.04em" }}>
          The Device
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 items-start">
          <div className="rounded-2xl overflow-hidden bg-[#1B3A4B] min-h-[520px] lg:min-h-[640px] relative">
            <img src={ringDevice} alt="Veris ring" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            {deviceFeatures.map((f) => (
              <div key={f.title} className="rounded-2xl bg-[#1B3A4B] p-6 min-h-40 flex flex-col justify-between">
                <h3 className="text-[#F4EFE6] text-lg font-medium" style={{ letterSpacing: "-0.02em" }}>{f.title}</h3>
                <p className="text-[#F4EFE6]/60 text-sm">{f.body}</p>
              </div>
            ))}
            {deviceStats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-[#1B3A4B] p-6 min-h-40 flex flex-col justify-between">
                <p className="text-[#F4EFE6] text-4xl font-medium" style={{ letterSpacing: "-0.03em" }}>
                  {s.value}<span className="text-[#F4EFE6]/70 text-xl ml-1">{s.unit}</span>
                </p>
                <p className="text-[#F4EFE6]/60 text-sm uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- SCIENCE & TRUST ---------- */
function ScienceSection() {
  const cols = [
    {
      eyebrow: "Built on peer-reviewed signals",
      body: "Heart-rate variability and voice-stress markers are among the most studied indicators of acute psychological pressure. Veris fuses both, in real time, on your finger.",
    },
    {
      eyebrow: "Privacy by architecture",
      body: "On-device inference. No cloud transcripts. No audio ever leaves the ring. Even we can't hear what your parents say.",
    },
    {
      eyebrow: "In pilot with",
      body: "AARP Labs early-access cohort. MIT Media Lab affiliated researchers. A clinical advisory board of geriatricians and behavioral economists.",
    },
  ];
  return (
    <section id="science" className="bg-[#F4EFE6] px-6 lg:px-12 py-24 lg:py-36 border-t border-[#1B3A4B]/10">
      <div className="max-w-[88rem] mx-auto">
        <p className="text-[#1B3A4B]/60 text-sm mb-3">Science & Trust</p>
        <h2 className="text-[#1B3A4B] text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-[1.05] max-w-3xl lg:max-w-5xl mb-16 lg:mb-24" style={{ letterSpacing: "-0.04em" }}>
          A moonshot, built like medicine.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-16">
          {cols.map((c) => (
            <div key={c.eyebrow}>
              <p className="text-[#1B3A4B] text-lg lg:text-xl font-medium mb-3" style={{ letterSpacing: "-0.02em" }}>{c.eyebrow}</p>
              <p className="text-[#1B3A4B]/70 text-base lg:text-lg leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- MANIFESTO BAND ---------- */
function ManifestoBand() {
  return (
    <section id="manifesto" className="bg-[#1B3A4B] px-6 lg:px-12 py-28 md:py-36 lg:py-48">
      <div className="max-w-5xl lg:max-w-7xl mx-auto">
        <p className="text-[#F4EFE6]/40 text-xs font-medium tracking-[0.18em] uppercase mb-6">Manifesto</p>
        <p className="text-[#F4EFE6] text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-[1.15]" style={{ letterSpacing: "-0.03em" }}>
          Fraud is no longer a financial problem. It's a cognitive one. We built Veris for the second before the decision, because that's the only second that matters.
        </p>
      </div>
    </section>
  );
}

/* ---------- CTA / EARLY ACCESS ---------- */
function CTASection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<null | "new" | "duplicate">(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    if (!name.trim() || !email.trim()) {
      toast.error("Please add your name and email.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await submitEarlyAccess({ data: { name: name.trim(), email: email.trim(), team: "" } });
      setDone(res.duplicate ? "duplicate" : "new");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="early-access" className="bg-[#F4EFE6] px-6 lg:px-12 py-24 lg:py-36">
      <div className="max-w-[88rem] mx-auto">
        <div className="rounded-2xl bg-[#1B3A4B] px-6 md:px-16 lg:px-24 py-16 md:py-24 lg:py-32">
          <p className="text-[#F4EFE6]/50 text-xs font-medium tracking-[0.18em] uppercase mb-6">Private Beta</p>
          <h2 className="text-[#F4EFE6] text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.05] max-w-3xl lg:max-w-5xl mb-6 lg:mb-8" style={{ letterSpacing: "-0.04em" }}>
            Be early. Be the reason it doesn't happen to them.
          </h2>
          <p className="text-[#F4EFE6]/70 text-base md:text-lg lg:text-xl max-w-xl lg:max-w-2xl mb-10 lg:mb-14 leading-relaxed">
            We're shipping the first cohort of rings to 127 families across 9 states. Request access, we read every email.
          </p>

          {done ? (
            <div className="rounded-xl border border-[#F4EFE6]/20 bg-[#F4EFE6]/5 p-6 max-w-xl">
              <p className="text-[#F4EFE6] text-lg font-medium mb-1">
                {done === "duplicate" ? "You're already on the list." : "You're in."}
              </p>
              <p className="text-[#F4EFE6]/60 text-sm">
                We'll be in touch as soon as the next cohort opens.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl">
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 bg-[#F4EFE6]/10 border border-[#F4EFE6]/20 text-[#F4EFE6] placeholder:text-[#F4EFE6]/40 rounded-full px-5 py-3 outline-none focus:border-[#F4EFE6]/50 transition-colors"
              />
              <input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-[#F4EFE6]/10 border border-[#F4EFE6]/20 text-[#F4EFE6] placeholder:text-[#F4EFE6]/40 rounded-full px-5 py-3 outline-none focus:border-[#F4EFE6]/50 transition-colors"
              />
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 bg-[#F4EFE6] text-[#1B3A4B] font-medium px-6 py-3 rounded-full hover:bg-white transition-colors disabled:opacity-60"
              >
                {submitting ? "Sending…" : "Request access"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* About moved to /about */
function Footer() {
  const links = ["Mission", "Manifesto", "Privacy", "Contact"];
  return (
    <footer className="bg-[#F4EFE6] px-6 py-12 border-t border-[#1B3A4B]/10">
      <div className="max-w-[88rem] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-3 text-[#1B3A4B]">
          <LogoIcon className="w-6 h-6" />
          <span className="text-xl font-medium tracking-tight">Veris</span>
          <span className="hidden md:inline text-[#1B3A4B]/40 text-sm ml-3">In private beta, by invitation, with care.</span>
        </div>
        <div className="flex items-center gap-6 text-[#1B3A4B]/60 text-sm">
          {links.map((l) => (
            <a key={l} href="#" className="hover:text-[#1B3A4B] transition-colors">{l}</a>
          ))}
          <span className="text-[#1B3A4B]/40">© 2026</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- PAGE ---------- */
function VerisLanding() {
  return (
    <div className="flex flex-col bg-[#F4EFE6]">
      <div className="h-screen flex flex-col overflow-hidden relative">
        <Navbar />
        <HeroSection />
      </div>
      <ProblemSection />
      <HowItWorksSection />
      <AudienceSection />
      <DeviceSection />
      <ScienceSection />
      <ManifestoBand />
      
      
      <Footer />
    </div>
  );
}
