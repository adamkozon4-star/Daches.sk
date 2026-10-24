import { procesFoto } from "@/lib/images";
import type { Sluzba } from "@/lib/sluzby/typy";

export const vymenaStrechy: Sluzba = {
  slug: "vymena-strechy",
  navLabel: "Výmena strechy",
  odkazText: "Viac o výmene strechy",
  title: "Výmena strechy na staršom dome",
  description:
    "Výmena strechy na staršom dome na Orave — postup krok po kroku, čo sa ukáže po odkrytí, kedy treba povolenie a ako zistiť orientačnú cenu.",
  pill: "Rekonštrukcie · celá Orava",
  nadpis: { pred: "", zvyraznene: "Výmena", za: " strechy na staršom dome" },
  lead: "Od demontáže pôvodnej krytiny po hotovú strechu s novou klampiarinou. Na rodinných domoch po celej Orave.",
  fakty: [
    "Vrátane demontáže a odvozu",
    "Kontrola krovu po odkrytí",
    "Bezplatná obhliadka",
  ],
  foto: {
    src: procesFoto.noveDebnenie,
    alt: "Odkrytá strecha staršieho domu s novým debnením počas výmeny — realizácia Daches s.r.o. na Orave",
    pozicia: "center 58%",
  },

  kapitoly: [
    {
      id: "kedy-vymena",
      nazov: "Kedy je čas",
      tvrdenie:
        "Stará strecha sa málokedy ohlási naraz. Keď je problém vidieť zvnútra, zvyčajne trvá už dlhšie.",
      odseky: [
        "Najprv sa objaví vlhká škvrna na povale, po vetre chýba škridla alebo na oplechovaní komína presvitá hrdza. Pri obhliadke sa potom často ukáže, že problém nie je v krytine, ale v tom, čo je pod ňou.",
        "Výmena strechy preto nie je len o novej krytine. Keď je konštrukcia odkrytá, je to jediná chvíľa, kedy sa dá skontrolovať krov, doplniť chýbajúca poistná hydroizolácia a vyriešiť detaily, ku ktorým sa potom roky nikto nedostane.",
      ],
      foto: {
        // Výrez hore: dole je len plochá tieňom prekrytá krytina bez detailu,
        // zaujímavý je hrebeň, staré komíny a obec za nimi.
        src: procesFoto.povodnaKrytina,
        alt: "Pôvodná doslúžená krytina staršieho domu pred výmenou — Orava",
        pozicia: "center 24%",
      },
      bloky: [
        {
          typ: "karty",
          polozky: [
            {
              nazov: "Zatekanie a vlhké škvrny",
              text: "Škvrna na podhľade alebo na povale býva ďalej od miesta, kadiaľ voda vniká — steká po konštrukcii. Zdroj sa spoľahlivo nájde až na streche.",
            },
            {
              nazov: "Krytina na konci životnosti",
              text: "Popraskané škridly, odlupujúci sa posyp alebo prehrdzavený plech sa lokálnymi opravami už len odkladajú.",
            },
            {
              nazov: "Poškodená klampiarina",
              text: "Oplechovanie komína, úžľabia a odkvapy zvyknú doslúžiť skôr než samotná krytina a sú najčastejším miestom zatekania.",
            },
            {
              nazov: "Plánované zateplenie podkrovia",
              text: "Ak sa chystá obytné podkrovie, je rozumné riešiť strechu a izoláciu naraz — inak sa tá istá konštrukcia otvára dvakrát.",
            },
          ],
        },
      ],
    },

    {
      id: "postup",
      nazov: "Ako prebieha",
      tvrdenie:
        "Strecha sa odkrýva po častiach, aby bola počas celej výmeny chránená pred dažďom.",
      odseky: [
        "Poradie krokov nie je formalita — každý ďalší závisí od toho, čo sa zistilo v predchádzajúcom. Preto sa presný rozsah dolaďuje počas práce a odsúhlasuje s majiteľom skôr, než sa doň pustíme.",
        "Jednu takúto zákazku máme zdokumentovanú krok po kroku: od starej červenej krytiny cez odkrytú konštrukciu, nové debnenie a hydroizoláciu až po hotovú antracitovú strechu s novým oplechovaním komínov.",
      ],
      foto: {
        src: procesFoto.dokoncovanieHrebena,
        alt: "Dokončovanie hrebeňa počas výmeny strechy na rodinnom dome, Orava",
      },
      bloky: [
        {
          typ: "vrstvy",
          lead: "Priebeh výmeny v poradí, v akom práce reálne idú.",
          polozky: [
            {
              nazov: "Obhliadka a zameranie",
              text: "Posúdenie stavu, výmery a rozsahu. Bezplatne a nezáväzne — bez nej je akákoľvek cena len odhad.",
            },
            {
              nazov: "Demontáž pôvodnej krytiny",
              text: "Vrátane odvozu a likvidácie. Strecha sa odkrýva po častiach tak, aby bola priebežne chránená.",
            },
            {
              nazov: "Kontrola a oprava krovu",
              text: "Odkrytá konštrukcia je jediná príležitosť posúdiť ju naozaj. Poškodené prvky sa vymenia alebo zosilnia.",
            },
            {
              nazov: "Nový podklad",
              text: "Latovanie a kontralaty alebo plné debnenie — podľa toho, akú krytinu strecha dostane.",
            },
            {
              nazov: "Poistná hydroizolácia",
              text: "Paropriepustná fólia pod krytinu. Na staršom dome často úplne chýbala.",
            },
            {
              nazov: "Nová krytina",
              text: "Kladie sa smerom od okapu k hrebeňu, spolu s klampiarskymi prvkami v ploche.",
            },
            {
              nazov: "Klampiarina a dokončenie",
              text: "Oplechovanie komínov, úžľabí a prestupov, odkvapový systém, sneholamy a bezpečnostné prvky.",
            },
          ],
        },
        {
          typ: "zoznam",
          nadpis: "Čo výmena zahŕňa",
          lead: "Presný rozsah sa dolaďuje po obhliadke a časť sa ukáže až po odkrytí.",
          polozky: [
            "Obhliadka a posúdenie stavu krovu",
            "Demontáž pôvodnej krytiny vrátane odvozu a likvidácie",
            "Oprava alebo výmena poškodených častí krovu",
            "Nové latovanie a kontralaty alebo plné debnenie",
            "Paropriepustná fólia pod krytinu",
            "Nová krytina podľa typu a sklonu strechy",
            "Oplechovanie komínov, úžľabí a prestupov",
            "Odkvapový systém, sneholamy a bezpečnostné prvky",
          ],
        },
      ],
    },

    {
      id: "po-odkryti",
      nazov: "Po odkrytí",
      tvrdenie:
        "To, čo sa ukáže po sňatí krytiny, je jediná časť zákazky, ktorú nikto nevie oceniť dopredu.",
      odseky: [
        "Pri zatekajúcej streche je poškodený krov pomerne bežný nález. Najčastejšie ide o konce krokiev pri okape a o drevo okolo komína — teda tam, kde sa vlhkosť dlhodobo držala. Poškodené prvky sa vymenia alebo zosilnia.",
        "Takýto rozsah sa nedá spoľahlivo odhadnúť cez fotku ani zo zeme. Preto ho vždy odsúhlasujeme s majiteľom skôr, než sa doň pustíme — aj s tým, čo to znamená pre cenu a termín.",
      ],
      foto: {
        src: procesFoto.povodneKominy,
        alt: "Pôvodné komíny odhalené po sňatí krytiny — typický nález pri výmene strechy, Orava",
      },
      bloky: [
        {
          typ: "karty",
          polozky: [
            {
              nazov: "Ak máte eternitovú krytinu",
              text: "Staré eternitové šablóny môžu obsahovať azbest. Ich demontáž, zabalenie, odvoz aj likvidáciu smie vykonávať len firma s oprávnením na nakladanie s azbestom a odpad musí skončiť na určenej skládke. Pri obhliadke vám povieme, či o takúto krytinu ide, a na čo si pri výbere firmy dať pozor.",
            },
            {
              nazov: "Ak sa mení typ krytiny",
              text: "Pri prechode na ťažšiu krytinu treba overiť, či konštrukcia unesie jej hmotnosť. Pri prechode z ťažkej na ľahkú tento problém odpadá — preto je plech pri rekonštrukcii najčastejšou voľbou.",
            },
          ],
        },
      ],
    },

    {
      id: "povolenie",
      nazov: "Povolenie a dotácie",
      tvrdenie:
        "Pri výmene krytiny bez zásahu do konštrukcie ide spravidla o udržiavacie práce. Pri zásahu do krovu je to inak.",
      odseky: [
        "Ak sa mení konštrukcia krovu, tvar alebo výška strechy, alebo vzniká obytné podkrovie, posudzuje sa to prísnejšie. Záväzné stanovisko vám dá vždy stavebný úrad v mieste stavby a je rozumné overiť si to ešte pred objednaním materiálu.",
        "Na obnovu rodinných domov existujú na Slovensku dotačné programy, ktoré v niektorých výzvach zahŕňajú aj zateplenie strechy či jej obnovu. Podmienky, termíny aj oprávnené výdavky sa však medzi výzvami menia, preto sem konkrétne sumy nepíšeme — overte si aktuálny stav priamo u poskytovateľa dotácie.",
        "Ak dotáciu plánujete, povedzte nám to pri obhliadke. Rozsah prác aj podklady sa dajú pripraviť tak, aby zodpovedali podmienkam výzvy.",
      ],
      bloky: [],
    },
  ],

  faq: [
    {
      otazka: "Koľko stojí výmena strechy?",
      odpoved:
        "Rozhoduje plocha a tvar strechy, zvolená krytina a to, koľko práce si vyžiada krov po odkrytí. Orientačný rozsah s rozpisom na materiál a prácu dostanete v kalkulátore. Záväzná cena vzniká až po obhliadke, ktorá je bezplatná a nezáväzná.",
    },
    {
      otazka: "Ako dlho výmena strechy trvá?",
      odpoved:
        "Pri bežnom rodinnom dome sa čas počíta skôr na dni než na týždne, veľa však závisí od veľkosti a členitosti strechy, od počasia a od toho, čo sa ukáže po odkrytí. Konkrétny termín dohodneme po obhliadke.",
    },
    {
      otazka: "Dá sa v dome počas výmeny bývať?",
      odpoved:
        "Vo väčšine prípadov áno. Strecha sa odkrýva po častiach tak, aby bola priebežne chránená pred dažďom. Obmedzením býva skôr hluk, prach a prístup techniky okolo domu.",
    },
    {
      otazka: "Čo ak sa po odkrytí ukáže poškodený krov?",
      odpoved:
        "Je to pomerne bežné, najmä pri zatekajúcej streche. Poškodené prvky sa vymenia alebo zosilnia. Takýto rozsah sa nedá spoľahlivo oceniť dopredu, preto ho vždy odsúhlasujeme s majiteľom skôr, než sa doň pustíme.",
    },
    {
      otazka: "Môžeme nechať pôvodný krov a vymeniť len krytinu?",
      odpoved:
        "Ak je krov v dobrom stave, áno — je to najčastejší scenár. Posúdiť sa to ale dá až pri obhliadke a definitívne po odkrytí. Pri zmene typu krytiny treba zároveň overiť, či konštrukcia unesie jej hmotnosť.",
    },
    {
      otazka: "Treba na výmenu strechy stavebné povolenie?",
      odpoved:
        "Pri výmene krytiny bez zásahu do nosnej konštrukcie a bez zmeny tvaru či výšky strechy ide spravidla o udržiavacie práce. Ak sa mení konštrukcia krovu alebo vzniká obytné podkrovie, posudzuje sa to prísnejšie. Záväzné stanovisko dáva stavebný úrad v mieste stavby.",
    },
    {
      otazka: "Postaráte sa o odvoz starej krytiny?",
      odpoved:
        "Áno, demontáž aj odvoz pôvodnej krytiny bežne patria do rozsahu prác. Výnimkou je eternit s obsahom azbestu, ktorý podlieha osobitnému režimu likvidácie — viac o tom píšeme v kapitole Po odkrytí.",
    },
  ],
  suvisiace: ["plechova-strecha", "tesarske-prace"],
};
