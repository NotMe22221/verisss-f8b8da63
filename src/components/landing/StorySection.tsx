import storyImg from "@/assets/story-grandparent.jpg";
import { SplitText } from "./SplitText";

export function StorySection() {
  return (
    <section id="story" className="bg-[#F4EFE6] px-6 lg:px-12 py-24 lg:py-36 border-t border-[#1B3A4B]/10">
      <div className="max-w-[88rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-7 rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-[5/4] reveal-image">
          <img
            src={storyImg}
            alt="An older woman on the phone, ring on her finger"
            loading="lazy" decoding="async"
            width={1600}
            height={1200}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="lg:col-span-5">
          <p className="text-[#1B3A4B]/60 text-sm mb-3 reveal-eyebrow">A True Story</p>
          <h2 className="text-[#1B3A4B] text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.05] mb-8 reveal-head" style={{ letterSpacing: "-0.04em" }}>
            <SplitText by="word">She thought it was the bank.</SplitText>
          </h2>
          <p className="text-[#1B3A4B]/80 text-lg lg:text-xl leading-relaxed font-medium mb-5 reveal-up">
            They knew her name. They knew the last four digits. They were calm, professional, and very, very patient. By the time her son called her back, the wire had cleared.
          </p>
          <p className="text-[#1B3A4B]/60 text-base lg:text-lg leading-relaxed reveal-up">
            $48,000. Forty-three years of saving. Gone in nineteen minutes. We built Veris because she deserved one second to feel that something was wrong, and one second is all it takes.
          </p>
        </div>
      </div>
    </section>
  );
}
