import {
  doplnky as sadzbyDoplnkov,
  klampiarina,
  konstrukcia,
  krytinaMaterial,
  krytinaMontaz,
  prirazkaNaOdpad,
  sklonPriplatok,
  triedaNasobok,
} from "@/lib/kalkulator/cennik";
import type {
  Polozka,
  Rozsah,
  Vstup,
  Vysledok,
} from "@/lib/kalkulator/typy";

/**
 * Čistá funkcia: vstupy → položkový rozpočet.
 *
 * Bez Reactu a bez vedľajších účinkov — dá sa otestovať aj použiť mimo webu
 * (napr. pri generovaní ponuky na strane servera).
 */

const nasob = (r: Rozsah, k: number): Rozsah => ({
  min: r.min * k,
  max: r.max * k,
});

const scitaj = (a: Rozsah, b: Rozsah): Rozsah => ({
  min: a.min + b.min,
  max: a.max + b.max,
});

const NULA: Rozsah = { min: 0, max: 0 };

export function vypocitaj(vstup: Vstup): Vysledok {
  const polozky: Polozka[] = [];

  const pridaj = (
    skupina: Polozka["skupina"],
    nazov: string,
    vymer: number,
    jednotka: Polozka["jednotka"],
    sadzba: Rozsah,
  ) => {
    if (vymer <= 0) return;
    if (sadzba.min === 0 && sadzba.max === 0) return;
    polozky.push({ skupina, nazov, vymer, jednotka, cena: nasob(sadzba, vymer) });
  };

  const { plocha, typProjektu, krytina, trieda, sklon, vymery, doplnky, pocty } =
    vstup;

  const priplatokZaSklon = sklonPriplatok[sklon];

  /* ---------- Krov ---------- */
  if (typProjektu === "krov" || typProjektu === "strecha_komplet") {
    pridaj("material", "Rezivo na krov", plocha, "m²", konstrukcia.krovMaterial);
    pridaj(
      "praca",
      "Výroba a montáž krovu",
      plocha,
      "m²",
      nasob(konstrukcia.krovPraca, priplatokZaSklon),
    );
  }

  /* ---------- Krytina ---------- */
  if (typProjektu !== "krov") {
    // Prirážka na odpad a prekrytie — z rovinnej plochy nikdy nevyjde
    // rovnaký počet m² krytiny.
    const plochaKrytiny = Math.round(plocha * prirazkaNaOdpad * 10) / 10;

    pridaj(
      "material",
      "Krytina vrátane prirážky na odpad a prekrytie",
      plochaKrytiny,
      "m²",
      nasob(krytinaMaterial[krytina], triedaNasobok[trieda]),
    );

    pridaj(
      "praca",
      "Montáž krytiny",
      plocha,
      "m²",
      nasob(krytinaMontaz[krytina], priplatokZaSklon),
    );
  }

  /* ---------- Doplnky ---------- */
  for (const kluc of doplnky) {
    const s = sadzbyDoplnkov[kluc];

    let vymer = plocha;
    if (s.jednotka === "bm") vymer = vymery.okap;
    if (s.jednotka === "ks") {
      if (kluc === "oplechovanie_kominov") vymer = pocty.kominy;
      else if (kluc === "stresne_okno") vymer = pocty.okna;
      else vymer = 1;
    }

    pridaj("material", s.nazov, vymer, s.jednotka, s.material);
    pridaj("praca", s.nazov, vymer, s.jednotka, nasob(s.praca, priplatokZaSklon));
  }

  /* ---------- Klampiarske prvky ---------- */
  if (typProjektu !== "krov") {
    const prvky = [
      { v: vymery.okap, s: klampiarina.okap },
      { v: vymery.zavetrova, s: klampiarina.zavetrova },
      { v: vymery.hreben, s: klampiarina.hreben },
      { v: vymery.narozia, s: klampiarina.narozia },
      { v: vymery.uzlabie, s: klampiarina.uzlabie },
    ];

    for (const { v, s } of prvky) {
      // Klampiarina sa účtuje ako celok — materiál a práca sa neoddeľujú.
      pridaj("praca", s.nazov, v, "bm", s.cena);
    }
  }

  const material = polozky
    .filter((p) => p.skupina === "material")
    .reduce((a, p) => scitaj(a, p.cena), NULA);

  const praca = polozky
    .filter((p) => p.skupina === "praca")
    .reduce((a, p) => scitaj(a, p.cena), NULA);

  const spolu = scitaj(material, praca);

  return {
    polozky,
    material,
    praca,
    spolu,
    zaM2: plocha > 0 ? { min: spolu.min / plocha, max: spolu.max / plocha } : NULA,
  };
}

/* ---------- Formátovanie ---------- */

export const eur = (n: number) =>
  new Intl.NumberFormat("sk-SK", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Math.round(n));

export const rozsahEur = (r: Rozsah) =>
  Math.round(r.min) === Math.round(r.max)
    ? eur(r.min)
    : `${eur(r.min)} – ${eur(r.max)}`;

export const cislo = (n: number) =>
  new Intl.NumberFormat("sk-SK", { maximumFractionDigits: 1 }).format(n);

/** Zaokrúhlenie rozsahu nahor/nadol na „okrúhle" čísla — nepredstiera presnosť. */
export function zaokruhliRozsah(r: Rozsah): Rozsah {
  const krok = r.max > 20000 ? 500 : r.max > 5000 ? 100 : 50;
  return {
    min: Math.floor(r.min / krok) * krok,
    max: Math.ceil(r.max / krok) * krok,
  };
}
