import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BookOpen, PenTool, TrendingUp, Calendar, Heart, Sparkles } from "lucide-react"
import { fetchStreak } from '../features/journalSlice'
import { axiosInstance } from '../lib/axiosInstance'

const capitalizeFirst = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const Dashboard = () => {

  const { user } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);
  const [streak, setStreak] = useState(0);
  const [moodToday, setMoodToday] = useState("-");
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

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
      console.log(error);
    }
    
  }

  const fetchJournalCount = async () => {
    try {
      const res = await axiosInstance.get("/journal/count");
      console.log(res);
      setCount(res.data.count);
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    getStreak();
    fetchLatestResponse();
    fetchJournalCount();
  }, []);

  

  // console.log(user);
  return (
    <div className="min-h-screen urbanist pt-16">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Welcome back, {user?.name || "Friend"}!
              </h1>
              <p className="text-gray-600 text-lg mt-1 flex items-center gap-2 schibsted-grotesk">
                {/* <Sparkles className="w-4 h-4 text-yellow-500" /> */}
                Ready to reflect and grow today?
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-gray-900">{count} entries</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-600">Current Streak</p>
                <p className="text-2xl font-bold text-gray-900">{streak}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className=" font-medium text-gray-600">Mood Today</p>
                <p className="text-2xl font-bold text-gray-900">{capitalizeFirst(moodToday)}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-purple-600" />
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

        {/* Recent Activity: might add later */}
        {/* <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50/50 rounded-xl">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <PenTool className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">New journal entry</p>
                    <p className="text-sm text-gray-600">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50/50 rounded-xl">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Mood check-in completed</p>
                    <p className="text-sm text-gray-600">Yesterday</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50/50 rounded-xl">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Weekly insights generated</p>
                    <p className="text-sm text-gray-600">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default Dashboard