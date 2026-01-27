import { BlobServiceClient, StorageSharedKeyCredential, generateBlobSASQueryParameters, BlobSASPermissions } from "@azure/storage-blob";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const blobPath = searchParams.get("blobPath");
    
    console.log('Received blobPath:', blobPath);
    
    if (!blobPath) {
      return NextResponse.json({ error: "blobPath parameter is required" }, { status: 400 });
    }

    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
    
    if (!accountName || !accountKey) {
      console.log('Missing Azure credentials');
      return NextResponse.json({ error: "Azure credentials not configured" }, { status: 500 });
    }

    console.log('Generating SAS token...');
    const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
    
    const sasToken = generateBlobSASQueryParameters({
      containerName: "cohort1",
      blobName: blobPath,
      permissions: BlobSASPermissions.parse("r"),
      startsOn: new Date(),
      expiresOn: new Date(Date.now() + 24 * 60 * 60 * 1000),
    }, sharedKeyCredential).toString();

    const url = `https://${accountName}.blob.core.windows.net/cohort1/${blobPath}?${sasToken}`;
    
    console.log('Generated URL:', url);
    return NextResponse.json({ url });

  } catch (error: any) {
    console.error('SAS generation error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}