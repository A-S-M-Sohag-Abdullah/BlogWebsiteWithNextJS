import { connectDB } from "@/lib/db";
import Category from "@/lib/models/Category";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Allow server functions

export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find().sort({ name: 1 }); // sorted alphabetically

    return NextResponse.json({ success: true, categories });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error,
      },
      { status: 500 }
    );
  }
}
