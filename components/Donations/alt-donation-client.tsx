"use client";

// components/donation/DonationPage.tsx
// Step 3: Discount Code System Implementation
import React, { useEffect, useState } from "react";

// Mock router for demo - in real Next.js, you'd use: import { useRouter } from "next/navigation"
const useMockRouter = () => ({
  push: (path: string) => {
    console.log(`Navigation: Redirecting to ${path}`);
    alert(`Demo: Would navigate to ${path}`);
  },
});

// Define the structure of a discount code for type safety
interface DiscountCode {
  code: string;
  percentage: number;
  widgetId: string; // Each discount level gets a different Pledge widget ID
}

interface DonationPageProps {
  userName: string;
  userEmail: string;
  isPremium: boolean;
}

const DonationPage: React.FC<DonationPageProps> = ({
  userName,
  userEmail,
  isPremium,
}) => {
  const router = useMockRouter();

  // State to track if we're in the process of redirecting
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Discount code state management - multiple related pieces of state
  const [discountCode, setDiscountCode] = useState(""); // What user is typing
  const [appliedDiscount, setAppliedDiscount] = useState<DiscountCode | null>(
    null,
  ); // Successfully applied discount
  const [isValidating, setIsValidating] = useState(false); // Loading state during validation
  const [validationError, setValidationError] = useState<string | null>(null); // Error message to show user

  // Default Pledge widget ID - gets replaced when discount is applied
  const [currentWidgetId, setCurrentWidgetId] = useState(
    "6001a7e96432fade057cd8984f0b4c2a",
  );

  // API function to validate discount codes (would connect to your backend)
  const validateDiscountCode = async (
    code: string,
  ): Promise<DiscountCode | null> => {
    // Simulate API call delay for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock validation logic - in real app, this hits your API endpoint
    const mockDiscounts: Record<string, DiscountCode> = {
      SAVE10: { code: "SAVE10", percentage: 10, widgetId: "widget-10-percent" },
      SAVE20: { code: "SAVE20", percentage: 20, widgetId: "widget-20-percent" },
      SAVE50: { code: "SAVE50", percentage: 50, widgetId: "widget-50-percent" },
    };

    return mockDiscounts[code.toUpperCase()] || null;
  };

  // Handle discount code form submission
  const handleApplyDiscount = async () => {
    // Validation: don't process empty codes
    if (!discountCode.trim()) return;

    // Start loading state and clear any previous errors
    setIsValidating(true);
    setValidationError(null);

    try {
      const discount = await validateDiscountCode(discountCode.trim());

      if (discount) {
        // Success: apply the discount and update widget
        setAppliedDiscount(discount);
        setCurrentWidgetId(discount.widgetId);
        setDiscountCode(""); // Clear the input for better UX
      } else {
        // Error: show user-friendly message
        setValidationError(
          "Invalid discount code. Please check and try again.",
        );
      }
    } catch (error) {
      // Handle network errors gracefully
      console.error("Error validating discount:", error);
      setValidationError("Unable to validate discount code. Please try again.");
    } finally {
      // Always stop loading state, regardless of success or failure
      setIsValidating(false);
    }
  };

  // Handle Enter key press in discount input (better UX)
  const handleDiscountKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleApplyDiscount();
    }
  };

  // useEffect hook - runs after component mounts and when dependencies change
  useEffect(() => {
    if (isPremium) {
      setIsRedirecting(true);
      // Simulate slight delay for better UX (shows loading state briefly)
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    }
  }, [isPremium, router]); // Dependencies array - effect runs when these values change

  // Early return pattern - if user is premium, show loading state instead of payment UI
  if (isPremium && isRedirecting) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>
            <h2 className="mb-2 text-xl font-semibold">
              Welcome back, {userName}!
            </h2>
            <p className="text-gray-600">
              You already have premium access. Redirecting to your dashboard...
            </p>
          </div>
        </div>
      </div>
    );
  }
  // Main payment flow UI - only shown to non-premium users
  return (
    <div className="mx-auto max-w-4xl p-6">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold">Hello, {userName}!</h1>
        <p className="text-lg text-gray-600">
          Please use this email:{" "}
          <span className="font-medium">{userEmail}</span> when making your
          payment.
        </p>
      </div>

      {/* Step progress indicator */}
      <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4">
        <h3 className="font-semibold text-green-800">Step 3 Complete ✓</h3>
        <p className="text-green-700">
          Discount code system with validation and error handling
        </p>
        <p className="mt-1 text-sm text-green-600">
          Try codes: SAVE10, SAVE20, SAVE50, or enter an invalid code to see
          error handling
        </p>
      </div>

      {/* Discount Code Input Section */}
      <div className="mb-6 rounded-lg border border-gray-200 p-6">
        <h3 className="mb-4 text-lg font-semibold">Have a discount code?</h3>

        {/* Input and button container */}
        <div className="mb-4 flex gap-3">
          <input
            type="text"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            onKeyPress={handleDiscountKeyPress}
            placeholder="Enter discount code"
            disabled={isValidating}
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
          />
          <button
            onClick={handleApplyDiscount}
            disabled={!discountCode.trim() || isValidating}
            className="rounded-md bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {isValidating ? "Validating..." : "Apply"}
          </button>
        </div>

        {/* Error message display */}
        {validationError && (
          <div className="rounded-md border border-red-200 bg-red-50 p-3">
            <p className="text-sm text-red-700">{validationError}</p>
          </div>
        )}

        {/* Success message for applied discount */}
        {appliedDiscount && (
          <div className="rounded-md border border-green-200 bg-green-50 p-3">
            <div className="flex items-center">
              <svg
                className="mr-2 h-5 w-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <p className="font-medium text-green-700">
                Great! Your {appliedDiscount.percentage}% discount (
                {appliedDiscount.code}) has been applied.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Widget placeholder showing current configuration */}
      <div className="space-y-6">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
          <h3 className="mb-3 font-semibold text-gray-700">
            Payment Widget Configuration
          </h3>
          {/* TODO: remove this p tag when functional */}
          <p className="mb-2 text-gray-600">
            Current Widget ID:{" "}
            <code className="rounded bg-gray-200 px-2 py-1 text-sm">
              {currentWidgetId}
            </code>
          </p>
          {appliedDiscount && (
            <p className="font-medium text-green-700">
              Discount Applied: {appliedDiscount.percentage}% off
            </p>
          )}
          <div className="mt-4 rounded border bg-white p-4">
            <p className="text-sm text-gray-600">
              Next: Add actual Pledge.to widget integration
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
