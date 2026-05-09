import { Check } from "lucide-react";
import { SplitText } from "./SplitText";
import { Magnetic } from "./MagneticButton";

const tiers = [
  {
    name: "Solo",
    ring: "$249",
    sub: "$9",
    blurb: "One ring. One person. One peace of mind.",
    features: ["Lifetime ring warranty", "On-device protection", "Battery + sensor service", "Email support"],
    highlight: false,
  },
  {
    name: "Family",
    ring: "$429",
    sub: "$19",
    blurb: "One ring, up to four trusted contacts.",
    features: ["Everything in Solo", "Up to 4 family alerts", "Shared dashboard", "Priority support"],
    highlight: true,
  },
  {
    name: "Caregiver Network",
    ring: "Custom",
    sub: "From $49",
    blurb: "For care homes, agencies, and clinical pilots.",
    features: ["Volume pricing", "Onboarding + fitting", "HIPAA-grade infra", "Dedicated success"],
    highlight: false,
  },
];

export function BusinessModelSection() {
  return (
    <section id="pricing" className="bg-[#F4EFE6] px-6 lg:px-12 py-24 lg:py-36 border-t border-[#1B3A4B]/10">
      <div className="max-w-[88rem] mx-auto">
        <p className="text-[#1B3A4B]/60 text-sm mb-3 reveal-eyebrow">How It's Priced</p>
        <h2 className="text-[#1B3A4B] text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-[1.05] max-w-4xl mb-6 reveal-head" style={{ letterSpacing: "-0.04em" }}>
          <SplitText by="word">Honest hardware. Honest software. No data sold, ever.</SplitText>
        </h2>
        <p className="text-[#1B3A4B]/70 text-lg lg:text-xl max-w-2xl mb-16 lg:mb-20 reveal-up leading-relaxed">
          You pay for the ring once and a small monthly fee that keeps the on-device models updated and the support line open. That's it. No ads. No data brokers. No upsells.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 reveal-stagger">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`pricing-card rounded-2xl p-8 lg:p-10 flex flex-col gap-6 border ${
                t.highlight
                  ? "bg-[#1B3A4B] text-[#F4EFE6] border-[#1B3A4B]"
                  : "bg-[#F4EFE6] text-[#1B3A4B] border-[#1B3A4B]/15"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-medium" style={{ letterSpacing: "-0.02em" }}>{t.name}</h3>
                {t.highlight && (
                  <span className="text-xs uppercase tracking-[0.16em] px-3 py-1 rounded-full bg-[#F4EFE6]/15 text-[#F4EFE6]/80">
                    Most chosen
                  </span>
                )}
              </div>
              <div>
                <p className={`text-5xl lg:text-6xl font-medium ${t.highlight ? "" : ""}`} style={{ letterSpacing: "-0.04em" }}>
                  {t.ring}
                </p>
                <p className={`text-sm mt-2 ${t.highlight ? "text-[#F4EFE6]/60" : "text-[#1B3A4B]/60"}`}>
                  one-time · then {t.sub}/mo per ring
                </p>
              </div>
              <p className={`text-base ${t.highlight ? "text-[#F4EFE6]/80" : "text-[#1B3A4B]/80"}`}>{t.blurb}</p>
              <ul className="flex flex-col gap-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${t.highlight ? "text-[#F4EFE6]" : "text-[#1B3A4B]"}`} />
                    <span className={t.highlight ? "text-[#F4EFE6]/80" : "text-[#1B3A4B]/80"}>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-2">
                <Magnetic>
                  <a
                    href="#early-access"
                    className={`inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                      t.highlight
                        ? "bg-[#F4EFE6] text-[#1B3A4B] hover:bg-white"
                        : "bg-[#1B3A4B] text-[#F4EFE6] hover:bg-[#14303f]"
                    }`}
                  >
                    Request access
                  </a>
                </Magnetic>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[#1B3A4B]/40 text-xs tracking-wide uppercase mt-8">Prices in USD · ships Q3 2026 · 60-day return</p>
      </div>
    </section>
  );
}
