"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Phone, RotateCcw, Ruler } from "lucide-react";
import { company } from "@/lib/content";
import {
  doplnky as sadzbyDoplnkov,
} from "@/lib/kalkulator/cennik";
import {
  doplnkyPodlaProjektu,
  krytiny,
  nazvyVymerov,
  predvoleneDoplnky,
  sklony,
  triedy,
  typyProjektu,
  typyStrechy,
} from "@/lib/kalkulator/moznosti";
import {
  odvodVymery,
  PLOCHA_MAX,
  PLOCHA_MIN,
  skontrolujVymer,
} from "@/lib/kalkulator/odvodenie";
import { cislo, vypocitaj } from "@/lib/kalkulator/vypocet";
import type {
  Doplnok,
  Krytina,
  Sklon,
  Trieda,
  TypProjektu,
  TypStrechy,
  Vymery,
} from "@/lib/kalkulator/typy";
import { Karta, Kroky, Pole, Prepinac, Zaskrtnutie } from "@/components/kalkulator/casti";
import Vysledok from "@/components/kalkulator/Vysledok";

type Stav = {
  typStrechy: TypStrechy;
  plocha: number | "";
  sklon: Sklon;
  krytina: Krytina;
  trieda: Trieda;
  doplnky: Doplnok[];
  pocty: { kominy: number; okna: number };
  vymeryRucne: boolean;
  vlastneVymery: Vymery | null;
};

const vychodzi: Stav = {
  typStrechy: "sedlova",
  plocha: "",
  sklon: "bezny",
  krytina: "falcovana",
  trieda: "standard",
  doplnky: [],
  pocty: { kominy: 1, okna: 0 },
  vymeryRucne: false,
  vlastneVymery: null,
};

