"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getProjectBySlug } from "@/lib/projects";
import { GalleryDisplay } from "./GalleryDisplay";
import { Lightbox } from "./Lightbox";
import { Carousel } from "./Carousel";

export default function CaseStudyContent({
  project,
  locale,
  altGaleriFiles = [],
}: {
  project: NonNullable<ReturnType<typeof getProjectBySlug>>;
  locale: "en" | "tr";
  altGaleriFiles?: string[];
}) {
  const t = useTranslations("common");
  const tWorks = useTranslations("works");

  const getCategoryLabel = (category: string) => {
    const categoryMap: Record<string, string> = {
      graphic: tWorks("filterGraphic"),
      motion: tWorks("filterMotion"),
      video: tWorks("filterVideo"),
      illustration: tWorks("filterIllustration"),
      ai: tWorks("filterAi"),
      craft: tWorks("filterCraft"),
      collaborations: tWorks("filterCollab"),
      animation: tWorks("filterAnimation"),
    };
    return categoryMap[category] || category;
  };

  // Collect all media: cover image + gallery images + videos
  // Gallery images first, then videos (for proper display order)
  const isCoverYouTube = project.coverImage?.startsWith("youtube:");
  const isCoverVideo = !isCoverYouTube && project.coverImage?.toLowerCase().match(/\.(mp4|webm|mov)$/i);
  const coverSrc = isCoverYouTube ? project.coverImage.replace("youtube:", "") : project.coverImage;
  const allMedia = [
    ...(project.coverImage ? [{ type: isCoverYouTube ? ("youtube" as const) : isCoverVideo ? ("video" as const) : ("image" as const), src: coverSrc }] : []),
    ...project.gallery.map((img) => ({ type: "image" as const, src: img })),
    ...project.videos.map((vid) => ({ type: (vid.type === "youtube" ? "youtube" : "video") as const, src: vid.id })),
  ];

  // For display: combine gallery and videos into one display
  const displayMedia = [
    ...project.gallery.map((img) => ({ type: "image" as const, src: img })),
    ...project.videos.map((vid) => ({ type: (vid.type === "youtube" ? "youtube" : "video") as const, src: vid.id })),
  ];

  // Alt galeri media
  const altGaleriMedia = altGaleriFiles.map((file) => ({
    type: file.toLowerCase().endsWith(".mp4") ? ("video" as const) : ("image" as const),
    src: file,
  }));

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxSource, setLightboxSource] = useState<"main" | "altGaleri">("main");
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const isVideografi = project.slug === "isletme-videografi";

  useEffect(() => {
    if (!isVideografi || !project.videos || project.videos.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % project.videos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isVideografi, project.videos.length]);

  const handleMediaClick = (index: number, source: "main" | "altGaleri" = "main") => {
    setLightboxIndex(index);
    setLightboxSource(source);
    setLightboxOpen(true);
  };

  const currentLightboxMedia = lightboxSource === "main" ? allMedia : altGaleriMedia;

  const getTeaserMedia = () => {
    if (isVideografi && project.videos && project.videos.length > 0) {
      const currentVideo = project.videos[currentVideoIndex];
      if (currentVideo.type === "youtube") {
        return { type: "image" as const, src: `https://img.youtube.com/vi/${currentVideo.id}/hqdefault.jpg` };
      }
      return { type: "video" as const, src: currentVideo.id };
    }
    const isCoverYT = project.coverImage?.startsWith("youtube:");
    const isCoverVid = !isCoverYT && project.coverImage?.toLowerCase().match(/\.(mp4|webm|mov)$/i);
    const coverSrc = isCoverYT ? project.coverImage.replace("youtube:", "") : project.coverImage;
    return {
      type: isCoverYT ? "youtube" as const : isCoverVid ? "video" as const : "image" as const,
      src: coverSrc
    };
  };

  const teaserMedia = getTeaserMedia();
  const teaserMediaSrc = teaserMedia.src;
  const teaserMediaType = teaserMedia.type;

  return (
    <>
      {/* Nav padding */}
      <section style={{ height: "var(--nav-height)" }} />

      {/* MAIN CONTENT SECTION */}
      <section
        style={{
          background: "#050505",
          paddingTop: "96px",
          paddingBottom: "160px",
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            paddingLeft: "clamp(24px, 4vw, 96px)",
            paddingRight: "clamp(24px, 4vw, 96px)",
          }}
        >
          {/* 1. TEASER / KÜNYE FRAME (at top) */}
          {(project.videos.length > 1 || project.gallery.length > 1) && (
            <div
              style={{
                border: "1px solid rgba(255, 255, 255, 0.10)",
                background: "rgba(255, 255, 255, 0.025)",
                borderRadius: "20px",
                padding: "clamp(24px, 3vw, 32px)",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "clamp(20px, 4vw, 40px)",
                alignItems: "flex-start",
                marginBottom: "clamp(48px, 5vw, 64px)",
              }}
            >
              {/* Teaser Media - Left (Cover Image/Video - Clickable) */}
              <div
                onClick={() => handleMediaClick(0)}
                style={{
                  aspectRatio: "16 / 9",
                  borderRadius: "14px",
                  overflow: "hidden",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  cursor: teaserMediaSrc ? "pointer" : "default",
                  transition: "opacity 200ms ease",
                }}
                onMouseEnter={(e) => {
                  if (teaserMediaSrc) {
                    (e.currentTarget as HTMLElement).style.opacity = "0.9";
                  }
                }}
                onMouseLeave={(e) => {
                  if (teaserMediaSrc) {
                    (e.currentTarget as HTMLElement).style.opacity = "1";
                  }
                }}
              >
                {teaserMediaSrc && teaserMediaType === "video" ? (
                  <video
                    key={teaserMediaSrc}
                    src={teaserMediaSrc}
                    poster={teaserMediaSrc}
                    muted
                    playsInline
                    preload="metadata"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      backgroundColor: "#0a0a0a",
                      userSelect: "none",
                      WebkitUserSelect: "none",
                      WebkitTouchCallout: "none",
                    }}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      return false;
                    }}
                  />
                ) : teaserMediaSrc ? (
                  <img
                    src={teaserMediaSrc}
                    alt={project.title[locale]}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      backgroundColor: "#0a0a0a",
                      userSelect: "none",
                      WebkitUserSelect: "none",
                      WebkitTouchCallout: "none",
                    }}
                    draggable={false}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      return false;
                    }}
                    onDragStart={(e) => {
                      e.preventDefault();
                      return false;
                    }}
                  />
                ) : null}
              </div>

              {/* Metadata - Right */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "100%",
                }}
              >
                {/* Top: Header */}
                <div>
                  <p
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#C94A44",
                      marginBottom: "12px",
                    }}
                  >
                    Teaser
                  </p>
                  <h2
                    style={{
                      fontSize: "26px",
                      fontWeight: 600,
                      lineHeight: 1.15,
                      color: "#F2F2F2",
                      marginBottom: "64px",
                    }}
                  >
                    {project.title[locale]}
                  </h2>
                </div>

                {/* Bottom: Metadata + Description */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "32px",
                  }}
                >
                  <MetadataItem
                    label={t("year")}
                    value={String(project.year)}
                  />
                  <MetadataItem
                    label={t("category")}
                    value={project.categories.map(getCategoryLabel).join(" · ")}
                  />
                  {project.client && (
                    <MetadataItem label={t("client")} value={project.client} />
                  )}
                  {project.shortDescription[locale] && (
                    <div
                      style={{
                        fontSize: "14px",
                        lineHeight: 1.5,
                        color: "rgba(255, 255, 255, 0.64)",
                        marginTop: "16px",
                        paddingTop: "16px",
                        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                      }}
                    >
                      {project.shortDescription[locale]}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 2. MAIN TITLE (moved before media) */}
          <h1
            style={{
              fontSize: "clamp(40px, 5.5vw, 64px)",
              fontWeight: 500,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#F2F2F2",
              marginBottom: "clamp(48px, 5vw, 64px)",
              maxWidth: "900px",
              fontFamily: "ClashDisplay, sans-serif",
            }}
          >
            {project.title[locale]}
          </h1>

          {/* 3. MAIN MEDIA (Gallery + Videos Combined) - Always 3 columns */}
          {displayMedia.length > 0 ? (
            // COMBINED DISPLAY (Gallery Images + Videos in 3-column grid)
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "clamp(16px, 4vw, 24px)",
                marginBottom: "clamp(32px, 4vw, 40px)",
              }}
            >
              {displayMedia.map((media, idx) => {
                const mediaIndex = (project.coverImage ? 1 : 0) + idx;

                return (
                  <div
                    key={idx}
                    onClick={() => handleMediaClick(mediaIndex)}
                    style={{
                      aspectRatio: "16 / 9",
                      borderRadius: "14px",
                      overflow: "hidden",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      cursor: "pointer",
                      transition: "opacity 200ms ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.opacity = "0.9";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.opacity = "1";
                    }}
                  >
                    {media.type === "image" ? (
                      <img
                        src={media.src}
                        alt={`Media ${idx + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          userSelect: "none",
                          pointerEvents: "none",
                        }}
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                      />
                    ) : media.type === "youtube" ? (
                      <img
                        src={`https://img.youtube.com/vi/${media.src}/hqdefault.jpg`}
                        alt={`YouTube Media ${idx + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          userSelect: "none",
                          pointerEvents: "none",
                        }}
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                      />
                    ) : (
                      <video
                        src={media.src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          backgroundColor: "#0a0a0a",
                          userSelect: "none",
                        }}
                        controlsList="nodownload"
                        onContextMenu={(e) => {
                          e.preventDefault();
                          return false;
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          ) : null}

          {/* 4. BACK TO WORKS LINK */}
          <Link
            href="/works"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255, 255, 255, 0.56)",
              textDecoration: "none",
              transition: "color 200ms ease",
            }}
          >
            {t("backToWorks")}
          </Link>
        </div>
      </section>

      {/* ALT GALERİ Segment - Seamless continuation */}
      {altGaleriFiles.length > 0 && (
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            paddingLeft: "clamp(24px, 4vw, 96px)",
            paddingRight: "clamp(24px, 4vw, 96px)",
            paddingTop: "clamp(80px, 8vw, 120px)",
            paddingBottom: "clamp(80px, 8vw, 120px)",
            borderTop: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          <h2
            style={{
              fontSize: "12px",
              fontWeight: 600,
              lineHeight: 1.2,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#C94A44",
              marginBottom: "clamp(40px, 5vw, 56px)",
            }}
          >
            Diğer Çalışmalar
          </h2>
          <Carousel
            items={altGaleriMedia}
            onItemClick={(idx) => handleMediaClick(idx, "altGaleri")}
          />

          {/* DESCRIPTION - After Alt Galeri */}
          <p
            style={{
              fontSize: "17px",
              lineHeight: 1.6,
              color: "rgba(255, 255, 255, 0.74)",
              maxWidth: "680px",
              marginTop: "clamp(48px, 6vw, 80px)",
              paddingTop: "clamp(48px, 6vw, 80px)",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            {project.shortDescription[locale]}
          </p>
        </div>
      )}

      {/* Lightbox for all media (images + videos) */}
      {lightboxOpen && currentLightboxMedia.length > 0 && (
        <Lightbox
          media={currentLightboxMedia}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}

function MetadataItem({ label, value }: { label: string; value: string }) {
  // Check if value is an Instagram handle
  const isInstagram = value.startsWith("@");
  const instagramHandle = isInstagram ? value.substring(1) : value;
  const instagramUrl = isInstagram ? `https://instagram.com/${instagramHandle}` : null;

  return (
    <div>
      <p
        style={{
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "rgba(255, 255, 255, 0.45)",
          marginBottom: "10px",
        }}
      >
        {label}
      </p>
      {instagramUrl ? (
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "18px",
            fontWeight: 400,
            lineHeight: 1.4,
            color: "rgba(255, 255, 255, 0.82)",
            textDecoration: "none",
            borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
            transition: "color 200ms ease, border-color 200ms ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "rgba(255, 255, 255, 1)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 255, 255, 0.6)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "rgba(255, 255, 255, 0.82)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 255, 255, 0.3)";
          }}
        >
          {value}
        </a>
      ) : (
        <p
          style={{
            fontSize: "18px",
            fontWeight: 400,
            lineHeight: 1.4,
            color: "rgba(255, 255, 255, 0.82)",
          }}
        >
          {value}
        </p>
      )}
    </div>
  );
}
