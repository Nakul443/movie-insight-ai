import { NextResponse } from "next/server";
import { analyzeMovieSentiment } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    // get the IMDb ID from the frontend request body
    const { imdbId } = await req.json();

    if (!imdbId) {
      return NextResponse.json({ error: "IMDb ID is required" }, { status: 400 });
    }

    // fetch Movie Data from OMDb API
    const omdbResponse = await fetch(
      `http://www.omdbapi.com/?i=${imdbId}&plot=full&apikey=${process.env.OMDB_API_KEY}`
    );
    const movieData = await omdbResponse.json();

    if (movieData.Response === "False") {
      return NextResponse.json({ error: "Movie not found!" }, { status: 404 });
    }

    // AI Analysis (The "Insight" part)
    // we will send the Plot and Title to Gemini to simulate a sentiment analysis 
    // of how the movie was "intended" vs "received".
    const aiInsight = await analyzeMovieSentiment(movieData.Title, [movieData.Plot]);

    // clean up the data to match our TypeScript interface
    const formattedData = {
      title: movieData.Title,
      year: movieData.Year,
      poster: movieData.Poster,
      rating: movieData.imdbRating,
      plot: movieData.Plot,
      cast: movieData.Actors.split(", "), // OMDb gives a string, we want an array
      director: movieData.Director,
      genre: movieData.Genre,
      aiSummary: aiInsight
    };

    return NextResponse.json(formattedData);

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}