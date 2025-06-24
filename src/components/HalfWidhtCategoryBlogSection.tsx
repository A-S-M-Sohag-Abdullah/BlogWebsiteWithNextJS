import Image from "next/image";
import Link from "next/link";
import React from "react";



import axios from "axios";

interface Blog {
  _id: string;
  title: string;
  slug?: string;
  coverImage: string;
  excerpt?: string;
  categories: { name: string }[];
  createdAt: string;
}

interface GetBlogsByCategoryResponse {
  success: boolean;
  blogs: Blog[];
  page: number;
  totalPages: number;
}

export async function getBlogs(
  category: string,
  page = 1,
  limit = 6
): Promise<Blog[]> {
  try {
    const isServer = typeof window === "undefined";

const baseURL = isServer
  ? process.env.NEXT_PUBLIC_SITE_URL || "https://your-vercel-site.vercel.app"
  : "";
    const res = await axios.get<GetBlogsByCategoryResponse>(
      `${baseURL}/api/blogs/by-category`,
      {
        params: { name: category, page, limit },
      }
    );

    if (res.data.success) {
      return res.data.blogs;
    }

    throw new Error("Failed to fetch blogs by category");
  } catch (error) {
    console.error("getBlogs error: HalfWidhtCategoryBlogSection", error);
    return [];
  }
}

async function HalfWidhtCategoryBlogSection({
  category,
}: {
  category: string;
}) {
  const data = await getBlogs(category);
  
  return (
    <section className="mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.length > 0 &&
          data.map((item, i) => (
            <div key={i} className="  rounded overflow-hidden">
              {
                item && (
                  <Link
                    href={`/blog/${item._id}`}
                    className="relative inset-shadow-blue-900"
                  >
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      width={500}
                      height={250}
                      className="w-full h-96 object-cover"
                    />
                    <div className="p-4 absolute bottom-3 left-5 z-10">
                      <h3 className="text-2xl font-semibold text-yellow-200 text-shadow-amber-300">
                        {item.title}
                      </h3>
                    </div>
                  </Link>
                ) /* : (
              <>
                <Skeleton className="w-full h-48" />
                <div className="p-4">
                  <Skeleton className="h-6 w-2/3" />
                </div>
              </>
            ) */
              }
            </div>
          ))}
      </div>
    </section>
  );
}

export default HalfWidhtCategoryBlogSection;
