import { Plus } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import type { FaqPolozka } from "@/lib/sluzby";

/**
 * Často kladené otázky + `FAQPage`.
 *
 * Rozbaľovanie rieši natívny `<details>` — žiadny JavaScript, žiadny stav.
 * Dôležité je aj to, že odpoveď je v HTML aj pri zatvorenej otázke, takže ju
 * Google aj AI roboty prečítajú bez interakcie.
 *
 * Otázky vychádzajú z našepkávača Google, nie z toho, čo nás napadlo —
 * zmysel má odpovedať na to, čo sa ľudia naozaj pýtajú.
 */
export default function Faq({
  polozky,
  id = "faq",
}: {
  polozky: FaqPolozka[];
  id?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: polozky.map((p) => ({
      "@type": "Question",
      name: p.otazka,
      acceptedAnswer: { "@type": "Answer", text: p.odpoved },
    })),
  };

  return (
    <section id={id} aria-labelledby={`${id}-nadpis`} className="section-y bg-light">
      <div className="container-max">
        <SectionHeading
          id={`${id}-nadpis`}
          eyebrow="Časté otázky"
          before="Na čo sa ľudia "
          mark="pýtajú"
          after=" najčastejšie"
        />

        <div className="mt-12 flex flex-col gap-3 lg:mt-16">
          {polozky.map((p, i) => (
            <Reveal key={p.otazka} index={i} variant="up">
              <details className="group rounded-panel border border-line bg-white transition-colors duration-[var(--d-short)] hover:border-dark/20 open:border-dark/15">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 p-5 md:p-6 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-h3 text-dark">{p.otazka}</h3>
                  <Plus
                    size={20}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-muted transition-transform duration-[var(--d-short)] group-open:rotate-45"
                  />
                </summary>

                <p className="max-w-[68ch] px-5 pb-6 text-[15px] leading-relaxed text-muted md:px-6">
                  {p.odpoved}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  );
}
