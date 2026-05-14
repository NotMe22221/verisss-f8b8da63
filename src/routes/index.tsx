import { createFileRoute, Link } from "@tanstack/react-router";
import { Home, Users, PlayCircle, Wrench, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import ringDevice from "@/assets/ring-device-studio.webp";
import problemFace from "@/assets/problem-face.webp";
import architectureExploded from "@/assets/architecture-exploded.webp";
import handWithRing from "@/assets/hand-with-ring.webp";
import { submitEarlyAccess } from "@/lib/early-access.functions";
import { animate, createTimeline, stagger, onInView, rafThrottle } from "@/lib/anime";
import { revealAll } from "@/lib/reveal";
import { SplitText } from "@/components/landing/SplitText";
import { Magnetic } from "@/components/landing/MagneticButton";

export const Route = createFileRoute("/")({
  component: VerisLanding,
  head: () => {
    const title = "Veris — The cognitive defense ring.";
    const description =
      "A titanium ring that interrupts phone-scam manipulation in the moment — biosignals, voice, and on-device AI giving older adults a second to think.";
    const url = "https://verisss.lovable.app/";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:image", content: ringDevice },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: ringDevice },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Veris",
            url,
            description: "Cognitive defense wearable that interrupts scam manipulation in real time.",
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Veris Ring",
            description:
              "A titanium ring with on-device AI that detects scam-call manipulation through biosignals and voice, then delivers a haptic interruption.",
            brand: { "@type": "Brand", name: "Veris" },
            category: "Wearable Technology",
            url,
          }),
        },
      ],
    };
  },
});

