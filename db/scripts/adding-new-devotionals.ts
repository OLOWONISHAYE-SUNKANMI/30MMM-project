/**
 * Adding New Devotionals Script
 *
 * This script allows you to add new devotional records to the database.
 * You can create devotionals with complete information including scriptures,
 * content, and metadata.
 *
 * Usage:
 *   npx tsx db/scripts/adding-new-devotionals.ts
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * FEATURES & USAGE GUIDE
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * 1. ADD NEW DEVOTIONALS
 *    - Edit the `newDevotionals` array with your devotional data
 *    - Uncomment: await addDevotionals();
 *    - Run: npx tsx db/scripts/adding-new-devotionals.ts
 *    - Automatically skips duplicates (checks week + day)
 *
 * 2. UPDATE EXISTING DEVOTIONAL SCRIPTURES
 *    - Use to add/update scriptures for a specific devotional
 *    - Uncomment and modify the updateDevotionalScriptures call in main():
 *      await updateDevotionalScriptures(1, 1, [
 *        {
 *          text: "For God so loved the world...",
 *          book: "John",
 *          chapter: "3",
 *          verse: "16",
 *          translation: "NIV"
 *        }
 *      ]);
 *    - Run the script
 *
 * 3. BATCH IMPORT FROM JSON
 *    - Import devotionals from a JSON file or array
 *    - Create/update multiple devotionals at once
 *    - Uncomment in main():
 *      import devotionalData from "./path/to/devotionals.json";
 *      await batchUpdateFromJSON(devotionalData);
 *    - JSON format should match the NewDevotional interface
 *    - Automatically creates new or updates existing based on week + day
 *
 * 4. LIST ALL DEVOTIONALS
 *    - View all devotionals in the database
 *    - Organized by week with scripture counts
 *    - Uncomment in main(): await listAllDevotionals();
 *    - Useful for verifying data after imports/updates
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * DEVOTIONAL DATA STRUCTURE
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Each devotional must have:
 *   - week: Number (1-5) - Week number in the program
 *   - day: Number (1-7) - Day number within the week
 *   - weekTitle: String - Title for the week (e.g., "Week 1: Foundation")
 *   - dayTitle: String - Title for the specific day
 *   - daySubTitle: String (optional) - Subtitle for additional context
 *   - Scriptures: Array of scripture objects with:
 *       * text: Full scripture text
 *       * book: Bible book name
 *       * chapter: Chapter number as string
 *       * verse: Verse number(s) as string
 *       * translation: Bible translation (e.g., "NIV", "ESV")
 *   - content: String - Markdown-formatted devotional content
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * TIPS & BEST PRACTICES
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * - Always run listAllDevotionals() after batch operations to verify
 * - Use batch updates for importing large amounts of data
 * - Scripture text should be the full verse text for display purposes
 * - Content supports Markdown formatting (headers, lists, bold, etc.)
 * - Week/day combinations must be unique (enforced by schema)
 * - Test with a small batch first before importing large datasets
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { resolve } from "path";
import prisma from "@/db";
import { DevotionalData } from "@/sample-data/DevotionalData";
import { config } from "dotenv";
import { Devotional } from "../../generated/client/index.js";

// Load environment variables
config({ path: resolve(process.cwd(), ".env") });

// Verify DATABASE_URL is loaded
if (!process.env.DATABASE_URL) {
  console.error("❌ ERROR: DATABASE_URL not found in environment variables");
  process.exit(1);
}

const newDevotionals = DevotionalData; // Replace with new Devotionals as needed

/**
 * Add new devotionals to the database
 */
