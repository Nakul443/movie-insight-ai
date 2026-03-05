// brain of the frontend, handles the search and displays the movie card and AI summary

"use client";
import { useState } from "react";
import SearchInput from "@/components/SearchInput";
import MovieCard from "@/components/MovieCard";

export default function Home() {
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (imdbId: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: JSON.stringify({ imdbId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setMovie(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-black tracking-tighter uppercase italic border-b-4 border-blue-600 inline-block pb-2">
            Insight AI
          </h1>
          <p className="text-gray-400 font-mono tracking-widest text-sm uppercase">
            Professional Grade Movie Analysis
          </p>
        </div>

        <SearchInput onSearch={handleSearch} isLoading={loading} />

        {error && (
          <div className="bg-red-900/20 border border-red-500 p-4 rounded-xl text-center text-red-400">
            {error}
          </div>
        )}

        {movie && (
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-700">
            <MovieCard movie={movie} />
            {/* AI Summary Box */}
            <div className="max-w-5xl mx-auto mt-6 p-8 bg-blue-600/10 border border-blue-500/30 rounded-[2rem]">
               <h3 className="text-blue-500 font-black text-xs uppercase mb-3 tracking-widest">AI Sentiment Result</h3>
               <p className="text-white text-xl font-medium leading-relaxed italic">
                 "{movie.aiSummary}"
               </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}