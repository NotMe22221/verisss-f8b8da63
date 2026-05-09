import bench from "@/assets/ring-prototype-bench.jpg";
import macro from "@/assets/ring-design-macro.jpg";
import { SplitText } from "./SplitText";

const milestones = [
  { tag: "Q2 2026", title: "Sketch", body: "First concept sketches after a family member nearly fell for a phone scam." },
  { tag: "Q3 2026", title: "Breadboard", body: "Audio pipeline running on a desk prototype. Wires everywhere." },
  { tag: "Q4 2026", title: "Wearable", body: "First ring-shaped enclosure. Battery life still measured in hours." },
  { tag: "2027", title: "Closed pilot", body: "A small group of testers wearing it daily. Feedback over ship date." },
];

export function PrototypeSection() {
  return (
    <section id="prototype" className="bg-[#1B3A4B] px-6 lg:px-12 py-24 lg:py-36">
      <div className="max-w-[88rem] mx-auto">
        <p className="text-[#F4EFE6]/50 text-sm mb-3 reveal-eyebrow">From Sketch to Ship</p>
        <h2 className="text-[#F4EFE6] text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-[1.05] max-w-4xl mb-16 lg:mb-20 reveal-head" style={{ letterSpacing: "-0.04em" }}>
          <SplitText by="word">Three years on the bench. One ring on the finger.</SplitText>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 mb-12 lg:mb-16">
          <div className="lg:col-span-7 rounded-2xl overflow-hidden aspect-[16/10] reveal-image">
            <img src={bench} alt="Veris prototype on workbench" loading="lazy" width={1600} height={1000} className="w-full h-full object-cover" />
          </div>
          <div className="lg:col-span-5 rounded-2xl overflow-hidden aspect-[16/10] lg:aspect-auto reveal-image">
            <img src={macro} alt="Macro of the Veris ring" loading="lazy" width={1600} height={1200} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#F4EFE6]/10 rounded-2xl overflow-hidden reveal-stagger">
          {milestones.map((m) => (
            <div key={m.tag} className="bg-[#1B3A4B] p-6 lg:p-8 min-h-44 flex flex-col justify-between">
              <p className="text-[#F4EFE6]/40 text-sm font-medium tracking-wider">{m.tag}</p>
              <div>
                <h3 className="text-[#F4EFE6] text-xl lg:text-2xl font-medium mb-2" style={{ letterSpacing: "-0.02em" }}>{m.title}</h3>
                <p className="text-[#F4EFE6]/60 text-sm leading-relaxed">{m.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
