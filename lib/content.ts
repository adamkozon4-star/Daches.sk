/**
 * Všetok textový obsah webu na jednom mieste.
 *
 * Zmena copy = zmena tu, nie v komponentoch. Údaje, ktoré nie sú overené
 * s klientom (počet realizácií, roky praxe, hodnotenia), sa tu nesmú objaviť.
 */
import { photos, procesFoto } from "@/lib/images";

/* ---------- Firemné údaje ---------- */
export const company = {
  name: "Daches s.r.o.",
  shortName: "DACHES",
  phone: "0907 481 919",
  phoneHref: "tel:+421907481919",
  email: "dachessro@gmail.com",
  street: "1041/16",
  city: "Hruštín",
  postalCode: "029 52",
  region: "Žilinský kraj",
  country: "SK",
  lat: 49.3656,
  lng: 19.3667,
  url: "https://daches.sk",
  opening: "Pondelok – piatok, 7:00 – 17:00",
} as const;

/** Obce, kde firma reálne realizuje — menovité obce sú silnejší lokálny signál než súradnice. */
export const areaServed = [
  "Hruštín",
  "Námestovo",
  "Dolný Kubín",
  "Tvrdošín",
  "Trstená",
  "Zákamenné",
] as const;

/* ---------- Navigácia ---------- */
/**
 * „Domov" tu zámerne nie je — logo v hlavičke robí to isté a na
 * jednostránkovom webe by položka len zaberala miesto.
 */
export const navLinks = [
  { label: "Služby", href: "#sluzby" },
  { label: "Realizácie", href: "#realizacie" },
  { label: "Priebeh realizácie", href: "#priebeh" },
  { label: "Prečo Daches", href: "#preco-daches" },
  { label: "Materiály", href: "#materialy" },
  { label: "Kontakt", href: "#kontakt" },
] as const;

/* ---------- Hero ---------- */
export const hero = {
  pill: "Hruštín · Orava",
  headlineBefore: "Krovy a strechy na ",
  headlineMark: "Orave",
  headlineAfter: ", ktoré vydržia desaťročia",
  lead: "Daches s.r.o. je strechárska a tesárska firma z Hruštína. Staviame krovy, kompletné strechy na kľúč a rekonštrukcie striech na celej Orave — od konštrukcie po poslednú škridlu.",
  ctaPrimary: "Vypočítať cenu strechy",
  ctaSecondary: "Pozrieť realizácie",
  trust: ["Nezáväzne", "Osobná obhliadka", "Riešenie na mieru stavby"],
  scrollHint: "Preskúmajte naše služby",
} as const;

/* ---------- Trust bar ---------- */
export const trustItems = [
  {
    icon: "roof",
    title: "Krov aj krytina",
    text: "Konštrukciu aj strechu rieši jeden tím. Zodpovednosť sa nemá na koho presúvať.",
  },
  {
    icon: "eye",
    title: "Osobná obhliadka",
    text: "Cenu určujeme až po tom, čo si stavbu pozrieme na mieste.",
  },
  {
    icon: "layers",
    title: "Materiál podľa stavby",
    text: "Krytinu a konštrukciu volíme podľa sklonu strechy, lokality a rozpočtu.",
  },
  {
    icon: "pin",
    title: "Domáci z Oravy",
    text: "Sme z Hruštína. Po realizácii sa k vám vieme kedykoľvek vrátiť.",
  },
] as const;

/* ---------- Služby ---------- */
export const services = [
  {
    number: "01",
    title: "Výstavba krovov",
    description:
      "Výroba a montáž drevených krovov podľa projektu a konkrétnych požiadaviek stavby.",
    photo: photos.vystavbaKrovov,
    alt: "Výstavba dreveného krovu rodinného domu, Orava — Daches s.r.o.",
  },
  {
    number: "02",
    title: "Nové strechy",
    description:
      "Kompletná realizácia strechy pre novostavby vrátane prípravy a montáže jednotlivých prvkov.",
    photo: photos.osadenieKrovu,
    alt: "Osadenie krovu novostavby technikou Daches, Orava",
  },
  {
    number: "03",
    title: "Rekonštrukcie striech",
    description:
      "Obnova starších strešných konštrukcií a riešenie poškodených alebo nevyhovujúcich častí.",
    photo: photos.rekonstrukciaStrechy,
    alt: "Rekonštrukcia strešnej konštrukcie staršieho domu, Orava",
  },
  {
    number: "04",
    title: "Tesárske práce",
    description:
      "Precízne tesárske práce pri novostavbách, rekonštrukciách a ďalších stavebných projektoch.",
    photo: photos.konstrukciaKrovu,
    alt: "Tesárske spracovanie konštrukcie krovu zvnútra, Orava",
  },
  {
    number: "05",
    title: "Strešné krytiny",
    description:
      "Montáž strešných krytín podľa typu projektu a požiadaviek zákazníka.",
    photo: photos.stresneKrytiny,
    alt: "Montáž strešnej krytiny na rodinnom dome, Orava",
  },
  {
    number: "06",
    title: "Klampiarske práce a opravy",
    description:
      "Odkvapové systémy, oplechovanie a lokálne opravy poškodených častí strechy.",
    photo: photos.detailOdkvapu,
    alt: "Detail odkvapového systému a oplechovania strechy, Orava",
  },
] as const;

