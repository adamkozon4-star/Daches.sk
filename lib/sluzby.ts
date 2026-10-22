import { photos, procesFoto } from "@/lib/images";

/**
 * Podstránky služieb.
 *
 * ── Prečo vôbec vznikli ─────────────────────────────────────────────────
 * Dovtedy bol celý web jedna stránka a Google jej vedel priradiť zhruba
 * jeden okruh dopytov. Každá služba tu má vlastnú URL, vlastný `title`,
 * vlastný text a vlastné FAQ — to je rozdiel medzi „web o strechách"
 * a „stránka o plechovej streche".
 *
 * ── Ako vznikol výber tém ───────────────────────────────────────────────
 * Z našepkávača Google (hl=sk, gl=sk), teda z toho, čo ľudia reálne píšu.
 * Najsilnejšie okruhy: cena za m², plechová a falcovaná strecha,
 * výmena strechy na starom dome, plech vs. škridla, povolenie, dotácia.
 *
 * Lokalitné podstránky (obec po obci) sa zámerne nerobili: dopyt
 * „strechár + obec" sa na Orave prakticky nemeria — `strechár Námestovo`
 * ani `strecha Dolný Kubín` nemajú v našepkávači jediný návrh. Vznikli by
 * tenké stránky s prehádzaným názvom obce, čo Google hodnotí ako duplicitu.
 *
 * ── Čo sa sem nesmie napísať ────────────────────────────────────────────
 * Nič, čo nie je overené s klientom — roky praxe, počty realizácií,
 * záruky, hodnotenia. Technické fakty o strechách áno, tvrdenia o firme nie.
 */

export type FaqPolozka = { otazka: string; odpoved: string };

export type Sluzba = {
  slug: string;
  /** Text v drobčekoch. */
  navLabel: string;
  /**
   * Text odkazu z iných stránok. Zámerne popisný — audit SEOptimer hlási
   * ako chybu, keď na stránke vedie šesť odkazov s rovnakým textom
   * („Viac o službe"). Odkaz má povedať, kam vedie, ešte pred kliknutím.
   */
  odkazText: string;
  /** `<title>` bez sufixu — layout dopĺňa „| Daches s.r.o.". Do 60 znakov aj so sufixom. */
  title: string;
  /** `<meta name="description">` — do 160 znakov, inak ho Google oreže. */
  description: string;
  /** `<h1>` */
  nadpis: string;
  lead: string;
  foto: { src: (typeof photos)[keyof typeof photos]; alt: string };
  /** Úvodné odseky pod fotkou. */
  uvod: string[];
  /** Karty — typy riešenia alebo situácie, kedy služba prichádza na rad. */
  karty: { nadpis: string; polozky: { nazov: string; text: string }[] };
  /** Odrážkový rozsah prác. */
  rozsah: { nadpis: string; lead: string; polozky: string[] };
  /** Voľné textové bloky — povolenie, dotácie, upozornenia. */
  bloky: { nadpis: string; odseky: string[] }[];
  faq: FaqPolozka[];
  /** Slugy ďalších služieb na prelinkovanie. */
  suvisiace: string[];
};

