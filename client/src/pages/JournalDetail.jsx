import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosInstance } from '../lib/axiosInstance';

const JournalDetail = () => {
    const { id } = useParams();
    const [entry, setEntry] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEntry = async () => {
            try {
                const res = await axiosInstance.get(`journal/response/${id}`);
                // console.log(res);
                if (res.data.success) {
                    setEntry(res.data.entry);
                } else {
                    console.error("Failed to fetch entry");
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchEntry();
    }, [id]);

    if (!entry) {
        return <div>Loading...</div>;
    }

    const { title, text, aiResponse } = entry;

  return (
    <div className="h-full pt-20 px-4 mb-4">
      <div className="max-w-4xl min-h-screen mx-auto p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 space-y-8">
        <div className="border-b noto-sans border-gray-100 pb-6">
          <h1 className="text-3xl noto-sans font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {title}
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">{text}</p>
        </div>

        <div className="grid gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-blue-500">
            <h2 className="text-xl noto-sans font-extrabold text-gray-800 mb-3 flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              AI Reflection
            </h2>
            <p className="text-gray-700 schibsted-grotesk leading-relaxed">{aiResponse.reflection}</p>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border-l-4 border-emerald-500">
            <h2 className="text-xl font-bold text-gray-800 mb-3 noto-sans flex items-center">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
              Affirmation
            </h2>
            <p className="text-gray-700 leading-relaxed italic schibsted-grotesk">{aiResponse.affirmation}</p>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border-l-4 border-amber-500">
            <h2 className="text-xl font-bold text-gray-800 mb-4 noto-sans flex items-center">
              <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
              Coping Tips
            </h2>
            <ul className="space-y-3">
              {aiResponse.copingTips.map((tip, i) => (
                <li key={i} className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700 schibsted-grotesk leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-l-4 border-purple-500">
              <h2 className="text-xl font-bold noto-sans text-gray-800 mb-3 flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                Emotion Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {aiResponse.emotionTags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 urbanist bg-purple-100 text-purple-700 rounded-full text-lg font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-rose-50 to-red-50 rounded-xl p-6 border-l-4 border-rose-500">
              <h2 className="text-xl font-bold noto-sans text-gray-800 mb-3 flex items-center">
                <div className="w-2 h-2 bg-rose-500 rounded-full mr-3"></div>
                Mood Score
              </h2>
              <div className="flex items-center space-x-3">
                <div className="text-3xl font-bold text-rose-600 noto-sans">{aiResponse.moodScore}</div>
                <div className="text-gray-500 schibsted-grotesk">out of</div>
                <div className="text-2xl font-semibold text-gray-400 noto-sans">10</div>
              </div>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-rose-400 to-rose-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(aiResponse.moodScore / 10) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-6 border-t border-gray-100">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gradient-to-r noto-sans cursor-pointer from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>
    </div>
    
  )
}

export default JournalDetail