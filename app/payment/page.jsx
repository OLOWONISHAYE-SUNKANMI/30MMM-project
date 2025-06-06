import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import DonationPageClient from "@/components/Donations/DonationPageClient"; //TBD
import { auth } from "@/lib/auth";

export default async function DonatePage() {
  // Get the user session from better-auth
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // If user isn't logged in, redirect to login page
  if (!session) {
    redirect("/login");
  }

  // Pass user data to the client component
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <DonationPageClient
          userName={session.user.name}
          userEmail={session.user.email}
          isPremium={session.user.premium}
        />
      </div>
    </main>
  );
}
