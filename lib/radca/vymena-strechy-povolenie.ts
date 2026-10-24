import { photos, procesFoto } from "@/lib/images";
import type { Clanok } from "@/lib/radca/typy";

/**
 * Overené z textu zákona č. 25/2025 Z. z. (vyhlásené znenie) a novely
 * č. 243/2026 Z. z. na slov-lex.sk v októbri 2026.
 *
 * Kľúčové miesta:
 *   § 2 ods. 10      — údržba: bez zásahu do nosnej konštrukcie a bez zmeny
 *                      spôsobu užívania alebo vonkajšieho vzhľadu
 *   § 18 ods. 5 a) 1 — výmena strešnej krytiny, žľabov, zvodov, klampiarskych
 *                      a tesárskych strešných výrobkov: bez rozhodnutia
 *                      o stavebnom zámere aj bez ohlásenia
 *   § 18 ods. 4      — ohlásenie pri údržbe, ktorá môže ovplyvniť stabilitu,
 *                      protipožiarnu bezpečnosť alebo životné prostredie,
 *                      a pri kultúrnych pamiatkach. Novela 243/2026 tento
 *                      odsek preformulovala; § 18 ods. 5 a) 1 nezmenila.
 *
 * Nie je to právna rada a článok to hovorí. Pri novele zákona prejdi znova.
 */
