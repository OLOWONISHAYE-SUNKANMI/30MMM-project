import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  // obtaining the path the user wants to visit
  const path = request.nextUrl.pathname;

  // Skip middleware for auth routes and public pages
  if (
    path.startsWith("/api/auth") ||
    path.startsWith("/login") ||
    path.startsWith("/signup") ||
    path.startsWith("/_next") ||
    path.startsWith("/static") ||
    path === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // checking to see if it matches a regex of a protected route
  const isProtectedPath =
    path.startsWith("/dashboard") ||
    path.startsWith("/devotional") ||
    path.startsWith("/admin");

  // Only run protection logic for protected paths
  if (!isProtectedPath) {
    return NextResponse.next();
  }

  try {
    // Check for Auth.js v5 session cookie (authjs.session-token)
    // Also check legacy NextAuth v4 names for compatibility
    const sessionToken =
      request.cookies.get("authjs.session-token") ||
      request.cookies.get("__Secure-authjs.session-token") ||
      request.cookies.get("next-auth.session-token") ||
      request.cookies.get("__Secure-next-auth.session-token");

    // If there's a session cookie, allow access
    if (sessionToken) {
      return NextResponse.next();
    }

    // If no session cookie, check JWT token as fallback with correct cookie name
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
      // Specify the correct cookie name for Auth.js v5
      cookieName:
        process.env.NODE_ENV === "production"
          ? "__Secure-authjs.session-token"
          : "authjs.session-token",
    });

    // if the user is trying to visit a protected route and doesn't have a token, redirect them to the login page
    if (!token) {
      const callbackUrl = request.nextUrl.pathname + request.nextUrl.search;
      const loginUrl = new URL("/login", request.url);

      // return callback url
      loginUrl.searchParams.set("callbackUrl", callbackUrl);

      // return a message to indicate the user needs to log in
      loginUrl.searchParams.set(
        "message",
        "You must be logged in to access that page",
      );

      return NextResponse.redirect(loginUrl);
    }
  } catch (error) {
    // Log error in development only
    if (process.env.NODE_ENV === "development") {
      console.error("Middleware authentication error:", error.message);
    }

    // If there's an error getting the token, allow the request to proceed
    // The page itself will handle authentication
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Only match the specific protected routes to avoid conflicts
    "/dashboard/:path*",
    "/devotional/:path*",
    "/admin/:path*",
  ],
};
