import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

type Props = {
  eyebrow: string;
  /** Text pred zvýrazneným slovom. */
  before: string;
  /** Slovo, ktoré dostane akcentové podčiarknutie. Vždy len jedno — to nosné. */
  mark?: string;
  after?: string;
  lead?: ReactNode;
  /** Svetlý variant pre tmavé pozadie. */
  light?: boolean;
  align?: "left" | "center";
  className?: string;
  id?: string;
};

export default function SectionHeading({
  eyebrow,
  before,
  mark,
  after = "",
  lead,
  light = false,
  align = "left",
  className = "",
  id,
}: Props) {
  return (
    <Reveal
      className={[
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <p
        className={`eyebrow text-eyebrow uppercase ${
          light ? "text-accent" : "text-muted"
        }`}
      >
        {eyebrow}
      </p>

      <h2
        id={id}
        className={`text-h2 mt-5 text-balance ${
          light ? "text-white" : "text-dark"
        }`}
      >
        {before}
        {mark ? <span className="mark">{mark}</span> : null}
        {after}
      </h2>

      {lead ? (
        <p
          className={`text-lead mt-5 max-w-[62ch] ${
            light ? "text-white/60" : "text-muted"
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}
