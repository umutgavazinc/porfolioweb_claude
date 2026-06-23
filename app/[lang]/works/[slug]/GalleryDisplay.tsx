"use client";

export function GalleryDisplay({
  images,
  onImageClick,
}: {
  images: string[];
  onImageClick?: (index: number) => void;
}) {

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "24px",
        marginBottom: "clamp(32px, 4vw, 40px)",
      }}
    >
      {images.map((img, idx) => (
        <div
          key={idx}
          style={{
            cursor: "pointer",
            borderRadius: "14px",
            overflow: "hidden",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            transition: "opacity 200ms ease",
            userSelect: "none",
          }}
          onClick={() => onImageClick?.(idx)}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = "0.9";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = "1";
          }}
        >
          <img
            src={img}
            alt={`Gallery ${idx + 1}`}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
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
        </div>
      ))}
    </div>
  );
}
