"use client";

import React, { useState } from "react";
import { submitReflection } from "@/actions/reflection-submission";
import PostReflectionNavigationButtons from "@/components/Foundation/Devotional-v2/post-reflection-navigation";
import UploadVideo from "@/components/testimonial-upload/upload-video";

function ReflectionProcessingForm({ devotionalId, userId }) {
  // State management remains the same - we still need to track what's happening on the client
  const [reflectionText, setReflectionText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const isSubmitted = false;
  const [isVideo, setIsVideo] = useState(true);

  // TODO : Add props for week, day, firstName, lastName to UploadVideo component
  // pull props from devotionalData and session user data

  const onSubmit = async () => {
    // Client-side validation provides immediate feedback to the user
    // This happens before we even call the server, making the UX snappier
    if (!reflectionText.trim()) {
      setError("Please enter your reflection before submitting.");
      return;
    }

    // Reset error state and indicate that we're processing
    setError(null);
    setIsSubmitting(true);

    try {
      // Here's where the magic happens - we call the Server Action directly
      // It looks like a regular function call, but it's actually making a request
      // to the server behind the scenes. Next.js handles all the networking for us.
      const result = await submitReflection(
        userId,
        devotionalId,
        reflectionText,
      );

      // Check if the operation was successful
      // The Server Action returns an object with a success flag and either data or an error
      if (!result.success) {
        throw new Error(result.error);
      }

      // If we get here, everything worked! Show the success state
      setIsSuccess(true);
    } catch (err) {
      // If anything goes wrong, capture the error message
      // This could be from our Server Action returning success: false,
      // or from a network error, or from any other unexpected issue
      setError(
        err.message || "An unexpected error occurred. Please try again.",
      );
    } finally {
      // Always turn off the loading state, whether we succeeded or failed
      setIsSubmitting(false);
    }
  };

  // Once the reflection is successfully submitted, we show the navigation buttons
  // instead of the form. This prevents duplicate submissions and moves the user forward.
  if (isSuccess) {
    return (
      <div className="w-full">
        <div className="mb-4 rounded-lg bg-green-50 p-4 text-green-800">
          Your reflection has been saved successfully! Great work on completing
          today&apos;s devotional.
        </div>
        {/* Replace this with your actual PostReflectionNavigationButtons component */}
        <PostReflectionNavigationButtons />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Error messages are shown at the top so they're immediately visible */}
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-800">
          {error}
        </div>
      )}

      <div className="w-full">
        <label className="mb-4 block text-lg font-semibold text-gray-900">
          Your Response: Text or Video
        </label>

        <button
          onClick={() => setIsVideo(!isVideo)}
          className="relative h-14 w-80 rounded-lg border-2 border-gray-300 bg-white p-1 shadow-sm transition-all duration-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-red focus:ring-offset-2"
        >
          {/* Sliding background */}
          <div
            className={`absolute top-1 h-11 w-[calc(50%-0.25rem)] rounded-md bg-primary-red shadow-sm transition-all duration-300 ease-in-out ${
              isVideo ? "left-[calc(50%+0.125rem)]" : "left-1"
            }`}
          />

          {/* Text option */}
          <div
            className={`relative z-10 flex h-11 w-1/2 items-center justify-center transition-all duration-200 ${
              !isVideo
                ? "font-semibold text-white"
                : "font-medium text-gray-600"
            }`}
          >
            <span className="text-sm">📝 Text</span>
          </div>

          {/* Video option */}
          <div
            className={`absolute right-1 top-1 z-10 flex h-11 w-[calc(50%-0.25rem)] items-center justify-center transition-all duration-200 ${
              isVideo ? "font-semibold text-white" : "font-medium text-gray-600"
            }`}
          >
            <span className="text-sm">🎥 Video</span>
          </div>
        </button>

        {/* Status display */}
        <div className="mb-6 mt-4">
          <p className="text-sm text-gray-600">
            Selected:{" "}
            <span className="font-semibold text-gray-900">
              {isVideo ? "Video" : "Text"} Submission
            </span>
          </p>
        </div>

        {!isVideo ? (
          <textarea
            value={reflectionText}
            onChange={(e) => setReflectionText(e.target.value)}
            rows={10}
            required={true}
            disabled={isSubmitting}
            placeholder="Enter your reflection..."
            className="w-full resize-none rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-gray-900 transition-all duration-200 ease-in-out placeholder:text-gray-400 hover:border-gray-400 focus:border-primary-red focus:outline-none focus:ring-2 focus:ring-primary-red focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        ) : (
          <UploadVideo
            week={1}
            day={1}
            firstName="test"
            lastName="user"
          />
        )}

        {isSubmitted && (
          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="mx-auto mt-6 flex rounded-lg bg-primary-red px-6 py-3 font-semibold text-white transition-all duration-200 ease-in-out hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-primary-red focus:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Reflection"}
          </button>
        )}
      </div>
    </div>
  );
}

export default ReflectionProcessingForm;
