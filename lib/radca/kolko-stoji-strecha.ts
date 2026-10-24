import { photos, procesFoto } from "@/lib/images";
import type { Clanok } from "@/lib/radca/typy";

export const kolkoStojiStrecha: Clanok = {
  slug: "kolko-stoji-strecha",
  navLabel: "Koľko stojí strecha",
  odkazText: "Z čoho sa skladá cena strechy",
  title: "Koľko stojí strecha na rodinný dom",
  description:
    "Z čoho sa skladá cena strechy na rodinný dom, čo ju najviac mení, prečo sa ponuky za m² nedajú vždy porovnať a ako zistiť orientačnú cenu svojej strechy.",
  pill: "Radca · Cena",
  nadpis: { pred: "Koľko stojí ", zvyraznene: "strecha", za: " na rodinný dom" },
  perex:
    "Jedno číslo pre všetky domy neexistuje. Cenu určuje plocha a tvar strechy, krytina a to, čo je pod ňou. Tu je, z čoho sa skladá a ako si ju zistiť pre vlastný dom.",
  publikovane: "2026-10-24",
  upravene: "2026-10-24",
  foto: {
    src: photos.rekonstrukciaStrechy,
    alt: "Rodinný dom s novou tmavou strechou, odkvapmi a zvodmi — Orava",
  },

  kapitoly: [
    {
      id: "z-coho",
      nazov: "Z čoho sa skladá",
      tvrdenie:
        "Cena strechy nie je cena krytiny. Krytina je len jedna z vrstiev, za ktoré sa platí.",
      odseky: [
        "Keď sa porovnávajú krytiny, porovnávajú sa ceny za štvorcový meter materiálu. Hotová strecha však obsahuje ďalšie vrstvy pod krytinou, klampiarinu, doplnky a prácu — a pri výmene aj demontáž a odvoz tej pôvodnej.",
        "Preto dve ponuky s rovnakou krytinou môžu byť od seba ďaleko. Jedna počíta len krytinu a montáž, druhá celú strechu.",
      ],
      foto: {
        src: procesFoto.hydroizolaciaKrytina,
        alt: "Poistná hydroizolácia a kladenie krytiny — vrstvy, ktoré tvoria cenu strechy, Orava",
      },
      bloky: [
        {
          typ: "vrstvy",
          lead: "Položky, ktoré bežne tvoria cenu hotovej šikmej strechy.",
          polozky: [
            {
              nazov: "Krov",
              text: "Pri novostavbe nosná konštrukcia. Pri výmene strechy oprava alebo zosilnenie poškodených prvkov.",
            },
            {
              nazov: "Podklad",
              text: "Plné debnenie alebo kontralaty a latovanie — podľa typu krytiny.",
            },
            {
              nazov: "Poistná hydroizolácia",
              text: "Paropriepustná fólia pod krytinou.",
            },
            {
              nazov: "Krytina",
              text: "Materiál a jeho montáž. Líši sa typom, materiálom aj triedou povrchovej úpravy.",
            },
            {
              nazov: "Klampiarina a odkvapy",
              text: "Oplechovanie komínov, úžľabí a prestupov, lišty, žľaby a zvody.",
            },
            {
              nazov: "Doplnky",
              text: "Sneholamy, bezpečnostné háky, prípadne strešné okná a izolácia.",
            },
            {
              nazov: "Pri výmene navyše",
              text: "Demontáž, odvoz a likvidácia pôvodnej krytiny.",
            },
          ],
        },
      ],
    },

    {
      id: "co-meni-cenu",
      nazov: "Čo mení cenu",
      tvrdenie:
        "Dve strechy s rovnakou plochou môžu stáť výrazne inak. Plocha je len začiatok.",
      odseky: [
        "Najviac sa cena hýbe s tvarom strechy a s voľbou krytiny. Ďalšie položky pribudnú alebo odpadnú podľa toho, či ide o novostavbu, alebo o výmenu na starom dome.",
      ],
      bloky: [
        {
          typ: "karty",
          polozky: [
            {
              nazov: "Tvar a členitosť",
              text: "Valby, úžľabia a vikiere znamenajú viac rezov, viac odpadu krytiny a viac klampiarskych prvkov ako jednoduchá sedlová strecha.",
            },
            {
              nazov: "Krytina",
              text: "Trapézový plech, plechová škridla, falcovaný plech, šindeľ či betónová škridla sa líšia cenou materiálu aj prácnosťou montáže.",
            },
            {
              nazov: "Sklon",
              text: "Pri rovnakom pôdoryse má strmšia strecha väčšiu plochu a pohyb po nej je pomalší a náročnejší na istenie.",
            },
            {
              nazov: "Novostavba alebo výmena",
              text: "Pri výmene pribúda demontáž a odvoz a časť ceny sa ukáže až po odkrytí — stav krovu sa dá spoľahlivo posúdiť až vtedy.",
            },
            {
              nazov: "Detaily",
              text: "Každý komín, strešné okno či prestup potrebuje vlastné oplechovanie a napojenie.",
            },
            {
              nazov: "Prístup k domu",
              text: "Kam dovezie auto materiál, či treba lešenie a kam dočiahne technika, ovplyvní podiel ručnej práce.",
            },
          ],
        },
      ],
    },

    {
      id: "cena-za-m2",
      nazov: "Cena za m²",
      tvrdenie:
        "Cena za m² sa dá porovnať len vtedy, keď obe ponuky rátajú to isté a z tej istej plochy.",
      odseky: [
        "Plocha strechy nie je plocha domu. Šikmá rovina je dlhšia než jej pôdorys: pri sklone 30° má strecha zhruba o 15 % väčšiu plochu, pri sklone 45° približne o 41 % väčšiu. K tomu sa pripočítajú presahy nad štítmi a odkvapom.",
        "Preto má bungalov strechu veľkú v pomere k obytnej ploche — celé bývanie je pod jednou strechou na jednom podlaží. Dom s obytným podkrovím má na rovnakú obytnú plochu strechu menšiu.",
        "Pri porovnávaní ponúk sa preto oplatí pýtať, z akej plochy sa ráta a čo všetko v cene za m² je.",
      ],
      bloky: [
        {
          typ: "zoznam",
          nadpis: "Čo si overiť v cenovej ponuke",
          lead: "Ak niečo z toho v ponuke chýba, nie je lacnejšia — len neúplná.",
          polozky: [
            "Z akej plochy sa ráta — strešná rovina, nie pôdorys",
            "Demontáž, odvoz a likvidácia pôvodnej krytiny",
            "Podklad — debnenie alebo laty a kontralaty",
            "Paropriepustná fólia",
            "Oplechovanie komínov, úžľabí a prestupov",
            "Odkvapový systém a sneholamy",
            "Lešenie, doprava a odvoz odpadu",
            "Ako sa rieši poškodený krov, ak sa ukáže po odkrytí",
          ],
        },
      ],
    },

    {
      id: "ako-zistit",
      nazov: "Ako zistiť cenu",
      tvrdenie:
        "Orientačnú cenu si viete vyrátať sami za pár minút. Záväznú cenu dá až obhliadka.",
      odseky: [
        "Seriózna firma vám záväznú cenu cez telefón nepovie — nevidí strechu, nepozná jej rozmery ani stav krovu. Orientačný rozsah však zistiť viete.",
      ],
      bloky: [
        {
          typ: "vrstvy",
          lead: "Od prvého odhadu po záväznú ponuku.",
          polozky: [
            {
              nazov: "Kalkulátor",
              text: "Zadáte tvar, plochu, sklon a krytinu. Dostanete orientačný rozsah s rozpisom na materiál a prácu.",
            },
            {
              nazov: "Dopyt s fotkami",
              text: "Pri výmene pomôžu fotky strechy, komína a podkrovia — na prvé posúdenie často stačia.",
            },
            {
              nazov: "Obhliadka a zameranie",
              text: "Bezplatná a nezáväzná. Zmeriame strechu a posúdime stav konštrukcie.",
            },
            {
              nazov: "Záväzná ponuka",
              text: "S rozpisom položiek, aby ste ju vedeli porovnať s inými.",
            },
          ],
        },
      ],
    },
  ],

  faq: [
    {
      otazka: "Koľko stojí strecha na rodinný dom?",
      odpoved:
        "Jedno číslo pre všetky domy neexistuje — rozhoduje plocha a tvar strechy, zvolená krytina, skladba vrstiev a to, či ide o novostavbu, alebo výmenu. Orientačný rozsah pre svoju strechu si vyrátate v kalkulátore. Záväznú cenu povieme po bezplatnej obhliadke.",
    },
    {
      otazka: "Prečo sa cenové ponuky na strechu tak líšia?",
      odpoved:
        "Najčastejšie preto, že neobsahujú to isté. Jedna ráta len krytinu a montáž, druhá aj fóliu, klampiarinu, odkvapy, lešenie a odvoz. Rozdiel býva aj v ploche — niekto ráta z pôdorysu, niekto zo skutočnej plochy strešných rovín.",
    },
    {
      otazka: "Je výmena strechy drahšia ako nová strecha?",
      odpoved:
        "Všeobecne sa to povedať nedá. Pri výmene pribúda demontáž a odvoz pôvodnej krytiny a prípadná oprava krovu, naopak krov už spravidla stojí. Pri novostavbe sa platí aj nový krov.",
    },
    {
      otazka: "Prečo je strecha na bungalov drahšia?",
      odpoved:
        "Nie je drahšia na meter, ale je veľká v pomere k obytnej ploche. Celé bývanie bungalovu je na jednom podlaží, takže strecha musí prekryť celý pôdorys. Dom s obytným podkrovím má na rovnakú obytnú plochu menšiu strechu.",
    },
    {
      otazka: "Dá sa na streche ušetriť?",
      odpoved:
        "Najviac jednoduchším tvarom strechy a pri výmene ľahkou krytinou, ktorá nevyžaduje zosilnenie krovu. Šetriť na fólii, klampiarine alebo detailoch okolo komína sa nevypláca — práve tam strechy zatekajú najčastejšie.",
    },
  ],
  sluzby: ["nova-strecha-na-kluc", "vymena-strechy", "vystavba-krovov"],
};
