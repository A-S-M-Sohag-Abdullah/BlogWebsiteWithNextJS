import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
    console.error("getBlogs error SideBySIdeCategorySection:", error);
    return [];
  }
}

async function SideBySIdeCategorySection({ category }: { category: string }) {
  const blogs = await getBlogs(category);

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{category}</h2>
        <Link
          href="#"
          className="text-sm font-medium text-gray-600 hover:underline"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {blogs.slice(0, 1).map((blog) => (
          <Link href={`/blog/${blog._id}`} key={blog._id}>
            <Image
              src={blog.coverImage}
              alt={blog.title}
              width={600} // pick a reasonable width for your layout
              height={128} // h-32 from Tailwind = 32 * 4 = 128px
              className="w-full h-96  object-cover rounded-md mb-2"
              // override height via style since Next Image sets height automatically
            />

            {blog.categories.map((category, index) => (
              <p key={index} className="text-sm text-gray-500">
                {category}
              </p>
            ))}
            <h3 className="text-lg font-semibold">{blog.title}</h3>
            <p className="text-sm text-gray-600">{blog.excerpt}</p>
          </Link>
        ))}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {blogs.slice(1, 3).map((blog) => (
            <Link href={`/blog/${blog._id}`} key={blog._id}>
              <Image
                src={blog.coverImage}
                alt={blog.title}
                width={600} // pick a reasonable width for your layout
                height={128} // h-32 from Tailwind = 32 * 4 = 128px
                className="w-full h-48 object-cover rounded-md mb-2"
                // override height via style since Next Image sets height automatically
              />
              {blog.categories.map((category, index) => (
                <p key={index} className="text-sm text-gray-500">
                  {category}
                </p>
              ))}
              <h4 className="text-md font-medium">{blog.title}</h4>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SideBySIdeCategorySection;
