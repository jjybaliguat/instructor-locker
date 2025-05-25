// middleware.ts

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Define your secret key for JWT
const secret = process.env.NEXTAUTH_SECRET;  // Make sure to set this in your .env file

export async function middleware(req: NextRequest) {
  // Get the session token from the request cookies
  const token = await getToken({ req, secret });
  const isBillingExpired = process.env.BILLING_EXPIRED

  // Define the paths you want to protect or redirect
  const protectedPaths = ["/dashboard"];  // Example protected paths
  const loginPath = "/";  // Login page

  // Check if the user is authenticated
  const isAuthenticated = !!token;
  const pathname = req.nextUrl.pathname;

  // Redirect logic
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if(isBillingExpired){
    return NextResponse.redirect(new URL("/expired", req.url));
  }else{
    if (isProtected && !isAuthenticated) {
    // If user is not authenticated and trying to access a protected route, redirect to login
    return NextResponse.redirect(new URL(loginPath, req.url));
  }

  if(isAuthenticated){
    if(req.nextUrl.pathname === loginPath){
        return NextResponse.redirect(new URL("/dashboard", req.url)); 
      }
    }
  }

  return NextResponse.next();  // Proceed to the requested page if no redirects are necessary
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/"],  // Apply middleware to specific routes
};
