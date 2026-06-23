"use client";

import { useEffect } from "react";

export function ImageProtection() {
  useEffect(() => {
    // Block right-click on images and videos
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "IMG" || target.tagName === "VIDEO") {
        e.preventDefault();
        return false;
      }
    };

    // Block drag and drop for images and videos
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "IMG" || target.tagName === "VIDEO") {
        e.preventDefault();
        return false;
      }
    };

    // Block dragging over images/videos
    const handleDragOver = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "IMG" || target.tagName === "VIDEO") {
        e.preventDefault();
        return false;
      }
    };

    // Prevent keyboard shortcuts for saving
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+S, Cmd+S (Save)
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+S, Cmd+Shift+S (Save As)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "S") {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener("contextmenu", handleContextMenu, true);
    document.addEventListener("dragstart", handleDragStart, true);
    document.addEventListener("dragover", handleDragOver, true);
    document.addEventListener("keydown", handleKeyDown, true);

    // Apply styles to all images and videos
    const style = document.createElement("style");
    style.textContent = `
      img, video {
        user-select: none !important;
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        pointer-events: auto !important;
        -webkit-touch-callout: none !important;
      }

      img {
        draggable: false !important;
      }

      video {
        oncontextmenu: return false !important;
      }

      /* Hide download button in video player */
      video::-webkit-media-controls-download-button {
        display: none !important;
      }

      video::-moz-media-controls-download-button {
        display: none !important;
      }

      /* Hide all context menu items for video */
      video::cue {
        display: none !important;
      }

      /* Additional video player controls hiding */
      [role="menuitem"] {
        pointer-events: none !important;
      }

      /* Prevent download attribute */
      [download] {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    // Monitor for video elements and remove download button from controls
    const observer = new MutationObserver(() => {
      const videos = document.querySelectorAll("video");
      videos.forEach((video) => {
        // Remove download button if it exists
        const downloadBtn = video.parentElement?.querySelector(
          "[aria-label*='Download'], [aria-label*='download'], [title*='Download'], [title*='download']"
        );
        if (downloadBtn) {
          downloadBtn.remove();
        }

        // Remove download from attribute if present
        video.removeAttribute("download");
        video.setAttribute("controlsList", "nodownload");
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["src", "controls"],
    });

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu, true);
      document.removeEventListener("dragstart", handleDragStart, true);
      document.removeEventListener("dragover", handleDragOver, true);
      document.removeEventListener("keydown", handleKeyDown, true);
      document.head.removeChild(style);
      observer.disconnect();
    };
  }, []);

  return null;
}
