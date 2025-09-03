"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function VideoBackground({ videoSources }) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [currentVideoIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [, setVideoAspect] = useState(null)[1];
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Check if we're on mobile and update video positioning accordingly
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check initially
    checkMobile();

    // Update on resize
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle video loading and aspect ratio calculation
  const handleLoadedMetadata = useCallback(() => {
    const videoElement = videoRef.current;
    const container = containerRef.current;

    if (!videoElement || !container) return;

    const aspectRatio = videoElement.videoWidth / videoElement.videoHeight;
    setVideoAspect(aspectRatio);
    setIsVideoLoaded(true);

    const updateVideoDimensions = () => {
      const containerAspect = container.clientWidth / container.clientHeight;

      if (isMobile) {
        // On mobile, maintain aspect ratio while ensuring full coverage
        if (containerAspect > aspectRatio) {
          // Container is wider than video
          videoElement.style.width = "100%";
          videoElement.style.height = "auto";
          // Center vertically
          const heightDiff =
            (container.clientWidth / aspectRatio - container.clientHeight) / 2;
          videoElement.style.transform = `translateY(-${heightDiff}px)`;
        } else {
          // Container is taller than video
          videoElement.style.width = "auto";
          videoElement.style.height = "100%";
          // Center horizontally
          const widthDiff =
            (container.clientHeight * aspectRatio - container.clientWidth) / 2;
          videoElement.style.transform = `translateX(-${widthDiff}px)`;
        }
      } else {
        // Desktop behavior remains the same
        videoElement.style.width = "100%";
        videoElement.style.height = "100%";
        videoElement.style.transform = "none";
      }
    };

    // Update dimensions initially and on resize
    updateVideoDimensions();
    window.addEventListener("resize", updateVideoDimensions);
    return () => window.removeEventListener("resize", updateVideoDimensions);
  }, [isMobile, setVideoAspect]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () =>
      videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
  }, [handleLoadedMetadata]);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      ref={containerRef}
    >
      <div className="relative h-full w-full">
        <video
          ref={videoRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
        >
          <source
            src={videoSources[currentVideoIndex]}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        {!isVideoLoaded && <div className="absolute inset-0" />}
        <div className="absolute inset-0 bg-black bg-opacity-[5%]" />
      </div>
    </div>
  );
}
