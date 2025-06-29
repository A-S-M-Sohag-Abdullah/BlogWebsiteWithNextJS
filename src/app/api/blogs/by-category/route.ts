import { connectDB } from "@/lib/db";
import Blog from "@/lib/models/Blog";
import Category from "@/lib/models/Category";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);

    const categoryName = searchParams.get("name");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const skip = (page - 1) * limit;

    let query = {};
    let total = 0;

    // If category is provided and not "all"
    if (categoryName && categoryName.toLowerCase() !== "all") {
      const category = await Category.findOne({ name: categoryName });

      if (!category) {
        console.log("Category not found:", categoryName);
        return NextResponse.json(
          { success: false, message: "Category not found" },
          { status: 404 }
        );
      }

      query = { categories: category.name };
    }

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("categories");

    total = await Blog.countDocuments(query);

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
