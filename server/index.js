import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import { connectDB } from './src/lib/db.js';
import userRouter from './src/routes/user.route.js';
import Router from './src/routes/journal.route.js';
import cors from 'cors';

const app = express();

const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use('/api/user', userRouter);
app.use('/api/journal', Router);

app.get('/', (req, res) => {
    res.send('Hello');
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})