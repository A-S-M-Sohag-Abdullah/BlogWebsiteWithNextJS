"use client";

import { useState } from "react";
import axios from "@/lib/axiosInstance";

export default function CreateCategoryPage() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert("Category name is required");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/admin/category", {
        name: name.trim(),
      });

      if (res.data.success) {
        setMessage(`Category "${res.data.category.name}" created`);
        setName("");
      } else {
        setMessage(res.data.message || "Failed to create category");
      }
    } catch (error) {
      setMessage("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-semibold mb-4">Create Category</h1>

      <label className="block text-sm font-medium text-gray-700 mb-1">
        Category Name
      </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Technology"
        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        {loading ? "Creating..." : "Create Category"}
      </button>

      {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
    </div>
  );
}
