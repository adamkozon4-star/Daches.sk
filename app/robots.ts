import type { MetadataRoute } from "next";
import { company } from "@/lib/content";

/** Vyžadované pri statickom exporte (npm run export). */
export const dynamic = "force-static";

/**
 * AI vyhľadávače sú povolené explicitne.
 *
 * GPTBot, ClaudeBot ani PerplexityBot väčšinou nespúšťajú JavaScript — preto je
 * dôležité, že tento web je staticky vygenerovaný a obsah je v HTML.
 */
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "anthropic-ai",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: "/" })),
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${company.url}/sitemap.xml`,
    host: company.url,
  };
}
