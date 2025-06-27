import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/lib/models/Blog";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";

    const blogs = await Blog.find({
      title: { $regex: query, $options: "i" },
    });

    return NextResponse.json({ success: true, blogs });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
