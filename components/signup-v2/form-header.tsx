import React from "react";
import Image from "next/image";

export default function FormHeader() {
  return (
    <div>
      <Image
        className="z-10 mx-auto -mt-16 block md:mt-16"
        src="/logo.png"
        alt="Logo"
        width={120}
        height={120}
      />
      <h1 className="text-center text-4xl font-semibold md:mb-6">Sign Up</h1>
    </div>
  );
}
