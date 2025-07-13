"use client";

import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import EmailVerification from "@/components/auth/email-verification";
import SignUp from "@/components/auth/sign-up";
import { authClient } from "@/lib/auth-client";

interface CredentialResponse {
  credential: string;
  select_by: string;
}

interface GsiButtonConfiguration {
  type: "standard" | "icon";
  theme?: "outline" | "filled_blue" | "filled_black";
  size?: "large" | "medium" | "small";
  text?: "signin_with" | "signup_with" | "continue_with" | "signin";
  shape?: "rectangular" | "pill" | "circle" | "square";
  logo_alignment?: "left" | "center";
  width?: number;
  locale?: string;
}

interface PromptMomentNotification {
  isDisplayMoment: () => boolean;
  isDisplayed: () => boolean;
  isNotDisplayed: () => boolean;
  getNotDisplayedReason: () => string;
  isSkippedMoment: () => boolean;
  isDismissedMoment: () => boolean;
  getMomentType: () => string;
}

interface IdConfiguration {
  client_id: string;
  auto_select?: boolean;
  callback?: (response: CredentialResponse) => void;
  login_uri?: string;
  native_callback?: (response: CredentialResponse) => void;
  cancel_on_tap_outside?: boolean;
  prompt_parent_id?: string;
  nonce?: string;
  context?: string;
  state_cookie_domain?: string;
  ux_mode?: "popup" | "redirect";
  allowed_parent_origin?: string | string[];
  intermediate_iframe_close_callback?: () => void;
}

interface GsiInterface {
  initialize: (config: IdConfiguration) => void;
  prompt: (callback?: (notification: PromptMomentNotification) => void) => void;
  renderButton: (parent: HTMLElement, options?: GsiButtonConfiguration) => void;
  disableAutoSelect: () => void;
  storeCredential: (
    credential: { id: string; password: string },
    callback: () => void,
  ) => void;
  cancel: () => void;
  revoke: (hint: string, callback: () => void) => void;
}

interface Window {
  google?: {
    accounts?: {
      id?: GsiInterface;
    };
  };
}

export default function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const CALLBACK_URL = "/profile";
  const { step, email } = use(searchParams);
  const wasAccountCreated = step === "verify";
  const [oneTapInitialized, setOneTapInitialized] = useState(false);
  const [showGoogleButton, setShowGoogleButton] = useState(false);

  // Handle Google Sign-In button click
  const handleGoogleSignIn = () => {
    if (window.google?.accounts?.id) {
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          toast.error("Google Sign-In not available. Please try again.");
        }
      });
    } else {
      toast.error("Google Sign-In not loaded. Please refresh the page.");
    }
  };

  useEffect(() => {
    const oneTap = async () => {
      if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
        console.error(
          "Google Client ID is missing. Please check your environment variables.",
        );
        toast.error("Authentication configuration error");
        return;
      }

      if (oneTapInitialized) return; // Prevent multiple initializations

      try {
        await authClient.oneTap({
          callbackURL: CALLBACK_URL,
          fetchOptions: {
            onError: ({ error }) => {
              console.error("One Tap Error:", error);
              // Show fallback button when One Tap fails
              setShowGoogleButton(true);

              // Don't show toast for common cancellation errors
              if (
                error.message &&
                !error.message.includes("popup_closed_by_user")
              ) {
                toast.error(error.message || "Authentication failed");
              }
            },
            onSuccess: () => {
              toast.success("Successfully signed in");
            },
          },
        });
        setOneTapInitialized(true);
      } catch (error) {
        console.error("One Tap initialization failed:", error);
        // Show fallback button when One Tap initialization fails
        setShowGoogleButton(true);

        // Only show error toast if it's not a user cancellation
        if (
          error instanceof Error &&
          !error.message.includes("popup_closed_by_user")
        ) {
          toast.error("Failed to initialize Google Sign-In");
        }
      }
    };

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(oneTap, 100);
    return () => clearTimeout(timer);
  }, [oneTapInitialized]);

  // Initialize Google Sign-In button when needed
  useEffect(() => {
    if (showGoogleButton && window.google?.accounts?.id) {
      const buttonContainer = document.getElementById("google-signin-button");
      if (buttonContainer) {
        // Clear any existing button content
        buttonContainer.innerHTML = "";

        try {
          const googleId = window.google.accounts.id as GsiInterface;
          if (typeof googleId.renderButton === "function") {
            googleId.renderButton(buttonContainer, {
              theme: "outline",
              size: "large",
              type: "standard",
              text: "continue_with",
              shape: "rectangular",
              width: 280,
            });
          } else {
            console.error("Google Sign-In renderButton method not available");
          }
        } catch (error) {
          console.error("Failed to render Google Sign-In button:", error);
          // Show a custom fallback button if Google's button fails
          buttonContainer.innerHTML = `
            <button 
              id="custom-google-button"
              class="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          `;

          // Add click handler to custom button
          const customButton = document.getElementById("custom-google-button");
          if (customButton) {
            customButton.addEventListener("click", handleGoogleSignIn);
          }
        }
      }
    }
  }, [showGoogleButton]);

  return (
    <div className="inset-auto flex min-h-screen w-screen min-w-[400px] flex-col md:flex-row">
      {/* Image Container - Matched to reference styling */}
      <div className="-z-50 aspect-[773/499] min-h-72 bg-white bg-jesus-hero bg-cover bg-center bg-no-repeat max-md:w-full max-md:bg-top max-xs:scale-x-125 sm:self-stretch md:order-2 md:w-3/4 md:overflow-x-clip md:bg-cover md:bg-clip-border md:bg-top-4 md:bg-origin-border" />

      {/* Form */}
      <div className="z-50 h-full md:w-3/4">
        {!wasAccountCreated ? (
          <div>
            <SignUp callbackUrl={CALLBACK_URL || "/profile"} />

            {/* Google Sign-In Fallback Button */}
            {showGoogleButton && (
              <div className="mt-4 flex justify-center">
                <div className="w-full max-w-sm">
                  <div className="mb-4 text-center">
                    <span className="text-sm text-gray-600">
                      Or continue with Google
                    </span>
                  </div>
                  <div
                    id="google-signin-button"
                    className="flex justify-center"
                  ></div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <EmailVerification email={email as string} />
        )}
      </div>
    </div>
  );
}
