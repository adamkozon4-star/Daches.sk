import type { CSSProperties, ElementType, ReactNode } from "react";

type Variant = "up" | "left" | "right" | "scale" | "mask";

type RevealProps = {
  children: ReactNode;
  /** Smer odhalenia. `mask` odkrýva obsah zdola nahor — pre fotky. */
  variant?: Variant;
  /** Poradie v skupine. Stagger sa zastaví po šiestej položke. */
  index?: number;
  /** Krok staggeru v ms. */
  step?: number;
  /** Fixné oneskorenie v ms (má prednosť pred `index`). */
  delay?: number;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
};

const MAX_STAGGER_STEPS = 6;

/**
 * Server komponent — nevkladá do bundlu ani bajt JavaScriptu.
 * O spustenie animácie sa stará zdieľaný observer v `MotionRoot`.
 */
export default function Reveal({
  children,
  variant = "up",
  index = 0,
  step = 80,
  delay,
  as: Tag = "div",
  className,
  style,
}: RevealProps) {
  const computed =
    delay ?? Math.min(index, MAX_STAGGER_STEPS) * step;

  return (
    <Tag
      data-reveal={variant}
      className={className}
      style={
        computed > 0
          ? ({ ...style, "--reveal-delay": `${computed}ms` } as CSSProperties)
          : style
      }
    >
      {children}
    </Tag>
  );
}
