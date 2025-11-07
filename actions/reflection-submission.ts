// app/actions/reflections.js
"use server";

import prisma from "@/db";

/** =============================================================================
 * Submit Text Reflection
 *
 * This function handles all the database logic for:
 *
 * - establishing current User Progress
 * - Saving the reflection entry as text
 * - Incrementing the user's current day
 * - Updating the week as necessary
 * - Managing the transition between weeks
 * - Returning the updated progress and reflection data
 *
 * @param {string} userId - The ID of the user submitting the reflection
 * @param {string} devotionalDataId - The Object ID of the devotional data
 * @param {number} devotionalNumberId - The numeric ID of the devotional
 * @param {string} reflectionText - The text of the user's reflection
 * @param {number} week - The current week number
 * @param {number} day - The current day number
 * @returns {Object} Result object containing success status and data or error message
 *
 * =============================================================================
 */

export async function submitTextReflection(
  userId,
  devotionalDataId,
  devotionalNumberId,
  reflectionText,
  week,
  day,
) {
  // Input validation on the server side is critical for security
  // Never trust that client-side validation is enough
  console.log("submitTextReflection called with:", {
    userId,
    devotionalDataId,
    devotionalNumberId,
    reflectionText,
    week,
    day,
  });

  if (
    !userId ||
    !week ||
    !day ||
    !devotionalNumberId ||
    !devotionalDataId ||
    !reflectionText?.trim()
  ) {
    return {
      success: false,
      error:
        "Missing required fields. Please provide all necessary information.",
    };
  }

  try {
    // Execute both queries as a transaction
    const currentProgress = await prisma.userProgress.findUnique({
      where: { userId: userId },
    });

    if (!currentProgress) {
      return {
        success: false,
        error: "User progress not found.",
      };
    }

    if (currentProgress.completedDevotionalIds?.includes(devotionalNumberId)) {
      return {
        success: false,
        error:
          "You've already completed ths devotional; proceed to the next one.",
      };
    }
    const [textResponse, updatedUser] = await prisma.$transaction([
      /**
       * Review Current User Progress
       * Find current week and day to determine if we need to increment week
       */

      /**
       * Save the Reflection Entry As Text
       */
      prisma.reflectionResponse.create({
        data: {
          devotionalId: devotionalDataId,
          response: reflectionText.trim(),
          week: week,
          day: day,
          user: {
            connect: { id: userId },
          },
        },
      }),

      /**
       * Update User Progress
       * Update current week and day (if day 7, move to day 1 of next week)
       */
      prisma.userProgress.update({
        where: { userId: userId },
        data: {
          currentDay:
            currentProgress.currentDay === 35
              ? { increment: 0 } // if finished, stay at 35
              : { increment: 1 },
          currentWeek:
            currentProgress.currentDay === 35
              ? { increment: 0 } // if finished, stay at current week
              : currentProgress.currentDay % 7 === 0 // if there's an end of the week
                ? { increment: 1 }
                : currentProgress.currentWeek,
          completedDevotionalIds: { push: devotionalNumberId },
        },
      }),
    ]);

    /**
     * Return Block
     */
    return {
      success: true,
      data: {
        reflection: textResponse,
        userProgress: {
          currentWeek: updatedUser.currentWeek,
          currentDay: updatedUser.currentDay,
          completedDevotionalIds: { push: devotionalNumberId },
        },
      },
    };
  } catch (error) {
    console.error("Transaction failed:", error);
    return {
      success: false,
      error: "Failed to save reflection and update progress. Please try again.",
    };
  }
}

/** =============================================================================
 * Submit Video Reflection
 *
 * This function handles all the database logic for:
 *
 * - establishing current User Progress
 * - Saving the reflection entry as video
 * - Incrementing the user's current day
 * - Updating the week as necessary
 * - Managing the transition between weeks
 * - Returning the updated progress and reflection data
 *
 * @param {string} userId - The ID of the user submitting the reflection
 * @param {string} devotionalDataId - The Object ID of the devotional data
 * @param {number} devotionalNumberId - The numeric ID of the devotional
 * @param {string} reflectionVideo - The video file of the user's reflection
 * @param {number} week - The current week number
 * @param {number} day - The current day number
 * @returns {Object} Result object containing success status and data or error message
 *
 * =============================================================================
 */

