import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import ringDevice from "@/assets/ring-device-studio.png";
import { submitEarlyAccess } from "@/lib/early-access.functions";
import { animate, createTimeline, stagger, onInView, rafThrottle, reducedMotion } from "@/lib/anime";
import { revealAll } from "@/lib/reveal";
import { SplitText } from "@/components/landing/SplitText";
import { Magnetic } from "@/components/landing/MagneticButton";
import { ScamCallDemo } from "@/components/landing/ScamCallDemo";
import { HeroAmbient } from "@/components/landing/HeroAmbient";
import { CountUp } from "@/components/landing/CountUp";
import { LiveSignalStrip } from "@/components/landing/LiveSignalStrip";
import { StorySection } from "@/components/landing/StorySection";
import { UseCasesSection } from "@/components/landing/UseCasesSection";
import { PrototypeSection } from "@/components/landing/PrototypeSection";
import { BusinessModelSection } from "@/components/landing/BusinessModelSection";
import { WhoItsForSection } from "@/components/landing/WhoItsForSection";

export const Route = createFileRoute("/")({
  component: VerisLanding,
  head: () => {
    const title = "Veris — Every fraud tool reacts. Veris intervenes.";
    const description =
      "Veris is a wearable cognitive defense system. Biosignals, voice, and on-device AI fused in a ring, to interrupt manipulation the second it happens, before money is ever lost.";
    const image = ringDevice;
    const url = "https://verisss.lovable.app/";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image },
      ],
    };
  },
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
    { label: "Story", href: "#story" },
    { label: "The Device", href: "#device" },
    { label: "Pricing", href: "#pricing" },
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
  const heroRef = useRef<HTMLDivElement>(null);
  return (
    <section className="flex-1 px-4 md:px-6 pt-20 pb-6 flex items-end">
      <div
        ref={heroRef}
        className="relative w-full rounded-2xl overflow-hidden max-w-[88rem] mx-auto min-h-[640px] lg:min-h-[720px]"
      >
        <video autoPlay muted loop playsInline className="object-cover absolute inset-0 w-full h-full" style={{ filter: "grayscale(1) contrast(1.05) brightness(1.02)" }}>
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_161253_c72b1869-400f-45ed-ac0c-52f68c2ed5bd.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(244,239,230,0.55) 0%, rgba(244,239,230,0.35) 50%, rgba(244,239,230,0.65) 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: "#1B3A4B", mixBlendMode: "soft-light", opacity: 0.5 }} />
        <HeroAmbient containerRef={heroRef} />
        <div className="relative z-10 flex flex-col items-start justify-start h-full p-6 pt-12 md:p-10 md:pt-16 lg:p-14 lg:pt-20 xl:p-20 xl:pt-28">
          <p data-parallax="0.3" className="hero-eyebrow reveal-eyebrow in text-[#1B3A4B]/80 mb-5 lg:mb-7">
            Private Beta · The Cognitive Defense Layer
          </p>
          <h1
            data-parallax="0.5"
            className="text-[#1B3A4B] font-medium max-w-xl lg:max-w-3xl xl:max-w-5xl mb-5 lg:mb-7 hero-head"
            style={{ letterSpacing: "-0.05em", lineHeight: 0.95, fontSize: "clamp(2.75rem, 8.5vw, 8.5rem)" }}
          >
            <SplitText by="word">Every fraud tool reacts.</SplitText>
            <br />
            <SplitText by="word">Veris intervenes.</SplitText>
          </h1>
          <p data-parallax="0.7" className="text-[#1B3A4B] text-base md:text-lg lg:text-xl max-w-lg lg:max-w-2xl mb-6 lg:mb-8 leading-relaxed font-medium hero-copy">
            Biosignals, voice, and on-device AI, fused in a ring, to interrupt manipulation the second it happens. So your parents get a moment to think, before the transfer, before the regret.
          </p>
          <div data-parallax="0.9" className="hero-cta">
            <Magnetic>
              <a href="#early-access" className="inline-flex items-center gap-3 bg-[#1B3A4B] text-[#F4EFE6] text-base md:text-lg lg:text-xl font-medium pl-8 lg:pl-10 pr-2 py-2 lg:py-2.5 rounded-full hover:bg-[#14303f] transition-colors duration-200">
                Join the beta
                <span className="bg-[#F4EFE6] rounded-full p-2">
                  <ArrowRight className="w-5 h-5 text-[#1B3A4B]" />
                </span>
              </a>
            </Magnetic>
          </div>
          <div className="mt-5 hero-counter flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
            <p className="text-[#1B3A4B]/60 text-sm font-medium">
              <CountUp to={127} className="text-[#C9A46A] font-semibold tnum" /> families in the first cohort
            </p>
            <span className="hidden sm:inline text-[#1B3A4B]/25">·</span>
            <LiveSignalStrip />
          </div>
          <p className="mt-10 text-[#1B3A4B]/40 text-[11px] font-medium tracking-[0.18em] uppercase">
            Inspired by research from
          </p>
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
        <p className="text-[#1B3A4B]/60 text-sm mb-3 reveal-eyebrow">The Problem</p>
        <h2 className="text-[#1B3A4B] text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.05] max-w-4xl lg:max-w-6xl mb-16 lg:mb-24 reveal-head" style={{ letterSpacing: "-0.04em" }}>
          <SplitText by="word">Every fraud system in the world reacts after the money is gone.</SplitText>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          <p className="text-[#1B3A4B]/80 text-xl md:text-2xl leading-relaxed font-medium reveal-up">
            Banks freeze the transfer after it clears. Apps flag the call after it ends. Family finds out after the regret. By then the damage is done, financially, and to the trust an older person has in their own judgment.
          </p>
          <div className="flex flex-col divide-y divide-[#1B3A4B]/15">
            {stats.map((s) => (
              <div key={s.value} className="py-5 first:pt-0 reveal-up">
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
        <p className="text-[#F4EFE6]/50 text-sm mb-3 reveal-eyebrow">How It Works</p>
        <h2 className="text-[#F4EFE6] text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.05] max-w-4xl lg:max-w-6xl mb-16 lg:mb-24 reveal-head" style={{ letterSpacing: "-0.04em" }}>
          <SplitText by="word">Four signals. One second. Before the decision.</SplitText>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#F4EFE6]/10 rounded-2xl overflow-hidden">
          {steps.map((s) => (
            <div key={s.n} className="bg-[#1B3A4B] p-7 md:p-8 lg:p-10 min-h-56 lg:min-h-72 flex flex-col justify-between step-card reveal-up">
              <p className="text-[#F4EFE6]/40 text-sm font-medium tracking-wider">{s.n}</p>
              <div>
                <h3 className="text-[#F4EFE6] text-2xl lg:text-3xl font-medium mb-3" style={{ letterSpacing: "-0.02em" }}>{s.title}</h3>
                <p className="text-[#F4EFE6]/60 text-base lg:text-lg leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[#F4EFE6]/60 italic text-base md:text-lg mt-10 max-w-2xl reveal-up">
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
        <p className="text-[#1B3A4B]/60 text-sm mb-3 reveal-eyebrow">Who It's For</p>
        <h2 className="text-[#1B3A4B] text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-[1.05] max-w-3xl lg:max-w-5xl mb-12 lg:mb-20 reveal-head" style={{ letterSpacing: "-0.04em" }}>
          <SplitText by="word">Built for the people doing the worrying, and the people they worry about.</SplitText>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          <div className="rounded-2xl border border-[#1B3A4B]/15 p-8 md:p-10 min-h-64 flex flex-col justify-between bg-[#F4EFE6] reveal-up">
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
          <div className="rounded-2xl border border-[#1B3A4B]/15 p-8 md:p-10 min-h-64 flex flex-col justify-between bg-[#F4EFE6] reveal-up">
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
        <p className="text-[#1B3A4B]/60 text-sm mb-3 reveal-eyebrow">The Device</p>
        <h2 className="text-[#1B3A4B] text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-none mb-12 lg:mb-20 reveal-head" style={{ letterSpacing: "-0.04em" }}>
          <SplitText by="word">The Device</SplitText>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 items-start">
          <div className="device-stage rounded-2xl overflow-hidden bg-[#1B3A4B] min-h-[520px] lg:min-h-[640px] relative device-image-wrap">
            <img src={ringDevice} alt="Veris ring" className="absolute inset-0 w-full h-full object-cover device-image" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            {deviceFeatures.map((f) => (
              <div key={f.title} className="rounded-2xl bg-[#1B3A4B] p-6 min-h-40 flex flex-col justify-between reveal-up">
                <h3 className="text-[#F4EFE6] text-lg font-medium" style={{ letterSpacing: "-0.02em" }}>{f.title}</h3>
                <p className="text-[#F4EFE6]/60 text-sm">{f.body}</p>
              </div>
            ))}
            {deviceStats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-[#1B3A4B] p-6 min-h-40 flex flex-col justify-between reveal-up">
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
        <p className="text-[#1B3A4B]/60 text-sm mb-3 reveal-eyebrow">Science & Trust</p>
        <h2 className="text-[#1B3A4B] text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-[1.05] max-w-3xl lg:max-w-5xl mb-16 lg:mb-24 reveal-head" style={{ letterSpacing: "-0.04em" }}>
          <SplitText by="word">A moonshot, built like medicine.</SplitText>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-16">
          {cols.map((c) => (
            <div key={c.eyebrow} className="reveal-up">
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
        <p className="text-[#F4EFE6]/40 text-xs font-medium tracking-[0.18em] uppercase mb-6 reveal-eyebrow">Manifesto</p>
        <p className="text-[#F4EFE6] text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-[1.15] reveal-head" style={{ letterSpacing: "-0.03em" }}>
          <SplitText by="word">Fraud is no longer a financial problem. It's a cognitive one. We built Veris for the second before the decision, because that's the only second that matters.</SplitText>
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
        <div className="rounded-2xl bg-[#1B3A4B] px-6 md:px-16 lg:px-24 py-16 md:py-24 lg:py-32 cta-card">
          <p className="text-[#F4EFE6]/50 text-xs font-medium tracking-[0.18em] uppercase mb-6 reveal-eyebrow">Private Beta</p>
          <h2 className="text-[#F4EFE6] text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.05] max-w-3xl lg:max-w-5xl mb-6 lg:mb-8 reveal-head" style={{ letterSpacing: "-0.04em" }}>
            <SplitText by="word">Be early. Be the reason it doesn't happen to them.</SplitText>
          </h2>
          <p className="text-[#F4EFE6]/70 text-base md:text-lg lg:text-xl max-w-xl lg:max-w-2xl mb-10 lg:mb-14 leading-relaxed reveal-up">
            We're shipping the first cohort of rings to 127 families across 9 states. Request access, we read every email.
          </p>

          {done ? (
            <div className="rounded-xl border border-[#F4EFE6]/20 bg-[#F4EFE6]/5 p-6 max-w-xl animate-[fade-in_0.5s_ease-out]">
              <p className="text-[#F4EFE6] text-lg font-medium mb-1">
                {done === "duplicate" ? "You're already on the list." : "You're in."}
              </p>
              <p className="text-[#F4EFE6]/60 text-sm">
                We'll be in touch as soon as the next cohort opens.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl reveal-up">
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
              <Magnetic>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 bg-[#F4EFE6] text-[#1B3A4B] font-medium px-6 py-3 rounded-full hover:bg-white transition-colors disabled:opacity-60"
                >
                  {submitting ? "Sending…" : "Request access"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Magnetic>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* About moved to /about */
function Footer() {
  return (
    <footer className="relative bg-[#F4EFE6] px-6 pt-16 pb-6 border-t border-[#1B3A4B]/10 overflow-hidden">
      <div className="max-w-[88rem] mx-auto">
        <p className="text-center text-[#1B3A4B]/70 text-xl md:text-2xl lg:text-3xl font-medium italic max-w-3xl mx-auto leading-snug mb-12" style={{ letterSpacing: "-0.02em" }}>
          One second is all it takes.
        </p>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
          <div className="flex items-center gap-3 text-[#1B3A4B]">
            <LogoIcon className="w-6 h-6" />
            <span className="text-xl font-medium tracking-tight">Veris</span>
            <span className="hidden md:inline text-[#1B3A4B]/40 text-sm ml-3">In private beta, by invitation, with care.</span>
          </div>
          <div className="flex items-center gap-6 text-[#1B3A4B]/60 text-sm">
            <Link to="/about" className="hover:text-[#1B3A4B] transition-colors">Mission</Link>
            <a href="#manifesto" className="hover:text-[#1B3A4B] transition-colors">Manifesto</a>
            <a href="#early-access" className="hover:text-[#1B3A4B] transition-colors">Contact</a>
            <span className="text-[#1B3A4B]/40">© 2026</span>
          </div>
        </div>
        <div className="footer-wordmark mt-8 -mb-[6vw] text-center" aria-hidden>Veris</div>
      </div>
    </footer>
  );
}

/* ---------- PAGE ---------- */
function VerisLanding() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cleanupReveal = revealAll(root);
    const cleanups: Array<() => void> = [cleanupReveal];

    if (reducedMotion()) return () => cleanups.forEach((c) => c());

    // 1. Hero intro on mount.
    const heroEyebrow = root.querySelector<HTMLElement>(".hero-eyebrow");
    const heroHeadWords = root.querySelectorAll<HTMLElement>(".hero-head .anim-word");
    const heroCopy = root.querySelector<HTMLElement>(".hero-copy");
    const heroCta = root.querySelector<HTMLElement>(".hero-cta");
    const heroCounter = root.querySelector<HTMLElement>(".hero-counter");
    const marquee = root.querySelector<HTMLElement>(".marquee-track");

    const hide = (el: HTMLElement | null, transform: string) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = transform;
    };
    hide(heroEyebrow, "translateX(-16px)");
    heroHeadWords.forEach((w) => hide(w, "translateY(115%)"));
    hide(heroCopy, "translateY(28px)");
    hide(heroCta, "translateY(24px) scale(0.95)");
    hide(heroCounter, "translateY(16px)");
    if (marquee) marquee.style.opacity = "0";

    const intro = createTimeline({ defaults: { ease: "outExpo" } });
    if (heroEyebrow)
      intro.add(heroEyebrow, { opacity: [0, 1], translateX: [-16, 0], duration: 900 }, 950);
    if (heroHeadWords.length)
      intro.add(
        heroHeadWords,
        { opacity: [0, 1], translateY: ["115%", "0%"], duration: 1200, delay: stagger(70) },
        1300,
      );
    if (heroCopy)
      intro.add(heroCopy, { opacity: [0, 1], translateY: [28, 0], duration: 900 }, 1700);
    if (heroCta)
      intro.add(
        heroCta,
        { opacity: [0, 1], translateY: [24, 0], scale: [0.95, 1], duration: 850, ease: "outBack(1.6)" },
        2050,
      );
    if (heroCounter)
      intro.add(heroCounter, { opacity: [0, 1], translateY: [16, 0], duration: 700 }, 2300);
    if (marquee) intro.add(marquee, { opacity: [0, 1], duration: 800 }, 2500);

    // 2. CTA continuous float.
    if (heroCta) {
      const float = animate(heroCta, {
        translateY: [0, -5],
        duration: 2600,
        ease: "inOutSine",
        loop: true,
        alternate: true,
        delay: 3400,
      });
      cleanups.push(() => float.pause());
    }

    // 3. Hero parallax via cursor.
    const heroSection = root.querySelector<HTMLElement>("section");
    const parallaxEls = Array.from(root.querySelectorAll<HTMLElement>("[data-parallax]"));
    if (heroSection && parallaxEls.length) {
      const onMove = rafThrottle((e: PointerEvent) => {
        const r = heroSection.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width - 0.5;
        const cy = (e.clientY - r.top) / r.height - 0.5;
        parallaxEls.forEach((el) => {
          const depth = parseFloat(el.dataset.parallax || "0.5");
          animate(el, {
            x: cx * depth * -28,
            y: cy * depth * -22,
            duration: 900,
            ease: "outExpo",
          });
        });
      });
      heroSection.addEventListener("pointermove", onMove);
      cleanups.push(() => heroSection.removeEventListener("pointermove", onMove));
    }

    // 4. Device image float.
    const deviceImg = root.querySelector<HTMLElement>(".device-image");
    if (deviceImg) {
      const a = animate(deviceImg, {
        translateY: [0, -14],
        duration: 4000,
        ease: "inOutSine",
        loop: true,
        alternate: true,
      });
      cleanups.push(() => a.pause());
    }

    // 5. Step cards: 3D tilt-in on scroll.
    const stepCards = Array.from(root.querySelectorAll<HTMLElement>(".step-card"));
    if (stepCards.length) {
      stepCards.forEach((c) => {
        c.style.opacity = "0";
        c.style.transform = "translateY(80px) perspective(900px) rotateX(-18deg)";
      });
      cleanups.push(
        onInView(stepCards[0], () => {
          animate(stepCards, {
            opacity: [0, 1],
            translateY: [80, 0],
            rotateX: [-18, 0],
            duration: 1100,
            ease: "outExpo",
            delay: stagger(140),
          });
        }),
      );
    }

    // 6. CTA card scale-in.
    const ctaCard = root.querySelector<HTMLElement>(".cta-card");
    if (ctaCard) {
      ctaCard.style.opacity = "0";
      ctaCard.style.transform = "translateY(80px) scale(0.96)";
      cleanups.push(
        onInView(ctaCard, () => {
          animate(ctaCard, {
            opacity: [0, 1],
            translateY: [80, 0],
            scale: [0.96, 1],
            duration: 1200,
            ease: "outExpo",
          });
        }),
      );
    }

    // 7. Use-case cards: pointer-tilt parallax.
    const usecaseCards = Array.from(root.querySelectorAll<HTMLElement>(".usecase-card"));
    usecaseCards.forEach((card) => {
      const img = card.querySelector<HTMLElement>(".usecase-img");
      const onMove = rafThrottle((e: PointerEvent) => {
        const r = card.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width - 0.5;
        const cy = (e.clientY - r.top) / r.height - 0.5;
        animate(card, {
          rotateY: cx * 6,
          rotateX: -cy * 6,
          duration: 600,
          ease: "outExpo",
        });
        if (img) {
          animate(img, {
            x: cx * -14,
            y: cy * -10,
            duration: 700,
            ease: "outExpo",
          });
        }
      });
      const onLeave = () => {
        animate(card, { rotateX: 0, rotateY: 0, duration: 700, ease: "outExpo" });
        if (img) animate(img, { x: 0, y: 0, duration: 700, ease: "outExpo" });
      };
      card.style.transformStyle = "preserve-3d";
      card.style.perspective = "1000px";
      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerleave", onLeave);
      });
    });

    // 8. Pricing cards: hover lift via JS for consistency.
    const pricingCards = Array.from(root.querySelectorAll<HTMLElement>(".pricing-card"));
    pricingCards.forEach((card) => {
      const onEnter = () => animate(card, { translateY: -8, duration: 500, ease: "outExpo" });
      const onLeave = () => animate(card, { translateY: 0, duration: 500, ease: "outExpo" });
      card.addEventListener("pointerenter", onEnter);
      card.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        card.removeEventListener("pointerenter", onEnter);
        card.removeEventListener("pointerleave", onLeave);
      });
    });

    return () => {
      intro.pause();
      cleanups.forEach((c) => c());
    };
  }, []);

  return (
    <div ref={rootRef} className="flex flex-col bg-[#F4EFE6] page-fade-in">
      <div className="h-screen flex flex-col overflow-hidden relative">
        <Navbar />
        <HeroSection />
      </div>
      <ProblemSection />
      <StorySection />
      <HowItWorksSection />
      <ScamCallDemo />
      <UseCasesSection />
      <PrototypeSection />
      <DeviceSection />
      <BusinessModelSection />
      <WhoItsForSection />
      <ScienceSection />
      <ManifestoBand />
      <CTASection />
      <Footer />
    </div>
  );
}
