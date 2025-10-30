import React, { useRef, useState } from "react";

function UploadVideo() {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  // Handle button click to trigger file input
  const handleButtonClick = () => {
    inputRef.current.click();
  };

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

  // Handle file selection via input
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    processFile(selectedFile);
  };

  return (
    <div>
      {/* Upload Video section */}
      <div className="mb-6">
        <label
          htmlFor="video"
          className="mb-2 block font-medium text-description-gray"
        >
          Upload Video:
        </label>
        <div
          className={`relative mt-1 flex justify-center rounded-lg border-2 border-dashed ${
            dragActive ? "border-primaryred bg-red-50" : "border-gray-300"
          } px-6 pb-6 pt-5`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
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
              <button
                type="button"
                onClick={handleButtonClick}
                className="relative cursor-pointer rounded-md font-medium text-primaryred hover:text-primaryred-700 focus:outline-none"
              >
                Upload a video
              </button>
              <input
                id="video"
                ref={inputRef}
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="sr-only"
              />
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
    </div>
  );
}

export default UploadVideo;