export const vymenaStrechyPovolenie: Clanok = {
  slug: "vymena-strechy-povolenie",
  navLabel: "Výmena strechy a povolenie",
  odkazText: "Kedy treba na strechu povolenie",
  title: "Výmena strechy a stavebné povolenie",
  description:
    "Treba na výmenu strechy stavebné povolenie alebo ohlásenie? Čo hovorí nový stavebný zákon č. 25/2025 Z. z. o výmene krytiny a kedy to už nie je údržba.",
  pill: "Radca · Povolenia",
  nadpis: { pred: "Výmena strechy a ", zvyraznene: "povolenie", za: "" },
  perex:
    "Na výmenu strešnej krytiny podľa nového stavebného zákona nepotrebujete stavebné povolenie ani ohlásenie. Platí to však len dovtedy, kým ide o údržbu — zásah do krovu alebo zmena tvaru strechy je iná situácia.",
  publikovane: "2026-10-24",
  upravene: "2026-10-24",
  foto: {
    // Pôvodne dokončovanie hrebeňa — pod podnadpisom pri 768 px svetlá
    // plocha, 4,15:1 pri každom výreze. Pôvodná krytina je tmavšia.
    src: procesFoto.povodnaKrytina,
    alt: "Pôvodná krytina staršieho domu pred výmenou strechy, Orava",
  },

  kapitoly: [
    {
      id: "vymena-krytiny",
      nazov: "Výmena krytiny",
      tvrdenie:
        "Výmena strešnej krytiny je podľa zákona údržba stavby. Netreba na ňu povolenie ani ohlásenie.",
      odseky: [
        "Nový stavebný zákon (č. 25/2025 Z. z.) v § 18 ods. 5 vymenúva práce, na ktoré sa nevyžaduje rozhodnutie o stavebnom zámere ani ohlásenie. Medzi nimi je oprava a výmena strešnej krytiny, výmena odkvapových žľabov a zvodov a výmena klampiarskych a tesárskych strešných výrobkov.",
        "Podmienkou je, aby išlo o údržbu. Zákon ju v § 2 ods. 10 vymedzuje ako práce potrebné na udržanie stavby v dobrom stave bez zásahu do nosnej konštrukcie a bez zmeny spôsobu užívania alebo vonkajšieho vzhľadu.",
      ],
      bloky: [
        {
          typ: "karty",
          polozky: [
            {
              nazov: "Bez povolenia aj ohlásenia",
              text: "Výmena krytiny, žľabov a zvodov, klampiarskych prvkov a tesárskych strešných výrobkov — ak sa nezasahuje do nosnej konštrukcie.",
            },
            {
              nazov: "Ohlásenie",
              text: "Údržba, ktorá môže ovplyvniť stabilitu stavby, jej protipožiarnu bezpečnosť alebo životné prostredie, a údržba kultúrnych pamiatok.",
            },
            {
              nazov: "Stavebný zámer",
              text: "Zmena dokončenej stavby — napríklad nadstavba alebo iný tvar či výška strechy — spravidla vyžaduje rozhodnutie o stavebnom zámere.",
            },
          ],
        },
      ],
    },

    {
      id: "kedy-nie-udrzba",
      nazov: "Kedy to nie je údržba",
      tvrdenie:
        "Hranica nie je v tom, akú krytinu dáte. Je v tom, či sa siaha na konštrukciu a tvar strechy.",
      odseky: [
        "Pri výmene strechy sa často ukáže, že treba opraviť alebo vymeniť časť krovu. Prípadne sa majiteľ rozhodne zmeniť tvar strechy, pridať vikier alebo urobiť obytné podkrovie. V týchto prípadoch už nejde o samotnú údržbu a režim určí stavebný úrad.",
      ],
      foto: {
        src: photos.krovNovostavba,
        alt: "Drevený krov — nosná konštrukcia, ktorej sa výmena krytiny nedotýka, Orava",
      },
      bloky: [
        {
          typ: "karty",
          polozky: [
            {
              nazov: "Zásah do krovu",
              text: "Výmena alebo zosilnenie nosných prvkov je zásah do nosnej konštrukcie. Či stačí ohlásenie, posúdi stavebný úrad.",
            },
            {
              nazov: "Ťažšia krytina",
              text: "Prechod na podstatne ťažšiu krytinu môže ovplyvniť stabilitu stavby — krov treba posúdiť ešte pred objednaním.",
            },
            {
              nazov: "Nový otvor v streche",
              text: "Výmena existujúceho strešného okna je údržba. Nové okno znamená nový otvor a prerušenie krokiev.",
            },
            {
              nazov: "Pamiatky a chránené územia",
              text: "Kultúrna pamiatka alebo stavba v pamiatkovom území má prísnejší režim, často aj pri zmene vzhľadu.",
            },
          ],
        },
      ],
    },

    {
      id: "ako-postupovat",
      nazov: "Ako postupovať",
      tvrdenie:
        "Jeden telefonát na stavebný úrad pred objednaním materiálu ušetrí veľa starostí neskôr.",
      odseky: [
        "Stavebný zákon prechádza novelami — napríklad novela č. 243/2026 Z. z. preformulovala pravidlá ohlasovania údržby. Pravidlo pre samotnú výmenu krytiny zostalo rovnaké, no detaily sa môžu meniť. Tento článok preto nie je právna rada: záväzne o vašej stavbe rozhoduje stavebný úrad.",
      ],
      bloky: [
        {
          typ: "vrstvy",
          lead: "Postup pred výmenou strechy.",
          polozky: [
            {
              nazov: "Ujasnite si rozsah",
              text: "Len krytina a klampiarina, alebo aj krov, tvar či podkrovie? Pomôže obhliadka — povieme, čo strecha reálne potrebuje.",
            },
            {
              nazov: "Pri pochybnostiach sa opýtajte",
              text: "Stavebný úrad v mieste stavby vám povie, či vaše práce vyžadujú ohlásenie alebo rozhodnutie o stavebnom zámere.",
            },
            {
              nazov: "Ohlásenie podáva stavebník",
              text: "Teda vlastník. Formulár zverejňuje stavebný úrad, my dodáme popis rozsahu prác.",
            },
            {
              nazov: "Až potom materiál",
              text: "Objednávka materiálu a termín prác prichádzajú na rad, keď je jasné, že nič nebráni začatiu.",
            },
          ],
        },
      ],
    },
  ],

  faq: [
    {
      otazka: "Potrebujem na výmenu strechy stavebné povolenie?",
      odpoved:
        "Na výmenu strešnej krytiny nie. Podľa § 18 ods. 5 stavebného zákona č. 25/2025 Z. z. sa na ňu nevyžaduje rozhodnutie o stavebnom zámere ani ohlásenie — ak ide o údržbu bez zásahu do nosnej konštrukcie a bez zmeny tvaru strechy.",
    },
    {
      otazka: "Musím výmenu krytiny ohlásiť?",
      odpoved:
        "Spravidla nie. Ohlásenie sa vyžaduje pri údržbe, ktorá môže ovplyvniť stabilitu stavby, protipožiarnu bezpečnosť alebo životné prostredie, a pri kultúrnych pamiatkach. Ak si nie ste istí, opýtajte sa stavebného úradu.",
    },
    {
      otazka: "Čo ak sa pri výmene musí opraviť krov?",
      odpoved:
        "Oprava nosných prvkov je zásah do nosnej konštrukcie, takže už nejde len o údržbu. Či stačí ohlásenie, posúdi stavebný úrad. Rozsah opravy krovu sa často ukáže až po odkrytí — preto je dobré poradiť sa s úradom vopred.",
    },
    {
      otazka: "Treba povolenie na strešné okno?",
      odpoved:
        "Výmena existujúceho okna patrí medzi údržbu. Nové strešné okno znamená nový otvor v streche a prerušenie krokiev — to už nie je výmena, a režim je dobré overiť na stavebnom úrade.",
    },
    {
      otazka: "Kto podáva ohlásenie — firma alebo majiteľ?",
      odpoved:
        "Ohlásenie podáva stavebník, teda vlastník stavby. Dodávateľ pripraví popis rozsahu prác, ktorý k nemu patrí.",
    },
  ],
  sluzby: ["vymena-strechy", "tesarske-prace"],
  zdroje: [
    {
      nazov: "Zákon č. 25/2025 Z. z. — Stavebný zákon (Slov-Lex)",
      url: "https://www.slov-lex.sk/ezbierky-fe/pravne-predpisy/SK/ZZ/2025/25/",
    },
    {
      nazov: "Zákon č. 243/2026 Z. z. — novela (Slov-Lex)",
      url: "https://static.slov-lex.sk/static/SK/ZZ/2026/243/vyhlasene_znenie.html",
    },
  ],
};
