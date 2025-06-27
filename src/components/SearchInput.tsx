"use client";

import { useState, useEffect } from "react";

type SearchInputProps = {
  placeholder?: string;
  onSearch: (value: string) => void;
  className?: string;
  delay?: number; // debounce delay (ms)
};

export default function SearchInput({
  placeholder = "Search...",
  onSearch,
  className = "",
  delay = 300,
}: SearchInputProps) {
  const [input, setInput] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(input.trim());
    }, delay);

    return () => clearTimeout(timeout);
  }, [input, delay, onSearch]);

  return (
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder={placeholder}
      className={`border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-300 ${className}`}
    />
  );
}
