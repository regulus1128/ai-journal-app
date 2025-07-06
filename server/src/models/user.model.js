import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: false,
    },
    bio: {
        type: String,
        default: "",
    },
    profilePic: {
        type: String,
        default: "",
    },
    reminderTime: {
        type: String,
        default: null,
    },
    showWelcomeMessage: {
        type: Boolean,
        default: true,
    }
    }, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

export default User;