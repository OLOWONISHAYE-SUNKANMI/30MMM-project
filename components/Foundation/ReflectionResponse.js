"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function TextArea() {
  const [reflection, setReflection] = useState("");
  const [submittedReflections, setSubmittedReflections] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reflection has been submitted!");

    if (reflection.trim()) {
      // Add the reflection to submitted reflections
      setSubmittedReflections((prev) => [...prev, reflection]);

      // Clear the textarea after submission
      setReflection("");
    }
  };

  return (
    <div className="w-full space-y-4">
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div className="grid w-full gap-1.5">
          <Label htmlFor="reflection">
            <Textarea
              id="reflection"
              placeholder="Write your reflection here."
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              className="mx-auto w-full md:w-full lg:w-3/4"
              rows={5}
            />
          </Label>
        </div>
        <Button
          type="submit"
          className="mx-auto block"
        >
          submit
        </Button>
      </form>

      {submittedReflections.length > 0 && (
        <div className="mt-4">
          <h3 className="mb-2 text-lg font-semibold">Submitted Reflections:</h3>
          <ul className="space-y-2">
            {submittedReflections.map((ref, index) => (
              <li
                key={index}
                className="rounded bg-gray-100 p-2"
              >
                {ref}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
