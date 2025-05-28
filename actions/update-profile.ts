"use server";

import prisma from "@/db";
import Prisma from "@/generated/client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const session = await auth.api.getSession({
  headers: await headers(),
});

export type ProfileData = Prisma.Profile;

export type User = Prisma.User;

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
