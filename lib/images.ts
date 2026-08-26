/**
 * Centrálny register fotografií.
 *
 * Fotky sú importované staticky — Next.js z nich sám odvodí `width` a `height`,
 * takže pri načítaní nevzniká layout shift (CLS). Výmena fotky = nahradenie
 * súboru v /public/images rovnakým názvom, komponenty sa nemenia.
 *
 * Alt texty sú popisné a obsahujú lokalitu — pre vyhľadávače aj pre AI modely
 * je alt jeden z mála zdrojov informácie o tom, čo je na fotke.
 */
import heroStrecha from "@/public/images/hero-strecha.jpg";
import konstrukciaKrovu from "@/public/images/konstrukcia-krovu-zvnutra.jpg";
import sindlovaKrytina from "@/public/images/sindlova-krytina-stresne-okna.jpg";
import domDrevenaFasada from "@/public/images/dom-drevena-fasada.jpg";
import pultovyKrov from "@/public/images/pultovy-krov-horske-prostredie.jpg";
import detailOdkvapu from "@/public/images/detail-odkvapu-oplechovanie.jpg";
import montazOknaZima from "@/public/images/montaz-stresneho-okna-zima.jpg";
import osadenieKrovu from "@/public/images/osadenie-krovu.jpg";
import vystavbaKrovov from "@/public/images/vystavba-krovov.jpg";
import stresneKrytiny from "@/public/images/stresne-krytiny.jpg";
import rekonstrukciaStrechy from "@/public/images/rekonstrukcia-strechy.jpg";
import logo from "@/public/images/daches-logo.png";

/* Reálna zákazka — výmena krytiny, chronologicky od pôvodného stavu. */
import p01 from "@/public/images/proces/01-povodna-krytina.jpg";
import p02 from "@/public/images/proces/02-povodne-kominy.jpg";
import p03 from "@/public/images/proces/03-odkryta-konstrukcia.jpg";
import p04 from "@/public/images/proces/04-doprava-materialu.jpg";
import p05 from "@/public/images/proces/05-nove-debnenie.jpg";
import p06 from "@/public/images/proces/06-debnenie-komin.jpg";
import p07 from "@/public/images/proces/07-hydroizolacia-krytina.jpg";
import p08 from "@/public/images/proces/08-oplechovanie-komina.jpg";
import p09 from "@/public/images/proces/09-dokoncovanie-hrebena.jpg";
import p10 from "@/public/images/proces/10-hotova-strecha.jpg";
import p11 from "@/public/images/proces/11-hotova-strecha-detail.jpg";

export const procesFoto = {
  povodnaKrytina: p01,
  povodneKominy: p02,
  odkrytaKonstrukcia: p03,
  dopravaMaterialu: p04,
  noveDebnenie: p05,
  debnenieKomin: p06,
  hydroizolaciaKrytina: p07,
  oplechovanieKomina: p08,
  dokoncovanieHrebena: p09,
  hotovaStrecha: p10,
  hotovaStrechaDetail: p11,
};

/**
 * Logo je biele na priehľadnom pozadí — pôvodný čierny štvorec je odstránený.
 * Hlavička je nad hero fotkou priehľadná a po scrollnutí polopriehľadná
 * s rozostrením; plný čierny podklad by v oboch prípadoch pôsobil ako nalepený
 * obdĺžnik. V pätke (#111111) by zase čierna (#000000) presvitala ako tmavší
 * štvorec.
 */
export const brandLogo = logo;

export type Photo = {
  src: typeof heroStrecha;
  alt: string;
};

export const photos = {
  heroStrecha,
  konstrukciaKrovu,
  sindlovaKrytina,
  domDrevenaFasada,
  pultovyKrov,
  detailOdkvapu,
  montazOknaZima,
  osadenieKrovu,
  vystavbaKrovov,
  stresneKrytiny,
  rekonstrukciaStrechy,
};

export const hero: Photo = {
  src: heroStrecha,
  alt: "Dokončená strecha rodinného domu na Orave — Daches s.r.o.",
};
