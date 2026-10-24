import { photos } from "@/lib/images";
import type { Clanok } from "@/lib/radca/typy";

/**
 * ⚠️ Článok s dátumom v titulku — každý rok ho treba prejsť.
 *
 * Fakty sú overené na obnovdom.sk (SAŽP) v októbri 2026. Zámerne tu nie
 * sú sumy, príjmové limity ani termíny kôl: menia sa medzi výzvami a na
 * komerčných weboch dodnes visia čísla zo starších výziev. Nesprávny údaj
 * je horší než odkaz na zdroj. Pri aktualizácii zmeň aj `upravene`.
 */
export const dotaciaNaStrechu: Clanok = {
  slug: "dotacia-na-strechu",
  navLabel: "Dotácia na strechu",
  odkazText: "Kedy sa dá na strechu získať dotácia",
  title: "Dotácia na strechu v roku 2026",
  description:
    "Dá sa na výmenu strechy získať dotácia? Program Obnov dom mini+ — pre koho je, prečo krytinu hradí len spolu so zateplením a kde si overiť aktuálne podmienky.",
  pill: "Radca · Dotácie",
  nadpis: { pred: "Dotácia na ", zvyraznene: "strechu", za: " v roku 2026" },
  perex:
    "Dotácia na samotnú výmenu strechy neexistuje. Strechu však môže pokryť program na obnovu rodinných domov — ak domácnosť spĺňa jeho podmienky a krytina sa mení spolu so zateplením.",
  publikovane: "2026-10-24",
  upravene: "2026-10-24",
  foto: {
    src: photos.starsiDomOkno,
    alt: "Starší rodinný dom s tmavou strechou a strešným oknom — typický dom na obnovu, Orava",
  },

  kapitoly: [
    {
      id: "co-je-dostupne",
      nazov: "Čo je dostupné",
      tvrdenie:
        "Pre rodinné domy je v roku 2026 otvorený program Obnov dom mini+. Nie je pre všetkých — je pre domácnosti s nižšími príjmami.",
      odseky: [
        "Program spravuje Slovenská agentúra životného prostredia (SAŽP) a je financovaný z Modernizačného fondu. Je určený domácnostiam ohrozeným energetickou chudobou, teda tým, pre ktoré sú účty za energie najväčšou záťažou.",
        "Staršie výzvy programu Obnov dom, financované z Plánu obnovy, už nové žiadosti neprijímajú. Mnohé weby však dodnes uvádzajú ich sumy a podmienky — pri čítaní preto vždy pozerajte, ktorej výzvy sa údaj týka.",
      ],
      bloky: [
        {
          typ: "karty",
          polozky: [
            {
              nazov: "Kto môže žiadať",
              text: "Domácnosti s nižšími príjmami. Príjem nemusia preukazovať domácnosti tvorené len poberateľmi starobného dôchodku, domácnosti v hmotnej núdzi a domácnosti so štyrmi a viac neplnoletými deťmi — ten si overí SAŽP sama.",
            },
            {
              nazov: "Aký dom",
              text: "Starší rodinný dom postavený pred rokom 2016.",
            },
            {
              nazov: "Strecha",
              text: "Výmenu strešnej krytiny program hradí, ale len vtedy, keď je spojená so zateplením strechy.",
            },
            {
              nazov: "Bez certifikátu",
              text: "Energetický certifikát žiadatelia pri tejto výzve predkladať nemusia.",
            },
          ],
        },
      ],
    },

    {
      id: "strecha-a-zateplenie",
      nazov: "Krytina a zateplenie",
      tvrdenie:
        "Dotácia neplatí za novú krytinu. Platí za úsporu energie — krytina ide len v balíku so zateplením.",
      odseky: [
        "Zmysel programu je znížiť spotrebu energie na vykurovanie. Nová krytina sama o sebe dom nezatepľuje, preto ju program hradí len ako súčasť zateplenia strechy.",
        "V praxi to dáva zmysel aj technicky. Keď je strecha odkrytá, je to najlepšia chvíľa na izoláciu — napríklad nadkrokvovú, ktorá sa kladie nad krokvy ešte pred krytinou. Robiť to neskôr znamená otvárať tú istú strechu druhýkrát.",
      ],
      bloky: [
        {
          typ: "vrstvy",
          lead: "Ako postupovať, ak o dotácii uvažujete.",
          polozky: [
            {
              nazov: "Overte si nárok",
              text: "Aktuálne podmienky, príjmový limit, výšku príspevku a stav kôl zverejňuje SAŽP na obnovdom.sk. K dispozícii je aj infolinka 0850 221 715.",
            },
            {
              nazov: "Ujasnite si rozsah",
              text: "Výmena krytiny so zateplením, nie samotná krytina. Povedzte nám o dotácii pri obhliadke — rozsah prác aj ponuku pripravíme tak, aby zodpovedali podmienkam.",
            },
            {
              nazov: "Žiadosť podáva vlastník",
              text: "Žiadateľom je domácnosť, nie firma. Dodávateľ dodáva podklady o rozsahu a cene prác.",
            },
            {
              nazov: "Realizácia v lehote",
              text: "Obnovu treba dokončiť v lehote, ktorú určí zmluva. Termín prác je preto dobré dohodnúť ešte pred podpisom.",
            },
          ],
        },
      ],
    },

    {
      id: "na-co-pozor",
      nazov: "Na čo si dať pozor",
      tvrdenie:
        "Najčastejšia chyba je spoliehať sa na údaj z článku, ktorý píše o inej výzve.",
      odseky: [
        "Podmienky, sumy aj termíny sa medzi výzvami menia. Preto ich sem zámerne nepíšeme — záväzné sú vždy tie na stránke programu v deň podania žiadosti.",
      ],
      bloky: [
        {
          typ: "karty",
          polozky: [
            {
              nazov: "Staré čísla na webe",
              text: "Sumy a limity zo starších výziev Obnov dom sa líšia od aktuálnych. Overujte priamo na obnovdom.sk.",
            },
            {
              nazov: "Poradie krokov",
              text: "Pred podpisom zmluvy s dodávateľom si overte, od kedy sú výdavky oprávnené, aby ste neprišli o príspevok na práce zaplatené priskoro.",
            },
            {
              nazov: "Kolá a kapacita",
              text: "Žiadosti sa prijímajú v kolách s obmedzeným počtom. Ak dotáciu plánujete, sledujte vyhlásenie ďalšieho kola.",
            },
          ],
        },
      ],
    },
  ],

  faq: [
    {
      otazka: "Existuje dotácia na výmenu strechy?",
      odpoved:
        "Samostatná dotácia na výmenu strechy nie je. Program Obnov dom mini+ však hradí výmenu strešnej krytiny, ak je spojená so zateplením strechy a domácnosť spĺňa podmienky programu.",
    },
    {
      otazka: "Kto má nárok na Obnov dom mini+?",
      odpoved:
        "Domácnosti s nižšími príjmami ohrozené energetickou chudobou, ktoré vlastnia starší rodinný dom postavený pred rokom 2016. Presný príjmový limit a ďalšie podmienky zverejňuje SAŽP na obnovdom.sk.",
    },
    {
      otazka: "Dá sa z dotácie zaplatiť len nová krytina?",
      odpoved:
        "Nie. Krytinu program hradí len spolu so zateplením strechy, pretože jeho cieľom je úspora energie.",
    },
    {
      otazka: "Koľko peňazí sa dá z programu získať?",
      odpoved:
        "Výšku príspevku aj zálohy určuje aktuálna výzva a medzi výzvami sa mení. Platný údaj nájdete na obnovdom.sk — čísla na iných weboch sa často týkajú starších výziev.",
    },
    {
      otazka: "Pomôžete s podkladmi k žiadosti?",
      odpoved:
        "Rozsah prác a cenovú ponuku vieme pripraviť tak, aby zodpovedali podmienkam výzvy. Žiadosť podáva vlastník domu, nie dodávateľ.",
    },
  ],
  sluzby: ["vymena-strechy", "plechova-strecha"],
  zdroje: [
    { nazov: "Obnov dom — oficiálna stránka programu (SAŽP)", url: "https://obnovdom.sk" },
  ],
};
