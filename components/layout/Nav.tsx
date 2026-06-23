"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageToggle from "@/components/ui/LanguageToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/works", key: "works" },
  { href: "/about", key: "about" },
  { href: "/experience", key: "experience" },
  { href: "/contact", key: "contact" },
] as const;

export default function Nav() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        height: "var(--nav-height)",
        backgroundColor: "rgba(5, 5, 5, 0.45)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid",
        borderColor: "var(--color-border-soft)",
      }}
    >
      <div className="container-site h-full flex items-center justify-between">
        {/* Logo — sol */}
        <Link
          href="/"
          className="text-sm font-bold tracking-wider hover:opacity-70 transition-opacity"
          style={{
            color: "var(--color-text-primary)",
            fontSize: "12px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          UG
        </Link>

        {/* Main nav — ortada (desktop sadece) */}
        <div className="hidden md:flex items-center" style={{ gap: "32px" }}>
          {navLinks.map(({ href, key }) => {
            const isActive = pathname === href;
            const text = t(key as "works" | "about" | "experience" | "contact");
            // Use appropriate locale for uppercase conversion
            const upperCaseText = locale === "tr" ? text.toLocaleUpperCase("tr-TR") : text.toLocaleUpperCase("en-US");
            return (
              <Link
                key={key}
                href={href}
                className="transition-all duration-300"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "var(--text-nav)",
                  letterSpacing: "var(--letter-nav)",
                  color: isActive
                    ? "rgba(244, 240, 237, 1)"
                    : "rgba(244, 240, 237, 0.72)",
                  fontWeight: "400",
                }}
              >
                {upperCaseText}
              </Link>
            );
          })}
        </div>

        {/* Sağ: Email + Lang toggle */}
        <div className="flex items-center gap-4">
          {/* Email — mobile'da gizli */}
          <a
            href="mailto:umutgavaz.inc@gmail.com"
            className="hidden lg:inline hover:opacity-70 transition-opacity"
            style={{
              color: "rgba(244, 240, 237, 0.72)",
              fontSize: "var(--text-nav)",
              letterSpacing: "0.02em",
            }}
          >
            umutgavaz.inc@gmail.com
          </a>

          {/* Dil toggle */}
          <LanguageToggle />
        </div>
      </div>
    </nav>
  );
}
