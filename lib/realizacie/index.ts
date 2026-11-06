import type { StaticImageData } from "next/image";
import { procesFoto } from "@/lib/images";
import { fotkyRealizacii } from "@/lib/realizacie/fotky";

/**
 * Realizácie s obcou — podstránky „Výmena strechy, Lomná" a pod.
 *
 * ── Odkiaľ sú ──────────────────────────────────────────────────────────
 * Z príspevkov na Facebooku Daches (stav 6. 11. 2026). Fotky sú stiahnuté
 * z príspevkov v plnom rozlíšení, ktoré Facebook drží (2048 px), a ich
 * poradie je poradie v príspevku.
 *
 * ── Čo sa smie písať ───────────────────────────────────────────────────
 * Iba to, čo stojí v príspevku (obec, typ práce, materiál) a čo je vidieť
 * na fotkách. Žiadne plochy, termíny, ceny ani „spokojný zákazník" — nič
 * z toho Facebook neuvádza. Rok realizácie sa zámerne neuvádza: dátum
 * príspevku nie je dátum stavby (viaceré zákazky boli zverejnené naraz
 * s mesačným oneskorením).
 *
 * Keď klient doplní k zákazke pár viet (v akom stave bola strecha, čo sa
 * menilo a prečo), patria do `odseky`. Stránky sú zatiaľ krátke a práve
 * vlastný text je to, čo ich odlíši od galérie.
 *
 * ── Pridanie realizácie ────────────────────────────────────────────────
 * 1. Fotky do `public/images/realizacie/<slug>/01.jpg, 02.jpg, …`
 * 2. `node scripts/realizacie-fotky.mjs` — pregeneruje `fotky.ts`.
 * 3. Záznam sem — `popisy` musí mať presne toľko položiek ako fotky,
 *    inak build spadne (kontrola nižšie).
 */

export type FotkaRealizacie = { src: StaticImageData; popis: string };

export type Realizacia = {
  slug: string;
  obec: string;
  okres: string;
  /** Čo sa robilo — štítok na karte a v hero. */
  typ: string;
  /** Názov stavby bez obce — „Výmena strechy bytového domu". */
  nazov: string;
  /** `<title>` bez sufixu „| Daches s.r.o." — do 44 znakov. */
  title: string;
  /** `<meta name="description">` — 70 až 160 znakov. */
  description: string;
  /** Úvodný odsek v hero. Len to, čo je v príspevku a na fotkách. */
  perex: string;
  /** Doplňujúci text od klienta. Prázdne, kým ho nedodá. */
  odseky: string[];
  /** Kroky prác, ktoré sú zachytené na fotkách. */
  postup: string[];
  /** Materiál, ak ho príspevok menuje. */
  material?: string;
  /** Slug služby, na ktorú realizácia odkazuje. */
  sluzba: string;
  /** Index hlavnej fotky (hero, karta). Musí byť na šírku. */
  hlavna: number;
  pozicia?: string;
  fotky: FotkaRealizacie[];
};

type Zaznam = Omit<Realizacia, "fotky" | "odseky"> & {
  odseky?: string[];
  popisy: string[];
  /** Fotky, ak nie sú v `public/images/realizacie/<slug>`. */
  zdroj?: StaticImageData[];
};

function zaznam({ popisy, zdroj, odseky = [], ...r }: Zaznam): Realizacia {
  const subory = zdroj ?? fotkyRealizacii[r.slug];

  // Nesúlad počtu = posunuté popisy pod nesprávnymi fotkami. Radšej build
  // spadne, než aby pod fotkou krovu stálo „hotová krytina".
  if (!subory || subory.length !== popisy.length) {
    throw new Error(
      `Realizácia ${r.slug}: ${subory?.length ?? 0} fotiek, ${popisy.length} popisov`,
    );
  }

  const hlavna = subory[r.hlavna];
  if (hlavna.height > hlavna.width) {
    throw new Error(`Realizácia ${r.slug}: hlavná fotka je na výšku`);
  }

  return {
    ...r,
    odseky,
    fotky: subory.map((src, i) => ({ src, popis: popisy[i] })),
  };
}

