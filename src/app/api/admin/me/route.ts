// app/api/admin/me/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("admin-auth");

  if (cookie?.value === "true") {
    return NextResponse.json({ isAuthenticated: true });
  }

  return NextResponse.json({ isAuthenticated: false }, { status: 401 });
}
