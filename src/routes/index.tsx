import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import ringDevice from "@/assets/ring-device-studio.jpg";
import { submitEarlyAccess } from "@/lib/early-access.functions";

export const Route = createFileRoute("/")({
  component: VerisLanding,
  head: () => ({
    meta: [
      { title: "Veris — Protection before the damage." },
      {
        name: "description",
        content:
          "Veris is the first wearable intelligence system designed to detect coercion, manipulation, and scam pressure in real time before financial loss occurs.",
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
  const links = ["Mission", "The Device", "Science", "Press", "Manifesto"];
  return (
    <nav className="absolute top-0 left-0 right-0 z-20 px-6 py-5">
      <div className="max-w-[88rem] mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-black">
          <LogoIcon className="w-7 h-7" />
          <span className="text-2xl font-medium tracking-tight">Veris</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l} href="#" className="text-base text-gray-700 hover:text-black font-medium transition-colors duration-200">
              {l}
            </a>
          ))}
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
    <div className="mt-24 w-full max-w-md overflow-hidden">
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .marquee-track { display: flex; width: max-content; animation: marquee 22s linear infinite; }
      `}</style>
      <div className="marquee-track">
        {[...heroBrands, ...heroBrands].map((b, i) => (
          <span key={i} className="mx-7 shrink-0 text-black/60 whitespace-nowrap" style={b.style}>
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
    <section className="flex-1 px-6 pt-20 pb-6 flex items-end">
      <div className="relative w-full rounded-2xl overflow-hidden max-w-[88rem] mx-auto" style={{ height: "calc(100vh - 96px)" }}>
        <video autoPlay muted loop playsInline className="object-cover absolute inset-0 w-full h-full">
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_161253_c72b1869-400f-45ed-ac0c-52f68c2ed5bd.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 flex flex-col items-start justify-start h-full p-12 pt-36">
          <p className="text-black/70 text-xs font-medium tracking-[0.18em] uppercase mb-6">
            Moonshot Idea 03 · Private Beta · Cognitive Defense
          </p>
          <h1 className="text-black text-5xl md:text-6xl font-medium leading-tight max-w-xl mb-4" style={{ letterSpacing: "-0.04em" }}>
            Protection before
            <br />
            the damage.
          </h1>
          <p className="text-black/70 text-base md:text-lg max-w-md mb-8 leading-relaxed">
            Veris is the first wearable intelligence system designed to detect coercion, manipulation, and scam pressure in real time — before financial loss occurs.
          </p>
          <a href="#early-access" className="inline-flex items-center gap-3 bg-black text-white text-base md:text-lg font-medium pl-8 pr-2 py-2 rounded-full hover:bg-gray-800 transition-colors duration-200">
            Join the beta
            <span className="bg-white rounded-full p-2">
              <ArrowRight className="w-5 h-5 text-black" />
            </span>
          </a>
          <HeroMarquee />
        </div>
      </div>
    </section>
  );
}

/* ---------- INFO / PROBLEM ---------- */
function InfoSection() {
  return (
    <section className="bg-[#F5F5F5] px-6 py-24">
      <div className="max-w-[88rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-start">
          <div>
            <p className="text-black/60 text-sm mb-3">The Problem</p>
            <h2 className="text-black text-4xl md:text-5xl font-medium leading-tight mb-8" style={{ letterSpacing: "-0.03em" }}>
              Meet Veris.
            </h2>
            <a href="#device" className="inline-flex items-center gap-3 bg-black text-white text-base font-medium pl-8 pr-2 py-2 rounded-full hover:bg-gray-800 transition-colors duration-200">
              See the device
              <span className="bg-white rounded-full p-2">
                <ArrowRight className="w-5 h-5 text-black" />
              </span>
            </a>
          </div>
          <p className="text-black/70 text-2xl md:text-3xl leading-relaxed">
            $3.4B is lost annually to elder fraud, romance scams, and coercive
            financial pressure. Veris stops the damage before it happens.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2 rounded-2xl p-7 min-h-80 flex flex-col justify-between bg-[#2B2644]">
            <h3 className="text-white text-2xl font-medium leading-snug" style={{ letterSpacing: "-0.02em" }}>
              Detects coercion in real time
            </h3>
            <p className="text-white/60 text-base max-w-xs">
              On-device AI listens for stress signatures, scripted pressure, and
              the physiological fingerprint of duress.
            </p>
          </div>
          <div className="rounded-2xl p-7 min-h-80 flex flex-col justify-between bg-[#2B2644]">
            <h3 className="text-white text-2xl font-medium leading-snug" style={{ letterSpacing: "-0.02em" }}>
              Private
              <br />
              by design
            </h3>
            <p className="text-white/60 text-base">
              Nothing leaves the ring. No cloud, no recording, no surveillance —
              just a quiet haptic when something is wrong.
            </p>
          </div>
          <div className="rounded-2xl p-7 min-h-80 flex flex-col justify-between bg-[#2B2644]">
            <h3 className="text-white text-2xl font-medium leading-snug" style={{ letterSpacing: "-0.02em" }}>
              Built for
              <br />
              the moment
            </h3>
            <p className="text-white/60 text-base">
              127 families across 9 states. A 7-day battery. A defense system
              that lives on your finger.
            </p>
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
    <section id="device" className="bg-[#F5F5F5] px-6 py-24">
      <div className="max-w-[88rem] mx-auto">
        <p className="text-black/60 text-sm mb-3">The Device</p>
        <h2 className="text-black text-5xl md:text-6xl font-medium leading-none mb-12" style={{ letterSpacing: "-0.04em" }}>
          The Device
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <div className="rounded-2xl overflow-hidden bg-[#2B2644] min-h-[520px] relative">
            <img src={ringDevice} alt="Veris ring" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {deviceFeatures.map((f) => (
              <div key={f.title} className="rounded-2xl bg-[#2B2644] p-6 min-h-40 flex flex-col justify-between">
                <h3 className="text-white text-lg font-medium" style={{ letterSpacing: "-0.02em" }}>{f.title}</h3>
                <p className="text-white/60 text-sm">{f.body}</p>
              </div>
            ))}
            {deviceStats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-[#2B2644] p-6 min-h-40 flex flex-col justify-between">
                <p className="text-white text-4xl font-medium" style={{ letterSpacing: "-0.03em" }}>
                  {s.value}<span className="text-white/70 text-xl ml-1">{s.unit}</span>
                </p>
                <p className="text-white/60 text-sm uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- BACKED BY ---------- */
const backers: Array<{ name: string; style: React.CSSProperties }> = [
  { name: "Founders Fund", style: { fontFamily: "'Times New Roman', serif", fontWeight: 400, letterSpacing: "0.02em", fontSize: 14 } },
  { name: "ANDREESSEN", style: { fontFamily: "'Arial Black', sans-serif", fontWeight: 900, letterSpacing: "0.08em", fontSize: 16 } },
  { name: "USV", style: { fontFamily: "Impact, sans-serif", fontWeight: 700, letterSpacing: "0.05em", fontSize: 18 } },
  { name: "Khosla", style: { fontFamily: "Georgia, serif", fontWeight: 600, letterSpacing: "-0.02em", fontSize: 17 } },
  { name: "Lux Capital", style: { fontFamily: "Helvetica, sans-serif", fontWeight: 700, letterSpacing: "-0.01em", fontSize: 15 } },
  { name: "DCVC", style: { fontFamily: "Verdana, sans-serif", fontWeight: 700, letterSpacing: "0.06em", fontSize: 14, textTransform: "uppercase" } },
  { name: "8VC", style: { fontFamily: "'Courier New', monospace", fontWeight: 700, letterSpacing: "0.18em", fontSize: 14 } },
  { name: "Founders Forum", style: { fontFamily: "Palatino, serif", fontWeight: 500, letterSpacing: "0.03em", fontSize: 15 } },
];

function BackedBySection() {
  return (
    <section className="bg-[#F5F5F5] px-6 py-12">
      <div className="max-w-[88rem] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
        <p className="text-black/70 text-base leading-relaxed">
          Funded by premier partners
          <br />
          and forward-thinking leaders.
        </p>
        <div className="md:col-span-3 overflow-hidden">
          <style>{`
            @keyframes backers-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
            .backers-track { display: flex; width: max-content; animation: backers-marquee 30s linear infinite; }
          `}</style>
          <div className="backers-track">
            {[...backers, ...backers].map((b, i) => (
              <span key={i} className="mx-10 shrink-0 text-black/50 whitespace-nowrap" style={b.style}>
                {b.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- WHO IT PROTECTS ---------- */
function UseCasesSection() {
  return (
    <section className="bg-[#F5F5F5] px-6 py-24">
      <div className="max-w-[88rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="md:pr-12 md:pt-2">
          <p className="text-black/60 text-sm mb-2">Veris in the Field</p>
          <h2 className="text-black text-5xl md:text-6xl font-medium leading-none mb-6" style={{ letterSpacing: "-0.04em" }}>
            Who it protects
          </h2>
          <p className="text-black/60 text-base leading-relaxed max-w-sm">
            Veris is being deployed first to the people most targeted by
            financial coercion: aging parents, isolated adults, and high-risk
            individuals living independently.
          </p>
        </div>
        <div className="relative rounded-3xl overflow-hidden min-h-[720px]">
          <video autoPlay muted loop playsInline className="object-cover absolute inset-0 w-full h-full">
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_183428_ab5e672a-f608-4dcb-b319-f3e040f02e2d.mp4" type="video/mp4" />
          </video>
          <div className="relative z-10 p-10 md:p-12">
            <h3 className="text-black text-4xl md:text-5xl font-medium leading-tight mb-5" style={{ letterSpacing: "-0.03em" }}>
              Families
            </h3>
            <p className="text-black/70 text-base max-w-md mb-8">
              127 families across 9 states are piloting Veris today — quietly
              defending parents and grandparents from the scams that strip
              fortunes in a single phone call.
            </p>
            <a href="#early-access" className="group inline-flex items-center gap-3 text-black text-base font-medium">
              <span className="w-9 h-9 rounded-full bg-white/80 backdrop-blur flex items-center justify-center group-hover:bg-white transition-colors">
                <ArrowRight className="w-4 h-4 text-black" />
              </span>
              Join the pilot
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- EARLY ACCESS ---------- */
function Field({
  label, value, onChange, type = "text", required = false,
}: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-white/50 text-xs uppercase tracking-wider">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/60 transition-colors"
      />
    </label>
  );
}

function EarlyAccessSection() {
  const submit = useServerFn(submitEarlyAccess);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [team, setTeam] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await submit({ data: { name, email, team } });
      if (res.duplicate) toast.success("You're already on the list.");
      else toast.success("You're in. We'll be in touch.");
      setName(""); setEmail(""); setTeam("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="early-access" className="bg-[#F5F5F5] px-6 py-24">
      <div className="max-w-[88rem] mx-auto rounded-3xl bg-[#2B2644] p-10 md:p-16">
        <p className="text-white/60 text-sm mb-3">Private Beta</p>
        <h2 className="text-white text-4xl md:text-5xl font-medium leading-tight mb-10" style={{ letterSpacing: "-0.03em" }}>
          Secure your spot.
        </h2>
        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <Field label="Name" value={name} onChange={setName} required />
          <Field label="Email" value={email} onChange={setEmail} type="email" required />
          <Field label="Team / Family" value={team} onChange={setTeam} />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-3 bg-white text-black text-base font-medium pl-7 pr-2 py-2.5 rounded-full hover:bg-white/90 transition-colors duration-200 disabled:opacity-60"
          >
            {loading ? "Sending…" : "Secure spot"}
            <span className="bg-black rounded-full p-2">
              <ArrowRight className="w-4 h-4 text-white" />
            </span>
          </button>
        </form>
        <p className="text-white/40 text-xs mt-8 tracking-wider uppercase">
          Cohort 03 · 127 families · 9 states · on-device AI · private by design
        </p>
      </div>
      <Toaster />
    </section>
  );
}

/* ---------- PAGE ---------- */
function VerisLanding() {
  return (
    <div className="flex flex-col bg-[#F5F5F5]">
      <div className="h-screen flex flex-col overflow-hidden relative">
        <Navbar />
        <HeroSection />
      </div>
      <InfoSection />
      <DeviceSection />
      <BackedBySection />
      <UseCasesSection />
      <EarlyAccessSection />
    </div>
  );
}
