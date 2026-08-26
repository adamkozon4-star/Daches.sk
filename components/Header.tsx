"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, Phone, X } from "lucide-react";
import { company, navLinks } from "@/lib/content";
import { brandLogo } from "@/lib/images";

/**
 * Hlavička zostáva viditeľná stále — mení len pozadie.
 *
 * Pôvodne sa pri scrollovaní nadol skrývala. Na tomto webe je to škodlivé:
 * nesie telefónne číslo aj hlavné CTA, a tie musia byť dostupné z každého
 * miesta stránky. Navyše sa skrývanie spúšťalo aj pri kotvovej navigácii,
 * takže kliknutie na položku menu schovalo samotné menu.
 */
export default function Header() {
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
        scrolled || menuOpen
          ? "border-white/8 bg-dark/92 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="container-max flex h-[var(--header-h)] items-center justify-between gap-6">
        <a href="#hero" className="shrink-0" aria-label={`${company.name} — úvod`}>
          <Image
            src={brandLogo}
            alt={company.name}
            // Načíta sa hneď, ale bez `priority` — nesmie súperiť
            // o prenos s hero fotkou, ktorá je LCP prvok.
            loading="eager"
            sizes="256px"
            className="h-9 w-auto lg:h-10"
          />
        </a>

        <nav aria-label="Hlavná navigácia" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-white/70 transition-colors duration-[var(--d-micro)] hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={company.phoneHref}
            className="tabular inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors duration-[var(--d-micro)] hover:text-accent"
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
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-card px-3 py-3 text-base font-medium text-white/80 transition-colors duration-[var(--d-micro)] hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </a>
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
