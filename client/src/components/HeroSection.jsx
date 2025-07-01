import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import HomePage from './HomePage';

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div>
      <section className="relative h-[70vh] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 drop-shadow-lg leading-tight nunito-sans">
            Welcome to Reverie!
          </h1>
          <p className="text-white/90 nunito-sans text-base sm:text-lg md:text-xl max-w-xl mb-8 drop-shadow-md leading-relaxed">
            Capture your thoughts. Illuminate your soul.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <NavLink to="/register">
              <button className=" bg-transparent cursor-pointer border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-gray-800 transition-all duration-300 shadow-lg min-w-[140px] noto-sans">
                REGISTER
              </button>
            </NavLink>
            <NavLink to="/login">
              <button className="bg-transparent border-2 cursor-pointer border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-800 transition-all duration-300 shadow-lg min-w-[140px] noto-sans">
                LOGIN
              </button>
            </NavLink>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-400/15 rounded-full blur-lg"></div>
      </section>

      {/* Placeholder for HomePage component */}
      <HomePage/>
      
    </div>

  )
}

export default HeroSection