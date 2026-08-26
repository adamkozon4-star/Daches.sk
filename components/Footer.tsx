import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { company, footer, navLinks } from "@/lib/content";
import { brandLogo } from "@/lib/images";

export default function Footer() {
  return (
    <footer className="bg-dark">
      <div className="container-max py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Image
              src={brandLogo}
              alt={company.name}
              loading="lazy"
              sizes="360px"
              className="h-12 w-auto"
            />
            <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-white/58">
              {footer.tagline}
            </p>

            <div className="mt-7 flex flex-col gap-3 text-sm">
              <a
                href={company.phoneHref}
                className="tabular inline-flex items-center gap-2.5 font-semibold text-white transition-colors duration-[var(--d-micro)] hover:text-accent"
              >
                <Phone size={15} strokeWidth={2} aria-hidden="true" />
                {company.phone}
              </a>
              <p className="inline-flex items-center gap-2.5 text-white/58">
                <MapPin size={15} strokeWidth={2} aria-hidden="true" />
                {company.street}, {company.postalCode} {company.city}
              </p>
            </div>
          </div>

          <nav aria-label="Navigácia v pätke">
            <p className="text-eyebrow uppercase text-white/40">Navigácia</p>
            <ul className="mt-5 flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 transition-colors duration-[var(--d-micro)] hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-eyebrow uppercase text-white/40">Právne</p>
            <ul className="mt-5 flex flex-col gap-3">
              {footer.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition-colors duration-[var(--d-micro)] hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line-dark pt-7 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name} Všetky práva vyhradené.
          </p>
          <p>
            Web navrhol a vytvoril{" "}
            <a
              href={footer.author.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-[var(--d-micro)] hover:text-accent"
            >
              {footer.author.label}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
