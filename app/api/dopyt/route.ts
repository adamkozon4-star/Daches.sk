import { company } from "@/lib/content";

/**
 * Príjem dopytu z kalkulátora a odoslanie e-mailom cez Resend.
 *
 * ── Prečo bez knižnice `resend` ─────────────────────────────────────────
 * Resend má oficiálny npm balík, ale robí presne to, čo pár riadkov nižšie —
 * jedno POST volanie. Nepridávame závislosť, ktorú by bolo treba udržiavať.
 *
 * ── Vyžaduje server ─────────────────────────────────────────────────────
 * Toto je jediná dynamická routa na webe. Kvôli nej sa zrušil statický
 * export — v ňom fungujú len `GET` handlery. Podrobnosti v next.config.ts.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RESEND_API = "https://api.resend.com/emails";

/** Odosielateľ. Doména musí byť overená v Resende, inak Resend odmietne. */
const ODOSIELATEL = process.env.DOPYT_ODOSIELATEL ?? "Daches web <dopyt@daches.sk>";

/** Kam dopyt chodí. Predvolene firemný e-mail z obsahu webu. */
const PRIJEMCA = process.env.DOPYT_PRIJEMCA ?? company.email;

type Telo = {
  suhrn?: string;
  meno?: string;
  telefon?: string;
  email?: string;
  adresa?: string;
  poznamka?: string;
  cena?: string;
  typProjektu?: string;
  /** Pasca na roboty — človek toto pole nikdy nevyplní. */
  web?: string;
};

const orez = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

const jeEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

