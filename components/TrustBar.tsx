import { Eye, Home, Layers, MapPin } from "lucide-react";
import Reveal from "@/components/Reveal";
import { trustItems } from "@/lib/content";

const icons = {
  roof: Home,
  eye: Eye,
  layers: Layers,
  pin: MapPin,
} as const;

/**
 * Tmavý panel, ktorý prekrýva spodnú hranu hero — nie plochý biely pás.
 * Jeden celok so štyrmi stĺpcami, nie štyri samostatné karty.
 */
export default function TrustBar() {
  return (
    <section aria-label="Prečo Daches" className="relative bg-light pb-16 md:pb-24">
      <div className="container-max">
        <Reveal
          className="relative z-10 -mt-11 rounded-panel border border-white/8 bg-dark-2 px-6 py-8 shadow-[var(--shadow-panel)] md:-mt-16 md:px-10 md:py-12"
          variant="up"
        >
          <ul className="grid gap-8 md:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:grid-cols-4 lg:gap-8">
            {trustItems.map((item, i) => {
              const Icon = icons[item.icon];

              return (
                <li
                  key={item.title}
                  data-reveal="up"
                  style={
                    { "--reveal-delay": `${i * 90}ms` } as React.CSSProperties
                  }
                  className="group border-t border-line-dark pt-5 transition-colors duration-[var(--d-short)] hover:border-accent/35 md:border-t-0 lg:border-l lg:pl-8 lg:pt-0 lg:first:border-l-0 lg:first:pl-0"
                >
                  <div className="flex items-center gap-3 lg:block">
                    <Icon
                      size={22}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      className="icon-draw shrink-0 text-accent opacity-90 transition-opacity duration-[var(--d-short)] group-hover:opacity-100"
                    />
                    <h3 className="text-h3 text-white/90 transition-colors duration-[var(--d-short)] group-hover:text-white lg:mt-5">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-white/58">
                    {item.text}
                  </p>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
