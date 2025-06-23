import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const allowedIPs = process.env.ALLOWED_ADMIN_IPS?.split(",") || [];
const adminPathPrefix = "/admin";
const loginPath = "/secret-admin-login";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "";
  const isAdminRoute = pathname.startsWith(adminPathPrefix);
  const isLoginRoute = pathname === loginPath;
  const key = request.nextUrl.searchParams.get("key");
  console.log(isAdminRoute);
  // Block unauthorized admin route access
  if ((isAdminRoute || isLoginRoute) && process.env.NODE_ENV === "production") {
    const allowed = allowedIPs.some(
      (allowedIP) => ip?.trim() === allowedIP.trim()
    );
    const hasKey = key === process.env.ADMIN_SECRET_KEY;

    if (!allowed || !hasKey) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}
