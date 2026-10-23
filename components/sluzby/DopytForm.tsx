"use client";

import { useState } from "react";
import { Check, Phone, Send } from "lucide-react";
import { company } from "@/lib/content";
import { posliDopyt } from "@/lib/dopyt";

/**
 * Krátky dopytový formulár na podstránke služby.
 *
 * ── Prečo tu je ─────────────────────────────────────────────────────────
 * Stránka dovtedy končila odkazom do kalkulátora. Kto si cenu rátať nechce
 * — a to je väčšina ľudí, ktorí už vedia, že strechu potrebujú — nemal kam
 * napísať. Telefón v hlavičke je pre časť ľudí prekážka: volať sa im nechce
 * alebo nemôžu (práca, večer). Toto je tretia cesta.
 *
 * ── Prečo je taký krátky ────────────────────────────────────────────────
 * Povinné sú tri polia. Každé ďalšie znižuje počet odoslaných dopytov
 * a všetko ostatné sa dá dohodnúť po telefóne. Obec pomáha pri plánovaní
 * obhliadky, správa je nepovinná.
 *
 * ── Klientský komponent ─────────────────────────────────────────────────
 * Potrebuje stav formulára, takže musí byť klientský. Je na podstránkach
 * služieb, nie na úvodnej — tá zostáva bez tohto JavaScriptu.
 */

type Stav = { meno: string; telefon: string; email: string; adresa: string; sprava: string; web: string };

const prazdny: Stav = { meno: "", telefon: "", email: "", adresa: "", sprava: "", web: "" };

const jeEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

