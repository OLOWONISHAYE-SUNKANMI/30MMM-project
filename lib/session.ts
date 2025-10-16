import { prisma } from "@/db";
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
    // Get the session from Next-Auth
    const session = await auth();

    if (!session || !session.user?.id) {
      return null;
    }

    // Use the user ID from the session to fetch the complete user record
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        userProfile: true,
      },
    });

    return user;
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
