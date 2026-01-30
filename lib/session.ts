import prisma from "@/db";
import { auth } from "@/lib/auth";

/** -----------------------------------------------------------------
 *              getUser()
 *
 * Gets the currently authenticated user from the session
 * @returns The user object or null if not authenticated
 * -----------------------------------------------------------------
 */
export async function getUser() {
  try {
    // Add timeout to prevent hanging requests
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Database timeout')), 5000)
    );

    const getUserPromise = async () => {
      // Get the session from Next-Auth
      const session = await auth();

      if (!session || !session.user) {
        return null;
      }

      // Try to get user by ID first, then by email as fallback
      let user: any = null;
      
      if (session.user.id) {
        user = await prisma.user.findUnique({
          where: { id: session.user.id },
          include: {
            userProfile: true,
            userProgress: true,
          },
        });
      }
      
      // If no user found by ID, try by email
      if (!user && session.user.email) {
        user = await prisma.user.findUnique({
          where: { email: session.user.email },
          include: {
            userProfile: true,
            userProgress: true,
          },
        });
      }

      return user;
    };

    return await Promise.race([getUserPromise(), timeoutPromise]);
  } catch (error) {
    console.error("Error getting user from session:", error);
    return null;
  }
}

/** -----------------------------------------------------------------
 *              isAuthenticated()
 *
 * Checks if the current user is authenticated
 * @returns Boolean indicating if user is authenticated
 *  -----------------------------------------------------------------
 */
export async function isAuthenticated() {
  const user = await getUser();
  return !!user;
}

/** -----------------------------------------------------------------
 *              isAdmin()
 *
 * Checks if the current user is an admin
 * @returns Boolean indicating if user is an admin
 *  -----------------------------------------------------------------
 */
export async function isAdmin() {
  const user = await getUser();
  return user?.role === "admin";
}
