import type { StaticImageData } from "next/image";
import { photos, procesFoto } from "@/lib/images";

/**
 * Podstránky služieb.
 *
 * ── Prečo vôbec vznikli ─────────────────────────────────────────────────
 * Dovtedy bol celý web jedna stránka a Google jej vedel priradiť zhruba
 * jeden okruh dopytov. Každá služba tu má vlastnú URL, vlastný `title`,
 * vlastný text a vlastné FAQ.
 *
 * ── Ako vznikol výber tém ───────────────────────────────────────────────
 * Z našepkávača Google (hl=sk, gl=sk), teda z toho, čo ľudia reálne píšu.
 * Najsilnejšie okruhy: cena za m², plechová a falcovaná strecha,
 * výmena strechy na starom dome, plech vs. škridla, povolenie, dotácia.
 *
 * Lokalitné podstránky (obec po obci) sa zámerne nerobili: dopyt
 * „strechár + obec" sa na Orave prakticky nemeria — `strechár Námestovo`
 * ani `strecha Dolný Kubín` nemajú v našepkávači jediný návrh.
 *
 * ── Prečo kapitoly ──────────────────────────────────────────────────────
 * Stránka je dlhá a číslované kapitoly s vlastným indexom z nej robia
 * dokument, nie zoznam odstavcov. Čitateľ vidí dopredu, čo ho čaká,
 * a vie skočiť na to, čo rieši.
 *
 * ── Čo sa sem smie a nesmie napísať ─────────────────────────────────────
 * ÁNO: technické fakty o strechách — hmotnosti, hrúbky, vlastnosti
 *      materiálov. Sú to bežné hodnoty pre daný typ krytiny, nie údaje
 *      konkrétneho výrobku; každá tabuľka to musí povedať v poznámke.
 * NIE: čokoľvek o firme, čo nie je overené s klientom — roky praxe, počty
 *      realizácií, záruky, hodnotenia, ceny. A pri dotáciách a povoleniach
 *      žiadne konkrétne sumy ani lehoty: menia sa a nesprávny údaj je
 *      horší než žiadny.
 */

export type FaqPolozka = { otazka: string; odpoved: string };

/**
 * ⚠️ Do hero a do pásov v kapitolách patria IBA fotky na šírku.
 *
 * Oba pásy sú širokouhlé a `object-cover` z fotky na výšku vyreže úzky
 * vodorovný pruh zo stredu. Presne to sa stalo s `stresne-krytiny.jpg`
 * (1536 × 2048): v hero z nej zostal detail falcov, nie strecha.
 * Fotky na výšku patria do galérie a do mriežok, nie sem.
 */
type Obrazok = {
  src: StaticImageData;
  alt: string;
  /**
   * Výrez cez `object-position`. Pás je širokouhlý, takže z fotky vidno len
   * vodorovný pruh — a predvolený stred nebýva ten správny.
   *
   * V hero má navyše vplyv na čitateľnosť: biely text nad svetlou oblohou
   * prepadol na 2,9:1. Posunutie výrezu nižšie, nad tmavú strechu, je
   * lepšie riešenie než stmaviť celú fotku prekrytím.
   */
  pozicia?: string;
};

/**
 * Obsahové bloky kapitoly. Rozlíšené podľa `typ`, aby komponent nemusel
 * hádať, čo má vykresliť, a aby sa nedal vytvoriť neúplný blok.
 */
export type Blok =
  | {
      typ: "karty";
      /** Voliteľné krátke údaje pod textom karty — parameter a hodnota. */
      polozky: {
        nazov: string;
        text: string;
        udaje?: { popis: string; hodnota: string }[];
      }[];
    }
  | {
      typ: "porovnanie";
      stlpce: [string, string];
      riadky: { parameter: string; a: string; b: string }[];
      /** Odkiaľ hodnoty sú a čo neznamenajú. Povinné — čísla bez kontextu klamú. */
      poznamka: string;
    }
  | {
      typ: "vrstvy";
      lead?: string;
      polozky: { nazov: string; text: string }[];
    }
  | { typ: "zoznam"; nadpis: string; lead?: string; polozky: string[] };

export type Kapitola = {
  /** Kotva v URL aj kľúč do indexu kapitol. */
  id: string;
  /** Krátky názov do indexu — musí sa zmestiť do jedného riadku. */
  nazov: string;
  /** Veľké tvrdenie na začiatku kapitoly. Jedna myšlienka, nie zhrnutie. */
  tvrdenie: string;
  odseky: string[];
  foto?: Obrazok;
  bloky: Blok[];
};

