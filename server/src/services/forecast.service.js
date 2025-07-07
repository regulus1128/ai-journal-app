import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const forecastModel = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: {
      temperature: 0,
      
    },
    systemInstruction: `
      You are a mental wellness predictor. You will receive a list of mood scores like [4, 3, 2, 5, 3].
      Based on recent patterns, predict the user's mood for tomorrow (one word only), and suggest a short affirmation to help them.
  
      Respond ONLY in this JSON format:
      {
        "prediction": "<one-word mood>",
        "suggestion": "<a short, encouraging affirmation>"
      }
  
      No markdown, no explanation.
    `,
});

const generateForecast = async (scores) => {
  try {
    const prompt = `
      Here are the user's recent mood scores: [${scores.join(", ")}].

      Based on these, predict the user's mood for tomorrow (one word only),
      and suggest a short affirmation.

      Respond ONLY in this valid JSON format — no markdown, no backticks:
      {
        "prediction": "<one-word mood>",
        "suggestion": "<a short, encouraging affirmation>"
      }
    `;

    const result = await forecastModel.generateContent(prompt);
    let raw = await result.response.text();

    // console.log("📦 Raw AI Output:\n", raw);

    // Clean markdown formatting if present
    if (raw.startsWith("```")) {
      raw = raw.replace(/```json|```/gi, "").trim();
    }

    // Try parsing and handle failures gracefully
    try {
      const parsed = JSON.parse(raw);
      if (parsed.prediction && parsed.suggestion) {
        return parsed;
      } else {
        throw new Error("JSON missing expected fields");
      }
    } catch (jsonErr) {
      console.warn("⚠️ Gemini returned invalid JSON. Fallback activated.");
      return {
        prediction: "unknown",
        suggestion: "Take things one step at a time. You're doing your best 💛",
      };
    }

  } catch (error) {
    console.error("❌ Forecast Error:", error.message);
    return {
      prediction: "unknown",
      suggestion: "Take a deep breath and be kind to yourself 🧘‍♀️",
    };
  }
};



export default generateForecast;