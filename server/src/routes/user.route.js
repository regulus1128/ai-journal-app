import express from 'express';
import { checkAuth, fetchProfile, fetchWelcomeMessage, login, logout, register, updateProfile } from '../controllers/user.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import { upload } from '../utils/multer.js';

const userRouter = express.Router();

userRouter.post('/register', upload.single("avatar"), register);
userRouter.post('/login', login);
userRouter.post('/logout', logout);
userRouter.get('/check', protectRoute, checkAuth);
userRouter.get('/profile', protectRoute, fetchProfile);
userRouter.get('/welcome', protectRoute, fetchWelcomeMessage);
userRouter.put('/update', protectRoute, upload.single("profilePic"), updateProfile);

export default userRouter;
