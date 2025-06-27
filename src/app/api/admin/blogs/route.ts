import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/lib/models/Blog";

export async function GET() {
  try {
    await connectDB();

    const blogs = await Blog.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.error("[GET_ALL_BLOGS_ERROR]", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
