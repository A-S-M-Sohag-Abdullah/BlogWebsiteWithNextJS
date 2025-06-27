import { Blog } from "@/types";
import axios from "axios";
import { Metadata } from "next";
// Your custom fetcher function

export async function generateMetadata({
  params,
}: {
  params: Promise<{ blogId: string }>;
}): Promise<Metadata> {
  const { blogId } = await params;
  const res = await axios.get<{ success: boolean; blog: Blog }>(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs/${blogId}`
  );
  const blog = res.data.blog;

  if (!blog) {
    return {
      title: "Blog not found",
      description: "This blog post could not be found.",
    };
  }

  return {
    title: blog.title,
    description: blog.metaDescription,
    keywords: blog.keywords,
    openGraph: {
      title: blog.title,
      description: blog.metaDescription,
      images: [blog.coverImage],
    },
  };
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