export default function Kalkulator() {
  const [typProjektu, setTypProjektu] = useState<TypProjektu | null>(null);
  const [krok, setKrok] = useState(0);
  const [stav, setStav] = useState<Stav>(vychodzi);
  const [chyba, setChyba] = useState<string | null>(null);

  const projekt = typyProjektu.find((t) => t.id === typProjektu);
  const bezCeny = projekt?.bezCeny ?? false;
  const jeKrov = typProjektu === "krov";

  /** Krov nemá krytinu, takže sa jeden krok vynecháva. */
  const nazvyKrokov = jeKrov
    ? ["Strecha", "Rozmery", "Doplnky", "Výsledok"]
    : ["Strecha", "Rozmery", "Krytina", "Doplnky", "Výsledok"];

  const odvodene = useMemo(
    () =>
      odvodVymery(
        typeof stav.plocha === "number" ? stav.plocha : 0,
        stav.typStrechy,
        stav.sklon,
      ),
    [stav.plocha, stav.typStrechy, stav.sklon],
  );

  const vymery = stav.vymeryRucne && stav.vlastneVymery ? stav.vlastneVymery : odvodene;

  const vstup = useMemo(
    () => ({
      typProjektu: (typProjektu ?? "strecha_komplet") as TypProjektu,
      typStrechy: stav.typStrechy,
      plocha: typeof stav.plocha === "number" ? stav.plocha : 0,
      sklon: stav.sklon,
      krytina: stav.krytina,
      trieda: stav.trieda,
      vymery,
      vymeryRucne: stav.vymeryRucne,
      doplnky: stav.doplnky,
      pocty: stav.pocty,
    }),
    [typProjektu, stav, vymery],
  );

  const vysledok = useMemo(() => vypocitaj(vstup), [vstup]);

  const zvolProjekt = (id: TypProjektu) => {
    setTypProjektu(id);
    setStav({ ...vychodzi, doplnky: [...predvoleneDoplnky[id]] });
    setKrok(0);
    setChyba(null);
  };

  const reset = () => {
    setTypProjektu(null);
    setStav(vychodzi);
    setKrok(0);
    setChyba(null);
  };

  const dalej = () => {
    const nazov = nazvyKrokov[krok];

    if (nazov === "Rozmery") {
      const p = stav.plocha;
      if (typeof p !== "number" || p < PLOCHA_MIN || p > PLOCHA_MAX) {
        setChyba(
          `Zadajte plochu strechy medzi ${PLOCHA_MIN} a ${PLOCHA_MAX} m². Ak ju nepoznáte, stačí odhad — spresníme ju pri obhliadke.`,
        );
        return;
      }

      if (stav.vymeryRucne && stav.vlastneVymery) {
        for (const kluc of Object.keys(nazvyVymerov) as (keyof Vymery)[]) {
          const kontrola = skontrolujVymer(
            stav.vlastneVymery[kluc],
            odvodene[kluc],
          );
          if (!kontrola.ok) {
            setChyba(`${nazvyVymerov[kluc]}: ${kontrola.sprava}`);
            return;
          }
        }
      }
    }

    setChyba(null);
    setKrok((k) => Math.min(k + 1, nazvyKrokov.length - 1));
  };

  /* ---------- Výber typu projektu ---------- */
  if (!typProjektu) {
    return (
      <div>
        <h2 className="text-h3 text-dark">Čo pre vás máme urobiť?</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {typyProjektu.map((t) => (
            <Karta
              key={t.id}
              nazov={t.nazov}
              popis={t.popis}
              vybrane={false}
              onClick={() => zvolProjekt(t.id)}
            />
          ))}
        </div>
      </div>
    );
  }

  /* ---------- Oprava — na diaľku sa oceniť nedá ---------- */
  if (bezCeny) {
    return (
      <div>
        <TlacidloSpat onClick={reset} />

        <div className="mt-6 rounded-panel border border-line bg-light p-8 text-center">
          <h2 className="text-h3 text-dark">Opravu oceňujeme na mieste</h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-sm leading-relaxed text-muted">
            Pri lokálnych opravách rozhoduje to, čo je vidieť až na streche —
            rozsah poškodenia, stav okolitých prvkov a prístup. Akékoľvek číslo
            vypočítané dopredu by bolo vymyslené, tak ho radšej nedávame.
          </p>
          <p className="mx-auto mt-3 max-w-[52ch] text-sm leading-relaxed text-muted">
            Zavolajte nám alebo pošlite fotky — väčšinu vecí vieme posúdiť
            už z nich.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={company.phoneHref} className="btn btn-accent">
              <Phone size={17} strokeWidth={2.5} aria-hidden="true" />
              <span className="tabular">{company.phone}</span>
            </a>
            <a
              href={`mailto:${company.email}?subject=${encodeURIComponent("Oprava strechy — dopyt")}`}
              className="btn border border-line text-dark hover:bg-white"
            >
              Napísať e-mail
            </a>
          </div>
        </div>
      </div>
    );
  }

  const nazovKroku = nazvyKrokov[krok];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <TlacidloSpat onClick={reset} />
        <p className="text-eyebrow uppercase text-muted">{projekt?.nazov}</p>
      </div>

      <div className="mt-6 border-b border-line pb-5">
        <Kroky kroky={nazvyKrokov} aktualny={krok} onSkoc={setKrok} />
      </div>

      <div className="py-8">
        {nazovKroku === "Strecha" ? (
          <section aria-label="Tvar strechy">
            <h2 className="text-h3 text-dark">Aký tvar má strecha?</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {typyStrechy.map((t) => (
                <Karta
                  key={t.id}
                  nazov={t.nazov}
                  popis={t.popis}
                  vybrane={stav.typStrechy === t.id}
                  onClick={() =>
                    setStav((s) => ({ ...s, typStrechy: t.id, vymeryRucne: false }))
                  }
                />
              ))}
            </div>

            <h3 className="text-h3 mt-10 text-dark">Sklon strechy</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {sklony.map((s) => (
                <Prepinac
                  key={s.id}
                  nazov={s.nazov}
                  popis={s.popis}
                  vybrane={stav.sklon === s.id}
                  onClick={() =>
                    setStav((p) => ({ ...p, sklon: s.id, vymeryRucne: false }))
                  }
                />
              ))}
            </div>
          </section>
        ) : null}

        {nazovKroku === "Rozmery" ? (
          <KrokRozmery
            stav={stav}
            setStav={setStav}
            odvodene={odvodene}
            vymery={vymery}
          />
        ) : null}

        {nazovKroku === "Krytina" ? (
          <section aria-label="Krytina">
            <h2 className="text-h3 text-dark">Akú krytinu preferujete?</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {krytiny.map((k) => (
                <Karta
                  key={k.id}
                  nazov={k.nazov}
                  popis={k.popis}
                  vybrane={stav.krytina === k.id}
                  onClick={() => setStav((s) => ({ ...s, krytina: k.id }))}
                />
              ))}
            </div>

            <h3 className="text-h3 mt-10 text-dark">Trieda materiálu</h3>
            <p className="mt-2 max-w-[62ch] text-sm text-muted">
              Triedy sa líšia hrúbkou plechu, povrchovou ochranou a zárukou
              výrobcu. Klampiarske doplnky dodávame vždy v tej istej kvalite
              ako krytinu.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {triedy.map((t) => (
                <Karta
                  key={t.id}
                  nazov={t.nazov}
                  popis={t.popis}
                  detaily={t.detaily}
                  odznak={t.odporucane ? "Odporúčame" : undefined}
                  vybrane={stav.trieda === t.id}
                  onClick={() => setStav((s) => ({ ...s, trieda: t.id }))}
                />
              ))}
            </div>
          </section>
        ) : null}

        {nazovKroku === "Doplnky" ? (
          <KrokDoplnky
            typProjektu={typProjektu}
            stav={stav}
            setStav={setStav}
          />
        ) : null}

        {nazovKroku === "Výsledok" ? (
          <Vysledok vstup={vstup} vysledok={vysledok} />
        ) : null}
      </div>

      {chyba ? (
        <p className="mb-4 rounded-card border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {chyba}
        </p>
      ) : null}

      {nazovKroku !== "Výsledok" ? (
        <div className="flex items-center justify-between border-t border-line pt-6">
          <button
            type="button"
            onClick={() => setKrok((k) => Math.max(k - 1, 0))}
            disabled={krok === 0}
            className="btn h-11 px-5 text-sm text-dark disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowLeft size={16} strokeWidth={2.5} aria-hidden="true" />
            Späť
          </button>

          <button type="button" onClick={dalej} className="btn btn-accent h-11 px-5 text-sm">
            Pokračovať
            <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>
      ) : (
        <div className="flex justify-start border-t border-line pt-6 print:hidden">
          <button
            type="button"
            onClick={reset}
            className="btn h-11 px-5 text-sm text-muted hover:text-dark"
          >
            <RotateCcw size={15} strokeWidth={2.5} aria-hidden="true" />
            Začať odznova
          </button>
        </div>
      )}
    </div>
  );
}

