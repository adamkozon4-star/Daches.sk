# Daches s.r.o. — Design system

Jediný zdroj pravdy je `app/globals.css`. Tento dokument vysvetľuje, **prečo** sú
veci nastavené tak, ako sú. Keď sa niečo rozchádza, platí CSS.

---

## 1. Paleta

Štyri farby. Nič medzi tým.

| Token | Hodnota | Použitie |
|---|---|---|
| `dark` | `#111111` | tmavé sekcie, text na svetlom |
| `dark-2` | `#181818` | panely na tmavom (trust bar, karta kontaktu) |
| `light` | `#F7F7F5` | striedavé svetlé sekcie |
| `white` | `#FFFFFF` | striedavé sekcie, karty |
| `muted` | `#A6A6A0` | sekundárny text, eyebrow na svetlom |
| `accent` | `#DFFF4F` | CTA, podčiarknutia, ikony na tmavom |

**Akcent je limetková a používa sa striedmo.** Je to najhlasnejšia farba na webe —
vo chvíli, keď ju má na sebe päť vecí naraz, prestane fungovať ako signál. Pravidlo:
v jednom výreze obrazovky najviac dva akcentové prvky.

Sekcie sa striedajú `white` → `light` → `white`, tmavé (`dark`) sú tri:
hero, „Prečo Daches" a kalkulácia. Tmavá sekcia je vždy predel, nikdy nie dve za sebou.

## 2. Typografia

Jedno písmo — **Manrope**, dve váhy (400, 800). Self-hostované cez `next/font`,
subset `latin` + `latin-ext` (bez `latin-ext` sa slovenská diakritika doťahuje
samostatným súborom).

| Token | Veľkosť | Kde |
|---|---|---|
| `text-hero` | clamp 38 → 84 px, w800 | jediný `<h1>` |
| `text-h2` | clamp 30 → 52 px, w800 | nadpisy sekcií |
| `text-h3` | clamp 17 → 20 px, w700 | názvy kariet |
| `text-lead` | clamp 16 → 19 px | úvodné odstavce |
| `text-eyebrow` | 12 px, w700, ls 0.14em | nadradené popisky |

Telesný text má `max-width: 62ch`. Číslice v krokoch, telefóne a metrikách
používajú `.tabular` (`font-variant-numeric: tabular-nums`), aby neposkakovali.

## 3. Tvar a tieň

Dva rádiusy: `radius-card` 12 px (tlačidlá, malé karty) a `radius-panel` 20 px
(veľké panely, fotky). Dva tiene: `shadow-card` (pokoj) a `shadow-lift` (hover).
Tretia hodnota sa nezavádza — od nej sa systém začne rozpadať.

## 4. Rytmus

`.section-y` = 56 px mobil / 80 px tablet / 120 px desktop.
`.container-max` = max 1240 px, padding 20 px / 32 px.
Kotvy majú `scroll-margin-top: header + 20px`, aby ich hlavička neprekryla.

---

## 5. Motion systém

### Pravidlá, ktoré platia bez výnimky

1. Animuje sa **iba** `opacity`, `transform` a `clip-path`.
2. Reveal sa spustí **raz** — po odhalení sa prvok od observera odpojí.
3. Nič nesmie spôsobiť layout shift.
4. Žiadne bounce ani elastic krivky. Strecha sa nehojdá.

### Tokeny

```
--d-micro 160ms   hover, focus
--d-short 280ms   tlačidlá, drobné posuny
--d-base  520ms   scroll reveal
--d-long  900ms   line-draw, odhalenie fotiek
--e-out   cubic-bezier(0.16, 1, 0.30, 1)
```

### Reveal

Jeden zdieľaný `IntersectionObserver` v `components/MotionRoot.tsx` obsluhuje
všetko s atribútom `data-reveal`. Vďaka tomu je `components/Reveal.tsx`
**server komponent** — nevkladá do bundlu ani bajt JavaScriptu.

Varianty: `up` (default), `left`, `right`, `scale`, `mask`.

`mask` odkrýva fotku zdola nahor cez `clip-path` a súčasne ju dosadí zo
`scale(1.06)` — to je rozdiel medzi profesionálnym prevedením a obyčajným
`fade-in`.

Stagger sa počíta z indexu a **zastaví sa po šiestej položke**. Pri ôsmich
kartách nesmie posledná čakať 640 ms.

### ⚠️ `mask` nesmie orezávať sám seba

Clip je na **obsahu** prvku (`[data-reveal="mask"] > *`), nie na prvku samotnom:

```css
.js-motion [data-reveal="mask"] > *          { clip-path: inset(0 0 100% 0) }
.js-motion [data-reveal="mask"][data-revealed] > * { clip-path: inset(0 0 0 0) }
```

IntersectionObserver počíta prienik **až po aplikovaní orezania**. Keď mal
`clip-path: inset(0 0 100% 0)` priamo pozorovaný prvok, observer videl nulovú
plochu, nikdy nenahlásil viditeľnosť a orezanie sa neodstránilo — prvok sa
schoval pred vlastným observerom a celá galéria zostala prázdna. Varianty
`up`/`scale`/`left` fungovali, lebo `opacity` ani `transform` prienik nenulujú.

**Toto sa nesmie zlúčiť späť do jedného selektora.**

### ⚠️ Špecificita — najdôležitejšia poznámka v tomto dokumente

Skrytý počiatočný stav je gatovaný triedou `.js-motion`:

```css
.js-motion [data-reveal]            { opacity: 0 }   /* (0,2,0) */
.js-motion [data-reveal][data-revealed] { opacity: 1 }   /* (0,3,0) */
```

