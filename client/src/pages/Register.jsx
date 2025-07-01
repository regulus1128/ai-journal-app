import React, { useState } from "react";
import { Upload, User } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, signup } from "../features/authSlice";
import toast from "react-hot-toast";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);
  const [selectedImage, setSelectedImage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    avatar: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avatar: file });
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }
      const res = await dispatch(signup(data));
      console.log(res.payload.message);
      // toast.success(res.payload.message);
      await dispatch(logout());
      navigate("/login");
      
      // toast.success(res.payload.message);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full h-[10%] mt-20 max-w-md bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
        {/* Form Content */}
        <div className="px-6 mt-6 pb-8 space-y-6">
          {/* Profile Picture Upload */}
          {/* <div className="space-y-2">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-50 overflow-hidden">
                  {selectedImage ? (
                    <img
                      src={selectedImage || "/placeholder.svg"}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 text-slate-400" />
                  )}
                </div>
              </div>
              <div className="relative">
                <input
                  id="profilePic"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Photo
                </button>
              </div>
            </div>
          </div> */}

          {/* Name Field */}
          <div className=" mb-3">
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter your full name"
              className="w-full mt-1 h-11 px-3 py-2 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all duration-200 bg-white nunito-sans"
            />
          </div>

          {/* Email Field */}
          <div className="mb-3">
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full mt-1 h-11 px-3 py-2 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all duration-200 bg-white nunito-sans"
            />
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              className="w-full mt-1 h-11 px-3 py-2 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all duration-200 bg-white nunito-sans"
            />
          </div>

          {/* Bio Field */}
          <div className="mb-3">
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us a little about yourself (optional)"
              rows={4}
              className="w-full mt-1 h-11 px-3 py-2 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all duration-200 bg-white nunito-sans resize-none"
            />
          </div>

          {/* Register Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            type="submit"
            className="w-full h-11 cursor-pointer bg-purple-700 hover:bg-purple-800 text-white font-medium rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all duration-200 nunito-sans"
          >
            {isLoading ? "Creating..." : "Create Account"}
          </button>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-sm text-slate-600">
              Already have an account?{" "}
              <NavLink to="/login">
                <span className="font-bold nunito-sans text-slate-900 hover:text-slate-700 transition-colors duration-200">
                  Sign In.
                </span>
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
