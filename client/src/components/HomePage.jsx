import React from 'react'
import { Brain, BookOpen, Sparkles, TrendingUp, Shield, Zap } from "lucide-react"
// import { Card, CardContent } from "@/components/ui/card"

const HomePage = () => {
  return (
    <div className="bg-white">
      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 nunito-sans">Your AI-Powered Journal Experience</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto nunito-sans">
              Transform your thoughts into insights with intelligent journaling that understands, analyzes, and helps
              you grow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 noto-sans">AI Insights</h3>
              <p className="text-gray-600 noto-sans">
                Get personalized insights and patterns from your journal entries with advanced AI analysis.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 noto-sans">Smart Prompts</h3>
              <p className="text-gray-600 noto-sans">
                Never run out of things to write about with AI-generated prompts tailored to your interests.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 noto-sans">Mood Tracking</h3>
              <p className="text-gray-600 noto-sans">
                Automatically track your emotional patterns and see how your mood evolves over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      

      {/* How It Works Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 nunito-sans">How Reverie Works</h2>
            
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 noto-sans">1. Write Freely</h3>
              <p className="text-gray-600 noto-sans">
                Express your thoughts, feelings, and experiences in your personal digital journal.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 ">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 noto-sans">2. AI Analysis</h3>
              <p className="text-gray-600 noto-sans">
                AI analyzes your entries to identify patterns, emotions, and meaningful insights.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-10 h-10 text-white " />
              </div>
              <h3 className="text-xl font-semibold mb-4 noto-sans">3. Grow & Reflect</h3>
              <p className="text-gray-600 noto-sans">
                Receive personalized insights and recommendations to support your personal growth.
              </p>
            </div>
          </div>
        </div>
      </section>


      
    </div>
  )
}

export default HomePage