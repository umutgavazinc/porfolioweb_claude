"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { Link } from "@/i18n/navigation";

export default function AboutSection() {
  const t = useTranslations("about");
  const tSection = useTranslations("aboutSection");
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [videoDuration, setVideoDuration] = useState(0);

  // Get video duration
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      console.log("✅ Video loaded, duration:", video.duration);
      setVideoDuration(video.duration);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    // Fallback if metadata loads before listener
    if (video.duration) {
      console.log("✅ Video already loaded, duration:", video.duration);
      setVideoDuration(video.duration);
    }

    return () => video.removeEventListener("loadedmetadata", handleLoadedMetadata);
  }, []);

  // Sync video playback with scroll
  useEffect(() => {
    if (videoDuration === 0 || !sectionRef.current) {
      console.log("⏭️ Waiting: duration=", videoDuration);
      return;
    }

    console.log("🎬 Scroll listener activated");

    const handleScroll = () => {
      const section = sectionRef.current;
      const video = videoRef.current;
      if (!section || !video) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = section.offsetHeight;

      // Calculate progress: 0 when section enters, 1 when section leaves
      const progress = Math.max(
        0,
        Math.min(1, (windowHeight - rect.top) / (windowHeight + sectionHeight))
      );

      video.currentTime = progress * videoDuration;
      console.log("📹 Video time:", video.currentTime.toFixed(2), "Progress:", progress.toFixed(2));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [videoDuration]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        paddingTop: "64px",
        paddingBottom: "64px",
        background: "#000000",
        minHeight: "60vh",
        zIndex: 60,
      }}
    >
      {/* Video Background - Full Section */}
      <video
        ref={videoRef}
        src="/videos/about/hero-bust.webm"
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "right 70%",
          opacity: 0.85,
          zIndex: 1,
        }}
      />

      {/* Light Grey Overlay - Minimal shadow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(90deg, rgba(10, 10, 10, 0.2) 0%, rgba(10, 10, 10, 0.1) 50%, transparent 100%)",
          zIndex: 2,
        }}
      />

      <Container style={{ position: "relative", zIndex: 1000 }}>
        <div style={{ maxWidth: "560px" }}>
          {/* Text content */}
          <div style={{ position: "relative", zIndex: 1001 }}>
            <div
              style={{
                marginBottom: "var(--spacing-label-title)",
                color: "#d9534f",
                fontWeight: 600,
                fontSize: "var(--text-label)",
                letterSpacing: "var(--letter-nav)",
                textTransform: "uppercase",
                position: "relative",
                zIndex: 1001,
                display: "block",
                opacity: 1,
                visibility: "visible"
              }}
            >
              {t("title")}
            </div>

            <h2
              style={{
                color: "#ffffff",
                fontWeight: 600,
                fontSize: "clamp(32px, 5vw, 56px)",
                lineHeight: "1.25",
                letterSpacing: "-0.01em",
                textShadow: "0 2px 8px rgba(0, 0, 0, 0.8)",
                position: "relative",
                zIndex: 1001,
                display: "block",
                opacity: 1,
                visibility: "visible",
                margin: 0,
                marginBottom: "52px",
                maxWidth: "620px",
              }}
            >
              {t("craftTitle")}
            </h2>

            <div style={{ marginBottom: "var(--spacing-text-cta)", position: "relative", zIndex: 1001, maxWidth: "620px" }}>
              <p
                style={{
                  marginBottom: "40px",
                  color: "#ffffff",
                  textShadow: "0 1px 4px rgba(0, 0, 0, 0.7)",
                  fontSize: "17px",
                  lineHeight: "1.68",
                  fontWeight: 400,
                  display: "block",
                  opacity: 1,
                  visibility: "visible",
                  margin: 0,
                  marginBottom: "40px"
                }}
              >
                {tSection("transformIdeas")}
              </p>

              <p
                style={{
                  color: "#ffffff",
                  textShadow: "0 1px 4px rgba(0, 0, 0, 0.7)",
                  fontSize: "17px",
                  lineHeight: "1.68",
                  fontWeight: 400,
                  display: "block",
                  opacity: 1,
                  visibility: "visible",
                  margin: 0
                }}
              >
                {tSection("journeyDescription")}
              </p>
            </div>

            <Link
              href="/about"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "var(--text-small)",
                color: "#ffffff",
                textTransform: "uppercase",
                letterSpacing: "var(--letter-nav)",
                textDecoration: "none",
                position: "relative",
                zIndex: 1001,
                opacity: 1,
                visibility: "visible",
                transition: "color 300ms ease"
              }}
            >
              Devamını Oku →
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
