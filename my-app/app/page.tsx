"use client";
import { useState } from "react";
import SearchInput from "../src/components/SearchInput";
import MovieCard from "../src/components/MovieCard";

export default function Home() {
  const [movieData, setMovieData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (imdbId: string) => {
    setLoading(true);
    setError("");
    setMovieData(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imdbId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch movie");
      
      setMovieData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic">
            Movie Insight <span className="text-blue-600">AI</span>
          </h1>
          <p className="text-gray-400 text-lg">Paste an IMDb ID to generate AI sentiment analysis.</p>
        </div>

        <SearchInput onSearch={handleSearch} isLoading={loading} />

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-center max-w-2xl mx-auto">
            {error}
          </div>
        )}

        {movieData && <MovieCard movie={movieData} />}
      </div>
    </main>
  );
}