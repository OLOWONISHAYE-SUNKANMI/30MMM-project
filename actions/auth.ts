"use server";

import { PrismaClient } from "@/generated/client";
import { hash } from "bcrypt";
import { signIn, signOut } from "@/lib/auth";
import { getUser } from "@/lib/session";

const prisma = new PrismaClient();

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

// Sign up with credentials - CREATE USER FIRST, THEN SIGN IN
export async function signUpWithCredentialsAction(
  email: string,
  password: string,
  name?: string,
) {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    // Hash the password
    const hashedPassword = await hash(password, 12);

    // Create the user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || email.split("@")[0], // Use email prefix as default name
        role: "user",
      },
    });

    // Now sign in the newly created user
    const redirectTo = await getRedirectPath();
    await signIn("credentials", {
      email,
      password, // Use original password, not hashed
      redirectTo,
    });
  } catch (error) {
    console.error("Sign up error:", error);

    // Nextjs handles redirects internally with this error, its thrown after a successful authentication
    // This is expected behavior so we return nothing
    if (error?.message?.includes("NEXT_REDIRECT")) {
      return;
    }
    // if there is a real error, throw that
    throw error;
  }
}

// Generic sign up that accepts provider type
export async function signUpAction(
  provider: "google" | "credentials",
  credentials?: { email: string; password: string; name?: string },
) {
  if (provider === "credentials" && credentials) {
    await signUpWithCredentialsAction(
      credentials.email,
      credentials.password,
      credentials.name,
    );
  } else if (provider === "google") {
    await signUpWithGoogleAction();
  } else {
    throw new Error("Invalid provider or missing credentials");
  }
}

// Sign out function
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

// In your form component, make sure you're calling the action correctly:
const handleSubmit = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string; // Add this if you have a name field

  try {
    await signUpWithCredentialsAction(email, password, name);
  } catch (error) {
    // Handle error appropriately
    console.error("Sign up failed:", error);
  }
};
