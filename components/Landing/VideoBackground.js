"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const VideoBackground = ({ videoSources }) => {
  const [currentVideoIndex] = useState(0);
  const [, setIsVideoLoaded] = useState(false);
  const [, setVideoAspect] = useState(16 / 9);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const handleVideo = useCallback(() => {
    const videoElement = videoRef.current;
    const container = containerRef.current;

    if (!videoElement || !container) return;

    const aspectRatio = videoElement.videoWidth / videoElement.videoHeight;
    setVideoAspect(aspectRatio);
    setIsVideoLoaded(true);

    const updateVideoDimensions = () => {
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      const isMobile = window.innerWidth <= 768; // Adjust this breakpoint as needed

      if (isMobile) {
        // On mobile, maintain aspect ratio and center the video
        const videoHeight = containerWidth / aspectRatio;
        videoElement.style.width = "100%";
        videoElement.style.height = `${videoHeight}px`;
        videoElement.style.top = "50%";
        videoElement.style.transform = "translate(-50%, -50%)";
      } else {
        // On desktop, cover the full container
        if (containerWidth / containerHeight > aspectRatio) {
          videoElement.style.width = "100vw";
          videoElement.style.height = "auto";
          videoElement.style.overflow = "clip";
        } else {
          videoElement.style.width = "auto";
          videoElement.style.height = "100%";
        }
        videoElement.style.top = "50%";
        videoElement.style.transform = "translate(-50%, -50%)";
      }
    };

    updateVideoDimensions();
    window.addEventListener("resize", updateVideoDimensions);
    return () => window.removeEventListener("resize", updateVideoDimensions);
  }, []);

  useEffect(() => {
    handleVideo();
  }, [handleVideo]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-clip">
      <video
        className="absolute inset-0 left-1/2 h-full w-full -translate-x-1/2 overflow-y-clip object-cover"
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
    </div>
  );
};

export default VideoBackground;
