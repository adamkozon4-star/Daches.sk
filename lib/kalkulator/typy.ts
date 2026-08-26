/**
 * Dátový model kalkulátora.
 *
 * Zámerne oddelené od UI — `vypocet.ts` je čistá funkcia bez Reactu, dá sa
 * testovať aj použiť inde. Pri nasadení u iného klienta sa mení iba
 * `cennik.ts`, nič z tohto súboru.
 */

export type TypProjektu = "krov" | "strecha_komplet" | "rekonstrukcia" | "oprava";

export type TypStrechy =
  | "sedlova"
  | "valbova"
  | "pultova"
  | "stanova"
  | "manzardova";

export type Krytina =
  | "falcovana"
  | "skridlovy_plech"
  | "trapezovy_plech"
  | "betonova_skridla"
  | "sindel";

export type Trieda = "zaklad" | "standard" | "premium";

export type Sklon = "nizky" | "bezny" | "strmy";

/** Výmery v bežných metroch. Odvodzujú sa z plochy a tvaru strechy. */
export type Vymery = {
  okap: number;
  zavetrova: number;
  hreben: number;
  narozia: number;
  uzlabie: number;
};

export type Doplnok =
  | "demontaz_krytiny"
  | "demontaz_latovania"
  | "debnenie"
  | "latovanie"
  | "kontralatovanie"
  | "poistna_hydroizolacia"
  | "odkvapovy_system"
  | "oplechovanie_kominov"
  | "stresne_okno"
  | "stresny_vylez"
  | "sneholamy"
  | "tepelna_izolacia"
  | "parozabrana"
  | "podhladove_plechy";

export type Vstup = {
  typProjektu: TypProjektu;
  typStrechy: TypStrechy;
  /** Plocha strechy v m². */
  plocha: number;
  sklon: Sklon;
  krytina: Krytina;
  trieda: Trieda;
  vymery: Vymery;
  /** Používateľ prepísal automaticky odvodené výmery. */
  vymeryRucne: boolean;
  doplnky: Doplnok[];
  /** Počty pri doplnkoch účtovaných po kuse. */
  pocty: { kominy: number; okna: number };
};

export type Rozsah = { min: number; max: number };

export type Polozka = {
  skupina: "material" | "praca";
  nazov: string;
  vymer: number;
  jednotka: "m²" | "bm" | "ks";
  cena: Rozsah;
};

export type Vysledok = {
  polozky: Polozka[];
  material: Rozsah;
  praca: Rozsah;
  spolu: Rozsah;
  /** Cena za m² strechy — kontrolné číslo, či výsledok dáva zmysel. */
  zaM2: Rozsah;
};
