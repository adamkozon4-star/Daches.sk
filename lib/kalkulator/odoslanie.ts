import { DPH } from "@/lib/kalkulator/cennik";
import {
  krytiny,
  maVolbuPlechu,
  plechy,
  typyProjektu,
  typyStrechy,
} from "@/lib/kalkulator/moznosti";
import { cislo, rozsahEur } from "@/lib/kalkulator/vypocet";
import { posliDopyt, type VysledokOdoslania } from "@/lib/dopyt";
import type { Vstup, Vysledok } from "@/lib/kalkulator/typy";

export type { VysledokOdoslania };

export type Kontakt = {
  meno: string;
  telefon: string;
  email: string;
  adresa: string;
  poznamka: string;
  /** Pasca na roboty — v UI je toto pole skryté a človek ho nevyplní. */
  web?: string;
};

/**
 * Dopyt z kalkulátora.
 *
 * Zostaví čitateľný súhrn zo zadania a odovzdá ho spoločnému odosielaniu
 * v `lib/dopyt.ts` — vrátane náhradnej cesty cez `mailto:`, keby server
 * zlyhal.
 */
export async function odosliDopyt(
  vstup: Vstup,
  vysledok: Vysledok | null,
  kontakt: Kontakt,
): Promise<VysledokOdoslania> {
  return posliDopyt({
    meno: kontakt.meno,
    telefon: kontakt.telefon,
    email: kontakt.email,
    adresa: kontakt.adresa,
    poznamka: kontakt.poznamka,
    web: kontakt.web,
    typProjektu: nazovProjektu(vstup),
    cena: vysledok ? `${rozsahEur(vysledok.spolu)} bez DPH` : "",
    suhrn: zostavSuhrn(vstup, vysledok, kontakt),
  });
}

const nazovProjektu = (v: Vstup) =>
  typyProjektu.find((t) => t.id === v.typProjektu)?.nazov ?? v.typProjektu;

/** Čitateľný súhrn dopytu — použije sa v e-maile aj v tlačenej ponuke. */
export function zostavSuhrn(
  vstup: Vstup,
  vysledok: Vysledok | null,
  kontakt: Kontakt,
): string {
  const r: string[] = [];

  r.push("DOPYT Z CENOVÉHO KALKULÁTORA");
  r.push("");
  r.push(`Typ projektu: ${nazovProjektu(vstup)}`);

  if (vstup.typProjektu !== "oprava") {
    const strecha = typyStrechy.find((t) => t.id === vstup.typStrechy)?.nazov;
    const krytina = krytiny.find((k) => k.id === vstup.krytina)?.nazov;

    r.push(`Typ strechy: ${strecha}`);
    r.push(`Plocha strechy: ${cislo(vstup.plocha)} m²`);
    r.push(`Sklon: ${vstup.sklon}`);
    r.push(`Krytina: ${krytina} (trieda ${vstup.trieda})`);

    // Materiál plechu má zmysel len tam, kde sa zákazníka naň pýtame.
    if (maVolbuPlechu(vstup.krytina)) {
      const material = plechy.find((x) => x.id === vstup.plech)?.nazov;
      r.push(`Materiál plechu: ${material}`);
    }
    r.push("");
    r.push(
      `Výmery${vstup.vymeryRucne ? " (zadané ručne)" : " (odhad z plochy)"}:`,
    );
    r.push(`  okap ${cislo(vstup.vymery.okap)} bm`);
    r.push(`  závetrová ${cislo(vstup.vymery.zavetrova)} bm`);
    r.push(`  hrebeň ${cislo(vstup.vymery.hreben)} bm`);
    if (vstup.vymery.narozia) r.push(`  nárožia ${cislo(vstup.vymery.narozia)} bm`);
    if (vstup.vymery.uzlabie) r.push(`  úžľabie ${cislo(vstup.vymery.uzlabie)} bm`);

    if (vstup.pocty.kominy) r.push(`Komíny: ${vstup.pocty.kominy}`);
    if (vstup.pocty.okna) r.push(`Strešné okná: ${vstup.pocty.okna}`);

    if (vysledok) {
      r.push("");
      r.push(`ORIENTAČNÝ ROZSAH (bez DPH): ${rozsahEur(vysledok.spolu)}`);
      r.push(`DPH ${DPH} % sa pripočítava.`);
      r.push("Ide o odhad, nie o záväznú ponuku.");
    }
  }

  r.push("");
  r.push("KONTAKT");
  r.push(`Meno: ${kontakt.meno}`);
  r.push(`Telefón: ${kontakt.telefon}`);
  r.push(`E-mail: ${kontakt.email}`);
  if (kontakt.adresa) r.push(`Adresa stavby: ${kontakt.adresa}`);
  if (kontakt.poznamka) {
    r.push("");
    r.push(`Poznámka: ${kontakt.poznamka}`);
  }

  return r.join("\n");
}
