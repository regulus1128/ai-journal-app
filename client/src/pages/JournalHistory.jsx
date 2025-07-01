import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchResponses } from '../features/journalSlice';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Calendar, Eye, FileText, Sparkles, Clock, Trash } from "lucide-react"
import { axiosInstance } from '../lib/axiosInstance';
import toast from 'react-hot-toast';

function EntryCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
      <div className="space-y-4">
        <div className="h-6 bg-gray-200 rounded-lg w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
        <div className="flex justify-between items-center pt-4">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-10 bg-gray-200 rounded-lg w-28"></div>
        </div>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <BookOpen className="w-12 h-12 text-blue-500" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2 noto-sans">No journal entries yet</h3>
      <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto urbanist">
        Start your journaling journey today. Your thoughts and reflections are waiting to be captured.
      </p>
    </div>
  )
}

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  if (diffDays === 0) return `Today, ${formattedTime}`;
  if (diffDays === 1) return `Yesterday, ${formattedTime}`;
  if (diffDays <= 7) return `${diffDays} days ago, ${formattedTime}`;

  const formattedDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return `${formattedDate} • ${formattedTime}`;
};


const JournalHistory = () => {
    const dispatch = useDispatch();
    const { responses, isLoading } = useSelector((state) => state.journal);
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    

    const fetchJournals = async () => {
        try {
            // Assuming you have an action to fetch journal responses
            await dispatch(fetchResponses());
        } catch (error) {
            console.error("Failed to fetch journal responses:", error);
        }
    }

    const handleDeleteJournal = async (id) => {
      try {
        const res = await axiosInstance.delete(`/journal/delete-journal/${id}`);
        // console.log(res);
        toast.success(res.data.message);
        fetchJournals();
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
        fetchJournals();
    }, []);

    console.log(responses);
    // console.log(user);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 ">
      <div className="pt-24 px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 urbanist">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Your Journal Entries
              </h1>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore your thoughts, memories, and reflections captured over time
            </p>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <EntryCardSkeleton key={index} />
              ))}
            </div>
          ) : responses.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {/* Stats Bar */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-200/50 shadow-sm">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <FileText className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-xl text-gray-600">
                        <span className="font-semibold text-gray-900">{responses.length}</span> entries
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Entries Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 noto-sans">
                {responses.map((entry, index) => (
                  <div
                    key={entry._id}
                    className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 hover:scale-[1.02] hover:bg-white"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <div className="flex flex-col h-full">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900 transition-colors duration-300 line-clamp-2">
                          {entry.title}
                        </h2>
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center ml-3 group-hover:scale-110 transition-transform duration-300">
                          <BookOpen className="w-5 h-5 text-blue-600" />
                        </div>
                      </div>

                      {/* Content Preview */}
                      <p className="text-gray-700 line-clamp-4 leading-relaxed mb-6 flex-grow">{entry.text}</p>

                      {/* Footer */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(entry.createdAt)}</span>
                        </div>

                        <div className='flex justify-center gap-2'>
                        <button
                          onClick={() => navigate(`/journal/${entry._id}`)}
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-2 rounded-full font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform flex items-center justify-center gap-1 group"
                        >
                          <Eye className="w-4 h-4 transition-transform duration-300" />
                          View Details
                        </button>
                        <button
                          onClick={() => handleDeleteJournal(entry._id)}
                          className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-2 rounded-full font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg transform flex items-center justify-center gap-1 group"
                        >
                          <Trash className="w-4 h-4 transition-transform duration-300" />
                          Delete
                        </button>

                        </div>

                        
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default JournalHistory