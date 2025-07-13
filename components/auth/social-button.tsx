"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { toast } from "sonner";

import { signIn } from "@/lib/auth-client";

import type { ErrorContext } from "better-auth/react";
import { Button } from "../ui/button";

interface SocialButtonProps {
  provider: "google";
  icon: React.ReactNode;
  label: string;
  callbackURL?: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  provider = "google",
  icon,
  label,
  callbackURL = "/payment",
}) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleSignIn = async () => {
    await signIn.social(
      { provider, callbackURL },
      {
        onResponse: () => setLoading(false),
        onRequest: () => {
          toast.info("Authenticating...");
          setLoading(true);
        },
        onSuccess: () => {
          toast.success("You are logged in successfully");
          router.push(callbackURL);
        },
        onError: (ctx: ErrorContext) => {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={handleSignIn}
        aria-disabled={loading}
        className="mx-auto my-4 flex w-3/4 max-w-[200px] columns-1 items-center justify-center gap-7 justify-self-center rounded-2xl py-2 text-primary-red shadow-md outline outline-1 outline-primary-red hover:text-white disabled:animate-caret-blink"
      >
        {icon}
        {label}
      </Button>
    </>
  );
};

export default SocialButton;
