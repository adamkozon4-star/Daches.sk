/**
 * Kontrast textu nad hero fotkou podstránok služieb.
 *
 * ── Ako sa spúšťa ───────────────────────────────────────────────────────
 * NIE cez `node`. Obsah tohto súboru sa vloží do konzoly prehliadača na
 * otvorenej stránke `/sluzby/<nieco>`. Potrebuje skutočne vykreslený layout
 * (pozície textu závisia od šírky okna) aj reálne pixely fotky.
 *
 * Obdoba `_analyza-hero.js` pre úvodnú stránku, ale s dvoma rozdielmi,
 * ktoré tam nebolo treba riešiť — a na ktorých meranie najskôr zlyhalo:
 *
 *   1. Tailwind v4 vracia farby s priehľadnosťou ako `oklab(...)`, nie ako
 *      `rgba(...)`. Vytiahnuť z reťazca čísla a brať ich ako RGB dá nezmysel
 *      (z bielej na 65 % vyšla takmer čierna). Farba sa preto nechá vykresliť
 *      na 1×1 canvas a prečíta sa výsledný pixel.
 *
 *   2. Text v paneli „Na tejto stránke" a v štítku má pod sebou vlastné
 *      pozadie rodiča. Merať ho priamo proti fotke je nesprávne oboma smermi:
 *      tmavý panel kontrast dvíha, svetlý štítok ho znižuje. Pozadia rodičov
 *      sa preto skladajú zhora nadol.
 *
 * ── Postup ──────────────────────────────────────────────────────────────
 *   1. fotka sa nakreslí do canvasu presne tak, ako ju orezáva `object-cover`
 *   2. aplikujú sa tie isté tri vrstvy prekrytia v tom istom poradí
 *   3. v mieste textu sa vezme p95 jasu — teda najsvetlejšie body, nie priemer
 *   4. poskladajú sa pozadia rodičov a na ne farba textu
 *   5. spočíta sa WCAG kontrast
 *
 * Prahy: 3:1 pre veľký nadpis, 4,5:1 pre bežný text.
 *
 * ⚠️ Vrstvy prekrytia nižšie musia zodpovedať tým v
 * `app/sluzby/[sluzba]/page.tsx`. Pri zmene uprav obe miesta a meranie
 * zopakuj na KAŽDEJ podstránke — každá má inú fotku.
 */
