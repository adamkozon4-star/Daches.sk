import type { NextConfig } from "next";

/**
 * Statický export sa zapína premennou STATIC_EXPORT=1 — bežný vývoj
 * aj nasadenie na Vercel tým zostávajú nedotknuté (vrátane optimalizácie
 * obrázkov, ktorú statický export nepodporuje).
 *
 *   npm run export   → vygeneruje priečinok out/ na nahratie kamkoľvek
 */
const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? { output: "export", images: { unoptimized: true } }
    : {
        images: {
          // Moderné formáty pre LCP — AVIF s WebP fallbackom.
          formats: ["image/avif", "image/webp"],
          // Next 16 vyžaduje povolené hodnoty vopred.
          // 70 = miniatúry, 80 = obsahové fotky, 85 = lightbox.
          qualities: [70, 80, 85],
        },
      }),
};

export default nextConfig;
