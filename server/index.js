import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import session from "express-session";
import { connectDB } from './src/lib/db.js';
import userRouter from './src/routes/user.route.js';
import Router from './src/routes/journal.route.js';
import cors from 'cors';
import router from './src/routes/auth.route.js';
import passport from 'passport';
import './src/config/passport.js'

const app = express();

const PORT = process.env.PORT;


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173", "https://reverie-weld.vercel.app"],
    credentials: true,
}));

app.use(session({
    secret: process.env.SESSION_SECRET || "reverie",
    resave: false,
    saveUninitialized: false,
  }));
  app.use(passport.initialize());
  app.use(passport.session());

app.use('/api/user', userRouter);
app.use('/api/journal', Router);
app.use('/auth', router);


app.get('/', (req, res) => {
    res.send('Hello');
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})