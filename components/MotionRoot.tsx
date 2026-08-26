"use client";

import { useEffect } from "react";

/**
 * Jediný IntersectionObserver pre celú stránku.
 *
 * Namiesto observera na komponent (a teda kusu JavaScriptu na každý animovaný
 * prvok) je tu jeden zdieľaný, ktorý si nájde všetko s atribútom `data-reveal`.
 * Vďaka tomu môžu byť samotné sekcie server-rendered bez klientskeho kódu.
 *
 * Reveal sa spustí raz — po odhalení sa prvok od observera odpojí, takže pri
 * scrollovaní späť sa nič nehýbe.
 */
export default function MotionRoot() {
  useEffect(() => {
    const root = document.documentElement;

    // Poistka v <head> podľa tohto atribútu zistí, že motion beží,
    // a nechá skrytý počiatočný stav v platnosti.
    root.setAttribute("data-motion-ready", "");

    const reveal = (el: Element) => el.setAttribute("data-revealed", "");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduce.matches) {
      root.classList.remove("js-motion");
      document.querySelectorAll("[data-reveal]").forEach(reveal);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          io.unobserve(entry.target);
        }
      },
      // Prah 0 je tam schválne popri 0.15: prvok, ktorý má z akéhokoľvek
      // dôvodu nulovú plochu prieniku, sa aj tak odhalí hneď ako sa dotkne
      // viewportu, namiesto toho aby zostal skrytý navždy.
      { rootMargin: "0px 0px -12% 0px", threshold: [0, 0.15] },
    );

    const observe = (from: ParentNode) => {
      from.querySelectorAll("[data-reveal]:not([data-revealed])").forEach((el) => {
        io.observe(el);
      });
    };

    observe(document);

    // Karty, ktoré pribudnú po prefiltrovaní galérie, treba tiež zachytiť.
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;
          if (node.matches("[data-reveal]:not([data-revealed])")) io.observe(node);
          observe(node);
        }
      }
    });

    mo.observe(document.body, { childList: true, subtree: true });

    /**
     * Záchranná sieť.
     *
     * Observer je jediné, čo obsah odhaľuje — keby z akéhokoľvek dôvodu
     * nenahlásil prvok, ktorý je zjavne vo viewporte, zostal by neviditeľný
     * natrvalo. (Presne to sa stalo, keď mal `clip-path` priamo pozorovaný
     * prvok — observer videl nulovú plochu a galéria zostala prázdna.)
     *
     * Toto prejde nedohalené prvky obyčajnou geometriou. Používa rovnaký prah
     * ako observer, aby nenarušilo choreografiu, a keď už nie je čo odhaľovať,
     * samo sa odpojí.
     */
    let naplanovane = false;

    const sweep = () => {
      naplanovane = false;
      const zvysne = document.querySelectorAll("[data-reveal]:not([data-revealed])");

      if (zvysne.length === 0) {
        stopSiet();
        return;
      }

      const hranica = window.innerHeight * 0.88; // zhoda s rootMargin -12 %

      for (const el of zvysne) {
        const r = el.getBoundingClientRect();
        if (r.height > 0 && r.top < hranica && r.bottom > 0) {
          reveal(el);
          io.unobserve(el);
        }
      }
    };

    const naplanuj = () => {
      if (naplanovane) return;
      naplanovane = true;
      requestAnimationFrame(sweep);
    };

    const stopSiet = () => {
      window.clearInterval(timer);
      window.removeEventListener("scroll", naplanuj);
      window.removeEventListener("resize", naplanuj);
    };

    // Interval beží priamo, nie cez rAF: v karte na pozadí sa rAF nespúšťa
    // a práve načítanie je najrizikovejší moment. Throttling má zmysel len
    // pri scrollovaní, kde sa udalosti sypú.
    const timer = window.setInterval(sweep, 1200);
    window.addEventListener("scroll", naplanuj, { passive: true });
    window.addEventListener("resize", naplanuj, { passive: true });

    return () => {
      stopSiet();
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
