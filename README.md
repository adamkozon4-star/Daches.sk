# Daches s.r.o. — web

Strechárska a tesárska firma z Hruštína na Orave.
Next.js 16 (App Router) · React 19 · Tailwind v4 · TypeScript.

```bash
npm run dev      # vývoj na http://localhost:3000
npm run build    # produkčný build (Vercel — s optimalizáciou obrázkov)
npm run lint
```

---

## Štruktúra

```
app/
  layout.tsx      metadata, JSON-LD, písmo, poistky motion systému
  page.tsx        poradie sekcií úvodnej stránky
  globals.css     design system + motion systém  ← jediný zdroj pravdy
  robots.ts       vrátane explicitne povolených AI crawlerov
  sitemap.ts
  icon.svg        favicon
  opengraph-image.jpg
  kalkulator/    cenový kalkulátor (samostatná routa)
  cookies/ · ochrana-osobnych-udajov/
components/       jedna sekcia = jeden komponent
lib/
  content.ts      všetok text a dáta  ← copy sa mení tu, nie v komponentoch
  images.ts       register fotiek (statické importy → rozmery zadarmo)
  kalkulator/     cenník, výpočet, odvodenie výmerov — viď KALKULATOR.md
public/
  images/         reálne fotky realizácií
  llms.txt        súhrn firmy pre jazykové modely
```

**Zmena textu = `lib/content.ts`. Zmena vzhľadu = `app/globals.css`.**
Do komponentov sa zasahuje, len keď sa mení štruktúra.

---

## Výkon

Merané na statickom exporte, gzip, bez fotiek:

| | |
|---|---|
| HTML úvodnej | 31 kB |
| CSS | 9 kB |
| JavaScript | 200 kB |
| **Spolu** | **240 kB** |

Stránka  má 207 kB — celý kalkulátor váži **10 kB** a na úvodnej
stránke sa vôbec nenačíta.

Z tých 198 kB JavaScriptu je **190 kB baseline Next.js 16 + React 19** — presne
toľko ťahá aj stránka `/cookies`, ktorá je čistý text bez interakcie. Celý
aplikačný kód (12 sekcií, galéria s lightboxom, hlavička, motion systém) váži
**8 kB**.

Klientský JavaScript majú len štyri komponenty: `Header`, `Gallery`, `MapEmbed`,
`MotionRoot`. Všetko ostatné sú server komponenty a renderuje sa do HTML.

> Ak by baseline frameworku niekedy prekážal, jediná reálna cesta nadol je iný
> framework (Astro sa dostane pod 20 kB). Nie je to odporúčanie — konzistencia
> s ostatnými klientskymi webmi má vyššiu hodnotu než 190 kB.

Ďalšie opatrenia: fotky cez `next/image` (AVIF/WebP, srcset, rozmery zo statických
importov → nulový CLS), hero fotka s `priority` + `fetchPriority="high"`, mapa sa
načíta až po kliknutí, písmo self-hostované s dvoma váhami.

---

## SEO

- **Celý obsah je v HTML** — 7 000 znakov textu čitateľných bez JavaScriptu.
  To je podmienka viditeľnosti v AI vyhľadávačoch: GPTBot, ClaudeBot ani
  PerplexityBot spravidla nespúšťajú JavaScript.
- `robots.ts` povoľuje AI crawlery menovite, `public/llms.txt` im dáva súhrn firmy.
- JSON-LD `RoofingContractor` + `Service` s katalógom služieb; obce v `areaServed`
  sú vymenované **poimenne** (Hruštín, Námestovo, Dolný Kubín, Tvrdošín, Trstená,
  Zákamenné) — pre lokálne vyhľadávanie oveľa silnejší signál než súradnice.
- Alt texty sú popisné a obsahujú lokalitu.
- Jeden `<h1>`, sekcie ako `<section aria-labelledby>`.

---

## Pred spustením na ostrú doménu

- [ ] **`company.url` v `lib/content.ts`** — teraz `https://daches.sk`. Riadi
      canonical, OG, sitemap aj JSON-LD naraz.
- [ ] **Google recenzie** — `reviews.items` je prázdne pole a zobrazí sa čestný
      stav s odkazom na Google. Vymyslené recenzie sa sem nepíšu.
- [ ] **`sameAs` v `app/layout.tsx`** — doplniť Google Business profil a sociálne siete.
- [ ] **IČO/DIČ** do pätky a do textu o ochrane osobných údajov.
- [ ] **Právne texty** (`app/cookies`, `app/ochrana-osobnych-udajov`) nechať
      skontrolovať klientom — sú to pripravené vzory, nie právny audit.
- [ ] **Overiť s klientom tvrdenia** v trust bare: či Daches robí krov aj krytinu
      vlastným tímom a či poskytuje servis po realizácii.
- [ ] **Sekcia „Priebeh realizácie"** — popisy krokov v `lib/content.ts` (`roofProcess`)
      vychádzajú z toho, čo je na fotkách vidieť. Nechať klienta doplniť lokalitu,
      plochu a rok; alt texty uvádzajú „Orava" — potvrdiť, že zákazka bola tam.
- [ ] **`aggregateRating`** doplniť do JSON-LD až s reálnymi recenziami.
- [ ] **Cenové sadzby kalkulátora** — `lib/kalkulator/cennik.ts` má `STAV = "navrh"`
      a odhadnuté trhové ceny. Nechať klienta prejsť a prepnúť na `"potvrdeny"`.
- [ ] **Overiť doménu `send.daches.sk` v Resende** + DNS záznamy na Websupporte.
      Bez toho dopyty padajú do spamu (posielajú sa z testovacej adresy Resendu).
- [ ] **Premenné prostredia vo Verceli** — `RESEND_API_KEY`, `DOPYT_ODOSIELATEL`,
      `DOPYT_PRIJEMCA`. Názvy sú v `.env.example`.

## Čo zostáva dorobiť

**Cenový kalkulátor** na `/kalkulator` je hotový a odosiela dopyty e-mailom
cez Resend. Zostáva overiť odosielaciu doménu a doplniť skutočné cenové
sadzby od klienta. Podrobnosti v [KALKULATOR.md](KALKULATOR.md).
