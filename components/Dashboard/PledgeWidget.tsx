'use client';

import React from 'react';
import { useEffect, useState } from 'react';


// Define prop types for better type safety (optional but recommended)
interface PledgeWidgetProps {
	widgetId: string;
    className?: string;
    maxWidth?: string;
}

const PledgeWidget: React.FC<PledgeWidgetProps> = ({
	widgetId,
	className = "",
	maxWidth = "max-w-3xl"
}) => {
        const [mounted, setMounted] = useState(false);

        // Only set mounted to true after the component has been hydrated
        useEffect(() => {
            setMounted(true);
        }, []);

        // Don't render the widget div until we're sure we're on the client
        if (!mounted) {
            return null;
        }

        // Edge case: Check if widgetId is valid
        // If not, log a warning and return null
        if (!widgetId || widgetId.trim() === '') {
            console.warn('DonateWidget: Invalid widget ID provided');
            return null;
        }


        // This component wraps a donation widget from a third-party service
        // The widget is identified by a customizable data-widget-id
        return (
            <div className={`flex justify-center w-full ${className}`}>
                <div
                    className={`plg-donate w-full ${maxWidth}`}
                    data-widget-id={widgetId}
                >
                </div>
            </div>
        );
};

// Default export for easier importing
export default PledgeWidget;

// Named export for more explicit importing if preferred
export { PledgeWidget };