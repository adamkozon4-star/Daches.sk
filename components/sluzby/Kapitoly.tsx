import Image from "next/image";
import { ArrowDown, Check } from "lucide-react";
import Reveal from "@/components/Reveal";
import type { Blok, Kapitola } from "@/lib/sluzby";

/**
 * Kapitoly podstránky služby + ich index.
 *
 * ── Prečo kapitoly a nie len sekcie ─────────────────────────────────────
 * Stránka je dlhá. Číslovanie a index na začiatku z nej robia dokument,
 * v ktorom sa dá orientovať — čitateľ vidí dopredu, čo ho čaká, a vie
 * skočiť na to, čo rieši. Bez toho je to len dlhý zoznam odstavcov.
 *
 * ── Dvojstĺpec tvrdenie | text ──────────────────────────────────────────
 * Veľké tvrdenie vľavo a podrobnosti vpravo. Kto stránku preletí očami,
 * prečíta si len tvrdenia a aj tak odíde s odpoveďou. Kto chce vedieť
 * viac, číta pravý stĺpec.
 *
 * Všetko sú server komponenty — žiadny JavaScript navyše.
 */

const poradie = (i: number) => String(i + 1).padStart(2, "0");

/* ---------- Index kapitol ---------- */

export function IndexKapitol({ kapitoly }: { kapitoly: Kapitola[] }) {
  return (
    <nav
      aria-label="Obsah stránky"
      className="border-t border-white/8 bg-dark print:hidden"
    >
      <div className="container-max">
        <ol className="grid md:grid-cols-2 lg:grid-cols-4">
          {kapitoly.map((k, i) => (
            <li key={k.id}>
              <a
                href={`#${k.id}`}
                className="group flex h-full items-center gap-4 border-b border-white/10 py-5 transition-colors duration-[var(--d-short)] last:border-b-0 hover:bg-white/[0.04] md:border-b-0 md:py-7 lg:border-l lg:px-6 lg:first:border-l-0 lg:first:pl-0"
              >
                <span className="tabular text-h3 shrink-0 text-accent">
                  {poradie(i)}
                </span>
                <span className="flex-1 text-sm font-semibold text-white/75 transition-colors duration-[var(--d-micro)] group-hover:text-white">
                  {k.nazov}
                </span>
                <ArrowDown
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="shrink-0 text-white/25 transition-transform duration-[var(--d-short)] group-hover:translate-y-0.5 group-hover:text-accent"
                />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

/* ---------- Jedna kapitola ---------- */

export function Kapitoly({ kapitoly }: { kapitoly: Kapitola[] }) {
  return (
    <>
      {kapitoly.map((k, i) => (
        <section
          key={k.id}
          id={k.id}
          aria-labelledby={`${k.id}-nadpis`}
          // Striedanie bielej a svetlej oddelí kapitoly bez čiar navyše.
          className={`section-y ${i % 2 === 0 ? "bg-white" : "bg-light"}`}
        >
          <div className="container-max">
            <Reveal className="flex items-center gap-5">
              <span
                aria-hidden="true"
                className="tabular grid h-14 w-14 shrink-0 place-items-center rounded-card bg-accent text-h3 text-dark"
              >
                {poradie(i)}
              </span>
              <span>
                <span className="text-eyebrow block uppercase text-muted">
                  Kapitola
                </span>
                <span className="text-h3 mt-1 block text-dark">{k.nazov}</span>
              </span>
              <span aria-hidden="true" className="ml-2 h-px flex-1 bg-line" />
            </Reveal>

            <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-16">
              <Reveal>
                <h2
                  id={`${k.id}-nadpis`}
                  className="text-h2 text-balance text-dark"
                >
                  {k.tvrdenie}
                </h2>
              </Reveal>

              <Reveal delay={120}>
                {k.odseky.map((o) => (
                  <p
                    key={o}
                    className="mb-5 text-[15px] leading-relaxed text-muted last:mb-0 md:text-base"
                  >
                    {o}
                  </p>
                ))}
              </Reveal>
            </div>

              {/*
                ⚠️ Zámerne `up`, nie `mask`.

                `mask` orezáva fotku cez `clip-path: inset(0 0 100% 0)`, kým
                sa neodhalí. Orezaná fotka má pre prehliadač nulovú plochu,
                takže natívne `loading="lazy"` ju nezačne sťahovať — čaká,
                kým animácia orezanie zruší. Fotka sa potom začne sťahovať
                až v okamihu, keď ju má byť vidieť, a návštevník pozerá na
                prázdny rámček.

                Zmerané naostro: fotky kapitol sa pri scrollovaní cez celú
                stránku nestiahli vôbec; po zrušení orezania sa načítali
                okamžite. `up` animuje len opacitu a posun, plochu nenuluje,
                takže lazy funguje normálne a fotka je pripravená vopred.

                `mask` sa smie použiť iba na fotke, ktorá sa načíta hneď
                (`priority` alebo `loading="eager"`).
              */}
            {k.foto ? (
              <Reveal
                variant="up"
                className="parallax-up mt-14 overflow-hidden rounded-panel lg:mt-20"
              >
                <div>
                  <Image
                    src={k.foto.src}
                    alt={k.foto.alt}
                    loading="lazy"
                    sizes="(min-width: 1240px) 1240px, 100vw"
                    quality={80}
                    style={{ objectPosition: k.foto.pozicia ?? "center" }}
                    className="aspect-[16/9] w-full object-cover"
                  />
                </div>
              </Reveal>
            ) : null}

            {k.bloky.map((b, bi) => (
              <div key={bi} className="mt-14 lg:mt-20">
                <VykresliBlok blok={b} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

/* ---------- Bloky ---------- */

function VykresliBlok({ blok }: { blok: Blok }) {
  if (blok.typ === "karty") {
    return (
      <ul
        className={`grid gap-5 ${
          blok.polozky.length === 2 ? "md:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {blok.polozky.map((p, i) => (
          <Reveal as="li" key={p.nazov} index={i}>
            <article className="flex h-full flex-col rounded-panel border border-line bg-white p-6 transition-[transform,box-shadow] duration-[var(--d-short)] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
              <h3 className="text-h3 text-dark">{p.nazov}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {p.text}
              </p>

              {p.udaje?.length ? (
                <dl className="mt-5 border-t border-line pt-4">
                  {p.udaje.map((u) => (
                    <div
                      key={u.popis}
                      className="flex items-baseline justify-between gap-4 py-1.5"
                    >
                      <dt className="text-xs uppercase tracking-wide text-muted">
                        {u.popis}
                      </dt>
                      <dd className="text-right text-sm font-semibold text-dark">
                        {u.hodnota}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </article>
          </Reveal>
        ))}
      </ul>
    );
  }

  if (blok.typ === "porovnanie") {
    return (
      <Reveal>
        {/*
          Tabuľka má vlastné vodorovné posúvanie. Na 375 px by sa tri stĺpce
          nezmestili čitateľne a zalamovanie by z nej spravilo kašu —
          posúvanie je čestnejšie než stlačené písmo.
        */}
        <div className="overflow-x-auto rounded-panel border border-line bg-white">
          <table className="w-full min-w-[620px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="text-eyebrow w-[28%] px-6 py-5 uppercase text-muted">
                  Parameter
                </th>
                {blok.stlpce.map((s) => (
                  <th
                    key={s}
                    scope="col"
                    className="text-h3 px-6 py-5 text-dark"
                  >
                    {s}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {blok.riadky.map((r) => (
                <tr key={r.parameter} className="border-b border-line last:border-b-0">
                  <th
                    scope="row"
                    className="px-6 py-4 text-sm font-semibold text-dark"
                  >
                    {r.parameter}
                  </th>
                  <td className="px-6 py-4 text-sm leading-relaxed text-muted">
                    {r.a}
                  </td>
                  <td className="px-6 py-4 text-sm leading-relaxed text-muted">
                    {r.b}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 max-w-[70ch] text-sm leading-relaxed text-muted">
          {blok.poznamka}
        </p>
      </Reveal>
    );
  }

  if (blok.typ === "vrstvy") {
    return (
      <div>
        {blok.lead ? (
          <Reveal>
            <p className="text-lead max-w-[62ch] text-dark/80">{blok.lead}</p>
          </Reveal>
        ) : null}

        <ol className="mt-8 flex flex-col">
          {blok.polozky.map((p, i) => (
            <Reveal as="li" key={p.nazov} index={i} step={70}>
              <div className="grid gap-x-6 gap-y-2 border-t border-line py-6 md:grid-cols-[auto_minmax(0,16rem)_minmax(0,1fr)] md:items-baseline">
                {/* Limetka na bielej je nečitateľná — číslo je tmavé, akcent
                    nesie len bodka vedľa neho. */}
                <span
                  aria-hidden="true"
                  className="tabular flex items-center gap-2 text-sm font-bold text-dark/45"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {poradie(i)}
                </span>
                <h3 className="text-h3 text-dark">{p.nazov}</h3>
                <p className="text-sm leading-relaxed text-muted md:text-[15px]">
                  {p.text}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div>
      <Reveal>
        <h3 className="text-h3 text-dark">{blok.nadpis}</h3>
        {blok.lead ? (
          <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-muted">
            {blok.lead}
          </p>
        ) : null}
      </Reveal>

      <ul className="mt-8 grid gap-x-10 gap-y-4 md:grid-cols-2">
        {blok.polozky.map((p, i) => (
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
  );
}
