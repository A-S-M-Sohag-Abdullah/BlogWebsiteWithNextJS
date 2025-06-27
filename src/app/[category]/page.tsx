"use client";

import { Blog } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function StockMarketPage() {
  const { category } = useParams();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 2;

  
  const updatePage = () => {
    setPage(page + 1);
  };
  useEffect(() => {
    // Reset when category changes
    setBlogs([]);
    setPage(1);
    setHasMore(true);
  }, [category]);

  useEffect(() => {
    const fetchMoreBlogs = async () => {
      try {
        const res = await fetch(
          `/api/blogs/by-category?name=${category}&page=${page}&limit=${limit}`
        );

        if (!res.ok) throw new Error("Failed to fetch blogs");

        const data = await res.json();
        const newBlogs = data.blogs;

        if (newBlogs.length < limit) {
          setHasMore(false);
        }

        setBlogs((prev) => [...prev, ...newBlogs]);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setHasMore(false);
      }
    };

    fetchMoreBlogs();
  }, [category, page]);
  return (
    <main className="bg-gray-50 py-10 px-4 md:px-16">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Stock Market</h1>
      <div className="mx-auto grid grid-cols-3  gap-10">
        {/* Main Content */}
        <div className="w-full mx-auto px-4 py-6 col-span-2">
          <InfiniteScroll
            dataLength={blogs.length}
            next={updatePage}
            hasMore={hasMore}
            loader={<p className="text-center py-4">Loading more blogs...</p>}
          >
            <div className="grid grid-cols-1">
              {blogs.map((item, i) => (
                <div key={i} className="rounded overflow-hidden shadow-sm">
                  <Link href={`/blog/${item._id}`}>
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      width={500}
                      height={250}
                      className="w-full h-96 object-cover"
                    />
                    <div className="p-4">
                      {item.categories.map((category, index) => (
                        <h5
                          key={index}
                          className="text-xs bg-gray-600 rounded text-white py-1 px-4 w-fit mb-1"
                        >
                          {typeof category === "string" ? category : category}
                        </h5>
                      ))}
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>

        {/* Sidebar */}
        <aside className="space-y-10">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Recent blogs
            </h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>
                <a href="#" className="hover:underline">
                  15 Shocking Elon Musk Tweets About Stock Market
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Want a Career in Technology? Make This Your Secret Weapon
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  The Health Industry Is Changing Fast
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Everything You Ever Wanted to Know About Technology
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  The Frightening Affect of Climate Change on Government
                </a>
              </li>
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
              {[
                { name: "Automobile", count: 4 },
                { name: "Editors Pick", count: 6 },
                { name: "Guests blogs", count: 2 },
                { name: "Health", count: 6 },
                { name: "Must Read", count: 3 },
                { name: "Politics", count: 5 },
                { name: "Stock Market", count: 8 },
                { name: "Technology", count: 6 },
              ].map((cat) => (
                <li key={cat.name}>
                  <Link
                    href={`/${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="hover:underline"
                  >
                    {cat.name} ({cat.count})
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
