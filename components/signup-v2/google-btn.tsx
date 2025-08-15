"use client";

import React from "react";
import Image from "next/image";

export default function GoogleBtn() {
  const handleGoogleSignUp = () => {
    // Implement your Google auth logic here
    console.log("Google Sign Up clicked");
    // For example: authClient.signUp.google()
  };

  const loading = false;

  return (
    <button
      type="button"
      className="mx-auto my-4 flex w-5/6 columns-1 items-center justify-center gap-7 justify-self-center rounded-2xl py-2 shadow-md outline outline-1 outline-primary-red"
      onClick={handleGoogleSignUp}
      disabled={loading}
    >
      <Image
        className="overflow-x-clip object-cover contain-layout"
        src="/googlelogo.png"
        width={20}
        height={20}
        alt="Google Logo"
      />
      <div className="text-lg font-semibold text-primary-red">
        Sign Up with Google
      </div>
    </button>
  );
}
