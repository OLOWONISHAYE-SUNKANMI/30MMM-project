import prisma from "@/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  // creating a client
  // connecting to MongoDB
  try {
    const {
      cohort,
      firstName,
      lastName,
      week,
      day,
      fileName,
      fileType,
      blobUrl,
    } = await request.json();

    await prisma.videoUpload.create({
      data: {
        cohort: parseInt(cohort),
        firstName,
        lastName,
        week: parseInt(week),
        day: parseInt(day),
        fileName,
        fileType,
        blobUrl,
      },
    });

    return NextResponse.json(
      {
        message: `${Date.now()} - Data saved for ${cohort} - ${firstName} ${lastName}`,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("error in storing metadata: ", error);
    return NextResponse.json(
      {
        message: "Data not saved for ${cohort} - ${firstName} ${lastName}",
        error,
      },
      { status: 500 },
    );
  }
}
