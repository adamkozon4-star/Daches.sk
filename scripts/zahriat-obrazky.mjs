/**
 * Predgeneruje všetky varianty fotiek, aby ich návštevník dostal z cache.
 *
 * ── Prečo ───────────────────────────────────────────────────────────────
 * Vercel nevytvára zmenšené fotky pri builde, ale až pri prvej požiadavke
 * na konkrétnu kombináciu šírky, kvality a formátu. Prvá požiadavka čaká
 * na kódovanie (AVIF hero 1920 px: ~1,3 s), každá ďalšia ide z cache
 * (~0,2 s). Na webe s menšou návštevnosťou na studenú fotku narazí veľa
 * ľudí — hero na nových podstránkach sa preto načítavala viditeľne pomaly.
 *
 * Cache sa podľa dokumentácie Vercelu drží najviac 31 dní a nové nasadenie
 * ju nemaže. Preto skript beží po každom produkčnom nasadení aj raz týždenne
 * (`.github/workflows/zahriat-obrazky.yml`). Fotka, ktorá už v cache je,
 * sa len prečíta — znova sa nekóduje a neplatí sa za ňu ako za transformáciu.
 *
 * ── Čo robí ─────────────────────────────────────────────────────────────
 * Prejde stránky zo sitemap, vytiahne z HTML všetky adresy `/_next/image`
 * (src, srcSet aj preload) a každú si vyžiada dvakrát: ako prehliadač, ktorý
 * vie AVIF, a ako prehliadač, ktorý vie len WebP. Formát je súčasť kľúča
 * cache, takže treba oba.
 *
 * Spustenie:  node scripts/zahriat-obrazky.mjs [https://daches.sk]
 */

const BASE = (process.argv[2] ?? "https://daches.sk").replace(/\/$/, "");
const SUBEZNE = 6;
const FORMATY = {
  avif: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
  webp: "image/webp,image/apng,image/*,*/*;q=0.8",
};

const text = async (url) => {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${url} → HTTP ${r.status}`);
  return r.text();
};

const sitemap = await text(`${BASE}/sitemap.xml`);
// Sitemap obsahuje produkčné adresy — pri spustení proti inej adrese
// (náhľad) sa stránky čítajú z nej, nie z produkcie.
const stranky = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (m) => BASE + new URL(m[1]).pathname,
);

const adresy = new Set();
for (const s of stranky) {
  const html = (await text(s)).replaceAll("&amp;", "&");
  for (const m of html.matchAll(/\/_next\/image\?url=[^\s",]+/g)) adresy.add(m[0]);
}

const ulohy = [...adresy].flatMap((a) =>
  Object.entries(FORMATY).map(([format, accept]) => ({ a, format, accept })),
);

console.log(`${stranky.length} stránok, ${adresy.size} adries fotiek, ${ulohy.length} variantov`);

const stav = {};
const chyby = [];
const zaciatok = Date.now();

const zahriat = async ({ a, format, accept }) => {
  for (let pokus = 1; pokus <= 2; pokus++) {
    try {
      const r = await fetch(BASE + a, { headers: { Accept: accept } });
      await r.arrayBuffer();
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const c = r.headers.get("x-vercel-cache") ?? "bez hlavičky";
      stav[c] = (stav[c] ?? 0) + 1;
      return;
    } catch (e) {
      if (pokus === 2) chyby.push(`${format} ${a} — ${e.message}`);
    }
  }
};

let i = 0;
await Promise.all(
  Array.from({ length: SUBEZNE }, async () => {
    while (i < ulohy.length) await zahriat(ulohy[i++]);
  }),
);

console.log(`Hotovo za ${Math.round((Date.now() - zaciatok) / 1000)} s`);
// MISS = práve sa vygenerovalo, HIT = už bolo v cache.
console.log(stav);

if (chyby.length) {
  console.error(`\n${chyby.length} variantov zlyhalo:`);
  for (const c of chyby.slice(0, 20)) console.error("  " + c);
  process.exit(1);
}
