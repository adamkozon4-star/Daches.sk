"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { ChevronsLeftRight } from "lucide-react";

type Fotka = { photo: StaticImageData; alt: string; label: string };

/**
 * Porovnanie predtým / potom posuvníkom.
 *
 * ── Prečo klientský komponent ───────────────────────────────────────────
 * Poloha deliacej čiary sa mení ťahaním, a to bez JavaScriptu nejde —
 * CSS nevie prečítať hodnotu posuvníka. Všetko ostatné (úvodné naznačenie
 * pohybu, rúčka, orezanie) robí CSS cez premennú `--pos` (sekcia 6.14
 * v `globals.css`).
 *
 * ── Ovládanie ───────────────────────────────────────────────────────────
 * Celú plochu prekrýva neviditeľný `<input type="range">`: ťahanie myšou
 * aj prstom, šípky na klávesnici a čítačky obrazovky fungujú natívne.
 * `touch-action: pan-y` nechá zvislé potiahnutie prstom scrollovať stránku.
 *
 * Fotky nie sú z presne rovnakého uhla — je to tá istá strecha od komínov
 * pred výmenou a po nej. Preto ľavá a pravá polovica nesedia na pixel
 * a text sekcie netvrdí „rovnaký uhol".
 */
export default function PredPo({ pred, po }: { pred: Fotka; po: Fotka }) {
  const [pos, setPos] = useState(50);
  const [dotknute, setDotknute] = useState(false);

  return (
    <div
      className="pred-po relative aspect-[4/3] select-none overflow-hidden rounded-panel bg-light lg:aspect-[16/9]"
      data-dotknute={dotknute ? "" : undefined}
      style={{ "--pos": `${pos}%` } as React.CSSProperties}
    >
      {/* Spodná vrstva: stav po realizácii, vidno ho vpravo od čiary. */}
      <Image
        src={po.photo}
        alt={po.alt}
        fill
        loading="lazy"
        sizes="(min-width: 1240px) 1600px, 100vw"
        quality={80}
        className="object-cover"
      />

      {/* Horná vrstva: stav pred výmenou, orezaná po čiaru zľava. */}
      <div className="pred-po-vrch absolute inset-0">
        <Image
          src={pred.photo}
          alt={pred.alt}
          fill
          loading="lazy"
          sizes="(min-width: 1240px) 1600px, 100vw"
          quality={80}
          className="object-cover"
        />

        {/*
          Štítky sú orezané spolu so svojou fotkou. Pôvodne boli nad oboma
          vrstvami a na mobile bol „Po realizácii" vidieť celý, aj keď pod
          ním ešte bola fotka pred výmenou — čiara ho len pretínala.
        */}
        <span className="text-eyebrow pointer-events-none absolute left-4 top-4 rounded-card bg-dark/80 px-3 py-1.5 uppercase text-white backdrop-blur-sm md:left-6 md:top-6">
          {pred.label}
        </span>
      </div>

      <div className="pred-po-spodok pointer-events-none absolute inset-0">
        <span className="text-eyebrow absolute right-4 top-4 rounded-card bg-accent px-3 py-1.5 uppercase text-dark md:right-6 md:top-6">
          {po.label}
        </span>
      </div>

      <div aria-hidden="true" className="pred-po-ciara pointer-events-none absolute inset-y-0">
        <span className="pred-po-ruka grid h-14 w-14 place-items-center rounded-full bg-accent text-dark shadow-[var(--shadow-panel)]">
          <ChevronsLeftRight size={24} strokeWidth={2.5} />
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={pos}
        aria-label={`Porovnanie: ${pred.label.toLowerCase()} a ${po.label.toLowerCase()}`}
        aria-valuetext={`${pos} % ${pred.label.toLowerCase()}`}
        onPointerDown={() => setDotknute(true)}
        onKeyDown={() => setDotknute(true)}
        onChange={(e) => setPos(Number(e.target.value))}
        className="pred-po-vstup absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
