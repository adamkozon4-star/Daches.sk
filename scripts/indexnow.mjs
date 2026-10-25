/**
 * Ohlási stránky webu vyhľadávačom cez IndexNow.
 *
 * ── Čo to je ────────────────────────────────────────────────────────────
 * Otvorený protokol, cez ktorý web povie „táto adresa je nová alebo sa
 * zmenila". Jedna požiadavka na api.indexnow.org sa rozošle všetkým
 * zapojeným vyhľadávačom — Bing (a cez neho ChatGPT a Copilot), Seznam,
 * Yandex, Naver. Google IndexNow NEPODPORUJE — tam treba Search Console.
 *
 * ── Kľúč ────────────────────────────────────────────────────────────────
 * Vyhľadávač overí, že ohlásenie posiela majiteľ webu: stiahne súbor
 * `https://daches.sk/<KĽÚČ>.txt` a porovná jeho obsah s kľúčom. Súbor je
 * v `public/`. Kľúč nie je tajomstvo — je verejne na webe zámerne.
 *
 * ── Kedy spúšťať ────────────────────────────────────────────────────────
 * Po nasadení zmien OBSAHU (nová podstránka, prepísaný text). Nie pri
 * každom nasadení — opakované hlásenie nezmenených adries vyhľadávače
 * berú ako šum.
 *
 *   node scripts/indexnow.mjs                 všetky adresy zo sitemap
 *   node scripts/indexnow.mjs /radca /kalkulator   len vybrané
 */

const HOST = "daches.sk";
const KLUC = "bf49ad619c0fdfdffc92132d0f985a24";
const BASE = `https://${HOST}`;

const vybrane = process.argv.slice(2);

let adresy;
if (vybrane.length) {
  adresy = vybrane.map((a) => (a.startsWith("http") ? a : BASE + a));
} else {
  const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
  adresy = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

// Poistka: vyhľadávač odmietne celú dávku, ak overovací súbor nesedí.
const overenie = await fetch(`${BASE}/${KLUC}.txt`);
if (!overenie.ok || (await overenie.text()).trim() !== KLUC) {
  console.error(`Overovací súbor ${BASE}/${KLUC}.txt nie je nasadený alebo nesedí.`);
  process.exit(1);
}

const r = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KLUC,
    keyLocation: `${BASE}/${KLUC}.txt`,
    urlList: adresy,
  }),
});

// 200 = prijaté, 202 = prijaté, kľúč sa ešte overuje. Ostatné sú chyby.
console.log(`IndexNow: HTTP ${r.status} — ${adresy.length} adries`);
for (const a of adresy) console.log("  " + a);
if (r.status !== 200 && r.status !== 202) {
  console.error(await r.text());
  process.exit(1);
}
