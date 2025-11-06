"use client";

import React from "react";

export default function WeekCard({
  week,
  status,
  title,
  progress,
  daysCompleted,
  userProgress,
}) {
  // Determine status color based on status
  const getStatusColor = () => {
    switch (status) {
      case "Completed":
        return "bg-lime-500/20 text-lime-500";
      case "In Progress":
        return "bg-blue-500/20 text-blue-500";
      case "Upcoming":
        return "bg-gray-500/20 text-gray-500";
      default:
        return "bg-gray-500/20 text-gray-500";
    }
  };

  // Function to determine the color of each progress bar
  // This handles three states: completed, current, and upcoming
  const getProgressBarColor = (index) => {
    // If this week is "In Progress" and this bar represents the current day
    // The current day is at index === daysCompleted - 1 because:
    // - If 2 days are completed (daysCompleted = 2), the current day is at index 1
    // - If 3 days are completed (daysCompleted = 3), the current day is at index 2
    if (status === "In Progress" && index === daysCompleted) {
      return "bg-primary-red";
    }

    // If this bar represents a completed day (any day before the current day)
    // For example, if daysCompleted = 3, then indices 0 and 1 are completed
    // But index 2 is the current day (handled above), not completed yet
    else if (index < daysCompleted) {
      return "bg-lime-500";
    }

    // For all other cases: upcoming days that haven't been reached yet
    // This includes all days in "Upcoming" weeks and future days in "In Progress" weeks
    else {
      return "bg-gray-300";
    }
  };

  // Create an array of 7 elements representing each day of the week
  // We'll use the indices to determine the color of each bar
  const progressBars = Array.from({ length: 7 });

  return (
    <div className="h-[290px] w-[320px] flex-col items-center justify-center rounded-3xl bg-lesson-card bg-top bg-no-repeat shadow-lg">
      <div className="h-[158px] w-full" />
      <div className="flex h-[132px] w-full items-center justify-center rounded-bl-3xl rounded-br-3xl">
        <div className="flex h-[86px] w-[280px] flex-col justify-evenly gap-y-2">
          <div className="inline-flex w-full items-start justify-between self-stretch">
            <div className="text-[10px] font-medium uppercase leading-[14px] tracking-wide text-slate-500">
              Week {week}
            </div>
            <div
              className={`inline-flex h-[18px] w-[69px] items-center justify-center gap-2.5 rounded-2xl px-1.5 py-px ${getStatusColor()}`}
            >
              <div className="text-[8px] font-medium uppercase leading-none">
                {status}
              </div>
            </div>
          </div>
          <div className="text-base font-medium capitalize leading-relaxed text-zinc-900">
            {title}
          </div>
          <div className="relative h-1.5 w-[279.02px]">
            <div className="absolute left-0 top-0 h-1.5 w-[279.02px] rounded-[52px] bg-gray-200 opacity-60" />
            <div className="absolute left-0 top-0 inline-flex h-1.5 w-[279.01px] items-start justify-start gap-0.5 rounded-[52px]">
              {/* Dynamically render progress bars with three states: completed, current, and upcoming */}
              {progressBars.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 w-[38.43px] rounded-[52px] ${getProgressBarColor(index)}`}
                />
              ))}
            </div>
          </div>
          <div className="mt-2 inline-flex w-full items-start justify-between self-stretch">
            <div className="text-xs font-medium capitalize leading-[18px] text-slate-500">
              Progress
            </div>
            <div className="text-xs font-bold capitalize leading-[18px] text-zinc-900">
              {progress}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
