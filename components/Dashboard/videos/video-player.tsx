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
    <TooltipProvider>
      <div className="mx-auto flex min-h-screen w-full max-w-[900px] flex-col">
        {/* Video Player Container - Exactly 70% of viewport height */}
        <div
          className="m-2 h-[70vh] w-full overflow-hidden rounded-lg border border-gray-200 bg-black shadow-2xl"
          ref={containerRef}
        >
          {/* Video container - completely clean */}
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
                  ref={(el) => { videoRefs.current[index] = el; }}
                  className="h-full w-full object-cover"
                  src={video.videoUrl}
                  loop
                  playsInline
                  muted={isMuted}
                  aria-label={`Video: ${video.title} by ${video.username}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* All Content Below Video - Uses remaining 30% of viewport */}
        <div className="flex-1 space-y-4 overflow-y-auto px-4 pb-4">
          {/* Video Title and Info */}
          <div className="text-center">
            <div className="text-2xl font-bold leading-tight text-gray-800">
              {currentVideo.title} {currentVideo.subtitle}
            </div>
            <div className="mt-2 text-base text-gray-600">
              @{currentVideo.username} • {currentVideo.category}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            {/* Previous Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="default"
                  className="rounded-full border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={goToPreviousVideo}
                  disabled={currentVideoIndex === 0}
                  aria-label="Previous video"
                >
                  <ChevronUp className="mr-2 h-5 w-5" />
                  <span className="text-sm">Previous</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Previous Video</p>
              </TooltipContent>
            </Tooltip>

            {/* Video Progress Indicators */}
            <div
              className="flex gap-3"
              role="tablist"
              aria-label="Video navigation"
            >
              {videos.map((video, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setCurrentVideoIndex(index)}
                      className={`h-3 w-10 rounded-full transition-all duration-200 ${
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

            {/* Next Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="default"
                  className="rounded-full border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={goToNextVideo}
                  disabled={currentVideoIndex === videos.length - 1}
                  aria-label="Next video"
                >
                  <span className="text-sm">Next</span>
                  <ChevronDown className="ml-2 h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Next Video</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Video Controls and Profile */}
          <div className="flex items-center justify-between">
            {/* Mute/Unmute button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="default"
                  onClick={toggleMute}
                  className="rounded-full px-4 py-2"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  <span className="ml-2 text-sm">
                    {isMuted ? "Unmute" : "Mute"}
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isMuted ? "Unmute" : "Mute"}</p>
              </TooltipContent>
            </Tooltip>

            {/* Profile */}
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border-2 border-gray-300">
                <AvatarImage
                  src={currentVideo.userImage || "/placeholder.svg"}
                />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="default"
                    className="px-4 py-2 text-sm text-red-500 hover:bg-red-50 hover:text-red-600"
                  >
                    Follow
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Follow @{currentVideo.username}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Interaction Buttons */}
          <div className="flex items-center justify-center gap-10">
            {/* Like */}
            <div className="flex flex-col items-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-14 w-14 rounded-full text-gray-700 hover:bg-red-50 hover:text-red-500"
                    onClick={() => toggleLike(currentVideo.id)}
                    aria-label={
                      likedVideos.includes(currentVideo.id)
                        ? "Unlike video"
                        : "Like video"
                    }
                  >
                    <Heart
                      className={`h-7 w-7 ${likedVideos.includes(currentVideo.id) ? "fill-red-500 text-red-500" : "fill-transparent"}`}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {likedVideos.includes(currentVideo.id) ? "Unlike" : "Like"}
                  </p>
                </TooltipContent>
              </Tooltip>
              <span className="mt-1 text-sm font-semibold text-gray-700">
                {currentVideo.likes}
              </span>
            </div>

            {/* Comments */}
            <div className="flex flex-col items-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-14 w-14 rounded-full text-gray-700 hover:bg-blue-50 hover:text-blue-500"
                    aria-label="View comments"
                  >
                    <MessageCircle className="h-7 w-7" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Comments</p>
                </TooltipContent>
              </Tooltip>
              <span className="mt-1 text-sm font-semibold text-gray-700">
                {currentVideo.comments}
              </span>
            </div>

            {/* Bookmark */}
            <div className="flex flex-col items-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-14 w-14 rounded-full text-gray-700 hover:bg-yellow-50 hover:text-yellow-500"
                    onClick={() => toggleBookmark(currentVideo.id)}
                    aria-label={
                      bookmarkedVideos.includes(currentVideo.id)
                        ? "Remove bookmark"
                        : "Bookmark video"
                    }
                  >
                    <Bookmark
                      className={`h-7 w-7 ${bookmarkedVideos.includes(currentVideo.id) ? "fill-yellow-500 text-yellow-500" : "fill-transparent"}`}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {bookmarkedVideos.includes(currentVideo.id)
                      ? "Remove Bookmark"
                      : "Bookmark"}
                  </p>
                </TooltipContent>
              </Tooltip>
              <span className="mt-1 text-sm font-semibold text-gray-700">
                {currentVideo.bookmarks}
              </span>
            </div>

            {/* Share */}
            <div className="flex flex-col items-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-14 w-14 rounded-full text-gray-700 hover:bg-green-50 hover:text-green-500"
                    aria-label="Share video"
                  >
                    <Share2 className="h-7 w-7" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share</p>
                </TooltipContent>
              </Tooltip>
              <span className="mt-1 text-sm font-semibold text-gray-700">
                {currentVideo.shares}
              </span>
            </div>
          </div>

          {/* Video Description */}
          <div className="text-center text-gray-700">
            <div className="text-sm leading-relaxed">
              {currentVideo.description}
              <span className="ml-1 cursor-pointer text-blue-500 hover:underline">
                more
              </span>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Video {currentVideoIndex + 1} of {videos.length}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
