import React from "react";

import Link from "next/link";
import Image from "next/image";

import axios from "axios";

interface Blog {
  _id: string;
  title: string;
  slug?: string;
  coverImage: string;
  excerpt?: string;
  categories: string[];
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
      ? process.env.NEXT_PUBLIC_SITE_URL ||
        "https://your-vercel-site.vercel.app"
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
    console.error("getBlogs error HomeCategoryBlogSection:", error);
    return [];
  }
}

async function HomeCategoryBlogSection({ category }: { category: string }) {
  const data = await getBlogs(category);
  return (
    <section className="mb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((item, i) => (
          <div key={i} className="  rounded overflow-hidden">
            {item && (
              <Link href={`/blog/${item._id}`}>
                <Image
                  src={item.coverImage}
                  alt={item.title}
                  width={500}
                  height={250}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex space-x-2 flex-wrap">
                    {item.categories.map((category, index) => (
                      <h5
                        key={index}
                        className="text-xs bg-gray-600 rounded text-white py-1 px-4 w-fit mb-1"
                      >
                        {category}
                      </h5>
                    ))}
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default HomeCategoryBlogSection;
