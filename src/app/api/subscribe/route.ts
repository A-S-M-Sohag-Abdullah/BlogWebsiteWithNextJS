// app/api/subscribe/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Subscriber from "@/lib/models/Susbcriber";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "Already subscribed" }, { status: 409 });
    }

    await Subscriber.create({ email });

    return NextResponse.json({ success: true, message: "Subscribed successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
