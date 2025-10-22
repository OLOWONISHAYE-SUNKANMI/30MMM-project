"use client";

import { useRef, useState } from "react";
import { YouTubeEmbed } from "@next/third-parties/google";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Video {
  id: string;
  title: string;
  creator: string;
}

export default function VideoCarousel() {
  const videos: Video[] = [
    {
      id: "UaxzNkIJMKg",
      title: "A Father's Legacy: How Damon's Sons Found Renewal Through CLEAN",
      creator: "Damon Tucker",
    },
    {
      id: "rtU_jEiPk00",
      title: "Standing Firm: Wes's Journey to Biblical Conviction in Marriage",
      creator: "Wes Miller",
    },
    {
      id: "8dioAW7WFXY",
      title: "Renewed Spirit: Ray's Fresh Start and Spiritual Awakening",
      creator: "Ray Green",
    },
    {
      id: "o5GlxC2Slso",
      title:
        "From the Beginning: Melvin's Testimony of Brotherhood and Transformation",
      creator: "Melvin Stewart",
    },
  ];

  // Initialize with the first video
  const [activeVideo, setActiveVideo] = useState<string>(videos[0].id);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { current } = carouselRef;
      const scrollAmount = direction === "left" ? -220 : 220;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const getThumbnailUrl = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  const getActiveVideoData = () => {
    return videos.find((video) => video.id === activeVideo) || videos[0];
  };

  const getOtherVideos = () => {
    return [...videos, ...videos].filter((video) => video.id !== activeVideo);
  };

  return (
    <div className="mx-auto w-full py-4 xl:container md:px-4 md:py-8">
      <h2 className="mb-4 text-center text-xl font-bold md:mb-6 md:text-2xl">
        Featured Videos
      </h2>

      <div className="row-auto grid grid-cols-1 place-items-center justify-center gap-y-4 md:gap-y-8">
        {/* Featured Video */}
        <div className="w-full max-w-full px-0 sm:px-4 md:px-6 lg:max-w-3xl">
          <div className="bg-black first:mx-auto first:h-auto max-xs:first:w-[calc(100dvw-20px)]">
            <YouTubeEmbed videoid={activeVideo} />
          </div>
          <div className="mt-2 md:mt-4 lg:mx-3">
            <h3 className="mx-auto w-[calc(80vw-4px)] text-sm font-medium md:text-justify md:text-xl md:font-semibold">
              {getActiveVideoData().title}
            </h3>
            <p className="indent-3 text-xs text-gray-600 md:text-base">
              {getActiveVideoData().creator}
            </p>
          </div>
        </div>

        {/* Other Videos Carousel */}
        <div>
          <h3 className="mb-2 text-base font-medium md:mb-4 md:text-lg">
            More Videos
          </h3>
          <div className="relative max-w-[calc(100vw-10px)] overflow-y-clip">
            <div
              ref={carouselRef}
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
              className="inline-flex w-full max-w-[calc(100vw-20px)] snap-x gap-x-2 overflow-x-scroll pb-4 md:gap-4 xl:mb-[-12px] xl:max-w-3xl"
            >
              {getOtherVideos().map((video, index) => (
                <div
                  key={video.id + index}
                  className="w-[180px] shrink-0 grow-0 md:w-[220px]"
                >
                  <div
                    className="aspect-video group relative cursor-pointer items-center overflow-hidden rounded-lg"
                    onClick={() => setActiveVideo(video.id)}
                  >
                    <Image
                      src={getThumbnailUrl(video.id) || "/placeholder.svg"}
                      alt={video.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      width={320}
                      height={180}
                      sizes="(max-width: 480px) 75vw, (max-width: 768px) 180px, 320px"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                      <Play className="h-8 w-8 text-white md:h-10 md:w-10" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-1 md:p-2">
                      <p className="text-xs font-medium text-white md:text-sm">
                        {video.creator}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {getOtherVideos().length > 2 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-0.5 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg hover:bg-white max-xs:size-7 md:left-0"
                  onClick={() => scroll("left")}
                >
                  <ChevronLeft className="size-4 md:size-7" />
                  <span className="sr-only">Scroll left</span>
                </Button>

                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-0.5 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full bg-white/80 p-2 shadow-lg hover:bg-white max-xs:size-7 md:right-0"
                  onClick={() => scroll("right")}
                >
                  <ChevronRight className="size-4 md:size-5" />
                  <span className="sr-only">Scroll right</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
