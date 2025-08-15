"use server";

import { signIn, signOut } from "@/lib/auth";
import { getUser } from "@/lib/session"; // Assuming this function exists to get user data

// Helper function to determine redirect path
async function getRedirectPath() {
  try {
    const user = await getUser();
    // If user already exists in our database and has completed profile setup
    if (user && user.profileCompleted) {
      return "/dashboard";
    }
    // For new users or users who haven't completed their profile
    return "/profile";
  } catch (error) {
    // Default to profile page if we can't determine user status
    console.error(
      "Unable to tell if user was signed up previously or not; redirecting to profile",
      error,
    );
    return "/profile";
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
