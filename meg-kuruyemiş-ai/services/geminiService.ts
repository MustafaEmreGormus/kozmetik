
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const chatWithAssistant = async (history: { role: 'user' | 'model', text: string }[], message: string) => {
  const ai = getAI();
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: 'Sen MEG Kuruyemiş\'in akıllı asistanısın. Kuruyemişler, sağlıklı beslenme, tarifler ve MEG Kuruyemiş ürünleri hakkında uzmansın. Kibar, yardımcı ve profesyonel bir dil kullanmalısın. Kullanıcılara ellerindeki kuruyemişlerle yapabilecekleri tarifler öner, besin değerleri hakkında bilgi ver.',
    }
  });

  const response = await chat.sendMessage({ message });
  return response.text;
};

export const generateRecipeFromSelection = async (products: string[]) => {
  const ai = getAI();
  const prompt = `Aşağıdaki kuruyemişleri içeren yaratıcı ve sağlıklı bir tarif oluştur: ${products.join(', ')}. Tarifi JSON formatında ver: { "title": string, "ingredients": string[], "instructions": string[], "nutritionalValue": string }`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
          instructions: { type: Type.ARRAY, items: { type: Type.STRING } },
          nutritionalValue: { type: Type.STRING }
        },
        required: ['title', 'ingredients', 'instructions', 'nutritionalValue']
      }
    }
  });

  return JSON.parse(response.text);
};

export const generateVisualPlatter = async (description: string) => {
  const ai = getAI();
  const prompt = `A professional food photography shot of a luxury nut platter containing: ${description}. High-end lighting, gourmet presentation, wooden background.`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts: [{ text: prompt }] },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};
