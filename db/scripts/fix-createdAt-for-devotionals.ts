import { resolve } from "path";
import { config } from "dotenv";
import { MongoClient } from "mongodb";

// Load .env file from project root
config({ path: resolve(__dirname, "../../.env") });

async function fixDevotionalTimestamps() {
  // Verify DATABASE_URL is loaded
  if (!process.env.DATABASE_URL) {
    console.error("❌ ERROR: DATABASE_URL not found in environment variables");
    console.error(
      "Please check that .env file exists and contains DATABASE_URL",
    );
    process.exit(1);
  }

  console.log("✓ Environment variables loaded");
  console.log(
    `✓ Database URL found: ${process.env.DATABASE_URL.substring(0, 30)}...\n`,
  );

  const uri = process.env.DATABASE_URL;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db();
    const devotionalCollection = db.collection("devotional");

    const now = new Date();

    // Update all devotionals that have null createdAt or updatedAt
    const result = await devotionalCollection.updateMany(
      {
        $or: [
          { createdAt: null },
          { createdAt: { $exists: false } },
          { updatedAt: null },
          { updatedAt: { $exists: false } },
        ],
      },
      {
        $set: {
          createdAt: now,
          updatedAt: now,
        },
      },
    );

    console.log("Update completed:");
    console.log(`- Matched documents: ${result.matchedCount}`);
    console.log(`- Modified documents: ${result.modifiedCount}`);
  } catch (error) {
    console.error("Error updating devotional timestamps:", error);
    throw error;
  } finally {
    await client.close();
    console.log("Disconnected from MongoDB");
  }
}

fixDevotionalTimestamps()
  .catch(console.error)
  .finally(() => process.exit());
