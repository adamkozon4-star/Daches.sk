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
  /** Pasca na roboty — v UI je toto pole skryté a človek ho nevyplní. */
  web?: string;
};

export type VysledokOdoslania = {
  ok: boolean;
  /**
   * `server`  — dopyt odišiel e-mailom firme, zákazník nemusí robiť nič
   * `email`   — server zlyhal, otvorili sme zákazníkovi e-mailový program
   */
  sposob: "server" | "email";
};

/**
 * Odoslanie dopytu.
 *
 * Primárne ide na `/api/dopyt`, ktorý pošle e-mail cez Resend. Ak by to
 * z akéhokoľvek dôvodu zlyhalo (výpadok Resendu, chýbajúci API kľúč,
 * offline zákazník), spadne to na `mailto:` — dopyt sa teda nikdy
 * nestratí, len prejde inou cestou.
 */
export async function odosliDopyt(
  vstup: Vstup,
  vysledok: Vysledok | null,
  kontakt: Kontakt,
): Promise<VysledokOdoslania> {
  const suhrn = zostavSuhrn(vstup, vysledok, kontakt);

  try {
    const odpoved = await fetch("/api/dopyt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        meno: kontakt.meno,
        telefon: kontakt.telefon,
        email: kontakt.email,
        adresa: kontakt.adresa,
        poznamka: kontakt.poznamka,
        web: kontakt.web ?? "",
        typProjektu: nazovProjektu(vstup),
        cena: vysledok ? `${rozsahEur(vysledok.spolu)} bez DPH` : "",
        suhrn,
      }),
    });

    if (odpoved.ok) {
      const data = (await odpoved.json()) as { ok?: boolean };
      if (data.ok) return { ok: true, sposob: "server" };
    }
  } catch {
    // Ticho — nižšie je náhradná cesta.
  }

  otvorEmailovyProgram(suhrn, vstup);
  return { ok: true, sposob: "email" };
}

function otvorEmailovyProgram(suhrn: string, vstup: Vstup) {
  const predmet = `Dopyt z kalkulátora — ${nazovProjektu(vstup)}`;
  window.location.href =
    `mailto:${company.email}` +
    `?subject=${encodeURIComponent(predmet)}` +
    `&body=${encodeURIComponent(suhrn)}`;
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
