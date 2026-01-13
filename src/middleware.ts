import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check if user is trying to access /admin (not /admin/login)
  if (request.nextUrl.pathname === "/admin") {
    const adminAuth = request.cookies.get("admin_auth");

    // If not authenticated, redirect to login
    if (!adminAuth || adminAuth.value !== "true") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin"],
};
