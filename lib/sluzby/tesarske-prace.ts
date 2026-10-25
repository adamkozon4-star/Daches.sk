import { photos, procesFoto } from "@/lib/images";
import type { Sluzba } from "@/lib/sluzby/typy";

export const tesarskePrace: Sluzba = {
  slug: "tesarske-prace",
  navLabel: "Tesárske práce",
  odkazText: "Viac o tesárskych prácach",
  title: "Tesárske práce Orava — sanácia krovu",
  description:
    "Tesárske práce na Orave — sanácia a zosilnenie krovu, úpravy pre strešné okná a podkrovie, debnenie a latovanie. Kedy treba statika a ako to prebieha.",
  pill: "Tesárstvo · celá Orava",
  nadpis: { pred: "", zvyraznene: "Tesárske", za: " práce a sanácia krovu" },
  lead: "Opravy a zosilnenie krovov, úpravy konštrukcie a podklad pod krytinu. Pri novostavbách aj rekonštrukciách na celej Orave.",
  fakty: ["Sanácia aj zosilnenie krovu", "Úpravy pre strešné okná", "Bezplatná obhliadka"],
  foto: {
    src: photos.pultovyKrov,
    alt: "Drevená tesárska konštrukcia so stĺpmi a viditeľnými krokvami pod tmavou krytinou — realizácia Daches s.r.o. na Orave",
  },
  bezKalkulatora: {
    text: "Sanáciu ani úpravy krovu sa nedá zodpovedne oceniť na diaľku — rozsah sa ukáže až na mieste a často až po odkrytí. Napíšte nám, čo potrebujete, a dohodneme bezplatnú obhliadku. Ak staviate nový krov, orientačnú cenu nájdete v kalkulátore.",
  },

  kapitoly: [
    {
      id: "kedy-tesar",
      nazov: "Kedy treba tesára",
      tvrdenie:
        "Tesár nie je len pri novom krove. Veľká časť práce je na krovoch, ktoré už roky stoja.",
      odseky: [
        "Krov starého domu bol navrhnutý na to, čo na ňom ležalo, a na to, ako sa podkrovie používalo. Keď sa jedno alebo druhé zmení — príde ťažšia krytina, strešné okno alebo obytné podkrovie — konštrukciu treba upraviť. A keď roky zatekalo, treba ju opraviť.",
      ],
      foto: {
        src: photos.drevenaFasada,
        alt: "Tesárske práce na rodinnom dome s drevenou fasádou, Orava",
      },
      bloky: [
        {
          typ: "karty",
          polozky: [
            {
              nazov: "Poškodený krov",
              text: "Hniloba po zatekaní, drevokazný hmyz alebo prehnuté krokvy. Vyrieši sa sanáciou — výmenou alebo zosilnením prvkov.",
            },
            {
              nazov: "Strešné okno alebo vikier",
              text: "Otvor v streche prerušuje krokvy. Zaťaženie z nich treba preniesť na susedné, inak sa strecha začne prehýbať.",
            },
            {
              nazov: "Ťažšia krytina",
              text: "Pri prechode na škridlu musí krov uniesť niekoľkonásobne väčšiu hmotnosť. Často treba prvky zosilniť.",
            },
            {
              nazov: "Obytné podkrovie",
              text: "Izolácia, sadrokartón a užitné zaťaženie podlahy menia nároky na konštrukciu. Stĺpiky a vzpery sa nedajú len tak odstrániť.",
            },
            {
              nazov: "Podklad pod krytinu",
              text: "Plné debnenie, kontralaty a latovanie pri výmene krytiny. Od ich presnosti závisí, ako bude strecha vyzerať.",
            },
          ],
        },
      ],
    },

    {
      id: "sanacia",
      nazov: "Sanácia krovu",
      tvrdenie:
        "Sanácia začína odstránením príčiny. Vymeniť zhnité drevo pod strechou, ktorá zateká ďalej, nemá zmysel.",
      odseky: [
        "Drevo v krove sa poškodzuje tam, kde sa dlhodobo drží vlhkosť: na koncoch krokiev pri okape, pri pomúrnici, okolo komína a pod úžľabím. Druhým nepriateľom je drevokazný hmyz, v krovoch najmä fuzáč krovový, ktorého larvy rozožierajú drevo zvnútra a na povrchu po nich zostávajú len oválne výletové otvory.",
        "Rozsah poškodenia sa posudzuje prvok po prvku. Drevo, ktoré pri poklepe znie duto alebo sa dá ľahko prepichnúť, už nenesie. Pri rozsiahlejšom poškodení alebo pri nosných prvkoch ako väznice a stĺpiky patrí k posúdeniu aj statik.",
      ],
      bloky: [
        {
          typ: "vrstvy",
          lead: "Postup sanácie v poradí, v akom sa reálne robí.",
          polozky: [
            {
              nazov: "Posúdenie stavu",
              text: "Prehliadka krovu, poklep, sondy do dreva a nájdenie príčiny poškodenia.",
            },
            {
              nazov: "Odstránenie príčiny",
              text: "Oprava zatekania, kondenzácie alebo nevetranej konštrukcie. Bez toho sa poškodenie vráti.",
            },
            {
              nazov: "Odstránenie poškodeného dreva",
              text: "Až po zdravé drevo. Ponechané napadnuté časti by poškodenie šírili ďalej.",
            },
            {
              nazov: "Výmena alebo zosilnenie",
              text: "Nové prvky, príložky po stranách krokiev alebo protézy — nadpojenie zhnitého konca krokvy novým kusom.",
            },
            {
              nazov: "Ošetrenie dreva",
              text: "Ochranný prostriedok proti hmyzu a hubám na zachované aj nové drevo.",
            },
          ],
        },
      ],
    },

    {
      id: "upravy",
      nazov: "Úpravy krovu",
      tvrdenie:
        "Každý zásah do krovu mení to, ako sa rozkladá zaťaženie. Krokva sa nesmie len tak prerezať.",
      odseky: [
        "Najčastejšou úpravou je otvor pre strešné okno. Ak je okno širšie než medzera medzi krokvami, jedna krokva sa preruší a jej zaťaženie sa cez priečne prvky — takzvané výmeny — prenesie na susedné krokvy. Vikier je väčší zásah, ktorý spravidla vyžaduje projekt.",
        "Pri prestavbe podkrovia na obytné sa majitelia často pýtajú, či sa dajú odstrániť stĺpiky a vzpery, ktoré prekážajú. Niekedy áno, ale len tak, že ich funkciu prevezme iný prvok. Takúto zmenu musí navrhnúť statik — a pri priehradových väzníkoch platí, že bez jeho posúdenia sa do nich nezasahuje vôbec.",
      ],
      foto: {
        src: photos.starsiDomOkno,
        alt: "Strešné okno na streche staršieho domu — osadenie okna si často vyžaduje úpravu krokiev, Orava",
      },
      bloky: [
        {
          typ: "karty",
          polozky: [
            {
              nazov: "Otvor pre strešné okno",
              text: "Výmeny prenesú zaťaženie prerušenej krokvy na susedné. Rozmer otvoru sa určuje podľa konkrétneho okna.",
            },
            {
              nazov: "Zosilnenie krokiev",
              text: "Príložky alebo zdvojenie prvkov pri ťažšej krytine, väčšom zaťažení snehom alebo prehnutých krokvách.",
            },
            {
              nazov: "Zmeny pre podkrovie",
              text: "Odstránenie či presun stĺpikov a vzpier len podľa návrhu statika, ktorý určí náhradné riešenie.",
            },
          ],
        },
      ],
    },

    {
      id: "podklad",
      nazov: "Podklad pod krytinu",
      tvrdenie:
        "Debnenie a latovanie sú tesárska práca. Od ich presnosti závisí, ako bude krytina vyzerať.",
      odseky: [
        "Krytina kopíruje to, na čom leží. Zvlnené debnenie sa prenesie do falcovanej krytiny ako viditeľné vlny, nerovnomerné latovanie do radov škridiel. Preto sa podklad rovná a kontroluje skôr, než sa naň položí čokoľvek ďalšie.",
      ],
      foto: {
        src: procesFoto.noveDebnenie,
        alt: "Nové plné debnenie na streche staršieho domu počas rekonštrukcie, Orava",
      },
      bloky: [
        {
          typ: "vrstvy",
          lead: "Tesárske vrstvy medzi krovom a krytinou.",
          polozky: [
            {
              nazov: "Plné debnenie",
              text: "Súvislý podklad z dosiek. Potrebuje ho falcovaná krytina a šindeľ.",
            },
            {
              nazov: "Kontralaty",
              text: "Laty po smere krokiev nad fóliou. Vytvoria vetranú medzeru, ktorou odchádza vlhkosť.",
            },
            {
              nazov: "Latovanie",
              text: "Laty naprieč, na ktoré sa kotví skladaná krytina. Ich rozostup určuje výrobca krytiny.",
            },
          ],
        },
        {
          typ: "zoznam",
          nadpis: "Čo tesárske práce zahŕňajú",
          lead: "Rozsah vždy určí obhliadka — pri sanácii často až odkrytie.",
          polozky: [
            "Posúdenie stavu krovu",
            "Sanácia krovu — výmena a zosilnenie poškodených prvkov",
            "Ošetrenie dreva proti hmyzu a hubám",
            "Úpravy krovu pre strešné okná",
            "Zosilnenie krovu pri zmene krytiny",
            "Plné debnenie, kontralaty a latovanie",
          ],
        },
      ],
    },
  ],

  faq: [
    {
      otazka: "Koľko stoja tesárske práce?",
      odpoved:
        "Pri opravách a úpravách krovu rozhoduje rozsah poškodenia a prístup ku konštrukcii, preto ich oceňujeme až po obhliadke, ktorá je bezplatná. Pri novom krove dostanete orientačný rozsah v kalkulátore.",
    },
    {
      otazka: "Ako zistím, že je krov napadnutý?",
      odpoved:
        "Varovné znaky sú tmavé alebo mäkké miesta na dreve, pleseň, zatečené škvrny, prehnuté krokvy a pri hmyze oválne výletové otvory a drevná múčka pod nimi. Drevo, ktoré pri poklepe znie duto, už zvyčajne nenesie. Spoľahlivo to posúdi až prehliadka na mieste.",
    },
    {
      otazka: "Dá sa krov opraviť, alebo treba nový?",
      odpoved:
        "Vo väčšine prípadov sa dá opraviť — poškodené prvky sa vymenia alebo zosilnia a zdravá konštrukcia zostane. Nový krov dáva zmysel pri rozsiahlom poškodení alebo pri zmene tvaru strechy. Ktorá možnosť je rozumnejšia, ukáže posúdenie stavu.",
    },
    {
      otazka: "Môžem si dať strešné okno do existujúceho krovu?",
      odpoved:
        "Áno, je to bežná úprava. Ak je okno širšie než medzera medzi krokvami, prerušená krokva sa nahradí výmenami, ktoré prenesú zaťaženie na susedné. Pri priehradových väzníkoch treba každý zásah vopred posúdiť so statikom.",
    },
    {
      otazka: "Kedy treba statika?",
      odpoved:
        "Pri zásahu do nosných prvkov — odstránení stĺpikov alebo vzpier, prechode na ťažšiu krytinu, rozsiahlej sanácii, vikieri či akejkoľvek úprave priehradových väzníkov. Pri bežnej výmene niekoľkých poškodených krokiev rovnakého rozmeru zvyčajne nie.",
    },
    {
      otazka: "Dá sa krov sanovať bez výmeny krytiny?",
      odpoved:
        "Lokálne áno, ak je ku konštrukcii prístup z podkrovia. Konce krokiev pri okape a drevo pod úžľabím sú však často prístupné len zvonku, a vtedy treba časť krytiny dočasne odobrať. Ak je krytina aj tak na konci životnosti, je rozumné spojiť sanáciu s výmenou strechy.",
    },
  ],
  suvisiace: ["vystavba-krovov", "vymena-strechy"],
};