export default function DopytForm({ sluzba }: { sluzba: string }) {
  const [stav, setStav] = useState<Stav>(prazdny);
  const [suhlas, setSuhlas] = useState(false);
  const [chyba, setChyba] = useState<string | null>(null);
  const [odosiela, setOdosiela] = useState(false);
  const [hotovo, setHotovo] = useState<null | "server" | "email">(null);

  const uprav = (k: keyof Stav, v: string) => setStav((p) => ({ ...p, [k]: v }));

  const odosli = async () => {
    if (!stav.meno.trim() || !stav.telefon.trim() || !stav.email.trim()) {
      setChyba("Vyplňte prosím meno, telefón a e-mail.");
      return;
    }
    if (!jeEmail(stav.email.trim())) {
      setChyba("Skontrolujte prosím e-mailovú adresu.");
      return;
    }
    if (!suhlas) {
      setChyba("Bez súhlasu so spracovaním údajov vám nevieme odpovedať.");
      return;
    }

    setChyba(null);
    setOdosiela(true);
    try {
      const v = await posliDopyt({
        meno: stav.meno,
        telefon: stav.telefon,
        email: stav.email,
        adresa: stav.adresa,
        poznamka: stav.sprava,
        web: stav.web,
        typProjektu: sluzba,
        suhrn: zostavSuhrn(sluzba, stav),
      });
      setHotovo(v.sposob);
    } finally {
      setOdosiela(false);
    }
  };

  if (hotovo) {
    return (
      <div className="rounded-panel border border-line bg-white p-8 text-center md:p-12">
        <span
          aria-hidden="true"
          className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent"
        >
          <Check size={26} strokeWidth={3} className="text-dark" />
        </span>

        {hotovo === "server" ? (
          <>
            <h3 className="text-h3 mt-5 text-dark">Dopyt sme dostali</h3>
            <p className="mx-auto mt-3 max-w-[48ch] text-sm leading-relaxed text-muted">
              Ozveme sa vám na{" "}
              <strong className="text-dark">{stav.telefon}</strong>, zvyčajne do
              jedného pracovného dňa. Dohodneme termín bezplatnej obhliadky.
            </p>
          </>
        ) : (
          <>
            <h3 className="text-h3 mt-5 text-dark">Otvorili sme vám e-mail</h3>
            <p className="mx-auto mt-3 max-w-[48ch] text-sm leading-relaxed text-muted">
              V e-mailovom programe máte pripravenú správu — stačí ju odoslať.
              Ak sa nič neotvorilo, zavolajte nám na{" "}
              <a href={company.phoneHref} className="font-semibold text-dark">
                {company.phone}
              </a>
              .
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-panel border border-line bg-white p-6 md:p-10">
      <div className="grid gap-4 sm:grid-cols-2">
        <Pole
          label="Meno a priezvisko *"
          hodnota={stav.meno}
          onChange={(v) => uprav("meno", v)}
          placeholder="Ján Novák"
          autoComplete="name"
        />
        <Pole
          label="Telefón *"
          hodnota={stav.telefon}
          onChange={(v) => uprav("telefon", v)}
          placeholder="+421 ..."
          typ="tel"
          autoComplete="tel"
        />
        <Pole
          label="E-mail *"
          hodnota={stav.email}
          onChange={(v) => uprav("email", v)}
          placeholder="jan@example.com"
          typ="email"
          autoComplete="email"
        />
        <Pole
          label="Obec alebo adresa stavby"
          hodnota={stav.adresa}
          onChange={(v) => uprav("adresa", v)}
          placeholder="Napríklad Námestovo"
        />
      </div>

      <label className="mt-4 block">
        <span className="text-eyebrow block uppercase text-muted">
          Čo potrebujete
        </span>
        <textarea
          rows={3}
          value={stav.sprava}
          onChange={(e) => uprav("sprava", e.target.value)}
          placeholder="Napríklad: starý dom, plocha asi 120 m², zateká pri komíne."
          className="mt-2 w-full resize-y rounded-card border border-line bg-white px-4 py-3 text-base text-dark outline-none transition-colors duration-[var(--d-micro)] focus:border-accent"
        />
      </label>

      <label className="mt-4 flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={suhlas}
          onChange={(e) => setSuhlas(e.target.checked)}
          className="mt-1"
        />
        <span className="text-xs leading-relaxed text-muted">
          Súhlasím so spracovaním osobných údajov na účel odpovede na dopyt.{" "}
          <a
            href="/ochrana-osobnych-udajov"
            className="underline underline-offset-2 hover:text-dark"
          >
            Ochrana osobných údajov
          </a>
        </span>
      </label>

      {chyba ? <p className="mt-4 text-sm text-red-500">{chyba}</p> : null}

      {/*
        Pasca na roboty — skrytá pred ľuďmi aj pred čítačkami obrazovky.
        Vyplní ju len automat a server taký dopyt ticho zahodí.
      */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Nevypĺňajte
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={stav.web}
            onChange={(e) => uprav("web", e.target.value)}
          />
        </label>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={odosli}
          disabled={odosiela}
          className="btn btn-accent disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send size={16} strokeWidth={2.5} aria-hidden="true" />
          {odosiela ? "Odosielam…" : "Odoslať dopyt"}
        </button>

        <a
          href={company.phoneHref}
          className="inline-flex items-center gap-2 text-sm font-semibold text-dark transition-colors duration-[var(--d-micro)] hover:text-accent-hover"
        >
          <Phone size={15} strokeWidth={2.5} aria-hidden="true" />
          <span className="tabular">alebo zavolajte {company.phone}</span>
        </a>
      </div>
    </div>
  );
}

/**
 * Súhrn do tela e-mailu.
 *
 * Prázdne riadky sú tu zámerne kvôli čitateľnosti, takže sa pole nedá
 * prefiltrovať cez `filter(Boolean)` — zmazalo by ich spolu s nevyplnenými
 * položkami. Preto sa riadky pridávajú postupne.
 */
function zostavSuhrn(sluzba: string, stav: Stav) {
  const r = ["DOPYT ZO STRÁNKY SLUŽBY", "", `Služba: ${sluzba}`, ""];

  r.push(`Meno: ${stav.meno}`);
  r.push(`Telefón: ${stav.telefon}`);
  r.push(`E-mail: ${stav.email}`);
  if (stav.adresa) r.push(`Adresa stavby: ${stav.adresa}`);

  if (stav.sprava) {
    r.push("");
    r.push(`Čo potrebuje: ${stav.sprava}`);
  }

  return r.join("\n");
}

function Pole({
  label,
  hodnota,
  onChange,
  placeholder,
  typ = "text",
  autoComplete,
}: {
  label: string;
  hodnota: string;
  onChange: (v: string) => void;
  placeholder?: string;
  typ?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-eyebrow block uppercase text-muted">{label}</span>
      <input
        type={typ}
        value={hodnota}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-card border border-line bg-white px-4 py-3 text-base text-dark outline-none transition-colors duration-[var(--d-micro)] focus:border-accent"
      />
    </label>
  );
}
