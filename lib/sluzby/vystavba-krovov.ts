import { photos } from "@/lib/images";
import type { Sluzba } from "@/lib/sluzby/typy";

export const vystavbaKrovov: Sluzba = {
  slug: "vystavba-krovov",
  navLabel: "Výstavba krovov",
  odkazText: "Viac o výstavbe krovov",
  title: "Krovy Orava — výstavba, typy a cena",
  description:
    "Výroba a montáž drevených krovov na Orave. Hambálkový, väznicový alebo väzníky, aké rezivo, ako krov vzniká a prečo sa cena uvádza za m² aj za m³.",
  pill: "Tesárstvo · celá Orava",
  nadpis: { pred: "Výstavba ", zvyraznene: "krovov", za: " na Orave" },
  lead: "Výroba a montáž drevených krovov podľa projektu stavby. Pre novostavby aj prestavby rodinných domov na celej Orave.",
  fakty: ["Výroba aj montáž", "Podľa projektu stavby", "Bezplatná obhliadka"],
  foto: {
    src: photos.osadenieKrovu,
    alt: "Drevený krov s plným debnením na novostavbe pred položením krytiny — realizácia Daches s.r.o. na Orave",
    // Vodorovne doľava: pri 768 px fotka presahuje do strán a drobček
    // ležal nad svetlou oblohou (4,45:1). Ľavý okraj je les — 7,3:1.
    // Na širokých obrazovkách sa vodorovná zložka neuplatní.
    pozicia: "20% 50%",
  },

  kapitoly: [
    {
      id: "typy-krovov",
      nazov: "Typy krovov",
      tvrdenie:
        "Typ krovu sa nevyberá podľa vkusu. Určuje ho rozpätie, tvar strechy a to, čo má byť v podkroví.",
      odseky: [
        "Krov nesie krytinu, sneh a vietor a prenáša ich do muriva. Spôsob, akým to robí, rozhoduje o tom, koľko miesta v podkroví zostane voľného — a to je pre väčšinu majiteľov dôležitejšie než samotná konštrukcia.",
        "Kto plánuje obytné podkrovie, potrebuje krov bez stĺpikov a šikmých vzpier uprostred priestoru. Kto podkrovie využívať nebude, môže siahnuť po riešení, ktoré je rýchlejšie a zvládne väčšie rozpätie. Konkrétny typ a rozmery prvkov určuje projekt stavby a statik.",
      ],
      foto: {
        src: photos.krovNovostavba,
        alt: "Tesári stavajú drevený krov na murovanej novostavbe, Orava",
      },
      bloky: [
        {
          typ: "karty",
          polozky: [
            {
              nazov: "Hambálková sústava",
              text: "Dvojice krokiev sú v hornej časti spojené vodorovným hambálkom. V základnej podobe nepotrebuje vnútorné stĺpiky, takže podkrovie zostane voľné.",
              udaje: [
                { popis: "Podkrovie", hodnota: "voľné, obytné" },
                { popis: "Rozpätie", hodnota: "menšie a stredné" },
              ],
            },
            {
              nazov: "Väznicová sústava",
              text: "Krokvy ležia na pozdĺžnych väzniciach, ktoré nesú stĺpiky — stolice. Zvládne väčšie rozpätia a zložitejšie tvary, stĺpiky však zasahujú do podkrovia.",
              udaje: [
                { popis: "Podkrovie", hodnota: "so stĺpikmi" },
                { popis: "Rozpätie", hodnota: "aj väčšie" },
              ],
            },
            {
              nazov: "Priehradové väzníky",
              text: "Prefabrikované trojuholníkové väzníky so spojmi zo styčníkových plechov. Montujú sa rýchlo a preklenú veľké rozpätie bez vnútorných podpier, diagonály ale bežne bránia využitiu podkrovia.",
              udaje: [
                { popis: "Podkrovie", hodnota: "spravidla nevyužiteľné" },
                { popis: "Výroba", hodnota: "vo výrobni" },
              ],
            },
            {
              nazov: "Pultový krov",
              text: "Jedna šikmá rovina. Typický pre prístavby, garáže, prístrešky a moderné domy s jednoduchou hmotou.",
              udaje: [
                { popis: "Roviny", hodnota: "jedna" },
                { popis: "Použitie", hodnota: "prístavby, prístrešky" },
              ],
            },
          ],
        },
        {
          typ: "porovnanie",
          stlpce: ["Tesársky krov", "Priehradové väzníky"],
          riadky: [
            {
              parameter: "Výroba",
              a: "prvky sa pripravia na mieru a spájajú tesárskymi spojmi",
              b: "vyrábajú sa vo výrobni podľa výpočtu, na stavbu prídu hotové",
            },
            {
              parameter: "Podkrovie",
              a: "pri hambálkovej sústave voľné",
              b: "bežné väzníky ho vyplnia diagonálami",
            },
            {
              parameter: "Rozpätie bez podpier",
              a: "obmedzené, pri väčších treba stolice",
              b: "veľké",
            },
            {
              parameter: "Neskoršie úpravy",
              a: "po posúdení sa dajú prvky upraviť alebo zosilniť",
              b: "do väzníka sa nesmie zasahovať bez posúdenia statikom",
            },
          ],
          poznamka:
            "Ide o všeobecné vlastnosti konštrukčných sústav. Ktorá z nich je vhodná pre konkrétnu stavbu a aké majú byť rozmery prvkov, určuje projekt a statický výpočet.",
        },
      ],
    },

    {
      id: "rezivo",
      nazov: "Drevo a rezivo",
      tvrdenie:
        "Krov je len taký dobrý ako drevo, z ktorého je. Najviac rozhoduje vlhkosť.",
      odseky: [
        "Na krovy sa u nás bežne používa smrekové rezivo. Čerstvo pílené drevo však obsahuje veľa vody a pri vysychaní v hotovej konštrukcii mení rozmery — krúti sa, praská a uvoľňuje spoje. Preto sa na krov odporúča rezivo s vlhkosťou zhruba do 20 %.",
        "Technicky sušené konštrukčné hranoly (KVH) sa sušia v sušiarni na vlhkosť okolo 15 %, sú hobľované a tvarovo stálejšie. Sú drahšie, no oplatia sa najmä tam, kde zostane drevo viditeľné alebo kde sa na krov priamo montuje sadrokartón obytného podkrovia.",
        "Pevnostnú triedu dreva a rozmery prvkov určuje statik, pri konštrukčnom dreve je bežná trieda C24. Prvky krovu sa bežne ošetrujú ochranným prostriedkom proti drevokaznému hmyzu, hubám a plesniam. Aké rezivo a aké ošetrenie sa použije, je súčasťou ponuky.",
      ],
      bloky: [
        {
          typ: "porovnanie",
          stlpce: ["Bežné pílené rezivo", "Technicky sušené (KVH)"],
          riadky: [
            {
              parameter: "Vlhkosť pri dodaní",
              a: "kolíše, čerstvé drevo výrazne nad 20 %",
              b: "približne 15 %",
            },
            {
              parameter: "Tvarová stálosť",
              a: "pri vysychaní sa môže krútiť a praskať",
              b: "stabilnejšie rozmery",
            },
            { parameter: "Povrch", a: "hrubý, pílený", b: "hobľovaný, zrazené hrany" },
            { parameter: "Obstarávacia cena", a: "nižšia", b: "vyššia" },
            {
              parameter: "Kde dáva zmysel",
              a: "skryté konštrukcie, hospodárske stavby",
              b: "pohľadové prvky, obytné podkrovie",
            },
          ],
          poznamka:
            "Hodnoty vlhkosti sú bežné pre daný typ reziva, nie údaje konkrétneho dodávateľa. Záväzné parametre uvádza dodávateľ v dodacom liste a pri KVH v označení výrobku.",
        },
      ],
    },

    {
      id: "postup",
      nazov: "Ako krov vzniká",
      tvrdenie:
        "Krov sa nenavrhuje na stavbe. Rozmery prvkov určuje projekt a statik — tesár ich prenesie do dreva.",
      odseky: [
        "Projekt hovorí, aký krov má byť. Stavba hovorí, aký môže byť: murivo a veniec skoro nikdy nevyjdú presne podľa výkresu. Preto sa pred prípravou prvkov meria skutočný stav — centimetrová odchýlka na murive sa na hrebeni prejaví viditeľne.",
        "Samotná montáž je potom pri dobre pripravených prvkoch otázkou dní. Na krov môže hneď nadviazať podklad pod krytinu, fólia a krytina — a stavba je pod strechou.",
      ],
      foto: {
        src: photos.vystavbaKrovov,
        alt: "Drevený krov rodinného domu počas montáže, Orava — Daches s.r.o.",
      },
      bloky: [
        {
          typ: "vrstvy",
          lead: "Postup od projektu po hotový krov.",
          polozky: [
            {
              nazov: "Projekt a statika",
              text: "Typ krovu, rozmery krokiev, väzníc a stĺpikov aj spôsob kotvenia. Bez projektu je akákoľvek cena len odhad.",
            },
            {
              nazov: "Zameranie stavby",
              text: "Skutočné rozmery muriva a venca. Odchýlky od projektu sa zachytia skôr, než sa začne rezať.",
            },
            {
              nazov: "Príprava prvkov",
              text: "Rezanie na mieru, tesárske spoje a ošetrenie dreva ochranným prostriedkom.",
            },
            {
              nazov: "Osadenie pomúrnic",
              text: "Pomúrnice sa ukotvia do venca. Od nich sa odvíja geometria celého krovu.",
            },
            {
              nazov: "Montáž krovu",
              text: "Stolice a väznice alebo väzby, potom krokvy. Ťažšie prvky sa osádzajú technikou.",
            },
            {
              nazov: "Nadväzujúce práce",
              text: "Podľa dohody hneď plné debnenie alebo kontralaty a latovanie, fólia a krytina.",
            },
          ],
        },
        {
          typ: "zoznam",
          nadpis: "Čo výstavba krovu zahŕňa",
          lead: "Presný rozsah vychádza z projektu a z obhliadky stavby.",
          polozky: [
            "Posúdenie projektu a zameranie stavby",
            "Dodávka konštrukčného reziva",
            "Príprava prvkov a tesárske spoje",
            "Ošetrenie dreva ochranným prostriedkom",
            "Osadenie a ukotvenie pomúrnic",
            "Montáž krovu vrátane stolíc, väzníc a krokiev",
            "Podľa dohody debnenie, latovanie a kontralaty",
          ],
        },
      ],
    },

    {
      id: "cena",
      nazov: "Cena krovu",
      tvrdenie:
        "Cena krovu sa uvádza za m² strechy aj za m³ dreva. Každé z tých čísel hovorí niečo iné.",
      odseky: [
        "Cena za m³ hovorí o množstve reziva. Neprezradí ale, koľko práce je v ňom: krov valbovej strechy s úžľabiami a vikiermi má na kubík dreva oveľa viac rezov a spojov než jednoduchá sedlová strecha.",
        "Cena za m² strechy je pre majiteľa zrozumiteľnejšia, ponuky sa však dajú porovnať len vtedy, keď obsahujú to isté — rezivo rovnakej kvality, ošetrenie, kotvenie aj dopravu. Pri porovnávaní sa preto oplatí pýtať, čo v čísle je a čo nie.",
        "V kalkulátore zvolíte „Nový krov“, zadáte tvar a plochu strechy a dostanete orientačný rozsah s rozpisom na materiál a prácu. Záväzná cena vzniká až nad projektom a po obhliadke.",
      ],
      bloky: [
        {
          typ: "karty",
          polozky: [
            {
              nazov: "Tvar strechy",
              text: "Valby, úžľabia a vikiere znamenajú viac prvkov, rezov a spojov ako jednoduchá sedlová strecha s rovnakou plochou.",
            },
            {
              nazov: "Rozpätie a typ krovu",
              text: "Väčšie rozpätie vyžaduje masívnejšie prvky alebo stolice. Typ krovu určuje projekt, nie cenník.",
            },
            {
              nazov: "Rezivo",
              text: "Bežné pílené rezivo a technicky sušené hranoly sa v cene výrazne líšia.",
            },
            {
              nazov: "Prístup na stavbu",
              text: "Kam dovezie auto materiál a kam dočiahne technika, ovplyvní, koľko práce pôjde ručne.",
            },
          ],
        },
      ],
    },
  ],

  faq: [
    {
      otazka: "Koľko stojí krov za m²?",
      odpoved:
        "Závisí od tvaru a sklonu strechy, rozpätia, typu krovu a použitého reziva. Orientačný rozsah s rozpisom na materiál a prácu dostanete v kalkulátore, keď zvolíte „Nový krov“. Záväznú cenu povieme nad projektom a po obhliadke, ktorá je bezplatná.",
    },
    {
      otazka: "Prečo sa niekde uvádza cena krovu za m³?",
      odpoved:
        "Cena za m³ vyjadruje množstvo reziva, nie množstvo práce. Pri zložitej streche s valbami a úžľabiami pripadá na kubík dreva oveľa viac práce než pri jednoduchej sedlovej. Ponuky preto porovnávajte podľa toho, čo obsahujú, nie len podľa jedného čísla.",
    },
    {
      otazka: "Hambálkový alebo väznicový krov?",
      odpoved:
        "Hambálková sústava v základnej podobe nepotrebuje vnútorné stĺpiky, takže podkrovie zostane voľné — hodí sa na obytné podkrovie a menšie rozpätia. Väznicová sústava zvládne väčšie rozpätia, stĺpiky však zasahujú do priestoru. Ktorá je pre vašu stavbu správna, určuje projekt a statik.",
    },
    {
      otazka: "Oplatia sa priehradové väzníky?",
      odpoved:
        "Tam, kde sa podkrovie nebude využívať a treba preklenúť veľké rozpätie, sú rýchlym riešením. Bežné väzníky ale podkrovie vyplnia diagonálami a neskôr sa do nich nesmie zasahovať bez posúdenia statikom. Ak s podkrovím do budúcna počítate, je rozumné rozhodnúť to už teraz.",
    },
    {
      otazka: "Kedy treba krov objednať?",
      odpoved:
        "Ozvite sa ešte počas murovania, nie až po dokončení hrubej stavby. Krov sa pripravuje vopred a pred jeho výrobou treba zamerať skutočný stav muriva a venca. Termín montáže potom nadväzuje na dokončenie venca.",
    },
    {
      otazka: "Potrebujem na krov projekt?",
      odpoved:
        "Pri novostavbe je krov súčasťou projektu stavby. Pri prestavbe alebo zmene tvaru strechy treba konštrukciu navrhnúť a posúdiť — rozmery prvkov a kotvenie určuje statik, nie odhad na stavbe.",
    },
    {
      otazka: "Urobíte aj krytinu?",
      odpoved:
        "Áno. Na krov môže priamo nadviazať debnenie alebo latovanie, poistná hydroizolácia, krytina aj klampiarina — viac o tom na stránke Nová strecha na kľúč.",
    },
  ],
  suvisiace: ["nova-strecha-na-kluc", "tesarske-prace"],
};