(() => {
  const sek = document.querySelector("main section[aria-label]");
  const img = sek.querySelector("img");
  const R = sek.getBoundingClientRect();

  const cv = document.createElement("canvas");
  cv.width = Math.round(R.width);
  cv.height = Math.round(R.height);
  const ctx = cv.getContext("2d");

  // object-cover + object-position: zachovaj pomer, orež dlhšiu stranu
  // a posuň výrez podľa object-position. Predvolený stred (50 %) nestačí —
  // hero má výrez posunutý nižšie a meranie stredu by hlásilo inú časť fotky.
  const op = getComputedStyle(img).objectPosition.split(" ");
  const podiel = (v, i) => {
    const t = v ?? (i === 0 ? "50%" : "50%");
    if (t === "center") return 0.5;
    if (t === "left" || t === "top") return 0;
    if (t === "right" || t === "bottom") return 1;
    const c = parseFloat(t);
    return Number.isFinite(c) ? c / 100 : 0.5;
  };
  const px = podiel(op[0], 0);
  const py = podiel(op[1], 1);

  const pB = R.width / R.height;
  const pI = img.naturalWidth / img.naturalHeight;
  let sw, sh, sx, sy;
  if (pI > pB) {
    sh = img.naturalHeight;
    sw = sh * pB;
    sx = (img.naturalWidth - sw) * px;
    sy = 0;
  } else {
    sw = img.naturalWidth;
    sh = sw / pB;
    sx = 0;
    sy = (img.naturalHeight - sh) * py;
  }
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cv.width, cv.height);

  // ⚠️ Tieto tri vrstvy musia sedieť s komponentom.
  ctx.fillStyle = "rgba(17,17,17,0.32)";
  ctx.fillRect(0, 0, cv.width, cv.height);

  let g = ctx.createLinearGradient(0, 0, cv.width, 0);
  g.addColorStop(0, "rgba(17,17,17,0.64)");
  g.addColorStop(0.55, "rgba(17,17,17,0.22)");
  g.addColorStop(1, "rgba(17,17,17,0.03)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, cv.width, cv.height);

  g = ctx.createLinearGradient(0, 0, 0, cv.height);
  g.addColorStop(0, "rgba(17,17,17,0.66)");
  g.addColorStop(0.34, "rgba(17,17,17,0)");
  g.addColorStop(0.62, "rgba(17,17,17,0)");
  g.addColorStop(1, "rgba(17,17,17,0.40)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, cv.width, cv.height);

  // Štvrtá vrstva existuje len pod breakpointom lg (1024 px).
  if (window.innerWidth < 1024) {
    ctx.fillStyle = "rgba(17,17,17,0.34)";
    ctx.fillRect(0, 0, cv.width, cv.height);
  }

  // Prevod ľubovoľného CSS zápisu farby na sRGB — vrátane oklab().
  const pom = document.createElement("canvas");
  pom.width = pom.height = 1;
  const pctx = pom.getContext("2d");
  const farba = (css) => {
    pctx.clearRect(0, 0, 1, 1);
    pctx.fillStyle = css;
    pctx.fillRect(0, 0, 1, 1);
    const d = pctx.getImageData(0, 0, 1, 1).data;
    return { r: d[0], g: d[1], b: d[2], a: d[3] / 255 };
  };

  const nad = (f, bg) => [
    f.r * f.a + bg[0] * (1 - f.a),
    f.g * f.a + bg[1] * (1 - f.a),
    f.b * f.a + bg[2] * (1 - f.a),
  ];

  const kanal = (c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  const jas = ([r, g2, b]) =>
    0.2126 * kanal(r) + 0.7152 * kanal(g2) + 0.0722 * kanal(b);

  function meraj(el, nazov, prah) {
    const r = el.getBoundingClientRect();
    const x = Math.max(0, Math.round(r.left - R.left));
    const y = Math.max(0, Math.round(r.top - R.top));
    const w = Math.min(Math.round(r.width), cv.width - x);
    const h = Math.min(Math.round(r.height), cv.height - y);
    if (w <= 0 || h <= 0) return { nazov, stav: "mimo plochy" };

    const d = ctx.getImageData(x, y, w, h).data;
    const body = [];
    for (let i = 0; i < d.length; i += 4) {
      const px = [d[i], d[i + 1], d[i + 2]];
      body.push([px, jas(px)]);
    }
    body.sort((a, b) => a[1] - b[1]);
    let pozadie = body[Math.floor(body.length * 0.95)][0];

    // Pozadia rodičov (panel, štítok) sa skladajú zhora nadol.
    const vrstvy = [];
    for (let n = el; n && n !== sek; n = n.parentElement) {
      const f = farba(getComputedStyle(n).backgroundColor);
      if (f.a > 0) vrstvy.unshift(f);
    }
    for (const f of vrstvy) pozadie = nad(f, pozadie);

    const text = nad(farba(getComputedStyle(el).color), pozadie);
    const tL = jas(text);
    const bL = jas(pozadie);
    const k = +((Math.max(tL, bL) + 0.05) / (Math.min(tL, bL) + 0.05)).toFixed(2);

    return { nazov, kontrast: k, prah, vysledok: k >= prah ? "OK" : "!! NEVYHOVUJE" };
  }

  const ciele = [
    ["h1", "H1 (veľký text)", 3],
    ["h1 + p", "Podnadpis", 4.5],
    ['nav[aria-label="Drobčeková navigácia"] a', "Drobčeky — odkaz", 4.5],
    ['nav[aria-label="Drobčeková navigácia"] li:last-child span', "Drobčeky — aktuálna", 4.5],
    ["p.text-eyebrow", "Štítok nad nadpisom", 4.5],
    ["ul.mt-8 li", "Fakty pod tlačidlami", 4.5],
  ];

  const merania = ciele.map(([sel, n, p]) => {
    const el = sek.querySelector(sel);
    return el ? meraj(el, n, p) : { nazov: n, stav: "nenájdené" };
  });

  console.table(merania);
  return {
    stranka: location.pathname,
    sirkaOkna: window.innerWidth,
    nevyhovuje: merania.filter((m) => m.vysledok === "!! NEVYHOVUJE").length,
    merania,
  };
})();
