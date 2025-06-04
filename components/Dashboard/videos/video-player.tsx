"use client";

import { useState, useRef, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Volume2,
  VolumeX,
  User,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { videos } from "@/sample-data/devotional-videos"; // Adjust the import path as necessary

export default function VideoPlayer() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [likedVideos, setLikedVideos] = useState<number[]>([]);
  const [bookmarkedVideos, setBookmarkedVideos] = useState<number[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentVideo = videos[currentVideoIndex];

  // Initialize video refs array
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videos.length);
  }, []);

  // Handle video playback when changing videos
  useEffect(() => {
    videoRefs.current.forEach((videoRef, index) => {
      if (videoRef) {
        if (index === currentVideoIndex) {
          videoRef
            .play()
            .catch((err) => console.error("Error playing video:", err));
        } else {
          videoRef.pause();
          videoRef.currentTime = 0;
        }
      }
    });
  }, [currentVideoIndex]);

  const toggleMute = () => {
    videoRefs.current.forEach((videoRef) => {
      if (videoRef) {
        videoRef.muted = !isMuted;
      }
    });
    setIsMuted(!isMuted);
  };

  const toggleLike = (videoId: number) => {
    setLikedVideos((prev) =>
      prev.includes(videoId)
        ? prev.filter((id) => id !== videoId)
        : [...prev, videoId],
    );
  };

  const toggleBookmark = (videoId: number) => {
    setBookmarkedVideos((prev) =>
      prev.includes(videoId)
        ? prev.filter((id) => id !== videoId)
        : [...prev, videoId],
    );
  };

  const goToNextVideo = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  const goToPreviousVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  return (
    <TooltipProvider>
      <div className="flex w-full max-w-[500px] flex-col items-center gap-4">
        {/* External Navigation Controls - Top */}
        <div className="flex w-full items-center justify-between px-4">
          {/* Up Navigation */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border border-gray-300 p-3 text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={goToPreviousVideo}
                disabled={currentVideoIndex === 0}
                aria-label="Previous video"
              >
                <ChevronUp className="h-6 w-6" />
                <span className="sr-only">Go to previous video</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Previous Video</p>
            </TooltipContent>
          </Tooltip>

          {/* Video Progress Indicators */}
          <div
            className="flex gap-2"
            role="tablist"
            aria-label="Video navigation"
          >
            {videos.map((video, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setCurrentVideoIndex(index)}
                    className={`h-2 w-8 rounded-full transition-all duration-200 ${
                      index === currentVideoIndex
                        ? "bg-gray-800"
                        : "bg-gray-300 hover:bg-gray-500"
                    }`}
                    role="tab"
                    aria-selected={index === currentVideoIndex}
                    aria-label={`Go to video ${index + 1}: ${video.title}`}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Video {index + 1}: {video.title}
                  </p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          {/* Down Navigation */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border border-gray-300 p-3 text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={goToNextVideo}
                disabled={currentVideoIndex === videos.length - 1}
                aria-label="Next video"
              >
                <ChevronDown className="h-6 w-6" />
                <span className="sr-only">Go to next video</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Next Video</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Video Player Container */}
        <div
          className="relative h-[calc(100vh-200px)] w-full max-w-[400px] overflow-hidden rounded-lg border border-gray-200 bg-black shadow-2xl"
          ref={containerRef}
        >
          {/* Error message */}
          <div className="absolute left-0 right-0 top-0 z-20 bg-neutral-800/90 py-2 text-center text-sm text-white">
            Maximum number of attempts reached. Try again later.
          </div>

          {/* Video container */}
          <div className="relative h-full w-full">
            {videos.map((video, index) => (
              <div
                key={video.id}
                className={`absolute left-0 top-0 h-full w-full transition-opacity duration-300 ${
                  index === currentVideoIndex
                    ? "z-10 opacity-100"
                    : "z-0 opacity-0"
                }`}
              >
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  className="h-full w-full object-cover"
                  src={video.videoUrl}
                  loop
                  playsInline
                  muted={isMuted}
                  aria-label={`Video: ${video.title} by ${video.username}`}
                />

                {/* Mute/Unmute button */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={toggleMute}
                      className="absolute left-4 top-14 z-10 rounded-full bg-black/40 p-2 text-white transition-colors hover:bg-black/60"
                      aria-label={isMuted ? "Unmute video" : "Mute video"}
                    >
                      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isMuted ? "Unmute" : "Mute"}</p>
                  </TooltipContent>
                </Tooltip>

                {/* Video text overlays */}
                <div className="absolute left-0 right-0 top-1/4 z-10 flex flex-col items-center text-white">
                  <div className="mb-2 rounded-lg bg-white px-4 py-2 text-xl font-bold text-black">
                    {video.title}
                  </div>
                  <div className="rounded-lg bg-white px-4 py-1 text-lg font-bold text-black">
                    {video.subtitle}
                  </div>
                </div>

                {/* Interaction buttons */}
                <div className="absolute bottom-24 right-2 z-10 flex flex-col items-center gap-6">
                  {/* Profile */}
                  <div className="flex flex-col items-center">
                    <Avatar className="h-12 w-12 border-2 border-white">
                      <AvatarImage
                        src={video.userImage || "/placeholder.svg"}
                      />
                      <AvatarFallback>
                        <User />
                      </AvatarFallback>
                    </Avatar>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="mt-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-red-500 text-xs text-white transition-colors hover:bg-red-600">
                          +
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Follow @{video.username}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  {/* Like */}
                  <div className="flex flex-col items-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:bg-transparent hover:text-red-500"
                          onClick={() => toggleLike(video.id)}
                          aria-label={
                            likedVideos.includes(video.id)
                              ? "Unlike video"
                              : "Like video"
                          }
                        >
                          <Heart
                            className={`h-8 w-8 ${likedVideos.includes(video.id) ? "fill-red-500 text-red-500" : "fill-transparent"}`}
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {likedVideos.includes(video.id) ? "Unlike" : "Like"}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                    <span className="text-xs font-semibold text-white">
                      {video.likes}
                    </span>
                  </div>

                  {/* Comments */}
                  <div className="flex flex-col items-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:bg-transparent"
                          aria-label="View comments"
                        >
                          <MessageCircle className="h-8 w-8" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Comments</p>
                      </TooltipContent>
                    </Tooltip>
                    <span className="text-xs font-semibold text-white">
                      {video.comments}
                    </span>
                  </div>

                  {/* Bookmark */}
                  <div className="flex flex-col items-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:bg-transparent"
                          onClick={() => toggleBookmark(video.id)}
                          aria-label={
                            bookmarkedVideos.includes(video.id)
                              ? "Remove bookmark"
                              : "Bookmark video"
                          }
                        >
                          <Bookmark
                            className={`h-8 w-8 ${bookmarkedVideos.includes(video.id) ? "fill-white" : "fill-transparent"}`}
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {bookmarkedVideos.includes(video.id)
                            ? "Remove Bookmark"
                            : "Bookmark"}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                    <span className="text-xs font-semibold text-white">
                      {video.bookmarks}
                    </span>
                  </div>

                  {/* Share */}
                  <div className="flex flex-col items-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:bg-transparent"
                          aria-label="Share video"
                        >
                          <Share2 className="h-8 w-8" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Share</p>
                      </TooltipContent>
                    </Tooltip>
                    <span className="text-xs font-semibold text-white">
                      {video.shares}
                    </span>
                  </div>
                </div>

                {/* Video info */}
                <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black to-transparent p-4 text-white">
                  <div className="mb-1 text-sm font-bold">{video.category}</div>
                  <div className="mb-2 text-xs">
                    {video.description}
                    <span className="ml-1 text-gray-300">more</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Info Display - Bottom */}
        <div className="w-full px-4 text-center text-gray-800">
          <div className="text-sm opacity-75">
            Video {currentVideoIndex + 1} of {videos.length} •{" "}
            {currentVideo.category}
          </div>
          <div className="mt-1 text-lg font-semibold">
            @{currentVideo.username}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
