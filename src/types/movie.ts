// how the movie object should look like
export interface MovieData {
  title: string;
  year: string;
  poster: string;
  rating: string;
  plot: string;
  cast: string[];
  director: string;
  genre: string;
}

export interface AnalysisResult {
  summary: string;
  sentiment: "Positive" | "Negative" | "Mixed";
}