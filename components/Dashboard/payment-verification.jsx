"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const PaymentVerification = ({ children }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', message: string }

  useEffect(() => {
    if (sessionId && !verificationComplete) {
      verifyPaymentSession(sessionId);
    }
  }, [sessionId, verificationComplete]);

  // Auto-dismiss toast after 5 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const verifyPaymentSession = async (sessionId) => {
    setIsVerifying(true);
    setToast(null);

    try {
      const response = await fetch("/api/verify-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });

      const data = await response.json();

      if (data.success && data.verified) {
        console.log("Payment verified successfully!");
        setToast({
          type: "success",
          message:
            "Payment successful! Thank you for your donation. You now have premium access!",
        });
        setVerificationComplete(true);

        // Clean up URL immediately since we're using toast
        setTimeout(() => {
          router.replace("/dashboard");
        }, 1000);
      } else {
        console.error("Payment verification failed:", data.message);
        setToast({
          type: "error",
          message: data.message || "Payment verification failed",
        });
        setVerificationComplete(true);
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      setToast({
        type: "error",
        message: "Unable to verify payment. Please contact support.",
      });
      setVerificationComplete(true);
    } finally {
      setIsVerifying(false);
    }
  };

  // Show verification loading state
  if (isVerifying) {
    return (
      <div className="relative mx-16 flex min-h-screen flex-col items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-red-500"></div>
          <h2 className="mb-2 text-xl font-semibold">
            Verifying your payment...
          </h2>
          <p className="text-gray-600">
            Please wait while we confirm your transaction.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-4 right-4 z-50 max-w-md rounded-lg border px-4 py-3 shadow-lg transition-all duration-300 ease-in-out ${
            toast.type === "success"
              ? "border-green-400 bg-green-100 text-green-700"
              : "border-red-400 bg-red-100 text-red-700"
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              {toast.type === "success" ? (
                <svg
                  className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0"
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
              ) : (
                <svg
                  className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              )}
              <div>
                <p className="text-sm font-medium">
                  {toast.type === "success"
                    ? "Payment Successful!"
                    : "Payment Issue"}
                </p>
                <p className="text-sm">{toast.message}</p>
              </div>
            </div>
            <button
              onClick={() => setToast(null)}
              className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Render children (the actual page content) */}
      {children}
    </>
  );
};

export default PaymentVerification;
