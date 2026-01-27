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
import { useAuth } from "@/contexts/AuthContext";



export default function VideoPlayer() {
  const { authState } = useAuth();
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [likedVideos, setLikedVideos] = useState<any[]>([]);
  const [bookmarkedVideos, setBookmarkedVideos] = useState<any[]>([]);
  const [videoStats, setVideoStats] = useState<{[key: string]: {likes: number, comments: number}}>({});
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loadingComments, setLoadingComments] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentVideo = videos[currentVideoIndex];
  const currentStats = currentVideo ? videoStats[(currentVideo as any).id] || {likes: 0, comments: 0} : {likes: 0, comments: 0};
  const currentUser = authState.user;

  useEffect(() => {
    setLoading(true);
    fetch('/api/videos')
      .then(res => res.json())
      .then(async (data) => {
        console.log('Videos data:', data);
        
        const videosWithUrls = await Promise.all(
          data.map(async (video) => {
            if (!video.blobUrl) return video;
            
            try {
              const url = new URL(video.blobUrl);
              const pathParts = url.pathname.split('/').filter(Boolean);
              const blobPath = pathParts.slice(1).join('/'); // Remove URL encoding
              const decodedBlobPath = decodeURIComponent(blobPath);
              
              console.log('Extracted blob path:', decodedBlobPath);
              
              const response = await fetch(`/api/generate-sas?blobPath=${encodeURIComponent(decodedBlobPath)}`);
              const sasData = await response.json();
              
              console.log('SAS response:', sasData);
              
              return { ...video, blobUrl: sasData.url || video.blobUrl };
            } catch (error) {
              console.error('Error generating SAS for video:', video.id, error);
              return video;
            }
          })
        );
        
        setVideos(videosWithUrls);
        
        // Fetch stats for each video and check if user liked it
        videosWithUrls.forEach(async (video: any) => {
          const response = await fetch(`/api/video-stats?videoId=${(video as any).id}`);
          const stats = await response.json();
          setVideoStats(prev => ({...prev, [(video as any).id]: stats}));
          
          // Check if current user liked this video
          const userId = currentUser?.name || 'Anonymous';
          const likeResponse = await fetch(`/api/video-stats?videoId=${(video as any).id}&userId=${userId}`);
          const likeData = await likeResponse.json();
          if (likeData.userLiked) {
            setLikedVideos(prev => [...prev, (video as any).id]);
          }
        });
      })
      .catch(err => console.error('Error fetching videos:', err))
      .finally(() => setLoading(false));
  }, []);

  // Initialize video refs array
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videos.length);
  }, []);

  // Handle video playback when changing videos
  useEffect(() => {
    if (videos.length === 0) return;
    
    videoRefs.current.forEach((videoRef, index) => {
      if (videoRef) {
        if (index === currentVideoIndex) {
          // Small delay to ensure video is ready
          setTimeout(() => {
            videoRef.play().catch((err) => {
              if (err.name !== 'AbortError') {
                console.error("Error playing video:", err);
              }
            });
          }, 100);
        } else {
          videoRef.pause();
          videoRef.currentTime = 0;
        }
      }
    });
  }, [currentVideoIndex, videos.length]);

  const toggleMute = () => {
    videoRefs.current.forEach((videoRef) => {
      if (videoRef) {
        videoRef.muted = !isMuted;
      }
    });
    setIsMuted(!isMuted);
  };

  const toggleLike = async (videoId: string) => {
    if (!videoId || !currentUser) return;
    
    const userId = currentUser.name || 'Anonymous';
    
    try {
      const response = await fetch('/api/video-stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId, userId, action: 'like' })
      });
      const result = await response.json();
      
      if (result.liked) {
        setLikedVideos(prev => [...prev, videoId]);
      } else {
        setLikedVideos(prev => prev.filter(id => id !== videoId));
      }
      
      // Update stats
      setVideoStats(prev => ({
        ...prev,
        [videoId]: {
          ...prev[videoId],
          likes: prev[videoId]?.likes + (result.liked ? 1 : -1) || 1
        }
      }));
    } catch (error) {
      console.error('Error toggling like:', error);
    }
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

  const loadComments = async (videoId: string) => {
    setLoadingComments(true);
    try {
      const response = await fetch(`/api/video-comments?videoId=${videoId}`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setLoadingComments(false);
    }
  };

  const addComment = async () => {
    if (!newComment.trim() || !currentVideo || !currentUser) return;
    
    try {
      const response = await fetch('/api/video-comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          videoId: (currentVideo as any).id,
          text: newComment,
          userId: currentUser.name || 'Anonymous'
        })
      });
      const comment = await response.json();
      setComments(prev => [comment, ...prev]);
      setNewComment('');
      
      // Update comment count
      setVideoStats(prev => ({
        ...prev,
        [(currentVideo as any).id]: {
          ...prev[(currentVideo as any).id],
          comments: (prev[(currentVideo as any).id]?.comments || 0) + 1
        }
      }));
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  // Load comments when video changes
  useEffect(() => {
    if (currentVideo && showComments) {
      loadComments((currentVideo as any).id);
    }
  }, [currentVideoIndex, (currentVideo as any)?.id]);

  if (loading) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-[900px] flex-col items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-primary-red border-t-transparent animate-spin"></div>
          </div>
          <p className="text-descriptions-grey text-lg font-medium">Loading videos...</p>
        </div>
      </div>
    );
  }

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
                {video.blobUrl && (
                  <video
                    ref={(el) => { videoRefs.current[index] = el; }}
                    className="h-full w-full object-cover"
                    src={video.blobUrl}
                    loop
                    playsInline
                    muted={isMuted}
                    controls={true}
                    preload="none"
                    aria-label={`Video: Week ${video.week} Day ${video.day}`}
                    onError={(e) => {
                      console.error('Video error for', (video as any).fileName, ':', (e.target as any).error);
                      console.error('Error code:', (e.target as any).error?.code, 'Message:', (e.target as any).error?.message);
                    }}
                    onLoadStart={() => console.log('Loading video:', (video as any).fileName, 'Type:', (video as any).fileType)}
                    onLoadedMetadata={() => console.log('Metadata loaded for:', video.fileName)}
                    onCanPlay={() => console.log('Can play:', video.fileName)}
                    onCanPlayThrough={() => console.log('Can play through:', video.fileName)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* All Content Below Video - Uses remaining 30% of viewport */}
        <div className="flex-1 flex flex-col px-4 pb-4">
          {/* Fixed Navigation Controls */}
          <div className="flex items-center justify-between py-4 bg-white sticky top-0 z-10 border-b">
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
              className="flex gap-3 overflow-x-auto max-w-md px-2 scrollbar-hide"
              role="tablist"
              aria-label="Video navigation"
              style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}
            >
              {videos.map((video, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setCurrentVideoIndex(index)}
                      className={`h-3 w-10 rounded-full transition-all duration-200 flex-shrink-0 ${
                        index === currentVideoIndex
                          ? "bg-gray-800"
                          : "bg-gray-300 hover:bg-gray-500"
                      }`}
                      role="tab"
                      aria-selected={index === currentVideoIndex}
                      aria-label={`Go to video ${index + 1}: Week ${video.week} Day ${video.day}`}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Video {index + 1}: Week {video.week} Day {video.day}
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

          {/* Scrollable Content */}
          <div className="space-y-4 overflow-y-auto flex-1">
          {/* Video Title and Info */}
          <div className="text-center">
            <div className="text-2xl font-bold leading-tight text-gray-800">
              Week {currentVideo?.week} Day {currentVideo?.day}
            </div>
            <div className="mt-2 text-base text-gray-600">
              {currentVideo?.firstName} {currentVideo?.lastName} • Cohort {currentVideo?.cohort}
            </div>
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
                <AvatarFallback>
                  {currentVideo?.firstName?.[0]}{currentVideo?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm text-gray-600">
                {currentVideo?.firstName} {currentVideo?.lastName}
              </div>
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
                    onClick={() => toggleLike(currentVideo?.id)}
                    aria-label={currentVideo && likedVideos.includes(currentVideo.id) ? "Unlike video" : "Like video"}
                  >
                    <Heart
                    className={`h-7 w-7 ${currentVideo && likedVideos.includes(currentVideo.id) ? "fill-red-500 text-red-500" : "fill-transparent"}`}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{currentVideo && likedVideos.includes(currentVideo.id) ? "Unlike" : "Like"}</p>
                </TooltipContent>
              </Tooltip>
              <span className="mt-1 text-sm font-semibold text-gray-700">{currentStats.likes}</span>
            </div>

            {/* Comments */}
            <div className="flex flex-col items-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-14 w-14 rounded-full text-gray-700 hover:bg-blue-50 hover:text-blue-500"
                    onClick={() => {
                      setShowComments(!showComments);
                      if (!showComments && currentVideo) {
                        loadComments(currentVideo.id);
                      }
                    }}
                  >
                    <MessageCircle className="h-7 w-7" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Comments</p>
                </TooltipContent>
              </Tooltip>
              <span className="mt-1 text-sm font-semibold text-gray-700">{currentStats.comments}</span>
            </div>

            {/* Bookmark */}
            <div className="flex flex-col items-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-14 w-14 rounded-full text-gray-700 hover:bg-yellow-50 hover:text-yellow-500"
                    onClick={() => toggleBookmark(currentVideo?.id)}
                    aria-label={currentVideo && bookmarkedVideos.includes(currentVideo.id) ? "Remove bookmark" : "Bookmark video"}
                  >
                    <Bookmark
                      className={`h-7 w-7 ${currentVideo && bookmarkedVideos.includes(currentVideo.id) ? "fill-yellow-500 text-yellow-500" : "fill-transparent"}`}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{currentVideo && bookmarkedVideos.includes(currentVideo.id) ? "Remove Bookmark" : "Bookmark"}</p>
                </TooltipContent>
              </Tooltip>
              <span className="mt-1 text-sm font-semibold text-gray-700">0</span>
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
              <span className="mt-1 text-sm font-semibold text-gray-700">0</span>
            </div>
          </div>

          {/* Video Info */}
          <div className="text-center text-gray-600">
            <div className="text-sm">
              Uploaded: {currentVideo && new Date(currentVideo.createdAt).toLocaleDateString()}
            </div>
            <div className="text-sm">
              File: {currentVideo?.fileName}
            </div>
          </div>

          <div className="text-center text-gray-500 text-sm">
            Video {currentVideoIndex + 1} of {videos.length}
          </div>

          {/* Comments Section */}
          {showComments && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Comments</h3>
              
              {/* Add Comment */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 px-3 py-2 border rounded-lg"
                  onKeyPress={(e) => e.key === 'Enter' && addComment()}
                />
                <Button onClick={addComment} size="sm">
                  Post
                </Button>
              </div>
              
              {/* Comments List */}
              <div className="space-y-3 max-h-40 overflow-y-auto">
                {loadingComments ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600"></div>
                    <span className="ml-2 text-gray-600">Loading comments...</span>
                  </div>
                ) : (
                  Array.isArray(comments) && comments.map((comment: any, index: number) => (
                    <div key={comment.id || index} className="bg-white p-3 rounded">
                      <div className="font-medium text-sm">{comment.userId}</div>
                      <div className="text-gray-700">{comment.text}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(comment.createdAt).toLocaleString()}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
