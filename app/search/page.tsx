'use client';
import { useEffect, useState } from 'react';

function ResultList({ items }: { items: any[] }) {
  return (
    <ul className="grid gap-4">
      {items?.map((it) => (
        <li key={it.id} className="rounded-2xl border p-4 shadow-sm">
          <div className="font-semibold text-lg">{it.title ?? it.name}</div>
          {it.description && (
            <p className="text-sm opacity-80 mt-1">{it.description}</p>
          )}
          {it.image_url && (
            <img
              src={it.image_url}
              alt={it.title ?? it.name}
              className="mt-3 rounded-xl"
            />
          )}
        </li>
      ))}
    </ul>
  );
}

export default function SearchPage() {
  const [q, setQ] = useState('');
  const [items, setItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchResults = async (keyphrase: string, pageNum = 1) => {
    setIsLoading(true);

    // ✅ Local API route (this will serve either mock JSON or real API)
    const res = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: keyphrase,
        offset: (pageNum - 1) * 10,
        limit: 10,
      }),
    });

    const data = await res.json();
    const content = data?.widgets?.[0]?.content ?? [];

    setItems(content);
    setTotal(data?.widgets?.[0]?.total_item ?? content.length);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchResults('', 1);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => fetchResults(q, 1), 300);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Search</h1>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search..."
        className="w-full rounded-xl border px-4 py-2 mb-6"
      />
      {isLoading ? <div>Loading…</div> : <ResultList items={items} />}
      {total > 10 && (
        <div className="flex gap-2 mt-6">
          <button
            onClick={() => {
              const p = Math.max(1, page - 1);
              setPage(p);
              fetchResults(q, p);
            }}
            disabled={page === 1}
            className="border rounded px-3 py-1"
          >
            Prev
          </button>
          <span>Page {page}</span>
          <button
            onClick={() => {
              const p = page + 1;
              setPage(p);
              fetchResults(q, p);
            }}
            disabled={page * 10 >= total}
            className="border rounded px-3 py-1"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
