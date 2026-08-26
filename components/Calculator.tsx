import { ArrowRight, Mail, Phone } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { calculator, company } from "@/lib/content";

/**
 * Sekcia na úvodnej stránke vysvetľuje postup a odkazuje na samostatnú
 * stránku /kalkulator. Samotný kalkulátor sa tak na úvodnej vôbec nenačíta
 * — odkaz je zámerne obyčajný <a>, aby si ho Next neprefetchoval.
 */
export default function Calculator() {
  return (
    <section
      id="kalkulacia"
      aria-labelledby="kalkulacia-nadpis"
      className="section-y relative overflow-hidden bg-dark"
    >
      <div className="glow-accent -right-40 top-10 h-[560px] w-[560px]" />

      <div className="container-max relative">
        <SectionHeading
          id="kalkulacia-nadpis"
          eyebrow={calculator.eyebrow}
          before={calculator.titleBefore}
          mark={calculator.titleMark}
          lead={calculator.lead}
          light
        />

        <Reveal index={1} className="mt-5">
          <p className="text-sm text-white/45">{calculator.note}</p>
        </Reveal>

        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {calculator.steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.number}
              index={i}
              step={90}
              className="border-t border-line-dark pt-5"
            >
              <span className="tabular text-eyebrow text-accent">
                {step.number}
              </span>
              <h3 className="text-h3 mt-3 text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/58">
                {step.text}
              </p>
            </Reveal>
          ))}
        </ol>

        <div className="mt-14 grid gap-5 lg:mt-20 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <Reveal
            variant="scale"
            className="grid min-h-[340px] place-items-center rounded-panel border border-white/12 bg-white/[0.04] p-10 text-center"
          >
            <div>
              <p className="text-eyebrow uppercase text-accent">
                Orientačná cena za pár minút
              </p>
              <h3 className="text-h3 mt-4 max-w-[38ch] text-white">
                Zadáte tvar a plochu strechy, zvyšok dopočítame
              </h3>
              <p className="mx-auto mt-3 max-w-[46ch] text-sm leading-relaxed text-white/58">
                Bežné metre klampiarskych prvkov nemusíte merať — odvodíme ich
                z tvaru a sklonu strechy. Na konci dostanete položkový rozpis
                a rozsah ceny.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a href="/kalkulator" className="btn btn-accent">
                  Spustiť kalkulátor
                  <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
                </a>
                <a href={company.phoneHref} className="btn btn-outline-light">
                  <Phone size={17} strokeWidth={2.5} aria-hidden="true" />
                  <span className="tabular">{company.phone}</span>
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal
            variant="scale"
            delay={150}
            className="rounded-panel border border-white/8 bg-dark-2 p-8"
          >
            <h3 className="text-h3 text-white">Radšej zavoláte?</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/58">
              Radi vám poradíme aj telefonicky. Zavolajte alebo napíšte,
              prejdeme si projekt spolu.
            </p>

            <div className="mt-7 flex flex-col gap-3">
              <a
                href={company.phoneHref}
                className="tabular flex items-center gap-3 text-base font-semibold text-white transition-colors duration-[var(--d-micro)] hover:text-accent"
              >
                <Phone size={17} strokeWidth={2} aria-hidden="true" />
                {company.phone}
              </a>
              <a
                href={`mailto:${company.email}`}
                className="flex items-center gap-3 text-base font-semibold text-white transition-colors duration-[var(--d-micro)] hover:text-accent"
              >
                <Mail size={17} strokeWidth={2} aria-hidden="true" />
                {company.email}
              </a>
            </div>

            <p className="mt-8 border-t border-line-dark pt-6 text-xs leading-relaxed text-white/40">
              Nezáväzne. Najskôr si prejdeme váš projekt a dohodneme ďalší
              postup.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
