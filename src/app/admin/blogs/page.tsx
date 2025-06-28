"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { Blog } from "@/types";
import SearchInput from "@/components/SmallForms/SearchInput";

export default function AdminBlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filtered, setFiltered] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchBlogs = async () => {
    try {
      const res = await axiosInstance.get("/api/admin/blogs");
      setBlogs(res.data.blogs);
      setFiltered(res.data.blogs);
    } catch (err) {
      console.log("Failed to fetch blogs",err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await axiosInstance.delete(`/api/admin/updateBlog/${id}`);
      if (res.data.success) {
        alert("Deleted successfully");
        setBlogs((prev) => prev.filter((b) => b._id !== id));
        setFiltered((prev) => prev.filter((b) => b._id !== id));
      } else {
        alert("Failed to delete");
      }
    } catch {
      alert("Something went wrong");
    }
  };

  const handleSearch = (value: string) => {
    if (!value) {
      setFiltered(blogs);
      return;
    }

    const result = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(result);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading blogs...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">All Blogs</h1>

      <SearchInput
        placeholder="Search by blog title"
        onSearch={handleSearch}
        className="mb-6"
      />

      {filtered.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <div className="space-y-6">
          {filtered.map((blog) => (
            <div
              key={blog._id}
              className="border p-4 rounded-lg shadow-sm flex gap-4"
            >
              <div className="w-40 h-28 relative">
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  fill
                  className="object-cover rounded"
                />
              </div>

              <div className="flex-1">
                <h2 className="text-xl font-semibold">{blog.title}</h2>
                <div className="flex flex-wrap gap-2 my-2">
                  {blog.categories.map((cat, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded"
                    >
                      {typeof cat === "string" ? cat : cat}
                    </span>
                  ))}
                </div>
                <div className="mt-2 flex gap-3">
                  <button
                    onClick={() =>
                      router.push(`/admin/updateblog/${blog._id}`)
                    }
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
