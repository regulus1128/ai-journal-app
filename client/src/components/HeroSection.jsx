import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import HomePage from './HomePage';

const URL = import.meta.env.MODE === "development"
  ? "http://localhost:3000"
  : import.meta.env.VITE_BACKEND_URL;

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // Redirect to backend OAuth route
    window.location.href = `${URL}/auth/google`;
  };

  const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="currentColor"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="currentColor"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="currentColor"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )

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

      <div className="flex flex-col items-center gap-4 w-full max-w-md">
        {/* Main action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <NavLink to="/register" className="flex-1">
            <button className="w-full bg-transparent border-2 border-white text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white hover:text-gray-800 hover:scale-105 transition-all duration-300 shadow-xl backdrop-blur-sm min-w-[140px] noto-sans cursor-pointer">
              REGISTER
            </button>
          </NavLink>

          <NavLink to="/login" className="flex-1">
            <button className="w-full bg-transparent border-2 border-white text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white hover:text-gray-800 hover:scale-105 transition-all duration-300 shadow-xl backdrop-blur-sm min-w-[140px] noto-sans cursor-pointer">
              LOGIN
            </button>
          </NavLink>
        </div>

        {/* Divider */}
        <div className="flex items-center w-full my-2">
          <div className="flex-1 h-px bg-white/30"></div>
          <span className="px-4 text-white/70 text-sm font-medium">or</span>
          <div className="flex-1 h-px bg-white/30"></div>
        </div>

        {/* Google sign-in button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-transparent cursor-pointer text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white hover:scale-105 hover:text-gray-800 transition-all duration-300 shadow-xl border-2 border-white backdrop-blur-sm min-w-[140px] noto-sans flex items-center justify-center gap-3"
        >
          {/* <GoogleIcon /> */}
          <img className='w-5' src={"google2.png"} alt="" />
          SIGN IN WITH GOOGLE
        </button>
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