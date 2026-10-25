/**
 * SEO audit všetkých stránok zo sitemap.
 *
 * Kontroluje to, čo sa na webe už raz pokazilo alebo čo hlásia audity
 * (SEOptimer a pod.): dĺžku a duplicity titulkov a popisov, canonical,
 * počet H1, preskočené úrovne nadpisov, fotky bez alt a platnosť
 * štruktúrovaných dát. Na konci vypíše, čo chýba v schéme firmy.
 *
 * Spustenie:  node scripts/audit-seo.mjs [https://daches.sk]
 * Návratový kód 1 = našli sa problémy (dá sa použiť v CI).
 */

const BASE = (process.argv[2] ?? "https://daches.sk").replace(/\/$/, "");

const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
const stranky = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (m) => BASE + new URL(m[1]).pathname,
);

const problemy = [];
const titulky = new Map();
const popisy = new Map();
let schemaFirmy = "";

for (const url of stranky) {
  const html = await (await fetch(url)).text();
  const cesta = new URL(url).pathname;

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
  const popis = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
  titulky.set(title, [...(titulky.get(title) ?? []), cesta]);
  popisy.set(popis, [...(popisy.get(popis) ?? []), cesta]);

  if (!title) problemy.push(`${cesta}: chýba <title>`);
  if (title.length > 60) problemy.push(`${cesta}: title ${title.length} znakov (max 60)`);
  if (popis.length < 70 || popis.length > 160)
    problemy.push(`${cesta}: description ${popis.length} znakov (70 – 160)`);
  if (!/<link rel="canonical"/.test(html)) problemy.push(`${cesta}: chýba canonical`);

  const nadpisy = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  const h1 = nadpisy.filter((n) => n === 1).length;
  if (h1 !== 1) problemy.push(`${cesta}: ${h1}× <h1> (má byť 1)`);
  for (let i = 1; i < nadpisy.length; i++) {
    if (nadpisy[i] > nadpisy[i - 1] + 1) {
      problemy.push(`${cesta}: preskočená úroveň h${nadpisy[i - 1]} → h${nadpisy[i]}`);
      break;
    }
  }

  const bezAlt = [...html.matchAll(/<img[^>]*>/g)].filter((m) => !/alt="[^"]+"/.test(m[0]));
  if (bezAlt.length) problemy.push(`${cesta}: ${bezAlt.length} fotiek bez alt`);

  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(m[1]);
      if (cesta === "/") schemaFirmy += m[1];
    } catch {
      problemy.push(`${cesta}: neplatné JSON-LD`);
    }
  }
}

for (const [t, cesty] of titulky) if (cesty.length > 1) problemy.push(`duplicitný title „${t}": ${cesty.join(", ")}`);
for (const [p, cesty] of popisy) if (cesty.length > 1) problemy.push(`duplicitný popis: ${cesty.join(", ")}`);

console.log(`${stranky.length} stránok`);
console.log(problemy.length ? problemy.join("\n") : "Bez problémov.");

// Nie chyby, ale čo ešte chýba v schéme firmy — doplniť po dodaní údajov.
const chyba = [];
if (!/"logo"/.test(schemaFirmy)) chyba.push("logo");
if (!/"sameAs":\["/.test(schemaFirmy)) chyba.push("sameAs (Google Business, Facebook)");
if (!/"hasMap"/.test(schemaFirmy)) chyba.push("hasMap (odkaz na Google mapu)");
if (!/taxID|vatID|identifier/.test(schemaFirmy)) chyba.push("IČO");
if (chyba.length) console.log(`\nSchéma firmy — chýba: ${chyba.join(", ")}`);

process.exit(problemy.length ? 1 : 0);
