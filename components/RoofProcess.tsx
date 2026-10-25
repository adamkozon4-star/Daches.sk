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
 * Posuvník predtým/potom (jediný klientský kúsok, `PredPo`), os, ktorá sa
 * vypĺňa podľa scrollu po stred obrazovky, body krokov, ktoré sa na nej
 * rozsvietia, číslo kroku zaliate akcentom a fotky, ktoré sa odzoomujú.
 * Všetko okrem posuvníka je CSS — sekcia 6.14 v `globals.css`.
 *
 * ⚠️ Sekcia má `overflow-clip`, NIE `overflow-hidden` — hidden by z nej
 * urobil scroll kontajner a scroll-driven animácie vnútri by stáli.
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
          Chronologická os.

          Na mobile vedie koľaj po ľavom okraji a kroky sú odsadené, od lg
          ide stredom medzi textom a fotkou. Bod kroku je na koľaji v úrovni
          nadpisu (mobil) alebo v strede riadka (desktop).
        */}
        <ol className="relative mt-16 flex flex-col gap-16 pl-10 lg:mt-24 lg:gap-24 lg:pl-0">
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-[11px] w-0.5 overflow-clip rounded-full bg-line lg:left-1/2 lg:-translate-x-1/2"
          >
            <span className="priebeh-os-vypln absolute inset-0 rounded-full bg-dark" />
          </span>

          {roofProcess.steps.map((step, i) => {
            const obrazokVpravo = i % 2 === 1;

            return (
              <li
                key={step.number}
                className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-24"
              >
                <span
                  aria-hidden="true"
                  className="priebeh-bod absolute -left-[35px] top-3 h-3.5 w-3.5 rounded-full border-2 border-dark/20 bg-white lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2"
                />

                <Reveal
                  variant={obrazokVpravo ? "right" : "left"}
                  className={obrazokVpravo ? "lg:order-2" : ""}
                >
                  <span aria-hidden="true" className="priebeh-cislo tabular block">
                    {step.number}
                  </span>

                  <p className="text-eyebrow mt-6 uppercase text-muted">
                    Krok {step.number} z {pocet}
                  </p>
                  <h3 className="text-h3 mt-2 text-dark lg:text-[1.625rem]">
                    {step.title}
                  </h3>

                  <p className="mt-4 max-w-[54ch] text-[15px] leading-relaxed text-muted md:text-base">
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
                      variant="up"
                      index={pi}
                      step={140}
                      // `overflow-clip`, nie hidden — viď komentár vyššie.
                      className="priebeh-foto overflow-clip rounded-panel"
                    >
                      <Image
                        src={p.photo}
                        alt={p.alt}
                        loading="lazy"
                        // ~1,5× šírky dlaždice — pri presnej šírke prehliadač
                        // fotku pri zmenšení zjemní. Viď Gallery.tsx.
                        sizes={
                          step.photos.length > 1
                            ? "(min-width: 1240px) 400px, (min-width: 640px) 40vw, 100vw"
                            : "(min-width: 1240px) 840px, (min-width: 1024px) 75vw, 100vw"
                        }
                        quality={80}
                        className={`w-full object-cover ${
                          step.photos.length > 1 ? "aspect-[3/4]" : "aspect-[4/3]"
                        }`}
                      />
                    </Reveal>
                  ))}
                </div>
              </li>
            );
          })}
        </ol>

        <Reveal className="mt-16 flex flex-col items-start gap-5 pl-10 sm:flex-row sm:items-center lg:mt-24 lg:pl-0">
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
