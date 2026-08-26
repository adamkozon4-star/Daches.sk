"use client";

import type { ReactNode } from "react";
import { Check } from "lucide-react";

/** Vyberateľná karta — používa sa pre typ projektu, tvar strechy, krytinu. */
export function Karta({
  nazov,
  popis,
  vybrane,
  onClick,
  detaily,
  odznak,
}: {
  nazov: string;
  popis?: string;
  vybrane: boolean;
  onClick: () => void;
  detaily?: readonly string[];
  odznak?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={vybrane}
      className={`relative flex h-full flex-col rounded-panel border p-5 text-left transition-[border-color,background-color,transform] duration-[var(--d-short)] hover:-translate-y-[2px] ${
        vybrane
          ? "border-accent bg-accent/8"
          : "border-line bg-white hover:border-dark/20"
      }`}
    >
      {odznak ? (
        <span className="text-eyebrow absolute -top-2.5 left-5 rounded-full bg-accent px-2.5 py-1 uppercase text-dark">
          {odznak}
        </span>
      ) : null}

      <span className="flex items-start justify-between gap-3">
        <span className="text-h3 text-dark">{nazov}</span>
        <span
          aria-hidden="true"
          className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors duration-[var(--d-micro)] ${
            vybrane ? "border-accent bg-accent" : "border-line"
          }`}
        >
          {vybrane ? <Check size={12} strokeWidth={3} className="text-dark" /> : null}
        </span>
      </span>

      {popis ? (
        <span className="mt-2 text-sm leading-relaxed text-muted">{popis}</span>
      ) : null}

      {detaily?.length ? (
        <ul className="mt-4 flex flex-col gap-1.5 border-t border-line pt-4">
          {detaily.map((d) => (
            <li key={d} className="text-[13px] leading-snug text-muted">
              {d}
            </li>
          ))}
        </ul>
      ) : null}
    </button>
  );
}

/** Kompaktné prepínacie tlačidlo — sklon, trieda, malé voľby. */
export function Prepinac({
  nazov,
  popis,
  vybrane,
  onClick,
}: {
  nazov: string;
  popis?: string;
  vybrane: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={vybrane}
      className={`rounded-card border px-4 py-3 text-left transition-colors duration-[var(--d-micro)] ${
        vybrane
          ? "border-accent bg-accent/10 text-dark"
          : "border-line bg-white text-muted hover:border-dark/20 hover:text-dark"
      }`}
    >
      <span className="block text-sm font-semibold">{nazov}</span>
      {popis ? <span className="tabular block text-xs">{popis}</span> : null}
    </button>
  );
}

/** Zaškrtávacia položka doplnku. */
export function Zaskrtnutie({
  nazov,
  zaskrtnute,
  onChange,
  children,
}: {
  nazov: string;
  zaskrtnute: boolean;
  onChange: (v: boolean) => void;
  children?: ReactNode;
}) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-card border p-4 transition-colors duration-[var(--d-micro)] ${
        zaskrtnute ? "border-accent bg-accent/8" : "border-line bg-white hover:border-dark/20"
      }`}
    >
      <input
        type="checkbox"
        checked={zaskrtnute}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <span
        aria-hidden="true"
        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded border transition-colors duration-[var(--d-micro)] ${
          zaskrtnute ? "border-accent bg-accent" : "border-line"
        }`}
      >
        {zaskrtnute ? <Check size={12} strokeWidth={3} className="text-dark" /> : null}
      </span>

      <span className="min-w-0">
        <span className="block text-sm font-semibold text-dark">{nazov}</span>
        {children}
      </span>
    </label>
  );
}

/** Číselné pole s jednotkou. */
export function Pole({
  label,
  hodnota,
  onChange,
  jednotka,
  napoveda,
  chyba,
  min,
  max,
}: {
  label: string;
  hodnota: number | "";
  onChange: (v: number | "") => void;
  jednotka?: string;
  napoveda?: string;
  chyba?: string;
  min?: number;
  max?: number;
}) {
  return (
    <label className="block">
      <span className="text-eyebrow block uppercase text-muted">{label}</span>

      <span className="relative mt-2 block">
        <input
          type="number"
          inputMode="numeric"
          value={hodnota}
          min={min}
          max={max}
          onChange={(e) =>
            onChange(e.target.value === "" ? "" : Number(e.target.value))
          }
          className={`tabular w-full rounded-card border bg-white px-4 py-3 text-base text-dark outline-none transition-colors duration-[var(--d-micro)] focus:border-accent ${
            chyba ? "border-red-400" : "border-line"
          } ${jednotka ? "pr-14" : ""}`}
        />
        {jednotka ? (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted">
            {jednotka}
          </span>
        ) : null}
      </span>

      {chyba ? (
        <span className="mt-1.5 block text-xs leading-relaxed text-red-500">
          {chyba}
        </span>
      ) : napoveda ? (
        <span className="mt-1.5 block text-xs leading-relaxed text-muted">
          {napoveda}
        </span>
      ) : null}
    </label>
  );
}

/** Ukazovateľ krokov. */
export function Kroky({
  kroky,
  aktualny,
  onSkoc,
}: {
  kroky: string[];
  aktualny: number;
  onSkoc: (i: number) => void;
}) {
  return (
    <ol className="-mx-1 flex items-center gap-1 overflow-x-auto px-1 pb-1">
      {kroky.map((nazov, i) => {
        const hotovy = i < aktualny;
        const teraz = i === aktualny;

        return (
          <li key={nazov} className="flex shrink-0 items-center">
            <button
              type="button"
              onClick={() => (hotovy ? onSkoc(i) : undefined)}
              disabled={!hotovy}
              aria-current={teraz ? "step" : undefined}
              className={`flex items-center gap-2 rounded-card px-2 py-1.5 transition-colors duration-[var(--d-micro)] ${
                hotovy ? "cursor-pointer hover:bg-light" : "cursor-default"
              }`}
            >
              <span
                className={`tabular grid h-7 w-7 place-items-center rounded-full text-xs font-bold transition-colors duration-[var(--d-short)] ${
                  teraz
                    ? "bg-accent text-dark"
                    : hotovy
                      ? "bg-dark text-white"
                      : "border border-line text-muted"
                }`}
              >
                {hotovy ? <Check size={13} strokeWidth={3} /> : i + 1}
              </span>
              <span
                className={`text-eyebrow hidden uppercase sm:block ${
                  teraz ? "text-dark" : "text-muted"
                }`}
              >
                {nazov}
              </span>
            </button>

            {i < kroky.length - 1 ? (
              <span
                aria-hidden="true"
                className={`mx-1 h-px w-4 sm:w-8 ${hotovy ? "bg-dark" : "bg-line"}`}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
