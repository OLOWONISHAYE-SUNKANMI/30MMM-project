import React from "react";
import CompleteLessonButton from "./CompleteLessonButton";
import PreviousLessonButton from "./PreviousLessonButton";

export default function CompleteLesson({
  isCompleted = false,
  isCompleting = false,
  onComplete,
  onReturnToDashboard,
  onGoToVideos,
}) {
  // Handle navigation actions
  const handleReturnToDashboard = () => {
    if (onReturnToDashboard) {
      onReturnToDashboard();
    }
  };

  const handleGoToVideos = () => {
    if (onGoToVideos) {
      onGoToVideos();
    }
  };

  // Show completion success state with navigation buttons
  if (isCompleted && !isCompleting) {
    return (
      <div className="flex w-full flex-col items-center space-y-6">
        {/* Success message */}
        <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-6">
          <svg
            className="h-6 w-6 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h3 className="font-semibold text-green-800">Lesson Completed!</h3>
            <p className="text-sm text-green-700">
              Your reflection has been saved and your progress updated.
            </p>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex w-[60%] flex-row items-center justify-center gap-4 xs:w-full xs:flex-col xs:gap-3">
          <button
            onClick={handleReturnToDashboard}
            className="flex flex-1 items-center justify-center rounded-full border-2 border-red-600 bg-red-600 px-6 py-4 text-lg text-white transition hover:bg-white hover:text-red-700 max-xs:text-sm xs:w-full"
          >
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
              />
            </svg>
            Return to Dashboard
          </button>

          <button
            onClick={handleGoToVideos}
            className="flex flex-1 items-center justify-center rounded-full border-2 border-red-600 bg-white px-6 py-4 text-lg text-red-600 transition hover:bg-red-600 hover:text-white max-xs:text-sm xs:w-full"
          >
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Watch Videos
          </button>
        </div>
      </div>
    );
  }

  // Show pre-completion buttons (original layout)
  return (
    <div className="flex h-[8vh] w-[60%] flex-row items-center justify-between rounded-3xl bg-black p-[3vw] shadow-2xl xs:w-full xs:bg-transparent">
      <PreviousLessonButton />
      <CompleteLessonButton
        onComplete={onComplete}
        isCompleted={isCompleted}
        isLoading={isCompleting}
      />
    </div>
  );
}
