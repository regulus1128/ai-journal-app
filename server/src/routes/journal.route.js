import express from 'express';
import { countJournalEntries, deleteJournal, fetchLatestResponse, fetchResponse, fetchResponseById, generateResponse, getEmotionStats, getMoodTrend, setReminder, trackStreak } from '../controllers/journal.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const Router = express.Router();

Router.post('/generate', protectRoute, generateResponse);
Router.get('/responses', protectRoute, fetchResponse);
Router.get('/response/:id', protectRoute, fetchResponseById);
Router.get('/mood-trend', protectRoute, getMoodTrend);
Router.get('/emotion-stats', protectRoute, getEmotionStats);
Router.delete('/delete-journal/:id', protectRoute, deleteJournal);
Router.get('/streak', protectRoute, trackStreak);
Router.get('/latest', protectRoute, fetchLatestResponse);
Router.get('/count', protectRoute, countJournalEntries);
Router.put('/set-reminder', protectRoute, setReminder);

export default Router;