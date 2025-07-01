export const parseAIResponse = (text) => {
  const reflectionMatch = text.match(/^(.+?)\n\n\*\*Affirmation:\*\*/s);
  const affirmationMatch = text.match(/\*\*Affirmation:\*\*\s*(.+?)\n\n\*\*Coping Tips:\*\*/s);
  const copingTipsMatch = text.match(/\*\*Coping Tips:\*\*([\s\S]+?)\n\n\*\*Emotion Tags:\*\*/);
  const emotionTagsMatch = text.match(/\*\*Emotion Tags:\*\*\s*(.+?)\n/i);
  const moodScoreMatch = text.match(/\*\*Mood Score:\*\*\s*(\d+)/i);

  // Split coping tips into an array and clean formatting
  const copingTips = copingTipsMatch?.[1]
    .trim()
    .split(/\n\d+\.\s+/)
    .filter(tip => tip.trim().length > 0)
    .map(tip => tip.replace(/\*\*/g, '').trim());

  // Split and trim tags
  const emotionTags = emotionTagsMatch?.[1]
    .split(',')
    .map(tag => tag.trim());

  return {
    reflection: reflectionMatch?.[1]?.trim() || '',
    affirmation: affirmationMatch?.[1]?.trim() || '',
    copingTips: copingTips || [],
    emotionTags: emotionTags || [],
    moodScore: moodScoreMatch ? Number(moodScoreMatch[1]) : null,
  };
};

  