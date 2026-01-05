"use client";

import Analytics from "@/components/Analytics";
import { useState } from "react";

export default function Home() {
  const [riotId, setRiotId] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/player?riotId=${encodeURIComponent(riotId)}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch player data");
      }

      const json = await res.json();
      setData(json);
    } catch (err) {
      setError("Something went wrong. Check Riot ID");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">TFT Match Analyzer</h1>

      {/* Search */}
      <div className="flex gap-2">
        <input
          className="flex-1 rounded bg-neutral-800 px-4 py-2"
          placeholder="Name#TAG"
          value={riotId}
          onChange={(e) => setRiotId(e.target.value)}
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="rounded bg-indigo-600 px-4 py-2 font-medium disabled:opacity-50"
        >
          {loading ? "Loading..." : "Analyze"}
        </button>
      </div>

      {error && <p className="text-red-400">{error}</p>}

      {data && <Analytics data={data} />}
    </main>
  );
}
