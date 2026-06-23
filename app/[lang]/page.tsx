import { setRequestLocale, getTranslations } from "next-intl/server";
import Container from "@/components/layout/Container";
import { Link } from "@/i18n/navigation";
import AboutSection from "@/components/sections/AboutSection";
import HeroSection from "@/components/HeroSection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  setRequestLocale(lang);
  const t = await getTranslations("home");

  return (
    <>
      <HeroSection
        heroSub={t("heroSub")}
        viewPortfolio={t("viewPortfolio")}
        aboutMe={t("aboutMe")}
      />
      <AboutSection />
      <DisciplinesSection t={t} />
      <ClosingBannerSection t={t} />
    </>
  );
}


function DisciplinesSection({ t }: { t: any }) {
  const disciplines = [
    {
      icon: "◆",
      titleKey: "graphicDesign",
      descKey: "graphicDesignDesc",
    },
    {
      icon: "●",
      titleKey: "motionDesign",
      descKey: "motionDesignDesc",
    },
    {
      icon: "✦",
      titleKey: "aiCreation",
      descKey: "aiCreationDesc",
    },
  ];

  return (
    <section
      className="relative"
      style={{
        paddingTop: "var(--spacing-section)",
        paddingBottom: "var(--spacing-section)",
        background: "var(--color-bg-primary)",
      }}
    >
      <Container>
        <div
          className="text-label"
          style={{
            marginBottom: "56px",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--color-accent)",
          }}
        >
          {t("whatIDo")}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "clamp(24px, 5vw, 48px)",
            maxWidth: "100%",
          }}
        >
          {disciplines.map((d, i) => (
            <div
              key={i}
              style={{
                padding: "32px",
                borderRadius: "24px",
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                transition: "all 300ms ease",
              }}
              className="group"
            >
              <div>
                <p
                  style={{
                    fontSize: "28px",
                    margin: 0,
                    marginBottom: "16px",
                    opacity: 0.6,
                    color: "var(--color-accent)",
                  }}
                >
                  {d.icon}
                </p>

                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "var(--color-text-primary)",
                    marginBottom: "12px",
                    margin: 0,
                    marginBottom: "12px",
                    lineHeight: "1.3",
                  }}
                >
                  {t(d.titleKey)}
                </h3>

                <p
                  style={{
                    fontSize: "15px",
                    color: "rgba(244, 240, 237, 0.7)",
                    lineHeight: "1.6",
                    margin: 0,
                    fontWeight: 400,
                  }}
                >
                  {t(d.descKey)}
                </p>
              </div>

              <Link
                href="/contact"
                style={{
                  alignSelf: "flex-start",
                  fontSize: "12px",
                  color: "rgba(244, 240, 237, 0.6)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  transition: "color 300ms ease",
                  textDecoration: "none",
                  marginTop: "auto",
                }}
                className="group-hover:text-accent"
              >
                {t("explore")} {'>'}
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}


function ClosingBannerSection({ t }: { t: any }) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        paddingTop: "32px",
        paddingBottom: "var(--spacing-section)",
        background: "var(--color-bg-primary)",
      }}
    >
      <Container>
        <div
          className="relative overflow-hidden closing-banner-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "start",
            gap: "80px",
            padding: "64px 80px",
            borderRadius: "28px",
            border: "1px solid rgba(217, 83, 79, 0.3)",
            minHeight: "500px",
          }}
        >
          {/* Video Background */}
          <video
            src="/videos/about/port-kesf.webm"
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0,
            }}
          />
          {/* Overlay for readability - Left to right gradient */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(90deg, rgba(45, 22, 24, 0.95) 0%, rgba(45, 22, 24, 0.8) 40%, rgba(26, 26, 26, 0.5) 70%, rgba(26, 26, 26, 0.2) 100%)",
              zIndex: 1,
            }}
          />

          {/* Left: Title and Description stacked */}
          <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: "24px" }}>
            <h2
              className="heading-hero"
              style={{
                fontSize: "clamp(62px, 6.5vw, 109px)",
                marginBottom: 0,
                maxWidth: "400px",
              }}
            >
              {t("divePortfolio")}
            </h2>

            <p
              style={{
                fontSize: "var(--text-body)",
                color: "rgba(244, 240, 237, 0.72)",
                lineHeight: "var(--line-body)",
                maxWidth: "280px",
                margin: 0,
              }}
            >
              {t("ctaDescription")}
            </p>
          </div>

          {/* Center: Button - Absolutely centered */}
          <Link
            href="/works"
            className="btn btn-primary"
            style={{
              width: "56px",
              height: "56px",
              padding: 0,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
            }}
          >
            →
          </Link>
        </div>
      </Container>
    </section>
  );
}
