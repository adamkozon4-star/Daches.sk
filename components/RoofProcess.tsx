import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Blueprint from "@/components/Blueprint";
import PredPo from "@/components/PredPo";
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
 * ── Pohyb ───────────────────────────────────────────────────────────────
 * Posuvník predtým/potom (jediný klientský kúsok, `PredPo`) a „balíček
 * kariet": krok stojí, ďalšia karta ho zhora prekryje, predchádzajúce
 * ustúpia a vykúkajú len ich okraje. Mechanika je v CSS — sekcia 6.14
 * v `globals.css`. Bez podpory scroll-driven animácií karty neustupujú,
 * lepenie a prekrývanie funguje všade.
 *
 * ⚠️ Sekcia má `overflow-clip`, NIE `overflow-hidden` — hidden by z nej
 * urobil scroll kontajner a karty by sa prestali lepiť.
 */
export default function RoofProcess() {
  const pocet = String(roofProcess.steps.length).padStart(2, "0");

  return (
    <section
      id="priebeh"
      aria-labelledby="priebeh-nadpis"
      className="section-y relative overflow-clip bg-white"
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
        <Reveal className="mt-14 lg:mt-20">
          <PredPo pred={roofProcess.before} po={roofProcess.after} />
        </Reveal>

        {/*
          Balíček kariet — mechanika v `globals.css`, sekcia 6.14.

          Inline štýly sú tie, ktoré sa líšia podľa karty: poradie (`--i`),
          z-index a mená časových osí. Karta ustupuje podľa príchodu
          NASLEDUJÚCEJ karty — preto jej `animationTimeline` ukazuje na meno
          ďalšej a `<ol>` cez `timelineScope` sprístupní mená všetkým.
          `isolate` drží z-indexy vnútri sekcie, pod hlavičkou webu.
        */}
        <ol
          className="priebeh-stoh relative isolate mt-16 lg:mt-24"
          style={{
            timelineScope: roofProcess.steps.map((_, i) => `--priebeh-${i}`).join(", "),
          } as React.CSSProperties}
        >
          {roofProcess.steps.map((step, i) => (
            <li
              key={step.number}
              className="priebeh-krok"
              style={
                {
                  "--i": i,
                  zIndex: i + 1,
                  viewTimelineName: `--priebeh-${i}`,
                  animationTimeline:
                    i < roofProcess.steps.length - 1 ? `--priebeh-${i + 1}` : undefined,
                } as React.CSSProperties
              }
            >
              <article className="grid h-full grid-rows-[auto_minmax(0,1fr)] gap-6 overflow-clip rounded-panel border border-white/10 bg-dark-2 p-5 shadow-[0_-12px_40px_-16px_rgba(0,0,0,0.5)] sm:p-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:grid-rows-1 lg:gap-12 lg:p-10">
                <div className="flex flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-eyebrow uppercase text-accent">
                      Krok {step.number} z {pocet}
                    </p>
                    <span aria-hidden="true" className="tabular text-sm font-semibold text-white/40">
                      ({step.number})
                    </span>
                  </div>

                  <h3 className="text-h2 mt-4 text-balance text-white lg:mt-8">
                    {step.title}
                  </h3>

                  <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-white/65 md:text-base lg:mt-6">
                    {step.text}
                  </p>
                </div>

                <div
                  className={`grid min-h-0 gap-3 ${
                    step.photos.length > 1 ? "grid-cols-2" : ""
                  }`}
                >
                  {step.photos.map((p) => (
                    <div key={p.alt} className="relative min-h-0 overflow-clip rounded-card">
                      <Image
                        src={p.photo}
                        alt={p.alt}
                        fill
                        loading="lazy"
                        // ~1,5× šírky — pri presnej šírke prehliadač fotku
                        // pri zmenšení zjemní. Viď Gallery.tsx.
                        sizes={
                          step.photos.length > 1
                            ? "(min-width: 1240px) 480px, 75vw"
                            : "(min-width: 1240px) 960px, 100vw"
                        }
                        quality={80}
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ol>

        <Reveal className="mt-16 flex flex-col items-start gap-5 sm:flex-row sm:items-center lg:mt-24">
          <a href="/kalkulator" className="btn btn-dark">
            {roofProcess.cta}
            <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
          </a>
          <Link
            href="/sluzby/vymena-strechy"
            className="text-sm font-semibold text-dark underline decoration-line underline-offset-4 transition-colors duration-[var(--d-micro)] hover:decoration-accent"
          >
            Ako prebieha výmena strechy
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
