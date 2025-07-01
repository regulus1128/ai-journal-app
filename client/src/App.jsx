import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import HomePage from "./components/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import JournalPage from "./pages/JournalPage";
import Dashboard from "./pages/Dashboard";
import NewJournalEntry from "./pages/NewJournalEntry";
import JournalDetail from "./pages/JournalDetail";
import JournalHistory from "./pages/JournalHistory";
import { checkAuth } from "./features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";
import Insights from "./pages/Insights";
import Layout from "./layouts/Layout";

function App() {
  const dispatch = useDispatch();
  const { isCheckingAuth, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkUserAuth = async () => {
      await dispatch(checkAuth());
    };
    checkUserAuth();
  }, [dispatch]);

  if (isCheckingAuth) {
    return <div className="text-center mt-10">Checking authentication...</div>;
  }
  return (
    <>
      <BrowserRouter>
      {user && <Navbar />}
        
        <Toaster />
        <Routes>
          <Route
            path="/"
            element={!user ? <HeroSection /> : <Navigate to="/dashboard" />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/journal" element={<JournalPage/>} /> */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Layout>
                <Dashboard />

                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/journal"
            element={
              <PrivateRoute>
                <Layout>
                <NewJournalEntry />

                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/journal/history"
            element={
              <PrivateRoute>
                <Layout>
                <JournalHistory />

                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/journal/:id"
            element={
              <PrivateRoute>
                <Layout>
                <JournalDetail />

                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/journal/insights"
            element={
              <PrivateRoute>
                <Layout>
                <Insights />

                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Layout>
                <ProfilePage />
                </Layout>
              </PrivateRoute>
            }
          />
          {/* Add more routes as needed */}
        </Routes>
        {/* <HomePage/> */}
      </BrowserRouter>
    </>
  );
}

export default App;
