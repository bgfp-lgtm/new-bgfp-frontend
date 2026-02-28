"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

type VideoModalProps = {
  videoUrl: string | null;
  title?: string;
  open: boolean;
  onClose: () => void;
};

export default function VideoModal({
  videoUrl,
  title,
  open,
  onClose,
}: VideoModalProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (open) {
      setIsLoading(true);
    }
  }, [open, videoUrl]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const embedUrl = useMemo(() => {
    if (!videoUrl) return null;
    return getEmbedUrl(videoUrl);
  }, [videoUrl]);

  if (!open || !videoUrl) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={title || "Video modal"}
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-5xl px-4 animate-in fade-in zoom-in-95 duration-300">
        <div className="relative rounded-xl overflow-hidden shadow-2xl bg-black border border-white/10">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <div className="w-10 h-10 border-4 border-white/20 border-t-red-500 rounded-full animate-spin" />
            </div>
          )}

          <div className="w-full aspect-video relative z-10">
            {embedUrl ? (
              <iframe
                className="w-full h-full"
                src={embedUrl}
                title={title || "Video"}
                // UPDATED: Added comprehensive permissions
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                // UPDATED: 'no-referrer-when-downgrade' helps providers verify your domain
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                loading="eager"
                onLoad={() => setIsLoading(false)}
              />
            ) : (
              <video
                className="w-full h-full"
                src={videoUrl}
                title={title || "Video"}
                controls
                autoPlay
                playsInline
                preload="auto"
                onCanPlay={() => setIsLoading(false)}
                onWaiting={() => setIsLoading(true)}
              />
            )}
          </div>
        </div>

        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute -right-2 -top-10 md:-right-10 md:-top-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-md"
        >
          <RxCross2 className="w-6 h-6" />
        </button>

        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-10 -top-10 md:right-2 md:-top-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-md"
          aria-label="Open video in new tab"
        >
          <FaExternalLinkAlt className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

const getEmbedUrl = (url: string): string | null => {
  let embedUrl: string | null = null;

  // Get current domain origin for the security handshake
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const videoIdMatch =
      url.match(
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
      ) || url.match(/embed\/([^?]+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    if (videoId) {
      const params = new URLSearchParams({
        autoplay: "1",
        rel: "0",
        playsinline: "1",
        enablejsapi: "1", // Required for origin tracking
        origin: origin, // This tells YouTube it's safe to load on your site
      });
      embedUrl = `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
    }
  } else if (url.includes("vimeo.com")) {
    const videoIdMatch = url.match(/(?:video\/|vimeo\.com\/)(\d+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    const hashMatch = url.match(/[?&]h=([^&]+)/);
    const hash = hashMatch ? hashMatch[1] : null;

    if (videoId) {
      // Added dnt=1 (Do Not Track) which can bypass some restrictive embed settings
      let vimeoUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1&dnt=1`;
      if (hash) {
        vimeoUrl += `&h=${hash}`;
      }
      embedUrl = vimeoUrl;
    }
  }

  return embedUrl;
};
