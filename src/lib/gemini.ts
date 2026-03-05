import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API with your key from .env.local
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// We define the model we want to use (Gemini 1.5 Flash is fast and great for summaries)
export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Helper to analyze sentiment
 * We will call this from our API route later
 */
export async function analyzeMovieSentiment(movieTitle: string, reviews: string[]) {
  const prompt = `
    Analyze the following user reviews for the movie "${movieTitle}".
    1. Provide a concise 2-3 sentence summary of the overall audience sentiment.
    2. Classify the sentiment as exactly one of these: "Positive", "Negative", or "Mixed".
    
    Reviews:
    ${reviews.join("\n\n")}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}