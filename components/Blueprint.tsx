/**
 * Technický výkres krovu ako dekoratívna vrstva pozadia.
 *
 * Čiary sa pri vstupe do viewportu samy nakreslia (stroke-dashoffset) — je to
 * podpis remesla, nie efekt. Musí to byť sotva viditeľné: ak si všimneš pozadie
 * skôr ako text, je príliš silné.
 */
type Props = {
  className?: string;
  /** Tmavé pozadie → svetlejšie čiary. */
  light?: boolean;
};

/** `--len` nemusí sedieť presne, stačí, keď je >= dĺžky ťahu. */
const strokes: { d: string; len: number }[] = [
  // Väzný trám
  { d: "M20 300 H580", len: 560 },
  // Krokvy
  { d: "M20 300 L300 96", len: 350 },
  { d: "M580 300 L300 96", len: 350 },
  // Hrebeňová väznica
  { d: "M300 96 V300", len: 210 },
  // Klieština
  { d: "M120 226 H480", len: 360 },
  // Vzpery
  { d: "M180 300 L300 170", len: 180 },
  { d: "M420 300 L300 170", len: 180 },
  // Stĺpiky
  { d: "M180 300 V226", len: 80 },
  { d: "M420 300 V226", len: 80 },
  // Presahy strechy
  { d: "M0 314 L20 300", len: 30 },
  { d: "M600 314 L580 300", len: 30 },
  // Kótovacia linka
  { d: "M20 348 H580", len: 560 },
];

export default function Blueprint({ className = "", light = false }: Props) {
  return (
    <div
      aria-hidden="true"
      data-reveal="up"
      className={`blueprint pointer-events-none absolute select-none ${className}`}
    >
      <svg
        viewBox="0 0 600 360"
        fill="none"
        stroke={light ? "rgba(255,255,255,0.10)" : "rgba(17,17,17,0.07)"}
        strokeWidth="1"
        strokeLinecap="round"
        className="h-full w-full"
      >
        {strokes.map((s, i) => (
          <path
            key={s.d}
            d={s.d}
            style={
              {
                "--len": s.len,
                "--i": i,
              } as React.CSSProperties
            }
          />
        ))}
      </svg>
    </div>
  );
}
