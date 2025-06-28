"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
export default function NavSearchBar() {
  const [input, setInput] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    router.push(`/search?q=${encodeURIComponent(input.trim())}`);
    setInput("");
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center text-sm w-44 z-10"
    >
      <input
        type="text"
        placeholder="Search blogs..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border h-10 px-2 focus:outline-none  w-36"
      />
      <button
        type="submit"
        className=" text-yellow-400 px-4 py-2 border border-black bg-white shrink-0 h-10 cursor-pointer"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} className="h-3 w-3 block" />
      </button>
    </form>
  );
}
