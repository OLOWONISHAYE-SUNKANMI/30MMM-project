// app/api/profile/route.js
import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// POST - Create/Update profile (initial creation)
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "You must be logged in to update your profile" },
        { status: 401 },
      );
    }

    const userId = session.user.id;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID not found in session" },
        { status: 400 },
      );
    }

    const profileData = await request.json();

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

// GET - Fetch profile
export async function GET() {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "You must be logged in to view your profile" },
        { status: 401 },
      );
    }

    const userId = session.user.id;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID not found in session" },
        { status: 400 },
      );
    }

    const userProfile = await prisma.userProfile.findUnique({
      where: { userId },
    });

    return NextResponse.json({ profile: userProfile });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 },
    );
  }
}

// PUT - Update profile
export async function PUT(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "You must be logged in to update your profile" },
        { status: 401 },
      );
    }

    const userId = session.user.id;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID not found in session" },
        { status: 400 },
      );
    }

    const data = await request.json();

    // Convert empty strings to null for optional fields
    const profileData = {
      firstName: data.firstName || null,
      lastName: data.lastName || null,
      birthDate: data.birthDate ? new Date(data.birthDate) : null,
      maritalStatus: data.maritalStatus || null,
      childrenCount: data.childrenCount ? parseInt(data.childrenCount) : null,
      churchAffiliation: data.churchAffiliation || null,
      email: data.email || null,
      phoneNumber: data.phoneNumber || null,
      address: data.address || null,
      city: data.city || null,
      state: data.state || null,
      zipcode: data.zipcode || null,
    };

    const userProfile = await prisma.userProfile.upsert({
      where: { userId },
      update: profileData,
      create: {
        userId,
        ...profileData,
      },
    });

    return NextResponse.json({
      success: true,
      profile: userProfile,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 },
    );
  }
}
