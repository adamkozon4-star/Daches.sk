import type { Sklon, TypStrechy, Vymery } from "@/lib/kalkulator/typy";

/**
 * Odvodenie bežných metrov z plochy a tvaru strechy.
 *
 * ── Prečo to vôbec robíme ────────────────────────────────────────────────
 * Referenčné kalkulátory sa zákazníka pýtajú „obvod okapovej hrany (bm)"
 * a „dĺžka závetrovej lišty (bm)". Majiteľ rodinného domu to nevie a hodí
 * tam číslo od oka. Videli sme reálny prípad, kde do 23 m² strechy niekto
 * zadal 434 bm okapu — kalkulátor to zhltol a okapová lišta potom tvorila
 * 53 % celkovej ceny. Výsledok bol úplný nezmysel.
 *
 * Preto sa pýtame len na plochu a tvar. Zvyšok dopočítame.
 *
 * ── Ako ─────────────────────────────────────────────────────────────────
 * Zo šikmej plochy odvodíme pôdorys, z pôdorysu strany obdĺžnika pri bežnom
 * pomere strán rodinného domu, a z nich jednotlivé hrany. Je to odhad, nie
 * zameranie — presné výmery vzniknú až pri obhliadke. Na orientačnú cenu
 * je to však rádovo spoľahlivejšie než hádanie zákazníka.
 */

/** Reprezentatívny sklon pre každú kategóriu, v stupňoch. */
const UHOL: Record<Sklon, number> = {
  nizky: 15,
  bezny: 30,
  strmy: 45,
};

/** Bežný pomer strán pôdorysu rodinného domu. */
const POMER_STRAN = 1.5;

const naRadiany = (stupne: number) => (stupne * Math.PI) / 180;
const zaokruhli = (n: number) => Math.round(n * 10) / 10;

export function odvodVymery(
  plocha: number,
  typStrechy: TypStrechy,
  sklon: Sklon,
): Vymery {
  const prazdne: Vymery = {
    okap: 0,
    zavetrova: 0,
    hreben: 0,
    narozia: 0,
    uzlabie: 0,
  };

  if (!plocha || plocha <= 0) return prazdne;

  const alfa = naRadiany(UHOL[sklon]);
  const cos = Math.cos(alfa);

  // Pôdorysná plocha pod strechou
  const podorys = plocha * cos;

  // Strany obdĺžnika: podorys = sirka × dlzka, dlzka = sirka × POMER_STRAN
  const sirka = Math.sqrt(podorys / POMER_STRAN);
  const dlzka = sirka * POMER_STRAN;

  // Dĺžka krokvy od okapu po hrebeň (polovica šírky delená kosínusom)
  const krokva = sirka / 2 / cos;

  switch (typStrechy) {
    case "sedlova":
      return {
        ...prazdne,
        okap: zaokruhli(2 * dlzka),
        // štítové hrany po oboch stranách, hore aj dole
        zavetrova: zaokruhli(4 * krokva),
        hreben: zaokruhli(dlzka),
      };

    case "valbova":
      return {
        ...prazdne,
        okap: zaokruhli(2 * (dlzka + sirka)),
        hreben: zaokruhli(Math.max(dlzka - sirka, 0)),
        narozia: zaokruhli(4 * Math.hypot(krokva, sirka / 2)),
      };

    case "pultova": {
      // Jedna rovina — krokva ide cez celú šírku
      const krokvaPult = sirka / cos;
      return {
        ...prazdne,
        okap: zaokruhli(dlzka),
        zavetrova: zaokruhli(2 * krokvaPult + dlzka),
        hreben: zaokruhli(dlzka),
      };
    }

    case "stanova":
      return {
        ...prazdne,
        okap: zaokruhli(2 * (dlzka + sirka)),
        narozia: zaokruhli(4 * Math.hypot(krokva, sirka / 2)),
      };

    case "manzardova":
      // Zlomená rovina — viac hrán aj viac klampiarskych detailov
      return {
        ...prazdne,
        okap: zaokruhli(2 * dlzka),
        zavetrova: zaokruhli(4 * krokva * 1.25),
        hreben: zaokruhli(dlzka),
        uzlabie: zaokruhli(2 * dlzka * 0.35),
      };
  }
}

/**
 * Kontrola vierohodnosti ručne prepísaných výmer.
 *
 * Nezakazuje zadať vlastné číslo — kto strechu zameral, má naň právo.
 * Ale ak sa hodnota rádovo rozchádza s odvodenou, treba to povedať nahlas,
 * inak sa jedno preklepnuté číslo prepíše do celej ceny.
 */
export function skontrolujVymer(
  zadane: number,
  odvodene: number,
): { ok: boolean; sprava?: string } {
  if (odvodene <= 0) return { ok: true };
  if (zadane <= 0) return { ok: true };

  const pomer = zadane / odvodene;

  // Rovnaké formátovanie ako vo výpise výmerov — desatinná čiarka, nie bodka.
  const odhad = new Intl.NumberFormat("sk-SK", {
    maximumFractionDigits: 1,
  }).format(odvodene);

  if (pomer > 2.5) {
    return {
      ok: false,
      sprava: `Zadaná hodnota je výrazne vyššia, než zodpovedá streche tejto veľkosti (náš odhad je ${odhad} bm). Skontrolujte prosím číslo.`,
    };
  }

  if (pomer < 0.4) {
    return {
      ok: false,
      sprava: `Zadaná hodnota je výrazne nižšia, než zodpovedá streche tejto veľkosti (náš odhad je ${odhad} bm). Skontrolujte prosím číslo.`,
    };
  }

  return { ok: true };
}

/** Rozumné hranice plochy strechy rodinného domu alebo menšej stavby. */
export const PLOCHA_MIN = 20;
export const PLOCHA_MAX = 1500;
