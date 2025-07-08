import aiService from '../services/ai.service.js';
import Journal from '../models/journal.model.js';
import User from '../models/user.model.js';
import generateForecast from '../services/forecast.service.js';


export const generateResponse = async (req, res) => {
    const { text, title } = req.body;
    const userId = req.user?._id;

    try {
        const response = await aiService(text);
        // console.log(response);
        // const parsed = parseAIResponse(response);
        const newEntry = new Journal({
            user: userId,
            text,
            title,
            aiResponse: response,
        });
        await newEntry.save();
        return res.status(201).json({ success: true, message: "Journal entry created successfully", entry: newEntry });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
    
}

export const fetchResponse = async (req, res) => {
    const userId = req.user?._id;

    try {
        const response = await Journal.find({ user: userId }).sort({ createdAt: -1 });
        return res.status(200).json({ success: true, response });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
}

export const fetchLatestResponse = async (req, res) => {
  const userId = req.user?._id;
  try {
    const response = await Journal.findOne({ user: userId }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, response });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message })
  }

}

export const fetchResponseById = async (req, res) => {
    const { id } = req.params;

    try {
        const entry = await Journal.findById(id);
        return res.status(200).json({ success: true, entry });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
}

export const deleteJournal = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEntry = await Journal.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Journal deleted successfully!" });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message })
  }
}

export const getMoodTrend = async (req, res) => {
    const userId = req.user._id;
  
    try {
      const entries = await Journal.find({ user: userId })
        .select("createdAt aiResponse.moodScore")
        .sort({ createdAt: 1 });
  
      const moodTrend = entries.map(entry => ({
        date: entry.createdAt.toISOString().split("T")[0],
        moodScore: entry.aiResponse.moodScore,
      }));
  
      res.status(200).json({ trend: moodTrend });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

  
export const getEmotionStats = async (req, res) => {
    const userId = req.user._id;
  
    try {
      const entries = await Journal.find({ user: userId }).select("aiResponse.emotionTags");
  
      const tagCounts = {};
  
      entries.forEach(entry => {
        entry.aiResponse.emotionTags.forEach(tag => {
          tag = tag.toLowerCase();
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      });
  
      res.status(200).json({ emotionStats: tagCounts });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

export const trackStreak = async (req, res) => {

  const userId = req.user._id;

  try {
    const entries = await Journal.find({ user: userId }).sort({ createdAt: -1 }).select("createdAt");
    const uniqueDates = new Set();

    entries.forEach(entry => {
      const dateStr = new Date(entry.createdAt).toISOString().split("T")[0]; // "2025-06-28"
      uniqueDates.add(dateStr);
    });

    const today = new Date();
    let streak = 0;

    for (let i = 0; ; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateStr = checkDate.toISOString().split("T")[0];

      if (uniqueDates.has(dateStr)) {
        streak++;
      } else {
    // Missed a day → streak ends
        break;
    }
  }

  res.status(200).json({
    currentStreak: streak,
  });
  

  
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: err.message });
  }
};

export const countJournalEntries = async (req, res) => {
  const userId = req.user._id;

  try {
    const today = new Date();
const dayOfWeek = today.getDay(); // 0 (Sun) - 6 (Sat)
const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

const startOfWeek = new Date(today);
startOfWeek.setDate(today.getDate() + mondayOffset);
startOfWeek.setHours(0, 0, 0, 0);

const endOfWeek = new Date(startOfWeek);
endOfWeek.setDate(startOfWeek.getDate() + 6);
endOfWeek.setHours(23, 59, 59, 999);

const journalCount = await Journal.countDocuments({
  user: userId,
  createdAt: {
    $gte: startOfWeek,
    $lte: endOfWeek
  }
});

res.status(200).json({ count: journalCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: err.message });
  }
};

export const setReminder = async (req, res) => {
  const { reminderTime } = req.body;
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.reminderTime = reminderTime;
    await user.save();

    res.status(200).json({ success: true, message: "Reminder time set successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  } 
};

export const getMoodForecast = async (req, res) => {
  const userId = req.user._id;

  try {
    const entries = await Journal.find({ user: userId, "aiResponse.moodScore": { $ne: null } })
    .sort({ createdAt: -1 })
    .limit(5);
    const moodScores = entries.map(entry => entry.aiResponse.moodScore);
    if (moodScores.length === 0) {
      return res.json({ 
        success: false, 
        message: "No mood data available yet. Write a journal to start tracking your mood!" 
      });
    }
    const response = await generateForecast(moodScores);
    // console.log(response);
    res.status(200).json({ success: true, response });
  } catch (error) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}
  