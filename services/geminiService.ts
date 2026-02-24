import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

const API_KEY = process.env.API_KEY || "";

export const analyzeArticle = async (text: string): Promise<AnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the following news article and convert it into a neutral, fact-based structured report. 
    
    Article Text: 
    ${text}

    Requirements:
    1. Sentiment Analysis: Provide a score from -1 (very negative) to 1 (very positive) and a label.
    2. Bias Removal: Identify and list highly emotional or biased words (e.g., shocking, devastating, tragic, horrifying, brutal, unbelievable, massive, incredible) and provide a version of the article with these words removed or replaced with neutral alternatives.
    3. Entity Extraction: Extract key People, Locations, Organizations, Dates, and Numbers.
    4. Neutral Summary: Generate a summary that is strictly objective and free of any loaded language.
    `,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          sentiment: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              label: { type: Type.STRING },
              explanation: { type: Type.STRING }
            },
            required: ["score", "label", "explanation"]
          },
          cleanedArticle: { type: Type.STRING },
          removedBiasedWords: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          entities: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                type: { type: Type.STRING },
                value: { type: Type.STRING }
              },
              required: ["type", "value"]
            }
          },
          neutralSummary: { type: Type.STRING }
        },
        required: ["sentiment", "cleanedArticle", "removedBiasedWords", "entities", "neutralSummary"]
      }
    }
  });

  try {
    const data = JSON.parse(response.text);
    return data as AnalysisResult;
  } catch (err) {
    console.error("Failed to parse Gemini response:", err);
    throw new Error("Invalid response format from AI service.");
  }
};