async function addDevotionals() {
  console.log("🚀 Starting to add new devotionals...\n");

  try {
    let addedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    for (const devotionalData of newDevotionals) {
      try {
        // Check if devotional already exists
        const existing = await prisma.devotional.findFirst({
          where: {
            week: devotionalData.week,
            day: devotionalData.day,
          },
        });

        if (existing) {
          console.log(
            `⚠️  Skipped - Week ${devotionalData.week}, Day ${devotionalData.day} already exists`,
          );
          skippedCount++;
          continue;
        }

        // Create new devotional
        const newDevotional = await prisma.devotional.create({
          data: {
            numberId: devotionalData.numberId,
            week: devotionalData.week,
            day: devotionalData.day,
            weekTitle: devotionalData.weekTitle,
            dayTitle: devotionalData.dayTitle,
            daySubTitle: devotionalData.daySubTitle || null,
            devotionText: devotionalData.devotionText,
            reflectionQuestion: devotionalData.reflectionQuestion || null,
            videoId: devotionalData.videoId || null,
            Scriptures: devotionalData.Scriptures || null,
          },
        });

        console.log(
          `✅ Added - Week ${newDevotional.week}, Day ${newDevotional.day}: ${newDevotional.dayTitle}`,
        );
        addedCount++;
      } catch (error) {
        console.error(
          `❌ Error adding Week ${devotionalData.week}, Day ${devotionalData.day}:`,
          error,
        );
        errorCount++;
      }
    }

    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`✅ Devotional addition completed!`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`  Total to add: ${newDevotionals.length}`);
    console.log(`  Successfully added: ${addedCount}`);
    console.log(`  Skipped (already exist): ${skippedCount}`);
    console.log(`  Errors: ${errorCount}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
  } catch (error) {
    console.error("❌ Error in addDevotionals:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
    console.log("✓ Database connection closed");
  }
}

/**
 * Update existing devotional with scriptures
 */
async function updateDevotionalScriptures(
  week: number,
  day: number,
  scriptures: Array<{
    text: string;
    book: string;
    chapter: string;
    verse: string;
    translation: string;
  }>,
) {
  console.log(`\n🔧 Updating scriptures for Week ${week}, Day ${day}...`);

  try {
    const devotional = await prisma.devotional.findFirst({
      where: { week, day },
    });

    if (!devotional) {
      console.log(`❌ Devotional not found for Week ${week}, Day ${day}`);
      return;
    }

    await prisma.devotional.update({
      where: { id: devotional.id },
      data: { Scriptures: scriptures },
    });

    console.log(
      `✅ Updated scriptures for Week ${week}, Day ${day}: ${devotional.dayTitle}`,
    );
  } catch (error) {
    console.error(`❌ Error updating Week ${week}, Day ${day}:`, error);
    throw error;
  }
}

/**
 * Batch update devotionals from a JSON file or array
 */
async function batchUpdateFromJSON(devotionalsArray: Devotional[]) {
  console.log(
    `\n📦 Batch updating ${devotionalsArray.length} devotionals...\n`,
  );

  let updatedCount = 0;
  let createdCount = 0;

  for (const devData of devotionalsArray) {
    try {
      // Try to find existing devotional
      const existing = await prisma.devotional.findFirst({
        where: {
          week: devData.week,
          day: devData.day,
        },
      });

      if (existing) {
        // Update existing
        await prisma.devotional.update({
          where: { id: existing.id },
          data: {
            weekTitle: devData.weekTitle,
            dayTitle: devData.dayTitle,
            daySubTitle: devData.daySubTitle || null,
            Scriptures: devData.Scriptures,
            devotionText: devData.devotionText,
          },
        });
        console.log(
          `✅ Updated - Week ${devData.week}, Day ${devData.day}: ${devData.dayTitle}`,
        );
        updatedCount++;
      } else {
        // Create new
        await prisma.devotional.create({
          data: {
            week: devData.week,
            day: devData.day,
            weekTitle: devData.weekTitle,
            dayTitle: devData.dayTitle,
            daySubTitle: devData.daySubTitle || null,
            Scriptures: devData.Scriptures,
            devotionText: devData.devotionText,
          },
        });
        console.log(
          `✅ Created - Week ${devData.week}, Day ${devData.day}: ${devData.dayTitle}`,
        );
        createdCount++;
      }
    } catch (error) {
      console.error(
        `❌ Error processing Week ${devData.week}, Day ${devData.day}:`,
        error,
      );
    }
  }

  console.log(`\n✅ Batch update complete!`);
  console.log(`   Created: ${createdCount}`);
  console.log(`   Updated: ${updatedCount}\n`);
}

/**
 * List all devotionals in the database
 */
async function listAllDevotionals() {
  console.log("\n📋 Listing all devotionals in database...\n");

  try {
    const devotionals = await prisma.devotional.findMany({
      orderBy: [{ week: "asc" }, { day: "asc" }],
      select: {
        week: true,
        day: true,
        weekTitle: true,
        dayTitle: true,
        Scriptures: true,
      },
    });

    console.log(`Found ${devotionals.length} devotionals:\n`);

    let currentWeek = 0;
    for (const dev of devotionals) {
      if (dev.week !== currentWeek) {
        currentWeek = dev.week;
        console.log(`\n${dev.weekTitle}`);
        console.log("─".repeat(50));
      }

      const scriptureCount = Array.isArray(dev.Scriptures)
        ? dev.Scriptures.length
        : 0;
      console.log(
        `  Day ${dev.day}: ${dev.dayTitle} (${scriptureCount} scripture${scriptureCount !== 1 ? "s" : ""})`,
      );
    }

    console.log("\n");
  } catch (error) {
    console.error("❌ Error listing devotionals:", error);
    throw error;
  }
}

// Main execution
async function main() {
  console.log("════════════════════════════════════════");
  console.log("  📖 Devotional Management Script");
  console.log("════════════════════════════════════════\n");

  // Uncomment the function you want to run:

  // 1. Add new devotionals
  await addDevotionals();

  // 2. Update scriptures for a specific devotional
  // await updateDevotionalScriptures(1, 1, [
  //   {
  //     text: "Your scripture text here...",
  //     book: "John",
  //     chapter: "3",
  //     verse: "16",
  //     translation: "NIV"
  //   }
  // ]);

  // 3. Batch update from array
  // await batchUpdateFromJSON(newDevotionals);

  // 4. List all devotionals
  // await listAllDevotionals();
}

main().catch((error) => {
  console.error("\n❌ Fatal error:", error);
  process.exit(1);
});
