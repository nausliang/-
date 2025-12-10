import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
// Initialize loosely to allow the app to render even if key is missing (handled in UI)
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const sendMessageToGemini = async (history: string[], newMessage: string): Promise<string> => {
  if (!ai) {
    return "请配置 API Key 以使用 AI 助教功能。";
  }

  try {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `
      你是一位友善、耐心的小学数学老师。
      你正在辅导学生完成关于“用火柴棒摆三角形”的数学探究任务。
      
      核心逻辑：
      1. 摆 1 个三角形需要 3 根小棒。
      2. 摆 2 个三角形需要 5 根小棒 (3 + 2)。
      3. 摆 3 个三角形需要 7 根小棒 (3 + 2 + 2)。
      4. 规律是：每增加一个三角形，需要增加 2 根小棒。
      5. 公式是：小棒数 = 3 + 2 × (三角形数 - 1) 或者 小棒数 = 2 × 三角形数 + 1。

      请用简单易懂的语言回答学生的问题。如果学生问到具体的计算，请一步步展示过程。
      鼓励学生思考，而不仅仅是给出答案。
    `;

    // Construct a simple chat prompt since we aren't maintaining a full Chat object state 
    // for this lightweight service, or use generateContent with conversational context.
    // For simplicity and robustness in this demo, we'll concatenate context.
    
    const prompt = `${systemInstruction}\n\n当前对话历史:\n${history.join('\n')}\n\n学生: ${newMessage}\n老师:`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "抱歉，我暂时无法回答。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "哎呀，网络出了点小差错，请稍后再试。";
  }
};