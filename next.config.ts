import type { NextConfig } from "next";

/**
 * Web beží na Verceli a potrebuje server — kvôli route handleru `/api/dopyt`,
 * ktorý odosiela dopyty z kalkulátora e-mailom.
 *
 * Statický export (`output: "export"`) tu bol pôvodne ako alternatíva, ale
 * bol by to horší web v každom smere:
 *   • POST route handlery v ňom nefungujú → formulár by prestal odosielať
 *   • vyžaduje `images.unoptimized` → zmizne responzívne servírovanie fotiek
 *     a posielali by sa originály namiesto správnych veľkostí
 * Preto je odstránený, nie opravovaný.
 */
const nextConfig: NextConfig = {
  images: {
    // Moderné formáty pre LCP — AVIF s WebP fallbackom.
    formats: ["image/avif", "image/webp"],
    // Next 16 vyžaduje povolené hodnoty vopred.
    // 70 = miniatúry, 80 = obsahové fotky, 85 = lightbox.
    qualities: [70, 80, 85],
  },

  /**
   * Produkčný alias na Verceli presmeruje na vlastnú doménu.
   *
   * Bez toho beží celý web aj na daches-sk.vercel.app s kódom 200 — Google
   * tak vidí dve kópie toho istého webu. Canonical na daches.sk je len
   * odporúčanie, 308 je jednoznačný pokyn a prenesie aj prípadné odkazy.
   *
   * Pravidlo zachytí iba presne tento host. Náhľadové nasadenia
   * (daches-sk-git-….vercel.app) ostávajú dostupné — tie Vercel sám
   * označuje hlavičkou `x-robots-tag: noindex`.
   */
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "daches-sk.vercel.app" }],
        destination: "https://daches.sk/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
