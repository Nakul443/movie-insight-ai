// displays the movie information in a card format with a poster, title, rating, year, genre, plot, and cast

"use client";
import { Star, Calendar, Clapperboard, Users } from "lucide-react";

export default function MovieCard({ movie }: { movie: any }) {
  return (
    <div className="w-full max-w-5xl mx-auto mt-12 bg-[#111] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row transition-all hover:border-blue-500/30">
      
      {/* Poster Fix: Using object-contain to prevent enlargement/cropping */}
      <div className="md:w-[350px] shrink-0 bg-black flex items-center justify-center p-4">
        <img 
          src={movie.poster !== "N/A" ? movie.poster : "/placeholder.png"} 
          alt="poster" 
          className="max-w-full h-auto max-h-[500px] object-contain rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-700"
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 p-8 md:p-12 flex flex-col justify-between bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-3">
            <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-none italic">
              {movie.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-sm font-bold">
              <span className="bg-yellow-400 text-black px-3 py-1 rounded-md flex items-center gap-1">
                <Star size={14} fill="black" /> {movie.rating}
              </span>
              <span className="text-blue-400 flex items-center gap-2">
                <Calendar size={16} /> {movie.year}
              </span>
              <span className="text-gray-400 flex items-center gap-2 border-l border-white/10 pl-4">
                <Clapperboard size={16} /> {movie.genre}
              </span>
            </div>
          </div>

          {/* Plot Box */}
          <div className="relative">
            <div className="absolute left-0 top-0 w-1 h-full bg-blue-600 rounded-full" />
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light pl-6 py-1 italic">
              {movie.plot}
            </p>
          </div>
        </div>

        {/* Cast Section */}
        <div className="mt-10 pt-8 border-t border-white/5">
          <div className="flex items-center gap-2 mb-4">
            <Users size={18} className="text-blue-500" />
            <h3 className="text-gray-500 text-xs font-black uppercase tracking-[0.2em]">The Cast</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {movie.cast && movie.cast.length > 0 ? (
              movie.cast.map((actor: string) => (
                <span key={actor} className="text-sm bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-1.5 rounded-lg text-white transition-colors cursor-default">
                  {actor}
                </span>
              ))
            ) : (
              <span className="text-gray-500 italic">Cast information unavailable</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}