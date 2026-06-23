"use client";

import { useState, useEffect } from "react";

type MediaItem = {
  type: "image" | "video" | "youtube";
  src: string;
};

export function Lightbox({
  media,
  initialIndex = 0,
  onClose,
}: {
  media: MediaItem[];
  initialIndex?: number;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const currentMedia = media[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) =>
          prev === 0 ? media.length - 1 : prev - 1
        );
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) =>
          prev === media.length - 1 ? 0 : prev + 1
        );
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [media.length, onClose]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.95)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      {/* Main Media Container */}
      <div
        style={{
          position: "relative",
          maxWidth: "95vw",
          maxHeight: "95vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {currentMedia.type === "image" ? (
          <img
            src={currentMedia.src}
            alt={`Media ${currentIndex + 1} of ${media.length}`}
            style={{
              maxWidth: "100%",
              maxHeight: "90vh",
              objectFit: "contain",
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
        ) : currentMedia.type === "youtube" ? (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${currentMedia.src}`}
            title="YouTube video player"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              aspectRatio: "16 / 9",
            }}
          />
        ) : (
          <video
            src={currentMedia.src}
            controls
            controlsList="nodownload"
            playsInline
            style={{
              maxWidth: "100%",
              maxHeight: "90vh",
              backgroundColor: "#0a0a0a",
              userSelect: "none",
              WebkitUserSelect: "none",
              WebkitTouchCallout: "none",
            }}
            onContextMenu={(e) => {
              e.preventDefault();
              return false;
            }}
            onDragStart={(e) => {
              e.preventDefault();
              return false;
            }}
          />
        )}

        {/* Navigation Arrows */}
        {media.length > 1 && (
          <>
            {/* Left Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex((prev) =>
                  prev === 0 ? media.length - 1 : prev - 1
                );
              }}
              style={{
                position: "absolute",
                left: "24px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255, 255, 255, 0.2)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                color: "white",
                width: "48px",
                height: "48px",
                borderRadius: "8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                transition: "all 200ms ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(255, 255, 255, 0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(255, 255, 255, 0.2)";
              }}
            >
              ←
            </button>

            {/* Right Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex((prev) =>
                  prev === media.length - 1 ? 0 : prev + 1
                );
              }}
              style={{
                position: "absolute",
                right: "24px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255, 255, 255, 0.2)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                color: "white",
                width: "48px",
                height: "48px",
                borderRadius: "8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                transition: "all 200ms ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(255, 255, 255, 0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(255, 255, 255, 0.2)";
              }}
            >
              →
            </button>
          </>
        )}

        {/* Media Counter */}
        {media.length > 1 && (
          <div
            style={{
              position: "absolute",
              bottom: "24px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              color: "white",
              padding: "8px 16px",
              borderRadius: "6px",
              fontSize: "14px",
              pointerEvents: "none",
            }}
          >
            {currentIndex + 1} / {media.length}
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "24px",
            right: "24px",
            background: "rgba(255, 255, 255, 0.2)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            color: "white",
            width: "48px",
            height: "48px",
            borderRadius: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            transition: "all 200ms ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background =
              "rgba(255, 255, 255, 0.3)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background =
              "rgba(255, 255, 255, 0.2)";
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
