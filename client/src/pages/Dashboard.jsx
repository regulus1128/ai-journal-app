import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BookOpen, PenTool, TrendingUp, Calendar, Heart } from "lucide-react"
import { fetchStreak } from '../features/journalSlice'
import { axiosInstance } from '../lib/axiosInstance'
import toast from 'react-hot-toast'

const capitalizeFirst = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const getTodayDate = () => {
  return new Date().toISOString().split("T")[0]; 
};

const Dashboard = () => {

  const { user } = useSelector((state) => state.auth);
  const { mode } = useSelector((state) => state.darkMode);
  const [streak, setStreak] = useState(0);
  const [moodToday, setMoodToday] = useState("-");
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [forecast, setForecast] = useState(null);


  const getStreak = async () => {
    const res = await axiosInstance.get("/journal/streak");
    // console.log(res);
    setStreak(res.data.currentStreak);
  }

  const fetchLatestResponse = async () => {
    try {
      const res = await axiosInstance.get("/journal/latest");
      // console.log(res.data.response);
      setMoodToday(res.data.response.aiResponse.moodToday);
    } catch (error) {
      // console.log(error);
    }
    
  }

  const fetchJournalCount = async () => {
    try {
      const res = await axiosInstance.get("/journal/count");
      // console.log(res);
      setCount(res.data.count);
    } catch (error) {
      console.log(error);
      
    }
  }

  const getDailyForecast = async (id) => {
    const today = getTodayDate();
    const storageKey = `mood-forecast-${id}`;
    const cached = localStorage.getItem(storageKey);
  
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed.date === today) {
        return parsed; // 🧠 Use saved forecast
      }
    }
  
    
    try {
      const res = await axiosInstance.get("/journal/forecast");
      console.log(res);
      if(res.data.success){
        const newForecast = {
          ...res.data,
          date: today,
        };
        localStorage.setItem("mood-forecast", JSON.stringify(newForecast));
        return newForecast;
      } else{
        setForecast(null);
        setIsLoading(false);

      }
      
    } catch (error) {
      // console.error("Failed to fetch mood forecast", error);
      return {
        prediction: "unknown",
        suggestion: "You're doing your best. Be gentle with yourself 💜",
        date: today,
      };
    }
  };
  

  

  useEffect(() => {
    getStreak();
    fetchLatestResponse();
    fetchJournalCount();
    // fetchForecast();
    
  }, []);

  useEffect(() => {
    if (user?._id) {
      const fetchForecast = async () => {
        setIsLoading(true);
        const forecast = await getDailyForecast(user._id);
        // console.log(forecast.response);
        setForecast(forecast.response);
        setIsLoading(false);
      };
      fetchForecast();
    }
  }, [user]);


  return (
    <div className={`min-h-screen urbanist pt-16 transition-colors duration-300 ${mode ? "bg-gray-900" : "bg-gray-50"}`}>
      
      <div className="container mx-auto px-2 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              
              <h1
                className={`text-4xl nunito-sans font-bold bg-gradient-to-r ${
                  mode ? "from-white to-gray-300" : "from-gray-900 to-gray-600"
                } bg-clip-text text-transparent transition-colors duration-300`}
              >
                Welcome back, {user?.name || "Friend"}!
              </h1>
              <p
                className={`text-lg mt-1 flex items-center gap-2 schibsted-grotesk transition-colors duration-300 ${
                  mode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {/* <Sparkles className="w-4 h-4 text-yellow-500" /> */}
                Ready to reflect and grow today?
              </p>
              
            </div>
            
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div
            className={`backdrop-blur-sm rounded-2xl p-6 border shadow-sm transition-all duration-300 ${
              mode
                ? "bg-gray-800/70 border-gray-700/50 hover:bg-gray-800/90"
                : "bg-white/70 border-gray-200/50 hover:bg-white/90"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`font-medium transition-colors duration-300 ${mode ? "text-gray-300" : "text-gray-600"}`}>
                  This Week
                </p>
                <p
                  className={`text-2xl font-bold transition-colors duration-300 ${
                    mode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {count} entries
                </p>
              </div>
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  mode ? "bg-green-900/50" : "bg-green-100"
                }`}
              >
                <Calendar
                  className={`w-6 h-6 transition-colors duration-300 ${mode ? "text-green-400" : "text-green-600"}`}
                />
              </div>
            </div>
          </div>

          <div
            className={`backdrop-blur-sm rounded-2xl p-6 border shadow-sm transition-all duration-300 ${
              mode
                ? "bg-gray-800/70 border-gray-700/50 hover:bg-gray-800/90"
                : "bg-white/70 border-gray-200/50 hover:bg-white/90"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`font-medium transition-colors duration-300 ${mode ? "text-gray-300" : "text-gray-600"}`}>
                  Current Streak
                </p>
                <p
                  className={`text-2xl font-bold transition-colors duration-300 ${
                    mode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {streak}
                </p>
              </div>
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  mode ? "bg-orange-900/50" : "bg-orange-100"
                }`}
              >
                <TrendingUp
                  className={`w-6 h-6 transition-colors duration-300 ${mode ? "text-orange-400" : "text-orange-600"}`}
                />
              </div>
            </div>
          </div>

          <div
            className={`backdrop-blur-sm rounded-2xl p-6 border shadow-sm transition-all duration-300 ${
              mode
                ? "bg-gray-800/70 border-gray-700/50 hover:bg-gray-800/90"
                : "bg-white/70 border-gray-200/50 hover:bg-white/90"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`font-medium transition-colors duration-300 ${mode ? "text-gray-300" : "text-gray-600"}`}>
                  Current Mood
                </p>
                <p
                  className={`text-2xl font-bold transition-colors duration-300 ${
                    mode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {capitalizeFirst(moodToday)}
                </p>
              </div>
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  mode ? "bg-purple-900/50" : "bg-purple-100"
                }`}
              >
                <Heart
                  className={`w-6 h-6 transition-colors duration-300 ${mode ? "text-purple-400" : "text-purple-600"}`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 noto-sans">
          <Link
            to="/journal"
            className="group relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <PenTool className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-2">New Entry</h3>
              <p className="text-blue-100 text-sm">Start writing your thoughts and feelings</p>
            </div>
          </Link>

          <Link
            to="/journal/history"
            className="group relative bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl p-8 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-2">Journal History</h3>
              <p className="text-purple-100 text-sm">Browse through your past entries</p>
            </div>
          </Link>

          <Link
            to="/journal/insights"
            className="group relative bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-8 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden md:col-span-2 lg:col-span-1"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-2">Mood Insights</h3>
              <p className="text-emerald-100 text-sm">Discover patterns in your emotions</p>
            </div>
          </Link>
        </div>

        

        {isLoading ? (
  <div className={`mt-10 ${mode ? "text-gray-300" : "text-gray-600"} text-center text-lg`}>
  <div className="flex items-center justify-center space-x-2">
    <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
  </div>
  <p className="mt-3 animate-pulse">Loading your mood forecast...</p>
</div>
) : (
  forecast?.prediction && forecast?.suggestion ? (
    <div className="mt-10 relative overflow-hidden">
      <div className="relative  from-slate-700 to-gray-600 bg-gradient-to-r p-8 rounded-3xl shadow-2xl  backdrop-blur-sm">
        <div className="relative z-10">
          <div className="flex items-start space-x-3 mb-4">
            <h3 className="text-xl nunito-sans font-bold text-white leading-relaxed">
              Based on your recent entries, your tomorrow's mood will be: 
              <p className="inline mt-2 text-2xl font-extrabold text-yellow-200 drop-shadow-sm">
                {" "}{forecast.prediction}
              </p>
            </h3>
          </div>

          <div className="mt-6 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
            <p className="italic text-lg text-gray-50 leading-relaxed font-medium">
              <span className="text-yellow-200 text-xl">"</span>
              {forecast.suggestion}
              <span className="text-yellow-200 text-xl">"</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : <>
  <p className={`text-center mt-10 schibsted-grotesk ${mode ? "text-gray-300" : "text-gray-600"}`}>
    Write your first journal entry to unlock tomorrow's mood forecast.
  </p>
      
  </>
)}



      </div>

    </div>
  )
}

export default Dashboard