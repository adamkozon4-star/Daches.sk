import { photos, procesFoto } from "@/lib/images";
import type { Sluzba } from "@/lib/sluzby/typy";

export const plechovaStrecha: Sluzba = {
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
        // Kapitola je o tom, čo musí krov uniesť — preto skutočný krov.
        // Pôvodne tu bola fotka, ktorá sa podľa názvu súboru tvárila ako
        // krov zvnútra, no ukazuje oplechovanie podhľadu (viď lib/images.ts).
        src: photos.vystavbaKrovov,
        alt: "Drevený krov rodinného domu pred položením krytiny — konštrukcia, ktorá nesie jej hmotnosť, Orava",
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
  suvisiace: ["vymena-strechy", "nova-strecha-na-kluc"],
};
