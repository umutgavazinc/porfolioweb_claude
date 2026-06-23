import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Container from "@/components/layout/Container";
import ScrollDrivenVideo from "@/components/sections/ScrollDrivenVideo";
import { Link } from "@/i18n/navigation";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  setRequestLocale(lang);

  return <AboutPageContent />;
}

function AboutPageContent() {
  const t = useTranslations("about");

  return (
    <>
      {/* Nav padding */}
      <section style={{ height: "var(--nav-height)" }} />

      {/* Scroll-driven video — tall container so video scrolls with it */}
      <ScrollDrivenVideo
        portraitSrc="/videos/about/story-portrait.webm"
        landscapeSrc="/videos/about/story-landscape.webm"
      />

      {/* About content */}
      <section
        className="py-20 lg:py-32"
        style={{ background: "var(--color-bg-primary)", paddingTop: "64px" }}
      >
        <Container>
          {/* Two column grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "clamp(24px, 5vw, 64px)",
              marginBottom: "clamp(32px, 5vw, 64px)",
            }}
          >
            {/* Left: Who Am I */}
            <div>
              <h1
                className="mb-4"
                style={{
                  fontSize: "var(--text-section-title)",
                  fontWeight: "var(--weight-light)",
                  color: "var(--color-text-primary)",
                  fontFamily: "var(--font-display)",
                  fontStyle: "normal",
                  lineHeight: "var(--leading-tight)",
                }}
              >
                {t("pageTitle")}
              </h1>

              <p
                className="mb-12"
                style={{
                  fontSize: "var(--text-body)",
                  color: "var(--color-text-secondary)",
                  lineHeight: "var(--leading-relaxed)",
                }}
              >
                {t("aboutPageIntro")}
              </p>
            </div>

            {/* Right: Tools & Software */}
            <div>
              <p
                className="uppercase mb-6"
                style={{
                  fontSize: "var(--text-label)",
                  color: "var(--color-accent)",
                  letterSpacing: "var(--tracking-wider)",
                }}
              >
                {t("toolsSoftware")}
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  "Photoshop",
                  "Illustrator",
                  "Premiere Pro",
                  "After Effects",
                  "Procreate",
                  "AI-Tools",
                ].map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-2 rounded-sm border text-center"
                    style={{
                      border: "1px solid var(--color-border)",
                      fontSize: "var(--text-small)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Experience Button */}
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <Link
              href="/experience"
              className="btn btn-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {t("myExperiences")} →
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
