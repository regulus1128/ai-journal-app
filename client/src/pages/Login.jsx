import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../features/authSlice";
import { axiosInstance } from "../lib/axiosInstance";

const Login = () => {

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await dispatch(login(loginData));
      // console.log(res);
      // toast.success(res.payload.message);
      navigate("/dashboard");
      const messageRes = await axiosInstance.get("/user/welcome");
      // console.log(messageRes);
      toast(messageRes.data.message);
    } catch (error) {
      console.log(error);
      // toast.error(error);
    }
  }
  


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Toaster toastOptions={{
          className: "schibsted-grotesk text-lg rounded-full px-5 py-7 mt-4",
        }}/>
      <div className="w-full h-[10%] mt-20 max-w-md bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
        {/* Form Content */}
        <div className="px-6 mt-6 pb-8 space-y-6">
          {/* Email Field */}
          <div className="mb-3">
            <input
              id="email"
              type="email"
              name="email"
              value={loginData.email}
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
              value={loginData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full mt-1 h-11 px-3 py-2 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all duration-200 bg-white nunito-sans"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isLoading}
            onClick={handleSubmit}
            className="w-full h-11 cursor-pointer bg-purple-700 hover:bg-purple-800 text-white font-medium rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all duration-200 nunito-sans"
          >
            {isLoading ? "LOGGING IN..." : "LOGIN"}
          </button>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-sm text-slate-600">
              New here?{" "}
              <NavLink to="/register">
                <span className="font-bold nunito-sans text-slate-900 hover:text-slate-700 transition-colors duration-200">
                  Click here to register.
                </span>
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
