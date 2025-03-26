"use client";

import { useRef, useState } from "react";

export default function TestimonialUploadPage() {
  const [cohort, setCohort] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [week, setWeek] = useState("");
  const [day, setDay] = useState("");
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  // Generate options for select inputs
  const weekOptions = Array.from({ length: 5 }, (_, i) => i + 1);
  const dayOptions = Array.from({ length: 7 }, (_, i) => i + 1);

  // starts from Cohort 46 goes to Cohort 100
  const cohortOptions = Array.from({ length: 56 }, (_, i) => i + 45);

  // Handle file validation and preview
  const processFile = (selectedFile) => {
    if (selectedFile && selectedFile.type.includes("video")) {
      setFile(selectedFile);

      // Create a preview URL for the video
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    } else {
      setFile(null);
      setPreviewUrl(null);
      alert("Please select a valid video file");
    }
  };

  // Handle file selection via input
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    processFile(selectedFile);
  };

  // Handle drag events
  const handleDrag = (e) => {
    // Important: Always prevent default to stop browser from opening/downloading files
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Process the dropped file
      processFile(e.dataTransfer.files[0]);

      // Clear the dataTransfer object to prevent browser default behavior
      if (e.dataTransfer.clearData) {
        e.dataTransfer.clearData();
      }
    }
  };

  // Handle button click to trigger file input
  const handleButtonClick = () => {
    inputRef.current.click();
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!week || !day || !file || !firstName || !lastName || !cohort) {
      alert("Please add all fields to submit this form successfully");
      return;
    }

    setIsUploading(true);
    setUploadStatus(null);

    try {
      const formData = new FormData();
      formData.append("cohort", cohort);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("week", week);
      formData.append("day", day);
      formData.append("video", file);

      const fileInfo = {
        filename: file.name,
        contentType: file.type,
      };

      const sasResponse = await fetch("/api/getVideoUploadUrl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Required for JSON data
        },
        body: JSON.stringify(fileInfo),
      });

      const result = await sasResponse.json();

      if (sasResponse.ok) {
        setUploadStatus({
          success: true,
          message: "Azure container URL created successfully",
        });

        // TODO: receive containerUrl and implement post request to Azure URL
        const sasUrl = result.uploadUrl;

        const azureResponse = await fetch(sasUrl, {
          mode: "cors",
          method: "PUT",
          body: file,
          headers: {
            "x-ms-blob-type": "BlockBlob", // Required for Azure
            "Content-Type": file.type, // e.g., 'video/mp4'
          },
        });

        console.log(azureResponse);

        // TODO: use FormData to add metadata to MongoDB

        // Reset form after successful upload
        setFile(null);
        setPreviewUrl(null);
      } else {
        throw new Error(result.error || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus({
        success: false,
        message: `Upload failed: ${error.message}`,
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Handle reset of the form
  const handleReset = () => {
    setCohort("");
    setFirstName("");
    setLastName("");
    setWeek("");
    setDay("");
    setFile(null);
    setPreviewUrl(null);
    setUploadStatus(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-bg">
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-center text-3xl font-bold text-primary-red">
          Upload Your Journeyman&apos;s Testimonial Video Here
        </h1>
        <p className="mx-auto mb-4 max-w-4xl text-center font-bold">
          Add the information for your journeyman to the fields below as you
          receive video testimonials from your Journeyman.
        </p>
        <p className="mx-auto mb-8 max-w-3xl text-justify">
          Please include their cohort number from Discord, their first and last
          name, the week and day of the video, as well as the video file itself.
          Hitting submit will store your file with the other testimonials to
          create a catalogue of the transformation CLEAN has worked in each
          brother&apos;s life!
        </p>

        <div className="mx-auto max-w-md">
          {uploadStatus && uploadStatus.success ? (
            <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
              <p className="mb-4 text-lg text-green-700">
                {uploadStatus.message}
              </p>
              <button
                onClick={handleReset}
                className="rounded-lg bg-primaryred px-6 py-2 text-white transition-colors hover:bg-primaryred-800"
              >
                Upload Another Video
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-lg bg-white p-6 shadow-md"
              onDragEnter={handleDrag}
              onDragOver={(e) => e.preventDefault()} // Prevent default browser behavior
            >
              <div className="mb-4">
                <label
                  htmlFor="cohort"
                  className="mb-2 block font-medium text-description-gray"
                >
                  Cohort:
                </label>
                <select
                  id="cohort"
                  value={cohort}
                  onChange={(e) => setCohort(e.target.value)}
                  required
                  className="block w-full rounded-lg border border-gray-300 bg-formfield px-4 py-2 focus:border-primaryred focus:ring-primaryred"
                >
                  <option value="">-- Select Cohort --</option>
                  {cohortOptions.map((num) => (
                    <option
                      key={`cohort-${num}`}
                      value={num}
                    >
                      Cohort {num}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="mb-2 block font-medium text-description-gray"
                >
                  First Name:
                </label>
                <input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-formfield px-4 py-2 focus:border-primaryred focus:ring-primaryred"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="mb-2 block font-medium text-description-gray"
                >
                  Last Name:
                </label>
                <input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-formfield px-4 py-2 focus:border-primaryred focus:ring-primaryred"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="week"
                  className="mb-2 block font-medium text-description-gray"
                >
                  Select Week:
                </label>
                <select
                  id="week"
                  value={week}
                  onChange={(e) => setWeek(e.target.value)}
                  required
                  className="block w-full rounded-lg border border-gray-300 bg-formfield px-4 py-2 focus:border-primaryred focus:ring-primaryred"
                >
                  <option value="">-- Select Week --</option>
                  {weekOptions.map((num) => (
                    <option
                      key={`week-${num}`}
                      value={num}
                    >
                      Week {num}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="day"
                  className="mb-2 block font-medium text-description-gray"
                >
                  Select Day:
                </label>
                <select
                  id="day"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  required
                  className="block w-full rounded-lg border border-gray-300 bg-formfield px-4 py-2 focus:border-primaryred focus:ring-primaryred"
                >
                  <option value="">-- Select Day --</option>
                  {dayOptions.map((num) => (
                    <option
                      key={`day-${num}`}
                      value={num}
                    >
                      Day {num}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="video"
                  className="mb-2 block font-medium text-description-gray"
                >
                  Upload Video:
                </label>
                <div
                  className={`relative mt-1 flex justify-center rounded-lg border-2 border-dashed ${
                    dragActive
                      ? "border-primaryred bg-red-50"
                      : "border-gray-300"
                  } px-6 pb-6 pt-5`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={handleButtonClick} // Allow clicking anywhere in the drop zone
                >
                  {/* Invisible overlay for drag & drop handling */}
                  {dragActive && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-red-50 bg-opacity-80">
                      <p className="text-lg font-medium text-primaryred">
                        Drop your video file here
                      </p>
                    </div>
                  )}
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="video"
                        className="relative cursor-pointer rounded-md font-medium text-primaryred hover:text-primaryred-700 focus:outline-none"
                      >
                        <span onClick={handleButtonClick}>Upload a video</span>
                        <input
                          id="video"
                          ref={inputRef}
                          type="file"
                          accept="video/*"
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">MP4, MOV, AVI, etc.</p>
                    {file && !previewUrl && (
                      <div className="mt-2 flex items-center justify-center">
                        <p className="mr-2 text-sm text-green-600">
                          Selected: {file.name}
                        </p>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFile(null);
                          }}
                          className="text-xs text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {previewUrl && (
                <div className="mb-6">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-medium text-description-gray">
                      Preview:
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        setFile(null);
                        setPreviewUrl(null);
                      }}
                      className="flex items-center text-sm text-red-600 hover:text-red-800"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-1"
                      >
                        <line
                          x1="18"
                          y1="6"
                          x2="6"
                          y2="18"
                        ></line>
                        <line
                          x1="6"
                          y1="6"
                          x2="18"
                          y2="18"
                        ></line>
                      </svg>
                      Remove Video
                    </button>
                  </div>
                  <div className="overflow-hidden rounded-lg">
                    <video
                      controls
                      className="h-auto w-full"
                    >
                      <source
                        src={previewUrl}
                        type={file.type}
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              )}

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={
                    !week ||
                    !day ||
                    !file ||
                    !firstName ||
                    !lastName ||
                    !cohort ||
                    isUploading
                  }
                  className={`rounded-lg px-6 py-2 text-white transition-colors ${
                    !week ||
                    !day ||
                    !file ||
                    !firstName ||
                    !lastName ||
                    !cohort ||
                    isUploading
                      ? "cursor-not-allowed bg-gray-400"
                      : "bg-primaryred hover:bg-primaryred-800"
                  }`}
                >
                  {isUploading ? "Uploading..." : "Upload Video"}
                </button>
              </div>

              {isUploading && (
                <div className="mt-6 text-center">
                  <div className="inline-block animate-roll">
                    <svg
                      className="h-8 w-8 text-primaryred"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </div>
                  <p className="mt-2 text-description-gray">
                    Uploading your video to Azure...
                  </p>
                </div>
              )}

              {uploadStatus && !uploadStatus.success && (
                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-center text-red-700">
                  <p>{uploadStatus.message}</p>
                </div>
              )}
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
