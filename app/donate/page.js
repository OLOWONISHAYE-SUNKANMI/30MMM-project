"use client";

import React from "react";
import Image from "next/image";
import Script from "next/script";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const DonationPage = () => {
  return (
    <div className="mt-20 min-h-screen bg-linear-to-b from-blue-50 to-white">
      <Script
        src="https://donorbox.org/install-popup-button.js"
        strategy="afterInteractive"
        id="donorbox-popup-button-installer"
      />

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Support Our Cause
          </h1>
          <p className="mb-8 text-lg text-gray-600">
            Your donation helps us make a difference. Every contribution counts
            towards our mission.
          </p>
        </div>

        <div className="mx-auto max-w-lg">
          <Card>
            <CardHeader>
              <CardTitle>Make a Donation</CardTitle>
              <CardDescription>
                Choose an amount to donate securely through Donorbox
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              {/* Donorbox button - using their exact markup */}
              <a
                className="dbox-donation-button"
                href="https://donorbox.org/clean?default_interval=o"
                style={{
                  background: "rgb(175, 54, 52)",
                  color: "rgb(255, 255, 255)",
                  textDecoration: "none",
                  fontFamily: "Verdana, sans-serif",
                  display: "flex",
                  fontSize: "16px",
                  padding: "8px 24px",
                  borderRadius: "5px",
                  gap: "8px",
                  width: "fit-content",
                  lineHeight: "24px",
                }}
              >
                <Image
                  src="https://donorbox.org/images/white_logo.svg"
                  alt="Donorbox"
                  style={{ height: "24px" }}
                  width={24}
                  height={24}
                />
                <span
                  className="cta-label"
                  style={{ fontFamily: "inherit", fontSize: "inherit" }}
                >
                  Donate
                </span>
              </a>
            </CardContent>
          </Card>

          <div className="mt-12 space-y-6 text-center">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="p-4">
                    <h3 className="mb-2 font-semibold">Secure</h3>
                    <p className="text-sm text-gray-600">
                      All donations are processed securely through Donorbox
                    </p>
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 font-semibold">Tax Deductible</h3>
                    <p className="text-sm text-gray-600">
                      You&apos;ll receive a receipt for your tax records
                    </p>
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 font-semibold">Impact</h3>
                    <p className="text-sm text-gray-600">
                      100% of your donation goes towards our mission
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DonationPage;
