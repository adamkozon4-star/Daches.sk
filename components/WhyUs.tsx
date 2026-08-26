import { Check } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { whyUs } from "@/lib/content";

export default function WhyUs() {
  return (
    <section
      id="preco-daches"
      aria-labelledby="preco-nadpis"
      className="section-y relative overflow-hidden bg-dark"
    >
      <div className="glow-accent -left-40 top-0 h-[520px] w-[520px]" />
      <div className="glow-accent -right-32 bottom-0 h-[420px] w-[420px]" />

      <div className="container-max relative">
        <SectionHeading
          id="preco-nadpis"
          eyebrow={whyUs.eyebrow}
          before={whyUs.titleBefore}
          mark={whyUs.titleMark}
          lead={whyUs.lead}
          light
        />

        <ul className="mt-14 grid gap-x-10 gap-y-1 lg:mt-20 lg:grid-cols-2">
          {whyUs.points.map((point, i) => (
            <Reveal
              as="li"
              key={point}
              variant="left"
              index={i}
              step={70}
              className="group flex items-center gap-4 border-b border-line-dark py-5"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent/12 text-accent transition-colors duration-[var(--d-short)] group-hover:bg-accent group-hover:text-dark">
                <Check size={17} strokeWidth={2.5} aria-hidden="true" />
              </span>
              <span className="text-base font-medium text-white/85 transition-colors duration-[var(--d-short)] group-hover:text-white">
                {point}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
