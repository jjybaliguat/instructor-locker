// middleware.ts

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Define your secret key for JWT
const secret = process.env.NEXTAUTH_SECRET;  // Make sure to set this in your .env file

export async function middleware(req: NextRequest) {
  // Get the session token from the request cookies
  const token = await getToken({ req, secret });

  // Define the paths you want to protect or redirect
  const protectedPaths = ["/dashboard"];  // Example protected paths
  const loginPath = "/auth/login";  // Login page

  // Check if the user is authenticated
  const isAuthenticated = !!token;
  const pathname = req.nextUrl.pathname;

  // Redirect logic
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected && !isAuthenticated) {
    // If user is not authenticated and trying to access a protected route, redirect to login
    return NextResponse.redirect(new URL(loginPath, req.url));
  }

  if (isAuthenticated && req.nextUrl.pathname === loginPath) {
    // If user is authenticated and tries to access the login page, redirect to dashboard or home
    return NextResponse.redirect(new URL("/dashboard", req.url));  // Change this to your desired route
  }

  return NextResponse.next();  // Proceed to the requested page if no redirects are necessary
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/auth/login"],  // Apply middleware to specific routes
};
