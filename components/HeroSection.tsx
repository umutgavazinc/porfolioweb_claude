"use client";

import { useState, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { Link } from "@/i18n/navigation";

interface HeroSectionProps {
  heroSub: string;
  viewPortfolio: string;
  aboutMe: string;
}

function HeroSection({ heroSub, viewPortfolio, aboutMe }: HeroSectionProps) {
  const locale = useLocale();
  const t = useTranslations("home");
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleSound = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  return (
    <section
      className="relative overflow-hidden"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, rgba(10,10,10,1) 0%, rgba(45,22,24,0.9) 50%, rgba(10,10,10,1) 100%)",
      }}
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        src="/videos/hero/port-kesf.webm"
        autoPlay
        muted={isMuted}
        loop
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 1,
        }}
      />

      {/* Content Overlay - Left to right gradient */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(90deg, rgba(10, 10, 10, 1) 0%, rgba(10, 10, 10, 0.9) 30%, rgba(10, 10, 10, 0.5) 60%, rgba(10, 10, 10, 0.2) 100%)",
          zIndex: 10,
        }}
      />

      {/* Sound Button */}
      <button
        onClick={toggleSound}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: "rgba(0, 0, 0, 0.5)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          color: "white",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          transition: "all 200ms ease",
          backdropFilter: "blur(4px)",
          zIndex: 50,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "rgba(0, 0, 0, 0.7)";
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 255, 255, 0.6)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "rgba(0, 0, 0, 0.5)";
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 255, 255, 0.3)";
        }}
        aria-label="Toggle sound"
      >
        {isMuted ? "🔇" : "🔊"}
      </button>

      <Container
        style={{
          position: "relative",
          zIndex: 20,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingTop: "var(--nav-height)",
        }}
      >
        <div style={{ maxWidth: "680px" }}>
          <h1
            style={{
              fontFamily: "ClashDisplay, sans-serif",
              fontSize: "clamp(44px, 7vw, 80px)",
              fontWeight: 600,
              lineHeight: "1.1",
              color: "var(--color-text-primary)",
              marginBottom: "16px",
              marginTop: 0,
              whiteSpace: "pre-wrap",
            }}
          >
            {locale === "tr" ? (
              <>
                <div>Multidisipliner</div>
                <div>Sanatçı &</div>
                <div style={{ marginTop: "12px" }}>Görsel</div>
                <div>Tasarımcı</div>
              </>
            ) : (
              <>
                <div>Multidisciplinary</div>
                <div>Artist &</div>
                <div style={{ marginTop: "12px" }}>Visual</div>
                <div>Designer</div>
              </>
            )}
          </h1>

          <p
            style={{
              fontSize: "clamp(16px, 2vw, 19px)",
              lineHeight: "1.65",
              color: "rgba(244, 240, 237, 0.8)",
              marginBottom: "24px",
              marginTop: 0,
              maxWidth: "520px",
              fontWeight: 400,
            }}
          >
            {heroSub}
          </p>

          {/* Disciplines */}
          <div
            style={{
              fontSize: "14px",
              color: "rgba(244, 240, 237, 0.7)",
              marginBottom: "36px",
              marginTop: 0,
              maxWidth: "520px",
              lineHeight: "1.6",
            }}
          >
            {locale === "tr" ? (
              <>
                <Link href="/works" style={{ color: "inherit", textDecoration: "none", cursor: "pointer" }} className="hover:text-accent">
                  Yeni Medya ve AI Yaratıcı Üretim
                </Link>
                {" · "}
                <Link href="/works" style={{ color: "inherit", textDecoration: "none", cursor: "pointer" }} className="hover:text-accent">
                  Hareketli Grafik
                </Link>
                {" · "}
                <Link href="/works" style={{ color: "inherit", textDecoration: "none", cursor: "pointer" }} className="hover:text-accent">
                  Videografi ve Edit
                </Link>
                <br />
                <Link href="/works" style={{ color: "inherit", textDecoration: "none", cursor: "pointer" }} className="hover:text-accent">
                  Basılı ve Dijital Grafik
                </Link>
                {" · "}
                <Link href="/works" style={{ color: "inherit", textDecoration: "none", cursor: "pointer" }} className="hover:text-accent">
                  İllüstrasyon
                </Link>
                {" · "}
                <Link href="/works" style={{ color: "inherit", textDecoration: "none", cursor: "pointer" }} className="hover:text-accent">
                  Mural
                </Link>
                {" · "}
                <Link href="/works" style={{ color: "inherit", textDecoration: "none", cursor: "pointer" }} className="hover:text-accent">
                  Dövme
                </Link>
              </>
            ) : (
              <>
                <Link href="/works" style={{ color: "inherit", textDecoration: "none", cursor: "pointer" }} className="hover:text-accent">
                  New Media & AI Creative
                </Link>
                {" · "}
                <Link href="/works" style={{ color: "inherit", textDecoration: "none", cursor: "pointer" }} className="hover:text-accent">
                  Motion Design
                </Link>
                {" · "}
                <Link href="/works" style={{ color: "inherit", textDecoration: "none", cursor: "pointer" }} className="hover:text-accent">
                  Videography & Editing
                </Link>
                <br />
                <Link href="/works" style={{ color: "inherit", textDecoration: "none", cursor: "pointer" }} className="hover:text-accent">
                  Print & Digital Graphics
                </Link>
                {" · "}
                <Link href="/works" style={{ color: "inherit", textDecoration: "none", cursor: "pointer" }} className="hover:text-accent">
                  Illustration
                </Link>
                {" · "}
                <Link href="/works" style={{ color: "inherit", textDecoration: "none", cursor: "pointer" }} className="hover:text-accent">
                  Mural
                </Link>
                {" · "}
                <Link href="/works" style={{ color: "inherit", textDecoration: "none", cursor: "pointer" }} className="hover:text-accent">
                  Tattoo
                </Link>
              </>
            )}
          </div>

          <div className="flex gap-4" style={{ marginBottom: "40px" }}>
            <Link
              href="/works"
              className="btn btn-primary"
            >
              {viewPortfolio}
            </Link>
            <Link
              href="/contact"
              className="btn btn-secondary"
            >
              {aboutMe}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HeroSection;
