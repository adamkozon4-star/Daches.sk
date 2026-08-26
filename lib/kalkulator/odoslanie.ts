import { company } from "@/lib/content";
import { DPH } from "@/lib/kalkulator/cennik";
import { krytiny, typyProjektu, typyStrechy } from "@/lib/kalkulator/moznosti";
import { cislo, rozsahEur } from "@/lib/kalkulator/vypocet";
import type { Vstup, Vysledok } from "@/lib/kalkulator/typy";

export type Kontakt = {
  meno: string;
  telefon: string;
  email: string;
  adresa: string;
  poznamka: string;
};

/**
 * ⚠️ DOČASNÉ RIEŠENIE — nahradiť skutočným endpointom.
 *
 * Web zatiaľ nemá backend, takže dopyt sa otvorí v e-mailovom klientovi
 * zákazníka. Funguje to hneď a nič sa nestratí, ale konverzia je horšia,
 * než keď sa formulár odošle priamo.
 *
 * Až bude kam posielať (API route na Verceli, n8n, GHL, e-mailová služba),
 * vymení sa telo tejto funkcie — volajúci kód sa meniť nemusí.
 */
export async function odosliDopyt(
  vstup: Vstup,
  vysledok: Vysledok | null,
  kontakt: Kontakt,
): Promise<{ ok: boolean; sposob: "email" }> {
  const telo = zostavSuhrn(vstup, vysledok, kontakt);
  const predmet = `Dopyt z kalkulátora — ${nazovProjektu(vstup)}`;

  const url =
    `mailto:${company.email}` +
    `?subject=${encodeURIComponent(predmet)}` +
    `&body=${encodeURIComponent(telo)}`;

  window.location.href = url;
  return { ok: true, sposob: "email" };
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
      r.push(
        `ORIENTAČNÝ ROZSAH (bez DPH): ${rozsahEur(vysledok.spolu)}`,
      );
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
