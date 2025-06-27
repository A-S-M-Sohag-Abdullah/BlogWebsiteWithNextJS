"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { Blog } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axiosInstance.get("/api/admin/blogs");
        const allBlogs: Blog[] = res.data.blogs;
        const matched = allBlogs.filter((blog) =>
          blog.title.toLowerCase().includes(query.toLowerCase())
        );
        setBlogs(matched);
      } catch (error) {
        console.error("Search error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Search Results for:{" "}
        <span className="text-blue-600">&quot;{query}&quot;</span>
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <Link
              href={`/blog/${blog._id}`}
              key={blog._id}
              className="flex items-start gap-4 border rounded p-4 hover:shadow"
            >
              <div className="w-36 h-24 relative">
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div>
                <h2 className="text-lg font-medium">{blog.title}</h2>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {blog.content.replace(/<[^>]+>/g, "").slice(0, 100)}...
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
