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
import { config } from "dotenv";
import { PrismaClient } from "../../generated/client/index.js";

// Load environment variables
config({ path: resolve(process.cwd(), ".env") });

// Verify DATABASE_URL is loaded
if (!process.env.DATABASE_URL) {
  console.error("❌ ERROR: DATABASE_URL not found in environment variables");
  process.exit(1);
}

const prisma = new PrismaClient();

// Type definition for new devotional data
interface NewDevotional {
  week: number;
  day: number;
  weekTitle: string;
  dayTitle: string;
  daySubTitle?: string;
  Scriptures: Array<{
    text: string;
    book: string;
    chapter: string;
    verse: string;
    translation: string;
  }>;
  content: string;
}

// Example devotionals to add
const newDevotionals: NewDevotional[] = [
  {
    week: 1,
    day: 1,
    weekTitle: "Week 1: Foundation",
    dayTitle: "Understanding God's Love",
    daySubTitle: "The Greatest Gift",
    Scriptures: [
      {
        text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
        book: "John",
        chapter: "3",
        verse: "16",
        translation: "NIV",
      },
      {
        text: "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.",
        book: "Romans",
        chapter: "5",
        verse: "8",
        translation: "NIV",
      },
    ],
    content: `God's love is the foundation of everything we believe as Christians. It's not based on our performance or worthiness, but on His character and grace.

In today's passage, we see the incredible depth of God's love demonstrated through the sacrifice of His Son. This wasn't just any gift - it was the ultimate expression of love that cost God everything.

Take time today to reflect on what it means that God loves you personally. His love isn't distant or theoretical - it's intimate, powerful, and transformative.

**Reflection Questions:**
- How does knowing God's love change the way you see yourself?
- In what ways can you respond to God's love today?
- Who in your life needs to hear about God's love?`,
  },
  {
    week: 1,
    day: 2,
    weekTitle: "Week 1: Foundation",
    dayTitle: "Walking in Faith",
    daySubTitle: "Trust and Obedience",
    Scriptures: [
      {
        text: "Now faith is confidence in what we hope for and assurance about what we do not see.",
        book: "Hebrews",
        chapter: "11",
        verse: "1",
        translation: "NIV",
      },
    ],
    content: `Faith is not blind belief - it's confident trust in God's character and promises. Today we explore what it means to walk by faith rather than by sight.

The journey of faith often requires us to step into the unknown, trusting that God is faithful even when we can't see the full picture. This kind of faith is built through relationship and experience with God.

**Key Points:**
- Faith grows through testing and experience
- God's faithfulness is the foundation of our faith
- Walking in faith requires daily surrender

Take time today to identify areas where God is calling you to trust Him more deeply.`,
  },
];

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
            week: devotionalData.week,
            day: devotionalData.day,
            weekTitle: devotionalData.weekTitle,
            dayTitle: devotionalData.dayTitle,
            daySubTitle: devotionalData.daySubTitle || null,
            Scriptures: devotionalData.Scriptures,
            content: devotionalData.content,
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
async function batchUpdateFromJSON(devotionalsArray: NewDevotional[]) {
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
            content: devData.content,
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
            content: devData.content,
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
