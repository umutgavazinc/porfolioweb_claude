import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Container from "@/components/layout/Container";

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  setRequestLocale(lang);

  return <ExperiencePageContent lang={lang} />;
}

function ExperiencePageContent({ lang }: { lang: string }) {
  const t = useTranslations("experience");

  const education = lang === "tr" ? [
    {
      school: "Yenimahalle Zeynep-Salih Alp Anadolu Meslek Lisesi",
      location: "Ankara",
      year: "2015",
      field: "",
    },
    {
      school: "Hacettepe Üniversitesi",
      location: "Ankara",
      year: "2020",
      field: "G. Sanatlar Lisans Dip. - Grafik Ana sanat dalı",
    },
  ] : [
    {
      school: "Yenimahalle Zeynep-Salih Alp Vocational High School",
      location: "Ankara",
      year: "2015",
      field: "",
    },
    {
      school: "Hacettepe University",
      location: "Ankara",
      year: "2020",
      field: "B.A. in Fine Arts - Graphic Design",
    },
  ];

  const workExperience = lang === "tr" ? [
    {
      company: "Nata Holding",
      location: "Ankara",
      position: "Motion Designer, Videographer, Video Editor",
      period: "2025 - Present",
    },
    {
      company: "Freelance Graphic Designer",
      location: "Remote",
      position: "Freelance",
      period: "2017 - Present",
    },
    {
      company: "Ahlatçı Holding Advertising Department",
      location: "Ankara",
      position: "Graphic Designer",
      period: "2025 - 2025",
    },
    {
      company: "TherabbitCo Advertising Agency",
      location: "Ankara",
      position: "Senior Graphic Designer",
      period: "2021 - 2022",
    },
    {
      company: "V8Craft Branding Agency",
      location: "Ankara",
      position: "Social Media Manager",
      period: "2021 - 2021",
    },
    {
      company: "Vipart Advertising Agency",
      location: "Ankara",
      position: "Intern",
      period: "2020 - 2021",
    },
  ] : [
    {
      company: "Nata Holding",
      location: "Ankara",
      position: "Motion Designer, Videographer, Video Editor",
      period: "2025 - Present",
    },
    {
      company: "Freelance Graphic Designer",
      location: "Remote",
      position: "Freelance",
      period: "2017 - Present",
    },
    {
      company: "Ahlatçı Holding Advertising Department",
      location: "Ankara",
      position: "Graphic Designer",
      period: "2025 - 2025",
    },
    {
      company: "TherabbitCo Advertising Agency",
      location: "Ankara",
      position: "Senior Graphic Designer",
      period: "2021 - 2022",
    },
    {
      company: "V8Craft Branding Agency",
      location: "Ankara",
      position: "Social Media Manager",
      period: "2021 - 2021",
    },
    {
      company: "Vipart Advertising Agency",
      location: "Ankara",
      position: "Intern",
      period: "2020 - 2021",
    },
  ];

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

          {/* Education & Work Experience Container */}
          <div
            className="flex flex-col md:flex-row"
            style={{
              gap: "clamp(24px, 5vw, 48px)",
              padding: "clamp(24px, 4vw, 48px)",
              borderRadius: "24px",
              background: "rgba(255, 255, 255, 0.03)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* Education */}
            <div style={{ flex: 1 }}>
              <h2
                style={{
                  fontSize: "var(--text-card-title)",
                  fontWeight: "var(--weight-semi)",
                  color: "var(--color-accent)",
                  marginBottom: "32px",
                  textTransform: "uppercase",
                  letterSpacing: "var(--letter-nav)",
                }}
              >
                {t("education")}
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                {education.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      borderLeft: "2px solid rgba(217, 83, 79, 0.5)",
                      paddingLeft: "24px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "8px",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "var(--color-text-primary)",
                          margin: 0,
                        }}
                      >
                        {item.school}
                      </h3>
                      <div
                        style={{
                          color: "rgba(244, 240, 237, 0.5)",
                          fontSize: "14px",
                        }}
                      >
                        {item.year}
                      </div>
                    </div>
                    <p
                      style={{
                        color: "rgba(244, 240, 237, 0.72)",
                        fontSize: "14px",
                        margin: 0,
                        marginBottom: "8px",
                      }}
                    >
                      {item.location}
                    </p>
                    {item.field && (
                      <p
                        style={{
                          color: "rgba(244, 240, 237, 0.72)",
                          fontSize: "14px",
                          margin: 0,
                        }}
                      >
                        {item.field}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Work Experience */}
            <div style={{ flex: 1 }}>
              <h2
                style={{
                  fontSize: "var(--text-card-title)",
                  fontWeight: "var(--weight-semi)",
                  color: "var(--color-accent)",
                  marginBottom: "32px",
                  textTransform: "uppercase",
                  letterSpacing: "var(--letter-nav)",
                }}
              >
                {t("professional")}
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                {workExperience.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      borderLeft: "2px solid rgba(217, 83, 79, 0.5)",
                      paddingLeft: "24px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "8px",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "var(--color-text-primary)",
                          margin: 0,
                        }}
                      >
                        {item.company}
                      </h3>
                      <div
                        style={{
                          color: "rgba(244, 240, 237, 0.5)",
                          fontSize: "14px",
                          whiteSpace: "nowrap",
                          marginLeft: "16px",
                        }}
                      >
                        {item.period}
                      </div>
                    </div>
                    <p
                      style={{
                        color: "rgba(244, 240, 237, 0.72)",
                        fontSize: "14px",
                        margin: 0,
                        marginBottom: "4px",
                      }}
                    >
                      <strong>{item.position}</strong>
                    </p>
                    <p
                      style={{
                        color: "rgba(244, 240, 237, 0.5)",
                        fontSize: "13px",
                        margin: 0,
                      }}
                    >
                      {item.location}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
