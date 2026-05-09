import portrait from "@/assets/who-its-for-portrait.jpg";
import { SplitText } from "./SplitText";

const forList = [
  "Grandparents who answer every call.",
  "Adult children who worry, three states away.",
  "Caregivers who can't be in two rooms at once.",
  "Anyone who has ever said: I almost fell for it.",
];

const notForList = [
  "Not for AI training. Your voice is never a dataset.",
  "Not for surveillance. We don't record. We don't transcribe.",
  "Not for data brokers. We sell rings, not people.",
  "Not for advertisers. There is no feed to monetize.",
];

export function WhoItsForSection() {
  return (
    <section id="who-its-for" className="bg-[#1B3A4B] px-6 lg:px-12 py-24 lg:py-36">
      <div className="max-w-[88rem] mx-auto">
        <p className="text-[#F4EFE6]/50 text-sm mb-3 reveal-eyebrow">Who It's For</p>
        <h2 className="text-[#F4EFE6] text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-[1.05] max-w-5xl mb-12 lg:mb-16 reveal-head" style={{ letterSpacing: "-0.04em" }}>
          <SplitText by="word">Built for the people we love. Not for the systems that watch them.</SplitText>
        </h2>

        <div className="rounded-2xl overflow-hidden aspect-[21/9] mb-12 lg:mb-16 reveal-image">
          <img
            src={portrait}
            alt="An elderly hand wearing the Veris ring, held by a younger hand"
            loading="lazy"
            width={1600}
            height={686}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          <div className="rounded-2xl border border-[#F4EFE6]/15 p-8 lg:p-10 reveal-up">
            <p className="text-[#F4EFE6]/50 text-xs font-medium tracking-[0.18em] uppercase mb-6">For</p>
            <ul className="flex flex-col gap-4">
              {forList.map((l) => (
                <li key={l} className="text-[#F4EFE6] text-xl lg:text-2xl font-medium leading-snug" style={{ letterSpacing: "-0.02em" }}>
                  {l}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[#F4EFE6]/15 p-8 lg:p-10 bg-[#F4EFE6]/[0.03] reveal-up">
            <p className="text-[#F4EFE6]/50 text-xs font-medium tracking-[0.18em] uppercase mb-6">Not For</p>
            <ul className="flex flex-col gap-4">
              {notForList.map((l) => (
                <li key={l} className="text-[#F4EFE6]/80 text-xl lg:text-2xl font-medium leading-snug" style={{ letterSpacing: "-0.02em" }}>
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
