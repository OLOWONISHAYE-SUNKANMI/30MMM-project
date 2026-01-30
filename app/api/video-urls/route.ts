import { NextResponse } from 'next/server';
import { BlobServiceClient, generateBlobSASQueryParameters, BlobSASPermissions } from '@azure/storage-blob';

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

export async function GET() {
  try {
    if (!connectionString) {
      return NextResponse.json({ error: 'Missing connection string' }, { status: 500 });
    }

    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient('cohort1');
    
    const videos: any[] = [];
    
    for await (const blob of containerClient.listBlobsFlat()) {
      if (blob.name.includes('.webm') || blob.name.includes('.mp4')) {
        const blobClient = containerClient.getBlobClient(blob.name);
        
        const sasUrl = blobClient.generateSasUrl({
          permissions: BlobSASPermissions.parse('r'),
          expiresOn: new Date(new Date().valueOf() + 86400 * 1000), // 24 hours
        });
        
        videos.push({
          fileName: blob.name,
          readUrl: sasUrl,
          size: blob.properties.contentLength,
          lastModified: blob.properties.lastModified,
        });
      }
    }

    return NextResponse.json(videos);
  } catch (error) {
    console.error('Error generating video URLs:', error);
    return NextResponse.json({ error: 'Failed to generate video URLs' }, { status: 500 });
  }
}