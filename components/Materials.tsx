import { Bolt, Droplets, Frame, Home, TreePine, Wrench } from "lucide-react";
import Blueprint from "@/components/Blueprint";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { materials } from "@/lib/content";

/** Line-art ikony namiesto emoji — emoji vyzerá na každom systéme inak. */
const icons = {
  timber: TreePine,
  roof: Home,
  water: Droplets,
  screw: Bolt,
  frame: Frame,
  gutter: Wrench,
} as const;

export default function Materials() {
  return (
    <section
      id="materialy"
      aria-labelledby="materialy-nadpis"
      className="section-y relative overflow-hidden bg-white"
    >
      <Blueprint className="-right-24 top-16 h-[420px] w-[700px] opacity-60" />

      <div className="container-max relative">
        <SectionHeading
          id="materialy-nadpis"
          eyebrow={materials.eyebrow}
          before={materials.titleBefore}
          mark={materials.titleMark}
          after={materials.titleAfter}
          lead={materials.lead}
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {materials.items.map((item, i) => {
            const Icon = icons[item.icon];

            return (
              <Reveal
                as="li"
                key={item.title}
                index={i}
                step={60}
                className="group flex items-center gap-4 rounded-panel border border-line bg-light px-6 py-6 transition-[transform,border-color,background-color] duration-[var(--d-short)] hover:-translate-y-[3px] hover:border-accent/40 hover:bg-white"
              >
                <Icon
                  size={24}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="icon-draw shrink-0 text-dark"
                />
                <h3 className="text-h3 text-dark">{item.title}</h3>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
