import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { axiosInstance } from '../lib/axiosInstance';

const getEmotionColor = (emotion) => {
  const emotionColors = {
    happy: "from-yellow-400 to-orange-500",
    sad: "from-blue-400 to-blue-600",
    angry: "from-red-400 to-red-600",
    anxiety: "from-purple-400 to-purple-600",
    anxious: "from-purple-400 to-purple-600",
    excited: "from-pink-400 to-pink-600",
    calm: "from-green-400 to-green-600",
    stressed: "from-gray-400 to-gray-600",
    uncertainty: "from-green-400 to-blue-500",
    overwhelmed: "from-neutral-400 to-neutral-600",
    hopeful: "from-teal-400 to-teal-600",
    frustrated: "from-orange-400 to-red-500",
    content: "from-emerald-400 to-emerald-600",
  }
  return emotionColors[emotion.toLowerCase()] || "from-indigo-400 to-indigo-600"
}


const Insights = () => {

  const dispatch = useDispatch();
  const [moodScores, setMoodScores] = useState([]);
  const [emotionData, setEmotionData] = useState({});
  const { mode } = useSelector((state) => state.darkMode);


  const fetchMood = async () => {
    try {
      const res = await axiosInstance.get("/journal/mood-trend")
      const filtered = res.data.trend.filter(entry => typeof entry.moodScore === "number");
      // console.log(res);
      setMoodScores(filtered);
      
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEmotions = async () => {
    try {
      const res = await axiosInstance.get("/journal/emotion-stats")
      // console.log(res.data.emotionStats);
      // const emotionData = res.data.emotionStats;
      setEmotionData(res.data.emotionStats);
      
      // console.log(sortedEmotions);
      
    } catch (error) {
      console.log(error);
    }
  }

  const sortedEmotions = Object.entries(emotionData).sort((a, b) => b[1] - a[1]);
  const mostCommonEmotion = sortedEmotions.length > 0 ? sortedEmotions[0][0] : "N/A"; 
  const topThreeEmotions = sortedEmotions.slice(0, 3);
  const maxCount = Math.max(...topThreeEmotions.map(([, count]) => count))


  

  const avgMood = (arr) => {
    const scores = arr.filter(e => typeof e.moodScore === 'number');
    const sum = scores.reduce((acc, cur) => acc + cur.moodScore, 0);
    return (sum / scores.length).toFixed(1);
  };

  

  useEffect(() => {
    fetchMood();
    fetchEmotions();
  }, []);


  return (
    <div className={`pt-24 px-4 mb-10 min-h-screen transition-colors duration-300 ${mode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-4xl mx-auto mb-10 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center noto-sans">
          Mood Trends
        </h2>

        {moodScores.length === 0 ? (
          <p className="text-center urbanist text-gray-500">No mood data available yet.</p>
        ) : (
          <ResponsiveContainer  className="mb-5" width="100%" height={300}>
            <LineChart data={moodScores}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="moodScore"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
            <p className='nunito-sans mt-2'>Average Mood (All Time): {avgMood(moodScores)} / 10</p>
          </ResponsiveContainer>
        )}
      </div>
      <div className={`${
                      mode
                        ? "bg-gray-800/70 border-gray-700/50 hover:bg-gray-800/90"
                        : "bg-white/70 border-gray-200/50 hover:bg-white/90"
                    } p-8 mt-10 mb-10 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300`}>
      {/* Header Section */}
      <div className="flex items-center mb-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mr-4">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent nunito-sans">
            Emotion Insights
          </h2>
          <p className={`${
                  mode ? "text-gray-100" : "text-gray-600"
                } urbanist`}>Your emotional patterns at a glance</p>
        </div>
      </div>

      {/* Most Common Emotion Section */}
      <div className={`rounded-xl p-6 mb-6 border ${
                      mode
                        ? "bg-gray-800/70 border-gray-700 "
                        : "bg-white/70 border-gray-200 hover:bg-white/90"
                    }`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm font-medium ${
                  mode ? "text-gray-100" : "text-gray-600"
                } mb-1 noto-sans`}>Most Common Emotion</p>
            <div className="flex items-center space-x-3">
              {/* <span className="text-3xl">{getEmotionIcon(mostCommonEmotion)}</span> */}
              <span className={`text-2xl font-bold ${
                  mode ? "text-gray-100" : "text-gray-600"
                } capitalize nunito-sans`}>{mostCommonEmotion}</span>
            </div>
          </div>
          <div
            className={`w-16 h-16 bg-gradient-to-r ${getEmotionColor(mostCommonEmotion)} rounded-full flex items-center justify-center shadow-lg`}
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Top 3 Emotions Section */}
      <div className="space-y-4">
        <h3 className={`text-lg schibsted-grotesk ${
                  mode ? "text-gray-100" : "text-gray-800"
                } flex items-center`}>
          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-3"></div>
          Top 3 Emotions
        </h3>

        <div className="space-y-3">
          {topThreeEmotions.map(([emotion, count], index) => (
            <div
              key={emotion}
              className={`${
                mode
                  ? "bg-gray-800/70"
                  : "bg-white/70 "
              } rounded-xl p-4 shadow-md  hover:shadow-lg transition-all duration-200`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-sm font-bold text-gray-600">
                    {index + 1}
                  </div>
                  {/* <span className="text-2xl">{getEmotionIcon(emotion)}</span> */}
                  <span className={`font-semibold ${
                  mode ? "text-gray-100" : "text-gray-700"
                } capitalize noto-sans`}>{emotion}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${
                  mode ? "text-gray-300" : "text-gray-500"
                } noto-sans`}>{count} times</span>
                  <div
                    className={`px-3 py-1 bg-gradient-to-r ${getEmotionColor(emotion)} text-white text-xs font-bold rounded-full noto-sans`}
                  >
                    {Math.round((count / maxCount) * 100)}%
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`bg-gradient-to-r ${getEmotionColor(emotion)} h-2 rounded-full transition-all duration-500 ease-out`}
                  style={{ width: `${(count / maxCount) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className={`flex items-center justify-center ${
                  mode ? "text-gray-300" : "text-gray-500"
                } urbanist`}>
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Based on your recent emotional entries
        </div>
      </div>
    </div>

    </div>
  )
}

export default Insights