# Cenový kalkulátor — ako funguje

Samostatná stránka `/kalkulator`. Na úvodnej stránke je len sekcia
`#kalkulacia`, ktorá vysvetlí postup a odkáže sem — kalkulátor sa tak na
úvodnej vôbec nenačíta.

---

## Prečo je to v tomto repe a nie samostatná appka

Je to stránka webu, nie samostatný produkt. Vnútri repa zdieľa design systém,
tokeny, písmo aj firemné údaje, má jeden build, jeden deploy a `/kalkulator`
je normálna indexovateľná URL. Samostatná appka by znamenala duplikovaný
design systém, iframe (pre Google neviditeľný) alebo subdoménu (delí autoritu
domény) a dva zdroje pravdy.

Zároveň je pripravený na to, aby sa dal vytiahnuť: **logika nevie nič o UI**.

```
lib/kalkulator/
  cennik.ts       ← JEDINÝ súbor, ktorý sa mení pri zmene cien alebo klienta
  typy.ts         dátový model
  odvodenie.ts    bm z plochy a tvaru strechy + kontroly vierohodnosti
  vypocet.ts      čistá funkcia: vstupy → položkový rozpočet
  moznosti.ts     popisky a texty
  odoslanie.ts    doručenie dopytu
components/kalkulator/
  Kalkulator.tsx  sprievodca a stav
  casti.tsx       zdieľané UI prvky
  Vysledok.tsx    rozpis, tlač, formulár
```

`vypocet.ts` je čistá funkcia bez Reactu — dá sa testovať aj použiť na serveri.

---

## ⚠️ Sadzby zatiaľ nie sú od klienta

`lib/kalkulator/cennik.ts` má hore `STAV = "navrh"`.

Hodnoty sú **odhad bežných trhových cien na Slovensku, nie cenník Daches**.
Kým je `STAV` na `"navrh"`, kalkulátor to používateľovi otvorene napíše
v rámčeku nad rozpisom.

**Po odsúhlasení klientom:** prepíš sadzby a prepni `STAV` na `"potvrdeny"`.
Nič iné meniť netreba.

Klient má prejsť zhruba 40 čísel — €/m² krytín a montáže, konštrukcia,
demontáž, doplnky a €/bm klampiarskych prvkov. Sú v jednom súbore
a pomenované po slovensky.

### Prečo sú rozpätia úzke

Každá sadzba je `{min, max}` v rozmedzí zhruba ±15 %. Rozdiel medzi lacnejším
a drahším prevedením už zachytáva `triedaNasobok` — keby k tomu mala každá
sadzba ešte široké vlastné rozpätie, kvalita by sa počítala dvakrát a výsledok
by vyšiel v rozmedzí typu „10 000 až 18 000 €". Také číslo zákazníkovi
nepovie nič.

Prvý pokus mal široké rozpätia a celková cena vyšla v pomere 1,73× (min→max).
Po zúžení je to 1,39×, čo je použiteľné.

---

## Bežné metre sa zákazníka nepýtame

Toto je hlavný rozdiel oproti kalkulátorom, ktoré sme videli.

Referenčný kalkulátor konkurencie sa pýta „obvod okapovej hrany (bm)"
a „dĺžka závetrovej lišty (bm)". Majiteľ domu to nevie a hodí tam číslo od oka.
V reálnom teste tam niekto pri **23 m² streche zadal 434 bm okapu** — kalkulátor
to prijal bez mihnutia a okapová lišta potom tvorila **53 % celkovej ceny**.
Výsledok bol nezmysel.

`odvodenie.ts` preto počíta bm z plochy, tvaru a sklonu:

1. z šikmej plochy odvodí pôdorys (`plocha × cos(sklon)`)
2. z pôdorysu strany obdĺžnika pri bežnom pomere strán 1,5 : 1
3. z nich jednotlivé hrany podľa tvaru strechy

Pre 130 m² sedlovú so sklonom 30° vyjde okap 26 bm, závetrová 20 bm,
hrebeň 13 bm. Pre 23 m² vyjde okap 10,9 bm — teda 40× menej než tá
zadaná nezmyselnosť.

Kto strechu zameranú má, môže hodnoty prepísať. Vtedy zabrala
`skontrolujVymer()`: ak je zadané číslo mimo 0,4× – 2,5× odvodeného,
kalkulátor nepustí ďalej a vypíše, aký je jeho odhad. **Otestované presne
na tom vstupe, ktorý rozbil referenciu.**

---

