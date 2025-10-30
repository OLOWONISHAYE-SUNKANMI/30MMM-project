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
  return <div>ReflectionProcessingForm</div>;
}

export default ReflectionProcessingForm;
