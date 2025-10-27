"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ReflectionResponse({
  value = "",
  onChange,
  disabled = false,
  placeholder = "Write your reflection here.",
}) {
  const handleTextChange = (e) => {
    if (onChange && !disabled) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="grid w-full gap-1.5">
        <Label htmlFor="reflection">
          <Textarea
            id="reflection"
            placeholder={disabled ? "Reflection completed" : placeholder}
            value={value}
            onChange={handleTextChange}
            disabled={disabled}
            className={`mx-auto w-full md:w-full lg:w-3/4 ${
              disabled
                ? "cursor-not-allowed border-gray-200 bg-gray-50 text-gray-600"
                : "border-gray-300 bg-white"
            }`}
            rows={5}
          />
        </Label>
      </div>

      {/* Character count indicator */}
      {!disabled && (
        <div className="flex justify-end">
          <span className="text-sm text-gray-500">
            {value.length} characters
          </span>
        </div>
      )}

      {/* Completion indicator */}
      {disabled && value && (
        <div className="mt-2 rounded-lg border border-green-200 bg-green-50 p-3">
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="font-medium text-green-700">
              Your reflection has been saved
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
