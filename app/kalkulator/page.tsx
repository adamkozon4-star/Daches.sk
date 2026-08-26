import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Kalkulator from "@/components/kalkulator/Kalkulator";
import { calculator, company } from "@/lib/content";

export const metadata: Metadata = {
  title: "Cenový kalkulátor strechy",
  description:
    "Zistite orientačnú cenu novej strechy, krovu alebo rekonštrukcie na Orave. Zadáte plochu a tvar strechy, bežné metre dopočítame za vás. Nezáväzne a bez registrácie.",
  alternates: { canonical: "/kalkulator" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "sk_SK",
    url: `${company.url}/kalkulator`,
    siteName: company.name,
    title: "Cenový kalkulátor strechy — Daches s.r.o.",
    description:
      "Orientačná cena strechy za pár minút. Plochu a tvar zadáte vy, bežné metre dopočítame.",
  },
};

export default function Page() {
  return (
    <div className="bg-white pb-24 pt-[calc(var(--header-h)+3rem)]">
      <div className="container-max">
        <Link
          href="/#kalkulacia"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors duration-[var(--d-micro)] hover:text-dark print:hidden"
        >
          <ArrowLeft size={15} strokeWidth={2.5} aria-hidden="true" />
          Späť na web
        </Link>

        <header className="mt-8 max-w-2xl">
          <p className="eyebrow text-eyebrow uppercase text-muted" data-revealed>
            {calculator.eyebrow}
          </p>
          <h1 className="text-h2 mt-5 text-dark">
            Orientačná cena vašej <span className="mark" data-revealed>strechy</span>
          </h1>
          <p className="text-lead mt-5 text-muted">
            Zadáte tvar a plochu strechy — bežné metre klampiarskych prvkov
            dopočítame za vás. Nemusíte nič merať ani sa registrovať.
          </p>
        </header>

        <div className="mt-12 rounded-panel border border-line bg-white p-6 shadow-[var(--shadow-card)] md:p-10">
          <Kalkulator />
        </div>

        <p className="mt-8 max-w-[68ch] text-xs leading-relaxed text-muted">
          Výsledok je odhad na základe zadaných údajov, nie záväzná cenová
          ponuka. Konečnú cenu ovplyvňuje stav konštrukcie, prístup k stavbe,
          členitosť strechy a rozsah klampiarskych detailov — to všetko vieme
          posúdiť až na mieste. Obhliadka je bezplatná a nezáväzná.
        </p>
      </div>
    </div>
  );
}
