import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/lib/models/Blog";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ blogId: string }> }
) {
  try {
    await connectDB();

    const { blogId } = await params;
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    if (!blog.comments || blog.comments.length <= 0) {
      blog.comments = [];
    }
    blog.comments.push({ name, email, message });
    await blog.save();

    return NextResponse.json({ success: true, message: "Comment posted." });
  } catch (error) {
    console.error("Error posting comment:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