/* ---------- PILL NAV ---------- */
function PillNav() {
  const links = [
    { label: "HOME", icon: Home, href: "#top" },
    { label: "ABOUT", icon: Users, to: "/about" as const },
    { label: "MANIFESTO", icon: PlayCircle, href: "#manifesto" },
    { label: "PROTOTYPE", icon: Wrench, href: "#architecture" },
  ];
  return (
    <nav className="sticky top-0 z-30 px-3 sm:px-6 pt-4 pb-2 bg-[#F4EFE6]/85 backdrop-blur-md">
      <div className="max-w-[88rem] mx-auto flex justify-center">
        <div className="pill-nav flex items-center gap-1 sm:gap-2 rounded-full px-2 sm:px-3 py-2">
          <a href="#top" className="text-[#1B3A4B] font-bold tracking-tight px-3 sm:px-4 text-sm sm:text-base">
            VERIS
          </a>
          <span className="hidden sm:block w-px h-5 bg-[#1B3A4B]/15 mx-1" />
          {links.map((l) => {
            const Icon = l.icon;
            const inner = (
              <>
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                <span className="sr-only sm:not-sr-only">{l.label}</span>
              </>
            );
            const cls =
              "flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-[0.12em] text-[#1B3A4B]/75 hover:text-[#1B3A4B] hover:bg-[#1B3A4B]/5 transition-colors";
            return l.to ? (
              <Link key={l.label} to={l.to} className={cls}>{inner}</Link>
            ) : (
              <a key={l.label} href={l.href} className={cls}>{inner}</a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

/* ---------- 1. HERO VERIS ---------- */
function HeroVeris() {
  return (
    <section id="top" className="px-6 lg:px-12 pt-12 lg:pt-20 pb-24 lg:pb-32">
      <div className="max-w-[88rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-6 relative reveal-image order-1">
          <div className="absolute inset-0 -z-10 ring-glow" aria-hidden />
          <img
            src={ringDevice}
            alt="Veris ring"
            width={1200}
            height={1200}
            className="w-full max-w-[520px] mx-auto object-contain hero-ring"
          />
        </div>
        <div className="lg:col-span-6 order-2">
          <h1
            className="text-[#1B3A4B] font-bold mb-6 hero-head"
            style={{ letterSpacing: "-0.05em", lineHeight: 0.9, fontSize: "clamp(4rem, 12vw, 10rem)" }}
          >
            <SplitText by="word">VERIS</SplitText>
          </h1>
          <p className="text-[#1B3A4B]/80 text-lg lg:text-xl leading-relaxed font-medium max-w-lg reveal-up">
            A ring that interrupts manipulation the second it happens. Biosignals, voice, and on-device AI fused into a single piece of titanium worn on the finger. So the people you love get one moment to think, before the regret.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- 2. PROBLEM ---------- */
function ProblemSection() {
  return (
    <section className="px-6 lg:px-12 py-24 lg:py-32">
      <div className="max-w-[88rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-5 reveal-image">
          <img
            src={problemFace}
            alt="Worried face"
            loading="lazy"
            width={800}
            height={800}
            className="w-full max-w-sm mx-auto object-contain"
          />
        </div>
        <div className="lg:col-span-7">
          <h2
            className="text-[#1B3A4B] font-bold mb-6 reveal-head"
            style={{ letterSpacing: "-0.04em", lineHeight: 0.95, fontSize: "clamp(3rem, 8vw, 6rem)" }}
          >
            <SplitText by="word">PROBLEM</SplitText>
          </h2>
          <p className="text-[#1B3A4B]/80 text-lg lg:text-xl leading-relaxed font-medium max-w-xl reveal-up">
            Every fraud system in the world reacts after the money is gone. Banks freeze the wire after it clears. Apps flag the call after it ends. Family finds out after the regret. By then the damage is done — financially, and to the trust an older person has in their own judgment.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- 3. DATA ---------- */
function DataSection() {
  const stats = [
    { value: "$3.4B", label: "lost annually to elder fraud" },
    { value: "1 in 6", label: "adults 65+ targeted every year" },
    { value: "19 min", label: "average time to clear a wire" },
  ];
  return (
    <section className="px-6 lg:px-12 py-24 lg:py-32">
      <div className="max-w-[88rem] mx-auto text-center">
        <h2
          className="text-[#1B3A4B] font-bold mb-16 lg:mb-20 reveal-head section-title"
          style={{ letterSpacing: "-0.04em", lineHeight: 1, fontSize: "clamp(3rem, 8vw, 6rem)" }}
        >
          <SplitText by="word">DATA</SplitText>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto mb-12 lg:mb-16">
          {stats.map((s) => (
            <div key={s.value} className="flex flex-col items-center reveal-up">
              <div className="stat-medallion">
                <span className="text-[#1B3A4B] font-bold text-2xl lg:text-3xl tnum" style={{ letterSpacing: "-0.03em" }}>
                  {s.value}
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[#1B3A4B]/70 text-base lg:text-lg leading-relaxed max-w-3xl mx-auto reveal-up">
          The numbers describe a quiet epidemic. Phone scams, romance scams, government-impersonation calls — all targeting the cohort with the most savings and the least time to recover them. Existing tools intervene at the bank, at the app, at the carrier. Veris intervenes at the wearer.
        </p>
        <p className="text-[#1B3A4B]/40 text-[11px] tracking-[0.2em] uppercase mt-6 reveal-up">
          Sources · FTC · FBI IC3 · AARP
        </p>
      </div>
    </section>
  );
}

/* ---------- 4. FEATURE BLOCK A ---------- */
function FeatureBlockA() {
  return (
    <section className="px-6 lg:px-12 py-24 lg:py-32">
      <div className="max-w-[88rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-7 order-2 lg:order-1">
          <h2
            className="text-[#1B3A4B] font-bold mb-6 reveal-head"
            style={{ letterSpacing: "-0.04em", lineHeight: 0.95, fontSize: "clamp(2.5rem, 6.5vw, 5rem)" }}
          >
            <SplitText by="word">INTERVENE</SplitText>
          </h2>
          <p className="text-[#1B3A4B]/80 text-lg lg:text-xl leading-relaxed font-medium max-w-xl mb-4 reveal-up">
            The ring continuously reads heart-rate variability, skin conductance, and micro-stress signatures. On-device AI listens for scripted scam patterns, urgency, impersonation cues, emotional coercion.
          </p>
          <p className="text-[#1B3A4B]/70 text-base lg:text-lg leading-relaxed max-w-xl reveal-up">
            When pressure is detected, a quiet haptic pulse breaks the spell. A single moment to think. If the call continues, a trusted family contact gets a discreet notification — never a recording, never a transcript.
          </p>
        </div>
        <div className="lg:col-span-5 relative order-1 lg:order-2 reveal-image">
          <div className="absolute inset-0 -z-10 ring-glow" aria-hidden />
          <img
            src={ringDevice}
            alt="Veris ring"
            loading="lazy"
            width={1200}
            height={1200}
            className="w-full max-w-[420px] mx-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- 5. ARCHITECTURE ---------- */
function ArchitectureSection() {
  const pieces = ["Shell", "Sensor", "SoC", "Antenna", "Coil", "Battery", "Band"];
  return (
    <section id="architecture" className="px-6 lg:px-12 py-24 lg:py-32">
      <div className="max-w-[88rem] mx-auto text-center">
        <h2
          className="text-[#1B3A4B] font-bold reveal-head section-title"
          style={{ letterSpacing: "-0.04em", lineHeight: 1, fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
        >
          <SplitText by="word">THE ARCHITECTURE</SplitText>
        </h2>
        <p className="text-[#1B3A4B]/50 text-xs italic mt-2 mb-12 lg:mb-16 reveal-up">*Out of scale</p>
        <div className="relative max-w-6xl mx-auto reveal-image">
          <img
            src={architectureExploded}
            alt="Exploded view of the Veris ring components"
            loading="lazy"
            width={1600}
            height={800}
            className="w-full object-contain"
          />
          <div className="hidden md:flex absolute inset-x-0 -top-4 justify-around px-12">
            {pieces.slice(0, 4).map((p, i) => (
              <span key={p} className="piece-label" style={{ animationDelay: `${i * 80}ms` }}>{p}</span>
            ))}
          </div>
          <div className="hidden md:flex absolute inset-x-0 -bottom-4 justify-around px-20">
            {pieces.slice(4).map((p, i) => (
              <span key={p} className="piece-label" style={{ animationDelay: `${i * 80 + 320}ms` }}>{p}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 6. FEATURE BLOCK B (HAND) ---------- */
function HandSection() {
  return (
    <section className="px-6 lg:px-12 py-24 lg:py-32">
      <div className="max-w-[88rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-5 reveal-image">
          <img
            src={handWithRing}
            alt="A hand wearing the Veris ring"
            loading="lazy"
            width={1200}
            height={1200}
            className="w-full max-w-md mx-auto object-contain"
          />
        </div>
        <div className="lg:col-span-7">
          <h2
            className="text-[#1B3A4B] font-bold mb-6 reveal-head"
            style={{ letterSpacing: "-0.04em", lineHeight: 0.95, fontSize: "clamp(2.5rem, 6.5vw, 5rem)" }}
          >
            <SplitText by="word">EVERYDAY</SplitText>
          </h2>
          <p className="text-[#1B3A4B]/80 text-lg lg:text-xl leading-relaxed font-medium max-w-xl mb-4 reveal-up">
            4 grams of aerospace-grade titanium. Hypoallergenic. Water resistant to 100m. Seven-day battery on a single charge. Designed to disappear into the rest of a life — no screen, no notification, no constant reminder that something might go wrong.
          </p>
          <p className="text-[#1B3A4B]/70 text-base lg:text-lg leading-relaxed max-w-xl reveal-up">
            The ring stays on the finger. The decision stays with the wearer. Veris just gives back the second they need to make it.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- 7. TEAM ---------- */
function TeamSection() {
  const team = [
    { name: "Founder One", role: "CEO · Product", contact: "@founder1" },
    { name: "Founder Two", role: "CTO · Hardware", contact: "@founder2" },
    { name: "Founder Three", role: "AI · ML", contact: "@founder3" },
    { name: "Founder Four", role: "Design", contact: "@founder4" },
    { name: "Founder Five", role: "Clinical", contact: "@founder5" },
  ];
  return (
    <section className="px-6 lg:px-12 py-24 lg:py-32">
      <div className="max-w-[88rem] mx-auto text-center">
        <h2
          className="text-[#1B3A4B] font-bold mb-14 lg:mb-20 reveal-head section-title"
          style={{ letterSpacing: "-0.04em", lineHeight: 1, fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
        >
          <SplitText by="word">THE TEAM</SplitText>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 max-w-6xl mx-auto">
          {team.map((m) => (
            <article key={m.name} className="team-card reveal-up">
              <div className="team-avatar" aria-hidden />
              <div className="px-3 pb-4 pt-3">
                <p className="text-[#1B3A4B] text-sm font-bold">{m.name}</p>
                <p className="text-[#1B3A4B]/60 text-xs mt-0.5">{m.role}</p>
                <p className="text-[#1B3A4B]/40 text-[10px] mt-1 tracking-wider">{m.contact}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 8. MANIFESTO BAND ---------- */
function ManifestoBand() {
  return (
    <section id="manifesto" className="px-6 lg:px-12 py-24 lg:py-32">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-[#1B3A4B]/50 text-xs font-semibold tracking-[0.2em] uppercase mb-6 reveal-eyebrow">Manifesto</p>
        <p className="text-[#1B3A4B] text-2xl md:text-4xl lg:text-5xl font-medium leading-snug reveal-head" style={{ letterSpacing: "-0.03em" }}>
          <SplitText by="word">Fraud is no longer a financial problem. It's a cognitive one. Veris exists for the second before the decision — because that's the only second that matters.</SplitText>
        </p>
      </div>
    </section>
  );
}

/* ---------- 9. EARLY ACCESS ---------- */
function EarlyAccess() {
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
    <section id="early-access" className="px-6 lg:px-12 pb-12">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-[#1B3A4B]/50 text-xs font-semibold tracking-[0.2em] uppercase mb-4 reveal-eyebrow">Private Beta</p>
        <h3 className="text-[#1B3A4B] text-3xl md:text-4xl font-medium mb-8 reveal-head" style={{ letterSpacing: "-0.03em" }}>
          <SplitText by="word">Be early. Be the reason it doesn't happen to them.</SplitText>
        </h3>
        {done ? (
          <div className="inline-block rounded-2xl border border-[#1B3A4B]/15 bg-[#1B3A4B]/[0.03] p-6">
            <p className="text-[#1B3A4B] text-base font-medium">
              {done === "duplicate" ? "You're already on the list." : "You're in. We'll be in touch."}
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto reveal-up">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 bg-[#1B3A4B]/5 border border-[#1B3A4B]/15 text-[#1B3A4B] placeholder:text-[#1B3A4B]/40 rounded-full px-5 py-3 outline-none focus:border-[#1B3A4B]/40 transition-colors"
            />
            <input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-[#1B3A4B]/5 border border-[#1B3A4B]/15 text-[#1B3A4B] placeholder:text-[#1B3A4B]/40 rounded-full px-5 py-3 outline-none focus:border-[#1B3A4B]/40 transition-colors"
            />
            <Magnetic>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 bg-[#1B3A4B] text-[#F4EFE6] font-medium px-6 py-3 rounded-full hover:bg-[#14303f] transition-colors disabled:opacity-60"
              >
                {submitting ? "Sending…" : "Request access"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </Magnetic>
          </form>
        )}
      </div>
    </section>
  );
}

/* ---------- 10. FOOTER WORDMARK ---------- */
function FooterWordmark() {
  return (
    <footer className="px-6 lg:px-12 pb-10">
      <div className="max-w-[88rem] mx-auto">
        <div className="footer-card rounded-3xl px-6 lg:px-12 py-16 lg:py-24 flex flex-col items-center text-center">
          <h2 className="footer-veris" aria-label="Veris">VERIS</h2>
          <img
            src={ringDevice}
            alt=""
            loading="lazy"
            width={1200}
            height={1200}
            className="w-44 lg:w-56 mx-auto -mt-4 lg:-mt-8 object-contain"
          />
          <p className="text-[#1B3A4B]/50 text-xs mt-6 tracking-wider">©2026, Veris. All rights reserved.</p>
        </div>
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

    // Hero intro
    const heroHeadWords = root.querySelectorAll<HTMLElement>(".hero-head .anim-word");
    const heroRing = root.querySelector<HTMLElement>(".hero-ring");
    heroHeadWords.forEach((w) => {
      w.style.opacity = "0";
      w.style.transform = "translateY(115%)";
    });
    if (heroRing) {
      heroRing.style.opacity = "0";
      heroRing.style.transform = "scale(0.92)";
    }
    const intro = createTimeline({ defaults: { ease: "outExpo" } });
    if (heroRing) {
      intro.add(heroRing, { opacity: [0, 1], scale: [0.92, 1], duration: 1400 }, 200);
    }
    if (heroHeadWords.length) {
      intro.add(
        heroHeadWords,
        { opacity: [0, 1], translateY: ["115%", "0%"], duration: 1100, delay: stagger(80) },
        700,
      );
    }

    // Continuous ring float
    if (heroRing) {
      const f = animate(heroRing, {
        translateY: [0, -10],
        rotate: [-1, 1],
        duration: 5200,
        ease: "inOutSine",
        loop: true,
        alternate: true,
        delay: 2200,
      });
      cleanups.push(() => f.pause());
    }

    // Stat medallions: pop-in
    const medallions = Array.from(root.querySelectorAll<HTMLElement>(".stat-medallion"));
    if (medallions.length) {
      medallions.forEach((m) => {
        m.style.opacity = "0";
        m.style.transform = "scale(0.7)";
      });
      cleanups.push(
        onInView(medallions[0], () => {
          animate(medallions, {
            opacity: [0, 1],
            scale: [0.7, 1],
            duration: 900,
            ease: "outBack(1.7)",
            delay: stagger(140),
          });
        }),
      );
    }

    // Team cards: stagger up
    const teamCards = Array.from(root.querySelectorAll<HTMLElement>(".team-card"));
    if (teamCards.length) {
      teamCards.forEach((c) => {
        c.style.opacity = "0";
        c.style.transform = "translateY(40px)";
      });
      cleanups.push(
        onInView(teamCards[0], () => {
          animate(teamCards, {
            opacity: [0, 1],
            translateY: [40, 0],
            duration: 800,
            ease: "outExpo",
            delay: stagger(90),
          });
        }),
      );
    }

    // Pointer parallax on rings
    const rings = Array.from(root.querySelectorAll<HTMLElement>(".reveal-image img"));
    rings.forEach((img) => {
      const parent = img.parentElement;
      if (!parent) return;
      const onMove = rafThrottle((e: PointerEvent) => {
        const r = parent.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width - 0.5;
        const cy = (e.clientY - r.top) / r.height - 0.5;
        animate(img, { x: cx * -14, y: cy * -10, duration: 800, ease: "outExpo" });
      });
      const onLeave = () => animate(img, { x: 0, y: 0, duration: 800, ease: "outExpo" });
      parent.addEventListener("pointermove", onMove);
      parent.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        parent.removeEventListener("pointermove", onMove);
        parent.removeEventListener("pointerleave", onLeave);
      });
    });

    return () => {
      intro.pause();
      cleanups.forEach((c) => c());
    };
  }, []);

  return (
    <div ref={rootRef} className="bg-[#F4EFE6] text-[#1B3A4B] page-fade-in min-h-screen">
      <PillNav />
      <HeroVeris />
      <ProblemSection />
      <DataSection />
      <FeatureBlockA />
      <ArchitectureSection />
      <HandSection />
      <TeamSection />
      <ManifestoBand />
      <EarlyAccess />
      <FooterWordmark />
    </div>
  );
}
