import { photos, procesFoto } from "@/lib/images";
import type { Clanok } from "@/lib/radca/typy";

export const plechAleboSkridla: Clanok = {
  slug: "plech-alebo-skridla",
  navLabel: "Plech alebo škridla",
  odkazText: "Porovnanie plechu a škridly",
  title: "Plech alebo škridla? Porovnanie krytín",
  description:
    "Plech alebo škridla na strechu? Porovnanie hmotnosti, nárokov na krov, sklonu, hluku, snehu a údržby — a kedy sa hodí ktorá krytina.",
  pill: "Radca · Krytiny",
  nadpis: { pred: "Plech alebo ", zvyraznene: "škridla", za: "?" },
  perex:
    "Pri výmene strechy na staršom dome býva odpoveďou plech — kvôli hmotnosti. Pri novostavbe je voľba otvorenejšia. Rozhoduje krov, sklon a až potom vzhľad.",
  publikovane: "2026-10-24",
  upravene: "2026-10-24",
  foto: {
    src: procesFoto.hotovaStrechaDetail,
    alt: "Detail falcovanej plechovej krytiny a hrebeňa na rodinnom dome, Orava",
  },

  kapitoly: [
    {
      id: "hmotnost",
      nazov: "Hmotnosť a krov",
      tvrdenie:
        "Škridla váži zhruba osemkrát toľko čo plech. Pri výmene strechy je to často rozhodujúci argument.",
      odseky: [
        "Štvorcový meter plechovej krytiny váži približne päť kilogramov, betónová alebo pálená škridla okolo štyridsiatich. Na streche so 150 m² je to rozdiel medzi zhruba 750 kilogramami a šiestimi tonami.",
        "Krov staršieho domu bol navrhnutý na to, čo na ňom ležalo. Pri prechode z ľahkej krytiny na škridlu treba overiť, či ju unesie, a často ho aj zosilniť. Pri prechode zo škridly na plech tento problém odpadá.",
      ],
      foto: {
        src: photos.vystavbaKrovov,
        alt: "Drevený krov rodinného domu — konštrukcia, ktorá musí uniesť hmotnosť krytiny, Orava",
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
              b: "pri výmene treba posúdiť nosnosť",
            },
            {
              parameter: "Sklon",
              a: "falcovaná zvláda aj nízke sklony",
              b: "potrebuje výraznejší spád",
            },
            {
              parameter: "Montáž",
              a: "rýchlejšia, veľké tabule a pásy",
              b: "pomalšia, kus po kuse",
            },
            {
              parameter: "Oprava poškodenia",
              a: "výmena celého pásu alebo tabule",
              b: "výmena jednotlivých kusov",
            },
          ],
          poznamka:
            "Hmotnosti sú bežné hodnoty pre daný typ krytiny, nie údaje konkrétneho výrobku. Záväzné číslo je v technickom liste a pri posúdení krovu sa vychádza z neho.",
        },
      ],
    },

    {
      id: "sklon",
      nazov: "Sklon strechy",
      tvrdenie:
        "Skladaná krytina odvádza vodu presahmi. Čím menší sklon, tým ľahšie sa voda dostane pod ňu.",
      odseky: [
        "Škridla, plechová škridla aj šindeľ sa skladajú z kusov, ktoré sa prekrývajú. Pri nízkom sklone voda steká pomaly a vietor ju dokáže zahnať pod presah. Preto má každá skladaná krytina minimálny sklon, ktorý určuje výrobca.",
        "Falcovaný plech je súvislá plocha spojená drážkou a zvláda sklony, pri ktorých by skladaná krytina zatekala. Pri plochej alebo takmer plochej streche je preto často jedinou šikmou krytinou, ktorá prichádza do úvahy.",
      ],
      bloky: [],
    },

    {
      id: "hluk-sneh",
      nazov: "Hluk, sneh, životnosť",
      tvrdenie:
        "Väčšina obáv z plechu pochádza z prístreškov a stodôl, nie z obytných domov.",
      odseky: [
        "Na Orave k tomu patrí aj sneh. Rozdiel medzi krytinami tu nie je v tom, či strecha sneh unesie — to je otázka krovu — ale v tom, ako sa z nej zosúva.",
      ],
      bloky: [
        {
          typ: "karty",
          polozky: [
            {
              nazov: "Hluk pri daždi",
              text: "Hluk vzniká tam, kde je plech napnutý nad vzduchovou medzerou bez podkladu. Pod krytinou obytného domu je debnenie alebo latovanie a v podkroví izolácia — tie dážď utlmia.",
            },
            {
              nazov: "Sneh",
              text: "Z hladkého plechu sa sneh zosúva ľahšie a naraz. Sneholamy sú preto pri plechu nevyhnutnosť, nie doplnok — chránia žľaby aj priestor pod strechou.",
            },
            {
              nazov: "Životnosť",
              text: "Obe krytiny vydržia desaťročia. Pri plechu rozhoduje hrúbka a povrchová úprava, pri škridle mrazuvzdornosť. Pri oboch rovnako záleží na detailoch okolo komína a v úžľabí.",
            },
            {
              nazov: "Vzhľad",
              text: "Kto chce vzhľad klasickej strechy pri hmotnosti plechu, má plechovú škridlu. Falcovaný plech pôsobí moderne a čisto.",
            },
          ],
        },
      ],
    },

    {
      id: "kedy-co",
      nazov: "Kedy čo",
      tvrdenie:
        "Krytina sa nevyberá podľa katalógu. Vyberá sa podľa konkrétnej strechy.",
      odseky: [
        "Pri výbere začíname krovom a sklonom, potom riešime vzhľad a rozpočet. Ak sa niektorá krytina na strechu nehodí, povieme to skôr, než sa začne riešiť farba.",
      ],
      bloky: [
        {
          typ: "karty",
          polozky: [
            {
              nazov: "Výmena na staršom dome",
              text: "Spravidla plech — falcovaný alebo plechová škridla. Krov netreba zosilňovať a montáž je rýchlejšia.",
            },
            {
              nazov: "Nízky sklon",
              text: "Falcovaný plech. Skladané krytiny majú minimálny sklon, pod ktorým by zatekali.",
            },
            {
              nazov: "Novostavba",
              text: "Voľba je otvorená, pretože krov sa navrhuje priamo na zvolenú krytinu. Rozhoduje vzhľad a rozpočet.",
            },
            {
              nazov: "Hospodárske stavby",
              text: "Trapézový plech — najjednoduchšie a najúspornejšie riešenie.",
            },
          ],
        },
      ],
    },
  ],

  faq: [
    {
      otazka: "Je lepší plech alebo škridla?",
      odpoved:
        "Univerzálne lepšia krytina nie je. Plech je ľahký a zvláda nízke sklony, preto býva voľbou pri výmene strechy na staršom dome. Škridla je ťažšia, potrebuje väčší sklon a pevnejší krov a časť majiteľov uprednostňuje jej vzhľad.",
    },
    {
      otazka: "Je plechová strecha hlučná?",
      odpoved:
        "Pri obytnom dome nie. Hluk vzniká pri plechu napnutom nad vzduchovou medzerou, typicky na prístreškoch. Pod krytinou domu je podklad a v podkroví izolácia, ktoré dážď utlmia.",
    },
    {
      otazka: "Môžem dať škridlu namiesto plechu na starý krov?",
      odpoved:
        "Len po posúdení krovu. Škridla váži približne osemkrát viac a pôvodný krov ju nemusí uniesť bez zosilnenia. To sa v cene prejaví výraznejšie ako rozdiel medzi krytinami.",
    },
    {
      otazka: "Čo je plechová škridla?",
      odpoved:
        "Plechové tabule tvarované do podoby skladanej škridly. Strecha vyzerá klasicky, ale váži ako plechová.",
    },
    {
      otazka: "Potrebuje plechová strecha sneholamy?",
      odpoved:
        "Áno. Z hladkého plechu sa sneh zosúva ľahšie a naraz, takže sneholamy chránia žľaby, zvody aj priestor pod strechou.",
    },
  ],
  sluzby: ["plechova-strecha", "vymena-strechy", "nova-strecha-na-kluc"],
};
