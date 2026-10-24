import type { StaticImageData } from "next/image";

export type FaqPolozka = { otazka: string; odpoved: string };

/**
 * ⚠️ Do hero a do pásov v kapitolách patria IBA fotky na šírku.
 *
 * Oba pásy sú širokouhlé a `object-cover` z fotky na výšku vyreže úzky
 * vodorovný pruh zo stredu. Presne to sa stalo s `stresne-krytiny.jpg`
 * (1536 × 2048): v hero z nej zostal detail falcov, nie strecha.
 * Fotky na výšku patria do galérie a do mriežok, nie sem.
 */
export type Obrazok = {
  src: StaticImageData;
  alt: string;
  /**
   * Výrez cez `object-position`. Pás je širokouhlý, takže z fotky vidno len
   * vodorovný pruh — a predvolený stred nebýva ten správny.
   *
   * V hero má navyše vplyv na čitateľnosť: biely text nad svetlou oblohou
   * prepadol na 2,9:1. Posunutie výrezu nižšie, nad tmavú strechu, je
   * lepšie riešenie než stmaviť celú fotku prekrytím.
   */
  pozicia?: string;
};

/**
 * Obsahové bloky kapitoly. Rozlíšené podľa `typ`, aby komponent nemusel
 * hádať, čo má vykresliť, a aby sa nedal vytvoriť neúplný blok.
 */
export type Blok =
  | {
      typ: "karty";
      /** Voliteľné krátke údaje pod textom karty — parameter a hodnota. */
      polozky: {
        nazov: string;
        text: string;
        udaje?: { popis: string; hodnota: string }[];
      }[];
    }
  | {
      typ: "porovnanie";
      stlpce: [string, string];
      riadky: { parameter: string; a: string; b: string }[];
      /** Odkiaľ hodnoty sú a čo neznamenajú. Povinné — čísla bez kontextu klamú. */
      poznamka: string;
    }
  | {
      typ: "vrstvy";
      lead?: string;
      polozky: { nazov: string; text: string }[];
    }
  | { typ: "zoznam"; nadpis: string; lead?: string; polozky: string[] };

export type Kapitola = {
  /** Kotva v URL aj kľúč do indexu kapitol. */
  id: string;
  /** Krátky názov do indexu — musí sa zmestiť do jedného riadku. */
  nazov: string;
  /** Veľké tvrdenie na začiatku kapitoly. Jedna myšlienka, nie zhrnutie. */
  tvrdenie: string;
  odseky: string[];
  foto?: Obrazok;
  bloky: Blok[];
};

export type Sluzba = {
  slug: string;
  /** Text v drobčekoch. */
  navLabel: string;
  /**
   * Text odkazu z iných stránok. Zámerne popisný — audit hlási ako chybu,
   * keď na stránke vedie viac odkazov s rovnakým textom („Viac o službe").
   */
  odkazText: string;
  /** `<title>` bez sufixu — layout dopĺňa „| Daches s.r.o.". Do 60 znakov aj so sufixom. */
  title: string;
  /** `<meta name="description">` — do 160 znakov, inak ho Google oreže. */
  description: string;
  /** Štítok nad nadpisom. */
  pill: string;
  /** `<h1>` rozdelený kvôli akcentovému podčiarknutiu jedného slova. */
  nadpis: { pred: string; zvyraznene: string; za: string };
  lead: string;
  /** Tri krátke fakty pod tlačidlami. Musia byť doložené textom stránky. */
  fakty: string[];
  foto: Obrazok;
  kapitoly: Kapitola[];
  faq: FaqPolozka[];
  /** Slugy ďalších služieb na prelinkovanie. */
  suvisiace: string[];
  /**
   * Služba, ktorú kalkulátor zámerne neoceňuje — opravy, sanácia krovu.
   *
   * Predvolene sekcia o cene vedie do kalkulátora. Pri týchto službách by
   * tlačidlo viedlo na stránku, ktorá vzápätí povie, že cenu nedá — preto
   * sa nezobrazí a hlavnou cestou je dopyt. `text` vysvetlí prečo.
   */
  bezKalkulatora?: { text: string };
};

