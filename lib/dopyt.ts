import { company } from "@/lib/content";

/**
 * Doručenie dopytu — spoločné pre kalkulátor aj pre krátky formulár
 * na podstránkach služieb.
 *
 * Pôvodne to bolo len v `lib/kalkulator/odoslanie.ts`. Keď pribudol druhý
 * formulár, logika sa presunula sem — náhradná cesta cez `mailto:` je príliš
 * dôležitá na to, aby existovala v dvoch kópiách, ktoré sa časom rozídu.
 */

export type VysledokOdoslania = {
  ok: boolean;
  /**
   * `server`  — dopyt odišiel e-mailom firme, zákazník nemusí robiť nič
   * `email`   — server zlyhal, otvorili sme zákazníkovi e-mailový program
   */
  sposob: "server" | "email";
};

export type Dopyt = {
  meno: string;
  telefon: string;
  email: string;
  adresa?: string;
  poznamka?: string;
  /** Pasca na roboty — v UI je pole skryté a človek ho nevyplní. */
  web?: string;
  /** Čo si zákazník pýta. Ide do predmetu e-mailu. */
  typProjektu: string;
  /** Orientačná cena, ak ju vieme (kalkulátor). */
  cena?: string;
  /** Čitateľný súhrn do tela e-mailu aj do náhradného `mailto:`. */
  suhrn: string;
};

/**
 * Primárne ide na `/api/dopyt`, ktorý pošle e-mail cez Resend.
 *
 * Ak by to z akéhokoľvek dôvodu zlyhalo (výpadok Resendu, chýbajúci API
 * kľúč, offline zákazník), spadne to na `mailto:`. Dopyt sa teda nikdy
 * nestratí, len prejde inou cestou — a volajúci sa podľa `sposob` dozvie,
 * ktorou, aby vedel zobraziť správnu potvrdzovaciu obrazovku.
 */
export async function posliDopyt(dopyt: Dopyt): Promise<VysledokOdoslania> {
  try {
    const odpoved = await fetch("/api/dopyt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        meno: dopyt.meno,
        telefon: dopyt.telefon,
        email: dopyt.email,
        adresa: dopyt.adresa ?? "",
        poznamka: dopyt.poznamka ?? "",
        web: dopyt.web ?? "",
        typProjektu: dopyt.typProjektu,
        cena: dopyt.cena ?? "",
        suhrn: dopyt.suhrn,
      }),
    });

    if (odpoved.ok) {
      const data = (await odpoved.json()) as { ok?: boolean };
      if (data.ok) return { ok: true, sposob: "server" };
    }
  } catch {
    // Ticho — nižšie je náhradná cesta.
  }

  window.location.href =
    `mailto:${company.email}` +
    `?subject=${encodeURIComponent(`Dopyt z webu — ${dopyt.typProjektu}`)}` +
    `&body=${encodeURIComponent(dopyt.suhrn)}`;

  return { ok: true, sposob: "email" };
}
