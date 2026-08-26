import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { company, gallery, hero } from "@/lib/content";
import { hero as heroPhoto } from "@/lib/images";

/** Miniatúry v hero — vizuálny dôkaz práce ešte pred prvým scrollnutím. */
const thumbs = gallery.slice(0, 4);

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Úvod"
      className="relative flex min-h-[88svh] max-w-full items-center overflow-hidden bg-dark pt-[var(--header-h)] lg:min-h-[92svh]"
    >
      {/*
        Fotka — LCP prvok. Bez lazy, s vysokou prioritou.

        Pozor na `-z-10`: sekcia má vlastné `bg-dark`, takže dieťa so záporným
        z-indexom by sa vykreslilo ZA pozadie vlastnej sekcie a fotka by bola
        neviditeľná. Obal preto zostáva v normálnom poradí a obsah nad ním
        vyzdvihne `relative z-10`.
      */}
      <div className="absolute inset-0">
        <Image
          src={heroPhoto.src}
          alt={heroPhoto.alt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={80}
          className="object-cover object-[center_38%]"
        />

        {/*
          Tri vrstvy namiesto jedného strmého gradientu:

          1. plošné stmavenie — drží čitateľnosť rovnomerne po celej ploche,
          2. jemný gradient zľava — extra kontrast pod textovým stĺpcom,
          3. zvislý gradient — pod hlavičkou a nad spodnou hranou.

          Hodnoty nie sú odhad. Kontrast bieleho textu nad touto fotkou je
          zmeraný skriptom `scripts/_analyza-hero.js`, ktorý simuluje
          object-cover aj všetky tri vrstvy a počíta WCAG kontrast presne
          v miestach, kde text reálne sedí.
        */}
        <div className="absolute inset-0 bg-[rgba(17,17,17,0.42)]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(17,17,17,0.50) 0%, rgba(17,17,17,0.18) 55%, rgba(17,17,17,0.08) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(17,17,17,0.42) 0%, rgba(17,17,17,0) 28%, rgba(17,17,17,0) 72%, rgba(17,17,17,0.38) 100%)",
          }}
        />
      </div>

      <div className="container-max relative z-10 w-full py-20 lg:py-28">
        <div className="grid items-end gap-14 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="max-w-3xl">
            <p
              data-reveal="up"
              className="text-eyebrow inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-3.5 py-2 uppercase text-white backdrop-blur-sm"
            >
              <MapPin size={13} strokeWidth={2.5} aria-hidden="true" />
              {hero.pill}
            </p>

            <h1
              data-reveal="up"
              style={{ "--reveal-delay": "100ms" } as React.CSSProperties}
              className="text-hero mt-7 text-balance text-white"
            >
              {hero.headlineBefore}
              <span className="mark">{hero.headlineMark}</span>
              {hero.headlineAfter}
            </h1>

            <p
              data-reveal="up"
              style={{ "--reveal-delay": "220ms" } as React.CSSProperties}
              className="text-lead mt-7 max-w-[54ch] text-white/78"
            >
              {hero.lead}
            </p>

            <div
              data-reveal="up"
              style={{ "--reveal-delay": "320ms" } as React.CSSProperties}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4"
            >
              <a href="/kalkulator" className="btn btn-accent">
                {hero.ctaPrimary}
                <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
              </a>
              <a href="#realizacie" className="btn btn-outline-light">
                {hero.ctaSecondary}
              </a>
            </div>

            <ul
              data-reveal="up"
              style={{ "--reveal-delay": "420ms" } as React.CSSProperties}
              className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-white/60"
            >
              {hero.trust.map((item, i) => (
                <li key={item} className="flex items-center gap-3">
                  {i > 0 ? (
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 rounded-full bg-accent/70"
                    />
                  ) : null}
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/*
            Pás realizácií na vlastnom tmavom paneli.

            Nie je to dekorácia: drobný biely text mal nad svetlejšou pravou
            časťou fotky kontrast 2,86:1 (potrebných je 4,5:1). Panel drží
            čitateľnosť nezávisle od toho, čo je za ním — a fotka pritom
            nemusí byť stmavená do čierna.
          */}
          <div
            data-reveal="up"
            style={{ "--reveal-delay": "520ms" } as React.CSSProperties}
            className="rounded-panel border border-white/12 bg-[rgba(17,17,17,0.72)] p-4 backdrop-blur-md lg:mb-2 lg:p-5"
          >
            <p className="text-eyebrow uppercase text-white/55">
              Naše realizácie
            </p>

            <ul className="-mx-4 mt-3.5 flex gap-3 overflow-x-auto px-4 pb-1 lg:mx-0 lg:overflow-visible lg:px-0">
              {thumbs.map((item, i) => (
                <li
                  key={item.id}
                  style={
                    { "--reveal-delay": `${560 + i * 80}ms` } as React.CSSProperties
                  }
                  data-reveal="scale"
                  className="shrink-0"
                >
                  <a
                    href="#realizacie"
                    className="group block overflow-hidden rounded-card border border-white/15 transition-[border-color,transform] duration-[var(--d-short)] hover:-translate-y-1 hover:border-accent/60"
                  >
                    <Image
                      src={item.photo}
                      alt={item.alt}
                      width={96}
                      height={96}
                      sizes="96px"
                      quality={70}
                      className="h-16 w-16 object-cover transition-transform duration-[var(--d-short)] group-hover:scale-105 lg:h-[86px] lg:w-[86px]"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="#realizacie"
              className="mt-3.5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-white transition-colors duration-[var(--d-micro)] hover:text-accent"
            >
              Pozrieť všetky
              <ArrowRight size={14} strokeWidth={2.5} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Skrytý text pre vyhľadávače aj čítačky — plná adresa v hero. */}
      <p className="sr-only">
        {company.name}, {company.street}, {company.postalCode} {company.city},
        Orava. Telefón {company.phone}.
      </p>
    </section>
  );
}
