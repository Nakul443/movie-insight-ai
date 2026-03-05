// captures user input for IMDb ID and triggers the search when the form is submitted

"use client";
import { useState } from "react";
import { Search, Loader2 } from "lucide-react";

export default function SearchInput({ onSearch, isLoading }: any) {
  const [id, setId] = useState("");

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <form 
        onSubmit={(e) => { e.preventDefault(); if(id.trim()) onSearch(id.trim()); }}
        className="flex items-center gap-3 bg-[#1a1a1a] p-2 rounded-2xl border-2 border-white/10 focus-within:border-blue-500 transition-all shadow-2xl"
      >
        <input
          type="text"
          placeholder="Paste IMDb ID here (e.g. tt0133093)"
          value={id}
          onChange={(e) => setId(e.target.value)}
          // The 'style' prop below is the "nuclear option"
          style={{ color: 'white', backgroundColor: 'transparent' }}
          className="flex-1 px-4 py-3 outline-none text-white caret-white text-lg placeholder:text-gray-500"
        />
        <button 
          type="submit"
          disabled={isLoading || !id}
          className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 p-4 rounded-xl transition-all shadow-lg"
        >
          {isLoading ? (
            <Loader2 className="animate-spin text-white" size={24} />
          ) : (
            <Search className="text-white" size={24} />
          )}
        </button>
      </form>
    </div>
  );
}