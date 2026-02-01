const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const videoIds = [
  '6979828f39c1e07851d9c18b',
  '69789c444f2f09cf5ea9bef6', 
  '69789c054f2f09cf5ea9bef5',
  '69789ad64f2f09cf5ea9beed',
  '6977e634538c64a48ff300fc',
  '6977b278538c64a48ff300f0',
  '6977a92a538c64a48ff300db',
  '6975ecfe60a304930ec20f8a',
  '69756b29ba7af91b17ae788b',
  '6973a89d5a77e84dd45edcbc',
  '697289518dad5a3cba8bffb7',
  '697263a3a075450466c42d1c',
  '697262c5a075450466c42d1b',
  '69726193a075450466c42d19',
  '6971e7fc1886e42e3f505d21',
  '6971bb39bc99937ed0a66d9b',
  '6971ba8fbc99937ed0a66d99',
  '6971b9bfbc99937ed0a66d98',
  '696fb6c8fbdf28f996feef14',
  '692f824d409aac0fbaaa4013',
  '692113b9c5880018643748a9'
];

async function deleteVideos() {
  try {
    const result = await prisma.videoUpload.deleteMany({
      where: {
        id: {
          in: videoIds
        }
      }
    });
    
    console.log(`Deleted ${result.count} videos`);
  } catch (error) {
    console.error('Error deleting videos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

deleteVideos();