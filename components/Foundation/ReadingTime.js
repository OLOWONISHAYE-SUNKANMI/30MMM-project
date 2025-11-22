import React from "react";
import calculateReadingTime from "@/lib/readingTimeCalculation";

export default function ReadingTime({ devotionText }) {
  // Add safety check for undefined text
  if (!devotionText || typeof devotionText !== "string") {
    console.warn(
      "ReadingTime: devotionText is undefined or not a string:",
      devotionText,
    );
    return (
      <div className="ml-[5vw] text-xl font-extralight max-xs:text-sm">
        -- minute read
      </div>
    );
  }

  const { minutes } = calculateReadingTime(devotionText);
  return (
    <div className="ml-[5vw] text-xl font-extralight max-xs:text-sm">
      {minutes} minute read
    </div>
  );
}
