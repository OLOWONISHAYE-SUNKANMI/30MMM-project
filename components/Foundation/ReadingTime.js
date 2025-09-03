import React from "react";
import calculateReadingTime from "@/lib/readingTimeCalculation";

export default function ReadingTime({ devotionText }) {
  // write a function to calculate read time, or obtain read time from DB -- this returns minutes, seconds and totalMinutes
  const { minutes } = calculateReadingTime(devotionText);
  return (
    <div className="ml-[5vw] text-xl font-extralight max-xs:text-sm">
      {minutes} minute read
    </div>
  );
}
