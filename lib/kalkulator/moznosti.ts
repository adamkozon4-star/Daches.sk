import type {
  Doplnok,
  Krytina,
  Sklon,
  Trieda,
  TypProjektu,
  TypStrechy,
} from "@/lib/kalkulator/typy";

/**
 * Popisky a texty kalkulátora.
 *
 * Vychádzajú z reálnych služieb Daches (`services` v `lib/content.ts`),
 * nie z ponuky konkurencie.
 */

export const typyProjektu: {
  id: TypProjektu;
  nazov: string;
  popis: string;
  /** Projekt, ktorý sa na diaľku oceniť nedá — ide rovno na dopyt. */
  bezCeny?: boolean;
}[] = [
  {
    id: "strecha_komplet",
    nazov: "Nová strecha na kľúč",
    popis: "Krov, debnenie, krytina aj klampiarina — kompletná strecha novostavby.",
  },
  {
    id: "rekonstrukcia",
    nazov: "Rekonštrukcia strechy",
    popis: "Výmena krytiny na existujúcom dome vrátane demontáže pôvodnej.",
  },
  {
    id: "krov",
    nazov: "Nový krov",
    popis: "Výroba a montáž dreveného krovu bez krytiny.",
  },
  {
    id: "oprava",
    nazov: "Oprava a klampiarske práce",
    popis: "Lokálne opravy, oplechovanie, odkvapy. Rozsah sa určuje na mieste.",
    bezCeny: true,
  },
];

export const typyStrechy: { id: TypStrechy; nazov: string; popis: string }[] = [
  { id: "sedlova", nazov: "Sedlová", popis: "Dve roviny, štíty po bokoch" },
  { id: "valbova", nazov: "Valbová", popis: "Šikmé roviny zo všetkých strán" },
  { id: "pultova", nazov: "Pultová", popis: "Jedna šikmá rovina" },
  { id: "stanova", nazov: "Stanová", popis: "Štyri roviny do jedného vrcholu" },
  { id: "manzardova", nazov: "Manzardová", popis: "Zlomená rovina, podkrovie" },
];

export const sklony: { id: Sklon; nazov: string; popis: string }[] = [
  { id: "nizky", nazov: "Nízky", popis: "do 20°" },
  { id: "bezny", nazov: "Bežný", popis: "20 – 40°" },
  { id: "strmy", nazov: "Strmý", popis: "nad 40°" },
];

export const krytiny: {
  id: Krytina;
  nazov: string;
  popis: string;
}[] = [
  {
    id: "falcovana",
    nazov: "Falcovaná plechová",
    popis: "Bez viditeľného kotvenia, dlhá životnosť. Vhodná aj na nízky sklon.",
  },
  {
    id: "skridlovy_plech",
    nazov: "Plechová škridlová",
    popis: "Vzhľad škridly, nízka hmotnosť, priaznivá cena.",
  },
  {
    id: "trapezovy_plech",
    nazov: "Trapézový plech",
    popis: "Najúspornejšie riešenie, najmä pre hospodárske stavby.",
  },
  {
    id: "betonova_skridla",
    nazov: "Betónová alebo pálená škridla",
    popis: "Klasika s vysokou hmotnosťou — konštrukcia ju musí uniesť.",
  },
  {
    id: "sindel",
    nazov: "Šindeľ",
    popis: "Tichý, tvarovo prispôsobivý, vhodný na členité strechy.",
  },
];

export const triedy: {
  id: Trieda;
  nazov: string;
  popis: string;
  detaily: string[];
  odporucane?: boolean;
}[] = [
  {
    id: "zaklad",
    nazov: "Základ",
    popis: "Nižšia obstarávacia cena",
    detaily: ["Tenší plech", "Základná povrchová ochrana", "Kratšia záruka"],
  },
  {
    id: "standard",
    nazov: "Štandard",
    popis: "Bežná voľba",
    detaily: [
      "Osvedčená hrúbka plechu",
      "Matná povrchová úprava",
      "Dlhšia záruka výrobcu",
    ],
    odporucane: true,
  },
  {
    id: "premium",
    nazov: "Premium",
    popis: "Najdlhšia životnosť",
    detaily: [
      "Najhrubší plech",
      "Prémiová povrchová ochrana",
      "Najdlhšia záruka výrobcu",
    ],
  },
];

export const doplnkyPodlaProjektu: Record<TypProjektu, Doplnok[]> = {
  strecha_komplet: [
    "debnenie",
    "latovanie",
    "kontralatovanie",
    "poistna_hydroizolacia",
    "odkvapovy_system",
    "oplechovanie_kominov",
    "stresne_okno",
    "stresny_vylez",
    "sneholamy",
    "tepelna_izolacia",
    "parozabrana",
    "podhladove_plechy",
  ],
  rekonstrukcia: [
    "demontaz_krytiny",
    "demontaz_latovania",
    "debnenie",
    "latovanie",
    "kontralatovanie",
    "poistna_hydroizolacia",
    "odkvapovy_system",
    "oplechovanie_kominov",
    "stresne_okno",
    "stresny_vylez",
    "sneholamy",
    "tepelna_izolacia",
    "podhladove_plechy",
  ],
  krov: ["debnenie", "latovanie", "kontralatovanie"],
  oprava: [],
};

/** Čo je pri danom type projektu predvolene zaškrtnuté. */
export const predvoleneDoplnky: Record<TypProjektu, Doplnok[]> = {
  strecha_komplet: [
    "latovanie",
    "kontralatovanie",
    "poistna_hydroizolacia",
    "odkvapovy_system",
  ],
  rekonstrukcia: [
    "demontaz_krytiny",
    "demontaz_latovania",
    "latovanie",
    "kontralatovanie",
    "poistna_hydroizolacia",
  ],
  krov: ["latovanie"],
  oprava: [],
};

export const nazvyVymerov = {
  okap: "Okapová hrana",
  zavetrova: "Závetrová (štítová) hrana",
  hreben: "Hrebeň",
  narozia: "Nárožia",
  uzlabie: "Úžľabie",
} as const;
