export default function VideoBackground({ videoId }) {
  // const videoSources = ["/videos/Hero Video Corrected.mov"];

  useEffect(() => {
    // Load YouTube API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Initialize player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      new window.YT.Player("youtube-player", {
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          enablejsapi: 1,
          loop: 1,
          mute: 1,
          playlist: videoId, // Required for looping
          playsinline: 1,
        },
        events: {
          onReady: (event) => {
            event.target.playVideo();
          },
        },
      });
    };
  }, [videoId]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="relative h-full w-full">
        <div
          id="youtube-player"
          className="absolute left-1/2 top-1/2 h-[300%] min-h-full w-[300%] min-w-full -translate-x-1/2 -translate-y-1/2"
        />
        <div className="absolute inset-0 bg-primary-red/50" /> {/* Overlay */}
      </div>
    </div>
  );
}
