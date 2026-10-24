import { dotaciaNaStrechu } from "@/lib/radca/dotacia-na-strechu";
import { kolkoStojiStrecha } from "@/lib/radca/kolko-stoji-strecha";
import { plechAleboSkridla } from "@/lib/radca/plech-alebo-skridla";
import type { Clanok } from "@/lib/radca/typy";
import { vymenaStrechyPovolenie } from "@/lib/radca/vymena-strechy-povolenie";
import { zatekanieStrechy } from "@/lib/radca/zatekanie-strechy";

export type { Clanok } from "@/lib/radca/typy";

/**
 * Radca — odpovede na otázky, ktoré ľudia o strechách googlia.
 *
 * ── Prečo ───────────────────────────────────────────────────────────────
 * Podstránky služieb chytajú dopyty typu „výmena strechy". Radca chytá
 * otázky, ktoré prichádzajú skôr: „koľko stojí strecha", „plech alebo
 * škridla", „treba povolenie". Z každého článku vedú odkazy na služby
 * a do kalkulátora — a zo služieb späť na články (`sluzby` v článku).
 *
 * Témy sú z našepkávača Google (hl=sk, gl=sk). Každá má v ňom vlastné
 * návrhy, napr. „koľko stojí strecha na rodinný dom", „dotácia na strechu
 * 2026", „výmena strechy stavebné povolenie", „zatekanie strechy oprava".
 *
 * ── Fakty ───────────────────────────────────────────────────────────────
 * Zákony a dotácie len z primárnych zdrojov (slov-lex.sk, obnovdom.sk),
 * so zdrojmi v `zdroje`. Žiadne ceny firmy, sumy dotácií ani termíny —
 * menia sa a nesprávny údaj je horší než odkaz na zdroj.
 */
export const clanky: Clanok[] = [
  kolkoStojiStrecha,
  plechAleboSkridla,
  vymenaStrechyPovolenie,
  zatekanieStrechy,
  dotaciaNaStrechu,
];

export const najdiClanok = (slug: string) => clanky.find((c) => c.slug === slug);

/** Články, ktoré odkazujú na danú službu — tá na ne odkáže späť. */
export const clankyKSluzbe = (slug: string) =>
  clanky.filter((c) => c.sluzby.includes(slug));
