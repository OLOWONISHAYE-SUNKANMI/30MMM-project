import React from "react";
import { PiLightningFill } from "react-icons/pi";

export default function ReflectionBox({ reflectionQuestion }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-amber-200/50 bg-gradient-to-br from-amber-50 to-orange-50 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
      {/* Background decoration */}
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-gradient-to-bl from-amber-300/20 to-transparent blur-2xl"></div>

      <div className="relative flex items-start gap-4">
        {/* Modern icon container */}
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 animate-pulse rounded-full bg-amber-400/30 blur-md"></div>
          <div className="relative rounded-full bg-gradient-to-br from-amber-400 to-orange-500 p-3 shadow-lg">
            <PiLightningFill
              size={28}
              color="white"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <h3 className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-2xl font-bold text-transparent">
              Reflection
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-amber-400 to-transparent"></div>
          </div>

          <p className="text-lg font-medium leading-relaxed text-gray-700">
            {reflectionQuestion}
          </p>
        </div>
      </div>
    </div>
  );
}
