import React from "react";

// TODO: Implement the actual reflection processing form
/**
 * This form should handle:
 *
 * - a text area for user input
 * - a button to submit the reflection to the prisma db
 * - loading and error states
 * - logic to properly update the currentDay and the progression for the week (i.e. week1Completed colums); this means that the currentday is incremented to the next day, and the weekXCompleted column is updated by 1 day, unless its already at 7, then it should move to the next day
 * - on successful submission, show the PostReflectionNavigationButtons component
 *
 *  inputs:
 *
 * - needs the devotional id and user id to submit the reflection to the userProgress table
 */

function ReflectionProcessingForm() {
  const onSubmit = () => {
    console.log("Submitting reflection...");
  };

  return (
    <div className={`w-full`}>
      {/* Reflection Response Text Box */}
      <div className={`w-full`}>
        {/* Label */}
        <label className="mb-2 block text-sm font-medium text-black">
          Your Response
        </label>

        {/* Textarea */}
        <textarea
          rows={10}
          required={true}
          placeholder="Enter your reflection..."
          className="w-full resize-none rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-black transition-all duration-200 ease-in-out placeholder:text-gray-400 hover:border-gray-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
        />

        {/* Submit Button */}
        <button
          type="button"
          onClick={onSubmit}
          className="mx-auto mt-4 flex rounded-lg bg-primary-red px-6 py-3 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-primary-red focus:ring-offset-2 active:scale-[0.98]"
        >
          Submit Reflection
        </button>
      </div>
    </div>
  );
}

export default ReflectionProcessingForm;
