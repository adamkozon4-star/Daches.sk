import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, Check, ExternalLink, Phone } from "lucide-react";
import DopytForm from "@/components/sluzby/DopytForm";
import Faq from "@/components/Faq";
import HeroPodstranky from "@/components/HeroPodstranky";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { IndexKapitol, Kapitoly } from "@/components/sluzby/Kapitoly";
import { company } from "@/lib/content";
import { clanky, najdiClanok, type Clanok } from "@/lib/radca";
import { najdiSluzbu } from "@/lib/sluzby";

type Props = { params: Promise<{ clanok: string }> };

export function generateStaticParams() {
  return clanky.map((c) => ({ clanok: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { clanok } = await params;
  const c = najdiClanok(clanok);

  if (!c) return {};

  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: `/radca/${c.slug}` },
    openGraph: {
      type: "article",
      url: `${company.url}/radca/${c.slug}`,
      title: `${c.title} | ${company.name}`,
      description: c.description,
      publishedTime: c.publikovane,
      modifiedTime: c.upravene,
    },
  };
}

/** „2026-10-25" → „25. 10. 2026" — bez `Intl`, nech výstup nezávisí od servera. */
const datum = (iso: string) => {
  const [r, m, d] = iso.split("-").map(Number);
  return `${d}. ${m}. ${r}`;
};

/** Čas čítania z textu článku pri ~200 slovách za minútu. */
const minutCitania = (c: Clanok) => {
  const texty = [
    c.perex,
    ...c.kapitoly.flatMap((k) => [
      k.tvrdenie,
      ...k.odseky,
      ...k.bloky.flatMap((b) => {
        switch (b.typ) {
          case "karty":
            return b.polozky.map((p) => `${p.nazov} ${p.text}`);
          case "vrstvy":
            return b.polozky.map((p) => `${p.nazov} ${p.text}`);
          case "zoznam":
            return b.polozky;
          case "porovnanie":
            return b.riadky.map((r) => `${r.parameter} ${r.a} ${r.b}`);
        }
      }),
    ]),
    ...c.faq.map((f) => `${f.otazka} ${f.odpoved}`),
  ];
  const slov = texty.join(" ").split(/\s+/).length;
  return Math.max(1, Math.round(slov / 200));
};

export default async function Page({ params }: Props) {
  const { clanok } = await params;
  const c = najdiClanok(clanok);

  if (!c) notFound();

  const sluzby = c.sluzby
    .map((slug) => najdiSluzbu(slug))
    .filter((x) => x !== undefined);
  const dalsie = clanky.filter((x) => x.slug !== c.slug);
  const url = `${company.url}/radca/${c.slug}`;

  /**
   * Autor aj vydavateľ je firma z `app/layout.tsx` — odkaz cez `@id`, nie
   * druhá kópia organizácie. Vymyslená osoba ako autor by bola klamstvo.
   */
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.title,
    description: c.description,
    url,
    mainEntityOfPage: url,
    inLanguage: "sk",
    datePublished: c.publikovane,
    dateModified: c.upravene,
    image: `${company.url}${c.foto.src.src}`,
    author: { "@id": `${company.url}/#business` },
    publisher: { "@id": `${company.url}/#business` },
  };

  return (
    <>
      <HeroPodstranky
        ariaLabel={c.navLabel}
        foto={c.foto}
        drobceky={[
          { label: "Úvod", href: "/" },
          { label: "Radca", href: "/radca" },
          { label: c.navLabel },
        ]}
        pill={c.pill}
        ikona={<BookOpen size={13} strokeWidth={2.5} aria-hidden="true" />}
        nadpis={c.nadpis}
        lead={c.perex}
        fakty={[
          `Aktualizované ${datum(c.upravene)}`,
          `${minutCitania(c)} min čítania`,
          ...(c.zdroje ? ["S odkazmi na zdroje"] : []),
        ]}
        akcie={
          <>
            <a href="/kalkulator" className="btn btn-accent">
              Vypočítať orientačnú cenu
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

      <IndexKapitol kapitoly={c.kapitoly} />

      <Kapitoly kapitoly={c.kapitoly} />

      {/* ---------- Zdroje ---------- */}
      {c.zdroje ? (
        <section
          aria-labelledby="zdroje"
          // Pokračuje striedanie pozadí za poslednou kapitolou.
          className={`pb-16 lg:pb-24 ${c.kapitoly.length % 2 === 0 ? "bg-light" : "bg-white"}`}
        >
          <div className="container-max">
            <Reveal className="rounded-panel border border-line p-6 md:p-8">
              <h2 id="zdroje" className="text-eyebrow uppercase text-muted">
                Zdroje
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {c.zdroje.map((z) => (
                  <li key={z.url}>
                    <a
                      href={z.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[15px] font-semibold text-dark underline decoration-line underline-offset-4 transition-colors duration-[var(--d-micro)] hover:decoration-accent"
                    >
                      {z.nazov}
                      <ExternalLink size={14} strokeWidth={2.5} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-muted">
                Informácie sme overili z uvedených zdrojov k dátumu aktualizácie
                článku. Pred rozhodnutím si overte aktuálny stav priamo u zdroja.
              </p>
            </Reveal>
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
                  Vaša strecha
                </p>
                <h2 id="cena" className="text-h2 mt-5 text-balance text-white">
                  Koľko by stála tá vaša
                </h2>
                <p className="text-lead mt-5 max-w-[54ch] text-white/60">
                  Zadáte tvar a plochu strechy a dostanete orientačný rozsah
                  s rozpisom na materiál a prácu — bez registrácie a bez
                  čakania na odpoveď.
                </p>
              </div>

              <div className="flex flex-col gap-3 lg:items-end">
                <a href="/kalkulator" className="btn btn-accent w-full justify-center sm:w-auto">
                  Spustiť kalkulátor
                  <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
                </a>
                <a
                  href="#dopyt"
                  className="btn w-full justify-center border border-white/22 text-white hover:bg-white/10 sm:w-auto"
                >
                  Radšej mi napíšte
                </a>
                <p className="max-w-[34ch] text-sm leading-relaxed text-white/45 lg:text-right">
                  Záväznú cenu povieme po bezplatnej obhliadke.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Dopyt ---------- */}
      <section id="dopyt" aria-labelledby="dopyt-nadpis" className="section-y bg-light">
        <div className="container-max">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <p className="eyebrow text-eyebrow uppercase text-muted">
                Nezáväzný dopyt
              </p>
              <h2 id="dopyt-nadpis" className="text-h2 mt-5 text-balance text-dark">
                Opýtajte sa <span className="mark">priamo nás</span>
              </h2>
              <p className="text-lead mt-5 max-w-[46ch] text-muted">
                Napíšte, čo riešite. Ak to z opisu nepôjde posúdiť, prídeme sa
                pozrieť.
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
                    <span className="text-[15px] leading-relaxed text-dark/80">{f}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120}>
              <DopytForm sluzba={`Radca: ${c.navLabel}`} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <Faq polozky={c.faq} />

      {/* ---------- Služby + ďalšie články ---------- */}
      <section aria-labelledby="dalej" className="section-y bg-white">
        <div className="container-max">
          <SectionHeading id="dalej" eyebrow="Ďalej" before="Súvisiace " mark="služby" />

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
            {sluzby.map((s, i) => (
              <Reveal as="li" key={s.slug} index={i}>
                <Link
                  href={`/sluzby/${s.slug}`}
                  className="group flex h-full flex-col rounded-panel border border-line bg-white p-6 transition-[transform,box-shadow] duration-[var(--d-short)] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
                >
                  <h3 className="text-h3 text-dark">{s.navLabel}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{s.lead}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-dark">
                    {s.odkazText}
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
          </ul>

          <div className="mt-16 border-t border-line pt-10 lg:mt-20">
            <h3 className="text-eyebrow uppercase text-muted">Ďalšie z radcu</h3>
            <ul className="mt-5 grid gap-x-10 gap-y-3 sm:grid-cols-2">
              {dalsie.map((d) => (
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
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
