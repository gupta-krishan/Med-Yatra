import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export interface SymptomResult {
  diagnosis: string;
  recommendation: string;
  urgency: 'low' | 'medium' | 'high' | 'emergency';
  specialist: string;
}

export async function analyzeSymptoms(symptoms: string): Promise<SymptomResult> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("AI Service is currently being configured. Please contact support.");
  }
  const model = "gemini-3-flash-preview";
  
  const prompt = `Analyze the following symptoms: "${symptoms}". 
  Provide a potential diagnosis, recommendation, urgency level, and suggested medical specialist.
  Be professional and include a disclaimer that this is an AI tool and not a replacement for professional medical advice.`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          diagnosis: { type: Type.STRING },
          recommendation: { type: Type.STRING },
          urgency: { type: Type.STRING, enum: ['low', 'medium', 'high', 'emergency'] },
          specialist: { type: Type.STRING }
        },
        required: ['diagnosis', 'recommendation', 'urgency', 'specialist']
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse AI response", e);
    throw new Error("Could not analyze symptoms. Please try again.");
  }
}

export async function getGeneralAdvice(query: string): Promise<string> {
  const model = "gemini-3-flash-preview";
  
  const response = await ai.models.generateContent({
    model,
    contents: query,
    config: {
      systemInstruction: "You are MedYatra AI, a helpful assistant for medical tourism in India. Help users find information about hospitals, costs, and travel to India for treatment. Keep answers concise and professional."
    }
  });

  return response.text || "I'm sorry, I couldn't process that request.";
}
