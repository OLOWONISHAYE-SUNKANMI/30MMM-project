import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request) {
  // obtaining the path the user wants to visit
  const path = request.nextUrl.pathname;

  // checking to see if it matches a regex of a protected route
  const isProtectedPath =
    path.startsWith("/dashboard") ||
    path.startsWith("/devotional") ||
    path.startsWith("/admin");

  // checks if the user has a token which comes from authentication
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // if the user is trying to visit a protected route and doesn't have a token, redirect them to the login page
  if (isProtectedPath && !token) {
    const callbackUrl = encodeURIComponent(request.nextUrl.pathname);
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${callbackUrl}`, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/devotional/:path*", "/admin/:path*"],
};
