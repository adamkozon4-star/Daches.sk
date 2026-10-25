import { ArrowRight, Check, House, Phone, RefreshCw, Triangle, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { calculator, company } from "@/lib/content";
import { typyProjektu } from "@/lib/kalkulator/moznosti";
import type { TypProjektu } from "@/lib/kalkulator/typy";

const ikony: Record<TypProjektu, LucideIcon> = {
  strecha_komplet: House,
  rekonstrukcia: RefreshCw,
  krov: Triangle,
  oprava: Wrench,
};

/**
 * Sekcia Kalkulácia na úvodnej stránke.
 *
 * ── Prečo takto ─────────────────────────────────────────────────────────
 * Pôvodne tu bol nadpis, poznámka, štyri kroky postupu (tie isté sú už
 * v sekcii „Ako to prebieha"), panel s tlačidlom a druhý panel s telefónom.
 * Veľa čítania a rozhodnutie „spustiť kalkulátor, či nie" zostalo na
 * návštevníkovi.
 *
 * Teraz sekcia rovno položí PRVÚ OTÁZKU kalkulátora. Odpoveď je jeden klik
 * a otvorí kalkulátor s vybranou voľbou (`/kalkulator?projekt=…`) —
 * návštevník je v kalkulátore skôr, než sa stihne rozmýšľať, či do neho
 * vôbec ísť.
 *
 * Odkazy sú zámerne obyčajné <a>, nie <Link>: kalkulátor sa tak na úvodnej
 * neprefetchuje a jeho JavaScript sa nenačíta, kým oň niekto nepožiada.
 */
export default function Calculator() {
  return (
    <section
      id="kalkulacia"
      aria-labelledby="kalkulacia-nadpis"
      className="section-y relative overflow-hidden bg-dark"
    >
      <div className="glow-accent -right-40 top-10 h-[560px] w-[560px]" />

      <div className="container-max relative grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
        <div>
          <SectionHeading
            id="kalkulacia-nadpis"
            eyebrow={calculator.eyebrow}
            before={calculator.titleBefore}
            mark={calculator.titleMark}
            after={calculator.titleAfter}
            lead={calculator.lead}
            light
          />

          <Reveal index={1}>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {calculator.vyhody.map((v) => (
                <li key={v} className="flex items-center gap-2 text-sm font-semibold text-white">
                  <span
                    aria-hidden="true"
                    className="grid h-5 w-5 place-items-center rounded-full bg-accent text-dark"
                  >
                    <Check size={12} strokeWidth={3.5} />
                  </span>
                  {v}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal index={2} className="mt-10 hidden border-t border-line-dark pt-6 lg:block">
            <p className="text-sm text-white/50">{calculator.zavolat}</p>
            <a
              href={company.phoneHref}
              className="tabular mt-2 inline-flex items-center gap-3 text-h3 text-white transition-colors duration-[var(--d-micro)] hover:text-accent"
            >
              <Phone size={20} strokeWidth={2.25} aria-hidden="true" />
              {company.phone}
            </a>
          </Reveal>
        </div>

        <Reveal
          variant="scale"
          className="rounded-panel border border-white/12 bg-white/[0.04] p-5 backdrop-blur-sm sm:p-7 lg:p-8"
        >
          <p className="text-eyebrow uppercase text-accent">Začnite tu</p>
          <h3 className="text-h3 mt-3 text-white lg:text-2xl">{calculator.otazka}</h3>

          <ul className="mt-6 flex flex-col gap-3">
            {typyProjektu.map((t) => {
              const Ikona = ikony[t.id];

              return (
                <li key={t.id}>
                  <a
                    href={`/kalkulator?projekt=${t.id}`}
                    className="group flex items-center gap-4 rounded-card border border-white/10 bg-dark-2 p-4 transition-[border-color,background-color,transform] duration-[var(--d-short)] hover:-translate-y-0.5 hover:border-accent/70 hover:bg-white/[0.06] sm:p-5"
                  >
                    <span
                      aria-hidden="true"
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-card bg-white/[0.06] text-accent transition-colors duration-[var(--d-short)] group-hover:bg-accent group-hover:text-dark"
                    >
                      <Ikona size={22} strokeWidth={2} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-base font-semibold text-white">
                        {t.nazov}
                      </span>
                      <span className="mt-0.5 block text-sm leading-snug text-white/55">
                        {t.popis}
                      </span>
                    </span>

                    <ArrowRight
                      size={20}
                      strokeWidth={2.5}
                      aria-hidden="true"
                      className="shrink-0 text-white/35 transition-[color,transform] duration-[var(--d-short)] group-hover:translate-x-1 group-hover:text-accent"
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <p className="mt-5 text-xs leading-relaxed text-white/55">{calculator.poznamka}</p>

          {/* Na mobile je telefón tu — ľavý stĺpec s ním je skrytý. */}
          <a
            href={company.phoneHref}
            className="tabular mt-5 flex items-center justify-center gap-2 border-t border-line-dark pt-5 text-sm font-semibold text-white lg:hidden"
          >
            <Phone size={16} strokeWidth={2.25} aria-hidden="true" />
            {calculator.zavolat} {company.phone}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
