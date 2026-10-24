import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Phone } from "lucide-react";
import HeroPodstranky from "@/components/HeroPodstranky";
import Reveal from "@/components/Reveal";
import { company } from "@/lib/content";
import { hero } from "@/lib/images";
import { clanky } from "@/lib/radca";

const title = "Radca — ceny, krytiny, povolenia a dotácie";
const description =
  "Odpovede na otázky o strechách: koľko stojí strecha, plech alebo škridla, kedy treba povolenie, prečo strecha zateká a kedy sa dá získať dotácia.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/radca" },
  openGraph: {
    type: "website",
    url: `${company.url}/radca`,
    title: `${title} | ${company.name}`,
    description,
  },
};

export default function Page() {
  return (
    <>
      <HeroPodstranky
        ariaLabel="Radca"
        foto={{ src: hero.src, alt: hero.alt }}
        drobceky={[{ label: "Úvod", href: "/" }, { label: "Radca" }]}
        pill="Radca · strechy na Orave"
        ikona={<BookOpen size={13} strokeWidth={2.5} aria-hidden="true" />}
        nadpis={{ pred: "Čo potrebujete ", zvyraznene: "vedieť", za: " o streche" }}
        lead="Odpovede na otázky, ktoré dostávame najčastejšie — ešte predtým, než sa niekto rozhodne strechu stavať alebo meniť."
        fakty={clanky.map((c) => c.navLabel)}
        akcie={
          <>
            <a href="#clanky" className="btn btn-accent">
              Prejsť na články
              <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
            </a>
            <a
              href={company.phoneHref}
              className="btn border border-white/22 text-white backdrop-blur-sm hover:bg-white/10"
            >
              <Phone size={16} strokeWidth={2.5} aria-hidden="true" />
              <span className="tabular">{company.phone}</span>
            </a>
          </>
        }
      />

      <section id="clanky" aria-label="Články" className="section-y bg-white">
        <div className="container-max">
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {clanky.map((c, i) => (
              <Reveal as="li" key={c.slug} index={i}>
                <Link
                  href={`/radca/${c.slug}`}
                  className="group flex h-full flex-col rounded-panel border border-line bg-white p-6 transition-[transform,box-shadow] duration-[var(--d-short)] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] md:p-8"
                >
                  <p className="text-eyebrow uppercase text-muted">
                    {c.pill.replace("Radca · ", "")}
                  </p>
                  <h2 className="text-h3 mt-3 text-balance text-dark">{c.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{c.perex}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-dark">
                    {c.odkazText}
                    <ArrowRight
                      size={16}
                      strokeWidth={2.5}
                      aria-hidden="true"
                      className="transition-transform duration-[var(--d-short)] group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}

            <Reveal as="li" index={clanky.length}>
              <Link
                href="/kalkulator"
                className="group flex h-full flex-col rounded-panel border border-line bg-light p-6 transition-[transform,box-shadow] duration-[var(--d-short)] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] md:p-8"
              >
                <p className="text-eyebrow uppercase text-muted">Nástroj</p>
                <h2 className="text-h3 mt-3 text-balance text-dark">Kalkulačka ceny strechy</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  Orientačná cena vašej strechy s rozpisom na materiál a prácu.
                  Zadáte tvar a plochu, zvyšok dopočítame.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-dark">
                  Vypočítať cenu strechy
                  <ArrowRight
                    size={16}
                    strokeWidth={2.5}
                    aria-hidden="true"
                    className="transition-transform duration-[var(--d-short)] group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </Reveal>
          </ul>
        </div>
      </section>
    </>
  );
}
