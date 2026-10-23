# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

Známy príklad z tohto projektu: `next.config.ts` musí deklarovať `images.qualities`,
inak Next 16 odmietne každý `<Image quality={...}>` s HTTP 400.

# Štyri pasce, do ktorých sa tu už raz stúpilo

- **Záporný z-index vo vlastnej sekcii.** Obal fotky v hero nesmie mať `-z-10`,
  keď sekcia má vlastné pozadie — vykreslí sa ZA neho a fotka zmizne.
- **`clip-path` na prvku, ktorý sleduje IntersectionObserver.** Observer vidí
  nulovú plochu a prvok sa nikdy neodhalí. Clip patrí na obsah (`> *`).
  Detaily v `DESIGN_SYSTEM.md`.
- **Holá kotva v navigácii.** Odkazy v `navLinks` musia byť `/#kotva`, nie
  `#kotva`. Holá kotva sa rozloží voči aktuálnej adrese, takže na podstránke
  `/sluzby/plechova-strecha` z nej vznikne `/sluzby/plechova-strecha#sluzby` —
  cieľ tam neexistuje a **celá horná navigácia na podstránkach prestane
  fungovať**. Na úvodnej stránke sa chyba neprejaví, preto je ľahké ju prehliadnuť.
- **`mask` reveal nad fotkou s `loading="lazy"`.** Orezaná fotka má pre
  prehliadač nulovú plochu, takže natívne lazy ju nezačne sťahovať — čaká, kým
  animácia orezanie zruší. Fotka sa potom sťahuje až vo chvíli, keď ju má byť
  vidieť, a návštevník pozerá na prázdny rámček. Obal okolo `<img>` to
  **nerieši** — skúšané a zmerané. Pri lazy fotkách použi `up`; `mask` len
  tam, kde sa fotka načíta hneď (`priority` / `loading="eager"`).
  Výnimka: galéria na úvodnej má `mask` aj lazy a meranie ukázalo, že tam
  načítanie funguje — má hlbšie zanorenie. Nespoliehaj sa na to pri novom
  kóde. Detaily a čísla v `DESIGN_SYSTEM.md`.

# Konvencie projektu

- Text a dáta patria do `lib/content.ts`, nie do komponentov.
- Vzhľad a motion patria do `app/globals.css`. Pred zásahom do reveal animácií
  si prečítaj sekciu o špecificite v `DESIGN_SYSTEM.md` — je tam vysvetlené,
  prečo by nesprávny selektor nechal celý web neviditeľný.
- Komponenty sú server komponenty. `"use client"` majú len `Header`, `Gallery`,
  `MapEmbed` a `MotionRoot` — pred pridaním ďalšieho zváž, či to naozaj treba.
- Nepridávaj animačné knižnice. Všetko sa dá CSS-om a jedným IntersectionObserverom.
- Nikdy nevymýšľaj recenzie, hodnotenia, počty realizácií ani roky praxe.
