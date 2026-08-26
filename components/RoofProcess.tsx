import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Blueprint from "@/components/Blueprint";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { roofProcess } from "@/lib/content";

/**
 * Priebeh jednej reálnej zákazky — výmena krytiny od pôvodného stavu
 * po odovzdanie.
 *
 * Nahradila pôvodný všeobecný blok „Kvalitná práca od krovu po dokončenie",
 * ktorý mal vymyslené údaje (TYP / KRYTINA). Skutočná zákazka odfotená krok
 * po kroku je pre strechára presvedčivejšia než akékoľvek tvrdenie o kvalite.
 *
 * Celé je to server-rendered, bez klientskeho JavaScriptu.
 */
export default function RoofProcess() {
  return (
    <section
      id="priebeh"
      aria-labelledby="priebeh-nadpis"
      className="section-y relative overflow-hidden bg-white"
    >
      <Blueprint className="-left-32 top-24 h-[440px] w-[720px] opacity-60" />

      <div className="container-max relative">
        <SectionHeading
          id="priebeh-nadpis"
          eyebrow={roofProcess.eyebrow}
          before={roofProcess.titleBefore}
          mark={roofProcess.titleMark}
          lead={roofProcess.lead}
        />

        {/* Predtým / potom — najsilnejší dôkaz je rozdiel na jednej streche. */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20">
          {[roofProcess.before, roofProcess.after].map((item, i) => (
            <Reveal
              key={item.label}
              variant="mask"
              index={i}
              step={140}
              className="relative overflow-hidden rounded-panel"
            >
              <div className="relative">
                <Image
                  src={item.photo}
                  alt={item.alt}
                  loading="lazy"
                  sizes="(min-width: 640px) 50vw, 100vw"
                  quality={80}
                  className="aspect-[4/3] w-full object-cover"
                />
                <span
                  className={`text-eyebrow absolute left-4 top-4 rounded-card px-3 py-1.5 uppercase backdrop-blur-sm ${
                    i === 0
                      ? "bg-dark/80 text-white"
                      : "bg-accent text-dark"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Chronologická os */}
        <ol className="mt-16 flex flex-col gap-14 lg:mt-24 lg:gap-20">
          {roofProcess.steps.map((step, i) => {
            const obrazokVpravo = i % 2 === 1;

            return (
              <li
                key={step.number}
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
              >
                <Reveal
                  variant={obrazokVpravo ? "right" : "left"}
                  className={obrazokVpravo ? "lg:order-2" : ""}
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      aria-hidden="true"
                      className="tabular text-h2 leading-none text-line"
                    >
                      {step.number}
                    </span>
                    <h3 className="text-h3 text-dark">{step.title}</h3>
                  </div>

                  <p className="mt-5 max-w-[54ch] text-[15px] leading-relaxed text-muted">
                    {step.text}
                  </p>
                </Reveal>

                <div
                  className={`grid gap-4 ${
                    step.photos.length > 1 ? "sm:grid-cols-2" : ""
                  } ${obrazokVpravo ? "lg:order-1" : ""}`}
                >
                  {step.photos.map((p, pi) => (
                    <Reveal
                      key={p.alt}
                      variant="mask"
                      index={pi}
                      step={140}
                      className={`overflow-hidden rounded-panel ${
                        pi === 0 && step.photos.length === 1
                          ? "parallax-up"
                          : ""
                      }`}
                    >
                      <Image
                        src={p.photo}
                        alt={p.alt}
                        loading="lazy"
                        sizes={
                          step.photos.length > 1
                            ? "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                            : "(min-width: 1024px) 50vw, 100vw"
                        }
                        quality={80}
                        className={`w-full object-cover ${
                          step.photos.length > 1
                            ? "aspect-[3/4]"
                            : "aspect-[4/3]"
                        }`}
                      />
                    </Reveal>
                  ))}
                </div>
              </li>
            );
          })}
        </ol>

        <Reveal className="mt-16 lg:mt-20">
          <a href="/kalkulator" className="btn btn-dark">
            {roofProcess.cta}
            <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
