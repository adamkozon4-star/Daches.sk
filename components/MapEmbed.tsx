"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { company } from "@/lib/content";

const query = `${company.name}, ${company.street}, ${company.postalCode} ${company.city}`;
const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(query)}&hl=sk&z=13&output=embed`;
const linkSrc = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

/**
 * Mapa sa načíta až po kliknutí.
 *
 * Iframe Google Máp je jedna z najdrahších vecí na stránke a nastavuje cookies
 * tretej strany — kliknutie rieši aj výkon, aj súhlas používateľa naraz.
 */
export default function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        src={embedSrc}
        title={`Mapa — ${company.name}, ${company.city}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="h-full min-h-[340px] w-full rounded-panel border-0 lg:min-h-[460px]"
      />
    );
  }

  return (
    <div className="relative h-full min-h-[340px] overflow-hidden rounded-panel border border-line bg-light lg:min-h-[460px]">
      {/* Jemný raster ako náznak mapy — žiadny obrázok navyše na stiahnutie. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(rgba(17,17,17,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,0.05) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative flex h-full flex-col items-center justify-center gap-5 p-8 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-accent text-dark">
          <MapPin size={24} strokeWidth={2} aria-hidden="true" />
        </span>

        <div>
          <p className="text-h3 text-dark">
            {company.street}, {company.postalCode} {company.city}
          </p>
          <p className="mt-1 text-sm text-muted">Orava, {company.region}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setLoaded(true)}
            className="btn btn-dark h-11 px-5 text-sm"
          >
            Zobraziť mapu
          </button>
          <a
            href={linkSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-muted underline-offset-4 transition-colors duration-[var(--d-micro)] hover:text-dark hover:underline"
          >
            Otvoriť v Google Mapách
          </a>
        </div>

        <p className="max-w-[38ch] text-xs text-muted">
          Kliknutím načítate mapu od Google, ktorá môže ukladať cookies.
        </p>
      </div>
    </div>
  );
}
