import { ArrowUpRight, Star } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { reviews } from "@/lib/content";

export default function Reviews() {
  const items = reviews.items;

  return (
    <section
      id="referencie"
      aria-labelledby="referencie-nadpis"
      className="section-y bg-light"
    >
      <div className="container-max">
        <SectionHeading
          id="referencie-nadpis"
          eyebrow={reviews.eyebrow}
          before={reviews.titleBefore}
          mark={reviews.titleMark}
          lead={reviews.lead}
        />

        {items.length > 0 ? (
          <ul className="-mx-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 lg:mx-0 lg:mt-20 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
            {items.map((review, i) => (
              <Reveal
                as="li"
                key={review.author}
                index={i}
                step={90}
                className="w-[85%] shrink-0 snap-start rounded-panel border border-line bg-white p-7 shadow-[var(--shadow-card)] lg:w-auto"
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="grid h-8 w-8 place-items-center rounded-full bg-light text-sm font-bold text-dark"
                  >
                    G
                  </span>
                  <span
                    className="flex gap-0.5 text-accent"
                    aria-label={`Hodnotenie ${review.rating} z 5`}
                  >
                    {Array.from({ length: 5 }, (_, s) => (
                      <Star
                        key={s}
                        size={14}
                        aria-hidden="true"
                        fill={s < review.rating ? "currentColor" : "none"}
                        strokeWidth={s < review.rating ? 0 : 1.5}
                        className={s < review.rating ? "" : "text-muted"}
                      />
                    ))}
                  </span>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-dark">
                  {review.text}
                </p>
                <p className="mt-5 text-sm font-semibold text-muted">
                  {review.author}
                </p>
              </Reveal>
            ))}
          </ul>
        ) : (
          /* Čestný stav. Vymyslené recenzie si zákazník overí na Google za 10 sekúnd. */
          <Reveal className="mt-14 lg:mt-20">
            <div className="flex flex-col items-start gap-6 rounded-panel border border-dashed border-line bg-white p-8 md:flex-row md:items-center md:justify-between md:p-10">
              <div>
                <h3 className="text-h3 text-dark">
                  Hodnotenia nájdete na našom Google profile
                </h3>
                <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-muted">
                  Recenzie zobrazíme priamo tu, hneď ako prepojíme Google
                  Business profil. Dovtedy si ich môžete pozrieť na Google.
                </p>
              </div>

              <a
                href={reviews.googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-dark shrink-0"
              >
                Zobraziť na Google
                <ArrowUpRight size={17} strokeWidth={2.5} aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
