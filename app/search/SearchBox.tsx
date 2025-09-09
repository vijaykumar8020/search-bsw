"use client";

import { useState } from "react";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(value: string) {
    setQuery(value);

    if (value.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `/api/search?key=${value}&tab=l&distl=50`
      );
      const data = await res.json();
      setResults(data || []);
    } catch (err) {
      console.error("Search error", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Enter city or zip"
        className="w-full border p-2 rounded-lg shadow-sm"
      />
      {loading && <div className="absolute top-2 right-3">⏳</div>}

      {results.length > 0 && (
        <ul className="absolute w-full bg-white border rounded-lg mt-1 shadow-lg z-10">
          {results.map((item, idx) => (
            <li
              key={idx}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => setQuery(item.name)} // pick the value
            >
              {item.name} ({item.state})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
