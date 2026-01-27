import { NextRequest, NextResponse } from 'next/server';
import { BlobServiceClient } from '@azure/storage-blob';

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const blobUrl = searchParams.get('url');
    
    console.log('Received blobUrl:', blobUrl);
    
    if (!blobUrl || !connectionString) {
      console.log('Missing parameters - blobUrl:', !!blobUrl, 'connectionString:', !!connectionString);
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const url = new URL(blobUrl);
    const containerName = url.pathname.split('/')[1];
    const blobName = url.pathname.substring(containerName.length + 2);
    
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName);
    
    const downloadResponse = await blobClient.download();
    
    if (!downloadResponse.readableStreamBody) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    return new NextResponse(downloadResponse.readableStreamBody as unknown as ReadableStream, {
      headers: {
        'Content-Type': downloadResponse.contentType || 'video/webm',
        'Content-Length': downloadResponse.contentLength?.toString() || '',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch video' }, { status: 500 });
  }
}