"use server";

import { signIn, signOut } from "@/lib/auth";
import { getUser } from "@/lib/session";

// Helper function to determine redirect path
async function getRedirectPath() {
  try {
    const user = await getUser();

    // If user doesn't exist or couldn't be fetched from the database
    if (!user) {
      return "/profile";
    }

    // Check if user has completed their profile
    // This assumes userProfile contains a field indicating profile completion
    if (user.userProfile) {
      return "/dashboard";
    }

    // User exists but hasn't completed profile
    return "/profile";
  } catch (error) {
    console.error("Error determining redirect path:", error);
    return "/signup";
  }
}

// Sign up with Google
export async function signUpWithGoogleAction() {
  const redirectTo = await getRedirectPath();
  await signIn("google", { redirectTo });
}

// Sign up with credentials
export async function signUpWithCredentialsAction(
  email: string,
  password: string,
) {
  const redirectTo = await getRedirectPath();
  await signIn("credentials", {
    email,
    password,
    redirectTo,
  });
}

// Generic sign up that accepts provider type
export async function signUpAction(
  provider: "google" | "credentials",
  credentials?: { email: string; password: string },
) {
  const redirectTo = await getRedirectPath();

  if (provider === "credentials" && credentials) {
    await signIn("credentials", {
      ...credentials,
      redirectTo,
    });
  } else if (provider === "google") {
    await signIn("google", { redirectTo });
  } else {
    throw new Error("Invalid provider or missing credentials");
  }
}

// Sign out function
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
