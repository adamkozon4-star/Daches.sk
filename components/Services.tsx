import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { services } from "@/lib/content";

export default function Services() {
  return (
    <section
      id="sluzby"
      aria-labelledby="sluzby-nadpis"
      className="section-y bg-white"
    >
      <div className="container-max">
        <SectionHeading
          id="sluzby-nadpis"
          eyebrow="Naše služby"
          before="Od krovu až po "
          mark="hotovú"
          after=" strechu"
          lead="Kompletné strechárske a tesárske práce pre rodinné domy, chaty a menšie stavebné projekty."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal as="li" key={service.number} index={i} variant="up">
              <article className="group flex h-full flex-col overflow-hidden rounded-panel border border-line bg-white transition-[transform,box-shadow] duration-[var(--d-short)] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.photo}
                    alt={service.alt}
                    fill
                    loading="lazy"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    quality={80}
                    className="object-cover transition-transform duration-[var(--d-long)] group-hover:scale-[1.04]"
                  />
                  <span
                    aria-hidden="true"
                    className="tabular absolute left-4 top-4 rounded-card bg-dark/80 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm transition-colors duration-[var(--d-short)] group-hover:bg-accent group-hover:text-dark"
                  >
                    {service.number}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-h3 text-dark">{service.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>

                  <a
                    href="/kalkulator"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-dark"
                  >
                    Nezáväzná kalkulácia
                    <ArrowRight
                      size={16}
                      strokeWidth={2.5}
                      aria-hidden="true"
                      className="transition-transform duration-[var(--d-short)] group-hover:translate-x-1"
                    />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
