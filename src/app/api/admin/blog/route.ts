import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/lib/models/Blog";
import Subscriber from "@/lib/models/Susbcriber";
import nodemailer from "nodemailer";

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

    // Create blog post
    const blog = await Blog.create({
      title,
      content,
      coverImage,
      categories,
      metaDescription,
      keywords,
    });

    // Fetch all subscribers
    const subscribers = await Subscriber.find({}, "email");

    // Send emails
    if (subscribers.length > 0) {
      const transporter = nodemailer.createTransport({
        service: "gmail", // or use "smtp" with custom credentials
        auth: {
          user: process.env.NOTIFY_EMAIL,
          pass: process.env.NOTIFY_EMAIL_PASS,
        },
      });

      const emailList = subscribers
        .map((s: { email: string }) => s.email)
        .join(",");

      transporter
        .sendMail({
          from: `"Blog Updates" <${process.env.NOTIFY_EMAIL}>`,
          to: emailList,
          subject: `🆕 New Blog Published: ${title}`,
          html: `
    <h2>${title}</h2>
    <p>${metaDescription || "New blog post is live now!"}</p>
    <a href="${process.env.NEXT_PUBLIC_SITE_URL}/blog/${
            blog._id
          }" target="_blank">
      Read Now
    </a>
  `,
        })
        .then((info) => {
          console.log("Emails sent:", info.accepted);
        })
        .catch((err) => {
          console.error("Email sending failed:", err);
        });
    }

    return NextResponse.json(
      { success: true, message: "Blog created & emails sent", blog },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create blog error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
