import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  title: string;
  updated: string;
  children: ReactNode;
};

export default function LegalLayout({ title, updated, children }: Props) {
  return (
    <article className="bg-white pb-24 pt-[calc(var(--header-h)+3rem)]">
      <div className="container-max max-w-[72ch]">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors duration-[var(--d-micro)] hover:text-dark"
        >
          <ArrowRight
            size={15}
            strokeWidth={2.5}
            aria-hidden="true"
            className="rotate-180"
          />
          Späť na úvod
        </Link>

        <h1 className="text-h2 mt-8 text-dark">{title}</h1>
        <p className="mt-3 text-sm text-muted">Aktualizované: {updated}</p>

        <div className="mt-12 flex flex-col gap-8 text-[15px] leading-relaxed text-dark/80 [&_a]:font-semibold [&_a]:text-dark [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-4 [&_h2]:text-h3 [&_h2]:text-dark [&_li]:pl-1 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5">
          {children}
        </div>
      </div>
    </article>
  );
}
