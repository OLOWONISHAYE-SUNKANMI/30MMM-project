"use client";

import EmailVerification from "@/components/auth/email-verification";
import SignUp from "@/components/auth/sign-up";
import { authClient } from "@/lib/auth-client";
import { use, useEffect } from "react";
import { toast } from "sonner";

export default function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const CALLBACK_URL = "/profile";
  const { step, email } = use(searchParams);
  const wasAccountCreated = step === "verify";

  useEffect(() => {
    const oneTap = async () => {
       if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
      console.error("Google Client ID is missing. Please check your environment variables.");
      toast.error("Authentication configuration error");
      return;
    }
      authClient.oneTap({
        callbackURL: CALLBACK_URL,
        fetchOptions: {
          onError: ({ error }) => {
            toast.error(error.message || "An error occurred");
          },
          onSuccess: () => {
            toast.success("Successfully signed in");
          },
        },
      });
    };

    oneTap();
  }, []);

  return (
    <div className="inset-auto flex md:flex-row flex-col w-screen min-w-[400px] min-h-screen">
      {/* Image Container - Matched to reference styling */}
      <div className="-z-50 sm:self-stretch md:order-2 bg-jesus-hero bg-white md:bg-clip-border md:bg-origin-border bg-cover md:bg-cover bg-no-repeat bg-center max-md:bg-top md:bg-top-4 max-md:w-full md:w-3/4 min-h-72 aspect-[773/499] md:overflow-x-clip max-xs:scale-x-125" />

      {/* Form */}
      <div className="z-50 md:w-3/4 h-full">
        {!wasAccountCreated ? (
          <SignUp callbackUrl={CALLBACK_URL || "/profile"} />
        ) : (
          <EmailVerification email={email as string} />
        )}
      </div>
    </div>
  );
}
