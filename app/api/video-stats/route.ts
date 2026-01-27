import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get('videoId');
    const userId = searchParams.get('userId');
    
    if (!videoId) {
      return NextResponse.json({ error: 'Video ID required' }, { status: 400 });
    }

    const [likes, comments] = await Promise.all([
      prisma.videoLike.count({ where: { videoId } }),
      prisma.videoComment.count({ where: { videoId } })
    ]);

    let userLiked = false;
    if (userId) {
      const userLike = await prisma.videoLike.findUnique({
        where: { userId_videoId: { userId, videoId } }
      });
      userLiked = !!userLike;
    }

    return NextResponse.json({ likes, comments, userLiked });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json({ likes: 0, comments: 0, userLiked: false });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { videoId, userId = 'anonymous', action } = await request.json();
    
    if (action === 'like') {
      const existing = await prisma.videoLike.findUnique({
        where: { userId_videoId: { userId, videoId } }
      });

      if (existing) {
        await prisma.videoLike.delete({
          where: { userId_videoId: { userId, videoId } }
        });
        return NextResponse.json({ liked: false });
      } else {
        await prisma.videoLike.create({
          data: { userId, videoId }
        });
        return NextResponse.json({ liked: true });
      }
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Like error:', error);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}