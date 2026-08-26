import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MotionRoot from "@/components/MotionRoot";
import InlineScript from "@/components/InlineScript";
import { areaServed, company, services } from "@/lib/content";
import "./globals.css";

/**
 * Manrope sa self-hostuje cez next/font — žiadna požiadavka na Google.
 * `latin-ext` je pre slovenčinu povinný, inak sa diakritika (š, č, ť, ž, ô)
 * doťahuje samostatným súborom. Iba dve váhy, viac web nepotrebuje.
 */
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "800"],
  display: "swap",
});

const description =
  "Daches s.r.o. — strechárska a tesárska firma z Hruštína na Orave. Krovy, nové strechy na kľúč, rekonštrukcie striech, strešné krytiny a klampiarske práce. Osobná obhliadka a cena až po posúdení stavby.";

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: "Daches s.r.o. — Strechy a krovy na Orave | Tesárske práce",
    template: "%s | Daches s.r.o.",
  },
  description,
  applicationName: company.name,
  authors: [{ name: company.name }],
  keywords: [
    "strechy Orava",
    "krovy Orava",
    "tesárske práce Hruštín",
    "rekonštrukcia strechy Námestovo",
    "strešné krytiny Dolný Kubín",
    "strechár Orava",
  ],
  openGraph: {
    type: "website",
    locale: "sk_SK",
    url: company.url,
    siteName: company.name,
    title: "Daches s.r.o. — Strechy a krovy na Orave",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Daches s.r.o. — Strechy a krovy na Orave",
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  other: {
    "geo.region": "SK-ZI",
    "geo.placename": company.city,
    "geo.position": `${company.lat};${company.lng}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#111111",
};

/**
 * Structured data — pre Google rich results aj pre AI vyhľadávače.
 * Obce sú vymenované poimenne: pre lokálne vyhľadávanie je to oveľa silnejší
 * signál než samotné súradnice.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RoofingContractor",
      "@id": `${company.url}/#business`,
      name: company.name,
      description,
      url: company.url,
      image: `${company.url}/images/hero-strecha.jpg`,
      telephone: "+421907481919",
      email: company.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: company.street,
        addressLocality: company.city,
        postalCode: company.postalCode,
        addressRegion: company.region,
        addressCountry: company.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: company.lat,
        longitude: company.lng,
      },
      areaServed: areaServed.map((name) => ({ "@type": "City", name })),
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "07:00",
        closes: "17:00",
      },
      /**
       * `sameAs` doplniť po dodaní odkazov od klienta (Google Business, Facebook).
       * `aggregateRating` iba pri reálnych recenziách — vymyslené hodnotenie je
       * porušenie pravidiel Google a dôvod na manuálnu penalizáciu.
       */
      sameAs: [],
    },
    {
      "@type": "Service",
      serviceType: "Strechárske a tesárske práce",
      provider: { "@id": `${company.url}/#business` },
      areaServed: areaServed.map((name) => ({ "@type": "City", name })),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `Služby ${company.name}`,
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.description,
          },
        })),
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="sk"
      // Next 16 chce vedieť o smooth scrollovaní explicitne, inak varuje
      // pri prechodoch medzi routami.
      data-scroll-behavior="smooth"
      className={`${manrope.variable} js-motion antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Bez JavaScriptu by trieda `js-motion` nechala obsah natrvalo skrytý.
          `<noscript>` to zruší ešte pred prvým vykreslením.
        */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html: `.js-motion [data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}.js-motion [data-reveal="mask"]>*{clip-path:none!important}.js-motion .mark::after{transform:scaleX(1)!important}.js-motion .eyebrow::before{width:24px!important}`,
            }}
          />
        </noscript>

        {/*
          Poistka pre prípad, že JavaScript síce beží, ale motion sa nespustí
          (zlyhaný chunk, chyba pri hydratácii). Po 4 sekundách odomkne obsah,
          aby chyba skriptu nikdy nenechala web prázdny.
        */}
        <InlineScript html='var e=document.documentElement;setTimeout(function(){e.hasAttribute("data-motion-ready")||e.classList.add("no-js")},4000)' />
      </head>
      <body className="font-sans">
        <a
          href="#obsah"
          className="sr-only fixed left-3 top-3 z-[100] rounded-card bg-accent px-4 py-2 text-sm font-semibold text-dark focus:not-sr-only"
        >
          Preskočiť na obsah
        </a>

        <div aria-hidden="true" className="scroll-progress" />

        <Header />

        <main id="obsah">{children}</main>

        <Footer />

        <MotionRoot />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
