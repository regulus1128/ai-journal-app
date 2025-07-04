import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// 👉 Route to start OAuth flow
router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"],
}));

// 👉 Callback route (Google redirects here)
router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // ✅ Generate your own JWT
    const token = jwt.sign(
      { userId: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 👉 Set token in cookie or redirect

    const isDev = process.env.NODE_ENV !== "production";
    res.cookie("token", token, {
      httpOnly: true,
      secure: !isDev,
      sameSite: isDev ? "Lax" : "None",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // ✅ Redirect to frontend (you can also send user info here)
    res.redirect("http://localhost:5173/dashboard"); // or wherever your app's home is
  }
);

export default router;
