/**
 * Vygeneruje lib/realizacie/fotky.ts zo súborov v public/images/realizacie.
 *
 * Spustenie po pridaní alebo výmene fotiek:  node scripts/realizacie-fotky.mjs
 * Popisy k fotkám sú v lib/realizacie/index.ts a priraďujú sa podľa poradia
 * (01.jpg, 02.jpg, …) — pri vložení fotky doprostred posuň aj popisy.
 */
import fs from "node:fs";

const base = "public/images/realizacie";
const importy = [];
const mapa = [];
let i = 0;

for (const slug of fs.readdirSync(base).sort()) {
  const ids = [];
  for (const f of fs.readdirSync(`${base}/${slug}`).filter((f) => f.endsWith(".jpg")).sort()) {
    const v = `f${i++}`;
    importy.push(`import ${v} from "@/${base}/${slug}/${f}";`);
    ids.push(v);
  }
  mapa.push(`  "${slug}": [${ids.join(", ")}],`);
}

const hlavicka = `/*
 * Fotky realizácií — VYGENEROVANÉ skriptom scripts/realizacie-fotky.mjs.
 * Ručne neupravovať, po zmene fotiek skript spusti znova.
 *
 * Statický import kvôli rozmerom (bez layout shiftu). Poradie = poradie
 * v príspevku na Facebooku, z ktorého fotky pochádzajú. Popisy k fotkám
 * sú v lib/realizacie/index.ts, priradené podľa poradia.
 */
import type { StaticImageData } from "next/image";
`;

fs.writeFileSync(
  "lib/realizacie/fotky.ts",
  `${hlavicka}${importy.join("\n")}\n\nexport const fotkyRealizacii: Record<string, StaticImageData[]> = {\n${mapa.join("\n")}\n};\n`,
);
console.log(`${i} fotiek`);
