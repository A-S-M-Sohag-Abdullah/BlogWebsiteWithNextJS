import { connectDB } from "@/lib/db";
import Blog from "@/lib/models/Blog";
import Category from "@/lib/models/Category";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    console.log("hitwqe");
    await connectDB();

    const { searchParams } = new URL(req.url);
    console.log(searchParams);
    const categoryName = searchParams.get("name");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    if (!categoryName) {
      return NextResponse.json(
        { success: false, message: "Category name is required" },
        { status: 400 }
      );
    }

    // ✅ Find category by name
    const category = await Category.findOne({ name: categoryName });

    

    if (!category) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    const skip = (page - 1) * limit;

    const blogs = await Blog.find({ categories: category.name })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("categories");

    const total = await Blog.countDocuments({ categories: category._id });

    return NextResponse.json({
      success: true,
      blogs,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
