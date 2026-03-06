// when the "search" button is clicked, the code in this file is executed
// it receives the IMDb ID from the frontend, fetches movie data from OMDb, sends the plot to Gemini for analysis,
// and returns the combined result back to the frontend

import { NextResponse } from "next/server";
import { analyzeMovieSentiment } from "../../../../lib/gemini";

export async function POST(req: Request) {
  try {
    const { imdbId } = await req.json();

    if (!imdbId) {
      return NextResponse.json({ error: "IMDb ID is required" }, { status: 400 });
    }

    // 1. Fetch from OMDb
    const omdbResponse = await fetch(
      `http://www.omdbapi.com/?i=${imdbId}&plot=full&apikey=${process.env.OMDB_API_KEY}`
    );
    const movieData = await omdbResponse.json();

    if (movieData.Response === "False") {
      return NextResponse.json({ error: "Movie not found!" }, { status: 404 });
    }

    // 2. AI Analysis
    // We await this directly. If it fails, our new gemini.ts catch block 
    // will return a string instead of throwing a global error.
    const aiInsight = await analyzeMovieSentiment(
      movieData.Title, 
      [movieData.Plot && movieData.Plot !== "N/A" ? movieData.Plot : "No plot available for analysis."]
    );

    // 3. Format Data
    // We ensure the array for 'cast' is handled properly even if OMDb returns "N/A"
    const formattedData = {
      title: movieData.Title || "Unknown",
      year: movieData.Year || "N/A",
      poster: movieData.Poster || "",
      rating: movieData.imdbRating || "N/A",
      plot: movieData.Plot || "No plot available.",
      cast: movieData.Actors && movieData.Actors !== "N/A" 
        ? movieData.Actors.split(", ") 
        : ["Cast info unavailable"],
      director: movieData.Director || "N/A",
      genre: movieData.Genre || "N/A",
      aiSummary: aiInsight // This now contains the result from Gemini
    };

    return NextResponse.json(formattedData);

  } catch (error) {
    console.error("API Global Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}