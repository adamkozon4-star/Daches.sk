import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, MapPin, Phone } from "lucide-react";
import DopytForm from "@/components/sluzby/DopytForm";
import HeroPodstranky from "@/components/HeroPodstranky";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import KartaRealizacie from "@/components/realizacie/KartaRealizacie";
import { company } from "@/lib/content";
import { dalsieRealizacie, najdiRealizaciu, realizacie } from "@/lib/realizacie";
import { najdiSluzbu } from "@/lib/sluzby";

type Props = { params: Promise<{ realizacia: string }> };

export function generateStaticParams() {
  return realizacie.map((r) => ({ realizacia: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { realizacia } = await params;
  const r = najdiRealizaciu(realizacia);

  if (!r) return {};

  const hlavna = r.fotky[r.hlavna];

  return {
    title: r.title,
    description: r.description,
    alternates: { canonical: `/realizacie/${r.slug}` },
    openGraph: {
      type: "article",
      url: `${company.url}/realizacie/${r.slug}`,
      title: `${r.title} | ${company.name}`,
      description: r.description,
      images: [{ url: hlavna.src.src, width: hlavna.src.width, height: hlavna.src.height, alt: hlavna.popis }],
    },
  };
}

/**
 * Podstránka jednej realizácie — „Výmena strechy, Lomná".
 *
 * Cieľ je lokálne vyhľadávanie („strechár Lomná", „výmena strechy
 * Námestovo"): obec je v title, h1, alt textoch aj v drobčekoch.
 * Obsah je zámerne len to, čo je overené — príspevok na Facebooku
 * a fotky. Pozri hlavičku `lib/realizacie/index.ts`.
 */
export default async function Page({ params }: Props) {
  const { realizacia } = await params;
  const r = najdiRealizaciu(realizacia);

  if (!r) notFound();

  const sluzba = najdiSluzbu(r.sluzba);
  const dalsie = dalsieRealizacie(r);
  const hlavna = r.fotky[r.hlavna];
  const alt = (popis: string) => `${popis} — ${r.obec}`;

  const udaje = [
    { popis: "Obec", hodnota: r.obec },
    { popis: "Okres", hodnota: r.okres },
    { popis: "Práce", hodnota: r.typ },
    ...(r.material ? [{ popis: "Materiál", hodnota: r.material }] : []),
    { popis: "Fotky", hodnota: `${r.fotky.length} zo stavby` },
  ];

  return (
    <>
      <HeroPodstranky
        ariaLabel={`${r.nazov}, ${r.obec}`}
        foto={{ src: hlavna.src, alt: alt(hlavna.popis), pozicia: r.pozicia }}
        drobceky={[
          { label: "Úvod", href: "/" },
          { label: "Realizácie", href: "/realizacie" },
          { label: `${r.typ}, ${r.obec}` },
        ]}
        pill={`Realizácia · okres ${r.okres}`}
        ikona={<MapPin size={13} strokeWidth={2.5} aria-hidden="true" />}
        nadpis={{ pred: `${r.nazov}, `, zvyraznene: r.obec, za: "" }}
        lead={r.perex}
        fakty={[r.typ, ...(r.material ? [r.material] : []), `${r.fotky.length} fotiek zo stavby`]}
        akcie={
          <>
            <a href="#dopyt" className="btn btn-accent">
              Chcem podobnú strechu
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

      {/* ---------- Čo sme robili ---------- */}
      <section aria-labelledby="prace" className="section-y bg-white">
        <div className="container-max grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <p className="eyebrow text-eyebrow uppercase text-muted">Čo sme robili</p>
            <h2 id="prace" className="text-h2 mt-5 text-balance text-dark">
              {r.typ} — <span className="mark">{r.obec}</span>
            </h2>

            {r.odseky.map((o) => (
              <p key={o} className="text-lead mt-5 max-w-[60ch] text-muted">
                {o}
              </p>
            ))}

            <ol className="mt-8 flex flex-col gap-3">
              {r.postup.map((krok, i) => (
                <li key={krok} className="flex items-start gap-4">
                  <span className="tabular grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-sm font-bold text-dark">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-[15px] leading-relaxed text-dark/85">{krok}</span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={120}>
            <dl className="rounded-panel border border-line bg-light p-6 md:p-8">
              {udaje.map((u) => (
                <div
                  key={u.popis}
                  className="flex items-baseline justify-between gap-6 border-b border-line py-3 first:pt-0 last:border-b-0 last:pb-0"
                >
                  <dt className="text-sm text-muted">{u.popis}</dt>
                  <dd className="text-right text-[15px] font-semibold text-dark">{u.hodnota}</dd>
                </div>
              ))}
            </dl>

            {sluzba ? (
              <Link
                href={`/sluzby/${sluzba.slug}`}
                className="group mt-5 flex items-center justify-between gap-4 rounded-panel border border-line bg-white p-6 transition-[transform,box-shadow] duration-[var(--d-short)] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
              >
                <span>
                  <span className="text-eyebrow block uppercase text-muted">Služba</span>
                  <span className="text-h3 mt-2 block text-dark">{sluzba.navLabel}</span>
                </span>
                <ArrowRight
                  size={20}
                  strokeWidth={2.5}
                  aria-hidden="true"
                  className="shrink-0 text-dark transition-transform duration-[var(--d-short)] group-hover:translate-x-1"
                />
              </Link>
            ) : null}
          </Reveal>
        </div>
      </section>

      {/* ---------- Fotky ---------- */}
      {/*
        Mriežka, nie stĺpce (masonry). Stĺpce radia fotky zhora nadol, takže
        vedľa „01" stála „07" a postup krok za krokom sa nedal čítať.

        Fotky z mobilu sú na šírku aj na výšku. Tie na šírku vyplnia rámček
        (`object-cover`), tie na výšku sa zobrazia celé (`object-contain`)
        na tmavom podklade — `cover` by z nich odrezal polovicu.

        Reveal `up`, nie `mask`: fotky sú lazy a orezaná fotka má pre
        prehliadač nulovú plochu, takže by sa začala sťahovať až po
        odhalení (AGENTS.md).
      */}
      <section aria-labelledby="fotky" className="section-y bg-light">
        <div className="container-max">
          <SectionHeading
            id="fotky"
            eyebrow="Fotky zo stavby"
            before="Priebeh prác "
            mark="krok za krokom"
            lead={`${r.fotky.length} fotiek v poradí, v akom vznikali — ${r.nazov.toLowerCase()} v obci ${r.obec}.`}
          />

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
            {r.fotky.map((f, i) => (
              <li
                key={f.src.src}
                data-reveal="up"
                style={{ "--reveal-delay": `${(i % 3) * 60}ms` } as React.CSSProperties}
              >
                <figure className="flex h-full flex-col overflow-hidden rounded-panel bg-white">
                  <div className="relative aspect-[4/3] bg-dark">
                    <Image
                      src={f.src}
                      alt={alt(f.popis)}
                      fill
                      loading="lazy"
                      /* ~1,5× šírky dlaždice — pri malom zmenšení fotka zmäkne. */
                      sizes="(min-width: 1240px) 580px, (min-width: 640px) 75vw, 100vw"
                      quality={80}
                      className={
                        f.src.height > f.src.width ? "object-contain" : "object-cover"
                      }
                    />
                  </div>
                  <figcaption className="flex gap-3 px-4 py-3 text-sm leading-snug text-dark/80">
                    <span className="tabular shrink-0 font-semibold text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {f.popis}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm text-muted">
            Ďalšie fotky z našich stavieb pridávame na{" "}
            <a
              href={company.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-dark underline decoration-line underline-offset-4 hover:decoration-accent"
            >
              Facebook
            </a>
            .
          </p>
        </div>
      </section>

      {/* ---------- Dopyt ---------- */}
      <section id="dopyt" aria-labelledby="dopyt-nadpis" className="section-y bg-white">
        <div className="container-max">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <p className="eyebrow text-eyebrow uppercase text-muted">Nezáväzný dopyt</p>
              <h2 id="dopyt-nadpis" className="text-h2 mt-5 text-balance text-dark">
                Riešite strechu v okrese <span className="mark">{r.okres}</span>?
              </h2>
              <p className="text-lead mt-5 max-w-[46ch] text-muted">
                Napíšte nám, čo potrebujete. Ozveme sa a ak to z opisu nepôjde
                posúdiť, prídeme sa pozrieť.
              </p>

              <ul className="mt-8 flex flex-col gap-3">
                {[
                  "Obhliadka je bezplatná a nezáväzná",
                  "Odpovedáme aj na fotky poslané e-mailom",
                  "Cenu hovoríme až po posúdení stavby",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check size={17} strokeWidth={2.5} aria-hidden="true" className="mt-0.5 shrink-0 text-dark" />
                    <span className="text-[15px] leading-relaxed text-dark/80">{f}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120}>
              <DopytForm sluzba={`Realizácia: ${r.typ}, ${r.obec}`} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Ďalšie realizácie ---------- */}
      <section aria-labelledby="dalsie" className="section-y bg-light">
        <div className="container-max">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading id="dalsie" eyebrow="Ďalšie realizácie" before="Strechy " mark="v okolí" />
            <Link
              href="/realizacie"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-dark"
            >
              Všetky realizácie
              <ArrowRight
                size={16}
                strokeWidth={2.5}
                aria-hidden="true"
                className="transition-transform duration-[var(--d-short)] group-hover:translate-x-1"
              />
            </Link>
          </div>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
            {dalsie.map((d, i) => (
              <Reveal as="li" key={d.slug} index={i}>
                <KartaRealizacie r={d} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
