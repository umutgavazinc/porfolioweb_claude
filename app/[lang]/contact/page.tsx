import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Container from "@/components/layout/Container";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  setRequestLocale(lang);

  return <ContactPageContent />;
}

function ContactPageContent() {
  const t = useTranslations("contact");

  return (
    <>
      {/* Nav padding */}
      <section
        style={{ height: "var(--nav-height)" }}
        className="section-dark"
      />

      {/* Main */}
      <section className="section section-dark">
        <Container>
          <h1 className="heading-section">{t("title")}</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px]">
            {/* Left: Intro text */}
            <div>
              <p className="body mb-12 leading-relaxed">
                {t("intro")}
              </p>

              <div>
                <p
                  className="label mb-4"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {t("email")}
                </p>
                <a
                  href="mailto:umutgavaz.inc@gmail.com"
                  className="heading-card hover:opacity-70 transition-opacity"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  umutgavaz.inc@gmail.com
                </a>
              </div>
            </div>

            {/* Right: Socials */}
            <div>
              <p
                className="label mb-8"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {t("socials")}
              </p>

              <div className="flex flex-col gap-0">
                {[
                  {
                    label: "Behance",
                    href: "https://www.behance.net/umutgavaz",
                  },
                  {
                    label: "Vimeo",
                    href: "https://vimeo.com/user85741859",
                  },
                  {
                    label: "Instagram @hexistance",
                    href: "https://www.instagram.com/hexistance/",
                  },
                  {
                    label: "LinkedIn",
                    href: "https://www.linkedin.com/in/umut-mu-gavaz",
                  },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between py-4 border-b group hover:text-white/80 transition-colors"
                    style={{
                      borderColor: "var(--color-border)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    <span className="label">{label}</span>
                    <span
                      className="label group-hover:translate-x-1 transition-transform"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
