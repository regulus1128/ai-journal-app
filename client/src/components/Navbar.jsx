import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import toast from "react-hot-toast";
import { toggleDarkMode } from "../features/theme/themeSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mode } = useSelector((state) => state.darkMode);

  const handleLogout = async () => {
    try {
      const res = await dispatch(logout());
      // console.log(res);
      toast.success("Logged out successfully!");
      localStorage.removeItem(`mood-forecast`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTheme = () => {
    dispatch(toggleDarkMode());
  };

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
      <div className="hidden md:flex space-x-3 items-center">
        {user && (
          <>
            <button
              className="bg-transparent cursor-pointer border-2 border-white text-white px-3 py-1 rounded-full font-bold hover:bg-white hover:text-gray-800 transition-all duration-300 shadow-lg noto-sans"
              onClick={handleLogout}
            >
              Logout
            </button>
            <Link
              className="bg-transparent cursor-pointer border-2 border-white text-white px-3 py-1 rounded-full font-bold hover:bg-white hover:text-gray-800 transition-all duration-300 shadow-lg noto-sans"
              to="/profile"
            >
              Profile
            </Link>
            <button onClick={toggleTheme}>
              {mode ? (
                <Sun className="text-white" />
              ) : (
                <Moon className="text-white ml-1" />
              )}
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu Icons */}
      <div className="md:hidden flex items-center space-x-3">
        {/* Theme Toggle on Mobile */}
        {user && (
          <button onClick={toggleTheme} aria-label="Toggle theme">
            {mode ? (
              <Sun className="text-white" />
            ) : (
              <Moon className="text-white" />
            )}
          </button>
        )}

        {/* Hamburger Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg
              className="w-6 h-6 transition-transform duration-300"
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
            <svg
              className="w-6 h-6 transition-transform duration-300"
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
    </div>

    {/* Mobile Dropdown with Smooth Transition */}
    <div
      className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out transform ${
        isOpen ? "max-h-60 opacity-100 scale-y-100 py-4" : "max-h-0 opacity-0 scale-y-95 py-0"
      } bg-gradient-to-br from-purple-700 to-purple-800 backdrop-blur-md px-6 space-y-4 origin-top`}
    >
      {user && (
        <>
          <button
            className="block text-white hover:text-gray-300 cursor-pointer transition"
            onClick={() => {
              setIsOpen(false);
              handleLogout();
            }}
          >
            Logout
          </button>
          <Link
            to="/profile"
            className="block text-white hover:text-gray-300 transition"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </Link>
        </>
      )}
    </div>
  </nav>
</div>



  );
};

export default Navbar;
