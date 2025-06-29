import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/lib/models/Blog";
import Category from "@/lib/models/Category";

export async function GET() {
  try {
    await connectDB();

    // Get all categories
    const categories = await Category.find().sort({ name: 1 });

    // Count blogs for each category
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const count = await Blog.countDocuments({ categories: category.name });
        return {
          _id: category._id,
          name: category.name,
          blogCount: count,
        };
      })
    );

    return NextResponse.json({ success: true, categories: categoriesWithCount });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      { status: 500 }
    );
  }
}
