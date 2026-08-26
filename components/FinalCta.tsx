import { ArrowRight, Phone } from "lucide-react";
import Reveal from "@/components/Reveal";
import { company, finalCta } from "@/lib/content";

export default function FinalCta() {
  return (
    <section aria-labelledby="cta-nadpis" className="section-y bg-light">
      <div className="container-max">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 id="cta-nadpis" className="text-h2 text-balance text-dark">
            {finalCta.titleBefore}
            <span className="mark">{finalCta.titleMark}</span>
            {finalCta.titleAfter}
          </h2>

          <p className="text-lead mx-auto mt-5 max-w-[46ch] text-muted">
            {finalCta.text}
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <a href="/kalkulator" className="btn btn-accent">
              Získať cenovú ponuku
              <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
            </a>
            <a
              href={company.phoneHref}
              className="btn border border-line text-dark hover:bg-white"
            >
              <Phone size={16} strokeWidth={2.5} aria-hidden="true" />
              <span className="tabular">Zavolať {company.phone}</span>
            </a>
          </div>

          <p className="mt-7 text-xs text-muted">{finalCta.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
