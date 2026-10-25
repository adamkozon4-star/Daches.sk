import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, HardHat, Phone } from "lucide-react";
import DopytForm from "@/components/sluzby/DopytForm";
import Faq from "@/components/Faq";
import HeroPodstranky from "@/components/HeroPodstranky";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { IndexKapitol, Kapitoly } from "@/components/sluzby/Kapitoly";
import { areaServed, company } from "@/lib/content";
import { clankyKSluzbe } from "@/lib/radca";
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

  /** Články radcu, ktoré na túto službu odkazujú — odkaz ide aj naspäť. */
  const zRadcu = clankyKSluzbe(s.slug);

  /**
   * Rozsah prác pre `OfferCatalog` sa berie z kapitol — je to blok typu
   * `zoznam`. Nech je zoznam služieb v schéme vždy ten istý, ktorý číta
   * návštevník, a nie druhá kópia udržiavaná osobitne.
   */
  const rozsah = s.kapitoly
    .flatMap((k) => k.bloky)
    .find((b) => b.typ === "zoznam");

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
    ...(rozsah
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: rozsah.nadpis,
            itemListElement: rozsah.polozky.map((nazov) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: nazov },
            })),
          },
        }
      : {}),
  };

  return (
    <>
      {/* ---------- Úvod ---------- */}
      <HeroPodstranky
        ariaLabel={s.navLabel}
        foto={s.foto}
        drobceky={[
          { label: "Úvod", href: "/" },
          { label: "Služby", href: "/#sluzby" },
          { label: s.navLabel },
        ]}
        pill={s.pill}
        ikona={<HardHat size={13} strokeWidth={2.5} aria-hidden="true" />}
        nadpis={s.nadpis}
        lead={s.lead}
        fakty={s.fakty}
        akcie={
          <>
            {s.bezKalkulatora ? (
              <a href="#dopyt" className="btn btn-accent">
                Poslať nezáväzný dopyt
                <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
              </a>
            ) : (
              <a href="/kalkulator" className="btn btn-accent">
                Vypočítať orientačnú cenu
                <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
              </a>
            )}
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

      <IndexKapitol kapitoly={s.kapitoly} />

      <Kapitoly kapitoly={s.kapitoly} />

      {/* ---------- Cena ---------- */}
      <section aria-labelledby="cena" className="section-y bg-dark">
        <div className="container-max">
          <Reveal className="rounded-panel border border-white/8 bg-dark-2 px-6 py-10 md:px-12 md:py-14">
            <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
              <div>
                <p className="eyebrow text-eyebrow uppercase text-accent">
                  {s.bezKalkulatora ? "Cena" : "Orientačná cena"}
                </p>
                <h2 id="cena" className="text-h2 mt-5 text-balance text-white">
                  Koľko to bude stáť
                </h2>
                <p className="text-lead mt-5 max-w-[54ch] text-white/60">
                  {s.bezKalkulatora
                    ? s.bezKalkulatora.text
                    : "Zadáte tvar a plochu strechy, bežné metre klampiarskych prvkov dopočítame za vás. Dostanete rozsah s rozpisom na materiál a prácu — bez registrácie a bez čakania na odpoveď."}
                </p>
              </div>

              <div className="flex flex-col gap-3 lg:items-end">
                {/* Opravy kalkulátor neoceňuje — tlačidlo by viedlo do slepej uličky. */}
                {s.bezKalkulatora ? (
                  <a href="#dopyt" className="btn btn-accent w-full justify-center sm:w-auto">
                    Poslať nezáväzný dopyt
                    <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
                  </a>
                ) : (
                  <>
                    <a href="/kalkulator" className="btn btn-accent w-full justify-center sm:w-auto">
                      Spustiť kalkulátor
                      <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
                    </a>
                    {/* Druhá cesta pre toho, kto si cenu rátať nechce. */}
                    <a
                      href="#dopyt"
                      className="btn w-full justify-center border border-white/22 text-white hover:bg-white/10 sm:w-auto"
                    >
                      Radšej mi napíšte
                    </a>
                  </>
                )}
                <p className="max-w-[34ch] text-sm leading-relaxed text-white/45 lg:text-right">
                  Záväznú cenu povieme po bezplatnej obhliadke — tú zadarmo
                  nenahradí žiadny výpočet.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Dopyt ---------- */}
      {/*
        Dopyt pred FAQ zámerne.

        Kto doskroloval cez celú kapitolu o cene, už je rozhodnutý sa
        ozvať — v tej chvíli má mať kam. FAQ je pre toho, kto ešte váha,
        a tomu formulár nikam neutečie: pod otázkami je ďalšie CTA.
      */}
      <section
        id="dopyt"
        aria-labelledby="dopyt-nadpis"
        className="section-y bg-light"
      >
        <div className="container-max">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <p className="eyebrow text-eyebrow uppercase text-muted">
                Nezáväzný dopyt
              </p>
              <h2
                id="dopyt-nadpis"
                className="text-h2 mt-5 text-balance text-dark"
              >
                Napíšte nám a <span className="mark">ozveme sa</span> vám
              </h2>
              <p className="text-lead mt-5 max-w-[46ch] text-muted">
                Stačí meno, telefón a e-mail. Zvyšok si povieme — a ak to
                z opisu nepôjde posúdiť, prídeme sa pozrieť.
              </p>

              <ul className="mt-8 flex flex-col gap-3">
                {[
                  "Obhliadka je bezplatná a nezáväzná",
                  "Odpovedáme aj na fotky poslané e-mailom",
                  "Cenu hovoríme až po posúdení stavby",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check
                      size={17}
                      strokeWidth={2.5}
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-dark"
                    />
                    <span className="text-[15px] leading-relaxed text-dark/80">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/*
                Obce, kde firma pôsobí — lokálny signál pre Google aj pre
                návštevníka, ktorý chce vedieť, či k nemu prídeme.
              */}
              <p className="mt-6 text-sm leading-relaxed text-muted">
                Pôsobíme na celej Orave — {areaServed.join(" · ")} a okolie.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <DopytForm sluzba={s.navLabel} />
            </Reveal>
          </div>
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

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
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

          {zRadcu.length ? (
            <div className="mt-16 border-t border-line pt-10 lg:mt-20">
              <h3 className="text-eyebrow uppercase text-muted">Z radcu</h3>
              <ul className="mt-5 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                {zRadcu.map((d) => (
                  <li key={d.slug}>
                    <Link
                      href={`/radca/${d.slug}`}
                      className="group inline-flex items-center gap-2 text-[15px] font-semibold text-dark transition-colors duration-[var(--d-micro)] hover:text-accent-hover"
                    >
                      {d.title}
                      <ArrowRight
                        size={15}
                        strokeWidth={2.5}
                        aria-hidden="true"
                        className="shrink-0 transition-transform duration-[var(--d-short)] group-hover:translate-x-1"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
