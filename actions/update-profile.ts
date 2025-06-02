"use server";

import prisma from "@/db";
import type { Profile, User } from "@/generated/client";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const session = await auth.api.getSession({
  headers: await headers(),
});

export type ProfileData = Profile;

export type UpdateProfileResponse = {
  message?: string;
  success: boolean;
  updatedUser?: User;
};

export async function updateProfile({
  profileData,
}: {
  profileData: ProfileData;
}): Promise<UpdateProfileResponse> {
  if (!session) {
    return {
      success: false,
      message: "Error: You must be logged in to update your profile",
    };
  }

  const userId = session.user.id;

  // Create or update user profile in the database
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      profile: profileData,
    },
  });

  return {
    updatedUser,
    success: true,
    message: "Profile updated successfully",
  };
}
