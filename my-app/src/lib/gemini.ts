import { GoogleGenerativeAI } from "@google/generative-ai";

export async function analyzeMovieSentiment(movieTitle: string, plot: string[]) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    
    // Using the 1.5-flash model which is fast and reliable
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const prompt = `Analyze the movie "${movieTitle}" based on this plot summary: "${plot[0]}". 
    Provide a concise, 2-sentence perspective on the emotional "vibe" of the film and its cultural impact. 
    Keep it professional yet engaging.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();

  } catch (error: any) {
    console.error("Gemini Error:", error.message);
    return "AI insight currently unavailable. Check API configuration.";
  }
}