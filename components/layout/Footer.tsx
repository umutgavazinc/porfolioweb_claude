"use client";

import { useTranslations } from "next-intl";
import Container from "./Container";

export default function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="section-dark border-t"
      style={{
        borderColor: "rgba(255, 255, 255, 0.08)",
        paddingTop: "96px",
        paddingBottom: "96px",
      }}
    >
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Kolonna 1: Contact */}
          <div>
            <p
              className="text-label"
              style={{ color: "var(--color-accent)", marginBottom: "16px" }}
            >
              {t("contactLabel")}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <a
                href="mailto:umutgavaz.inc@gmail.com"
                className="transition-colors"
                style={{
                  color: "rgba(244, 240, 237, 0.72)",
                  fontSize: "13px",
                }}
              >
                umutgavaz.inc@gmail.com
              </a>
              <p
                style={{
                  color: "rgba(244, 240, 237, 0.72)",
                  fontSize: "13px",
                  margin: 0,
                }}
              >
                {t("location")}
              </p>
            </div>
          </div>

          {/* Kolonna 3: Navigation */}
          <div>
            <p
              className="text-label"
              style={{ color: "var(--color-accent)", marginBottom: "16px" }}
            >
              {t("navigationLabel")}
            </p>
            <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { key: "Works", label: t("navWorks") },
                { key: "About", label: t("navAbout") },
                { key: "Disciplines", label: t("navDisciplines") },
                { key: "Contact", label: t("navContact") },
              ].map((link) => (
                <a
                  key={link.key}
                  href={`#${link.key.toLowerCase()}`}
                  className="transition-colors"
                  style={{
                    color: "rgba(244, 240, 237, 0.72)",
                    fontSize: "13px",
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Kolonna 4: Disciplines */}
          <div>
            <p
              className="text-label"
              style={{ color: "var(--color-accent)", marginBottom: "16px" }}
            >
              {t("disciplinesLabel")}
            </p>
            <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { key: "graphic", label: t("discGraphic") },
                { key: "motion", label: t("discMotion") },
                { key: "video", label: t("discVideo") },
                { key: "illustration", label: t("discIllustration") },
                { key: "ai", label: t("discAI") },
              ].map((discipline) => (
                <a
                  key={discipline.key}
                  href="#"
                  className="transition-colors"
                  style={{
                    color: "rgba(244, 240, 237, 0.72)",
                    fontSize: "13px",
                  }}
                >
                  {discipline.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Kolonna 5: Sosyaller */}
          <div>
            <p
              className="text-label"
              style={{ color: "var(--color-accent)", marginBottom: "16px" }}
            >
              {t("socialLabel")}
            </p>
            <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { name: "Behance", url: "https://www.behance.net/umutgavaz" },
                { name: "Vimeo", url: "https://vimeo.com/user85741859" },
                {
                  name: "Instagram",
                  url: "https://www.instagram.com/hexistance/",
                },
                {
                  name: "LinkedIn",
                  url: "https://www.linkedin.com/in/umut-mu-gavaz",
                },
              ].map(({ name, url }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                  style={{
                    color: "rgba(244, 240, 237, 0.72)",
                    fontSize: "13px",
                  }}
                >
                  {name}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Alt divider */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            paddingTop: "48px",
            marginTop: "48px",
          }}
        >
          <p
            style={{
              color: "rgba(244, 240, 237, 0.5)",
              fontSize: "12px",
              margin: 0,
            }}
          >
            {t("copyright")}
          </p>
        </div>
      </Container>
    </footer>
  );
}