/* ---------- Realizácie ---------- */
export const galleryFilters = [
  "Všetko",
  "Krovy",
  "Strechy",
  "Rekonštrukcie",
  "Detaily",
] as const;

export type GalleryFilter = (typeof galleryFilters)[number];

export const gallery = [
  {
    id: "osadenie-krovu",
    photo: photos.osadenieKrovu,
    alt: "Osadenie dreveného krovu žeriavom na novostavbe, Orava — Daches s.r.o.",
    caption: "Osadenie krovu technikou Daches",
    wide: true,
    categories: ["Krovy"],
  },
  {
    id: "konstrukcia-krovu",
    photo: photos.konstrukciaKrovu,
    alt: "Pohľad na konštrukciu dreveného krovu zvnútra podkrovia, Orava",
    caption: "Konštrukcia krovu zvnútra",
    wide: false,
    categories: ["Krovy"],
  },
  {
    id: "sindlova-krytina",
    photo: photos.sindlovaKrytina,
    alt: "Šindľová strešná krytina so strešnými oknami na rodinnom dome, Orava",
    caption: "Šindľová krytina so strešnými oknami",
    wide: true,
    categories: ["Strechy", "Detaily"],
  },
  {
    id: "dom-drevena-fasada",
    photo: photos.domDrevenaFasada,
    alt: "Rodinný dom s drevenou fasádou a tmavou strechou, Orava",
    caption: "Dom s drevenou fasádou a tmavou strechou",
    wide: false,
    categories: ["Strechy"],
  },
  {
    id: "pultovy-krov",
    photo: photos.pultovyKrov,
    alt: "Pultový krov stavby v horskom prostredí Oravy",
    caption: "Pultový krov v horskom prostredí",
    wide: true,
    categories: ["Krovy"],
  },
  {
    id: "detail-odkvapu",
    photo: photos.detailOdkvapu,
    alt: "Detail odkvapu a oplechovania strešnej hrany, Orava",
    caption: "Detail odkvapu a oplechovania",
    wide: false,
    categories: ["Detaily"],
  },
  {
    id: "montaz-okna-zima",
    photo: photos.montazOknaZima,
    alt: "Montáž strešného okna počas zimného obdobia, Orava",
    caption: "Montáž strešného okna v zime",
    wide: false,
    categories: ["Rekonštrukcie", "Detaily"],
  },
  {
    id: "rekonstrukcia-strechy",
    photo: photos.rekonstrukciaStrechy,
    alt: "Rekonštrukcia strešnej konštrukcie staršieho rodinného domu, Orava",
    caption: "Rekonštrukcia staršej strechy",
    wide: false,
    categories: ["Rekonštrukcie"],
  },
  {
    id: "vystavba-krovov",
    photo: photos.vystavbaKrovov,
    alt: "Rozostavaný drevený krov rodinného domu, Orava",
    caption: "Výstavba krovu na rodinnom dome",
    wide: false,
    categories: ["Krovy"],
  },
  {
    id: "stresne-krytiny",
    photo: photos.stresneKrytiny,
    alt: "Položená strešná krytina na dokončovanej streche, Orava",
    caption: "Položená strešná krytina",
    wide: true,
    categories: ["Strechy"],
  },
] as const;

/* ---------- Priebeh realizácie (reálna zákazka) ----------
 *
 * ⚠️ Popisy vychádzajú z toho, čo je na fotkách reálne vidieť. Nič sa tu
 * nedomýšľa — žiadne značky materiálov, plochy, ceny ani termíny. Pred
 * spustením nech to prejde klient a doplní, čo vie upresniť.
 */
