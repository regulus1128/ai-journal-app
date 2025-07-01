import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';

const Navbar = () => {

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);

  

  const handleLogout = async () => {
    try {
      const res = await dispatch(logout());
      console.log(res);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    // dispatch(setTheme(newTheme))
  }
  

  // console.log(user);

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
       <nav className="bg-gradient-to-br from-purple-700 to-purple-800 backdrop-blur-md shadow-md fixed w-full z-50 noto-sans">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl font-extrabold tracking-wide select-none noto-sans">
          Reverie
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-3">
          {user && <>
            <button className="bg-transparent cursor-pointer border-2 border-white text-white px-3 py-1 rounded-full font-bold hover:bg-white hover:text-gray-800 transition-all duration-300 shadow-lg noto-sans" onClick={handleLogout}>Logout</button>
            <Link className="bg-transparent cursor-pointer border-2 border-white text-white px-3 py-1 rounded-full font-bold hover:bg-white hover:text-gray-800 transition-all duration-300 shadow-lg noto-sans" to="/profile">Profile</Link>
            <button onClick={toggleTheme}>
      {theme === 'light' ? (
        <Sun className="text-white mt-1" />
      ) : (
        <Moon className="text-white mt-1 ml-1" />
      )}
    </button>
            
            
          </>
          }
          
          
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            // X icon
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            // Hamburger icon
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-primary/95 backdrop-blur-md px-6 py-4 space-y-4">
          <a
            href="/"
            className="block text-white hover:text-accent transition"
            onClick={() => setIsOpen(false)}
          >
            Home
          </a>
          <a
            href="/about"
            className="block text-white hover:text-accent transition"
            onClick={() => setIsOpen(false)}
          >
            About
          </a>
          <a
            href="/contact"
            className="block text-white hover:text-accent transition"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </a>
        </div>
      )}
    </nav>
    </div>
  )
}

export default Navbar