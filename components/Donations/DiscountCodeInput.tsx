"use client";

import React, { useState } from "react";

interface DiscountCodeInputProps {
  onApplyDiscount: (newWidgetId: string, percentage: number) => void;
}

const DiscountCodeInput: React.FC<DiscountCodeInputProps> = ({
  onApplyDiscount,
}) => {
  const [discountCode, setDiscountCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<{
    code: string;
    percentage: string;
    message: string;
  } | null>(null);

  const validateDiscountCode = async (code: string) => {
    try {
      const response = await fetch("/api/validate-discount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          discountCode: code,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to validate discount code");
      }

      return data;
    } catch (error) {
      console.error("Error validating discount code:", error);
      throw error;
    }
  };

  const handleApplyDiscount = async () => {
    const trimmedCode = discountCode.trim().toUpperCase();

    // Clear previous error
    setErrorMessage("");

    if (!trimmedCode) {
      setErrorMessage("Please enter a discount code");
      return;
    }

    setIsApplying(true);

    try {
      const result = await validateDiscountCode(trimmedCode);

      if (result.valid) {
        // Extract percentage number from discount_type (assuming it's like "10%" or "10")
        const percentageMatch = result.discountPercentage
          .toString()
          .match(/\d+/);
        const percentage = percentageMatch ? parseInt(percentageMatch[0]) : 0;

        // Apply the discount using the widget ID and percentage from the API
        onApplyDiscount(result.widgetId, percentage);

        // Update local state
        setAppliedDiscount({
          code: trimmedCode,
          percentage: result.discountPercentage,
          message: result.message,
        });

        setDiscountCode("");
      } else {
        setErrorMessage(
          result.message || "Invalid discount code. Please try again.",
        );
      }
    } catch (error) {
      setErrorMessage("Failed to validate discount code. Please try again.");
    } finally {
      setIsApplying(false);
    }
  };

  const handleClearDiscount = () => {
    // Reset to default widget (0% discount)
    onApplyDiscount("6001a7e96432fade057cd8984f0b4c2a", 0);
    setAppliedDiscount(null);
    setErrorMessage("");
    setDiscountCode("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleApplyDiscount();
    }
  };

  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
      <h3 className="mb-3 text-lg font-semibold text-gray-800">
        Have a Discount Code?
      </h3>

      {appliedDiscount ? (
        // Show applied discount state
        <div className="rounded-md border border-green-200 bg-green-50 p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-green-700">
                Discount Applied: {appliedDiscount.code}
              </p>
              <p className="text-sm text-green-600">
                {appliedDiscount.message}
              </p>
            </div>
            <button
              onClick={handleClearDiscount}
              className="text-sm text-green-600 underline hover:text-green-800"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        // Show input form
        <div>
          <div className="flex gap-2">
            <input
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter discount code"
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-red focus:outline-none focus:ring-1 focus:ring-primary-red"
              disabled={isApplying}
            />
            <button
              onClick={handleApplyDiscount}
              disabled={isApplying || !discountCode.trim()}
              className="rounded-md bg-primary-red px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-primary-red focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {isApplying ? "Applying..." : "Apply"}
            </button>
          </div>

          {errorMessage && (
            <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DiscountCodeInput;
