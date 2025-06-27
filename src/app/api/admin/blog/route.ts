import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/lib/models/Blog";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      title,
      content,
      coverImage,
      categories,
      metaDescription,
      keywords,
    } = body;

    if (!title || !content || !coverImage) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const blog = await Blog.create({
      title,
      content,
      coverImage,
      categories,
      metaDescription,
      keywords,
    });

    return NextResponse.json(
      { success: true, message: "Blog created", blog },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
