import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { company } from "@/lib/content";

export const metadata: Metadata = {
  title: "Cookies",
  description: `Aké súbory cookies web ${company.name} používa a kedy sa načítavajú služby tretích strán.`,
  alternates: { canonical: "/cookies" },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <LegalLayout title="Používanie cookies" updated="26. augusta 2026">
      <p>
        Tento web je postavený tak, aby fungoval bez sledovacích nástrojov.
        Neukladá analytické ani marketingové cookies a nesleduje vaše správanie
        naprieč webmi.
      </p>

      <div>
        <h2>Nevyhnutné cookies</h2>
        <p>
          Na prevádzku samotného webu nepotrebujeme žiadne cookies. Stránka je
          statická — nemá prihlasovanie, košík ani používateľské účty, ktoré by
          si vyžadovali ukladanie identifikátorov.
        </p>
      </div>

      <div>
        <h2>Google Mapy</h2>
        <p>
          Mapu v sekcii Kontakt načítavame až po vašom kliknutí na tlačidlo
          „Zobraziť mapu“. Až v tom momente sa spojíte so servermi spoločnosti
          Google, ktorá môže uložiť vlastné cookies a spracovať vašu IP adresu
          podľa{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            svojich zásad ochrany súkromia
          </a>
          . Ak na tlačidlo nekliknete, k žiadnemu spojeniu nedôjde.
        </p>
      </div>

      <div>
        <h2>Písma</h2>
        <p>
          Písmo Manrope je uložené priamo na tomto webe. Pri jeho načítaní sa
          neodosiela žiadna požiadavka na servery tretích strán.
        </p>
      </div>

      <div>
        <h2>Ako cookies odmietnuť</h2>
        <p>
          Ukladanie cookies viete kedykoľvek zakázať alebo už uložené súbory
          zmazať v nastaveniach svojho prehliadača. Funkčnosť tohto webu tým
          nijako neobmedzíte.
        </p>
      </div>

      <div>
        <h2>Otázky</h2>
        <p>
          Ak si nie ste niečím istí, napíšte nám na{" "}
          <a href={`mailto:${company.email}`}>{company.email}</a>. Súvisiace
          informácie nájdete aj na stránke{" "}
          <a href="/ochrana-osobnych-udajov">Ochrana osobných údajov</a>.
        </p>
      </div>
    </LegalLayout>
  );
}
