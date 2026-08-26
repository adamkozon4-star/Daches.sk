import { Clock, Mail, MapPin, Phone } from "lucide-react";
import MapEmbed from "@/components/MapEmbed";
import Reveal from "@/components/Reveal";
import { areaServed, company, contact } from "@/lib/content";

type Detail = {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
};

const details: Detail[] = [
  {
    icon: Phone,
    label: "Telefón",
    value: company.phone,
    href: company.phoneHref,
  },
  {
    icon: Mail,
    label: "E-mail",
    value: company.email,
    href: `mailto:${company.email}`,
  },
  {
    icon: MapPin,
    label: "Adresa",
    value: `${company.street}, ${company.postalCode} ${company.city}`,
  },
  { icon: Clock, label: "Otváracie hodiny", value: company.opening },
];

export default function Contact() {
  return (
    <section
      id="kontakt"
      aria-labelledby="kontakt-nadpis"
      className="section-y bg-white"
    >
      <div className="container-max">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal variant="left">
              <p className="eyebrow text-eyebrow uppercase text-muted">
                {contact.eyebrow}
              </p>

              <h2 id="kontakt-nadpis" className="text-h2 mt-5 text-dark">
                {contact.titleBefore}
                <span className="mark">{contact.titleMark}</span>
                {contact.titleAfter}
              </h2>

              <p className="text-lead mt-6 max-w-[54ch] text-muted">
                {contact.text}
              </p>
            </Reveal>

            <dl className="mt-10 grid gap-6 sm:grid-cols-2">
              {details.map((item, i) => (
                <Reveal key={item.label} variant="left" index={i + 1} step={70}>
                  <dt className="text-eyebrow flex items-center gap-2 uppercase text-muted">
                    <item.icon size={14} strokeWidth={2} aria-hidden="true" />
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-base font-semibold text-dark">
                    {item.href ? (
                      <a
                        href={item.href}
                        className="tabular transition-colors duration-[var(--d-micro)] hover:text-accent-hover"
                      >
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </Reveal>
              ))}
            </dl>

            <Reveal variant="left" index={5} step={70} className="mt-10">
              <p className="text-eyebrow uppercase text-muted">
                Kde realizujeme
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {areaServed.map((place) => (
                  <li
                    key={place}
                    className="rounded-full border border-line bg-light px-3.5 py-1.5 text-sm text-dark"
                  >
                    {place}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal variant="scale" delay={200}>
            <MapEmbed />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
