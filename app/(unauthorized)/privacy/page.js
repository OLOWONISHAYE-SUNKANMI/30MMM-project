import React from "react";
import Head from "next/head";
import Image from "next/image";
import PrivacySheet from "@/components/privacy/PrivacySheet";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>
          Privacy policy for the CLEAN Program&apos;s Learning Management System
        </title>
        <meta
          name="description"
          content="Privacy policy for CLEAN LMS provided by Thirty Mighty Men Ministries"
        />
      </Head>
      <div className="container mx-auto max-w-5xl p-6">
        <Image
          className="z-10 mx-auto -mt-16 block md:mt-16"
          src="/logo.png"
          alt="Logo"
          width={120}
          height={120}
        />
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
          <PrivacySheet />
        </div>
      </div>
    </>
  );
}
