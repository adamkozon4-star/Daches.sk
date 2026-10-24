import { procesFoto } from "@/lib/images";
import type { Clanok } from "@/lib/radca/typy";

export const zatekanieStrechy: Clanok = {
  slug: "zatekanie-strechy",
  navLabel: "Zatekanie strechy",
  odkazText: "Prečo strecha zateká a čo s tým",
  title: "Zatekanie strechy — príčiny a oprava",
  description:
    "Zateká vám strecha? Čo urobiť hneď, ako podľa počasia odhadnúť príčinu, kedy stačí oprava a kedy je čas na výmenu. Zatekanie okolo komína aj kondenzácia.",
  pill: "Radca · Opravy",
  nadpis: { pred: "Zatekanie strechy: ", zvyraznene: "príčiny", za: " a oprava" },
  perex:
    "Miesto, kde kvapká do domu, je málokedy miesto, kadiaľ voda do strechy vniká. Kedy zateká, napovie viac než kde — a podľa toho sa dá odhadnúť, čo strecha potrebuje.",
  publikovane: "2026-10-24",
  upravene: "2026-10-24",
  foto: {
    src: procesFoto.povodneKominy,
    alt: "Komíny na streche staršieho domu — okolie komína je najčastejšie miesto zatekania, Orava",
  },

  kapitoly: [
    {
      id: "co-urobit-hned",
      nazov: "Čo urobiť hneď",
      tvrdenie:
        "Prvá pomoc patrí interiéru, nie streche. Na mokrú strechu nelezte.",
      odseky: [
        "Mokrá krytina je klzká a pri snehu či námraze je výstup na strechu bez istenia nebezpečný. Väčšinu toho, čo pomôže pri hľadaní príčiny, urobíte zdola.",
      ],
      bloky: [
        {
          typ: "vrstvy",
          lead: "V tomto poradí.",
          polozky: [
            {
              nazov: "Zachyťte vodu",
              text: "Nádoba, handry, odsunutie nábytku. Ak voda tečie okolo svietidla alebo zásuvky, vypnite príslušný istič.",
            },
            {
              nazov: "Odfoťte a zapíšte",
              text: "Škvrnu na strope, mokré miesto v podkroví a hlavne kedy zateká: pri každom daždi, len pri vetre, pri topení snehu, v mraze.",
            },
            {
              nazov: "Pozrite do podkrovia",
              text: "Ak je prístupné, s baterkou. Stopy po vode na krokvách a fólii často ukážu smer, odkiaľ voda prichádza.",
            },
            {
              nazov: "Ozvite sa",
              text: "Pošlite fotky aj to, kedy zateká. Na prvé posúdenie často stačia.",
            },
          ],
        },
      ],
    },

    {
      id: "kedy-zateka",
      nazov: "Kedy zateká",
      tvrdenie:
        "Počasie, pri ktorom zateká, je najlepšia stopa k príčine.",
      odseky: [
        "Voda, ktorá sa dostane pod krytinu, steká po fólii a krokvách a objaví sa tam, kde sa zachytí — niekedy aj niekoľko metrov od miesta, kadiaľ vniká. Preto sa príčina hľadá na streche, nie pod škvrnou.",
      ],
      bloky: [
        {
          typ: "karty",
          polozky: [
            {
              nazov: "Pri každom daždi",
              text: "Poškodená alebo posunutá krytina, prederavený plech, netesný prestup strechou alebo napojenie strešného okna.",
            },
            {
              nazov: "Len pri vetre",
              text: "Hnaný dážď pod presahy krytiny, pod závetrné lišty, hrebeň alebo napojenie na stenu. Typické pri nízkom sklone skladanej krytiny.",
            },
            {
              nazov: "Pri topení snehu",
              text: "Ľad na okraji strechy a v žľabe zadrží topiacu sa vodu, ktorá potom vzlína pod krytinu. Problém býva aj v úžľabí.",
            },
            {
              nazov: "V mraze bez dažďa",
              text: "Pravdepodobne kondenzácia — vodná para z interiéru sa zráža na studenej spodnej strane krytiny alebo fólie a kvapká ako dážď.",
            },
            {
              nazov: "Okolo komína",
              text: "Najčastejšie miesto. Popraskaný tmel, poškodené spodné alebo vrchné oplechovanie, voda hromadiaca sa za širokým komínom.",
            },
          ],
        },
      ],
    },

    {
      id: "oprava-alebo-vymena",
      nazov: "Oprava alebo výmena",
      tvrdenie:
        "Lokálna oprava má zmysel, kým je krytina v poriadku a problém je v detaile.",
      odseky: [
        "Väčšina zatekaní vzniká v detailoch — pri komíne, v úžľabí, pri prestupoch a strešných oknách. Tie sa dajú opraviť bez výmeny celej strechy. Keď je však krytina sama na konci životnosti, opravy už len odkladajú výmenu a každá ďalšia stojí peniaze, ktoré by išli do novej strechy.",
        "Po dlhšom zatekaní nestačí opraviť len miesto, kadiaľ voda vniká. Treba skontrolovať aj krov a izoláciu pod ním — mokrá minerálna izolácia stráca izolačné vlastnosti a drevo, ktoré je dlhodobo vlhké, začne hniť.",
      ],
      bloky: [
        {
          typ: "porovnanie",
          stlpce: ["Stačí oprava", "Je čas na výmenu"],
          riadky: [
            {
              parameter: "Kde zateká",
              a: "na jednom mieste, v detaile",
              b: "na viacerých miestach naraz",
            },
            {
              parameter: "Stav krytiny",
              a: "v ploche je v poriadku",
              b: "popraskaná, zvetraná, prehrdzavená",
            },
            {
              parameter: "Pod krytinou",
              a: "poistná hydroizolácia je",
              b: "chýba alebo je poškodená",
            },
            {
              parameter: "Krov",
              a: "suchý a zdravý",
              b: "vlhký alebo poškodený na viacerých miestach",
            },
          ],
          poznamka:
            "Ide o orientačné znaky, nie o pravidlo. Rozhodnutie vychádza z obhliadky — niekedy aj jedno miesto zatekania odhalí problém v celej skladbe strechy.",
        },
      ],
    },
  ],

  faq: [
    {
      otazka: "Prečo zateká, keď strecha zvonku vyzerá v poriadku?",
      odpoved:
        "Voda pod krytinou steká po konštrukcii a objaví sa ďaleko od miesta, kadiaľ vniká. Problém býva v detailoch, ktoré zo zeme nevidno — v oplechovaní komína, úžľabí alebo pri prestupoch. Ak kvapká najmä v mraze, môže ísť o kondenzáciu.",
    },
    {
      otazka: "Zateká okolo komína. Čo s tým?",
      odpoved:
        "Najčastejšie je príčinou popraskaný tmel alebo poškodené spodné či vrchné oplechovanie komína. Riešením je správne oplechovanie, nie ďalšia vrstva tmelu. Vrchné oplechovanie sa dá vymeniť samostatne, pri spodnom treba okolo komína dočasne odobrať časť krytiny.",
    },
    {
      otazka: "Ako rozoznám kondenzáciu od zatekania?",
      odpoved:
        "Kondenzácia sa prejavuje v chladnom počasí aj bez dažďa, často na viacerých miestach naraz a kvapky sú na spodnej strane krytiny alebo fólie. Zatekanie súvisí s dažďom, vetrom alebo topením snehu. Kondenzáciu klampiarska oprava nevyrieši — treba upraviť skladbu strechy a vetranie.",
    },
    {
      otazka: "Dá sa zatekanie opraviť aj v zime?",
      odpoved:
        "Dočasne zabrániť ďalším škodám sa dá často, trvalá oprava však závisí od počasia a bezpečnosti práce na streche. Sneh a poľadovica prácu obmedzujú. Termín dohodneme podľa toho, čo strecha potrebuje a čo počasie dovolí.",
    },
    {
      otazka: "Stačí opraviť miesto, kadiaľ zatekalo?",
      odpoved:
        "Po dlhšom zatekaní nie. Treba skontrolovať aj krov a izoláciu — mokrá izolácia stráca izolačné vlastnosti a dlhodobo vlhké drevo hnije.",
    },
  ],
  sluzby: ["klampiarske-prace", "vymena-strechy", "tesarske-prace"],
};
