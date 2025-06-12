"use client";

import React, { useState } from "react";

interface DiscountCodeInputProps {
  onApplyDiscount: (newWidgetId: string, percentage: number) => void;
}

// Define available discount codes and their corresponding widget IDs
// TODO: revise the widget IDs to match test widget IDs
const DISCOUNT_CODES = {
  FREE100: {
    percentage: 100,
    widgetId: "6001a7e96432fade057cd8984f0b4c2a-free",
    description: "100% off (Free)",
  },
  SAVE75: {
    percentage: 75,
    widgetId: "6001a7e96432fade057cd8984f0b4c2a-75off",
    description: "75% off",
  },
  HALF50: {
    percentage: 50,
    widgetId: "6001a7e96432fade057cd8984f0b4c2a-50off",
    description: "50% off",
  },
  QUARTER25: {
    percentage: 25,
    widgetId: "6001a7e96432fade057cd8984f0b4c2a-25off",
    description: "25% off",
  },
} as const;

const DiscountCodeInput: React.FC<DiscountCodeInputProps> = ({
  onApplyDiscount,
}) => {
  const [discountCode, setDiscountCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<{
    code: string;
    percentage: number;
  } | null>(null);

  const handleApplyDiscount = () => {
    const trimmedCode = discountCode.trim().toUpperCase();

    // Clear previous error
    setErrorMessage("");

    if (!trimmedCode) {
      setErrorMessage("Please enter a discount code");
      return;
    }

    // Check if the code exists in our discount codes
    const discount = DISCOUNT_CODES[trimmedCode as keyof typeof DISCOUNT_CODES];

    if (!discount) {
      setErrorMessage("Invalid discount code. Please try again.");
      return;
    }

    setIsApplying(true);

    // Simulate a brief loading state
    setTimeout(() => {
      // Apply the discount
      onApplyDiscount(discount.widgetId, discount.percentage);

      // Update local state
      setAppliedDiscount({
        code: trimmedCode,
        percentage: discount.percentage,
      });

      setIsApplying(false);
      setDiscountCode("");
    }, 500);
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
                {appliedDiscount.percentage}% off your purchase
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
