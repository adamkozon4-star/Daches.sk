/**
 * Pomocný skript (nie súčasť buildu): overí, či je biely text v hero čitateľný
 * nad fotografiou.
 *
 * Simuluje object-cover + object-position pre desktop aj mobil, aplikuje
 * presne tie isté vrstvy prekrytia ako `components/Hero.tsx` a zmeria WCAG
 * kontrast v oblastiach, kde text reálne sedí.
 *
 * Po výmene hero fotky alebo po zmene hodnôt prekrytia to spusti:
 *   node scripts/_analyza-hero.js
 */
const sharp = require("sharp");

const lin = (c) => {
  c /= 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
};
const L = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const contrast = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

/** Lineárna interpolácia v gradiente zadanom ako [pozícia 0-1, alfa]. */
function gradAlpha(stops, t) {
  if (t <= stops[0][0]) return stops[0][1];
  if (t >= stops[stops.length - 1][0]) return stops[stops.length - 1][1];
  for (let i = 0; i < stops.length - 1; i++) {
    const [p1, a1] = stops[i];
    const [p2, a2] = stops[i + 1];
    if (t >= p1 && t <= p2) return a1 + (a2 - a1) * ((t - p1) / (p2 - p1));
  }
  return 0;
}

// ---- Musí zodpovedať hodnotám v components/Hero.tsx ----
const PREKRYTIE = {
  flat: 0.42,
  h: [
    [0, 0.5],
    [0.55, 0.18],
    [1, 0.08],
  ],
  v: [
    [0, 0.42],
    [0.28, 0],
    [0.72, 0],
    [1, 0.38],
  ],
};

const OBJECT_POSITION_Y = 0.38;

/** `panel` = alfa tmavého panelu, ktorý je pod daným textom navyše. */
const VYREZY = [
  {
    nazov: "desktop 1920x950",
    w: 1920,
    h: 950,
    oblasti: [
      { nazov: "navigacia (odkazy)", x: [660, 1250], y: [24, 56] },
      { nazov: "telefon v hlavicke", x: [1180, 1300], y: [24, 56] },
      { nazov: "pill HRUSTIN-ORAVA", x: [340, 600], y: [230, 275] },
      { nazov: "H1 nadpis", x: [340, 1110], y: [290, 560], velky: true },
      { nazov: "podnadpis", x: [340, 900], y: [575, 640] },
      { nazov: "trust microcopy", x: [340, 900], y: [770, 800] },
      { nazov: "pas realizacii (panel)", x: [1250, 1500], y: [700, 730], panel: 0.72 },
    ],
  },
  {
    nazov: "mobil 375x740",
    w: 375,
    h: 740,
    oblasti: [
      { nazov: "logo + menu", x: [20, 355], y: [24, 56] },
      { nazov: "pill HRUSTIN-ORAVA", x: [20, 210], y: [110, 150] },
      { nazov: "H1 nadpis", x: [20, 355], y: [170, 380], velky: true },
      { nazov: "podnadpis", x: [20, 355], y: [400, 490] },
      { nazov: "trust microcopy", x: [20, 355], y: [600, 650] },
      { nazov: "pas realizacii (panel)", x: [20, 355], y: [670, 715], panel: 0.72 },
    ],
  },
];

(async () => {
  const src = "public/images/hero-strecha.jpg";
  const meta = await sharp(src).metadata();
  const { data, info } = await sharp(src).raw().toBuffer({ resolveWithObject: true });
  const ch = info.channels;

  console.log("fotka: " + meta.width + "x" + meta.height + "\n");
  let zlyhalo = 0;

  for (const vp of VYREZY) {
    const scale = Math.max(vp.w / meta.width, vp.h / meta.height);
    const offsetY = (meta.height * scale - vp.h) * OBJECT_POSITION_Y;
    const offsetX = (meta.width * scale - vp.w) * 0.5;

    const pixelAt = (vx, vy) => {
      const sx = Math.min(meta.width - 1, Math.max(0, Math.round((vx + offsetX) / scale)));
      const sy = Math.min(meta.height - 1, Math.max(0, Math.round((vy + offsetY) / scale)));
      const i = (sy * meta.width + sx) * ch;
      return [data[i], data[i + 1], data[i + 2]];
    };

    console.log("=== " + vp.nazov + " ===");

    for (const o of vp.oblasti) {
      const lums = [];
      for (let vy = o.y[0]; vy <= o.y[1]; vy += 2) {
        for (let vx = o.x[0]; vx <= o.x[1]; vx += 2) {
          let [r, g, b] = pixelAt(vx, vy);
          const vrstvy = [
            o.panel || 0,
            PREKRYTIE.flat,
            gradAlpha(PREKRYTIE.h, vx / vp.w),
            gradAlpha(PREKRYTIE.v, vy / vp.h),
          ];
          let zostatok = 1;
          for (const a of vrstvy) zostatok *= 1 - a;
          const eff = 1 - zostatok;
          r = r * (1 - eff) + 17 * eff;
          g = g * (1 - eff) + 17 * eff;
          b = b * (1 - eff) + 17 * eff;
          lums.push(L(r, g, b));
        }
      }
      lums.sort((a, b) => a - b);
      // p95 = najsvetlejsie miesta pod textom, teda najhorsi pripad
      const c = contrast(1.0, lums[Math.floor(lums.length * 0.95)]);
      const prah = o.velky ? 3 : 4.5;
      const ok = c >= prah;
      if (!ok) zlyhalo++;
      console.log(
        "  " + (ok ? "OK " : "ZLE") + " " + o.nazov.padEnd(24) +
        c.toFixed(2) + ":1  (min " + prah + ":1)",
      );
    }
    console.log();
  }

  console.log(
    zlyhalo === 0
      ? "Vsetky oblasti prechadzaju WCAG AA."
      : zlyhalo + " oblasti neprechadza.",
  );
  process.exit(zlyhalo === 0 ? 0 : 1);
})();
