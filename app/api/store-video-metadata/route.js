import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

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

    const client = await clientPromise;

    // mongodb will create this db and collection if they don't already exist
    const collection = client.db().collection("video-uploads");

    // Create a new document with timestamp fields
    const now = new Date();

    await collection.insertOne({
      cohort,
      firstName,
      lastName,
      week,
      day,
      fileName,
      fileType,
      blobUrl,
      createdAt: now,
      updatedAt: now,
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