Odhalený stav **musí** mať vyššiu špecificitu než skrytý. Keby bol napísaný ako
obyčajné `[data-revealed]` (0,1,0), gatovaný skrytý stav by ho prebil a **celý web
by zostal neviditeľný aj po odhalení**. To isté platí pre `.mark::after`
a `.eyebrow::before`.

### Prečo je skrytý stav vôbec gatovaný

Keby bolo `opacity: 0` bezpodmienečné, akákoľvek chyba JavaScriptu by nechala web
prázdny. Preto tri poistky:

1. `js-motion` sa renderuje **už na serveri** → žiadny hydration mismatch, žiadny flash.
2. `<noscript>` v `app/layout.tsx` triedu zruší, ak je JavaScript vypnutý.
3. Inline skript odomkne obsah po 4 sekundách, ak `MotionRoot` nenastavil
   `data-motion-ready` (zlyhaný chunk, chyba pri hydratácii).
4. Záchranná sieť priamo v `MotionRoot`: v intervale po načítaní a potom pri
   scrollovaní prejde nedohalené prvky obyčajnou geometriou a čo je vo
   viewporte, to odhalí — aj keby observer z akéhokoľvek dôvodu mlčal.
   Keď už nie je čo odhaľovať, sama sa odpojí.

**Toto sa nesmie odstrániť.** Je to rozdiel medzi „web sa nenačítal celkom
správne" a „web je prázdny".

### Scroll-driven animácie (bez JS)

Parallax a vypĺňanie spojnice v procese bežia cez natívne
`animation-timeline: view()` — mimo hlavného vlákna, nulový JavaScript.
V Safari sa jednoducho nič nehýbe, čo je prijateľný fallback. **Nedopĺňa sa polyfill.**

Amplitúda parallaxu je max **±4 %**. Viac vyzerá lacno.

### Kde sa čo hýbe

| Prvok | Efekt |
|---|---|
| Hero | stagger 100–560 ms, miniatúry naposledy |
| Fotky | `mask` reveal + dosadnutie mierky |
| Priebeh realizácie | predtým/potom + striedavá os, `mask` reveal, parallax |
| Proces 01–05 | **spojnica sa vypĺňa podľa scrollu** — jediný takto výrazný efekt |
| Blueprint | čiary sa samy nakreslia (`stroke-dashoffset`) |
| Galéria | View Transitions pri filtrovaní |
| Nadpisy | podčiarknutie jedného nosného slova sa nakreslí zľava |
| Eyebrow | akcentový ťah narastie z 0 na 24 px |
| Hlavička | zostáva viditeľná stále, mení len pozadie (viď nižšie) |

### Hlavička sa zámerne neskrýva

Pri scrollovaní nadol sa neschováva, hoci je to bežný vzor. Nesie telefónne
číslo aj hlavné CTA — na webe, ktorého úlohou je zohnať dopyt, musia byť
dostupné z každého miesta stránky. Skrývanie sa navyše spúšťalo aj pri kotvovej
navigácii, takže kliknutie na položku menu schovalo samotné menu.

Na mobile je vedľa hamburgeru tlačidlo na priame volanie — inak by číslo bolo
dostupné až po otvorení menu.

`prefers-reduced-motion: reduce` vypína všetko a **necháva obsah viditeľný** —
najčastejšia chyba pri reveal animáciách je, že pri vypnutom pohybe zostane
stránka prázdna.

---

## 6. Čitateľnosť textu nad hero fotkou

Prekrytie hero fotky nie je odhadnuté od oka. `scripts/_analyza-hero.js` simuluje
`object-cover`, `object-position` aj všetky tri vrstvy prekrytia a počíta WCAG
kontrast presne v miestach, kde text reálne sedí — pre desktop aj mobil.

```bash
node scripts/_analyza-hero.js
```

Vypisuje kontrast pre navigáciu, pill, H1, podnadpis, trust microcopy a pás
realizácií. Prah je 4,5:1 pre bežný text a 3:1 pre veľký nadpis; meria sa p95,
teda **najsvetlejšie** miesta pod textom, nie priemer.

**Po každej výmene hero fotky to spusti.** Iná fotka = iné svetlé miesta.
Aktuálne najtesnejšia hodnota je H1 na 5,4:1 (mobil).

Vrstvy prekrytia (v `Hero.tsx`, hodnoty musia zostať v synchrone so skriptom):

| Vrstva | Hodnota | Prečo |
|---|---|---|
| plošná | `rgba(17,17,17,0.42)` | rovnomerná čitateľnosť po celej ploche |
| vodorovná | 0.50 → 0.18 → 0.08 | extra kontrast pod textovým stĺpcom |
| zvislá | 0.42 → 0 → 0.38 | pod hlavičkou a nad spodnou hranou |

Pás realizácií vpravo mal nad svetlejšou časťou fotky kontrast **2,86:1**. Preto
sedí na vlastnom paneli `rgba(17,17,17,0.72)` s `backdrop-blur` — drží čitateľnosť
nezávisle od toho, čo je za ním, a fotka nemusí byť stmavená do čierna. To je
lepšie riešenie než zosilniť celé prekrytie: fotka je v hero vizuálny dôkaz práce,
nemá zmysel ju schovať.

## 7. Čo sa zámerne nepoužilo

- **Animačná knižnica** (framer-motion, GSAP, Lenis) — všetko vyššie sa dá spraviť
  CSS-om a jedným observerom. Knižnica by pridala váhu bez prínosu.
- **`content-visibility: auto`** — skúšané a odstránené. Na webe postavenom na
  kotvovej navigácii rozbíja presnosť skoku na sekciu.
- **Skosené tlačidlá, glassmorphism, 3D, animované gradienty** — cudzí rukopis.
- **Emoji ikony** — na každom systéme vyzerajú inak. Všade sú line-art ikony
  (lucide, stroke 1.5).
