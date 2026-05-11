import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { animate, createTimeline, stagger, reducedMotion } from "@/lib/anime";
import { revealAll } from "@/lib/reveal";
import { SplitText } from "@/components/landing/SplitText";
import { Magnetic } from "@/components/landing/MagneticButton";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About Veris, Built for the second before the decision" },
      {
        name: "description",
        content:
          "Veris began at a kitchen table after a phone call that cost a family $42,000. Meet the neuroscientists, engineers, and clinicians building the cognitive defense layer.",
      },
      { property: "og:title", content: "About Veris" },
      {
        property: "og:description",
        content:
          "Neuroscientists, engineers, and clinicians building the protection we wished our own families had.",
      },
    ],
  }),
});

function LogoIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" className={className} fill="currentColor" aria-hidden="true">
      <path d="M 128.005 191.173 C 128.448 156.208 156.93 128 192 128 L 192 64 L 128 64 C 128 99.346 99.346 128 64 128 L 64 192 L 128 192 Z M 192 256 L 64 256 C 28.654 256 0 227.346 0 192 L 0 64 L 64 64 L 64 0 L 192 0 C 227.346 0 256 28.654 256 64 L 256 192 L 192 192 Z" />
    </svg>
  );
}

function Navbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-20 px-6 py-5">
      <div className="max-w-[88rem] mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-[#1B3A4B]">
          <LogoIcon className="w-7 h-7" />
          <span className="text-2xl font-medium tracking-tight">Veris</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-base text-[#1B3A4B]/70 hover:text-[#1B3A4B] font-medium transition-colors duration-200">Home</Link>
          <Link to="/about" className="text-base text-[#1B3A4B] font-medium transition-colors duration-200" activeProps={{ className: "text-[#1B3A4B] font-medium" }}>About</Link>
        </div>
      </div>
    </nav>
  );
}

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

function AboutPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  const team = [
    { name: "Aria Chen", role: "CEO & Co-founder", bio: "Former neuroscience researcher at Stanford HAI. Watched her grandmother lose $42,000 to a scam call. Started Veris six months later." },
    { name: "Marcus Okafor", role: "CTO & Co-founder", bio: "Built on-device ML systems at Apple Health. Believes the most powerful AI is the kind that runs entirely on your finger." },
    { name: "Dr. Helena Reyes", role: "Chief Science Officer", bio: "Geriatric neurologist, 15 years at MIT Media Lab. Co-authored the leading research on stress biomarkers in elder cognition." },
  ];
  const values = [
    { title: "Privacy by architecture", body: "Inference runs on the ring. No cloud transcripts, no recordings, no surveillance of the people we protect." },
    { title: "Dignity first", body: "Protection that respects autonomy. The ring stays on the finger. The decision stays with the wearer." },
    { title: "Quiet by default", body: "We build calm technology. A pulse, not an alarm. Intervention that interrupts manipulation, not life." },
  ];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cleanupReveal = revealAll(root);
    if (reducedMotion()) return cleanupReveal;

    const eyebrow = root.querySelector<HTMLElement>(".about-hero-eyebrow");
    const headWords = root.querySelectorAll<HTMLElement>(".about-hero-head .anim-word");

    if (eyebrow) {
      eyebrow.style.opacity = "0";
      eyebrow.style.transform = "translateX(-16px)";
    }
    headWords.forEach((w) => {
      w.style.opacity = "0";
      w.style.transform = "translateY(115%)";
    });

    const tl = createTimeline({ defaults: { ease: "outExpo" } });
    if (eyebrow) tl.add(eyebrow, { opacity: [0, 1], translateX: [-16, 0], duration: 900 }, 950);
    if (headWords.length)
      tl.add(headWords, {
        opacity: [0, 1],
        translateY: ["115%", "0%"],
        duration: 1200,
        delay: stagger(70),
      }, 1300);

    return () => {
      cleanupReveal();
      tl.pause();
    };
  }, []);

  return (
    <div ref={rootRef} className="flex flex-col bg-[#F4EFE6] min-h-screen page-fade-in">
      <div className="relative bg-[#F4EFE6]">
        <Navbar />
        <section className="px-6 lg:px-12 pt-32 lg:pt-40 pb-16 lg:pb-24">
          <div className="max-w-[88rem] mx-auto">
            <p className="text-[#1B3A4B]/60 text-sm mb-4 uppercase tracking-[0.18em] about-hero-eyebrow">About Veris</p>
            <h1 className="text-[#1B3A4B] text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.02] max-w-5xl about-hero-head" style={{ letterSpacing: "-0.04em" }}>
              <SplitText by="word">We started Veris because we had to.</SplitText>
            </h1>
          </div>
        </section>
      </div>

      <section className="px-6 lg:px-12 py-16 lg:py-24 border-t border-[#1B3A4B]/10">
        <div className="max-w-[88rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          <p className="text-[#1B3A4B] text-2xl md:text-3xl leading-snug font-medium reveal-up" style={{ letterSpacing: "-0.02em" }}>
            Veris began at a kitchen table, after a phone call that cost a family $42,000 and a grandmother her trust in her own judgment.
          </p>
          <div className="space-y-5 text-[#1B3A4B]/75 text-base md:text-lg lg:text-xl leading-relaxed">
            <p className="reveal-up">
              We are neuroscientists, engineers, and clinicians building the protection we wished our own families had. Every fraud system in the world reacts after the money is gone. We thought that was the wrong place to stand.
            </p>
            <p className="reveal-up">
              So we built Veris for the second before the decision, because that is the only second that matters. A ring that senses, listens on-device, and interrupts manipulation the moment it is happening.
            </p>
            <p className="reveal-up">
              Backed by AARP Labs, MIT Media Lab affiliates, and a clinical advisory board of geriatricians and behavioral economists. Headquartered in Cambridge, MA. Building quietly, on purpose.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16 lg:py-28 border-t border-[#1B3A4B]/10">
        <div className="max-w-[88rem] mx-auto">
          <p className="text-[#1B3A4B]/60 text-sm mb-3 uppercase tracking-[0.18em] reveal-eyebrow">What we believe</p>
          <h2 className="text-[#1B3A4B] text-3xl md:text-5xl lg:text-6xl font-medium max-w-4xl mb-12 lg:mb-16 reveal-head" style={{ letterSpacing: "-0.03em" }}>
            <SplitText by="word">Three principles, held quietly.</SplitText>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-[#1B3A4B]/15 p-7 lg:p-9 reveal-up transition-transform duration-300 hover:-translate-y-1">
                <p className="text-[#1B3A4B] text-xl lg:text-2xl font-medium mb-3" style={{ letterSpacing: "-0.02em" }}>{v.title}</p>
                <p className="text-[#1B3A4B]/70 text-base lg:text-lg leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16 lg:py-28 border-t border-[#1B3A4B]/10">
        <div className="max-w-[88rem] mx-auto">
          <p className="text-[#1B3A4B]/60 text-sm mb-3 uppercase tracking-[0.18em] reveal-eyebrow">The team</p>
          <h2 className="text-[#1B3A4B] text-3xl md:text-5xl lg:text-6xl font-medium max-w-4xl mb-12 lg:mb-16 reveal-head" style={{ letterSpacing: "-0.03em" }}>
            <SplitText by="word">The people behind the ring.</SplitText>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {team.map((m) => (
              <div key={m.name} className="rounded-2xl border border-[#1B3A4B]/15 p-7 lg:p-9 bg-[#F4EFE6] reveal-up transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(27,58,75,0.4)]">
                <p className="text-[#1B3A4B] text-2xl lg:text-3xl font-medium mb-1" style={{ letterSpacing: "-0.02em" }}>{m.name}</p>
                <p className="text-[#1B3A4B]/50 text-sm uppercase tracking-wider mb-5">{m.role}</p>
                <p className="text-[#1B3A4B]/70 text-base lg:text-lg leading-relaxed">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 lg:py-28 border-t border-[#1B3A4B]/10">
        <div className="max-w-[88rem] mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <h2 className="text-[#1B3A4B] text-3xl md:text-5xl lg:text-6xl font-medium max-w-3xl reveal-head" style={{ letterSpacing: "-0.03em" }}>
            <SplitText by="word">See what we are building.</SplitText>
          </h2>
          <Magnetic className="reveal-up self-start md:self-auto">
            <Link to="/" className="inline-flex items-center gap-3 bg-[#1B3A4B] text-[#F4EFE6] text-base lg:text-lg font-medium px-8 py-3 rounded-full hover:bg-[#14303f] transition-colors duration-200">
              Back to Veris
            </Link>
          </Magnetic>
        </div>
      </section>

      <Footer />
    </div>
  );
}
