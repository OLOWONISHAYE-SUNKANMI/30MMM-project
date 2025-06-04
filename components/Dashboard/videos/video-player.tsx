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

// Sample video data
const videos = [
  {
    id: 1,
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    title: "The knockout came quick👊💥",
    subtitle: "Part 2",
    category: "Drama",
    description:
      "Replying to @Kasi Smith955 Bounty Hunter D - Part 2 if you knock me out keep your car 😂 #bountyhunterd #repo #knockedout ...",
    likes: "161.2K",
    comments: "2104",
    bookmarks: "11.7K",
    shares: "2122",
    username: "bountyhunterD",
    userImage: "/placeholder.svg?height=48&width=48",
  },
  {
    id: 2,
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    title: "Amazing trick shot🏀✨",
    subtitle: "First try",
    category: "Sports",
    description:
      "You won't believe this trick shot I made on the first try! #basketball #trickshot #amazing",
    likes: "89.4K",
    comments: "1432",
    bookmarks: "7.3K",
    shares: "1845",
    username: "trickmaster",
    userImage: "/placeholder.svg?height=48&width=48",
  },
  {
    id: 3,
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    title: "Cutest pet ever🐰❤️",
    subtitle: "Watch till end",
    category: "Pets",
    description:
      "My bunny doing the funniest thing ever! Wait for it... #cute #bunny #petlover",
    likes: "203.7K",
    comments: "3298",
    bookmarks: "15.2K",
    shares: "2756",
    username: "animalover",
    userImage: "/placeholder.svg?height=48&width=48",
  },
];

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
    <div
      className="relative h-[calc(100vh-120px)] w-full max-w-[400px] overflow-hidden rounded-md bg-black"
      ref={containerRef}
    >
      {/* Error message */}
      <div className="absolute left-0 right-0 top-0 z-20 bg-neutral-800/90 py-2 text-center text-sm text-white">
        Maximum number of attempts reached. Try again later.
      </div>

      {/* Navigation buttons */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex h-full w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          className="pointer-events-auto mt-16 rounded-full p-2 text-white hover:bg-black/30"
          onClick={goToPreviousVideo}
          disabled={currentVideoIndex === 0}
        >
          <ChevronUp className="h-8 w-8" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="pointer-events-auto mb-16 rounded-full p-2 text-white hover:bg-black/30"
          onClick={goToNextVideo}
          disabled={currentVideoIndex === videos.length - 1}
        >
          <ChevronDown className="h-8 w-8" />
        </Button>
      </div>

      {/* Video container */}
      <div className="relative h-full w-full">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className={`absolute left-0 top-0 h-full w-full transition-opacity duration-300 ${
              index === currentVideoIndex ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
          >
            <video
              ref={(el: HTMLVideoElement | null) => { videoRefs.current[index] = el; }}
              className="h-full w-full object-cover"
              src={video.videoUrl}
              loop
              playsInline
              muted={isMuted}
            />

            {/* Mute/Unmute button */}
            <button
              onClick={toggleMute}
              className="absolute left-4 top-14 z-10 rounded-full bg-black/40 p-2 text-white"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

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
                  <AvatarImage src={video.userImage || "/placeholder.svg"} />
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
                <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  +
                </div>
              </div>

              {/* Like */}
              <div className="flex flex-col items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-transparent hover:text-red-500"
                  onClick={() => toggleLike(video.id)}
                >
                  <Heart
                    className={`h-8 w-8 ${likedVideos.includes(video.id) ? "fill-red-500 text-red-500" : "fill-transparent"}`}
                  />
                </Button>
                <span className="text-xs font-semibold text-white">
                  {video.likes}
                </span>
              </div>

              {/* Comments */}
              <div className="flex flex-col items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-transparent"
                >
                  <MessageCircle className="h-8 w-8" />
                </Button>
                <span className="text-xs font-semibold text-white">
                  {video.comments}
                </span>
              </div>

              {/* Bookmark */}
              <div className="flex flex-col items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-transparent"
                  onClick={() => toggleBookmark(video.id)}
                >
                  <Bookmark
                    className={`h-8 w-8 ${bookmarkedVideos.includes(video.id) ? "fill-white" : "fill-transparent"}`}
                  />
                </Button>
                <span className="text-xs font-semibold text-white">
                  {video.bookmarks}
                </span>
              </div>

              {/* Share */}
              <div className="flex flex-col items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-transparent"
                >
                  <Share2 className="h-8 w-8" />
                </Button>
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

      {/* Video progress indicators */}
      <div className="absolute right-4 top-16 z-20 flex flex-col gap-1.5">
        {videos.map((_, index) => (
          <div
            key={index}
            className={`h-4 w-1 rounded-full ${index === currentVideoIndex ? "bg-white" : "bg-white/30"}`}
          />
        ))}
      </div>
    </div>
  );
}
