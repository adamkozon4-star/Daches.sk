"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { company, navLinks } from "@/lib/content";
import { brandLogo } from "@/lib/images";
import { sluzby } from "@/lib/sluzby";

/**
 * Hlavička zostáva viditeľná stále — mení len pozadie.
 *
 * Pôvodne sa pri scrollovaní nadol skrývala. Na tomto webe je to škodlivé:
 * nesie telefónne číslo aj hlavné CTA, a tie musia byť dostupné z každého
 * miesta stránky. Navyše sa skrývanie spúšťalo aj pri kotvovej navigácii,
 * takže kliknutie na položku menu schovalo samotné menu.
 */
/**
 * Stránky, ktoré majú navrchu tmavú fotku — len na nich smie byť hlavička
 * pred scrollovaním priehľadná. Biele logo a menu nad fotkou vyniknú.
 *
 * Zoznam je zámerne povolený (nie zakázaný): kalkulátor, právne stránky
 * aj 404 majú navrchu biele pozadie a biela hlavička na nich bola úplne
 * neviditeľná. Nová stránka tak dostane plnú hlavičku, kým ju sem
 * niekto vedome nepridá.
 */
const tmavyUvod = (cesta: string) =>
  cesta === "/" || cesta.startsWith("/sluzby/") || cesta === "/radca" || cesta.startsWith("/radca/");

export default function Header() {
  const priehladna = tmavyUvod(usePathname());
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };

    // Stránka sa môže načítať už odscrollovaná (obnovená pozícia, odkaz
    // s kotvou), takže stav treba nastaviť aj bez prvej scroll udalosti.
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Otvorené menu nesmie nechať stránku scrollovať pod sebou.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-50 border-b ${
        scrolled || menuOpen || !priehladna
          ? "border-white/8 bg-dark/92 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="container-max flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link href="/" className="shrink-0" aria-label={`${company.name} — úvod`}>
          <Image
            src={brandLogo}
            alt={company.name}
            // Načíta sa hneď, ale bez `priority` — nesmie súperiť
            // o prenos s hero fotkou, ktorá je LCP prvok.
            loading="eager"
            sizes="256px"
            className="h-9 w-auto lg:h-10"
          />
        </Link>

        <nav aria-label="Hlavná navigácia" className="hidden lg:block">
          {/*
            Sedem položiek sa pri 1024 px zmestí len s menšími medzerami
            a bez čísla telefónu vpravo (to je od 1280 px). Pod 1280 px je
            telefón aj tak v hero každej stránky a v ponuke tlačidla.
          */}
          <ul className="flex items-center gap-5 whitespace-nowrap xl:gap-8">
            {navLinks.map((link) =>
              link.submenu ? (
                /*
                  Podmenu je v HTML aj keď je zavreté — odkazy na podstránky
                  tak vedú z každej stránky webu a prečítajú ich aj roboty.
                  Skrývame ho cez `invisible` (visibility: hidden), nie cez
                  `display:none`: obsah ostáva v markupe, ale zmizne
                  z poradia tabulátora, takže sa nedá omylom zaostriť
                  na zavreté menu.

                  Otvára sa hoverom aj `focus-within`, teda aj klávesnicou.
                  Žiadny stav, žiadny JavaScript.

                  `pt-3` je zámerné: medzera medzi položkou a panelom musí
                  byť vyplnená, inak hover po ceste nadol vypadne.
                */
                <li key={link.href} className="group relative">
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1 text-sm font-medium text-white/70 transition-colors duration-[var(--d-micro)] hover:text-white"
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      strokeWidth={2.5}
                      aria-hidden="true"
                      className="transition-transform duration-[var(--d-short)] group-hover:rotate-180 group-focus-within:rotate-180"
                    />
                  </Link>

                  <div className="invisible absolute left-1/2 top-full z-10 -translate-x-1/2 pt-4 opacity-0 transition-opacity duration-[var(--d-short)] group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <ul className="min-w-[248px] rounded-panel border border-white/10 bg-dark/95 p-2 shadow-[var(--shadow-panel)] backdrop-blur-xl">
                      {sluzby.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/sluzby/${s.slug}`}
                            className="block rounded-card px-3 py-2.5 text-sm font-medium text-white/75 transition-colors duration-[var(--d-micro)] hover:bg-white/8 hover:text-white"
                          >
                            {s.navLabel}
                          </Link>
                        </li>
                      ))}

                      <li className="mt-1 border-t border-white/8 pt-1">
                        <a
                          href="/kalkulator"
                          className="block rounded-card px-3 py-2.5 text-sm font-medium text-white/75 transition-colors duration-[var(--d-micro)] hover:bg-white/8 hover:text-white"
                        >
                          Cenový kalkulátor
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-white/70 transition-colors duration-[var(--d-micro)] hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="hidden shrink-0 items-center gap-4 lg:flex">
          <a
            href={company.phoneHref}
            className="tabular hidden items-center gap-2 whitespace-nowrap xl:inline-flex text-sm font-semibold text-white transition-colors duration-[var(--d-micro)] hover:text-accent"
          >
            <Phone size={15} strokeWidth={2} aria-hidden="true" />
            {company.phone}
          </a>
          <a href="/kalkulator" className="btn btn-accent h-11 px-5 text-sm">
            Získať cenovú ponuku
          </a>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          {/*
            Priame volanie z ktoréhokoľvek miesta stránky. Bez tohto by bolo
            číslo na mobile dostupné len po otvorení menu — a zavolať je pre
            strechára tá najhodnotnejšia akcia.
          */}
          <a
            href={company.phoneHref}
            aria-label={`Zavolať ${company.phone}`}
            className="grid h-11 w-11 place-items-center rounded-card text-white transition-colors duration-[var(--d-micro)] hover:bg-white/10 hover:text-accent"
          >
            <Phone size={20} strokeWidth={2} aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobilne-menu"
            aria-label={menuOpen ? "Zavrieť menu" : "Otvoriť menu"}
            className="grid h-11 w-11 place-items-center rounded-card text-white"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div
          id="mobilne-menu"
          className="border-t border-white/8 bg-dark/98 backdrop-blur-xl lg:hidden"
        >
          <nav aria-label="Mobilná navigácia" className="container-max py-6">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-card px-3 py-3 text-base font-medium text-white/80 transition-colors duration-[var(--d-micro)] hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </Link>

                  {/*
                    Na mobile sa podstránky nerozbaľujú — sú rovno vypísané.
                    Pri dvoch položkách by rozbaľovanie pridalo klik navyše
                    a skrylo presne to, kvôli čomu sa menu otvára.
                  */}
                  {link.submenu ? (
                    <ul className="mb-1 ml-3 flex flex-col gap-1 border-l border-white/10 pl-3">
                      {sluzby.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/sluzby/${s.slug}`}
                            onClick={() => setMenuOpen(false)}
                            className="block rounded-card px-3 py-2.5 text-sm text-white/60 transition-colors duration-[var(--d-micro)] hover:bg-white/5 hover:text-white"
                          >
                            {s.navLabel}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={company.phoneHref}
                className="btn btn-outline-light w-full"
              >
                <Phone size={16} aria-hidden="true" />
                <span className="tabular">{company.phone}</span>
              </a>
              <a
                href="/kalkulator"
                onClick={() => setMenuOpen(false)}
                className="btn btn-accent w-full"
              >
                Získať cenovú ponuku
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