export const realizacie: Realizacia[] = [
  zaznam({
    slug: "vymena-strechy-trstena",
    obec: "Trstená",
    okres: "Tvrdošín",
    typ: "Výmena strechy",
    nazov: "Výmena strechy bytového domu",
    title: "Výmena strechy bytového domu, Trstená",
    description:
      "Výmena strechy na bytovom dome v Trstenej: stará plechová krytina dole, nové debnenie, falcovaná krytina a oplechovanie komínov. Fotky z priebehu prác.",
    perex:
      "Na bytovom dome v Trstenej sme vymenili starú červenú plechovú krytinu za novú falcovanú. Strechu sme odkryli, položili nové debnenie a znova oplechovali komíny.",
    postup: [
      "Odstránenie pôvodnej plechovej krytiny",
      "Nové debnenie z dosiek",
      "Podkladová vrstva pod plech",
      "Falcovaná plechová krytina",
      "Oplechovanie komínov",
    ],
    sluzba: "vymena-strechy",
    hlavna: 9,
    // Tie isté fotky sú na úvodnej v sekcii „Priebeh realizácie".
    zdroj: [
      procesFoto.povodneKominy,
      procesFoto.povodnaKrytina,
      procesFoto.odkrytaKonstrukcia,
      procesFoto.dopravaMaterialu,
      procesFoto.noveDebnenie,
      procesFoto.debnenieKomin,
      procesFoto.hydroizolaciaKrytina,
      procesFoto.oplechovanieKomina,
      procesFoto.dokoncovanieHrebena,
      procesFoto.hotovaStrecha,
      procesFoto.hotovaStrechaDetail,
    ],
    popisy: [
      "Pôvodná červená plechová krytina a komíny pred výmenou",
      "Pôvodná krytina pri atike",
      "Odkrytá strecha, pôvodné vrstvy pod krytinou",
      "Rebríkový výťah na dopravu materiálu na strechu",
      "Nové debnenie z dosiek",
      "Komín na novom debnení",
      "Pokládka podkladovej vrstvy a falcovanej krytiny",
      "Oplechovanie komína",
      "Dokončovanie krytiny",
      "Hotová strecha s novou falcovanou krytinou",
      "Hotová strecha, pohľad cez celú plochu",
    ],
  }),
  zaznam({
    slug: "vymena-strechy-lomna",
    obec: "Lomná",
    okres: "Námestovo",
    typ: "Výmena strechy",
    nazov: "Výmena strechy rodinného domu",
    title: "Výmena strechy rodinného domu, Lomná",
    description:
      "Výmena strechy na rodinnom dome v Lomnej: zloženie pôvodnej krytiny, poistná fólia, nové latovanie a nová krytina. Fotky z priebehu prác.",
    perex:
      "Na rodinnom dome v Lomnej sme menili strešnú krytinu. Pôvodnú sme zložili, na krokvy prišla poistná fólia a nové laty a strechu sme pokryli novou krytinou.",
    postup: [
      "Lešenie okolo domu",
      "Zloženie pôvodnej krytiny",
      "Poistná fólia a nové latovanie",
      "Pokládka novej krytiny",
    ],
    sluzba: "vymena-strechy",
    hlavna: 3,
    popisy: [
      "Rodinný dom v Lomnej na lešení, začiatok prác",
      "Pôvodná krytina a prvé pásy poistnej fólie pri odkvape",
      "Nové latovanie na poistnej fólii",
      "Hotová strecha s novou krytinou",
      "Pokládka novej krytiny",
    ],
  }),
  zaznam({
    slug: "dreveny-altanok-oravsky-podzamok",
    obec: "Oravský Podzámok",
    okres: "Dolný Kubín",
    typ: "Tesárske práce",
    nazov: "Drevený altánok",
    title: "Drevený altánok, Oravský Podzámok",
    description:
      "Drevený altánok v Oravskom Podzámku: opracované hranoly, tesárske spoje, krov a debnenie, ktoré zostali zvnútra viditeľné. Fotky z priebehu prác.",
    perex:
      "V Oravskom Podzámku sme postavili drevený altánok. Konštrukcia je z opracovaných hranolov spájaných tesárskymi spojmi a krov s debnením zostal zvnútra viditeľný.",
    postup: [
      "Opracovanie hranolov",
      "Osadenie stĺpov a väznic",
      "Krov altánku",
      "Debnenie strechy",
    ],
    sluzba: "tesarske-prace",
    hlavna: 3,
    popisy: [
      "Opracované hranoly pripravené na montáž",
      "Detail tesárskeho spoja",
      "Osadené stĺpy a väznice",
      "Krov altánku pred pokrytím",
      "Drevený krov a debnenie zvnútra altánku",
      "Práce na streche altánku",
    ],
  }),
  zaznam({
    slug: "strecha-predajne-hrustin",
    obec: "Hruštín",
    okres: "Námestovo",
    typ: "Nová strecha",
    nazov: "Krov a strecha predajne",
    title: "Krov a strecha predajne, Hruštín",
    description:
      "Nová strecha predajne v Hruštíne: opracovanie trámov, trámový strop, krov, krytina so strešnými oknami a drevený štít. Fotky z priebehu prác.",
    perex:
      "Na novej predajni v Hruštíne sme robili drevenú konštrukciu aj strechu — od opracovania trámov cez trámový strop a krov až po krytinu so strešnými oknami a drevený štít.",
    postup: [
      "Opracovanie trámov",
      "Trámový strop",
      "Krov",
      "Poistná fólia a latovanie",
      "Krytina a strešné okná",
      "Drevený štít",
    ],
    sluzba: "nova-strecha-na-kluc",
    hlavna: 16,
    popisy: [
      "Opracovanie trámov na stavbe",
      "Trámy pripravené na prívese",
      "Trámový strop na murovanej stavbe predajne",
      "Osádzanie trámov manipulátorom",
      "Trámový strop zdola",
      "Montáž krovu",
      "Detail trámov",
      "Manipulátor a dodávka Daches pri stavbe",
      "Pokrývanie strechy",
      "Krytina so strešnými oknami",
      "Poistná fólia, latovanie a krytina",
      "Strešné okná v novej krytine",
      "Krytina a presahy strechy",
      "Pokrývanie strechy nad presahom",
      "Lešenie pri štíte predajne",
      "Práce na drevenom štíte",
      "Hotová strecha",
      "Hotová strecha s presahmi",
      "Predajňa s hotovou strechou a dreveným štítom",
    ],
  }),
  zaznam({
    slug: "strecha-bytoveho-domu-oravska-lesna",
    obec: "Oravská Lesná",
    okres: "Námestovo",
    typ: "Plechová strecha",
    nazov: "Strecha bytového domu",
    title: "Strecha bytového domu, Oravská Lesná",
    description:
      "Strecha bytového domu v Oravskej Lesnej: krov, debnenie, falcovaná plechová krytina s úžľabiami a snehovými zábranami. Fotky z priebehu prác.",
    perex:
      "Na bytovom dome v Oravskej Lesnej sme postavili krov a pokryli ho falcovanou plechovou krytinou s úžľabiami a snehovými zábranami.",
    postup: [
      "Krov",
      "Poistná fólia a kontralaty",
      "Debnenie",
      "Podkladová vrstva pod plech",
      "Falcovaná krytina a úžľabia",
      "Snehové zábrany",
    ],
    sluzba: "plechova-strecha",
    hlavna: 10,
    popisy: [
      "Montáž krovu na bytovom dome",
      "Krov a drevo pripravené pri stavbe",
      "Poistná fólia a kontralaty",
      "Debnenie strechy",
      "Pokládka falcovanej krytiny v zime",
      "Debnenie a podkladová vrstva pri úžľabí",
      "Úžľabie z falcovaného plechu",
      "Snehové zábrany na falcovanej krytine",
      "Hotová krytina nad ulicou",
      "Úžľabie počas montáže",
      "Hotová falcovaná strecha",
      "Prestupy a komín v novej krytine",
      "Bytový dom s hotovou strechou",
    ],
  }),
  zaznam({
    slug: "chata-kubinska-hola",
    obec: "Kubínska hoľa",
    okres: "Dolný Kubín",
    typ: "Nová strecha",
    nazov: "Krov a strecha chaty",
    title: "Krov a strecha chaty, Kubínska hoľa",
    description:
      "Krov a falcovaná strecha chaty na Kubínskej holi: väznice, krov s presahmi, debnenie, fólia a falcovaná plechová krytina. Fotky z priebehu prác.",
    perex:
      "Na chate na Kubínskej holi sme postavili krov so strmou strechou a presahmi a pokryli ho falcovanou plechovou krytinou.",
    postup: [
      "Väznice a trámy",
      "Krov s presahmi",
      "Debnenie",
      "Fólia na debnení",
      "Falcovaná plechová krytina",
    ],
    sluzba: "nova-strecha-na-kluc",
    hlavna: 14,
    popisy: [
      "Prvé trámy na chate",
      "Väznice na murive chaty",
      "Dvíhanie časti krovu žeriavom",
      "Postavený krov",
      "Krokvy zvnútra",
      "Krokvy a podbitie zvnútra",
      "Debnenie strechy",
      "Fólia na debnení",
      "Dodávka Daches pri chate",
      "Krov s presahmi zo štítovej strany",
      "Štít chaty",
      "Pokládka falcovanej krytiny",
      "Falcovaná krytina na strmej streche",
      "Chata s hotovou krytinou",
      "Hotová strecha",
      "Hotová strecha a dodávka Daches",
    ],
  }),
  zaznam({
    slug: "strecha-bytoveho-domu-oravske-vesele",
    obec: "Oravské Veselé",
    okres: "Námestovo",
    typ: "Výmena strechy",
    nazov: "Výmena strechy bytového domu",
    title: "Výmena strechy bytového domu, Oravské Veselé",
    description:
      "Výmena strechy na bytovom dome v Oravskom Veselom: poistná fólia, nové latovanie a plechová krytina v tvare škridly. Fotky z priebehu prác.",
    perex:
      "Na bytovom dome v Oravskom Veselom sme menili krytinu. Na poistnú fóliu prišlo nové latovanie a strechu sme pokryli plechovou krytinou v tvare škridly.",
    postup: [
      "Lešenie okolo domu",
      "Poistná fólia",
      "Nové latovanie",
      "Plechová krytina v tvare škridly",
    ],
    sluzba: "vymena-strechy",
    hlavna: 2,
    popisy: [
      "Bytový dom v Oravskom Veselom na lešení",
      "Plechová krytina na novom latovaní",
      "Pokládka krytiny",
      "Bytový dom počas prác",
      "Latovanie na poistnej fólii",
    ],
  }),
  zaznam({
    slug: "pristavba-kostola-hrustin",
    obec: "Hruštín",
    okres: "Námestovo",
    typ: "Tesárske práce",
    nazov: "Konštrukcia prístavby kostola",
    title: "Konštrukcia prístavby kostola, Hruštín",
    description:
      "Tesárske práce pri kostole v Hruštíne: drevená konštrukcia strechy prístavby a jej debnenie. Fotky z priebehu prác od Daches s.r.o.",
    perex:
      "Pri kostole v Hruštíne sme robili drevenú konštrukciu strechy prístavby a jej debnenie.",
    postup: ["Drevená konštrukcia strechy", "Debnenie"],
    sluzba: "tesarske-prace",
    hlavna: 0,
    popisy: [
      "Montáž drevenej konštrukcie prístavby pri kostole",
      "Debnenie strechy prístavby",
      "Debnenie pozdĺž steny kostola",
    ],
  }),
  zaznam({
    slug: "pristavba-hrustin",
    obec: "Hruštín",
    okres: "Námestovo",
    typ: "Plechová strecha",
    nazov: "Falcovaná strecha prístavby",
    title: "Falcovaná strecha prístavby, Hruštín",
    description:
      "Strecha prístavby v Hruštíne: krokvy, debnenie, podkladová rohož a červená falcovaná plechová krytina okolo komína. Fotky z priebehu prác.",
    perex:
      "Na prístavbe v Hruštíne sme urobili krokvy, debnenie a strechu pokryli červenou falcovanou plechovou krytinou.",
    postup: ["Krokvy", "Debnenie", "Podkladová rohož pod plech", "Falcovaná krytina"],
    sluzba: "plechova-strecha",
    hlavna: 4,
    popisy: [
      "Krokvy prístavby",
      "Debnenie a podkladová rohož",
      "Prístavba s debnením",
      "Pokládka falcovanej krytiny na rohož",
      "Falcovaná krytina okolo komína",
    ],
  }),
  zaznam({
    slug: "vymena-krytiny-vanovka",
    obec: "Vaňovka",
    okres: "Námestovo",
    typ: "Výmena strechy",
    nazov: "Výmena krytiny rodinného domu",
    title: "Výmena krytiny rodinného domu, Vaňovka",
    description:
      "Výmena krytiny na rodinnom dome vo Vaňovke (Hruštín): poistná fólia, nové latovanie a plechová krytina v tvare škridly. Fotky z priebehu prác.",
    perex:
      "Na rodinnom dome vo Vaňovke sme vymenili pôvodnú krytinu za plechovú krytinu v tvare škridly. Pod ňu prišla nová poistná fólia a latovanie.",
    postup: [
      "Lešenie okolo domu",
      "Zloženie pôvodnej krytiny",
      "Poistná fólia a latovanie",
      "Plechová krytina v tvare škridly",
    ],
    sluzba: "vymena-strechy",
    hlavna: 4,
    popisy: [
      "Poistná fólia a nové latovanie",
      "Dom s pôvodnou krytinou na začiatku prác",
      "Nová krytina pripravená na pokládku",
      "Pokládka novej krytiny",
      "Hotová strecha",
    ],
  }),
  zaznam({
    slug: "strecha-dolny-kubin-banisko",
    obec: "Dolný Kubín",
    okres: "Dolný Kubín",
    typ: "Krov a strecha",
    nazov: "Krov a strecha, záhradky Banisko",
    title: "Krov a strecha, Dolný Kubín – Banisko",
    description:
      "Krov s drevenými stĺpmi a presahmi a pokrytá strecha v záhradkárskej oblasti Banisko v Dolnom Kubíne. Fotky z priebehu prác od Daches s.r.o.",
    perex:
      "V záhradkárskej oblasti Banisko v Dolnom Kubíne sme postavili krov s drevenými stĺpmi a presahmi a strechu pokryli.",
    postup: ["Krov s presahmi", "Drevené stĺpy", "Pokrytie strechy"],
    sluzba: "vystavba-krovov",
    hlavna: 2,
    popisy: [
      "Krov na murovanej stavbe",
      "Strecha počas pokrývania",
      "Hotová strecha",
      "Strecha s drevenými stĺpmi",
      "Pokrývanie strechy",
      "Montáž krovu",
    ],
  }),
  zaznam({
    slug: "falcovana-strecha-hrustin",
    obec: "Hruštín",
    okres: "Námestovo",
    typ: "Plechová strecha",
    nazov: "Falcovaná strecha syrárne",
    title: "Falcovaná strecha syrárne, Hruštín",
    description:
      "Falcovaná plechová strecha na budove syrárskej výroby v Hruštíne: poistná fólia, debnenie, podkladová rohož a krytina. Fotky z priebehu prác.",
    perex:
      "Na budove syrárskej výroby v Hruštíne sme urobili novú strechu z falcovanej plechovej krytiny — na poistnú fóliu, nové debnenie a podkladovú rohož.",
    postup: [
      "Poistná fólia a kontralaty",
      "Debnenie",
      "Podkladová rohož",
      "Falcovaná plechová krytina",
    ],
    sluzba: "plechova-strecha",
    hlavna: 4,
    popisy: [
      "Budova syrárskej výroby",
      "Poistná fólia a kontralaty",
      "Debnenie strechy",
      "Uzatváranie falcov strojom",
      "Montáž falcovanej krytiny",
      "Pokládka krytiny na podkladovú rohož",
      "Hotová falcovaná krytina",
    ],
  }),
  zaznam({
    slug: "plechova-strecha-zakamenne",
    obec: "Zákamenné",
    okres: "Námestovo",
    typ: "Plechová strecha",
    nazov: "Plechová strecha novostavby",
    title: "Plechová strecha Lindab Click, Zákamenné",
    description:
      "Montáž plechovej krytiny Lindab Click na novostavbe rodinného domu v Zákamennom, v zime na nové debnenie. Fotky z priebehu prác od Daches s.r.o.",
    perex:
      "Na novostavbe rodinného domu v Zákamennom sme montovali plechovú krytinu Lindab Click — v zime, na nové debnenie.",
    postup: ["Debnenie", "Krytina Lindab Click"],
    material: "Lindab Click",
    sluzba: "plechova-strecha",
    hlavna: 2,
    popisy: [
      "Debnenie strechy novostavby",
      "Montáž krytiny Lindab Click",
      "Hotová strecha",
    ],
  }),
  zaznam({
    slug: "plechova-strecha-stefanov-nad-oravou",
    obec: "Štefanov nad Oravou",
    okres: "Tvrdošín",
    typ: "Plechová strecha",
    nazov: "Plechová strecha rodinného domu",
    title: "Strecha Lindab Click, Štefanov nad Oravou",
    description:
      "Rodinný dom v Štefanove nad Oravou pokrytý plechovou krytinou Lindab Click so zapracovanými strešnými oknami. Fotky z priebehu prác.",
    perex:
      "Rodinný dom v Štefanove nad Oravou sme pokryli plechovou krytinou Lindab Click a zapracovali do nej strešné okná.",
    postup: ["Krytina Lindab Click", "Strešné okná v krytine"],
    material: "Lindab Click",
    sluzba: "plechova-strecha",
    hlavna: 1,
    popisy: [
      "Montáž krytiny Lindab Click",
      "Strešné okno v novej krytine",
      "Pokládka pásov krytiny",
      "Detail krytiny pod strešným oknom",
      "Strecha so strešnými oknami",
    ],
  }),
];

export const najdiRealizaciu = (slug: string) =>
  realizacie.find((r) => r.slug === slug);

/** Ďalšie realizácie — najprv z rovnakého okresu, potom ostatné. */
export function dalsieRealizacie(r: Realizacia, pocet = 3) {
  const ostatne = realizacie.filter((x) => x.slug !== r.slug);
  return [
    ...ostatne.filter((x) => x.okres === r.okres),
    ...ostatne.filter((x) => x.okres !== r.okres),
  ].slice(0, pocet);
}

/** Realizácie k službe — pre odkazy zo stránok služieb. */
export const realizacieKSluzbe = (slug: string) =>
  realizacie.filter((r) => r.sluzba === slug);