export const sluzby: Sluzba[] = [
  /* ═══════════════════════════════════════════════════════════════════ */
  {
    slug: "plechova-strecha",
    navLabel: "Plechová strecha",
    odkazText: "Viac o plechových strechách",
    title: "Plechová strecha — montáž a cena na Orave",
    description:
      "Montáž plechovej strechy na Orave — falcovaná, škridlová aj trapézová krytina. Čo montáž zahŕňa, pre ktorý dom sa hodí a ako zistiť orientačnú cenu.",
    nadpis: "Plechová strecha",
    lead: "Falcovaná, škridlová aj trapézová krytina. Montujeme ju na novostavby aj pri výmene starej strechy — na celej Orave.",
    foto: {
      src: photos.stresneKrytiny,
      alt: "Plechová strecha rodinného domu po montáži — realizácia Daches s.r.o. na Orave",
    },
    uvod: [
      "Plech je dnes pri výmene strechy aj pri novostavbe najčastejšia voľba. Je ľahký, takže nezaťažuje starší krov, znesie sneh aj vietor a dá sa položiť na sklony, pri ktorých skladaná krytina už netesní.",
      "Rozdiely medzi jednotlivými typmi nie sú len vo vzhľade. Líšia sa hrúbkou plechu, povrchovou ochranou, spôsobom kotvenia aj tým, aký sklon strechy znesú. Pri výbere preto nezačíname farbou, ale tvarom a sklonom konkrétnej strechy.",
    ],
    karty: {
      nadpis: "Aké plechové krytiny montujeme",
      polozky: [
        {
          nazov: "Falcovaná krytina",
          text: "Jednotlivé pásy spája falc a kotvenie nie je zvonka vidieť. Zvláda aj nízke sklony. Dodávame ju v pozinku aj v hliníku, oba vo farebnom prevedení.",
        },
        {
          nazov: "Plechová škridla",
          text: "Vzhľad klasickej škridly pri zlomku jej hmotnosti. Častá voľba na staršom dome, kde by betónová škridla krov preťažila.",
        },
        {
          nazov: "Trapézový plech",
          text: "Najúspornejšie riešenie. Hodí sa na hospodárske budovy, prístrešky a stavby, kde rozhoduje cena a rýchlosť montáže.",
        },
      ],
    },
    rozsah: {
      nadpis: "Čo montáž zahŕňa",
      lead: "Strecha nie je len krytina. Toto je rozsah, s ktorým pri plechovej streche bežne počítame — konkrétny zoznam vždy vychádza z obhliadky.",
      polozky: [
        "Obhliadka a zameranie strechy",
        "Demontáž a odvoz pôvodnej krytiny pri rekonštrukcii",
        "Kontrola stavu krovu a výmena poškodených prvkov",
        "Latovanie a kontralaty alebo plné debnenie podľa typu krytiny",
        "Paropriepustná fólia pod krytinu",
        "Montáž krytiny vrátane klampiarskych prvkov",
        "Oplechovanie komínov, úžľabí a prestupov",
        "Odkvapový systém, sneholamy a bezpečnostné prvky",
      ],
    },
    bloky: [
      {
        nadpis: "Je plechová strecha hlučná?",
        odseky: [
          "Je to najčastejšia obava a pri správnej skladbe neopodstatnená. Hluk vzniká vtedy, keď je plech napnutý nad vzduchovou medzerou bez podkladu — typicky na prístreškoch či hospodárskych budovách.",
          "Pri obytnom dome je pod krytinou debnenie alebo latovanie, separačná vrstva a v podkroví izolácia. Tieto vrstvy dážď utlmia natoľko, že rozdiel oproti škridle nie je v bežnej prevádzke podstatný.",
        ],
      },
      {
        nadpis: "Farba a povrchová úprava",
        odseky: [
          "Na Orave dnes jednoznačne prevláda antracit a tmavé odtiene, ale výber farieb je podstatne širší. Dôležitejšie než odtieň je ale to, čo je pod ním: hrúbka plechu a typ povrchovej ochrany rozhodujú o tom, ako dlho bude strecha vyzerať ako nová.",
          "Tieto parametre sa líšia podľa triedy materiálu. V kalkulátore sú triedy rozpísané, aby bolo vidieť, za čo sa pri drahšom prevedení reálne platí.",
        ],
      },
    ],
    faq: [
      {
        otazka: "Koľko stojí plechová strecha za m²?",
        odpoved:
          "Cena za m² závisí od typu krytiny, triedy materiálu, sklonu a členitosti strechy a od toho, či ide o novostavbu alebo výmenu. V kalkulátore zadáte plochu a tvar strechy a dostanete orientačný rozsah s rozpisom na materiál a prácu. Záväznú cenu vieme povedať až po obhliadke, ktorá je bezplatná.",
      },
      {
        otazka: "Plech alebo škridla?",
        odpoved:
          "Rozhoduje najmä konštrukcia. Betónová alebo pálená škridla je podstatne ťažšia a starší krov ju nemusí uniesť bez zosilnenia. Plech je ľahší, zvláda nižšie sklony a montáž je rýchlejšia. Škridla má zase dlhšiu tradíciu a časť majiteľov uprednostňuje jej vzhľad. Pri výmene na staršom dome preto býva odpoveď plech, pri novostavbe je voľba otvorenejšia.",
      },
      {
        otazka: "Aký sklon strechy potrebuje falcovaná krytina?",
        odpoved:
          "Falcovaná krytina zvláda výrazne nižšie sklony než skladaná — to je jej hlavná výhoda. Presná minimálna hranica závisí od typu falcu a od pokynov výrobcu konkrétneho systému, preto ju určujeme až podľa zameranej strechy, nie dopredu.",
      },
      {
        otazka: "Ako dlho plechová strecha vydrží?",
        odpoved:
          "Záleží na hrúbke plechu a povrchovej ochrane. Výrobcovia udávajú záruku na povrchovú úpravu bežne v desiatkach rokov a líši sa podľa triedy materiálu. Životnosť ale rovnako ovplyvňuje prevedenie detailov — úžľabia, oplechovanie komína a prestupy sú miesta, kde strecha zlyháva najskôr.",
      },
      {
        otazka: "Dá sa nový plech položiť na starú krytinu?",
        odpoved:
          "Neodporúčame to. Pod starou krytinou sa nedá skontrolovať stav krovu ani doplniť chýbajúca hydroizolácia a prípadná vlhkosť v konštrukcii zostane uzavretá vnútri. Odkrytá strecha je jediná chvíľa, kedy sa k týmto vrstvám dá dostať.",
      },
      {
        otazka: "Montujete aj v zime?",
        odpoved:
          "Plechová krytina sa dá montovať aj v chladnejších mesiacoch, obmedzením je skôr sneh, poľadovica a bezpečnosť na streche než samotná teplota. Termín preto plánujeme podľa počasia a rozsahu prác.",
      },
    ],
    suvisiace: ["vymena-strechy"],
  },

  /* ═══════════════════════════════════════════════════════════════════ */
  {
    slug: "vymena-strechy",
    navLabel: "Výmena strechy",
    odkazText: "Viac o výmene strechy",
    title: "Výmena strechy na staršom dome",
    description:
      "Výmena strechy na staršom dome na Orave — demontáž pôvodnej krytiny, kontrola krovu, nová skladba a klampiarina. Ako to prebieha, povolenia a cena.",
    nadpis: "Výmena strechy",
    lead: "Od demontáže pôvodnej krytiny po hotovú strechu s novou klampiarinou. Na rodinných domoch po celej Orave.",
    foto: {
      src: procesFoto.povodnaKrytina,
      alt: "Pôvodná poškodená krytina staršieho rodinného domu pred výmenou strechy — Orava",
    },
    uvod: [
      "Stará strecha sa málokedy ohlási naraz. Najprv sa objaví vlhká škvrna na povale, po vetre chýba škridla alebo na oplechovaní komína presvitá hrdza. Pri obhliadke sa potom často ukáže, že problém nie je v krytine, ale v tom, čo je pod ňou.",
      "Výmena strechy preto nie je len o novej krytine. Keď je konštrukcia odkrytá, je to jediná chvíľa, kedy sa dá skontrolovať krov, doplniť chýbajúca poistná hydroizolácia a vyriešiť detaily, ku ktorým sa potom roky nikto nedostane.",
    ],
    karty: {
      nadpis: "Kedy je čas na výmenu",
      polozky: [
        {
          nazov: "Zatekanie a vlhké škvrny",
          text: "Škvrna na podhľade alebo na povale býva ďalej od miesta, kadiaľ voda vniká. Zdroj sa spoľahlivo nájde až na streche.",
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
    rozsah: {
      nadpis: "Čo výmena zahŕňa",
      lead: "Presný rozsah sa dolaďuje po obhliadke a časť sa ukáže až po odkrytí. Toto je skladba, s ktorou pri výmene na staršom dome bežne počítame.",
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
    bloky: [
      {
        nadpis: "Ako to vyzerá v praxi",
        odseky: [
          "Jednu takúto zákazku máme zdokumentovanú krok po kroku — od starej červenej krytiny cez odkrytú konštrukciu, nové debnenie a hydroizoláciu až po hotovú antracitovú strechu s novým oplechovaním komínov.",
          "Je to presne ten priebeh, ktorý opisujeme vyššie, len na fotkách namiesto v bodoch.",
        ],
      },
      {
        nadpis: "Ak máte eternitovú krytinu",
        odseky: [
          "Staré eternitové šablóny môžu obsahovať azbest. Ich demontáž, zabalenie, odvoz aj likvidáciu smie vykonávať len firma s oprávnením na nakladanie s azbestom a odpad musí skončiť na určenej skládke. Nie je to práca, ktorú by bolo vhodné robiť svojpomocne.",
          "Pri obhliadke vám povieme, či o takúto krytinu ide, a na čo si pri výbere firmy dať pozor.",
        ],
      },
      {
        nadpis: "Treba stavebné povolenie?",
        odseky: [
          "Záleží na rozsahu. Pri výmene krytiny bez zásahu do nosnej konštrukcie a bez zmeny tvaru či výšky strechy ide spravidla o udržiavacie práce. Ak sa mení konštrukcia krovu, tvar strechy alebo vzniká obytné podkrovie, posudzuje sa to prísnejšie.",
          "Záväzné stanovisko vám dá vždy stavebný úrad v mieste stavby — pravidlá sa líšia podľa rozsahu prác a je rozumné overiť si to ešte pred objednaním materiálu.",
        ],
      },
      {
        nadpis: "Dotácie na obnovu domu",
        odseky: [
          "Na obnovu rodinných domov existujú na Slovensku dotačné programy, ktoré v niektorých výzvach zahŕňajú aj zateplenie strechy či jej obnovu. Podmienky, termíny a oprávnené výdavky sa však medzi výzvami menia.",
          "Preto sem konkrétne sumy a podmienky nepíšeme — overte si aktuálny stav priamo u poskytovateľa dotácie. Ak dotáciu plánujete, povedzte nám to pri obhliadke; rozsah prác a podklady sa dajú pripraviť tak, aby zodpovedali podmienkam výzvy.",
        ],
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
          "Je to pomerne bežné, najmä pri zatekajúcej streche. Poškodené prvky sa vymenia alebo zosilnia. Takýto rozsah sa nedá spoľahlivo oceniť dopredu, preto ho vždy odsúhlasujeme s majiteľom skôr, než sa do neho pustíme.",
      },
      {
        otazka: "Môžeme nechať pôvodný krov a vymeniť len krytinu?",
        odpoved:
          "Ak je krov v dobrom stave, áno — je to najčastejší scenár. Posúdiť sa to ale dá až pri obhliadke a definitívne po odkrytí. Pri zmene typu krytiny treba zároveň overiť, či konštrukcia unesie jej hmotnosť.",
      },
      {
        otazka: "Postaráte sa o odvoz starej krytiny?",
        odpoved:
          "Áno, demontáž aj odvoz pôvodnej krytiny bežne patria do rozsahu prác. Výnimkou je eternit s obsahom azbestu, ktorý podlieha osobitnému režimu likvidácie — viac o tom píšeme vyššie.",
      },
    ],
    suvisiace: ["plechova-strecha"],
  },
];

export const najdiSluzbu = (slug: string) => sluzby.find((s) => s.slug === slug);
