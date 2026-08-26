import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { process } from "@/lib/content";

/**
 * Spojnica medzi krokmi sa vypĺňa podľa scrollu (scroll-driven CSS, bez JS).
 * Je to najvýraznejší pohyb na stránke — a zámerne jediný takto výrazný.
 */
export default function Process() {
  return (
    <section
      id="postup"
      aria-labelledby="postup-nadpis"
      className="section-y bg-light"
    >
      <div className="container-max">
        <SectionHeading
          id="postup-nadpis"
          eyebrow={process.eyebrow}
          before={process.titleBefore}
          mark={process.titleMark}
        />

        <div className="relative mt-14 lg:mt-20">
          {/* Vodorovná spojnica — desktop */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-6 hidden h-px bg-line lg:block"
          >
            <div className="process-line h-full w-full bg-accent" />
          </div>

          {/* Zvislá spojnica — mobil a tablet */}
          <div
            aria-hidden="true"
            className="absolute bottom-6 left-6 top-6 w-px bg-line lg:hidden"
          >
            <div className="process-line h-full w-full bg-accent" />
          </div>

          <ol className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
            {process.steps.map((step, i) => (
              <Reveal
                as="li"
                key={step.number}
                index={i}
                step={90}
                className="flex gap-5 lg:block"
              >
                <span
                  aria-hidden="true"
                  className="tabular grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line bg-white text-sm font-extrabold text-dark shadow-[var(--shadow-card)]"
                >
                  {step.number}
                </span>

                <div className="lg:mt-6 lg:pr-4">
                  <h3 className="text-h3 text-dark">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
