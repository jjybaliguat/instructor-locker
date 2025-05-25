import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });
  const isAuthenticated = !!token;
  const isBillingExpired = process.env.BILLING_EXPIRED === "true";
  const pathname = req.nextUrl.pathname;

  const protectedPaths = ["/dashboard"];
  const loginPath = "/";

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  // If authenticated but billing is expired, redirect to /expired
  if (isAuthenticated && isBillingExpired) {
    return NextResponse.redirect(new URL("/expired", req.url));
  }

  if (isProtected && !isAuthenticated) {
    return NextResponse.redirect(new URL(loginPath, req.url));
  }

  if (isAuthenticated && pathname === loginPath) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/"],
};
