import Image from "next/image";
import type { ReactNode } from "react";
import Blueprint from "@/components/Blueprint";
import Drobceky from "@/components/Drobceky";
import type { Obrazok } from "@/lib/sluzby";

/**
 * Hero podstránok — služieb aj článkov radcu.
 *
 * Je to spoločný komponent kvôli prekrytiu fotky: jeho hodnoty sú namerané
 * na kontrast textu a musia sedieť so `scripts/_analyza-hero-sluzby.js`.
 * Dve kópie by sa skôr či neskôr rozišli.
 *
 * Fotka ide na celú plochu, nie do rámčeka vedľa textu. Pôvodne tu bola
 * rozdelená mriežka text | fotka na plochom tmavom páse a vedľa hero úvodnej
 * stránky to pôsobilo ako iný web.
 *
 * Pozor na `-z-10` pri obale fotky — sekcia má vlastné `bg-dark`, takže
 * záporný z-index by fotku vykreslil ZA pozadie vlastnej sekcie.
 * Obsah sa preto dvíha cez `relative z-10` (viď AGENTS.md).
 *
 * Meranie hľadá prvky podľa tried (`p.text-eyebrow`, `ul.mt-8 li`, nav
 * drobčekov) — pri zmene štruktúry uprav aj skript.
 */
export default function HeroPodstranky({
  ariaLabel,
  foto,
  drobceky,
  pill,
  ikona,
  nadpis,
  lead,
  akcie,
  fakty,
}: {
  ariaLabel: string;
  foto: Obrazok;
  drobceky: { label: string; href?: string }[];
  pill: string;
  ikona: ReactNode;
  nadpis: { pred: string; zvyraznene: string; za: string };
  lead: string;
  akcie: ReactNode;
  fakty: string[];
}) {
  return (
    <section
      aria-label={ariaLabel}
      className="relative flex min-h-[64svh] items-end overflow-hidden bg-dark pt-[var(--header-h)] lg:min-h-[70svh]"
    >
      <div className="absolute inset-0">
        {/*
          Mierka 108 % kryje posun parallaxu (±4 %), inak by pri kraji
          vznikol pruh pozadia.
        */}
        <div className="parallax-up absolute inset-0 scale-[1.08]">
          <Image
            src={foto.src}
            alt={foto.alt}
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={85}
            style={{ objectPosition: foto.pozicia ?? "center" }}
            className="object-cover"
          />
        </div>

        {/*
          ⚠️ Tri vrstvy sa NÁSOBIA, nesčítavajú.

          Prvý pokus mal 0.52 / 0.74 / 0.66 a vľavo dole z fotky presvitali
          4 % — hero bol prakticky čierny obdĺžnik. Zostatková viditeľnosť
          je (1-a₁)(1-a₂)(1-a₃), takže tri „stredne silné" vrstvy nad sebou
          fotku zhasnú.

          Súčasné hodnoty: pod textom vľavo dole ostáva ~15 % fotky, vpravo
          v strede ~66 %. Základ sa dvíhal z 0,26 kvôli svetlému drevu na
          fotke výmeny strechy (podnadpis padal na 4,27:1). Vodorovná a horná
          vrstva sa zosilnili (0,52 → 0,64 a 0,60 → 0,66), keď pribudli fotky
          krovov so svetlou oblohou a drevom — nadpis tam pri 768 px padal
          na 2,6:1. Pri zmene hodnôt meranie zopakuj na každej podstránke.
        */}
        <div className="absolute inset-0 bg-[rgba(17,17,17,0.32)]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(17,17,17,0.64) 0%, rgba(17,17,17,0.22) 55%, rgba(17,17,17,0.03) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(17,17,17,0.66) 0%, rgba(17,17,17,0) 34%, rgba(17,17,17,0) 62%, rgba(17,17,17,0.40) 100%)",
          }}
        />

        {/*
          Štvrtá vrstva len pre mobil a tablet (pod 1024 px).

          Vodorovný gradient tmaví ľavú polovicu, lebo na širokej obrazovke
          tam sedí text. Na mobile text zaberá celú šírku, takže mu pod
          pravým okrajom zostane nezatmavená fotka. Meranie tam padlo na 2,8:1.

          Pôvodne `md:hidden` — no pri 768 px text stále siaha takmer cez
          celú šírku a podnadpis padal na 3,6:1 pri každom výreze fotky.
          Od 1024 px je text v ľavej časti, kde stačí vodorovný gradient.

          Riešenie je plošné stmavenie navyše, nie zosilnenie vodorovného
          gradientu — ten by na desktope zbytočne zhasol pravú stranu,
          kde má byť fotka vidieť.
        */}
        <div className="absolute inset-0 bg-[rgba(17,17,17,0.34)] lg:hidden" />
      </div>

      <Blueprint
        light
        className="-right-28 bottom-8 hidden h-[360px] w-[620px] opacity-70 lg:block"
      />

      <div className="container-max relative z-10 w-full py-12 lg:py-16">
        <div className="[&_a]:text-white/78 [&_a:hover]:text-white [&_span]:text-white/95 [&_svg]:text-white/45">
          <Drobceky polozky={drobceky} />
        </div>

        <div className="mt-9 lg:mt-12">
          <div className="max-w-3xl">
            <p
              data-reveal="up"
              className="text-eyebrow inline-flex items-center gap-2 rounded-full border border-white/25 bg-[rgba(17,17,17,0.55)] px-3.5 py-2 uppercase text-white backdrop-blur-sm"
            >
              {ikona}
              {pill}
            </p>

            <h1
              data-reveal="up"
              style={{ "--reveal-delay": "100ms" } as React.CSSProperties}
              className="text-hero mt-7 text-balance leading-[1.07] text-white"
            >
              {nadpis.pred}
              <span className="mark">{nadpis.zvyraznene}</span>
              {nadpis.za}
            </h1>

            <p
              data-reveal="up"
              style={{ "--reveal-delay": "220ms" } as React.CSSProperties}
              className="text-lead mt-7 max-w-[54ch] text-white/95"
            >
              {lead}
            </p>

            <div
              data-reveal="up"
              style={{ "--reveal-delay": "330ms" } as React.CSSProperties}
              className="mt-9 flex flex-wrap gap-3"
            >
              {akcie}
            </div>

            <ul
              data-reveal="up"
              style={{ "--reveal-delay": "430ms" } as React.CSSProperties}
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/85"
            >
              {fakty.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
