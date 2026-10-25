import { photos, procesFoto } from "@/lib/images";
import type { Sluzba } from "@/lib/sluzby/typy";

export const klampiarskePrace: Sluzba = {
  slug: "klampiarske-prace",
  navLabel: "Klampiarske práce a opravy",
  odkazText: "Viac o klampiarskych prácach",
  title: "Klampiar Orava — odkvapy, komíny, opravy",
  description:
    "Klampiarske práce na Orave — odkvapy a zvody, oplechovanie komína, hľadanie príčin zatekania a opravy striech. Ako to funguje a kde strecha zlyháva.",
  pill: "Klampiarstvo · celá Orava",
  nadpis: { pred: "Klampiarske práce a ", zvyraznene: "opravy", za: " na Orave" },
  lead: "Odkvapy a zvody, oplechovanie komínov a hľadanie príčin zatekania. Na nových strechách aj na tých, ktoré už roky stoja.",
  fakty: ["Odkvapy a zvody", "Oplechovanie komínov", "Hľadanie príčin zatekania"],
  foto: {
    src: photos.oplechovaniePodhladu,
    alt: "Plechový podhľad a odkvapový žľab pod falcovanou strechou — klampiarske práce Daches s.r.o. na Orave",
  },
  bezKalkulatora: {
    text: "Opravy a klampiarske práce sa nedajú zodpovedne oceniť na diaľku — rozsah sa určuje na mieste. Napíšte nám, čo potrebujete, prípadne pošlite fotky, a dohodneme bezplatnú obhliadku. Ak riešite celú strechu, orientačnú cenu nájdete v kalkulátore.",
  },

  kapitoly: [
    {
      id: "odkvapy",
      nazov: "Odkvapy a zvody",
      tvrdenie:
        "Odkvap musí odviesť vodu z celej strechy aj pri prívalovom daždi. Jeho rozmer sa počíta, nie odhaduje.",
      odseky: [
        "Veľkosť žľabu a počet zvodov sa určujú podľa plochy strechy, ktorá do nich odvádza vodu. Poddimenzovaný žľab pri silnom daždi preteká a voda steká po fasáde alebo do základov. Žľab sa osádza s miernym spádom k zvodu, aby v ňom voda nestála.",
        "Na Orave k tomu pribúda sneh. Zosúvajúca sa vrstva snehu a ľadu dokáže ohnúť háky a strhnúť žľab — preto patria k odkvapu aj sneholamy, ktoré sneh na streche zadržia.",
      ],
      foto: {
        src: photos.rekonstrukciaStrechy,
        alt: "Rodinný dom s tmavou krytinou, odkvapovými žľabmi a zvodmi, Orava",
      },
      bloky: [
        {
          typ: "vrstvy",
          lead: "Cesta vody od okraja strechy do kanalizácie.",
          polozky: [
            {
              nazov: "Okapová lišta",
              text: "Navedie vodu z krytiny a fólie do žľabu, aby nezatekala pod podhľad.",
            },
            {
              nazov: "Žľab a háky",
              text: "Žľab zachytí vodu z celej strešnej roviny. Háky ho nesú v pravidelných rozostupoch a držia spád.",
            },
            {
              nazov: "Kotlík",
              text: "Prechod zo žľabu do zvodu. Pri lístí pomôže sitko, ktoré zachytí nečistoty.",
            },
            {
              nazov: "Zvod",
              text: "Zvislé potrubie pripevnené objímkami k fasáde. Počet zvodov závisí od plochy strechy.",
            },
            {
              nazov: "Napojenie na kanalizáciu",
              text: "Lapač strešných splavenín alebo iný prechod do dažďovej kanalizácie či vsaku.",
            },
          ],
        },
      ],
    },

    {
      id: "komin",
      nazov: "Oplechovanie komína",
      tvrdenie:
        "Okolo komína strecha zateká najčastejšie. Komín a strecha sa hýbu každý inak a napojenie to musí vydržať.",
      odseky: [
        "Oplechovanie komína má dve časti. Spodné sa napája na krytinu a vytiahne sa po komíne nahor. Vrchné — krycia lišta — sa osádza do drážky v komíne a prekrýva spodné. Navzájom nie sú pevne spojené, a práve to umožňuje, aby sa komín a strecha pohybovali bez toho, aby sa spoj roztrhol.",
        "Spôsob napojenia závisí od krytiny. Pri falcovanej krytine sa oplechovanie robí z rovnakého plechu a napája falcom. Pri škridle sa používa lemovanie s tvarovateľným okrajom, ktorý sa prispôsobí vlne. Pri širších komínoch sa na strane od hrebeňa robí malé sedielko, ktoré vodu rozdelí do strán, aby sa za komínom nehromadila.",
        "Tmel je doplnok, nie riešenie. Ak drží napojenie len tmel, po niekoľkých sezónach popraská a voda si cestu nájde.",
      ],
      foto: {
        src: procesFoto.povodneKominy,
        alt: "Komíny staršieho domu počas výmeny strechy — pred novým oplechovaním, Orava",
      },
      bloky: [
        {
          typ: "karty",
          polozky: [
            {
              nazov: "Spodné oplechovanie",
              text: "Napojenie komína na krytinu. Mení sa spolu s krytinou alebo pri jeho poškodení — vtedy treba okolo komína dočasne odobrať časť krytiny.",
            },
            {
              nazov: "Vrchné oplechovanie",
              text: "Krycia lišta v drážke komína. Dá sa vymeniť aj samostatne, napríklad pri oprave alebo omietnutí komína.",
            },
            {
              nazov: "Oplechovanie komplet",
              text: "Spodné aj vrchné naraz — pri novej streche, výmene krytiny alebo keď je pôvodné oplechovanie na konci životnosti.",
            },
          ],
        },
      ],
    },

    {
      id: "zatekanie",
      nazov: "Zatekanie",
      tvrdenie:
        "Miesto, kde voda kvapká do domu, je málokedy miesto, kadiaľ do strechy vniká.",
      odseky: [
        "Voda, ktorá sa dostane pod krytinu, steká po fólii, latách a krokvách a objaví sa tam, kde konštrukcia končí alebo kde sa zachytí. Škvrna na strope môže byť aj niekoľko metrov od skutočného miesta zatekania. Preto sa príčina hľadá na streche, nie pod škvrnou.",
        "Nie každá vlhkosť je zatekanie. Vodná para z interiéru môže v zime kondenzovať na studenej spodnej strane krytiny alebo fólie a kvapkať ako dážď — najmä pri strechách bez poistnej hydroizolácie alebo bez vetranej medzery. Takýto problém klampiarska oprava nevyrieši, treba upraviť skladbu strechy.",
      ],
      bloky: [
        {
          typ: "karty",
          polozky: [
            {
              nazov: "Okolo komína",
              text: "Popraskaný tmel, uvoľnená krycia lišta alebo voda hromadiaca sa za širokým komínom.",
            },
            {
              nazov: "Úžľabie",
              text: "Miesto, kde sa stretávajú dve roviny a steká najviac vody. Zanesené lístím alebo poddimenzované preteká.",
            },
            {
              nazov: "Prestupy strechou",
              text: "Odvetranie kanalizácie, anténa, solárne panely. Každý prestup potrebuje vlastné utesnenie.",
            },
            {
              nazov: "Strešné okno",
              text: "Nesprávne osadený lemovací rám alebo chýbajúce napojenie fólie okolo okna.",
            },
            {
              nazov: "Napojenie na stenu",
              text: "Kde strecha prístavby nadväzuje na stenu domu, musí oplechovanie vybiehať na stenu a byť prekryté lištou.",
            },
            {
              nazov: "Odkvap v zime",
              text: "Ľad v žľabe a na okraji strechy zadrží topiacu sa vodu, ktorá potom vzlína pod krytinu.",
            },
          ],
        },
      ],
    },

    {
      id: "udrzba",
      nazov: "Opravy a údržba",
      tvrdenie:
        "Najlacnejšia oprava je tá, ktorá príde skôr, než voda začne tiecť do konštrukcie.",
      odseky: [
        "Klampiarske prvky zvyčajne doslúžia skôr než samotná krytina. Lokálna oprava — nové oplechovanie komína, výmena úžľabia či žľabu — dokáže predĺžiť život strechy o roky. Keď je však krytina sama na konci životnosti, opravy už len odkladajú výmenu.",
        "Žľaby je dobré vyčistiť na jeseň po opadaní lístia a strechu skontrolovať po zime: sneh a ľad vedia ohnúť háky, posunúť sneholamy a uvoľniť lišty. Väčšinu takých vecí vidno zo zeme alebo z rebríka skôr, než sa prejavia v interiéri.",
      ],
      foto: {
        // Výrez hore: dole je len plochá tieňom prekrytá krytina bez detailu.
        src: procesFoto.povodnaKrytina,
        alt: "Doslúžená krytina staršieho domu s pôvodnými komínmi — Orava",
        pozicia: "center 24%",
      },
      bloky: [
        {
          typ: "zoznam",
          nadpis: "Čo klampiarske práce zahŕňajú",
          lead: "Rozsah opravy sa určuje na mieste — často stačia fotky na prvé posúdenie.",
          polozky: [
            "Montáž a výmena odkvapových žľabov a zvodov",
            "Oplechovanie komína — komplet, spodné alebo vrchné",
            "Oplechovanie úžľabí, prestupov a napojení na stenu",
            "Okapové a závetrové lišty",
            "Hľadanie a odstránenie príčin zatekania",
            "Lokálne opravy poškodenej krytiny",
            "Sneholamy a bezpečnostné prvky",
          ],
        },
      ],
    },
  ],

  faq: [
    {
      otazka: "Koľko stojí oprava strechy alebo oplechovanie komína?",
      odpoved:
        "Závisí od rozsahu, typu krytiny a prístupu na strechu, preto opravy oceňujeme až po obhliadke, ktorá je bezplatná. Na prvé posúdenie často stačia fotky poslané e-mailom.",
    },
    {
      otazka: "Prečo zateká okolo komína?",
      odpoved:
        "Najčastejšie preto, že napojenie drží len tmel, ktorý časom popraská, alebo je poškodené spodné či vrchné oplechovanie. Pri širokých komínoch sa voda môže hromadiť na strane od hrebeňa. Riešením je správne oplechovanie zo spodnej a vrchnej časti, nie ďalšia vrstva tmelu.",
    },
    {
      otazka: "Aký je rozdiel medzi spodným a vrchným oplechovaním komína?",
      odpoved:
        "Spodné oplechovanie sa napája na krytinu a vytiahne sa po komíne. Vrchné je krycia lišta zapustená do drážky v komíne, ktorá spodné prekrýva. Nie sú pevne spojené, aby sa komín a strecha mohli pohybovať nezávisle.",
    },
    {
      otazka: "Dá sa oplechovanie komína vymeniť bez výmeny strechy?",
      odpoved:
        "Áno. Vrchné oplechovanie sa dá vymeniť samostatne, pri spodnom treba okolo komína dočasne odobrať časť krytiny. Ak je však krytina sama na konci životnosti, je rozumnejšie riešiť to spolu s výmenou strechy.",
    },
    {
      otazka: "Ako často čistiť odkvapy?",
      odpoved:
        "Aspoň raz ročne, ideálne na jeseň po opadaní lístia. Pri dome blízko stromov aj častejšie. Zanesený žľab preteká a v zime v ňom zamŕza voda, ktorá môže vzlínať pod krytinu.",
    },
    {
      otazka: "Robíte aj menšie opravy?",
      odpoved:
        "Áno — výmenu časti žľabu, oplechovanie komína, opravu úžľabia či lokálnu opravu krytiny. Napíšte nám, čo sa deje, prípadne pošlite fotky, a povieme, či ide o lokálnu opravu, alebo je čas uvažovať o výmene.",
    },
    {
      otazka: "Kvapká mi zo stropu, ale strecha vyzerá v poriadku. Čo to môže byť?",
      odpoved:
        "Voda pod krytinou steká po konštrukcii a objaví sa ďaleko od miesta, kadiaľ vniká. Ak kvapká najmä v zime a v mrazoch, môže ísť aj o kondenzáciu vodnej pary z interiéru. Príčinu treba hľadať na streche a v podkroví, nie pod škvrnou.",
    },
  ],
  suvisiace: ["vymena-strechy", "plechova-strecha"],
};
