import React from "react";

interface DonateButtonProps {
  onClick: () => void;
  isProcessing: boolean;
  amount: number;
  disabled?: boolean;
  className?: string;
  label?: string;
}

export default function DonateButton({
  onClick,
  isProcessing,
  amount,
  disabled = false,
  className = "",
  label,
}: DonateButtonProps) {
  const baseClassName = "w-full rounded-md bg-primary-red px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-400";
  
  return (
    <button
      onClick={onClick}
      disabled={isProcessing || disabled}
      className={`${baseClassName} ${className}`.trim()}
    >
      <span className="flex items-center justify-center text-center">
        {isProcessing && (
          <svg
            className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
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
        )}
        {isProcessing ? "Processing..." : (label || `Donate $${(amount / 100).toFixed(2)} with Stripe`)}
      </span>
    </button>
  );
}