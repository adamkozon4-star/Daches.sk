"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { gallery, galleryFilters, type GalleryFilter } from "@/lib/content";

type Item = (typeof gallery)[number];

export default function Gallery() {
  const [filter, setFilter] = useState<GalleryFilter>("Všetko");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const visible: Item[] =
    filter === "Všetko"
      ? [...gallery]
      : gallery.filter((item) =>
          (item.categories as readonly string[]).includes(filter),
        );

  /**
   * Prepnutie filtra cez natívne View Transitions — karty, ktoré vo výbere
   * zostávajú, sa plynulo presunú namiesto preblikania. Bez podpory prehliadača
   * sa správanie nezmení.
   */
  const changeFilter = (next: GalleryFilter) => {
    if (next === filter) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // V skrytej karte prehliadač nevykresľuje, takže by sa prechod nespustil
    // a zmena filtra by ostala visieť. Vtedy prepni priamo.
    if (!document.startViewTransition || reduce || document.hidden) {
      setFilter(next);
      return;
    }

    const transition = document.startViewTransition(() => setFilter(next));

    // Prechod sa preskočí vždy, keď ho prekryje ďalší (rýchle preklikávanie
    // filtrov) — `ready` vtedy odmietne. Nie je to chyba, len to treba zachytiť,
    // inak z toho je unhandled rejection v konzole.
    transition.ready.catch(() => {});
    transition.finished.catch(() => {});
  };

  const close = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (lightbox === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight")
        setLightbox((i) => (i === null ? i : (i + 1) % visible.length));
      if (e.key === "ArrowLeft")
        setLightbox((i) =>
          i === null ? i : (i - 1 + visible.length) % visible.length,
        );
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, visible.length, close]);

  const current = lightbox === null ? null : visible[lightbox];

  return (
    <section
      id="realizacie"
      aria-labelledby="realizacie-nadpis"
      className="section-y bg-light"
    >
      <div className="container-max">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div data-reveal="up" className="max-w-2xl">
            <p className="eyebrow text-eyebrow uppercase text-muted">
              Naše realizácie
            </p>
            <h2 id="realizacie-nadpis" className="text-h2 mt-5 text-dark">
              Naša <span className="mark">práca</span> hovorí za nás
            </h2>
            <p className="text-lead mt-5 max-w-[62ch] text-muted">
              Pozrite si niektoré z realizácií, na ktorých sme pracovali.
            </p>
          </div>

          {/* Filtre — aktívny stav je posuvné podčiarknutie, nie preblikávajúce pozadie. */}
          {/*
            Zámerne `aria-pressed`, nie role="tab". Tab/tablist vzor vyžaduje
            tabpanel a šípkovú navigáciu — bez nich je tá rola pre čítačku
            zavádzajúcejšia než obyčajné prepínacie tlačidlo.
          */}
          <div
            data-reveal="up"
            role="group"
            aria-label="Filtrovanie realizácií"
            className="-mx-5 flex gap-1 overflow-x-auto px-5 lg:mx-0 lg:px-0"
          >
            {galleryFilters.map((item) => {
              const active = item === filter;

              return (
                <button
                  key={item}
                  type="button"
                  aria-pressed={active}
                  onClick={() => changeFilter(item)}
                  className={`relative shrink-0 px-4 py-2.5 text-sm font-semibold transition-colors duration-[var(--d-micro)] ${
                    active ? "text-dark" : "text-muted hover:text-dark"
                  }`}
                >
                  {item}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-2 bottom-0 h-0.5 origin-left rounded-full bg-accent transition-transform duration-[var(--d-short)] ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <ul className="mt-12 grid auto-rows-[minmax(0,1fr)] gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {visible.map((item, i) => (
            <li
              key={item.id}
              data-reveal="mask"
              style={
                {
                  "--reveal-delay": `${Math.min(i, 6) * 60}ms`,
                  viewTransitionName: `rea-${item.id}`,
                } as React.CSSProperties
              }
              className={`overflow-hidden rounded-panel ${
                item.wide ? "sm:col-span-2" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => setLightbox(i)}
                className="group relative block h-full w-full overflow-hidden"
                aria-label={`Zväčšiť fotku: ${item.caption}`}
              >
                <div
                  className={`relative w-full ${
                    item.wide ? "aspect-[16/9]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={item.photo}
                    alt={item.alt}
                    fill
                    loading="lazy"
                    sizes={
                      item.wide
                        ? "(min-width: 1024px) 66vw, 100vw"
                        : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    }
                    quality={80}
                    className="object-cover transition-transform duration-[var(--d-long)] group-hover:scale-[1.04]"
                  />
                </div>

                {/* Popis vychádza zdola pri hover, na dotykových zariadeniach je vždy vidieť. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark/85 to-transparent p-5 pt-14"
                >
                  <p className="translate-y-2 text-left text-sm font-semibold text-white opacity-0 transition-[transform,opacity] duration-[var(--d-short)] group-hover:translate-y-0 group-hover:opacity-100 max-lg:translate-y-0 max-lg:opacity-100">
                    {item.caption}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {current ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-dark/95 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Zavrieť"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full text-white/80 transition-colors duration-[var(--d-micro)] hover:bg-white/10 hover:text-white"
          >
            <X size={22} />
          </button>

          <button
            type="button"
            aria-label="Predchádzajúca fotka"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) =>
                i === null ? i : (i - 1 + visible.length) % visible.length,
              );
            }}
            className="absolute left-3 grid h-11 w-11 place-items-center rounded-full text-white/80 transition-colors duration-[var(--d-micro)] hover:bg-white/10 hover:text-white md:left-8"
          >
            <ChevronLeft size={26} />
          </button>

          <figure
            className="max-h-[86svh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={current.photo}
              alt={current.alt}
              sizes="(min-width: 1024px) 1024px, 100vw"
              quality={85}
              className="max-h-[76svh] w-full rounded-panel object-contain"
            />
            <figcaption className="mt-4 text-center text-sm text-white/70">
              {current.caption}
              <span className="tabular ml-2 text-white/40">
                {lightbox! + 1} / {visible.length}
              </span>
            </figcaption>
          </figure>

          <button
            type="button"
            aria-label="Ďalšia fotka"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i === null ? i : (i + 1) % visible.length));
            }}
            className="absolute right-3 grid h-11 w-11 place-items-center rounded-full text-white/80 transition-colors duration-[var(--d-micro)] hover:bg-white/10 hover:text-white md:right-8"
          >
            <ChevronRight size={26} />
          </button>
        </div>
      ) : null}
    </section>
  );
}
