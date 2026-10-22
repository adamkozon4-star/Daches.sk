import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { company } from "@/lib/content";

type Polozka = { label: string; href?: string };

/**
 * Drobčeková navigácia + `BreadcrumbList`.
 *
 * ⚠️ Každá položka okrem poslednej MUSÍ mať `item` s absolútnou URL.
 * Bez toho hlási Search Console „Missing field item" a celý breadcrumb
 * sa zahodí. Posledná položka je aktuálna stránka a `item` mať nemá —
 * preto sa `href` pri nej zámerne nezadáva a komponent to kontroluje sám.
 */
export default function Drobceky({ polozky }: { polozky: Polozka[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: polozky.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.label,
      // Posledná položka = aktuálna stránka, tá `item` nedostáva.
      ...(p.href && i < polozky.length - 1
        ? { item: new URL(p.href, company.url).href }
        : {}),
    })),
  };

  return (
    <>
      <nav aria-label="Drobčeková navigácia">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-muted">
          {polozky.map((p, i) => {
            const posledna = i === polozky.length - 1;

            return (
              <li key={p.label} className="flex items-center gap-1.5">
                {i > 0 ? (
                  <ChevronRight
                    size={14}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="shrink-0 text-muted/60"
                  />
                ) : null}

                {posledna || !p.href ? (
                  <span aria-current={posledna ? "page" : undefined} className="text-dark/70">
                    {p.label}
                  </span>
                ) : (
                  <Link
                    href={p.href}
                    className="transition-colors duration-[var(--d-micro)] hover:text-dark"
                  >
                    {p.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