function TlacidloSpat({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors duration-[var(--d-micro)] hover:text-dark"
    >
      <ArrowLeft size={15} strokeWidth={2.5} aria-hidden="true" />
      Späť na výber
    </button>
  );
}

/* ---------- Krok: rozmery ---------- */
function KrokRozmery({
  stav,
  setStav,
  odvodene,
  vymery,
}: {
  stav: Stav;
  setStav: React.Dispatch<React.SetStateAction<Stav>>;
  odvodene: Vymery;
  vymery: Vymery;
}) {
  const kluce = Object.keys(nazvyVymerov) as (keyof Vymery)[];
  const viditelne = kluce.filter((k) => odvodene[k] > 0);

  return (
    <section aria-label="Rozmery">
      <h2 className="text-h3 text-dark">Aká je plocha strechy?</h2>
      <p className="mt-2 max-w-[62ch] text-sm text-muted">
        Stačí odhad — presné výmery vzniknú až pri obhliadke. Ak plochu
        nepoznáte, vezmite pôdorys domu a pripočítajte zhruba pätinu.
      </p>

      <div className="mt-6 max-w-xs">
        <Pole
          label="Plocha strechy"
          jednotka="m²"
          hodnota={stav.plocha}
          min={PLOCHA_MIN}
          max={PLOCHA_MAX}
          onChange={(v) => setStav((s) => ({ ...s, plocha: v, vymeryRucne: false }))}
        />
      </div>

      {viditelne.length ? (
        <div className="mt-8 rounded-panel border border-line bg-light p-6">
          <div className="flex items-start gap-3">
            <Ruler
              size={18}
              strokeWidth={2}
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-dark"
            />
            <div>
              <h3 className="text-sm font-semibold text-dark">
                Bežné metre sme dopočítali za vás
              </h3>
              <p className="mt-1.5 max-w-[58ch] text-sm leading-relaxed text-muted">
                Odhad vychádza z plochy, tvaru a sklonu strechy. Nemusíte nič
                merať — ak však strechu zameranú máte, hodnoty prepíšte.
              </p>
            </div>
          </div>

          <dl className="tabular mt-5 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {viditelne.map((k) => (
              <div
                key={k}
                className="flex items-baseline justify-between gap-4 border-b border-line/70 py-1.5"
              >
                <dt className="text-sm text-muted">{nazvyVymerov[k]}</dt>
                <dd className="text-sm font-semibold text-dark">
                  {cislo(vymery[k])} bm
                </dd>
              </div>
            ))}
          </dl>

          {stav.vymeryRucne ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {viditelne.map((k) => (
                <Pole
                  key={k}
                  label={nazvyVymerov[k]}
                  jednotka="bm"
                  hodnota={stav.vlastneVymery?.[k] ?? 0}
                  napoveda={`Náš odhad: ${cislo(odvodene[k])} bm`}
                  onChange={(v) =>
                    setStav((s) => ({
                      ...s,
                      vlastneVymery: {
                        ...(s.vlastneVymery ?? odvodene),
                        [k]: typeof v === "number" ? v : 0,
                      },
                    }))
                  }
                />
              ))}
            </div>
          ) : null}

          <button
            type="button"
            onClick={() =>
              setStav((s) => ({
                ...s,
                vymeryRucne: !s.vymeryRucne,
                vlastneVymery: s.vymeryRucne ? null : odvodene,
              }))
            }
            className="mt-5 text-sm font-semibold text-dark underline underline-offset-4 hover:text-accent-hover"
          >
            {stav.vymeryRucne
              ? "Použiť náš odhad"
              : "Mám presné výmery, chcem ich zadať"}
          </button>
        </div>
      ) : null}
    </section>
  );
}

