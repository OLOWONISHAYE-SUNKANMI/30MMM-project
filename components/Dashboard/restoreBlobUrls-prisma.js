// restoreBlobUrls-prisma.js
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import {
  generateBlobSASQueryParameters,
  BlobSASPermissions,
  StorageSharedKeyCredential,
  BlobServiceClient
} from "@azure/storage-blob";

const prisma = new PrismaClient();

// ==========================
// 1. ENV VARIABLES
// ==========================
const {
  AZURE_STORAGE_ACCOUNT_NAME,
  AZURE_STORAGE_ACCOUNT_KEY,
  AZURE_STORAGE_CONTAINER_NAME
} = process.env;

if (
  !AZURE_STORAGE_ACCOUNT_NAME ||
  !AZURE_STORAGE_ACCOUNT_KEY ||
  !AZURE_STORAGE_CONTAINER_NAME
) {
  console.error("❌ Missing required environment variables");
  process.exit(1);
}

// ==========================
// 2. AZURE SETUP
// ==========================
const credential = new StorageSharedKeyCredential(
  AZURE_STORAGE_ACCOUNT_NAME,
  AZURE_STORAGE_ACCOUNT_KEY
);

const blobServiceClient = new BlobServiceClient(
  `https://${AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
  credential
);

const containerClient = blobServiceClient.getContainerClient(AZURE_STORAGE_CONTAINER_NAME);

// ==========================
// 3. SAS GENERATOR
// ==========================
function generateSas(container, blobName) {
  const sas = generateBlobSASQueryParameters(
    {
      containerName: container,
      blobName,
      permissions: BlobSASPermissions.parse("r"), // read-only for video playback
      startsOn: new Date(),
      expiresOn: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    },
    credential
  ).toString();

  return `https://${AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${container}/${blobName}?${sas}`;
}

// ==========================
// 4. FIND ACTUAL VIDEO FILE
// ==========================
async function findActualVideoFile(item) {
  const basePath = `${item.cohort}/${item.firstName}_${item.lastName}/wk-${item.week}/day-${item.day}/`;
  
  try {
    console.log(`   🔍 Searching in: ${basePath}`);
    
    // List all blobs in the directory
    const blobs = containerClient.listBlobsFlat({ prefix: basePath });
    const foundBlobs = [];
    
    for await (const blob of blobs) {
      foundBlobs.push(blob.name);
      const fileName = blob.name.split('/').pop();
      // Check if it's a video file
      if (fileName.match(/\.(mp4|mov|avi|webm|mkv|wmv)$/i)) {
        console.log(`   📹 Found video: ${blob.name}`);
        
        // Verify the blob actually exists
        const blobClient = containerClient.getBlobClient(blob.name);
        const exists = await blobClient.exists();
        
        if (exists) {
          console.log(`   ✅ Verified: ${blob.name} exists`);
          return blob.name;
        } else {
          console.log(`   ❌ Missing: ${blob.name} does not exist`);
        }
      }
    }
    
    console.log(`   📁 Found ${foundBlobs.length} files in directory:`);
    foundBlobs.forEach(blob => console.log(`      - ${blob}`));
    
    // If no video found, return null to skip this record
    console.log(`   ⚠️  No valid video found in ${basePath}`);
    return null;
  } catch (error) {
    console.error(`   ❌ Error searching for video in ${basePath}:`, error.message);
    return null;
  }
}

// ==========================
// 5. MAIN RECOVERY LOGIC
// ==========================
async function restoreBlobUrls() {
  console.log("🔌 Connecting to database...");

  try {
    // First, get ALL records to see what we're working with
    console.log("📋 Checking all video records...");
    const allVideos = await prisma.videoUpload.findMany();
    console.log(`📊 Total videos in database: ${allVideos.length}`);
    
    // Show first few records for debugging
    if (allVideos.length > 0) {
      console.log("\n🔍 Sample records:");
      allVideos.slice(0, 3).forEach((video, i) => {
        console.log(`${i + 1}. ID: ${video.id}, blobUrl: ${video.blobUrl ? video.blobUrl.substring(0, 50) + '...' : 'NULL/EMPTY'}`);
      });
    }

    // Find records that need fixing (simplified query)
    const brokenRecords = allVideos.filter(video => 
      !video.blobUrl || 
      video.blobUrl === "" || 
      video.blobUrl.includes("sp=w")
    );

    console.log(`\n🛠 Found ${brokenRecords.length} records to fix`);

    let fixed = 0;
    let errors = 0;

    for (const item of brokenRecords) {
      try {
        console.log(`\n🔍 Processing: ${item.firstName} ${item.lastName} - Week ${item.week} Day ${item.day}`);
        
        // Find the actual video file in Azure
        const actualBlobName = await findActualVideoFile(item);
        
        if (!actualBlobName) {
          console.log(`   ⏭️  Skipping - no valid video file found`);
          errors++;
          continue;
        }
        
        // Generate new SAS URL with read permissions
        const blobUrl = generateSas(AZURE_STORAGE_CONTAINER_NAME, actualBlobName);
        
        // Update the record
        await prisma.videoUpload.update({
          where: { id: item.id },
          data: { blobUrl }
        });

        fixed++;
        console.log(`   ✅ Fixed (${fixed}): ${item.id}`);
        console.log(`   🔗 New URL: ${blobUrl.substring(0, 80)}...`);
      } catch (err) {
        errors++;
        console.error(`   ❌ Failed (${errors}): ${item.id} - ${err.message}`);
      }
    }

    console.log(`\n🎉 Done!`);
    console.log(`✅ Fixed: ${fixed} records`);
    console.log(`❌ Errors: ${errors} records`);
    
  } catch (error) {
    console.error("❌ Database error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// ==========================
// 6. RUN SCRIPT
// ==========================
restoreBlobUrls();