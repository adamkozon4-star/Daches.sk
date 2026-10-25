import { photos, procesFoto } from "@/lib/images";
import type { Sluzba } from "@/lib/sluzby/typy";

export const novaStrechaNaKluc: Sluzba = {
  slug: "nova-strecha-na-kluc",
  navLabel: "Nová strecha na kľúč",
  odkazText: "Viac o novej streche na kľúč",
  title: "Nová strecha na kľúč Orava — novostavby",
  description:
    "Nová strecha na kľúč pre novostavby na Orave — krov, podklad, fólia, krytina aj klampiarina. Čo patrí do ceny, kedy začať a čo cenu ovplyvní.",
  pill: "Novostavby · celá Orava",
  nadpis: { pred: "Nová strecha ", zvyraznene: "na kľúč", za: " pre novostavbu" },
  lead: "Krov, podklad, krytina aj klampiarina od jednej firmy. Pre rodinné domy na celej Orave.",
  fakty: ["Od krovu po odkvapy", "Jedna firma na celú strechu", "Bezplatná obhliadka"],
  foto: {
    src: photos.novostavbaZima,
    alt: "Novostavba rodinného domu s novou falcovanou strechou počas osadzovania strešného okna v zime — realizácia Daches s.r.o. na Orave",
    pozicia: "center 62%",
  },

  kapitoly: [
    {
      id: "na-kluc",
      nazov: "Čo znamená na kľúč",
      tvrdenie:
        "Na kľúč znamená, že strechu od pomúrnice po posledný zvod rieši jedna firma.",
      odseky: [
        "Strecha je zložená z vrstiev a každá nadväzuje na predchádzajúcu. Keď krov stavia jedna firma, krytinu druhá a odkvapy tretia, problémy nevznikajú v ploche, ale na rozhraniach: kto rieši napojenie fólie na okap, kto prispôsobí latovanie krytine, kto čaká na koho.",
        "Pri streche na kľúč tieto rozhrania odpadajú. Práce idú za sebou bez prestojov, materiál sa objednáva naraz a za výsledok zodpovedá jeden dodávateľ, s ktorým sa dohadujete o všetkom.",
      ],
      foto: {
        src: photos.osadenieKrovu,
        alt: "Drevený krov novostavby — prvá vrstva novej strechy na kľúč, Orava",
      },
      bloky: [
        {
          typ: "zoznam",
          nadpis: "Čo nová strecha na kľúč zahŕňa",
          lead: "Konkrétny rozsah vychádza z projektu a z obhliadky stavby.",
          polozky: [
            "Posúdenie projektu a zameranie stavby",
            "Výroba a montáž krovu",
            "Plné debnenie alebo kontralaty a latovanie",
            "Paropriepustná fólia pod krytinu",
            "Krytina podľa projektu a sklonu strechy",
            "Oplechovanie komínov, úžľabí a prestupov",
            "Odkvapový systém",
            "Sneholamy a bezpečnostné prvky",
            "Podľa dohody nadkrokvová izolácia PIR",
          ],
        },
      ],
    },

    {
      id: "postup",
      nazov: "Postup",
      tvrdenie:
        "Strecha novostavby rastie odspodu nahor a každá vrstva je podkladom pre ďalšiu.",
      odseky: [
        "Poradie vrstiev nie je vecou zvyku. Chyba v jednej sa prenesie do všetkých nad ňou — krivo osadená pomúrnica sa ukáže na hrebeni, nerovné latovanie v krytine. Preto sa každá vrstva kontroluje skôr, než sa zakryje ďalšou.",
      ],
      foto: {
        src: procesFoto.hydroizolaciaKrytina,
        alt: "Poistná hydroizolácia a kladenie plechovej krytiny počas realizácie strechy, Orava",
      },
      bloky: [
        {
          typ: "vrstvy",
          lead: "Od projektu po hotovú strechu — v poradí, v akom práce reálne idú.",
          polozky: [
            {
              nazov: "Projekt a zameranie",
              text: "Overenie projektu a skutočných rozmerov stavby. Od nich sa odvíja výroba krovu aj objednávka materiálu.",
            },
            {
              nazov: "Krov",
              text: "Osadenie pomúrnic a montáž nosnej konštrukcie podľa projektu.",
            },
            {
              nazov: "Podklad",
              text: "Plné debnenie pod falcovanú krytinu alebo kontralaty a latovanie pod skladanú.",
            },
            {
              nazov: "Poistná hydroizolácia",
              text: "Paropriepustná fólia, ktorá zachytí vodu a sneh zafúkaný pod krytinu.",
            },
            {
              nazov: "Krytina",
              text: "Kladie sa od okapu k hrebeňu spolu s klampiarskymi prvkami v ploche.",
            },
            {
              nazov: "Klampiarina a odvodnenie",
              text: "Oplechovanie komínov, úžľabí a prestupov, okapové a závetrové lišty, žľaby a zvody.",
            },
            {
              nazov: "Doplnky",
              text: "Sneholamy, bezpečnostné háky a strešné okná podľa projektu.",
            },
          ],
        },
      ],
    },

    {
      id: "kedy-zacat",
      nazov: "Kedy začať",
      tvrdenie:
        "Na strechu netreba myslieť až vtedy, keď je hrubá stavba hotová. Krov sa pripravuje vopred.",
      odseky: [
        "Najlepší čas ozvať sa je počas murovania. Krov a materiál sa dajú pripraviť tak, aby montáž nadviazala hneď na dokončenie venca a stavba nestála otvorená dlhšie, než musí.",
        "Niektoré veci sa navyše riešia už v hrubej stavbe: kotvenie pomúrnic do venca, poloha komína a prestupov strechou, prístup pre techniku. Čo sa vyrieši včas, netreba neskôr dorábať.",
      ],
      foto: {
        src: photos.krovNovostavba,
        alt: "Krov na murovanej novostavbe tesne po dokončení hrubej stavby, Orava",
      },
      bloky: [
        {
          typ: "karty",
          polozky: [
            {
              nazov: "Projekt stavby",
              text: "Z neho vychádza typ krovu, rozmery prvkov, sklon aj krytina. Bez projektu je cena len odhad.",
            },
            {
              nazov: "Hotový veniec",
              text: "Pomúrnice sa kotvia do venca. Montáž krovu môže začať, keď je veniec hotový a vyzretý.",
            },
            {
              nazov: "Komín a prestupy",
              text: "Komín, odvetranie kanalizácie či vývody vzduchotechniky je lepšie poznať skôr, než sa položí krytina.",
            },
            {
              nazov: "Prístup k stavbe",
              text: "Miesto na zloženie materiálu a príjazd techniky skracujú montáž a znižujú podiel ručnej práce.",
            },
          ],
        },
      ],
    },

    {
      id: "cena",
      nazov: "Čo ovplyvní cenu",
      tvrdenie:
        "Dve strechy s rovnakou plochou môžu stáť výrazne inak. Rozhoduje tvar, krytina a skladba.",
      odseky: [
        "Plocha je len začiatok. Členitá strecha s valbami a úžľabiami znamená viac rezov, viac odpadu a viac klampiarskych prvkov než jednoduchá sedlová. Rovnako ovplyvní cenu to, čo je pod krytinou — plné debnenie, kontralaty, prípadne nadkrokvová izolácia.",
        "V kalkulátore zvolíte „Nová strecha na kľúč“, zadáte tvar, plochu, sklon a krytinu a dostanete orientačný rozsah s rozpisom na materiál a prácu. Záväzná cena vzniká nad projektom a po obhliadke.",
      ],
      bloky: [
        {
          typ: "karty",
          polozky: [
            {
              nazov: "Tvar a členitosť",
              text: "Valby, úžľabia a vikiere pridávajú prácu na krove, rezy krytiny aj klampiarske prvky.",
            },
            {
              nazov: "Krytina",
              text: "Plech, škridla či šindeľ sa líšia cenou aj hmotnosťou — a ťažšia krytina potrebuje masívnejší krov.",
            },
            {
              nazov: "Skladba strechy",
              text: "Plné debnenie, kontralaty a prípadná nadkrokvová izolácia sú samostatné položky.",
            },
            {
              nazov: "Sklon",
              text: "Pri rovnakom pôdoryse má strmšia strecha väčšiu plochu a montáž na nej je náročnejšia.",
            },
          ],
        },
      ],
    },
  ],

  faq: [
    {
      otazka: "Koľko stojí nová strecha za m²?",
      odpoved:
        "Závisí od tvaru a sklonu strechy, zvolenej krytiny a skladby vrstiev pod ňou. V kalkulátore zvolíte „Nová strecha na kľúč“ a dostanete orientačný rozsah s rozpisom na materiál a prácu. Záväznú cenu povieme nad projektom a po bezplatnej obhliadke.",
    },
    {
      otazka: "Je v cene strechy na kľúč aj krov?",
      odpoved:
        "Áno. Strecha na kľúč znamená celú strechu od krovu cez podklad, fóliu a krytinu po klampiarinu a odkvapy. Ak máte krov od inej firmy, nadviažeme na neho — potom ide o montáž krytiny, nie o strechu na kľúč.",
    },
    {
      otazka: "Kedy sa treba ozvať?",
      odpoved:
        "Ideálne počas murovania. Krov sa pripravuje vopred a pred jeho výrobou treba zamerať skutočný stav stavby. Montáž potom nadviaže hneď na dokončenie venca.",
    },
    {
      otazka: "Akú krytinu zvoliť na novostavbu?",
      odpoved:
        "Pri novostavbe je voľba otvorenejšia než pri rekonštrukcii, pretože krov sa navrhuje priamo na zvolenú krytinu. Rozhoduje sklon strechy, vzhľad a rozpočet. Plech je ľahký a zvláda aj nízke sklony, škridla potrebuje výraznejší spád a masívnejší krov. Porovnanie nájdete na stránke o plechovej streche.",
    },
    {
      otazka: "Ako dlho trvá stavba strechy?",
      odpoved:
        "Pri bežnom rodinnom dome sa čas počíta skôr na týždne než na mesiace. Veľa závisí od veľkosti a členitosti strechy, od počasia a od toho, či je materiál pripravený vopred. Konkrétny harmonogram dohodneme po obhliadke.",
    },
    {
      otazka: "Robíte aj zateplenie strechy?",
      odpoved:
        "Nadkrokvovú izoláciu z PIR dosiek vieme zahrnúť do skladby strechy — kladie sa nad krokvy, ešte pred krytinou. Či dáva zmysel pre váš dom, závisí od projektu a od toho, ako má byť podkrovie využité.",
    },
  ],
  suvisiace: ["vystavba-krovov", "plechova-strecha"],
};
