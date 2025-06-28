// components/NewsletterForm.tsx
"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/subscribe", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("🎉 Subscribed successfully!");
      setEmail("");
    } else {
      setMessage(`❗ ${data.error}`);
    }
  };

  return (
    <form
      onSubmit={subscribe}
      className="   rounded shadow max-w-md mx-auto"
    >
      <h3 className="text-lg font-bold mb-2">Subscribe to our Newsletter</h3>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Enter your email"
        className="w-full p-2 border rounded mb-3 outline-0"
      />
      <button
        type="submit"
        className="w-full bg-gray-900 text-white py-2 rounded hover:bg-black"
      >
        Subscribe
      </button>
      {message && <p className="text-sm text-center mt-2">{message}</p>}
    </form>
  );
}