## Vetvy

| Typ projektu | Kroky | Cena |
|---|---|---|
| Nová strecha na kľúč | Strecha → Rozmery → Krytina → Doplnky → Výsledok | áno |
| Rekonštrukcia strechy | to isté | áno |
| Nový krov | Strecha → Rozmery → Doplnky → Výsledok | áno |
| Oprava a klampiarske práce | — | **nie** |

Opravu kalkulátor zámerne neoceňuje. Pri lokálnej oprave rozhoduje to, čo je
vidieť až na streche; každé číslo vypočítané dopredu by bolo vymyslené.
Vetva ponúkne telefón a e-mail.

---

## Odosielanie dopytu

Zákazník klikne „Odoslať dopyt" a e-mail odíde firme — nemusí robiť nič ďalšie.

```
formulár  →  POST /api/dopyt  →  Resend API  →  schránka firmy
```

`app/api/dopyt/route.ts` volá Resend priamo cez `fetch`, bez npm balíka —
robil by presne to isté jedno POST volanie.

**Čo route rieši:**

| | |
|---|---|
| Validácia | meno, telefón, e-mail povinné; dĺžky orezané |
| Bezpečnosť | vstupy escapované pred vložením do HTML e-mailu |
| Spam | skryté pole (honeypot) — vyplnený dopyt sa ticho zahodí |
| Odpoveď | `replyTo` je e-mail zákazníka → „Odpovedať" píše priamo jemu |
| Kódovanie | e-mail je celý HTML dokument s `<meta charset="utf-8">` |

**Poistka:** ak server zlyhá (výpadok Resendu, chýbajúci kľúč), klient spadne
späť na `mailto:`. Dopyt sa nikdy nestratí, len prejde inou cestou.
Potvrdzovacia obrazovka podľa toho rozlíši, čo sa stalo.

### Premenné prostredia

Názvy sú v `.env.example`. Hodnoty patria do Vercel → Settings →
Environment Variables (a lokálne do `.env.local`, ktorý je v `.gitignore`).

| Premenná | Načo |
|---|---|
| `RESEND_API_KEY` | kľúč z Resend → API keys |
| `DOPYT_ODOSIELATEL` | napr. `Daches web <dopyt@send.daches.sk>` |
| `DOPYT_PRIJEMCA` | kam dopyty chodia |

⚠️ Po zmene premenných treba vo Verceli spraviť **Redeploy** — načítajú sa
až pri novom nasadení.

### ⚠️ Prečo subdoména `send.daches.sk`, nie `daches.sk`

Hlavná doména už má SPF záznam pre firemný e-mail cez Websupport:

```
v=spf1 a mx include:_spf.m1.websupport.sk -all
```

**Dva SPF záznamy na jednom mene sú neplatné** a rozbili by doručovanie
firemnej pošty. Subdoména má vlastný SPF a hlavnej sa nedotkne.

### Statický export už nie je možný

POST route handlery v `output: "export"` nefungujú. Navyše by vyžadoval
`images.unoptimized`, čím by zanikli responzívne veľkosti fotiek. Web beží
na Verceli, kde server je — podrobnosti v `next.config.ts`.

---

## Výkon

| | JS gzip |
|---|---|
| baseline frameworku (`/cookies`) | 196,9 kB |
| úvodná stránka | 199,9 kB |
| `/kalkulator` | 206,9 kB |

**Celý kalkulátor váži 10 kB** nad baseline a načíta sa len na svojej stránke.
Úvodná stránka sa nezmenila — odkazy na kalkulátor sú zámerne obyčajné `<a>`,
nie `<Link>`, aby si Next chunk neprefetchoval.

„Uložiť ako PDF" používa `window.print()` a tlačové štýly v `globals.css`
(sekcia 6.13) — žiadna PDF knižnica, nulová veľkosť navyše.

---

## Čo ešte chýba

- [ ] **Sadzby od klienta** + prepnúť `STAV` na `"potvrdeny"`
- [ ] **Overiť doménu `send.daches.sk`** v Resende + DNS na Websupporte
      (bez toho chodia dopyty do spamu)
- [x] ~~Skutočný endpoint namiesto `mailto:`~~ — hotové, Resend
- [ ] **Nahrávanie fotiek** strechy k dopytu — fotky povedia o streche viac
      než akékoľvek zadané číslo. Potrebuje úložisko, takže až s backendom.
- [ ] Zvážiť predvyplnenie z parametrov URL (kampane na konkrétnu službu)
