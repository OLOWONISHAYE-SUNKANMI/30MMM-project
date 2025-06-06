"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DiscountCodeInput from "./DiscountCodeInput";
import { PledgeWidget } from "./PledgeWidget";

interface DonationPageClientProps {
  userName: string;
  userEmail: string;
  isPremium: boolean;
}

const DonationPageClient: React.FC<DonationPageClientProps> = ({
  userName,
  userEmail,
  isPremium,
}) => {
  const router = useRouter();

  // State for widget ID and discount
  const [widgetId, setWidgetId] = useState("6001a7e96432fade057cd8984f0b4c2a"); // Default widget ID
  const [discountPercentage, setDiscountPercentage] = useState<number | null>(
    null,
  );
  const [discountApplied, setDiscountApplied] = useState(false);
  const [widgetLoading, setWidgetLoading] = useState(true);

  // Redirect premium users to dasboard
  useEffect(() => {
    if (isPremium) {
      router.push("/Dashboard");
    }
  }, [isPremium, router]);

  // Handler for when a discount is applied
  const handleDiscountApplied = (newWidgetId: string, percentage: number) => {
    setWidgetId(newWidgetId);
    setDiscountPercentage(percentage);
    setDiscountApplied(percentage > 0);

    // When discount changes, we should how loading state again
    setWidgetLoading(true);
  };

  const handleDonationCompleted = (donationData: any) => {
    console.log("Donation completed with data:", donationData);

    // You can handle the donation completion here:
    // - Show success message
    // - Redirect to thank you page
    // - Update user's premium status
    // - Send analytics events

    // Example: Show success alert
    alert(`Success! Donated ${donationData.total}`);

    // Add logic to change state to showcase 'thank you' on screen for 10secs (TBD -> push to the Dashboard!!!)
    router.push("/thank-you");

    // Update user's premium

    // Example: Redirect to dashboard (pending, may not exist)
    router.push("/Dashboard");
  };

  // Handler for when widget is loaded
  const handleWidgetLoaded = () => {
    setWidgetLoading(false);
  };

  // Reset the widget loading state when the widget ID changes
  useEffect(() => {
    setWidgetLoading(true);
  }, [widgetId]);

  // Show loading state while redirecting premium users
  if (isPremium) {
    return (
      <div className="flex h-64 items-center justify-center p-8">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>
          <p>Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      {/* Personalized welcome message */}
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold">Hello, {userName}</h1>
        <p className="text-lg text-gray-600">
          Please use this email:{" "}
          <span className="font-medium">{userEmail}</span> when you make your
          payment with Pledge below.
        </p>
      </div>

      {/* Discount code section */}
      <DiscountCodeInput onApplyDiscount={handleDiscountApplied} />

      {/* Discount notification */}
      {discountApplied && discountPercentage && (
        <div className="mb-4 rounded-md border border-green-200 bg-green-50 p-3 text-center">
          <p className="font-medium text-green-700">
            Your {discountPercentage}% discount is already applied in the widget
            below!
          </p>
        </div>
      )}

      {/* Pledge widget */}
      <div className="relative mb-8">
        {widgetLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-75">
            <div className="text-center">
              <div className="mx-auto mb-2 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>
              <p className="text-gray-600">Loading payment widget...</p>
            </div>
          </div>
        )}
        <PledgeWidget
          widgetId={widgetId}
          onLoaded={handleWidgetLoaded}
        />
      </div>
    </div>
  );
};

export default DonationPageClient;
