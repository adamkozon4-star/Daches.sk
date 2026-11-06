import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import HeroPodstranky from "@/components/HeroPodstranky";
import Reveal from "@/components/Reveal";
import KartaRealizacie from "@/components/realizacie/KartaRealizacie";
import { company } from "@/lib/content";
import { najdiRealizaciu, realizacie } from "@/lib/realizacie";

const title = "Realizácie striech na Orave podľa obcí";
const description =
  "Strechy, krovy a výmeny krytín, ktoré sme robili na Orave — Hruštín, Trstená, Lomná, Oravská Lesná, Zákamenné, Dolný Kubín a ďalšie. Fotky z priebehu prác.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/realizacie" },
  openGraph: {
    type: "website",
    url: `${company.url}/realizacie`,
    title: `${title} | ${company.name}`,
    description,
  },
};

/** Poradie okresov — od sídla firmy (Hruštín, okres Námestovo). */
const OKRESY = ["Námestovo", "Tvrdošín", "Dolný Kubín"];

export default function Page() {
  const uvodna = najdiRealizaciu("chata-kubinska-hola")!;
  const foto = uvodna.fotky[uvodna.hlavna];
  const obce = [...new Set(realizacie.map((r) => r.obec))];

  const skupiny = OKRESY.map((okres) => ({
    okres,
    polozky: realizacie.filter((r) => r.okres === okres),
  })).filter((s) => s.polozky.length);

  return (
    <>
      <HeroPodstranky
        ariaLabel="Realizácie"
        foto={{ src: foto.src, alt: `${foto.popis} — ${uvodna.obec}` }}
        drobceky={[{ label: "Úvod", href: "/" }, { label: "Realizácie" }]}
        pill="Realizácie · Orava"
        ikona={<MapPin size={13} strokeWidth={2.5} aria-hidden="true" />}
        nadpis={{ pred: "Strechy, ktoré sme robili ", zvyraznene: "na Orave", za: "" }}
        lead="Krovy, nové strechy a výmeny krytín z obcí okresov Námestovo, Tvrdošín a Dolný Kubín — s fotkami z priebehu prác."
        fakty={[`${realizacie.length} realizácií`, `${obce.length} obcí`, "Fotky zo stavby"]}
        akcie={
          <>
            <a href="#zoznam" className="btn btn-accent">
              Prezrieť realizácie
              <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
            </a>
            <a
              href={company.phoneHref}
              className="btn border border-white/22 text-white backdrop-blur-sm hover:bg-white/10"
            >
              <Phone size={16} strokeWidth={2.5} aria-hidden="true" />
              <span className="tabular">{company.phone}</span>
            </a>
          </>
        }
      />

      <div id="zoznam">
        {skupiny.map((s, si) => (
          <section
            key={s.okres}
            aria-labelledby={`okres-${si}`}
            className={`section-y ${si % 2 ? "bg-light" : "bg-white"}`}
          >
            <div className="container-max">
              <Reveal className="max-w-2xl">
                <p className="eyebrow text-eyebrow uppercase text-muted">
                  {s.polozky.length === 1 ? "1 realizácia" : `${s.polozky.length} realizácií`}
                </p>
                <h2 id={`okres-${si}`} className="text-h2 mt-5 text-dark">
                  Okres <span className="mark">{s.okres}</span>
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {[...new Set(s.polozky.map((r) => r.obec))].join(" · ")}
                </p>
              </Reveal>

              <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
                {s.polozky.map((r, i) => (
                  <Reveal as="li" key={r.slug} index={i}>
                    <KartaRealizacie r={r} />
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <section aria-labelledby="vasa" className="section-y bg-dark">
        <div className="container-max">
          <Reveal className="rounded-panel border border-white/8 bg-dark-2 px-6 py-10 md:px-12 md:py-14">
            <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
              <div>
                <p className="eyebrow text-eyebrow uppercase text-accent">Vaša strecha</p>
                <h2 id="vasa" className="text-h2 mt-5 text-balance text-white">
                  Pripravujete strechu aj vy?
                </h2>
                <p className="text-lead mt-5 max-w-[54ch] text-white/60">
                  Orientačnú cenu si vypočítate hneď, záväznú povieme po
                  bezplatnej obhliadke.
                </p>
              </div>
              <div className="flex flex-col gap-3 lg:items-end">
                <a href="/kalkulator" className="btn btn-accent w-full justify-center sm:w-auto">
                  Vypočítať orientačnú cenu
                  <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
                </a>
                <Link
                  href="/#kontakt"
                  className="btn w-full justify-center border border-white/22 text-white hover:bg-white/10 sm:w-auto"
                >
                  Dohodnúť obhliadku
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
