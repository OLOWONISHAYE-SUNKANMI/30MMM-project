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
      cleanFilename,
      FileType,
      imageUrl,
    } = await request.json();

    const client = await clientPromise;

    // mongodb will create this db and collection if they don't already exist
    const collection = client.db().collection("video-uploads");

    await collection.insertOne({
      cohort,
      firstName,
      lastName,
      week,
      day,
      cleanFilename,
      FileType,
      imageUrl,
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
