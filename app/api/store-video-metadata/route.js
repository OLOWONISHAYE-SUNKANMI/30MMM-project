import clientPromise from "@/lib/mongodb";

export default async function POST(request) {
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
    const collection = client.db("testimonials").collection("video-uploads");

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
  } catch (error) {
    console.log("error in storing metadata: ", error);
  }
}
