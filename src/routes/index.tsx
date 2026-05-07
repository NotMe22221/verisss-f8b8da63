import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: HaloLanding,
  head: () => ({
    meta: [
      { title: "Halo — Your Wealth Works" },
      {
        name: "description",
        content:
          "USD Halo is an automated, reward-powered digital dollar built for native passive earnings and effortless connection into DeFi.",
      },
    ],
  }),
});

/* ---------- LOGO ---------- */
function LogoIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 256 256"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M 128.005 191.173 C 128.448 156.208 156.93 128 192 128 L 192 64 L 128 64 C 128 99.346 99.346 128 64 128 L 64 192 L 128 192 Z M 192 256 L 64 256 C 28.654 256 0 227.346 0 192 L 0 64 L 64 64 L 64 0 L 192 0 C 227.346 0 256 28.654 256 64 L 256 192 L 192 192 Z" />
    </svg>
  );
}

/* ---------- NAVBAR ---------- */
function Navbar() {
  const links = ["Network", "Ecosystem", "Rewards", "Help", "News"];
  return (
    <nav className="absolute top-0 left-0 right-0 z-20 px-6 py-5">
      <div className="max-w-[88rem] mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-black">
          <LogoIcon className="w-7 h-7" />
          <span className="text-2xl font-medium tracking-tight">Halo</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l}
              href="#"
              className="text-base text-gray-700 hover:text-black font-medium transition-colors duration-200"
            >
              {l}
            </a>
          ))}
        </div>
        <button className="bg-black text-white text-base font-medium px-7 py-2.5 rounded-full hover:bg-gray-800 transition-colors duration-200">
          Open Wallet
        </button>
      </div>
    </nav>
  );
}

/* ---------- BRAND MARQUEE (hero) ---------- */
const heroBrands: Array<{ name: string; style: React.CSSProperties }> = [
  { name: "Stripe", style: { fontFamily: "Georgia, serif", fontWeight: 700, letterSpacing: "-0.02em", fontSize: 15 } },
  { name: "COINBASE", style: { fontFamily: "Arial, sans-serif", fontWeight: 900, letterSpacing: "0.08em", fontSize: 13, textTransform: "uppercase" } },
  { name: "Uniswap", style: { fontFamily: "'Trebuchet MS', sans-serif", fontWeight: 600, letterSpacing: "0.01em", fontSize: 15, fontStyle: "italic" } },
  { name: "AAVE", style: { fontFamily: "'Courier New', monospace", fontWeight: 700, letterSpacing: "0.12em", fontSize: 13, textTransform: "uppercase" } },
  { name: "Compound", style: { fontFamily: "Palatino, 'Book Antiqua', serif", fontWeight: 400, letterSpacing: "-0.01em", fontSize: 16 } },
  { name: "MakerDAO", style: { fontFamily: "Impact, 'Arial Narrow', sans-serif", fontWeight: 400, letterSpacing: "0.04em", fontSize: 14 } },
  { name: "Chainlink", style: { fontFamily: "Verdana, sans-serif", fontWeight: 700, letterSpacing: "-0.03em", fontSize: 13 } },
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
          <span
            key={i}
            className="mx-7 shrink-0 text-black/60 whitespace-nowrap"
            style={b.style}
          >
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
      <div
        className="relative w-full rounded-2xl overflow-hidden max-w-[88rem] mx-auto"
        style={{ height: "calc(100vh - 96px)" }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="object-cover absolute inset-0 w-full h-full"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_161253_c72b1869-400f-45ed-ac0c-52f68c2ed5bd.mp4"
            type="video/mp4"
          />
        </video>
        <div className="relative z-10 flex flex-col items-start justify-start h-full p-12 pt-36">
          <h1
            className="text-black text-5xl md:text-6xl font-medium leading-tight max-w-xl mb-4"
            style={{ letterSpacing: "-0.04em" }}
          >
            Your Wealth
            <br />
            Works
          </h1>
          <p
            className="text-black/70 text-base md:text-lg max-w-md mb-8 leading-relaxed"
            style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
          >
            An automated, reward-powered digital dollar built for native passive
            earnings and effortless connection into DeFi.
          </p>
          <button className="inline-flex items-center gap-3 bg-black text-white text-base md:text-lg font-medium pl-8 pr-2 py-2 rounded-full hover:bg-gray-800 transition-colors duration-200">
            Join us
            <span className="bg-white rounded-full p-2">
              <ArrowRight className="w-5 h-5 text-black" />
            </span>
          </button>
          <HeroMarquee />
        </div>
      </div>
    </section>
  );
}

