import type { MetadataRoute } from "next";
import { company } from "@/lib/content";
import { clanky } from "@/lib/radca";
import { sluzby } from "@/lib/sluzby";

export const dynamic = "force-static";

/**
 * ⚠️ `lastModified` sa zadáva ručne, nie cez `new Date()`.
 *
 * Pri `new Date()` sa dátum prepíše pri každom nasadení — aj keď sa menil
 * len kalkulátor. Google potom vidí „všetky stránky zmenené" zakaždým,
 * dátumu prestane veriť a prestane ho používať na plánovanie prehľadávania.
 *
 * Preto: pri zmene obsahu stránky zmeň jej dátum tu. Pri zmene kódu,
 * ktorá sa obsahu netýka, ho nechaj tak. Články radcu majú dátum
 * priamo v sebe (`upravene`) — ten istý ide aj do schémy `Article`.
 */
const zmenene = {
  uvod: "2026-10-22",
  kalkulator: "2026-09-19",
  sluzby: "2026-10-24",
  pravne: "2026-08-26",
  radca: "2026-10-24",
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${company.url}/`,
      lastModified: zmenene.uvod,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...sluzby.map((s) => ({
      url: `${company.url}/sluzby/${s.slug}`,
      lastModified: zmenene.sluzby,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    {
      url: `${company.url}/radca`,
      lastModified: zmenene.radca,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...clanky.map((c) => ({
      url: `${company.url}/radca/${c.slug}`,
      lastModified: c.upravene,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${company.url}/kalkulator`,
      lastModified: zmenene.kalkulator,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${company.url}/ochrana-osobnych-udajov`,
      lastModified: zmenene.pravne,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${company.url}/cookies`,
      lastModified: zmenene.pravne,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
