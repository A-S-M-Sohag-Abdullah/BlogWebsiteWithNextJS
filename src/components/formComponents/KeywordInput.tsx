"use client";

import { useState } from "react";

export default function KeywordInput({
  keywords,
  setKeywords,
  className = "",
}: {
  keywords: string[];
  setKeywords: (newKeywords: string[]) => void;
  className?: string;
}) {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      if (!keywords.includes(input.trim())) {
        setKeywords([...keywords, input.trim()]);
        setInput("");
      }
    }
  };

  const removeKeyword = (index: number) => {
    const updated = [...keywords];
    updated.splice(index, 1);
    setKeywords(updated);
  };

  return (
    <div className={`w-full ${className}`}>
      <label className="block mb-1 text-sm font-medium text-gray-700">
        Keywords
      </label>
      <div className="flex flex-wrap gap-2 border p-2 rounded bg-white min-h-[46px]">
        {keywords.map((keyword, index) => (
          <div
            key={index}
            className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
          >
            {keyword}
            <button
              type="button"
              onClick={() => removeKeyword(index)}
              className="text-blue-600 hover:text-red-600"
            >
              &times;
            </button>
          </div>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 min-w-[120px] p-1 outline-none"
          placeholder="Type keyword & press Enter"
        />
      </div>
    </div>
  );
}
