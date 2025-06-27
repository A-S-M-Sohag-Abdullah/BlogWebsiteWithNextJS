import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/lib/models/Blog";

// Dynamic segment handler: /api/admin/blog/[blogId]
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ blogId: string }> }
) {
  try {
    await connectDB();

    const { blogId } = await params;
    const body = await req.json();
    const {
      title,
      content,
      coverImage,
      categories,
      metaDescription,
      keywords,
    } = body;

    if (
      !title ||
      !content ||
      !coverImage ||
      !categories ||
      !Array.isArray(categories)
    ) {
      return NextResponse.json(
        { success: false, error: "Missing or invalid fields" },
        { status: 400 }
      );
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { title, content, coverImage, categories, metaDescription, keywords },
      { new: true }
    );

    if (!updatedBlog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error("[UPDATE_BLOG_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ blogId: string }> }
) {
  try {
    await connectDB();

    const { blogId } = await params;

    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("[DELETE_BLOG_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
