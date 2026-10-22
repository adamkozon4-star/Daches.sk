import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Phone } from "lucide-react";
import Drobceky from "@/components/Drobceky";
import Faq from "@/components/Faq";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { areaServed, company } from "@/lib/content";
import { najdiSluzbu, sluzby } from "@/lib/sluzby";

type Props = { params: Promise<{ sluzba: string }> };

/** Všetky podstránky sa predgenerujú — sú statické, žiadna beží na požiadanie. */
export function generateStaticParams() {
  return sluzby.map((s) => ({ sluzba: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sluzba } = await params;
  const s = najdiSluzbu(sluzba);

  if (!s) return {};

  return {
    title: s.title,
    description: s.description,
    alternates: { canonical: `/sluzby/${s.slug}` },
    // Bez tohto by si podstránka zdedila `og:url` úvodnej stránky
    // a pri zdieľaní odkazu by sa ukázal náhľad úvodnej.
    openGraph: {
      type: "article",
      url: `${company.url}/sluzby/${s.slug}`,
      title: `${s.title} | ${company.name}`,
      description: s.description,
    },
  };
}

export default async function Page({ params }: Props) {
  const { sluzba } = await params;
  const s = najdiSluzbu(sluzba);

  if (!s) notFound();

  const suvisiace = s.suvisiace
    .map((slug) => najdiSluzbu(slug))
    .filter((x) => x !== undefined);

  /**
   * `Service` naviazaný na firmu z `app/layout.tsx` cez `@id` — organizácia
   * sa tým nezdvojuje, len sa na ňu odkáže ako na poskytovateľa.
   */
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.navLabel,
    description: s.description,
    url: `${company.url}/sluzby/${s.slug}`,
    serviceType: s.navLabel,
    provider: { "@id": `${company.url}/#business` },
    areaServed: areaServed.map((name) => ({ "@type": "City", name })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: s.rozsah.nadpis,
      itemListElement: s.rozsah.polozky.map((nazov) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: nazov },
      })),
    },
  };

  return (
    <>
      {/* ---------- Úvod ---------- */}
      <section className="bg-dark pb-16 pt-[calc(var(--header-h)+2.5rem)] md:pb-24">
        <div className="container-max">
          <div className="[&_a]:text-white/55 [&_a:hover]:text-white [&_span]:text-white/85 [&_svg]:text-white/35">
            <Drobceky
              polozky={[
                { label: "Úvod", href: "/" },
                { label: "Služby", href: "/#sluzby" },
                { label: s.navLabel },
              ]}
            />
          </div>

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
            <Reveal>
              <h1 className="text-h2 text-balance text-white">{s.nadpis}</h1>
              <p className="text-lead mt-5 max-w-[56ch] text-white/60">{s.lead}</p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a href="/kalkulator" className="btn btn-accent">
                  Vypočítať orientačnú cenu
                  <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
                </a>
                <a
                  href={company.phoneHref}
                  className="btn border border-line-dark text-white hover:bg-white/5"
                >
                  <Phone size={16} strokeWidth={2.5} aria-hidden="true" />
                  <span className="tabular">{company.phone}</span>
                </a>
              </div>
            </Reveal>

            <Reveal variant="mask" className="overflow-hidden rounded-panel">
              <Image
                src={s.foto.src}
                alt={s.foto.alt}
                priority
                sizes="(min-width: 1240px) 620px, (min-width: 1024px) 50vw, 100vw"
                quality={80}
                className="aspect-[4/3] w-full object-cover"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Úvodný text + karty ---------- */}
      <section aria-labelledby="prehlad" className="section-y bg-white">
        <div className="container-max">
          <Reveal className="max-w-[62ch]">
            <h2 id="prehlad" className="sr-only">
              {s.navLabel} — prehľad
            </h2>
            {s.uvod.map((odsek) => (
              <p key={odsek} className="text-lead mb-5 text-dark/80 last:mb-0">
                {odsek}
              </p>
            ))}
          </Reveal>

          <h3 className="text-h3 mt-16 text-dark">{s.karty.nadpis}</h3>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2">
            {s.karty.polozky.map((k, i) => (
              <Reveal as="li" key={k.nazov} index={i} variant="up">
                <article className="h-full rounded-panel border border-line bg-white p-6 transition-[transform,box-shadow] duration-[var(--d-short)] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                  <h4 className="text-h3 text-dark">{k.nazov}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{k.text}</p>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Rozsah prác ---------- */}
      <section aria-labelledby="rozsah" className="section-y bg-light">
        <div className="container-max">
          <SectionHeading
            id="rozsah"
            eyebrow="Rozsah prác"
            before={s.rozsah.nadpis}
            lead={s.rozsah.lead}
          />

          <ul className="mt-12 grid gap-x-10 gap-y-4 md:grid-cols-2 lg:mt-16">
            {s.rozsah.polozky.map((p, i) => (
              <Reveal
                as="li"
                key={p}
                index={i}
                step={60}
                className="flex items-start gap-3 border-b border-line pb-4"
              >
                <Check
                  size={18}
                  strokeWidth={2.5}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-dark"
                />
                <span className="text-[15px] leading-relaxed text-dark/80">{p}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Voľné bloky ---------- */}
      {s.bloky.length ? (
        <section aria-label="Doplňujúce informácie" className="section-y bg-white">
          <div className="container-max">
            <div className="grid gap-10 md:grid-cols-2 lg:gap-x-16 lg:gap-y-14">
              {s.bloky.map((b, i) => (
                <Reveal key={b.nadpis} index={i} className="max-w-[56ch]">
                  <h2 className="text-h3 text-dark">{b.nadpis}</h2>
                  {b.odseky.map((o) => (
                    <p
                      key={o}
                      className="mt-3 text-[15px] leading-relaxed text-muted"
                    >
                      {o}
                    </p>
                  ))}

                  {/* Odkaz na zdokumentovanú zákazku patrí k bloku o priebehu. */}
                  {b.nadpis === "Ako to vyzerá v praxi" ? (
                    <Link
                      href="/#priebeh"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-dark"
                    >
                      Pozrieť priebeh realizácie na fotkách
                      <ArrowRight size={15} strokeWidth={2.5} aria-hidden="true" />
                    </Link>
                  ) : null}
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ---------- Cena ---------- */}
      <section aria-labelledby="cena" className="section-y bg-dark">
        <div className="container-max">
          <Reveal className="rounded-panel border border-white/8 bg-dark-2 px-6 py-10 md:px-12 md:py-14">
            <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
              <div>
                <p className="eyebrow text-eyebrow uppercase text-accent">
                  Orientačná cena
                </p>
                <h2 id="cena" className="text-h2 mt-5 text-balance text-white">
                  Koľko to bude stáť
                </h2>
                <p className="text-lead mt-5 max-w-[54ch] text-white/60">
                  Zadáte tvar a plochu strechy, bežné metre klampiarskych prvkov
                  dopočítame za vás. Dostanete rozsah s rozpisom na materiál
                  a prácu — bez registrácie a bez čakania na odpoveď.
                </p>
              </div>

              <div className="flex flex-col gap-3 lg:items-end">
                <a href="/kalkulator" className="btn btn-accent w-full justify-center sm:w-auto">
                  Spustiť kalkulátor
                  <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
                </a>
                <p className="max-w-[34ch] text-sm leading-relaxed text-white/45 lg:text-right">
                  Záväznú cenu povieme po bezplatnej obhliadke — tú zadarmo
                  nenahradí žiadny výpočet.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <Faq polozky={s.faq} />

      {/* ---------- Súvisiace + kontakt ---------- */}
      <section aria-labelledby="dalej" className="section-y bg-white">
        <div className="container-max">
          <SectionHeading
            id="dalej"
            eyebrow="Ďalej"
            before="Mohlo by vás "
            mark="zaujímať"
          />

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14">
            {suvisiace.map((d, i) => (
              <Reveal as="li" key={d.slug} index={i}>
                <Link
                  href={`/sluzby/${d.slug}`}
                  className="group flex h-full flex-col rounded-panel border border-line bg-white p-6 transition-[transform,box-shadow] duration-[var(--d-short)] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
                >
                  <h3 className="text-h3 text-dark">{d.navLabel}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {d.lead}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-dark">
                    {d.odkazText}
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

            <Reveal as="li" index={suvisiace.length}>
              <Link
                href="/#kontakt"
                className="group flex h-full flex-col rounded-panel border border-line bg-light p-6 transition-[transform,box-shadow] duration-[var(--d-short)] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
              >
                <h3 className="text-h3 text-dark">Nezáväzná obhliadka</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  Prídeme sa pozrieť, povieme, čo strecha potrebuje, a pripravíme
                  cenovú ponuku. Obhliadka je bezplatná.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-dark">
                  Kontaktovať Daches
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
