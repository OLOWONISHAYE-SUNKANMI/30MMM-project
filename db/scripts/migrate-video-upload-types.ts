import prisma from "@/db";

async function migrateVideoUploads() {
  try {
    console.log("Starting migration with aggregation pipeline...");

    // Use MongoDB's aggregation pipeline for type conversion
    const result = await prisma.$runCommandRaw({
      update: "video-uploads",
      updates: [
        {
          q: {
            $or: [
              { cohort: { $type: "string" } },
              { week: { $type: "string" } },
              { day: { $type: "string" } },
            ],
          },
          u: [
            {
              $set: {
                cohort: {
                  $convert: {
                    input: "$cohort",
                    to: "int",
                    onError: 0,
                    onNull: 0,
                  },
                },
                week: {
                  $convert: {
                    input: "$week",
                    to: "int",
                    onError: 0,
                    onNull: 0,
                  },
                },
                day: {
                  $convert: {
                    input: "$day",
                    to: "int",
                    onError: 0,
                    onNull: 0,
                  },
                },
              },
            },
          ],
          multi: true,
        },
      ],
    });

    console.log(
      `✅ Migration completed! Modified ${result.nModified} documents`,
    );
  } catch (error) {
    console.error("❌ Migration failed:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

migrateVideoUploads();
