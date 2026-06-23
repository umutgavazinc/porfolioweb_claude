"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollDrivenVideoProps {
  portraitSrc: string;
  landscapeSrc: string;
  className?: string;
}

export default function ScrollDrivenVideo({
  portraitSrc,
  landscapeSrc,
  className = "",
}: ScrollDrivenVideoProps) {
  const portraitVideoRef = useRef<HTMLVideoElement>(null);
  const landscapeVideoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoDuration, setVideoDuration] = useState(0);

  useEffect(() => {
    const handleLoadedMetadata = () => {
      const video = portraitVideoRef.current || landscapeVideoRef.current;
      if (video && video.duration) {
        console.log("✅ Video duration loaded:", video.duration);
        setVideoDuration(video.duration);
      }
    };

    const portraitVideo = portraitVideoRef.current;
    const landscapeVideo = landscapeVideoRef.current;

    // Add event listeners
    if (portraitVideo) {
      portraitVideo.addEventListener("loadedmetadata", handleLoadedMetadata);
      // Fallback: if metadata already loaded
      if (portraitVideo.duration) {
        setVideoDuration(portraitVideo.duration);
      }
    }
    if (landscapeVideo) {
      landscapeVideo.addEventListener("loadedmetadata", handleLoadedMetadata);
      // Fallback: if metadata already loaded
      if (landscapeVideo.duration) {
        setVideoDuration(landscapeVideo.duration);
      }
    }

    return () => {
      if (portraitVideo) portraitVideo.removeEventListener("loadedmetadata", handleLoadedMetadata);
      if (landscapeVideo) landscapeVideo.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    if (!wrapperRef.current || !containerRef.current || videoDuration === 0) {
      if (videoDuration === 0) {
        console.log("⏭️ Waiting for video duration...");
      }
      return;
    }

    console.log("🎬 Scroll listener activated with duration:", videoDuration);

    const portraitVideo = portraitVideoRef.current;
    const landscapeVideo = landscapeVideoRef.current;

    const handleScroll = () => {
      const wrapperRect = wrapperRef.current?.getBoundingClientRect();
      if (!wrapperRect) return;

      // Wrapper'ın viewport'a göre konumu
      const wrapperTop = wrapperRect.top;
      const wrapperHeight = wrapperRect.height;
      const windowHeight = window.innerHeight;

      // Video ne kadar scroll edilmiş (0-1)
      // Wrapper top'a geldiğinde 0, bottom'a geldiğinde 1
      const progress = Math.max(
        0,
        Math.min(1, (windowHeight - wrapperTop) / (windowHeight + wrapperHeight))
      );

      // Video currentTime'ı güncelle
      const currentTime = progress * videoDuration;
      if (portraitVideo) portraitVideo.currentTime = currentTime;
      if (landscapeVideo) landscapeVideo.currentTime = currentTime;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [videoDuration]);

  return (
    <div ref={wrapperRef} style={{ minHeight: "600vh" }}>
      <div
        ref={containerRef}
        className={`sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden ${className}`}
        style={{ background: "#000000" }}
      >
        {/* Portrait video — mobile */}
        <video
          ref={portraitVideoRef}
          className="block lg:hidden w-full h-full object-contain"
          playsInline
          muted
          preload="metadata"
        >
          <source src={portraitSrc} type="video/mp4" />
        </video>

        {/* Landscape video — desktop */}
        <video
          ref={landscapeVideoRef}
          className="hidden lg:block w-full h-screen object-contain"
          playsInline
          muted
          preload="metadata"
        >
          <source src={landscapeSrc} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
