"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Container from "@/components/layout/Container";
import { type Project, type Category } from "@/lib/projects";
import { cn } from "@/lib/utils";

const CATEGORIES: { key: string; value: Category | "all" }[] = [
  { key: "filterAll", value: "all" },
  { key: "filterGraphic", value: "graphic" },
  { key: "filterMotion", value: "motion" },
  { key: "filterVideo", value: "video" },
  { key: "filterIllustration", value: "illustration" },
  { key: "filterAi", value: "ai" },
  { key: "filterCraft", value: "craft" },
  { key: "filterCollab", value: "collaborations" },
  { key: "filterAnimation", value: "animation" },
];

interface Props {
  projects: Project[];
  lang: string;
}

export default function WorksClient({ projects, lang }: Props) {
  const t = useTranslations("works");
  const [active, setActive] = useState<Category | "all">("all");
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleSound = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const filtered =
    active === "all"
      ? projects
      : projects.filter((p) => p.categories.includes(active as Category));

  return (
    <>
      {/* Nav padding */}
      <section style={{ height: "var(--nav-height)" }} className="section-dark" />

      <section className="section section-dark">
        <Container>
          {/* Hero Video - Alchemize YouTube */}
          <div
            style={{
              marginBottom: "clamp(24px, 5vw, 40px)",
              borderRadius: "20px",
              overflow: "hidden",
              aspectRatio: "21 / 9",
              maxWidth: "95%",
              margin: "clamp(-20px, -2vw, -28px) auto clamp(24px, 5vw, 40px)",
              position: "relative",
            }}
          >
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/5aU-llMWRBI?autoplay=1&mute=1&loop=1&playlist=5aU-llMWRBI"
              title="Alchemize"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{
                display: "block",
              }}
            />
          </div>

          <h1 className="heading-section mb-12">{t("title")}</h1>

          {/* Filtre butonları */}
          <div className="flex flex-wrap gap-2" style={{ marginBottom: "80px" }}>
            {CATEGORIES.map(({ key, value }) => (
              <button
                key={value}
                onClick={() => setActive(value)}
                className={cn(
                  "label px-4 py-3 rounded-sm transition-all duration-300 border",
                  active === value
                    ? "bg-white text-black border-white"
                    : "border-border hover:border-border-hover"
                )}
                style={
                  active !== value
                    ? {
                        borderColor: "var(--color-border)",
                        color: "var(--color-text-secondary)",
                      }
                    : undefined
                }
              >
                {t(key as keyof ReturnType<typeof useTranslations<"works">>)}
              </button>
            ))}
          </div>

          {/* Works grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "clamp(24px, 4vw, 48px)",
            }}
          >
            {filtered.map((project) => (
              <WorkCard key={project.slug} project={project} lang={lang} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p
              className="label text-center py-24"
              style={{ color: "var(--color-text-muted)" }}
            >
              —
            </p>
          )}
        </Container>
      </section>
    </>
  );
}

function WorkCard({ project, lang }: { project: Project; lang: string }) {
  const locale = lang as "en" | "tr";
  const isVideoFile = project.coverImage?.toLowerCase().match(/\.(mp4|webm|mov)$/i);
  const isBusinessVideoography = project.slug === "isletme-videografi";
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    if (!isBusinessVideoography || !project.videos || project.videos.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % project.videos.length);
    }, 5000); // Change video every 5 seconds

    return () => clearInterval(interval);
  }, [isBusinessVideoography, project.videos.length]);

  const getDisplayCover = () => {
    if (isBusinessVideoography && project.videos && project.videos.length > 1) {
      const currentVideo = project.videos[currentVideoIndex];
      if (currentVideo.type === "youtube") {
        return `https://img.youtube.com/vi/${currentVideo.id}/maxresdefault.jpg`;
      }
      return currentVideo.id;
    }
    return project.coverImage;
  };

  const displayCoverImage = getDisplayCover();

  return (
    <Link
      href={{ pathname: "/works/[slug]", params: { slug: project.slug } }}
      className="group block"
    >
      {/* Unified Frame - Image + Title + Year + Media ALL TOGETHER */}
      <div
        style={{
          borderRadius: "24px",
          background: "rgba(0, 0, 0, 0.5)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          transition: "opacity 200ms ease",
          height: "100%",
        }}
        className="group-hover:opacity-80"
      >
        {/* Cover Image/Video with Oval Corners */}
        <div
          style={{
            aspectRatio: "16 / 9",
            borderRadius: "16px",
            overflow: "hidden",
            background: "rgba(10, 10, 10, 0.8)",
            flexShrink: 0,
          }}
        >
          {displayCoverImage && isVideoFile ? (
            <video
              key={displayCoverImage}
              src={displayCoverImage}
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          ) : (
            displayCoverImage && (
              <img
                src={displayCoverImage}
                alt={project.title[locale]}
                className="w-full h-full object-cover"
              />
            )
          )}
        </div>

        {/* Title & Year - Same Row, Fixed Height for Consistency */}
        <div className="flex items-start justify-between gap-3" style={{ minHeight: "56px" }}>
          <h3
            className="heading-card mb-0 flex-1"
            style={{
              color: "var(--color-text-primary)",
              lineHeight: "1.3",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {project.title[locale]}
          </h3>
          <span className="label text-xs whitespace-nowrap" style={{ color: "var(--color-text-muted)", marginTop: "2px" }}>
            {project.year}
          </span>
        </div>

        {/* Media (was Categories) */}
        <p className="label" style={{ color: "var(--color-text-muted)" }}>
          {project.categories.join(" · ")}
        </p>
      </div>
    </Link>
  );
}
