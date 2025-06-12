"use client";

import React, { useEffect, useState } from "react";

// Define prop types for better type safety (optional but recommended)
interface PledgeWidgetProps {
  widgetId: string;
  className?: string;
  maxWidth?: string;
  onLoaded?: () => void;
}

const PledgeWidget: React.FC<PledgeWidgetProps> = ({
  widgetId,
  className = "",
  maxWidth = "max-w-3xl",
  onLoaded = () => {},
}) => {
  const [mounted, setMounted] = useState(false);

  // Only set mounted to true after the component has been hydrated
  useEffect(() => {
    setMounted(true);
  }, []);

  // Call onLoaded when component is mounted and widget div is rendered
  useEffect(() => {
    if (mounted && widgetId) {
      // Small delay to ensure the widget div is in the DOM
      const timer = setTimeout(() => {
        onLoaded();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [mounted, widgetId, onLoaded]);

  // Don't render the widget div until we're sure we're on the client
  if (!mounted) {
    return null;
  }

  // Edge case: Check if widgetId is valid
  // If not, log a warning and return null
  if (!widgetId || widgetId.trim() === "") {
    console.warn("DonateWidget: Invalid widget ID provided");
    return null;
  }

  // This component wraps a donation widget from a third-party service
  // The widget is identified by a customizable data-widget-id
  return (
    <div className={`flex w-full justify-center ${className}`}>
      <div
        className={`plg-donate w-full ${maxWidth}`}
        data-widget-id={widgetId}
      ></div>
    </div>
  );
};

// Default export for easier importing
export default PledgeWidget;

// Named export for more explicit importing if preferred
export { PledgeWidget };
