import { GoogleGenAI } from "@google/genai";
import { GenerateWelcomeResponse } from "../types";

// Initialize the client with the API key from the environment
// Note: In a real production app, you might proxy this through a backend to keep the key secret,
// but for this client-side demo, we use the process.env.API_KEY as per instructions.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateWelcomeMessage = async (userName: string, provider: string): Promise<GenerateWelcomeResponse> => {
  try {
    const model = 'gemini-3-flash-preview'; 
    const prompt = `
      You are the AI interface for a secretive, stealth-mode project called "System Nebula".
      We are currently in stealth mode, inviting only trusted friends and allies for alpha testing.
      User Name (or placeholder): ${userName}
      Auth Provider: ${provider}

      Generate a cryptic, cool, high-tech welcome briefing acknowledging their security clearance into the stealth program (max 50 words).
      Assign them a random fictional "Stealth Operative Role" (e.g., Nebula Scout, Shadow Architect, Void Engineer, Silent Observer).
      
      Return the response in JSON format with keys: "message" and "role".
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(text) as GenerateWelcomeResponse;
  } catch (error) {
    console.error("Failed to generate welcome message:", error);
    return {
      message: "Clearance verified. Welcome to the inner circle. Do not speak of what you see here.",
      role: "Shadow Operative"
    };
  }
};