/** Zabráni tomu, aby sa vstup od používateľa prepašoval do HTML e-mailu. */
const bezpecne = (v: string) =>
  v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function POST(request: Request) {
  let telo: Telo;
  try {
    telo = (await request.json()) as Telo;
  } catch {
    return Response.json({ ok: false, dovod: "neplatny_json" }, { status: 400 });
  }

  // Pasca na roboty: skryté pole, ktoré človek nevyplní. Tvárime sa, že
  // odoslanie prebehlo, nech spamer nevie, že ho web odhalil.
  if (orez(telo.web, 100)) {
    return Response.json({ ok: true });
  }

  const meno = orez(telo.meno, 120);
  const telefon = orez(telo.telefon, 40);
  const email = orez(telo.email, 160);
  const adresa = orez(telo.adresa, 200);
  const poznamka = orez(telo.poznamka, 2000);
  const suhrn = orez(telo.suhrn, 6000);
  const cena = orez(telo.cena, 80);
  const typProjektu = orez(telo.typProjektu, 80);

  if (!meno || !telefon || !email) {
    return Response.json({ ok: false, dovod: "chybaju_udaje" }, { status: 400 });
  }

  if (!jeEmail(email)) {
    return Response.json({ ok: false, dovod: "neplatny_email" }, { status: 400 });
  }

  /**
   * Kľúč kontrolujeme až tu — zámerne.
   *
   * Keby sme to robili hneď na začiatku, chýbajúce údaje aj pasca na roboty
   * by vracali „chybu konfigurácie" namiesto svojej vlastnej odpovede.
   * Validácia vstupu musí fungovať nezávisle od toho, či je server nastavený.
   */
  const kluc = process.env.RESEND_API_KEY;

  if (!kluc) {
    // Chyba nasadenia, nie chyba návštevníka — nech je dohľadateľná v logoch.
    console.error("[dopyt] Chýba premenná RESEND_API_KEY");
    return Response.json({ ok: false, dovod: "konfiguracia" }, { status: 500 });
  }

  const riadok = (popis: string, hodnota: string) =>
    hodnota
      ? `<tr>
           <td style="padding:6px 16px 6px 0;color:#6b6b6b;white-space:nowrap;vertical-align:top">${bezpecne(popis)}</td>
           <td style="padding:6px 0;color:#111111;font-weight:600">${bezpecne(hodnota)}</td>
         </tr>`
      : "";

  /**
   * Kompletný HTML dokument s deklaráciou kódovania.
   *
   * Bez `<meta charset="utf-8">` si niektoré e-mailové klienty kódovanie
   * hádajú a slovenská diakritika sa rozpadne na otázniky. Preto je tu celý
   * dokument, nie len `<div>`.
   */
  const html = `
<!doctype html>
<html lang="sk">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Nový dopyt z webu</title>
</head>
<body style="margin:0;background:#ffffff">
<div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;max-width:640px;margin:0 auto;padding:24px;color:#111111">
  <p style="margin:0 0 4px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#6b6b6b">Nový dopyt z webu</p>
  <h1 style="margin:0 0 24px;font-size:22px;line-height:1.3">${bezpecne(typProjektu || "Cenový kalkulátor")}</h1>

  ${
    cena
      ? `<div style="background:#dfff4f;border-radius:12px;padding:16px 20px;margin-bottom:24px">
           <div style="font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#4a4a2a">Orientačný rozsah</div>
           <div style="font-size:24px;font-weight:800;margin-top:4px">${bezpecne(cena)}</div>
         </div>`
      : ""
  }

  <h2 style="font-size:14px;letter-spacing:.1em;text-transform:uppercase;color:#6b6b6b;margin:0 0 8px">Kontakt</h2>
  <table style="width:100%;border-collapse:collapse;font-size:15px;margin-bottom:24px">
    ${riadok("Meno", meno)}
    <tr>
      <td style="padding:6px 16px 6px 0;color:#6b6b6b;white-space:nowrap">Telefón</td>
      <td style="padding:6px 0;font-weight:600"><a href="tel:${bezpecne(telefon.replace(/\s/g, ""))}" style="color:#111111">${bezpecne(telefon)}</a></td>
    </tr>
    <tr>
      <td style="padding:6px 16px 6px 0;color:#6b6b6b;white-space:nowrap">E-mail</td>
      <td style="padding:6px 0;font-weight:600"><a href="mailto:${bezpecne(email)}" style="color:#111111">${bezpecne(email)}</a></td>
    </tr>
    ${riadok("Adresa stavby", adresa)}
  </table>

  ${
    poznamka
      ? `<h2 style="font-size:14px;letter-spacing:.1em;text-transform:uppercase;color:#6b6b6b;margin:0 0 8px">Poznámka</h2>
         <p style="margin:0 0 24px;font-size:15px;line-height:1.6;white-space:pre-wrap">${bezpecne(poznamka)}</p>`
      : ""
  }

  ${
    suhrn
      ? `<h2 style="font-size:14px;letter-spacing:.1em;text-transform:uppercase;color:#6b6b6b;margin:0 0 8px">Zadanie z kalkulátora</h2>
         <pre style="margin:0;padding:16px;background:#f7f7f5;border-radius:12px;font-family:ui-monospace,monospace;font-size:13px;line-height:1.6;white-space:pre-wrap">${bezpecne(suhrn)}</pre>`
      : ""
  }

  <p style="margin-top:28px;padding-top:16px;border-top:1px solid #e5e5e5;font-size:12px;color:#9a9a9a">
    Odoslané z kalkulátora na ${bezpecne(company.url)} · Odpoveď na tento e-mail pôjde priamo zákazníkovi.
  </p>
</div>
</body>
</html>`.trim();

  try {
    const odpoved = await fetch(RESEND_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${kluc}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: ODOSIELATEL,
        to: [PRIJEMCA],
        // Vďaka tomuto stačí v schránke kliknúť „Odpovedať" a píše sa zákazníkovi.
        replyTo: email,
        subject: `Dopyt: ${typProjektu || "kalkulátor"} — ${meno}`,
        html,
      }),
    });

    if (!odpoved.ok) {
      const detail = await odpoved.text();
      console.error("[dopyt] Resend odmietol:", odpoved.status, detail);
      return Response.json(
        { ok: false, dovod: "odoslanie_zlyhalo" },
        { status: 502 },
      );
    }

    return Response.json({ ok: true });
  } catch (chyba) {
    console.error("[dopyt] Nepodarilo sa spojiť s Resendom:", chyba);
    return Response.json(
      { ok: false, dovod: "odoslanie_zlyhalo" },
      { status: 502 },
    );
  }
}
