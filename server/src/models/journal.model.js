import mongoose from "mongoose";

const journalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    aiResponse: {
        reflection: {
            type: String,
            default: "",
        },
        affirmation: {
            type: String,
            default: "",
        },
        copingTips: {
            type: [String],
            default: [],
        },
        emotionTags: {
            type: [String],
            default: [],
        },
        moodScore: {
            type: Number,
        },
        moodToday: {
            type: String,
        }
    }
}, { timestamps: true });

const Journal = mongoose.model("Journal", journalSchema);
export default Journal;
