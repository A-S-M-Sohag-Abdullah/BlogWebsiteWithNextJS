import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const cookieStore = await cookies();
    cookieStore.set("admin-auth", "true", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 6,
      secure: process.env.NODE_ENV === "production",
    });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { success: false, message: "Invalid credentials" },
    { status: 401 }
  );
}
