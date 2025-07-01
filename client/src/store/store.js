import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice.js";
import journalSlice from "../features/journalSlice.js";
import themeSlice from "../features/theme/themeSlice.js";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        journal: journalSlice,
        theme: themeSlice,
    },
   
});