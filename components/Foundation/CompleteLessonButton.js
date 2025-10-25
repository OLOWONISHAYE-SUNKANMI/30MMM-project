import React from "react";

export default function CompleteLessonButton({
  onComplete,
  isCompleted = false,
  isLoading = false,
  disabled = false,
}) {
  const handleClick = () => {
    if (onComplete && !isLoading && !isCompleted && !disabled) {
      onComplete();
    }
  };

  // Don't render if already completed
  if (isCompleted) {
    return null;
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading || disabled}
      className={`flex items-center justify-center rounded-full px-6 py-4 text-lg text-white transition max-xs:text-sm ${
        isLoading || disabled
          ? "cursor-not-allowed bg-gray-400"
          : "cursor-pointer bg-red-600 hover:bg-white hover:text-red-500"
      } `}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          {/* Loading spinner */}
          <svg
            className="h-5 w-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Completing...</span>
        </div>
      ) : (
        "Complete"
      )}
    </button>
  );
}
