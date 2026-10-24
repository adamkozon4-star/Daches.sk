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
    /**
     * 1536 a 1600 nie sú v predvolených šírkach Nextu — medzi 1200 a 1920
     * je diera. Fotky realizácií majú 1536 alebo 1600 px na šírku, takže
     * prehliadač si z predvoleného srcsetu vybral 1200 a roztiahol ju na
     * 1539 px. Teraz má k dispozícii natívnu šírku a nič sa neroztahuje.
     *
     * ── Prečo nie viac šírok ─────────────────────────────────────────────
     * Vercel generuje každú kombináciu šírka × formát zvlášť až pri prvej
     * požiadavke. Prvá trvá ~1,3 s (kódovanie AVIF), z cache ~0,2 s —
     * a hero fotky na nových podstránkach sa načítavali viditeľne pomaly.
     *
     * Väčšie šírky než zdroj Next nedogeneruje, len pošle originál. Pôvodné
     * 1920 a 3840 tak pri 2048 px podkladoch dávali tú istú fotku pod iným
     * kľúčom — dvakrát viac studených požiadaviek bez rozdielu v kvalite.
     * 750 je o 10 % menšie ako 828 a len rozdeľovalo mobily medzi dva kľúče.
     *
     * Menej šírok = viac návštevníkov zdieľa ten istý variant = vyššia
     * šanca, že je už v cache. Zvyšok rieši `scripts/zahriat-obrazky.mjs`.
     * Ak pribudnú ostrejšie podklady než 2048 px, šírku pridaj sem.
     */
    deviceSizes: [640, 828, 1080, 1200, 1536, 1600, 2048],
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
