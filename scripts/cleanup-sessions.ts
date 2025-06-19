/**
 * This script is used to clean up old/expired sessions in the database.
 */


import { PrismaClient } from '../generated/client'

const prisma = new PrismaClient()

async function cleanupSessions() {
  try {
    // Delete expired sessions
    const expiredResult = await prisma.session.deleteMany({
      where: {
        expiresAt: {
          lt: new Date()
        }
      }
    })
    
    console.log(`Deleted ${expiredResult.count} expired sessions`)

    // Check for and report any orphaned sessions
    const allUserIds = await prisma.user.findMany({ select: { id: true } })
    const userIdSet = new Set(allUserIds.map(u => u.id))
    
    const allSessions = await prisma.session.findMany({ select: { id: true, userId: true } })
    const orphanedSessions = allSessions.filter(session => !userIdSet.has(session.userId))
    
    if (orphanedSessions.length > 0) {
      console.warn(`Found ${orphanedSessions.length} orphaned sessions that should be investigated`)
      
      // Delete orphaned sessions automatically
      const orphanedIds = orphanedSessions.map(s => s.id)
      const cleanupResult = await prisma.session.deleteMany({
        where: { id: { in: orphanedIds } }
      })
      console.log(`Cleaned up ${cleanupResult.count} orphaned sessions`)
    }
    
  } catch (error) {
    console.error('Error during session cleanup:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run cleanup
cleanupSessions()