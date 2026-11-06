import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { Realizacia } from "@/lib/realizacie";

/**
 * Karta realizácie — prehľad `/realizacie`, „Ďalšie realizácie" a odkazy
 * zo stránok služieb.
 *
 * Text odkazu obsahuje obec, aby sa odkazy navzájom líšili (audit hlási
 * rovnaký text pri rôznych cieľoch) a aby Google videl, o akej obci
 * cieľová stránka je.
 */
export default function KartaRealizacie({ r }: { r: Realizacia }) {
  const hlavna = r.fotky[r.hlavna];

  return (
    <Link
      href={`/realizacie/${r.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-panel border border-line bg-white transition-[transform,box-shadow] duration-[var(--d-short)] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-light">
        <Image
          src={hlavna.src}
          alt={`${hlavna.popis} — ${r.obec}`}
          fill
          loading="lazy"
          placeholder="blur"
          /* ~1,5× šírky karty, inak prehliadač zmenšuje o malý kúsok a fotka zmäkne. */
          sizes="(min-width: 1240px) 580px, (min-width: 640px) 75vw, 100vw"
          quality={80}
          style={{ objectPosition: r.pozicia ?? "center" }}
          className="object-cover transition-transform duration-[var(--d-long)] group-hover:scale-[1.04]"
        />
        <span className="text-eyebrow absolute left-4 top-4 rounded-card bg-dark/80 px-3 py-1.5 uppercase text-white backdrop-blur-sm">
          {r.typ}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-1.5 text-sm text-muted">
          <MapPin size={14} strokeWidth={2.5} aria-hidden="true" />
          {r.obec} · okres {r.okres}
        </p>
        <h3 className="text-h3 mt-2 text-balance text-dark">{r.nazov}</h3>
        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-dark">
          {r.typ}, {r.obec}
          <ArrowRight
            size={16}
            strokeWidth={2.5}
            aria-hidden="true"
            className="transition-transform duration-[var(--d-short)] group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}
