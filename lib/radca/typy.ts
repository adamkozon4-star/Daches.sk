import type { FaqPolozka, Kapitola, Obrazok } from "@/lib/sluzby/typy";

/**
 * Článok radcu. Kapitoly a bloky sú tie isté ako pri službách, takže
 * článok vyzerá ako zvyšok webu a nepotrebuje vlastné komponenty.
 */
export type Clanok = {
  slug: string;
  /** Krátky názov do drobčekov, pätky a kariet. */
  navLabel: string;
  /** Popisný text odkazu — nie „Čítať viac" (audit hlási duplicitné texty odkazov). */
  odkazText: string;
  /** `<title>` bez sufixu „| Daches s.r.o.". Do 60 znakov aj so sufixom. */
  title: string;
  /** `<meta name="description">` — do 160 znakov. */
  description: string;
  /** Štítok nad nadpisom, napr. „Radca · Cena". */
  pill: string;
  nadpis: { pred: string; zvyraznene: string; za: string };
  /** Úvod pod nadpisom — priama odpoveď na otázku z titulku. */
  perex: string;
  /**
   * Dátumy v tvare RRRR-MM-DD. `upravene` meň len pri zmene obsahu —
   * ide do schémy aj do sitemap a Google podľa neho plánuje prehľadávanie.
   */
  publikovane: string;
  upravene: string;
  foto: Obrazok;
  kapitoly: Kapitola[];
  faq: FaqPolozka[];
  /** Slugy služieb, na ktoré článok odkazuje — a ktoré naň odkazujú späť. */
  sluzby: string[];
  /**
   * Verejné zdroje faktov (zákony, programy). Pri článkoch o dotáciách
   * a povoleniach povinné — čitateľ si musí vedieť overiť aktuálny stav.
   */
  zdroje?: { nazov: string; url: string }[];
};
