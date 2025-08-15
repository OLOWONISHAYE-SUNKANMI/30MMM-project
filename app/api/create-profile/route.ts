// app/api/profile/route.js
import prisma from "@/db"; // Use your existing prisma import
import { getServerSession } from "next-auth"; // Import as named export
import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "@/lib/auth"; // Import your auth instance

export async function POST(request: NextRequest) {
  try {
    // Call getServerSession with the authConfig
    const session = await getServerSession(authConfig);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "You must be logged in to update your profile" },
        { status: 401 },
      );
    }

    // Get the user ID from the session
    // Add type assertion or check if id exists
    const userId = session.user.id;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID not found in session" },
        { status: 400 },
      );
    }

    // Parse the request body
    const profileData = await request.json();

    // Create or update user profile in the database
    const updatedProfile = await prisma.userProfile.upsert({
      where: { userId: userId },
      update: {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        birthDate: profileData.birthdate
          ? new Date(profileData.birthdate)
          : null,
        maritalStatus: profileData.maritalStatus,
        childrenCount: parseInt(profileData.childrenCount) || 0,
        churchAffiliation: profileData.churchAffiliation,
        email: profileData.email,
        phoneNumber: profileData.telephone,
        address: profileData.address,
        city: profileData.city,
        state: profileData.state,
        zipcode: profileData.zipcode,
      },
      create: {
        userId: userId,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        birthDate: profileData.birthdate
          ? new Date(profileData.birthdate)
          : null,
        maritalStatus: profileData.maritalStatus,
        childrenCount: parseInt(profileData.childrenCount) || 0,
        churchAffiliation: profileData.churchAffiliation,
        email: profileData.email,
        phoneNumber: profileData.telephone,
        address: profileData.address,
        city: profileData.city,
        state: profileData.state,
        zipcode: profileData.zipcode,
      },
    });

    // Update the user record to mark the profile as completed
    await prisma.user.update({
      where: { id: userId },
      data: {
        profileCompleted: true,
      },
    });

    return NextResponse.json({
      success: true,
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Error creating profile:", error);
    return NextResponse.json(
      { error: "Failed to create profile" },
      { status: 500 },
    );
  }
}
