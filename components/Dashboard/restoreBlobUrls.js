// restoreBlobUrls.js
import "dotenv/config";
import mongoose from "mongoose";
import {
  generateBlobSASQueryParameters,
  BlobSASPermissions,
  StorageSharedKeyCredential,
  BlobServiceClient
} from "@azure/storage-blob";

// ==========================
// 1. ENV VARIABLES
// ==========================
const {
  DATABASE_URL,
  AZURE_STORAGE_ACCOUNT_NAME,
  AZURE_STORAGE_ACCOUNT_KEY,
  AZURE_STORAGE_CONTAINER_NAME
} = process.env;

if (
  !DATABASE_URL ||
  !AZURE_STORAGE_ACCOUNT_NAME ||
  !AZURE_STORAGE_ACCOUNT_KEY ||
  !AZURE_STORAGE_CONTAINER_NAME
) {
  console.error("❌ Missing required environment variables");
  process.exit(1);
}

// ==========================
// 2. MONGOOSE MODEL
// ==========================
const submissionSchema = new mongoose.Schema(
  {
    cohort: Number,
    firstName: String,
    lastName: String,
    week: Number,
    day: Number,
    fileName: String,
    blobUrl: String,
    fileType: String
  },
  { timestamps: true }
);

const Submission =
  mongoose.models.Submission ||
  mongoose.model("Submission", submissionSchema);

// ==========================
// 3. AZURE SETUP
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
// 4. SAS GENERATOR
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
// 5. FIND ACTUAL VIDEO FILE
// ==========================
async function findActualVideoFile(item) {
  const basePath = `${item.cohort}/${item.firstName}_${item.lastName}/wk-${item.week}/day-${item.day}/`;
  
  try {
    // List all blobs in the directory
    const blobs = containerClient.listBlobsFlat({ prefix: basePath });
    
    for await (const blob of blobs) {
      const fileName = blob.name.split('/').pop();
      // Check if it's a video file
      if (fileName.match(/\.(mp4|mov|avi|webm|mkv|wmv)$/i)) {
        console.log(`📹 Found video: ${blob.name}`);
        return blob.name;
      }
    }
    
    // Fallback to original filename if no video found
    console.log(`⚠️  No video found in ${basePath}, using original filename`);
    return `${basePath}${item.fileName}`;
  } catch (error) {
    console.error(`❌ Error searching for video in ${basePath}:`, error.message);
    return `${basePath}${item.fileName}`;
  }
}

// ==========================
// 6. MAIN RECOVERY LOGIC
// ==========================
async function restoreBlobUrls() {
  console.log("🔌 Connecting to MongoDB...");
  await mongoose.connect(DATABASE_URL);

  // Find ALL records that need fixing (empty URLs or wrong permissions)
  const allRecords = await Submission.find({
    $or: [
      { blobUrl: "" },
      { blobUrl: { $exists: false } },
      { blobUrl: { $regex: "sp=w" } } // Fix write-only permissions
    ]
  });

  console.log(`🛠 Found ${allRecords.length} records to fix`);

  let fixed = 0;
  let errors = 0;

  for (const item of allRecords) {
    try {
      console.log(`\n🔍 Processing: ${item.firstName} ${item.lastName} - Week ${item.week} Day ${item.day}`);
      
      // Find the actual video file in Azure
      const actualBlobName = await findActualVideoFile(item);
      
      // Generate new SAS URL with read permissions
      const blobUrl = generateSas(AZURE_STORAGE_CONTAINER_NAME, actualBlobName);
      
      // Update the record
      await Submission.findByIdAndUpdate(item._id, { blobUrl });

      fixed++;
      console.log(`✅ Fixed (${fixed}): ${item._id}`);
      console.log(`   New URL: ${blobUrl.substring(0, 100)}...`);
    } catch (err) {
      errors++;
      console.error(`❌ Failed (${errors}): ${item._id} - ${err.message}`);
    }
  }

  console.log(`\n🎉 Done!`);
  console.log(`✅ Fixed: ${fixed} records`);
  console.log(`❌ Errors: ${errors} records`);
  
  await mongoose.disconnect();
  process.exit(0);
}

// ==========================
// 7. RUN SCRIPT
// ==========================
restoreBlobUrls();
