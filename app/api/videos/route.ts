import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { BlobServiceClient, BlobSASPermissions } from '@azure/storage-blob';

const prisma = new PrismaClient();
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

export async function GET() {
  try {
    const videos = await prisma.videoUpload.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (!connectionString) {
      return NextResponse.json(videos);
    }

    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    
    const videosWithReadUrls = videos.map((video) => {
      if (!video.blobUrl) return video;
      
      try {
        const url = new URL(video.blobUrl);
        const pathParts = url.pathname.split('/').filter(Boolean);
        const containerName = pathParts[0];
        const blobName = pathParts.slice(1).join('/');
        
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blobClient = containerClient.getBlobClient(blobName);
        
        const readUrl = blobClient.generateSasUrl({
          permissions: BlobSASPermissions.parse('r'),
          expiresOn: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });
        
        return { ...video, blobUrl: readUrl };
      } catch (error) {
        console.error('Error generating read URL:', error);
        return video;
      }
    });

    return NextResponse.json(videosWithReadUrls);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}