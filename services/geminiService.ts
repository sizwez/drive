
import { GoogleGenAI, Type, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getK53Explanation = async (topic: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Explain the K53 rules or road signs related to: "${topic}". Provide a clear, concise explanation suitable for a learner driver.`,
    config: {
      systemInstruction: "You are a expert K53 Driving Instructor in South Africa. You help students understand rules of the road, signs, and vehicle controls.",
    }
  });
  return response.text || "I'm sorry, I couldn't process that request.";
};

export const generateQuizQuestion = async (category: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate one realistic K53 multiple-choice question for the category: ${category}. Ensure it is specific to South African laws. Return it in JSON format.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          options: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          correctAnswer: { type: Type.INTEGER, description: "Index of correct option (0-3)" },
          explanation: { type: Type.STRING }
        },
        required: ["question", "options", "correctAnswer", "explanation"]
      }
    }
  });
  
  try {
    return JSON.parse(response.text || "{}");
  } catch (e) {
    return null;
  }
};

export const findNearbyDLTCs = async (lat: number, lng: number) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Find the 5 closest Driving Licence Testing Centres (DLTC) near my location.",
    config: {
      tools: [{ googleMaps: {} }],
      toolConfig: {
        retrievalConfig: {
          latLng: { latitude: lat, longitude: lng }
        }
      }
    },
  });
  return {
    text: response.text,
    links: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};

export const generateAudioLesson = async (text: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: `Explain clearly as a driving instructor: ${text}` }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Kore' },
        },
      },
    },
  });
  return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
};
