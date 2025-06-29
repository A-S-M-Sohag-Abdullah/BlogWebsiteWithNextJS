"use client";

import { Blog } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useCallback } from "react";
import { notFound } from "next/navigation";

function toTitleCase(str: string) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
type Categories = {
  _id: string;
  name: string;
  blogCount: string;
};

export default function StockMarketPage() {
  const { category } = useParams();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState<string>();
  const [categories, setCategories] = useState<Categories[]>();

  const limit = 2;

  useEffect(() => {
    // Reset when category changes
    setBlogs([]);
    setPage(1);
    setHasMore(true);
  }, [category]);

  const fetchMoreBlogs = useCallback(async () => {
    try {
      let name = decodeURIComponent(category as string);
      if (category !== "all") name = toTitleCase(name);

      const res = await fetch(
        `/api/blogs/by-category?name=${name}&page=${page}&limit=${limit}`
      );

      if (!res.ok) {
        setError("An Error Occured");
        setHasMore(false);
      }

      const data = await res.json();
      const newBlogs = data.blogs;

      if (newBlogs && newBlogs.length < limit) {
        setHasMore(false);
      }
      setBlogs((prev) => [...prev, ...newBlogs]);
      setPage(page + 1);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setHasMore(false);
    }
  }, [category, page, limit]);

  const fetchInitialBlogs = useCallback(async () => {
    try {
      let name = decodeURIComponent(category as string);
      if (category !== "all") name = toTitleCase(name);

      const res = await fetch(
        `/api/blogs/by-category?name=${name}&page=1&limit=${limit}`
      );

      if (!res.ok) {
        setError("An Error Occurred");
        setHasMore(false);
        notFound();
      }

      const data = await res.json();
      const newBlogs = data.blogs;

      setBlogs(newBlogs);
      setPage(2); // Start the next page from 2
      setHasMore(newBlogs.length === limit); // True only if we likely have more
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setHasMore(false);
    }
  }, [category, limit]);

  useEffect(() => {
    fetchInitialBlogs();
  }, [fetchInitialBlogs]);

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      const res = await fetch(`/api/blogs?page=1&limit=5`);
      if (!res.ok) {
        setError("An Error Occured");
      }
      const data = await res.json();
      setRecentBlogs(data.blogs);
    };

    const fetchCategories = async () => {
      const res = await fetch(`/api/categoriesblogcount`);
      if (!res.ok) {
        setError("An Error Occured");
      }

      const data = await res.json();
      setCategories(data.categories);
    };
    fetchCategories();
    fetchRecentBlogs();
  }, []);

  return (
    <main className="py-10 px-4 md:px-16">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">
        {decodeURIComponent(category as string)}
      </h1>
      <div className="mx-auto flex  gap-10 relative overflow-y-auto">
        {/* Main Content */}
        <div className="w-full mx-auto px-4 py-6">
          {error}
          <InfiniteScroll
            dataLength={blogs.length}
            next={fetchMoreBlogs}
            hasMore={hasMore}
            loader={<p className="text-center py-4">Loading more blogs...</p>}
          >
            <div className="grid grid-cols-1">
              {blogs.map((item, i) => (
                <div key={i} className="rounded  shadow-sm">
                  <Link href={`/blog/${item._id}`}>
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      width={500}
                      height={250}
                      className="w-full h-96 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex space-x-2 flex-wrap">
                        {item.categories.map((category, index) => (
                          <h5
                            key={index}
                            className="text-xs bg-gray-600 rounded text-white py-1 px-4 w-fit mb-1"
                          >
                            {typeof category === "string" ? category : category}
                          </h5>
                        ))}
                      </div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>

        {/* Sidebar */}
        <aside className="space-y-10 sticky top-0">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Recent blogs
            </h3>
            <ul className="space-y-2 text-sm text-blue-700">
              {recentBlogs.map((blog) => {
                return (
                  <li key={blog._id}>
                    <Link
                      href={`/blog/${blog._id}`}
                      className="hover:underline"
                    >
                      {blog.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <Image
              src="https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg"
              alt="Sidebar Ad"
              width={500}
              height={700}
              className="w-full "
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Categories
            </h3>

            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <Link href={`/All`} className="hover:underline">
                  All (
                  {categories
                    ? categories.reduce(
                        (acc, cat) => acc + Number(cat.blogCount),
                        0
                      )
                    : 0}
                  )
                </Link>
              </li>
              {categories?.map((cat) => (
                <li key={cat.name}>
                  <Link href={`/${cat.name}`} className="hover:underline">
                    {cat.name} ({cat.blogCount})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