export const roofProcess = {
  eyebrow: "Priebeh realizácie",
  titleBefore: "Od starej krytiny po ",
  titleMark: "hotovú strechu",
  lead: "Výmena strešnej krytiny na rodinnom dome krok po kroku. Rovnaká strecha, rovnaký uhol — od prvého dňa po odovzdanie.",
  before: {
    photo: procesFoto.povodnaKrytina,
    label: "Predtým",
    alt: "Pôvodná falcovaná plechová krytina s náterom pred výmenou, Orava — Daches s.r.o.",
  },
  after: {
    photo: procesFoto.hotovaStrecha,
    label: "Po realizácii",
    alt: "Hotová falcovaná plechová strecha v antracitovej farbe po výmene krytiny, Orava — Daches s.r.o.",
  },
  steps: [
    {
      number: "01",
      title: "Východiskový stav",
      text: "Pôvodná plechová krytina držaná pri živote nátermi. Rozhodujúce sú vždy detaily — napojenia na komíny a spoje pásov boli na konci životnosti.",
      photos: [
        {
          photo: procesFoto.povodneKominy,
          alt: "Pôvodné komíny s poškodeným oplechovaním pred rekonštrukciou strechy",
        },
      ],
    },
    {
      number: "02",
      title: "Odkrytie konštrukcie",
      text: "Po demontáži starej krytiny sa ukáže skutočný stav latovania a pôvodnej izolácie. Až v tomto bode sa dá povedať, čo presne treba vymeniť — nie od stola pred začiatkom prác.",
      photos: [
        {
          photo: procesFoto.odkrytaKonstrukcia,
          alt: "Odkryté latovanie a pôvodná minerálna izolácia po demontáži starej krytiny",
        },
      ],
    },
    {
      number: "03",
      title: "Doprava materiálu na strechu",
      text: "Rezivo aj krytina idú hore výťahom po rebríku. Materiál sa nenosí cez dom a stavba nezaberá ulicu dlhšie, než musí.",
      photos: [
        {
          photo: procesFoto.dopravaMaterialu,
          alt: "Rebríkový výťah na dopravu reziva a krytiny na strechu",
        },
      ],
    },
    {
      number: "04",
      title: "Nové debnenie",
      text: "Celá plocha dostala nové debnenie. Pri tejto príležitosti prišla na rad aj obnova komína — pod novú krytinu sa poškodený komín nedáva, lebo neskôr sa k nemu už nikto nedostane.",
      photos: [
        {
          photo: procesFoto.noveDebnenie,
          alt: "Nové drevené debnenie strechy pripravené pred pokládkou krytiny",
        },
        {
          photo: procesFoto.debnenieKomin,
          alt: "Obnovený komín osadený v novom debnení strechy",
        },
      ],
    },
    {
      number: "05",
      title: "Poistná hydroizolácia a krytina",
      text: "Na debnenie ide poistná hydroizolácia a na ňu falcované pásy. Krytina sa kotví príponkami — plech nie je prestrelený, takže nemá kade zatekať a môže voľne pracovať pri zmenách teploty.",
      photos: [
        {
          photo: procesFoto.hydroizolaciaKrytina,
          alt: "Montáž falcovaných pásov krytiny na poistnú hydroizoláciu",
        },
      ],
    },
    {
      number: "06",
      title: "Oplechovanie a detaily",
      text: "Komíny, hrebeň a nábehy na susedné konštrukcie. Toto je miesto, kde strecha buď vydrží desaťročia, alebo o dva roky začne zatekať — a preto na ňom trávime najviac času.",
      photos: [
        {
          photo: procesFoto.oplechovanieKomina,
          alt: "Ručné oplechovanie komína pri montáži falcovanej krytiny",
        },
        {
          photo: procesFoto.dokoncovanieHrebena,
          alt: "Dokončovanie hrebeňa a oplechovania na takmer hotovej streche",
        },
      ],
    },
    {
      number: "07",
      title: "Hotová strecha",
      text: "Falcovaná krytina v tmavej antracitovej. Rovné pásy, čisté napojenia na komíny, žiadne viditeľné kotvenie.",
      photos: [
        {
          photo: procesFoto.hotovaStrechaDetail,
          alt: "Dokončená falcovaná plechová strecha rodinného domu, pohľad od hrebeňa",
        },
      ],
    },
  ],
  cta: "Chcem takúto strechu",
} as const;

/* ---------- Prečo Daches ---------- */
export const whyUs = {
  eyebrow: "Prečo Daches",
  titleBefore: "Strecha nie je miesto na ",
  titleMark: "kompromisy",
  lead: "Pri streche rozhoduje kvalita práce, správne materiály a precízne prevedenie každého detailu.",
  points: [
    "Precízne remeselné spracovanie",
    "Individuálny prístup ku každej stavbe",
    "Kvalitné a overené materiály",
    "Dôraz na detail a čisté prevedenie",
    "Spoľahlivá komunikácia počas realizácie",
    "Riešenie navrhnuté podľa konkrétnej stavby",
  ],
} as const;