/* ---------- INFO SECTION ---------- */
function InfoSection() {
  return (
    <section className="bg-[#F5F5F5] px-6 py-24">
      <div className="max-w-[88rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-start">
          <div>
            <h2
              className="text-black text-4xl md:text-5xl font-medium leading-tight mb-8"
              style={{ letterSpacing: "-0.03em" }}
            >
              Meet USD Halo.
            </h2>
            <button className="inline-flex items-center gap-3 bg-black text-white text-base font-medium pl-8 pr-2 py-2 rounded-full hover:bg-gray-800 transition-colors duration-200">
              Discover it
              <span className="bg-white rounded-full p-2">
                <ArrowRight className="w-5 h-5 text-black" />
              </span>
            </button>
          </div>
          <p className="text-black/70 text-2xl md:text-3xl leading-relaxed">
            USD Halo is a reward-earning dollar coin that lets your savings grow
            while remaining tied to the U.S. dollar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            className="lg:col-span-2 rounded-2xl p-7 min-h-80 flex flex-col justify-between"
            style={{
              backgroundImage:
                "url(https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260423_164207_f243351d-ed59-48ec-83a0-a5e996bdbe3c.png&w=1280&q=85)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h3
              className="text-black text-2xl font-medium leading-snug"
              style={{ letterSpacing: "-0.02em" }}
            >
              Savings that bloom
            </h3>
            <p className="text-black/70 text-base max-w-xs">
              Gain steady returns as your dollar tokens are routed into
              top-performing DeFi strategies.
            </p>
          </div>

          <div className="rounded-2xl p-7 min-h-80 flex flex-col justify-between bg-[#2B2644]">
            <h3
              className="text-white text-2xl font-medium leading-snug"
              style={{ letterSpacing: "-0.02em" }}
            >
              Always fluid,
              <br />
              always pegged.
            </h3>
            <p className="text-white/60 text-base">
              Keep fully dollar-anchored with on-demand access to funds — no
              lockups or waits.
            </p>
          </div>

          <div className="rounded-2xl p-7 min-h-80 flex flex-col justify-between bg-[#2B2644]">
            <h3
              className="text-white text-2xl font-medium leading-snug"
              style={{ letterSpacing: "-0.02em" }}
            >
              Fully
              <br />
              automated
            </h3>
            <p className="text-white/60 text-base">
              Skip the task of tuning positions yourself. USD Halo runs in the
              background for you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- BACKED BY ---------- */
const backers: Array<{ name: string; style: React.CSSProperties }> = [
  { name: "Fundamental Labs", style: { fontFamily: "'Times New Roman', serif", fontWeight: 400, letterSpacing: "0.02em", fontSize: 14 } },
  { name: "KUCOIN", style: { fontFamily: "'Arial Black', sans-serif", fontWeight: 900, letterSpacing: "0.08em", fontSize: 16 } },
  { name: "NGC", style: { fontFamily: "Impact, sans-serif", fontWeight: 700, letterSpacing: "0.05em", fontSize: 18 } },
  { name: "NxGen", style: { fontFamily: "Georgia, serif", fontWeight: 600, letterSpacing: "-0.02em", fontSize: 17 } },
  { name: "Matter Labs", style: { fontFamily: "Helvetica, sans-serif", fontWeight: 700, letterSpacing: "-0.01em", fontSize: 15 } },
  { name: "DEXTOOLS", style: { fontFamily: "Verdana, sans-serif", fontWeight: 700, letterSpacing: "0.06em", fontSize: 14, textTransform: "uppercase" } },
  { name: "NGRAVE", style: { fontFamily: "'Courier New', monospace", fontWeight: 700, letterSpacing: "0.18em", fontSize: 14 } },
  { name: "Polychain", style: { fontFamily: "Palatino, serif", fontWeight: 500, letterSpacing: "0.03em", fontSize: 15 } },
];

function BackedBySection() {
  return (
    <section className="bg-[#F5F5F5] px-6">
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
              <span
                key={i}
                className="mx-10 shrink-0 text-black/50 whitespace-nowrap"
                style={b.style}
              >
                {b.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- USE CASES ---------- */
function UseCasesSection() {
  return (
    <section className="bg-[#F5F5F5] px-6 py-24">
      <div className="max-w-[88rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="md:pr-12 md:pt-2">
          <p className="text-black/60 text-sm mb-2">USD Halo in Practice</p>
          <h2
            className="text-black text-5xl md:text-6xl font-medium leading-none mb-6"
            style={{ letterSpacing: "-0.04em" }}
          >
            Use modes
          </h2>
          <p className="text-black/60 text-base leading-relaxed max-w-sm">
            USD Halo powers a wide range of modes for builders, companies and
            treasuries wanting safe and rewarding stablecoin integrations plus
            more
          </p>
        </div>

        <div className="relative rounded-3xl overflow-hidden min-h-[720px]">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="object-cover absolute inset-0 w-full h-full"
          >
            <source
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_183428_ab5e672a-f608-4dcb-b319-f3e040f02e2d.mp4"
              type="video/mp4"
            />
          </video>
          <div className="relative z-10 p-10 md:p-12">
            <h3
              className="text-black text-4xl md:text-5xl font-medium leading-tight mb-5"
              style={{ letterSpacing: "-0.03em" }}
            >
              Commerce
            </h3>
            <p className="text-black/70 text-base max-w-md mb-8">
              Lift customer retention by offering USD Halo, a trusted
              dollar-backed stablecoin with strong yields, letting your patrons
              earn with zero effort on your platform.
            </p>
            <a
              href="#"
              className="group inline-flex items-center gap-3 text-black text-base font-medium"
            >
              <span className="w-9 h-9 rounded-full bg-white/80 backdrop-blur flex items-center justify-center group-hover:bg-white transition-colors">
                <ArrowRight className="w-4 h-4 text-black" />
              </span>
              Know more
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- PAGE ---------- */
function HaloLanding() {
  return (
    <div className="flex flex-col bg-[#F5F5F5]">
      <div className="h-screen flex flex-col overflow-hidden relative">
        <Navbar />
        <HeroSection />
      </div>
      <InfoSection />
      <BackedBySection />
      <UseCasesSection />
    </div>
  );
}
