"use client";

import { useState } from "react";

function BlogCommentBox({ blogId }: { blogId: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(`/api/blogs/${blogId}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    if (res.ok) {
      // Clear form (optional)
      setName("");
      setEmail("");
      setMessage("");

      // Reload the page to show the new comment
      window.location.reload();
    } else {
      const data = await res.json();
      alert(data.error || "Failed to post comment");
    }
  };
  return (
    <section className="max-w-4xl mx-auto mt-12 bg-white p-6 md:p-10 rounded-md">
      <h3 className="text-xl font-bold mb-2">Leave a Comment</h3>
      <p className="text-sm text-gray-600 mb-6">
        Your email address will not be published. Required fields are marked *
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="Type here..."
          className="w-full h-32 p-3 bg-gray-100 rounded-md"
        ></textarea>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name*"
            className="p-3 bg-gray-100 rounded-md"
          />
          <input
            placeholder="Email*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 bg-gray-100 rounded-md"
          />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="saveInfo" className="accent-orange-600" />
          <label htmlFor="saveInfo" className="text-sm text-gray-700">
            Save my name, email, and website in this browser for the next time I
            comment.
          </label>
        </div>
        <button
          type="submit"
          className="bg-orange-400 px-4 py-3 font-semibold hover:bg-orange-500 cursor-pointer text-white"
        >
          Post Comment »
        </button>
      </form>
    </section>
  );
}

export default BlogCommentBox;
