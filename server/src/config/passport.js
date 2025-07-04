import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../models/user.model.js";
dotenv.config();

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await User.findOne({ email: profile.emails[0].value });

      if (existingUser) {
        return done(null, existingUser);
      }

      const newUser = new User({
        name: profile.displayName,
        email: profile.emails[0].value,
        profilePic: profile.photos[0].value,
        bio: "",
        password: "", // Optional: set a placeholder or handle this for OAuth users differently
      });

      await newUser.save();
      return done(null, newUser);
    } catch (err) {
      return done(err, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
