import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { company } from "@/lib/content";

export const metadata: Metadata = {
  title: "Ochrana osobných údajov",
  description: `Ako ${company.name} spracúva osobné údaje odoslané cez kontaktný formulár a kalkuláciu.`,
  alternates: { canonical: "/ochrana-osobnych-udajov" },
  robots: { index: true, follow: true },
};

/**
 * ⚠️ Vzorový text pripravený pre bežnú prax malej stavebnej firmy.
 * Pred spustením ho nechajte skontrolovať klientom — doplniť treba IČO
 * a overiť, ktoré nástroje firma reálne používa.
 */
export default function Page() {
  return (
    <LegalLayout title="Ochrana osobných údajov" updated="26. augusta 2026">
      <p>
        Tieto zásady vysvetľujú, aké osobné údaje spoločnosť {company.name} (ďalej
        len „prevádzkovateľ“) spracúva, na aký účel a aké práva v súvislosti s
        nimi máte. Spracúvanie prebieha v súlade s nariadením GDPR a zákonom
        č. 18/2018 Z. z. o ochrane osobných údajov.
      </p>

      <div>
        <h2>Prevádzkovateľ</h2>
        <p>
          {company.name}, {company.street}, {company.postalCode} {company.city},
          Slovenská republika.
          <br />
          Telefón: <a href={company.phoneHref}>{company.phone}</a>
          <br />
          E-mail: <a href={`mailto:${company.email}`}>{company.email}</a>
        </p>
      </div>

      <div>
        <h2>Aké údaje spracúvame</h2>
        <ul>
          <li>Meno a priezvisko</li>
          <li>Telefónne číslo a e-mailovú adresu</li>
          <li>Lokalitu a údaje o stavbe, ktoré nám sami uvediete</li>
          <li>Fotografie strechy, ak nám ich priložíte</li>
        </ul>
      </div>

      <div>
        <h2>Účel a právny základ</h2>
        <p>
          Údaje spracúvame výhradne preto, aby sme vás mohli kontaktovať,
          posúdiť váš projekt a pripraviť cenovú ponuku. Právnym základom je
          vykonanie opatrení pred uzatvorením zmluvy na vašu žiadosť (čl. 6 ods.
          1 písm. b GDPR), prípadne váš súhlas (čl. 6 ods. 1 písm. a GDPR), ktorý
          môžete kedykoľvek odvolať.
        </p>
      </div>

      <div>
        <h2>Ako dlho údaje uchovávame</h2>
        <p>
          Dopyty, z ktorých nevznikne zákazka, uchovávame najviac 12 mesiacov od
          poslednej komunikácie. Pri uzatvorenej zákazke sa doba uchovávania
          riadi zákonnými lehotami pre účtovné a daňové doklady.
        </p>
      </div>

      <div>
        <h2>Komu údaje sprístupňujeme</h2>
        <p>
          Údaje nepredávame ani neposkytujeme tretím stranám na marketingové
          účely. Prístup k nim môžu mať poskytovatelia e-mailových a hostingových
          služieb, ktoré využívame pri bežnej prevádzke, a to výlučne v rozsahu
          nevyhnutnom na poskytnutie služby.
        </p>
      </div>

      <div>
        <h2>Vaše práva</h2>
        <ul>
          <li>Právo na prístup k svojim údajom a na ich kópiu</li>
          <li>Právo na opravu nesprávnych údajov</li>
          <li>Právo na vymazanie údajov</li>
          <li>Právo na obmedzenie spracúvania a právo namietať</li>
          <li>Právo na prenosnosť údajov</li>
          <li>Právo kedykoľvek odvolať udelený súhlas</li>
          <li>
            Právo podať sťažnosť na Úrad na ochranu osobných údajov Slovenskej
            republiky
          </li>
        </ul>
        <p>
          Ktorékoľvek z týchto práv si môžete uplatniť e-mailom na{" "}
          <a href={`mailto:${company.email}`}>{company.email}</a> alebo
          telefonicky na <a href={company.phoneHref}>{company.phone}</a>.
        </p>
      </div>

      <div>
        <h2>Cookies</h2>
        <p>
          Používaniu súborov cookies na tomto webe sa venuje samostatná stránka{" "}
          <a href="/cookies">Cookies</a>.
        </p>
      </div>
    </LegalLayout>
  );
}