/* ---------- Krok: doplnky ---------- */
function KrokDoplnky({
  typProjektu,
  stav,
  setStav,
}: {
  typProjektu: TypProjektu;
  stav: Stav;
  setStav: React.Dispatch<React.SetStateAction<Stav>>;
}) {
  const dostupne = doplnkyPodlaProjektu[typProjektu];

  const prepni = (d: Doplnok, zapnut: boolean) =>
    setStav((s) => ({
      ...s,
      doplnky: zapnut ? [...s.doplnky, d] : s.doplnky.filter((x) => x !== d),
    }));

  return (
    <section aria-label="Doplnky">
      <h2 className="text-h3 text-dark">Čo má byť súčasťou?</h2>
      <p className="mt-2 max-w-[62ch] text-sm text-muted">
        Predvolili sme to, čo pri tomto type projektu býva samozrejmosťou.
        Pokojne uberte, čo nepotrebujete.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {dostupne.map((d) => {
          const zaskrtnute = stav.doplnky.includes(d);
          const sadzba = sadzbyDoplnkov[d];

          return (
            <Zaskrtnutie
              key={d}
              nazov={sadzba.nazov}
              zaskrtnute={zaskrtnute}
              onChange={(v) => prepni(d, v)}
            >
              {zaskrtnute && d === "oplechovanie_kominov" ? (
                <PocetKusov
                  label="Počet komínov"
                  hodnota={stav.pocty.kominy}
                  onChange={(n) =>
                    setStav((s) => ({ ...s, pocty: { ...s.pocty, kominy: n } }))
                  }
                />
              ) : null}

              {zaskrtnute && d === "stresne_okno" ? (
                <PocetKusov
                  label="Počet okien"
                  hodnota={stav.pocty.okna}
                  onChange={(n) =>
                    setStav((s) => ({ ...s, pocty: { ...s.pocty, okna: n } }))
                  }
                />
              ) : null}
            </Zaskrtnutie>
          );
        })}
      </div>
    </section>
  );
}

function PocetKusov({
  label,
  hodnota,
  onChange,
}: {
  label: string;
  hodnota: number;
  onChange: (n: number) => void;
}) {
  return (
    <span
      className="mt-3 flex items-center gap-2"
      onClick={(e) => e.preventDefault()}
    >
      <span className="text-xs text-muted">{label}</span>
      <input
        type="number"
        min={0}
        max={20}
        value={hodnota}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
        onClick={(e) => e.stopPropagation()}
        className="tabular w-16 rounded border border-line bg-white px-2 py-1 text-sm text-dark outline-none focus:border-accent"
      />
    </span>
  );
}
