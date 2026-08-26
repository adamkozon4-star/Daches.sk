import type { Doplnok, Krytina, Rozsah, Trieda } from "@/lib/kalkulator/typy";

/**
 * ╔══════════════════════════════════════════════════════════════════════╗
 * ║  CENNÍK — JEDINÝ SÚBOR, KTORÝ SA PRI ZMENE CIEN UPRAVUJE             ║
 * ╚══════════════════════════════════════════════════════════════════════╝
 *
 * ⚠️ STAV: "navrh"
 *
 * Sadzby nižšie sú **odhad bežných trhových cien na Slovensku, nie cenník
 * Daches s.r.o.** Nikto ich zatiaľ nepotvrdil. Kým je `STAV` nastavený na
 * "navrh", kalkulátor to používateľovi otvorene napíše a zobrazuje iba
 * rozsah, nikdy presné číslo.
 *
 * Po tom, čo klient sadzby prejde a odsúhlasí:
 *   1. prepíš hodnoty na skutočné
 *   2. prepni STAV na "potvrdeny"
 *
 * Každá sadzba je rozsah {min, max}. Strecha nie je tovar s pevnou cenou —
 * rozsah je čestnejší a nedá sa ním zaviazať k číslu, ktoré po obhliadke
 * neplatí.
 *
 * ── Prečo sú rozpätia pomerne úzke (zhruba ±15 %) ───────────────────────
 * Rozdiel medzi lacnejším a drahším prevedením už zachytáva `triedaNasobok`.
 * Keby k tomu mala každá sadzba ešte široké vlastné rozpätie, kvalita by sa
 * počítala dvakrát a celková cena by vyšla v rozmedzí typu „10 000 až
 * 18 000 €" — také číslo zákazníkovi nepovie nič. Rozpätie sadzby má pokrývať
 * len zvyškovú neistotu, nie triedu materiálu.
 */
export const STAV: "navrh" | "potvrdeny" = "navrh";

/** Sadzba DPH v percentách. Ceny nižšie sú BEZ DPH. */
export const DPH = 23;

/* ---------- Krytina: materiál €/m² ---------- */
export const krytinaMaterial: Record<Krytina, Rozsah> = {
  falcovana: { min: 29, max: 39 },
  skridlovy_plech: { min: 14, max: 20 },
  trapezovy_plech: { min: 11, max: 15 },
  betonova_skridla: { min: 22, max: 30 },
  sindel: { min: 18, max: 25 },
};

/** Trieda plechu / krytiny — násobok ceny materiálu. */
export const triedaNasobok: Record<Trieda, number> = {
  zaklad: 0.82,
  standard: 1,
  premium: 1.28,
};

/** Montáž krytiny — €/m². Falcovaná je prácnejšia než skladaná. */
export const krytinaMontaz: Record<Krytina, Rozsah> = {
  falcovana: { min: 24, max: 32 },
  skridlovy_plech: { min: 15, max: 21 },
  trapezovy_plech: { min: 12, max: 17 },
  betonova_skridla: { min: 18, max: 24 },
  sindel: { min: 20, max: 26 },
};

/** Strmá strecha je pomalšia a vyžaduje viac istenia. */
export const sklonPriplatok = {
  nizky: 1,
  bezny: 1,
  strmy: 1.15,
} as const;

/* ---------- Konštrukcia — €/m² pôdorysnej plochy strechy ---------- */
export const konstrukcia = {
  /** Rezivo + výroba a montáž krovu. */
  krovMaterial: { min: 39, max: 53 },
  krovPraca: { min: 30, max: 40 },
  debnenieMaterial: { min: 12.5, max: 16.5 },
  debneniePraca: { min: 8, max: 11 },
} as const;

/* ---------- Doplnky ---------- */
type SadzbaDoplnku = {
  nazov: string;
  jednotka: "m²" | "bm" | "ks";
  material: Rozsah;
  praca: Rozsah;
};

export const doplnky: Record<Doplnok, SadzbaDoplnku> = {
  demontaz_krytiny: {
    nazov: "Demontáž pôvodnej krytiny vrátane odvozu",
    jednotka: "m²",
    material: { min: 0, max: 0 },
    praca: { min: 9, max: 12 },
  },
  demontaz_latovania: {
    nazov: "Demontáž pôvodného latovania",
    jednotka: "m²",
    material: { min: 0, max: 0 },
    praca: { min: 3.5, max: 5.5 },
  },
  debnenie: {
    nazov: "Nové debnenie",
    jednotka: "m²",
    material: { min: 12.5, max: 16.5 },
    praca: { min: 8, max: 11 },
  },
  latovanie: {
    nazov: "Latovanie",
    jednotka: "m²",
    material: { min: 3.5, max: 5.5 },
    praca: { min: 3.5, max: 5.5 },
  },
  kontralatovanie: {
    nazov: "Kontralatovanie",
    jednotka: "m²",
    material: { min: 2.5, max: 3.5 },
    praca: { min: 2.5, max: 3.5 },
  },
  poistna_hydroizolacia: {
    nazov: "Poistná hydroizolácia",
    jednotka: "m²",
    material: { min: 2.5, max: 4 },
    praca: { min: 2.5, max: 3.5 },
  },
  odkvapovy_system: {
    nazov: "Odkvapový systém (žľaby a zvody)",
    jednotka: "bm",
    material: { min: 17, max: 23 },
    praca: { min: 9, max: 13 },
  },
  oplechovanie_kominov: {
    nazov: "Oplechovanie komína",
    jednotka: "ks",
    material: { min: 85, max: 115 },
    praca: { min: 170, max: 230 },
  },
  stresne_okno: {
    nazov: "Strešné okno vrátane lemovania a montáže",
    jednotka: "ks",
    material: { min: 500, max: 780 },
    praca: { min: 190, max: 270 },
  },
  stresny_vylez: {
    nazov: "Strešný výlez",
    jednotka: "ks",
    material: { min: 250, max: 350 },
    praca: { min: 110, max: 160 },
  },
  sneholamy: {
    nazov: "Sneholamy",
    jednotka: "bm",
    material: { min: 20, max: 26 },
    praca: { min: 7, max: 11 },
  },
  tepelna_izolacia: {
    nazov: "Tepelná izolácia",
    jednotka: "m²",
    material: { min: 12, max: 17 },
    praca: { min: 7, max: 10 },
  },
  parozabrana: {
    nazov: "Parozábrana",
    jednotka: "m²",
    material: { min: 2.5, max: 4 },
    praca: { min: 2.5, max: 3.5 },
  },
  podhladove_plechy: {
    nazov: "Podhľadové plechy",
    jednotka: "bm",
    material: { min: 15, max: 21 },
    praca: { min: 10, max: 13 },
  },
};

/* ---------- Klampiarske prvky — €/bm, materiál + práca spolu ---------- */
export const klampiarina = {
  okap: { nazov: "Okapová lišta", cena: { min: 13, max: 17 } },
  zavetrova: { nazov: "Závetrová lišta", cena: { min: 15.5, max: 20.5 } },
  hreben: { nazov: "Hrebeň vrátane tesnenia", cena: { min: 19, max: 25 } },
  narozia: { nazov: "Nárožia", cena: { min: 17.5, max: 23.5 } },
  uzlabie: { nazov: "Úžľabie", cena: { min: 27, max: 37 } },
} as const;

/**
 * Prirážka na odpad a prekrytie. Z rovinnej plochy sa nikdy nevyrobí
 * rovnaký počet m² krytiny — pásy sa prekrývajú a orezávajú.
 */
export const prirazkaNaOdpad = 1.1;
