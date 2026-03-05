// the Translator
// takes the plot from the Traffic Controller, formats a prompt, and sends it to Google’s servers.

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function analyzeMovieSentiment(movieTitle: string, plot: string[]) {
  try {
    const key = process.env.GEMINI_API_KEY;
    if (!key) throw new Error("API_KEY_MISSING");

    const genAI = new GoogleGenerativeAI(key);
    
    // Switching to 'gemini-pro' which is the most widely compatible model name
    // to bypass the 404 error you are seeing with the flash string.
    const model = genAI.getGenerativeModel({ model : "gemini-3-flash-preview", });

    const prompt = `Analyze the movie "${movieTitle}" based on this plot: ${plot[0]}. 
    Provide a 2-sentence summary of the expected audience vibe and classify it as Positive, Negative, or Mixed.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error: any) {
    console.error("Gemini Details:", error.status, error.message);
    // If it still fails, we provide the error message to the UI for debugging
    return `AI Insight unavailable (Error ${error.status || 'Internal'}).`;
  }
}