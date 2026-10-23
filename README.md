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
  sluzby/[sluzba]/  podstránky služieb — viď nižšie
  cookies/ · ochrana-osobnych-udajov/
components/       jedna sekcia = jeden komponent
lib/
  content.ts      všetok text a dáta  ← copy sa mení tu, nie v komponentoch
  sluzby.ts       obsah podstránok služieb (text, rozsah prác, FAQ)
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

## Podstránky služieb

Dovtedy bol web jedna dlhá stránka a Google jej vedel priradiť zhruba jeden
okruh dopytov. Každá služba má teraz vlastnú URL, `title`, text a FAQ.

Pridanie ďalšej služby = **jeden záznam v `lib/sluzby.ts`** plus doplnenie
`slug` k príslušnej karte v `services` v `lib/content.ts`. Routa, metadáta,
drobčeky, schéma, sitemap aj odkazy v pätke sa napoja samy.

### Kapitoly

Stránka je rozdelená na číslované kapitoly s vlastným indexom pod hero.
Robí to z nej dokument, v ktorom sa dá orientovať — čitateľ vidí dopredu,
čo ho čaká. Každá kapitola má veľké **tvrdenie** vľavo a podrobnosti vpravo:
kto stránku preletí očami, prečíta si len tvrdenia a aj tak odíde s odpoveďou.

Kapitola môže niesť bloky štyroch typov (`Blok` v `lib/sluzby.ts`):

| Typ | Na čo |
|---|---|
| `karty` | varianty alebo situácie, voliteľne s údajmi parameter → hodnota |
| `porovnanie` | tabuľka dvoch možností; `poznamka` je **povinná** |
| `vrstvy` | číslovaný postup alebo skladba strechy |
| `zoznam` | rozsah prác; prvý taký blok plní `OfferCatalog` v schéme |

Rozsah prác sa do štruktúrovaných dát berie z kapitol, nie z osobitného
poľa — aby bol v schéme vždy ten istý zoznam, ktorý číta návštevník.

### ⚠️ Technické čísla áno, tvrdenia o firme nie

Hmotnosti krytín, hrúbky plechu a vlastnosti materiálov na stránkach sú
**bežné hodnoty pre daný typ**, nie údaje konkrétneho výrobku — každá
tabuľka to musí povedať v poznámke. Roky praxe, počty realizácií, záruky
a ceny sa sem nepíšu, kým ich klient nepotvrdí. Pri dotáciách a povoleniach
zámerne žiadne sumy ani lehoty: menia sa a nesprávny údaj je horší než žiadny.

### Ako vznikol výber tém

Z našepkávača Google (`hl=sk`, `gl=sk`) — teda z toho, čo ľudia reálne píšu.
Najsilnejšie okruhy: **cena za m²**, **plechová a falcovaná strecha**,
**výmena strechy na starom dome**, plech vs. škridla, povolenie, dotácia.

### ⚠️ Prečo nie sú lokalitné podstránky

Dopyt „strechár + obec" sa na Orave prakticky nemeria — `strechár Námestovo`
ani `strecha Dolný Kubín` nemajú v našepkávači **jediný návrh**, kým
`strechári Trnava` či `strechár Košice` áno. Šesť stránok po obciach by boli
tenké stránky s prehádzaným názvom obce, čo Google hodnotí ako duplicitu.
Obce sú preto pokryté v texte úvodnej stránky a v `areaServed`.

### Čo sa do textov nesmie napísať

Technické fakty o strechách áno. Tvrdenia o firme — roky praxe, počty
realizácií, záruky, hodnotenia — **len po overení s klientom**. Pri dotáciách
a povoleniach sa zámerne neuvádzajú konkrétne sumy ani lehoty; menia sa
a nesprávny údaj je horší než žiadny.

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
- [ ] **Ďalšie podstránky služieb** — pripravené v pláne: nová strecha na kľúč,
      klampiarske práce. Radca (cena, dotácia, plech vs. škridla) zatiaľ nie je.
- [ ] **Premenné prostredia vo Verceli** — `RESEND_API_KEY`, `DOPYT_ODOSIELATEL`,
      `DOPYT_PRIJEMCA`. Názvy sú v `.env.example`.

## Čo zostáva dorobiť

**Cenový kalkulátor** na `/kalkulator` je hotový a odosiela dopyty e-mailom
cez Resend. Zostáva overiť odosielaciu doménu a doplniť skutočné cenové
sadzby od klienta. Podrobnosti v [KALKULATOR.md](KALKULATOR.md).
