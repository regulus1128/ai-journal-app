import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash',
  systemInstruction: `You are a kind and uplifting mental wellness guide. 
    When a user logs in, it will send the name of the user from the frontend. Respond with a single short motivational, inspirational, or gratitude-based message along with their name.
    Respond in plain text. No markdown, no JSON, no code formatting. Keep it under 30 words.`,
});

const generateWelcomeMessage = async (name) => {
  try {
    const result = await model.generateContent(name);
    const raw = await result.response.text();
    return raw.trim();
  } catch (err) {
    console.error("Gemini welcome error:", err);
    return "Welcome back! You've got this.";
  }
};

export default generateWelcomeMessage;
