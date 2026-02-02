"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Divider from "@/components/signup-v2/divider";
import Form from "@/components/signup-v2/form";
import FormHeader from "@/components/signup-v2/form-header";
import GoogleBtn from "@/components/signup-v2/google-btn";

export default function Login() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const message = searchParams.get("message");
    if (message) {
      toast.error(message);
      // Clean up the URL by replacing the current URL without the message parameter
      const url = new URL(window.location.href);
      url.searchParams.delete("message");
      router.replace(url.pathname + url.search);
    }
  }, [searchParams, router]);

  return (
    <div className="inset-auto flex min-h-screen w-screen min-w-[360px] flex-col md:flex-row">
      {/* Image Container - Matched to reference styling */}
      <div className="-z-50 aspect-773/499 min-h-48 xs:min-h-60 sm:min-h-72 bg-white bg-jesus-hero bg-cover bg-center bg-no-repeat max-md:w-full max-md:bg-top max-xs:scale-x-125 sm:self-stretch md:order-2 md:w-3/4 md:overflow-x-clip md:bg-cover md:bg-clip-border md:bg-top-4 md:bg-origin-border" />

      {/* Form Header: Image and Text */}
      <div className="w-full px-4 xs:px-6 sm:px-8 md:w-3/4 md:px-6 lg:px-8">
        <FormHeader isSignUp={false} />

        {/* Google Sign Up Button */}
        <GoogleBtn isSignUp={false} />

        {/* Divider */}
        <Divider />

        {/* Form */}
        <Form isSignUp={false} />
      </div>
    </div>
  );
}
