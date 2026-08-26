"use client";

import { useState } from "react";
import { AlertTriangle, Phone, Printer, Send } from "lucide-react";
import { company } from "@/lib/content";
import { DPH, STAV } from "@/lib/kalkulator/cennik";
import { odosliDopyt, type Kontakt } from "@/lib/kalkulator/odoslanie";
import { cislo, rozsahEur, zaokruhliRozsah } from "@/lib/kalkulator/vypocet";
import type { Vstup, Vysledok as TypVysledok } from "@/lib/kalkulator/typy";

const prazdnyKontakt: Kontakt = {
  meno: "",
  telefon: "",
  email: "",
  adresa: "",
  poznamka: "",
};

export default function Vysledok({
  vstup,
  vysledok,
}: {
  vstup: Vstup;
  vysledok: TypVysledok;
}) {
  const [kontakt, setKontakt] = useState<Kontakt>(prazdnyKontakt);
  const [suhlas, setSuhlas] = useState(false);
  const [odoslane, setOdoslane] = useState(false);
  const [chyba, setChyba] = useState<string | null>(null);

  const material = vysledok.polozky.filter((p) => p.skupina === "material");
  const praca = vysledok.polozky.filter((p) => p.skupina === "praca");
  const celkom = zaokruhliRozsah(vysledok.spolu);

  const uprav = (k: keyof Kontakt, v: string) =>
    setKontakt((p) => ({ ...p, [k]: v }));

  const posli = async () => {
    if (!kontakt.meno.trim() || !kontakt.telefon.trim() || !kontakt.email.trim()) {
      setChyba("Vyplňte prosím meno, telefón a e-mail.");
      return;
    }
    if (!suhlas) {
      setChyba("Bez súhlasu so spracovaním údajov vám nevieme pripraviť ponuku.");
      return;
    }

    setChyba(null);
    await odosliDopyt(vstup, vysledok, kontakt);
    setOdoslane(true);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Cena */}
      <div className="rounded-panel border border-accent/40 bg-accent/8 p-6 md:p-8">
        <p className="text-eyebrow uppercase text-muted">
          Orientačný rozsah ceny (bez DPH)
        </p>
        <p className="tabular mt-3 text-h2 text-dark">{rozsahEur(celkom)}</p>

        <p className="tabular mt-3 text-sm text-muted">
          Približne {rozsahEur(vysledok.zaM2)} za m² strechy · k cene sa
          pripočítava DPH {DPH} %
        </p>
      </div>

      {STAV === "navrh" ? (
        <div className="flex gap-3 rounded-panel border border-dashed border-line bg-light p-5">
          <AlertTriangle
            size={18}
            strokeWidth={2}
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-dark"
          />
          <p className="text-sm leading-relaxed text-dark/80">
            <strong className="font-semibold">
              Sadzby zatiaľ nie sú potvrdené firmou.
            </strong>{" "}
            Výpočet vychádza z bežných trhových cien a slúži len na hrubú
            predstavu. Skutočnú cenu vám povieme po obhliadke — je zadarmo
            a nezáväzná.
          </p>
        </div>
      ) : null}

      {/* Rozpis */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-line">
              <th className="text-eyebrow py-3 text-left uppercase text-muted">
                Položka
              </th>
              <th className="text-eyebrow py-3 text-right uppercase text-muted">
                Výmer
              </th>
              <th className="text-eyebrow py-3 text-right uppercase text-muted">
                Cena
              </th>
            </tr>
          </thead>

          <tbody>
            {[
              { nazov: "Materiál", polozky: material, suma: vysledok.material },
              { nazov: "Práca", polozky: praca, suma: vysledok.praca },
            ].map((skupina) =>
              skupina.polozky.length ? (
                <Skupina key={skupina.nazov} {...skupina} />
              ) : null,
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap gap-3 print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="btn border border-line text-dark hover:bg-light"
        >
          <Printer size={16} strokeWidth={2.5} aria-hidden="true" />
          Uložiť ako PDF
        </button>
        <a href={company.phoneHref} className="btn border border-line text-dark hover:bg-light">
          <Phone size={16} strokeWidth={2.5} aria-hidden="true" />
          <span className="tabular">{company.phone}</span>
        </a>
      </div>

      {/* Dopyt */}
      <div className="rounded-panel border border-line bg-light p-6 md:p-8 print:hidden">
        {odoslane ? (
          <div className="py-6 text-center">
            <h3 className="text-h3 text-dark">Otvorili sme vám e-mail</h3>
            <p className="mx-auto mt-3 max-w-[46ch] text-sm leading-relaxed text-muted">
              V e-mailovom programe máte pripravenú správu so súhrnom projektu.
              Stačí ju odoslať. Ak sa nič neotvorilo, zavolajte nám na{" "}
              <a href={company.phoneHref} className="font-semibold text-dark">
                {company.phone}
              </a>
              .
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-h3 text-dark">Chcem presnú cenu</h3>
            <p className="mt-2 max-w-[54ch] text-sm leading-relaxed text-muted">
              Prejdeme si zadanie, dohodneme obhliadku a pripravíme záväznú
              ponuku. Nezáväzne a bezplatne.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <PoleTextu
                label="Meno a priezvisko *"
                hodnota={kontakt.meno}
                onChange={(v) => uprav("meno", v)}
                placeholder="Ján Novák"
              />
              <PoleTextu
                label="Telefón *"
                hodnota={kontakt.telefon}
                onChange={(v) => uprav("telefon", v)}
                placeholder="+421 ..."
                typ="tel"
              />
              <PoleTextu
                label="E-mail *"
                hodnota={kontakt.email}
                onChange={(v) => uprav("email", v)}
                placeholder="jan@example.com"
                typ="email"
              />
              <PoleTextu
                label="Adresa stavby"
                hodnota={kontakt.adresa}
                onChange={(v) => uprav("adresa", v)}
                placeholder="Obec, ulica"
              />
            </div>

            <label className="mt-4 block">
              <span className="text-eyebrow block uppercase text-muted">
                Poznámka k projektu
              </span>
              <textarea
                rows={3}
                value={kontakt.poznamka}
                onChange={(e) => uprav("poznamka", e.target.value)}
                placeholder="Čokoľvek, čo by sme mali vedieť."
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
                Súhlasím so spracovaním osobných údajov na účel vypracovania
                cenovej ponuky.{" "}
                <a
                  href="/ochrana-osobnych-udajov"
                  className="underline underline-offset-2 hover:text-dark"
                >
                  Ochrana osobných údajov
                </a>
              </span>
            </label>

            {chyba ? (
              <p className="mt-4 text-sm text-red-500">{chyba}</p>
            ) : null}

            <button type="button" onClick={posli} className="btn btn-accent mt-6">
              <Send size={16} strokeWidth={2.5} aria-hidden="true" />
              Odoslať dopyt
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function Skupina({
  nazov,
  polozky,
  suma,
}: {
  nazov: string;
  polozky: TypVysledok["polozky"];
  suma: TypVysledok["material"];
}) {
  return (
    <>
      <tr>
        <td colSpan={3} className="pt-6 pb-2">
          <span className="text-eyebrow uppercase text-dark">{nazov}</span>
        </td>
      </tr>

      {polozky.map((p) => (
        <tr key={p.nazov} className="border-b border-line/60">
          <td className="py-2.5 pr-4 text-dark/80">{p.nazov}</td>
          <td className="tabular whitespace-nowrap py-2.5 text-right text-muted">
            {cislo(p.vymer)} {p.jednotka}
          </td>
          <td className="tabular whitespace-nowrap py-2.5 pl-4 text-right text-dark">
            {rozsahEur(p.cena)}
          </td>
        </tr>
      ))}

      <tr className="border-b border-line">
        <td className="py-3 font-semibold text-dark" colSpan={2}>
          {nazov} spolu
        </td>
        <td className="tabular whitespace-nowrap py-3 pl-4 text-right font-semibold text-dark">
          {rozsahEur(suma)}
        </td>
      </tr>
    </>
  );
}

function PoleTextu({
  label,
  hodnota,
  onChange,
  placeholder,
  typ = "text",
}: {
  label: string;
  hodnota: string;
  onChange: (v: string) => void;
  placeholder?: string;
  typ?: string;
}) {
  return (
    <label className="block">
      <span className="text-eyebrow block uppercase text-muted">{label}</span>
      <input
        type={typ}
        value={hodnota}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-card border border-line bg-white px-4 py-3 text-base text-dark outline-none transition-colors duration-[var(--d-micro)] focus:border-accent"
      />
    </label>
  );
}
