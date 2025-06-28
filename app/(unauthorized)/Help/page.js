"use client";

import React, { useState } from "react";
import Image from "next/image";
import FAQ from "@/components/support/faq";

export default function SupportPage() {
  // Form state
  const [formData, setFormData] = useState({
    issueType: "Account Issue",
    description: "",
  });

  // Form submission status
  const [status, setStatus] = useState({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    message: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form (basic validation)
    if (!formData.description.trim()) {
      setStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        message: "Please provide a description of your issue.",
      });
      return;
    }

    // Set loading state
    setStatus({
      isSubmitting: true,
      isSuccess: false,
      isError: false,
      message: "Submitting your request...",
    });

    try {
      // Send data to API endpoint
      const response = await fetch("/api/support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Success state
        setStatus({
          isSubmitting: false,
          isSuccess: true,
          isError: false,
          message: "Your support request has been submitted successfully!",
        });

        // Reset form
        setFormData({
          issueType: "Account Issue",
          description: "",
        });
      } else {
        // Error with response
        const errorData = await response.json();

        setStatus({
          isSubmitting: false,
          isSuccess: false,
          isError: true,
          message:
            errorData.error ||
            "Failed to submit support request. Please try again.",
        });
      }
    } catch (error) {
      // Network or other error
      console.error("Error submitting form:", error);

      setStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        message:
          "An error occurred. Please check your connection and try again.",
      });
    }
  };

  return (
    <div className="container mx-auto max-w-5xl p-6">
      <Image
        className="z-10 mx-auto -mt-16 block md:mt-16"
        src="/logo.png"
        alt="Logo"
        width={120}
        height={120}
      />

      <h1 className="mb-6 text-4xl font-bold">Help & Support</h1>

      <p className="mb-4">
        Find answers to common questions or get in touch with our support team.
      </p>

      <FAQ />
      {/* <div className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">
          Frequently Asked Questions
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <a
              href="#faq1"
              className="text-primary-red"
            >
              How do I reset my password?
            </a>
          </li>
          <li>
            <a
              href="#faq2"
              className="text-primary-red"
            >
              How do I track my order?
            </a>
          </li>
          <li>
            <a
              href="#faq3"
              className="text-primary-red"
            >
              How do I contact customer service?
            </a>
          </li>
        </ul>
      </div> */}

      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">
          Submit a Support Request
        </h2>

        {/* Status messages */}
        {status.isSuccess && (
          <div className="mb-4 rounded border border-green-200 bg-green-100 p-3 text-green-800">
            {status.message}
          </div>
        )}

        {status.isError && (
          <div className="mb-4 rounded border border-red-200 bg-red-100 p-3 text-red-800">
            {status.message}
          </div>
        )}

        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="issueType"
              className="block font-medium"
            >
              Issue Type
            </label>
            <select
              id="issueType"
              name="issueType"
              value={formData.issueType}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2"
              disabled={status.isSubmitting}
            >
              <option>Account Issue</option>
              <option>Billing Problem</option>
              <option>Technical Support</option>
              <option>Feature Request</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block font-medium"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2"
              placeholder="Describe your issue in detail"
              rows="4"
              disabled={status.isSubmitting}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className={`rounded px-4 py-2 text-white ${
              status.isSubmitting
                ? "cursor-not-allowed bg-gray-400"
                : "bg-primary-red hover:bg-red-700"
            }`}
            disabled={status.isSubmitting}
          >
            {status.isSubmitting ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>

      <div>
        <h2 className="mb-2 text-2xl font-semibold">Live Chat</h2>
        <p>
          Click the button below to start a live chat with one of our support
          agents.
        </p>
        <button className="mt-2 rounded border-2 border-primary-red bg-white px-4 py-2 text-primary-red hover:bg-red-50">
          Start Live Chat
        </button>
      </div>
    </div>
  );
}