/* ---------- Proces ---------- */
export const process = {
  eyebrow: "Ako to prebieha",
  titleBefore: "Od prvého kontaktu po ",
  titleMark: "hotovú strechu",
  steps: [
    {
      number: "01",
      title: "Kontakt",
      text: "Ozvete sa nám s vašou predstavou alebo vyplníte kalkuláciu.",
    },
    {
      number: "02",
      title: "Obhliadka",
      text: "Prejdeme si stavbu a požiadavky projektu priamo na mieste.",
    },
    {
      number: "03",
      title: "Návrh riešenia",
      text: "Navrhneme vhodný postup, materiál a rozsah prác.",
    },
    {
      number: "04",
      title: "Realizácia",
      text: "Postaráme sa o samotné prevedenie od krovu po krytinu.",
    },
    {
      number: "05",
      title: "Odovzdanie",
      text: "Dokončenú prácu odovzdáme pripravenú na ďalšie využitie.",
    },
  ],
} as const;

/* ---------- Materiály ---------- */
export const materials = {
  eyebrow: "Materiály",
  titleBefore: "Na ",
  titleMark: "detailoch",
  titleAfter: " záleží",
  lead: "Používame materiály a riešenia vhodné pre konkrétny typ stavby s dôrazom na spoľahlivosť a dlhú životnosť.",
  items: [
    { icon: "timber", title: "Kvalitné rezivo" },
    { icon: "roof", title: "Strešné krytiny" },
    { icon: "water", title: "Poistné hydroizolácie" },
    { icon: "screw", title: "Spojovací materiál" },
    { icon: "frame", title: "Drevené konštrukcie" },
    { icon: "gutter", title: "Klampiarske prvky" },
  ],
} as const;

/* ---------- Referencie ---------- */
export const reviews = {
  eyebrow: "Referencie",
  titleBefore: "Dôvera sa buduje ",
  titleMark: "prácou",
  lead: "Hodnotenia od zákazníkov, pre ktorých sme realizovali strechu alebo krov.",
  googleUrl: "https://www.google.com/search?q=daches+s.r.o.+hrustin",
  /**
   * ⚠️ Sem patria výhradne reálne Google recenzie.
   * Kým ich klient nedodá, pole zostáva prázdne a zobrazí sa čestný stav.
   * Vymyslené recenzie sú porušenie pravidiel Google a zákazník si ich overí za 10 sekúnd.
   */
  items: [] as { author: string; rating: number; text: string }[],
} as const;

/* ---------- Kontakt ---------- */
export const contact = {
  eyebrow: "Lokalita",
  titleBefore: "Staviame na ",
  titleMark: "Orave",
  titleAfter: " a v okolí",
  text: "Naše sídlo je v Hruštíne, no realizujeme projekty v celom regióne Oravy — od Námestova cez Dolný Kubín až po Tvrdošín.",
} as const;

/* ---------- Kalkulácia (sekcia zostáva, wizard rieši samostatná etapa) ---------- */
export const calculator = {
  eyebrow: "Kalkulácia",
  titleBefore: "Zistite orientačnú cenu vašej ",
  titleMark: "strechy",
  lead: "Odpovedzte na pár otázok o vašom projekte. Za necelú minútu získate orientačný rozsah ceny a my sa vám ozveme s presným návrhom.",
  note: "Bez registrácie · Nezáväzne · Trvá cca 60 sekúnd",
  steps: [
    {
      number: "1",
      title: "Vyplníte kalkuláciu",
      text: "Zadáte základné údaje o streche a projekte.",
    },
    {
      number: "2",
      title: "Ozveme sa vám",
      text: "Prejdeme si zadanie a doladíme detaily.",
    },
    {
      number: "3",
      title: "Obhliadka na mieste",
      text: "Prídeme sa pozrieť na stavbu a zameriame ju.",
    },
    {
      number: "4",
      title: "Presná cenová ponuka",
      text: "Dostanete konkrétnu ponuku a dohodneme termín.",
    },
  ],
} as const;

/* ---------- Záverečné CTA ---------- */
export const finalCta = {
  titleBefore: "Plánujete novú ",
  titleMark: "strechu",
  titleAfter: "?",
  text: "Poďme sa pozrieť na váš projekt.",
  note: "Nezáväzná konzultácia · Osobná obhliadka · Konečná cena až po presnom posúdení projektu",
} as const;

/* ---------- Footer ---------- */
export const footer = {
  tagline:
    "Poctivé tesárske práce, kvalitné krovy a strechy s dôrazom na detail.",
  legal: [
    { label: "Ochrana osobných údajov", href: "/ochrana-osobnych-udajov" },
    { label: "Cookies", href: "/cookies" },
  ],
  author: { label: "Adam Kozon · Peak Studio", href: "https://peakstudio.sk/" },
} as const;
