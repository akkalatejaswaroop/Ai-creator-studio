import type { GoogleGenAI } from "@google/genai";

// Store the AI instance once it's loaded to avoid re-initialization.
let ai: GoogleGenAI | null = null;
const API_KEY = process.env.API_KEY;

/**
 * Lazily loads and initializes the GoogleGenAI client.
 * This is "browser-safe" as it avoids top-level module imports
 * that could cause issues in environments without the necessary globals.
 */
const getAiClient = async (): Promise<GoogleGenAI> => {
  if (!API_KEY) {
    throw new Error("API key not configured. Please set the API_KEY environment variable.");
  }
  if (ai) {
    return ai;
  }
  // Dynamically import the library when it's first needed
  const { GoogleGenAI } = await import("@google/genai");
  ai = new GoogleGenAI({ apiKey: API_KEY });
  return ai;
};

export const isApiAvailable = (): boolean => {
    return !!API_KEY;
};

// For standard text generation tools (now deprecated in favor of streaming)
export const generateTextContent = async (
  prompt: string, 
  systemInstruction: string, 
  language?: string
): Promise<string> => {
    const client = await getAiClient();
    const instruction = language && language !== 'English' 
      ? `${systemInstruction} The final output must be in ${language}.` 
      : systemInstruction;

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: instruction,
      }
    });
    return response.text;
};

// For streaming text generation
export async function* generateTextStream(
  prompt: string,
  systemInstruction: string,
  language?: string
): AsyncGenerator<string> {
  const client = await getAiClient();
  const instruction = language && language !== 'English'
    ? `${systemInstruction} The final output must be in ${language}.`
    : systemInstruction;

  const responseStream = await client.models.generateContentStream({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      systemInstruction: instruction,
    }
  });

  for await (const chunk of responseStream) {
    yield chunk.text;
  }
}


// For multimodal input (text + image)
export const generateTextFromImage = async (
  prompt: string, 
  systemInstruction: string, 
  image: { data: string; mimeType: string },
  language?: string
): Promise<string> => {
    const client = await getAiClient();
    const instruction = language && language !== 'English' 
      ? `${systemInstruction} The final output must be in ${language}.` 
      : systemInstruction;

    const imagePart = {
      inlineData: {
        data: image.data,
        mimeType: image.mimeType,
      },
    };
    const textPart = { text: prompt };

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
      config: {
        systemInstruction: instruction,
      }
    });
    return response.text;
};

// For grounded generation with Google Search
export const generateGroundedContent = async (prompt: string): Promise<{ text: string; sources: any[] }> => {
    const client = await getAiClient();
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{googleSearch: {}}],
      },
    });
    
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
    return { text: response.text, sources };
};

// For image generation
export const generateImages = async (prompt: string, numImages: number = 1): Promise<string[]> => {
    const client = await getAiClient();
    const response = await client.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
            numberOfImages: numImages,
            outputMimeType: 'image/jpeg',
        },
    });
    return response.generatedImages.map(img => img.image.imageBytes);
};