export type Sluzba = {
  slug: string;
  /** Text v drobčekoch. */
  navLabel: string;
  /**
   * Text odkazu z iných stránok. Zámerne popisný — audit hlási ako chybu,
   * keď na stránke vedie viac odkazov s rovnakým textom („Viac o službe").
   */
  odkazText: string;
  /** `<title>` bez sufixu — layout dopĺňa „| Daches s.r.o.". Do 60 znakov aj so sufixom. */
  title: string;
  /** `<meta name="description">` — do 160 znakov, inak ho Google oreže. */
  description: string;
  /** Štítok nad nadpisom. */
  pill: string;
  /** `<h1>` rozdelený kvôli akcentovému podčiarknutiu jedného slova. */
  nadpis: { pred: string; zvyraznene: string; za: string };
  lead: string;
  /** Tri krátke fakty pod tlačidlami. Musia byť doložené textom stránky. */
  fakty: string[];
  foto: Obrazok;
  kapitoly: Kapitola[];
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
      "Montáž plechovej strechy na Orave — falcovaná, škridlová aj trapézová krytina. Hmotnosti, sklony, skladba strechy a ako zistiť orientačnú cenu.",
    pill: "Strešné krytiny · celá Orava",
    nadpis: { pred: "", zvyraznene: "Plechová", za: " strecha na Orave" },
    lead: "Falcovaná, škridlová aj trapézová krytina. Montujeme ju na novostavby aj pri výmene starej strechy — na celej Orave.",
    fakty: [
      "Falcovaná, škridlová aj trapézová",
      "Pozink aj hliník",
      "Zvláda aj nízke sklony",
    ],
    foto: {
      src: procesFoto.hotovaStrecha,
      alt: "Dokončená falcovaná plechová strecha v antracitovej farbe s výhľadom na oravskú krajinu — realizácia Daches s.r.o.",
      pozicia: "center 74%",
    },

    kapitoly: [
      {
        id: "preco-plech",
        nazov: "Prečo plech",
        tvrdenie:
          "Pri výmene strechy rozhoduje hmotnosť. Plech váži zhruba desatinu toho, čo betónová škridla.",
        odseky: [
          "Štvorcový meter plechovej krytiny váži približne päť kilogramov. Betónová škridla sa na rovnakej ploche pohybuje okolo štyridsiatich. Pri streche so 150 m² je to rozdiel medzi zhruba 750 kilogramami a šiestimi tonami, ktoré musí uniesť krov.",
          "Práve preto býva plech pri rekonštrukcii staršieho domu najčastejšou voľbou. Pôvodný krov bol navrhnutý na to, čo na ňom ležalo. Ak sa pri výmene prechádza na ťažšiu krytinu, konštrukciu treba posúdiť a spravidla aj zosilniť — a to je práca, ktorá sa v rozpočte prejaví výraznejšie než samotná krytina.",
          "Druhým dôvodom je sklon. Skladaná krytina odvádza vodu cez presahy jednotlivých kusov, takže potrebuje dostatočný spád. Falcovaný plech tvorí súvislú plochu spojenú drážkou a zvláda aj sklony, pri ktorých by škridla zatekala.",
          "Obava z hluku pri daždi je najčastejšia a pri obytnom dome neopodstatnená. Hluk vzniká tam, kde je plech napnutý nad vzduchovou medzerou bez podkladu — na prístreškoch a hospodárskych budovách. Pod krytinou obytného domu je debnenie alebo latovanie, separačná vrstva a v podkroví izolácia.",
        ],
        foto: {
          src: photos.konstrukciaKrovu,
          alt: "Drevený krov zvnútra — konštrukcia, ktorá nesie hmotnosť krytiny, realizácia na Orave",
        },
        bloky: [
          {
            typ: "porovnanie",
            stlpce: ["Plechová krytina", "Betónová alebo pálená škridla"],
            riadky: [
              { parameter: "Hmotnosť", a: "približne 5 kg/m²", b: "približne 40 – 45 kg/m²" },
              {
                parameter: "Nároky na krov",
                a: "spravidla unesie aj starší krov",
                b: "pri rekonštrukcii treba posúdiť nosnosť",
              },
              {
                parameter: "Sklon strechy",
                a: "falcovaná zvláda aj nízke sklony",
                b: "potrebuje výraznejší spád",
              },
              {
                parameter: "Montáž",
                a: "rýchlejšia, menej spojov v ploche",
                b: "pomalšia, kus po kuse",
              },
              {
                parameter: "Doprava na strechu",
                a: "ľahká manipulácia",
                b: "pri väčších plochách vyžaduje techniku",
              },
            ],
            poznamka:
              "Hmotnosti sú bežné hodnoty pre daný typ krytiny, nie údaje konkrétneho výrobku. Záväzné číslo je vždy v technickom liste a pri posúdení krovu sa vychádza z neho.",
          },
        ],
      },

      {
        id: "typy-krytiny",
        nazov: "Typy krytiny",
        tvrdenie:
          "Plech nie je jeden materiál. Líšia sa spôsobom spájania, a od toho sa odvíja aj to, na akú strechu sa hodia.",
        odseky: [
          "Rozdiel medzi jednotlivými typmi nie je len vo vzhľade. Mení sa s ním podklad, ktorý krytina potrebuje, spôsob kotvenia aj minimálny sklon strechy. Pri výbere preto nezačíname farbou, ale tvarom a sklonom konkrétnej strechy.",
        ],
        bloky: [
          {
            typ: "karty",
            polozky: [
              {
                nazov: "Falcovaná krytina",
                text: "Jednotlivé pásy spája falc — ohnutý a zalisovaný spoj. V ploche nie je ani jeden viditeľný vrut. Pásy sa vyrábajú na dĺžku strešnej roviny, takže v ploche nevznikajú priečne spoje.",
                udaje: [
                  { popis: "Podklad", hodnota: "plné debnenie" },
                  { popis: "Kotvenie", hodnota: "skryté, príponkami" },
                  { popis: "Sklon", hodnota: "zvláda aj nízky" },
                ],
              },
              {
                nazov: "Plechová škridla",
                text: "Tabule tvarované do podoby skladanej škridly. Vzhľad klasickej strechy pri hmotnosti plechu. Kotví sa vrutmi cez spodnú časť vlny.",
                udaje: [
                  { popis: "Podklad", hodnota: "latovanie" },
                  { popis: "Kotvenie", hodnota: "viditeľné vruty" },
                  { popis: "Sklon", hodnota: "stredný a vyšší" },
                ],
              },
              {
                nazov: "Trapézový plech",
                text: "Najjednoduchšie a najúspornejšie riešenie. Veľké tabule sa kladú rýchlo, preto sa hodí na hospodárske budovy, prístrešky a stavby, kde rozhoduje cena.",
                udaje: [
                  { popis: "Podklad", hodnota: "latovanie" },
                  { popis: "Kotvenie", hodnota: "viditeľné vruty" },
                  { popis: "Typické použitie", hodnota: "hospodárske stavby" },
                ],
              },
            ],
          },
        ],
      },

      {
        id: "pozink-hlinik",
        nazov: "Pozink alebo hliník",
        tvrdenie:
          "Pri falcovanej krytine sa rozhodujete aj o materiáli plechu. Nie je to len otázka ceny.",
        odseky: [
          "Oba materiály dodávame vo farebnom prevedení a na hotovej streche ich od seba laik nerozozná. Líšia sa ale tým, ako sa správajú v čase a čo vyžadujú od montáže.",
          "Hliník nehrdzavie — na povrchu sa prirodzene tvorí tenká vrstva oxidu, ktorá materiál chráni aj v mieste poškriabania. Pozinkovaná oceľ je chránená vrstvou zinku a povrchovou úpravou; kým sú neporušené, drží spoľahlivo.",
          "Druhý rozdiel je v rozťažnosti. Hliník sa pri zmene teploty rozťahuje zhruba dvojnásobne oproti oceli, takže detaily a kotvenie musia tento pohyb umožniť. Nie je to prekážka, len to treba pri montáži rešpektovať.",
        ],
        foto: {
          src: procesFoto.hotovaStrechaDetail,
          alt: "Detail falcovaného spoja plechovej krytiny a hrebeňa, realizácia na Orave",
        },
        bloky: [
          {
            typ: "porovnanie",
            stlpce: ["Pozinkovaná oceľ", "Hliník"],
            riadky: [
              { parameter: "Hmotnosť materiálu", a: "vyššia", b: "nižšia — hliník má zhruba tretinovú hustotu" },
              {
                parameter: "Odolnosť proti korózii",
                a: "chránená zinkom a povrchovou vrstvou",
                b: "nehrdzavie, chráni sa vrstvou oxidu",
              },
              {
                parameter: "Teplotná rozťažnosť",
                a: "nižšia",
                b: "približne dvojnásobná oproti oceli",
              },
              {
                parameter: "Bežná hrúbka pásu",
                a: "okolo 0,5 mm",
                b: "väčšia — hliník je mäkší",
              },
              { parameter: "Obstarávacia cena", a: "nižšia", b: "vyššia" },
            ],
            poznamka:
              "Ide o vlastnosti materiálov, nie o konkrétny výrobok. V kalkulátore si rozdiel v cene viete prepočítať na svoju strechu — pri falcovanej krytine je voľba pozink / hliník samostatný krok.",
          },
        ],
      },

      {
        id: "skladba",
        nazov: "Skladba a rozsah",
        tvrdenie:
          "Krytina je posledná vrstva. O tom, či strecha vydrží, rozhoduje to, čo je pod ňou.",
        odseky: [
          "Väčšina porúch, ktoré na streche vidno, nevzniká v krytine. Vzniká v detailoch a vo vrstvách pod ňou — tam, kde sa odvádza vlhkosť a kde sa strecha napája na komín, úžľabie alebo prestup.",
        ],
        foto: {
          src: procesFoto.hydroizolaciaKrytina,
          alt: "Poistná hydroizolácia a kladenie plechovej krytiny počas realizácie, Orava",
        },
        bloky: [
          {
            typ: "vrstvy",
            lead: "Zdola nahor — takto vyzerá bežná skladba pod plechovou krytinou.",
            polozky: [
              {
                nazov: "Krov",
                text: "Nosná konštrukcia. Pri rekonštrukcii sa jej stav dá spoľahlivo posúdiť až po odkrytí.",
              },
              {
                nazov: "Poistná hydroizolácia",
                text: "Paropriepustná fólia. Zachytí vodu, ktorá sa dostane pod krytinu — hnaný dážď alebo zafúkaný sneh — a zároveň prepúšťa vodnú paru z interiéru von.",
              },
              {
                nazov: "Kontralaty",
                text: "Vytvoria vetranú medzeru medzi fóliou a krytinou. Bez nej sa vlhkosť nemá kade odviesť a konštrukcia pod krytinou postupne navlhne.",
              },
              {
                nazov: "Latovanie alebo plné debnenie",
                text: "Skladaná krytina sa kotví na laty. Falcovaná potrebuje súvislý podklad, teda plné debnenie.",
              },
              {
                nazov: "Krytina",
                text: "Vrstva, ktorú vidno. Jej typ určuje podklad aj spôsob kotvenia vo vrstvách pod ňou.",
              },
              {
                nazov: "Klampiarske prvky",
                text: "Okapová a závetrová lišta, hrebeň, úžľabia, oplechovanie komína a prestupov. Práve tieto miesta zlyhávajú najskôr.",
              },
            ],
          },
          {
            typ: "zoznam",
            nadpis: "Čo montáž zahŕňa",
            lead: "Konkrétny rozsah vždy vychádza z obhliadky. Toto je skladba, s ktorou pri plechovej streche bežne počítame.",
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
          "Rozhoduje najmä konštrukcia. Betónová alebo pálená škridla váži približne osemnásobok plechovej krytiny a starší krov ju nemusí uniesť bez zosilnenia. Plech je ľahší, zvláda nižšie sklony a montáž je rýchlejšia. Škridla má zase dlhšiu tradíciu a časť majiteľov uprednostňuje jej vzhľad. Pri výmene na staršom dome preto býva odpoveď plech, pri novostavbe je voľba otvorenejšia.",
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
        otazka: "Je plechová strecha hlučná pri daždi?",
        odpoved:
          "Pri obytnom dome nie. Hluk vzniká tam, kde je plech napnutý nad vzduchovou medzerou bez podkladu — typicky na prístreškoch a hospodárskych budovách. Pod krytinou obytného domu je debnenie alebo latovanie, separačná vrstva a v podkroví izolácia; tieto vrstvy dážď utlmia.",
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
      src: procesFoto.povodnaKrytina,
      alt: "Pôvodná poškodená krytina staršieho rodinného domu pred výmenou strechy — Orava",
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
          src: photos.rekonstrukciaStrechy,
          alt: "Rekonštrukcia strešnej konštrukcie staršieho domu, Orava — Daches s.r.o.",
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
          src: procesFoto.noveDebnenie,
          alt: "Nové debnenie položené na skontrolovanom krove počas výmeny strechy, Orava",
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
    suvisiace: ["plechova-strecha"],
  },
];

export const najdiSluzbu = (slug: string) => sluzby.find((s) => s.slug === slug);
