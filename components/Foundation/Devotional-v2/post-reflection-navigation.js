export default function PostReflectionNavigationButtons({ className = "" }) {
  // Handle navigation actions
  const handleReturnToDashboard = () => {
    router.push("/dashboard");
  };

  const handleGoToVideos = () => {
    router.push("/dashboard/videos");
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        {/* Return to Dashboard Button */}
        <button
          type="button"
          onClick={handleReturnToDashboard}
          className="flex-1 rounded-lg border-2 border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-black transition-all duration-200 ease-in-out hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/10 active:scale-[0.98] sm:flex-none"
        >
          Return to Dashboard
        </button>

        {/* Go to Videos Button */}
        <button
          type="button"
          onClick={handleGoToVideos}
          className="flex-1 rounded-lg bg-primary-red px-6 py-3 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-primary-red focus:ring-offset-2 active:scale-[0.98] sm:flex-none"
        >
          Go to Videos
        </button>
      </div>
    </div>
  );
}
