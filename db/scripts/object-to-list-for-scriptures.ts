/**
 * Devotional Data Script
 *
 * This script is used to change the object definition in MongoDB. Currently the scriptures were manually input as objects into the MongoDB collection. However, the Dashboard is now expecting those scriptures to be in a list so that they can be iterated through.
 *
 * This script does that update in the database.
 *
 */

import { resolve } from "path";
import { config } from "dotenv";
import { MongoClient } from "mongodb";

// Load environment variables from .env file
config({ path: resolve(process.cwd(), ".env") });

// Verify DATABASE_URL is loaded
if (!process.env.DATABASE_URL) {
  console.error("❌ ERROR: DATABASE_URL not found in environment variables");
  console.error("Please check that .env file exists and contains DATABASE_URL");
  process.exit(1);
}

console.log("✓ Environment variables loaded");
console.log(
  `✓ Database URL found: ${process.env.DATABASE_URL.substring(0, 30)}...\n`,
);

async function fixScriptures() {
  console.log("Starting scripture field fix using raw MongoDB...\n");

  const client = new MongoClient(process.env.DATABASE_URL!);

  try {
    // Connect to MongoDB
    await client.connect();
    console.log("✓ Connected to MongoDB\n");

    const db = client.db();
    const collection = db.collection("devotional");

    // Get total count
    const totalCount = await collection.countDocuments();
    console.log(`✓ Found ${totalCount} total devotionals in database\n`);

    // Find all devotionals with Scripture issues (using raw MongoDB query)
    const problematicDevotionals = await collection
      .find({
        $or: [
          { Scriptures: {} }, // Empty object
          { Scriptures: { $type: "object", $not: { $type: "array" } } }, // Object but not array
          { Scriptures: { $exists: false } }, // Field doesn't exist
          { Scriptures: null }, // Null value
        ],
      })
      .toArray();

    console.log(
      `✓ Found ${problematicDevotionals.length} devotionals with Scripture issues\n`,
    );

    if (problematicDevotionals.length === 0) {
      console.log("🎉 No devotionals need fixing! All Scriptures are arrays.");
      await client.close();
      return;
    }

    // Display some examples of problematic data
    console.log("📋 Examples of problematic data:");
    problematicDevotionals.slice(0, 3).forEach((dev) => {
      console.log(
        `   Week ${dev.week}, Day ${dev.day}: Scriptures = ${JSON.stringify(dev.Scriptures)}`,
      );
    });
    console.log("");

    // Fix each document
    let fixedCount = 0;
    console.log("🔧 Fixing devotionals...\n");

    for (const devotional of problematicDevotionals) {
      try {
        await collection.updateOne(
          { _id: devotional._id },
          { $set: { Scriptures: [] } },
        );

        console.log(
          `✓ Fixed - Week ${devotional.week}, Day ${devotional.day}: ${devotional.dayTitle || "Untitled"}`,
        );
        fixedCount++;
      } catch (error) {
        console.error(
          `✗ Error fixing Week ${devotional.week}, Day ${devotional.day}:`,
          error,
        );
      }
    }

    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`✅ Scripture field fix completed!`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`  Total devotionals: ${totalCount}`);
    console.log(`  Had issues: ${problematicDevotionals.length}`);
    console.log(`  Successfully fixed: ${fixedCount}`);
    console.log(
      `  Already correct: ${totalCount - problematicDevotionals.length}`,
    );
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

    // Verify the fix
    console.log("🔍 Verifying fix...");
    const remainingIssues = await collection
      .find({
        $or: [
          { Scriptures: {} },
          { Scriptures: { $type: "object", $not: { $type: "array" } } },
          { Scriptures: { $exists: false } },
          { Scriptures: null },
        ],
      })
      .count();

    if (remainingIssues === 0) {
      console.log("✅ All devotionals now have valid Scripture arrays!\n");
    } else {
      console.log(
        `⚠️  Warning: ${remainingIssues} devotionals still have issues\n`,
      );
    }
  } catch (error) {
    console.error("❌ Error fixing scriptures:", error);
    throw error;
  } finally {
    await client.close();
    console.log("✓ MongoDB connection closed");
  }
}

fixScriptures().catch((error) => {
  console.error("\n❌ Fatal error:", error);
  process.exit(1);
});