export async function submitVideoReflection(
  userId,
  devotionalDataId,
  devotionalNumberId,
  reflectionVideo,
  week,
  day,
) {
  if (
    !userId ||
    !week ||
    !day ||
    !devotionalDataId ||
    !devotionalNumberId ||
    !reflectionVideo
  ) {
    return {
      success: false,
      error:
        "Missing required fields. Please provide all necessary information.",
    };
  }

  // TODO: use previously established pattern to implement video reflection submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!week || !day || !file || !firstName || !lastName || !cohort) {
  //     alert("Please add all fields to submit this form successfully");
  //     return;
  //   }

  //   setIsUploading(true);
  //   setUploadStatus(null);
  //   setUploadProgress(0);

  //   try {
  //     // STEP 1: Get the Azure SAS URL
  //     console.log("Step 1 starting, creating SAS URL...");
  //     setUploadStatus({
  //       success: true,
  //       message: "Preparing upload...",
  //       step: 1,
  //       totalSteps: 3,
  //     });

  //     const fileInfo = {
  //       filename: file.name,
  //       contentType: file.type,
  //       cohort: cohort,
  //       firstName: firstName,
  //       lastName: lastName,
  //       week: week,
  //       day: day,
  //     };

  //     const sasResponse = await fetch("/api/getVideoUploadUrl", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(fileInfo),
  //     });

  //     if (!sasResponse.ok) {
  //       throw new Error("Failed to get upload URL");
  //     }

  //     const result = await sasResponse.json();
  //     const sasUrl = result.uploadUrl;

  //     // STEP 2: Upload the file with progress tracking
  //     console.log("Step 1 complete, uploading video to azure...");
  //     setUploadStatus({
  //       success: true,
  //       message: "Uploading video to Azure...",
  //       step: 2,
  //       totalSteps: 3,
  //     });

  //     // Create a new XMLHttpRequest to track upload progress
  //     const xhr = new XMLHttpRequest();

  //     // Create a promise that resolves when the upload is complete
  //     const uploadPromise = new Promise((resolve, reject) => {
  //       xhr.open("PUT", sasUrl, true);
  //       xhr.setRequestHeader("x-ms-blob-type", "BlockBlob");
  //       xhr.setRequestHeader("Content-Type", file.type);

  //       // Track upload progress
  //       xhr.upload.onprogress = (event) => {
  //         if (event.lengthComputable) {
  //           const percentComplete = Math.round(
  //             (event.loaded / event.total) * 100,
  //           );
  //           setUploadProgress(percentComplete);
  //         }
  //       };

  //       // Handle upload completion
  //       xhr.onload = () => {
  //         if (xhr.status >= 200 && xhr.status < 300) {
  //           resolve(xhr.response);
  //         } else {
  //           reject(new Error(`Upload failed with status: ${xhr.status}`));
  //         }
  //       };

  //       // Handle upload error
  //       xhr.onerror = () => {
  //         reject(new Error("Network error occurred during upload"));
  //       };

  //       // Start the upload
  //       xhr.send(file);
  //     });

  //     await uploadPromise;
  //     setUploadProgress(100);

  //     // STEP 3: Store metadata
  //     console.log("Step 2 complete, storing metadata to mongodb...");
  //     setUploadStatus({
  //       success: true,
  //       message: "Saving metadata...",
  //       step: 3,
  //       totalSteps: 3,
  //     });

  //     const metadataResponse = await fetch("/api/store-video-metadata", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         cohort,
  //         firstName,
  //         lastName,
  //         week,
  //         day,
  //         fileName: file.name,
  //         fileType: file.type,
  //         blobUrl: sasUrl,
  //       }),
  //     });

  //     if (!metadataResponse.ok) {
  //       console.warn("Metadata storage issue, but video upload was successful");
  //     }

  //     // Success!
  //     console.log("Step 3 complete, success");
  //     setUploadStatus({
  //       success: true,
  //       message: "Video uploaded successfully!",
  //       step: 3,
  //       totalSteps: 3,
  //       completed: true,
  //     });

  //     // Reset form after successful upload
  //     setCohort("");
  //     setFirstName("");
  //     setLastName("");
  //     setWeek("");
  //     setDay("");
  //     setFile(null);
  //     setPreviewUrl(null);
  //   } catch (error) {
  //     console.error("Upload error:", error);
  //     setUploadStatus({
  //       success: false,
  //       message: `Upload failed: ${error.message}`,
  //     });
  //   } finally {
  //     setIsUploading(false);
  //   }
  // };

  return {
    success: false,
    error: `WIP: input: ${userId}, ${devotionalDataId}, ${devotionalNumberId}, ${reflectionVideo}, ${week}, ${day}`,
  };
}
