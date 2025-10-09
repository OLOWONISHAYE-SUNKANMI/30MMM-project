import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

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

  // checks if the user has a token which comes from authentication
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
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

    console.log("Middleware redirecting to:", loginUrl.toString());

    return NextResponse.redirect(loginUrl);
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
