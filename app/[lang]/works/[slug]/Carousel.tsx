"use client";

import { useRef, useState } from "react";

interface CarouselItem {
  src: string;
  type: "image" | "video";
}

export function Carousel({
  items,
  onItemClick,
}: {
  items: CarouselItem[];
  onItemClick?: (index: number) => void;
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 400;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        paddingBottom: "24px",
      }}
    >
      {/* Left Arrow Button */}
      <button
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        style={{
          position: "relative",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          background: "rgba(255, 255, 255, 0.08)",
          color: "white",
          cursor: canScrollLeft ? "pointer" : "default",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
          transition: "all 200ms ease",
          flexShrink: 0,
          opacity: canScrollLeft ? 1 : 0.3,
        }}
        onMouseEnter={(e) => {
          if (canScrollLeft) {
            (e.currentTarget as HTMLElement).style.background =
              "rgba(255, 255, 255, 0.15)";
            (e.currentTarget as HTMLElement).style.borderColor =
              "rgba(255, 255, 255, 0.3)";
          }
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background =
            "rgba(255, 255, 255, 0.08)";
          (e.currentTarget as HTMLElement).style.borderColor =
            "rgba(255, 255, 255, 0.2)";
        }}
      >
        ←
      </button>

      {/* Scroll Container */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        style={{
          display: "flex",
          gap: "16px",
          overflowX: "auto",
          overflowY: "hidden",
          scrollBehavior: "smooth",
          flex: 1,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.cursor = "grab";
        }}
      >
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {items.map((item, idx) => (
          <div
            key={idx}
            onClick={() => onItemClick?.(idx)}
            style={{
              flexShrink: 0,
              width: "280px",
              aspectRatio: "16 / 9",
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              backgroundColor: "#0a0a0a",
              transition: "all 200ms ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(255, 255, 255, 0.2)";
              (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(255, 255, 255, 0.1)";
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            }}
          >
            {item.type === "image" ? (
              <img
                src={item.src}
                alt={`Item ${idx + 1}`}
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
                src={item.src}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  pointerEvents: "none",
                }}
                controlsList="nodownload"
              />
            )}
          </div>
        ))}
      </div>

      {/* Right Arrow Button */}
      <button
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        style={{
          position: "relative",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          background: "rgba(255, 255, 255, 0.08)",
          color: "white",
          cursor: canScrollRight ? "pointer" : "default",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
          transition: "all 200ms ease",
          flexShrink: 0,
          opacity: canScrollRight ? 1 : 0.3,
        }}
        onMouseEnter={(e) => {
          if (canScrollRight) {
            (e.currentTarget as HTMLElement).style.background =
              "rgba(255, 255, 255, 0.15)";
            (e.currentTarget as HTMLElement).style.borderColor =
              "rgba(255, 255, 255, 0.3)";
          }
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background =
            "rgba(255, 255, 255, 0.08)";
          (e.currentTarget as HTMLElement).style.borderColor =
            "rgba(255, 255, 255, 0.2)";
        }}
      >
        →
      </button>
    </div>
  );
}
