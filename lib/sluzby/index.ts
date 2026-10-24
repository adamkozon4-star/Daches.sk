import { klampiarskePrace } from "@/lib/sluzby/klampiarske-prace";
import { novaStrechaNaKluc } from "@/lib/sluzby/nova-strecha-na-kluc";
import { plechovaStrecha } from "@/lib/sluzby/plechova-strecha";
import { tesarskePrace } from "@/lib/sluzby/tesarske-prace";
import type { Sluzba } from "@/lib/sluzby/typy";
import { vymenaStrechy } from "@/lib/sluzby/vymena-strechy";
import { vystavbaKrovov } from "@/lib/sluzby/vystavba-krovov";

export type { Blok, FaqPolozka, Kapitola, Obrazok, Sluzba } from "@/lib/sluzby/typy";

/**
 * Podstránky služieb.
 *
 * ── Prečo vôbec vznikli ─────────────────────────────────────────────────
 * Dovtedy bol celý web jedna stránka a Google jej vedel priradiť zhruba
 * jeden okruh dopytov. Každá služba má vlastnú URL, vlastný `title`,
 * vlastný text a vlastné FAQ.
 *
 * ── Jedna služba = jeden súbor ──────────────────────────────────────────
 * Pri šiestich službách by jeden súbor mal vyše 1 300 riadkov. Pridanie
 * služby = nový súbor v tomto priečinku, záznam do poľa nižšie a `slug`
 * pri karte v `services` v `lib/content.ts`. Routa, metadáta, drobčeky,
 * schéma, sitemap, menu aj pätka sa napoja samy.
 *
 * ── Ako vznikol výber tém ───────────────────────────────────────────────
 * Z našepkávača Google (hl=sk, gl=sk), teda z toho, čo ľudia reálne píšu.
 * Napríklad pri krove: „krov cena za m2", „za m3", „väzníkový krov cena",
 * „hambálkový krov"; pri klampiarine: „odkvapy a zvody", „oplechovanie
 * komína postup", „zatekanie strechy okolo komína". FAQ a kapitoly
 * odpovedajú presne na tieto otázky.
 *
 * Lokalitné podstránky (obec po obci) sa zámerne nerobili: dopyt
 * „strechár + obec" sa na Orave prakticky nemeria — `strechár Námestovo`
 * ani `strecha Dolný Kubín` nemajú v našepkávači jediný návrh.
 *
 * ── Čo sa sem smie a nesmie napísať ─────────────────────────────────────
 * ÁNO: technické fakty o strechách — hmotnosti, typy krovov, vlastnosti
 *      materiálov. Sú to bežné hodnoty pre daný typ, nie údaje konkrétneho
 *      výrobku; každá tabuľka to musí povedať v poznámke.
 * NIE: čokoľvek o firme, čo nie je overené s klientom — roky praxe, počty
 *      realizácií, záruky, hodnotenia, ceny. Pri dotáciách a povoleniach
 *      žiadne konkrétne sumy ani lehoty.
 *
 * ── Fotky ───────────────────────────────────────────────────────────────
 * Názvy niektorých súborov nesedia s obsahom — riaď sa názvom v kóde
 * (`photos.krovNovostavba`…), nie názvom súboru. Mapa je v `lib/images.ts`.
 */

/** Poradie zodpovedá číslovaniu kariet na úvodnej stránke (01 – 06). */
export const sluzby: Sluzba[] = [
  vystavbaKrovov,
  novaStrechaNaKluc,
  vymenaStrechy,
  tesarskePrace,
  plechovaStrecha,
  klampiarskePrace,
];

export const najdiSluzbu = (slug: string) => sluzby.find((s) => s.slug === slug);
