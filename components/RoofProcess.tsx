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
              {(() => {
                /*
                  Posledná karta je finále: akcentová farba značky (tá istá
                  ako hlavné tlačidlá webu) a výzva priamo pri hotovej streche.
                  Samostatný riadok s tlačidlom pod balíčkom bol prehliadnuteľný.
                */
                const finale = i === roofProcess.steps.length - 1;

                return (
                  <article
                    className={`grid h-full ${finale ? "grid-rows-1" : "grid-rows-[auto_minmax(0,1fr)]"} gap-6 overflow-clip rounded-panel border p-5 shadow-[0_-12px_40px_-16px_rgba(0,0,0,0.5)] sm:p-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:grid-rows-1 lg:gap-12 lg:p-10 ${
                      finale ? "border-dark/10 bg-accent" : "border-white/10 bg-dark-2"
                    }`}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-start justify-between gap-4">
                        <p
                          className={`text-eyebrow uppercase ${
                            finale ? "text-dark/60" : "text-accent"
                          }`}
                        >
                          Krok {step.number} z {pocet}
                        </p>
                        <span
                          aria-hidden="true"
                          className={`tabular text-sm font-semibold ${
                            finale ? "text-dark/45" : "text-white/40"
                          }`}
                        >
                          ({step.number})
                        </span>
                      </div>

                      <h3
                        className={`text-h2 mt-4 text-balance lg:mt-8 ${
                          finale ? "text-dark" : "text-white"
                        }`}
                      >
                        {step.title}
                      </h3>

                      <p
                        className={`mt-4 max-w-[46ch] text-[15px] leading-relaxed md:text-base lg:mt-6 ${
                          finale ? "text-dark/75" : "text-white/65"
                        }`}
                      >
                        {step.text}
                      </p>

                      {finale ? (
                        <>
                        {/* Rozpera: výzva sa pritlačí k spodku karty, no od textu ostane aspoň 1,5 rem. */}
                        <div aria-hidden="true" className="min-h-6 flex-1" />
                        <div className="border-t border-dark/15 pt-6 lg:pt-8">
                          <p className="max-w-[40ch] text-sm leading-relaxed text-dark/75">
                            {roofProcess.ctaPopis}
                          </p>
                          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                            <a
                              href="/kalkulator"
                              className="btn btn-dark btn-velke group"
                            >
                              {roofProcess.cta}
                              <ArrowRight
                                size={18}
                                strokeWidth={2.5}
                                aria-hidden="true"
                                className="transition-transform duration-[var(--d-short)] group-hover:translate-x-1"
                              />
                            </a>
                            <Link
                              href="/sluzby/vymena-strechy"
                              className="text-sm font-semibold text-dark underline decoration-dark/30 underline-offset-4 transition-colors duration-[var(--d-micro)] hover:decoration-dark"
                            >
                              {roofProcess.ctaDruhy}
                            </Link>
                          </div>
                        </div>
                        </>
                      ) : null}
                    </div>

                    {/*
                      Vo finále je fotka len od lg. Na iPhone je karta nízka
                      (Safari počíta výšku okna bez lišty, ~460 px) a po texte
                      s výzvou z fotky zostal len prúžok. Hotovú strechu
                      zákazník práve videl v posuvníku aj v krokoch vyššie.
                    */}
                    <div
                      className={`min-h-0 gap-3 ${finale ? "hidden lg:grid" : "grid"} ${
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
                );
              })()}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
