import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    systemInstruction: `You are a compassionate mental health assistant. A user will write a journal entry. 
    When a user gives you a journal entry, respond ONLY in raw JSON format with no markdown, no triple backticks, and no explanation.
    Example format:
    {
      "reflection": "<short empathetic response to their feelings>",
      "affirmation": "<positive affirmation>",
      "copingTips": ["<tip 1>", "<tip 2>" and so on...],
      "emotionTags": ["<tag1>", "<tag2>", "<tag3>" and so on...],
      "moodScore": <a number from 1 to 10>,
      "moodToday": "<a one-word mood label like 'happy', 'anxious', 'calm', 'low', based on the moodScore>"
    }
    The field moodToday is required.
    Only respond with a valid JSON string. Do not include bullet points, markdown, or any additional notes.
    `,

    });

  const generateContent = async (journalEntry) => {
    try {
        const result = await model.generateContent(journalEntry);

        let raw = await result.response.text();
        if (raw.startsWith("```")) {
          raw = raw.replace(/```json|```/gi, "").trim();
        }
        const parsed = JSON.parse(raw);
        return parsed;
    } catch (error) {
        console.error('Error generating content:', error);

    }
  };
  
  export default generateContent;
  