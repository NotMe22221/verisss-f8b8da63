import kitchen from "@/assets/usecase-kitchen-call.jpg";
import relief from "@/assets/usecase-family-relief.jpg";
import doubt from "@/assets/usecase-second-doubt.jpg";
import { SplitText } from "./SplitText";

const cases = [
  {
    img: kitchen,
    eyebrow: "Tuesday, 2:14 pm",
    title: "The IRS call.",
    body: "Heart rate climbs. Voice tightens. The ring buzzes once, the spell breaks.",
  },
  {
    img: doubt,
    eyebrow: "Thursday, 9:41 am",
    title: "The grandkid in trouble.",
    body: "A familiar voice, wrong cadence. Veris hears it before she does.",
  },
  {
    img: relief,
    eyebrow: "Sunday, 6:02 pm",
    title: "The text that saves her.",
    body: "Her daughter sees a single discreet alert. No transcript. No recording. Just: call mom.",
  },
];

export function UseCasesSection() {
  return (
    <section id="use-cases" className="bg-[#F4EFE6] px-6 lg:px-12 py-24 lg:py-36 border-t border-[#1B3A4B]/10">
      <div className="max-w-[88rem] mx-auto">
        <p className="text-[#1B3A4B]/60 text-sm mb-3 reveal-eyebrow">When It Matters</p>
        <h2 className="text-[#1B3A4B] text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-[1.05] max-w-4xl mb-16 lg:mb-24 reveal-head" style={{ letterSpacing: "-0.04em" }}>
          <SplitText by="word">Three moments. One ring. Every week.</SplitText>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {cases.map((c) => (
            <article key={c.title} className="usecase-card group rounded-2xl overflow-hidden bg-[#1B3A4B] flex flex-col reveal-up">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={c.img}
                  alt={c.title}
                  loading="lazy" decoding="async"
                  width={1080}
                  height={1350}
                  className="usecase-img absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A4B] via-[#1B3A4B]/30 to-transparent" />
              </div>
              <div className="p-7 lg:p-8">
                <p className="text-[#F4EFE6]/50 text-xs tracking-[0.16em] uppercase mb-2">{c.eyebrow}</p>
                <h3 className="text-[#F4EFE6] text-2xl lg:text-3xl font-medium mb-3" style={{ letterSpacing: "-0.02em" }}>{c.title}</h3>
                <p className="text-[#F4EFE6]/70 text-base leading-relaxed">{c.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
