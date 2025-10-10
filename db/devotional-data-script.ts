/**
 * Devotional Data Script 
 * 
 * This script is used to change the object definition in MongoDB. Currently the scriptures were manually input as objects into the MongoDB collection. However, the Dashboard is now expecting those scriptures to be in a list so that they can be iterated through. 
 * 
 * This script does that update in the database.
 * 
 */

import { PrismaClient } from "@/generated/client";
import { MongoClient } from "mongodb";

const mongoUrl = process.env.DATABASE_URL || "";

async function fixScriptures() {
  console.log("Starting scripture field fix...");

  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();
    
    const db = client.db();
    const collection = db.collection("devotional");

    // Find all devotionals with Scriptures as an empty object
    const devotionals = await collection.find({
      $or: [
        { Scriptures: {} },
        { Scriptures: { $exists: false } },
        { Scriptures: null },
      ]
    }).toArray();

    console.log(`Found ${devotionals.length} devotionals to fix`);

    // Update each document
    for (const devotional of devotionals) {
      await collection.updateOne(
        { _id: devotional._id },
        { $set: { Scriptures: [] } }
      );
      console.log(`Fixed devotional: Week ${devotional.week}, Day ${devotional.day}`);
    }

    console.log("Scripture field fix completed successfully!");
    await client.close();
  } catch (error) {
    console.error("Error fixing scriptures:", error);
    throw error;
  }
}

fixScriptures();